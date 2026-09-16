-- Action Robotix website migration 002
-- Run this once in your Supabase project's SQL editor (Project > SQL Editor > New query),
-- AFTER schema.sql has already been run.
--
-- This does two things:
--   1. IMPORTANT SECURITY FIX: introduces a real `admins` table so "admin" is no
--      longer the same thing as "any signed-in Supabase Auth user". Up to now,
--      every RLS policy checked `auth.role() = 'authenticated'`, which was safe
--      only because the only way to get an authenticated session was a team
--      account created by you in the dashboard. We're about to add a public
--      forum with sign-in-to-post, which creates real "authenticated" sessions
--      for any visitor, so admin policies must now check membership in an
--      explicit `admins` table instead.
--   2. Adds tables for the public forum and podcast episode list.

-- ---------------------------------------------------------------------------
-- 1. Admins table + fixed policies on existing tables
-- ---------------------------------------------------------------------------

create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;

grant select on admins to authenticated;

-- Seed the existing team account as the first admin.
insert into admins (user_id, email)
select id, email from auth.users where email = 'actionrobotix@gmail.com'
on conflict (user_id) do nothing;

-- Helper used throughout instead of auth.role() = 'authenticated'. SECURITY
-- DEFINER runs this as the function owner (bypasses RLS on admins), which is
-- required. Otherwise any policy on `admins` that queries `admins` itself
-- recurses infinitely.
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

grant execute on function is_admin() to anon, authenticated;

-- Only admins can see the admins list; nobody can self-insert via the API
-- (adding an admin is a manual dashboard/SQL step, same as creating the
-- underlying auth user always has been). Uses is_admin(), not a direct
-- subquery on admins. A policy on `admins` that queries `admins` directly
-- causes infinite recursion.
create policy "admins can read admins" on admins
  for select using (is_admin());

create policy "admin update settings" on site_settings
  for update using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------------
-- 2. Forum
-- ---------------------------------------------------------------------------
-- Trust model: anyone can read. Posting a thread/reply requires a signed-in
-- session (magic-link email, no password). This is a normal "authenticated"
-- Supabase user, NOT an admin. Authors can edit/delete their own posts;
-- admins can moderate (delete) anything.

create table if not exists forum_threads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists forum_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references forum_threads(id) on delete cascade,
  body text not null,
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  created_at timestamptz not null default now()
);

alter table forum_threads enable row level security;
alter table forum_replies enable row level security;

create policy "public read threads" on forum_threads
  for select using (true);
create policy "signed-in users create threads" on forum_threads
  for insert with check (auth.uid() = author_id);
create policy "authors delete own threads" on forum_threads
  for delete using (auth.uid() = author_id or is_admin());
create policy "admins moderate threads" on forum_threads
  for update using (is_admin()) with check (is_admin());

create policy "public read replies" on forum_replies
  for select using (true);
create policy "signed-in users create replies" on forum_replies
  for insert with check (auth.uid() = author_id);
create policy "authors delete own replies" on forum_replies
  for delete using (auth.uid() = author_id or is_admin());

grant select, insert on forum_threads to authenticated;
grant delete, update on forum_threads to authenticated;
grant select on forum_threads to anon;

grant select, insert on forum_replies to authenticated;
grant delete on forum_replies to authenticated;
grant select on forum_replies to anon;

-- ---------------------------------------------------------------------------
-- 3. Podcast episodes
-- ---------------------------------------------------------------------------
-- Structure only for now. Episodes can be added once recording starts.
-- external_url can point to Spotify/YouTube/Apple Podcasts/etc once live.

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
