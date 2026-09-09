-- VARNOTO cloud backend — run once in Supabase SQL Editor
-- NOTE: RLS writes are restricted to users whose user_metadata.role = 'admin'.
-- Create the manager via Auth Admin API, then set DISABLE_SIGNUP=true in Auth settings.

-- 1) Site config (public read, admin write)
create table if not exists store_config (
  id int primary key,
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);
insert into store_config (id, data) values (1, '{}')
on conflict (id) do nothing;
alter table store_config enable row level security;
drop policy if exists "varnoto public read" on store_config;
create policy "varnoto public read" on store_config for select using (true);
drop policy if exists "varnoto admin write" on store_config;
create policy "varnoto admin write" on store_config for update
  using ((auth.jwt()->'user_metadata'->>'role')='admin')
  with check ((auth.jwt()->'user_metadata'->>'role')='admin');
drop policy if exists "varnoto admin insert" on store_config;
create policy "varnoto admin insert" on store_config for insert
  with check ((auth.jwt()->'user_metadata'->>'role')='admin');

-- 2) Orders (public insert via RPC only, admin full access)
create table if not exists orders (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  customer_name text,
  customer_phone text,
  items jsonb not null,
  total int not null,
  status text default 'new'
);
alter table orders enable row level security;
drop policy if exists "varnoto orders insert" on orders;
create policy "varnoto orders insert" on orders for insert with check (true);
drop policy if exists "varnoto orders admin" on orders;
create policy "varnoto orders admin" on orders for all
  using ((auth.jwt()->'user_metadata'->>'role')='admin')
  with check ((auth.jwt()->'user_metadata'->>'role')='admin');

create or replace function place_order(p_name text, p_phone text, p_items jsonb, p_total int)
returns bigint language plpgsql security definer set search_path = public as $$
declare nid bigint;
begin
  if p_total is null or p_total < 1 then raise exception 'bad total'; end if;
  insert into orders(customer_name, customer_phone, items, total)
  values (nullif(p_name,''), nullif(p_phone,''), coalesce(p_items,'[]'), p_total)
  returning id into nid;
  return nid;
end; $$;
grant execute on function place_order(text, text, jsonb, int) to anon, authenticated;

-- 3) Change log (admin only)
create table if not exists change_log (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  actor_email text,
  action text,
  details jsonb
);
alter table change_log enable row level security;
drop policy if exists "varnoto log admin" on change_log;
create policy "varnoto log admin" on change_log for all
  using ((auth.jwt()->'user_metadata'->>'role')='admin')
  with check ((auth.jwt()->'user_metadata'->>'role')='admin');

-- 4) Realtime (so the dashboard and site update live)
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table store_config;

-- 5) Coupons (admin-managed, validated server-side via RPC)
create table if not exists coupons (
  code text primary key,
  type text default 'percent',
  value int not null,
  min_total int default 0,
  max_uses int,
  used_count int default 0,
  active boolean default true,
  expires_at timestamptz
);
alter table coupons enable row level security;
drop policy if exists "varnoto coupons admin" on coupons;
create policy "varnoto coupons admin" on coupons for all
  using ((auth.jwt()->'user_metadata'->>'role')='admin')
  with check ((auth.jwt()->'user_metadata'->>'role')='admin');

alter table orders add column if not exists coupon_code text;
alter table orders add column if not exists discount int default 0;

create or replace function validate_coupon(p_code text, p_total int)
returns jsonb language plpgsql security definer set search_path = public as $F$
declare c coupons%rowtype; d int;
begin
 select * into c from coupons where lower(code)=lower(trim(p_code));
 if not found then return jsonb_build_object('ok',false,'reason','not_found'); end if;
 if not c.active then return jsonb_build_object('ok',false,'reason','inactive'); end if;
 if c.expires_at is not null and c.expires_at < now() then return jsonb_build_object('ok',false,'reason','expired'); end if;
 if p_total < coalesce(c.min_total,0) then return jsonb_build_object('ok',false,'reason','min_total','min',c.min_total); end if;
 if c.max_uses is not null and coalesce(c.used_count,0) >= c.max_uses then return jsonb_build_object('ok',false,'reason','maxed'); end if;
 if c.type='percent' then d := floor(p_total * c.value / 100); else d := least(c.value, p_total); end if;
 return jsonb_build_object('ok',true,'type',c.type,'value',c.value,'discount',d);
end; $F$;
grant execute on function validate_coupon(text,int) to anon, authenticated;

-- 6) Reviews (public read approved only, public insert pending, admin full)
create table if not exists reviews (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  product_id text not null,
  name text,
  rating int not null,
  comment text,
  approved boolean default false
);
alter table reviews enable row level security;
drop policy if exists "varnoto reviews read" on reviews;
create policy "varnoto reviews read" on reviews for select using (approved = true);
drop policy if exists "varnoto reviews insert" on reviews;
create policy "varnoto reviews insert" on reviews for insert with check (approved = false and rating between 1 and 5);
drop policy if exists "varnoto reviews admin" on reviews;
create policy "varnoto reviews admin" on reviews for all
  using ((auth.jwt()->'user_metadata'->>'role')='admin')
  with check ((auth.jwt()->'user_metadata'->>'role')='admin');

