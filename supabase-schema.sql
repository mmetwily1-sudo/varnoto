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
