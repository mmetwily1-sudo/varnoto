-- VARNOTO cloud store — run once in Supabase SQL Editor
create table if not exists store_config (
  id int primary key,
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);
insert into store_config (id, data) values (1, '{}')
on conflict (id) do nothing;

alter table store_config enable row level security;

drop policy if exists "varnoto public read" on store_config;
create policy "varnoto public read" on store_config
  for select using (true);

drop policy if exists "varnoto public write" on store_config;
create policy "varnoto public write" on store_config
  for update using (true) with check (true);

drop policy if exists "varnoto public insert" on store_config;
create policy "varnoto public insert" on store_config
  for insert with check (true);