-- 7) RPC: secure order placement (validates coupon server-side, counts usage)
create or replace function place_order(p_name text, p_phone text, p_items jsonb, p_total int, p_coupon text default null)
returns jsonb language plpgsql security definer set search_path = public as $F$
declare nid bigint; d int := 0; c coupons%rowtype;
begin
 if p_total is null or p_total < 1 then raise exception 'bad total'; end if;
 if p_coupon is not null and trim(p_coupon) <> '' then
  select * into c from coupons where lower(code)=lower(trim(p_coupon));
  if found and c.active and (c.expires_at is null or c.expires_at > now()) and p_total >= coalesce(c.min_total,0) and (c.max_uses is null or coalesce(c.used_count,0) < c.max_uses) then
   if c.type='percent' then d := floor(p_total * c.value / 100); else d := least(c.value, p_total); end if;
   update coupons set used_count = coalesce(used_count,0)+1 where code = c.code;
  end if;
 end if;
 insert into orders(customer_name, customer_phone, items, total, coupon_code, discount)
 values (nullif(p_name,''), nullif(p_phone,''), coalesce(p_items,'[]'), p_total - d, nullif(trim(p_coupon),''), d)
 returning id into nid;
 return jsonb_build_object('order_id',nid,'discount',d,'total',p_total-d);
end; $F$;
grant execute on function place_order(text,text,jsonb,int,text) to anon, authenticated;

-- 8) RPC: dashboard aggregates (managers only) — costs map {productIdOrName: cost}
create or replace function dashboard_stats(ndays int default 14, costs jsonb default '{}')
returns jsonb language plpgsql security definer set search_path = public as $F$
declare res jsonb; rev int; cst int; dsc int;
begin
select coalesce(sum(total),0) into rev from orders;
select coalesce(sum((it->>'q')::int * coalesce((costs->>(it->>'id'))::int, (costs->>(it->>'name'))::int, 0)),0) into cst
  from orders, jsonb_array_elements(items) it;
select coalesce(sum(coalesce(discount,0)),0) into dsc from orders;
select jsonb_build_object(
 'visits_total', (select count(*) from events),
 'revenue_total', rev,
 'cost_total', cst,
 'discount_total', dsc,
 'profit_total', rev - cst,
 'margin_pct', case when rev > 0 then round((rev - cst) * 100.0 / rev) else 0 end,
 'orders_count', (select count(*) from orders),
 'buyers_count', (select count(distinct coalesce(nullif(customer_phone,''), nullif(customer_name,''), id::text)) from orders),
 'avg_basket', coalesce((select avg(total)::int from orders),0),
 'daily', (select coalesce(jsonb_agg(t order by t.d), '[]') from (
   select to_char(d,'YYYY-MM-DD') d,
     (select count(*) from events where created_at::date=d) visits,
     (select count(*) from orders where created_at::date=d) orders,
     (select coalesce(sum(total),0) from orders where created_at::date=d) revenue
   from generate_series(current_date - (ndays-1), current_date, interval '1 day') d) t),
 'top_products', (select coalesce(jsonb_agg(t order by t.revenue desc), '[]') from (
   select it->>'name' nm, sum((it->>'q')::int) qty, sum((it->>'q')::int*(it->>'price')::int) revenue,
     sum((it->>'q')::int*(it->>'price')::int) - sum((it->>'q')::int * coalesce((costs->>(it->>'id'))::int, (costs->>(it->>'name'))::int, 0)) profit
   from orders, jsonb_array_elements(items) it group by 1 order by 3 desc limit 8) t),
 'buyers', (select coalesce(jsonb_agg(t order by t.spent desc), '[]') from (
   select coalesce(nullif(customer_name,''), '--') nm, coalesce(nullif(customer_phone,''), '--') ph,
     count(*) ords, sum(total) spent, max(created_at) last_at
   from orders group by 1,2 order by 4 desc limit 10) t)
) into res;
return res;
end; $F$;
grant execute on function dashboard_stats(int, jsonb) to authenticated;
revoke execute on function dashboard_stats(int, jsonb) from public;
revoke execute on function dashboard_stats(int, jsonb) from anon;

-- 9) Pack-3: shipping zones, order extras, tracking, staff
create table if not exists shipping_zones (
  id text primary key, name_ar text, name_en text, fee int default 0,
  days text, free_over int default 1999, active boolean default true
);
alter table shipping_zones enable row level security;
drop policy if exists "varnoto zones public" on shipping_zones;
create policy "varnoto zones public" on shipping_zones for select using (active = true);
drop policy if exists "varnoto zones admin" on shipping_zones;
create policy "varnoto zones admin" on shipping_zones for all
  using ((auth.jwt()->'user_metadata'->>'role')='admin')
  with check ((auth.jwt()->'user_metadata'->>'role')='admin');
