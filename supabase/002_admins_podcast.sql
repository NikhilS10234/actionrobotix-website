-- Action Robotix website migration 002
-- Run this after schema.sql in your Supabase project's SQL editor.

create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

grant usage on schema public to anon, authenticated;
grant select on admins to authenticated;
grant execute on function is_admin() to anon, authenticated;

create policy "admins can read admins" on admins
  for select using (is_admin());

create policy "admin update settings" on site_settings
  for update using (is_admin()) with check (is_admin());

grant select, update on site_settings to authenticated;

create table if not exists podcast_episodes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  external_url text,
  published boolean not null default false,
  published_at timestamptz not null default now()
);

alter table podcast_episodes enable row level security;

create policy "public read published episodes" on podcast_episodes
  for select using (published = true);
create policy "admin full access to episodes" on podcast_episodes
  for all using (is_admin()) with check (is_admin());

grant select on podcast_episodes to anon;
grant select, insert, update, delete on podcast_episodes to authenticated;