insert into shipping_zones (id, name_ar, name_en, fee, days, free_over, active) values
 ('cairo','القاهرة والجيزة','Cairo & Giza',60,'2-4 أيام عمل',1999,true),
 ('alex','إسكندرية والدلتا','Alexandria & Delta',70,'3-5 أيام عمل',1999,true),
 ('upper','الصعيد والسواحل وسيناء','Upper Egypt & Coasts & Sinai',80,'4-6 أيام عمل',1999,true)
on conflict (id) do nothing;

alter table orders add column if not exists ship_fee int default 0;
alter table orders add column if not exists pay_method text default 'cod';
alter table orders add column if not exists zone text;

drop function if exists place_order(text,text,jsonb,int,text);
create or replace function place_order(p_name text, p_phone text, p_items jsonb, p_total int, p_coupon text default null, p_zone text default null, p_pay text default 'cod')
returns jsonb language plpgsql security definer set search_path = public as $F$
declare nid bigint; d int := 0; c coupons%rowtype; z shipping_zones%rowtype; fee int := 0;
begin
 if p_total is null or p_total < 1 then raise exception 'bad total'; end if;
 if p_coupon is not null and trim(p_coupon) <> '' then
  select * into c from coupons where lower(code)=lower(trim(p_coupon));
  if found and c.active and (c.expires_at is null or c.expires_at > now()) and p_total >= coalesce(c.min_total,0) and (c.max_uses is null or coalesce(c.used_count,0) < c.max_uses) then
   if c.type='percent' then d := floor(p_total * c.value / 100); else d := least(c.value, p_total); end if;
   update coupons set used_count = coalesce(used_count,0)+1 where code = c.code;
  end if;
 end if;
 if p_zone is not null and trim(p_zone) <> '' then
  select * into z from shipping_zones where id = trim(p_zone) and active = true;
  if found then
   if (p_total - d) >= coalesce(z.free_over, 1999) then fee := 0; else fee := coalesce(z.fee,0); end if;
  end if;
 end if;
 insert into orders(customer_name, customer_phone, items, total, coupon_code, discount, ship_fee, pay_method, zone)
 values (nullif(p_name,''), nullif(p_phone,''), coalesce(p_items,'[]'), p_total - d + fee, nullif(trim(p_coupon),''), d, fee, coalesce(p_pay,'cod'), nullif(trim(p_zone), ''))
 returning id into nid;
 return jsonb_build_object('order_id',nid,'discount',d,'ship_fee',fee,'total',p_total-d+fee);
end; $F$;
grant execute on function place_order(text,text,jsonb,int,text,text,text) to anon, authenticated;

create or replace function my_orders(p_phone text)
returns jsonb language plpgsql security definer set search_path = public as $F$
begin
 if p_phone is null or length(regexp_replace(p_phone,'\D','','g')) < 8 then return '[]'::jsonb; end if;
 return coalesce((select jsonb_agg(t order by t.id desc) from (
   select id, created_at, items, total, discount, ship_fee, status, coupon_code
   from orders where regexp_replace(coalesce(customer_phone,''),'\D','','g') = regexp_replace(p_phone,'\D','','g')
   order by id desc limit 20) t), '[]'::jsonb);
end; $F$;
grant execute on function my_orders(text) to anon, authenticated;

create or replace function set_order_status(p_id int, p_status text)
returns boolean language plpgsql security definer set search_path = public as $F$
declare r text;
begin
 r := coalesce(auth.jwt()->'user_metadata'->>'role','');
 if r not in ('admin','staff') then raise exception 'denied'; end if;
 if p_status not in ('new','preparing','shipped','done') then raise exception 'bad status'; end if;
 update orders set status = p_status where id = p_id;
 return found;
end; $F$;
grant execute on function set_order_status(int,text) to authenticated;
revoke execute on function set_order_status(int,text) from public;
revoke execute on function set_order_status(int,text) from anon;

drop policy if exists "varnoto orders staff read" on orders;
create policy "varnoto orders staff read" on orders for select
  using ((auth.jwt()->'user_metadata'->>'role')='staff');

-- 5) Visit tracking (public insert-only, admin read)
create table if not exists events (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  type text default 'view',
  page text,
  session_id text
);
alter table events enable row level security;
drop policy if exists "varnoto events insert" on events;
create policy "varnoto events insert" on events for insert with check (type='view');
drop policy if exists "varnoto events admin" on events;
create policy "varnoto events admin" on events for all
  using ((auth.jwt()->'user_metadata'->>'role')='admin')
  with check ((auth.jwt()->'user_metadata'->>'role')='admin');
