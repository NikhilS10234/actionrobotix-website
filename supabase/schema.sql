-- Action Robotix website — Supabase schema
-- Run this once in your Supabase project's SQL editor (Project > SQL Editor > New query).
-- See ../SETUP.md for how to get here and what to do afterward.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  author text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists team_portfolios (
  id uuid primary key default gen_random_uuid(),
  team_number text not null,
  team_name text not null,
  season text not null,
  portfolio_url text not null,
  description text,
  contact_email text,
  approved boolean not null default false,
  submitted_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz not null default now()
);

create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into site_settings (key, value) values
  ('announcement', '{"enabled": true, "version": "2026-season-v1", "text": "The 2026–27 FTC season kicks off soon — the site will be changing as we prep!", "link": "/season"}'),
  ('season_blurb', '{"heading": "The 2026–27 FTC Season Is Almost Here", "body": "We are gearing up for the new game reveal. Expect the site to change a lot over the next few months as we roll out new pages, robot builds, and team updates."}')
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- Trust model: there is no public sign-up flow anywhere on the site. Every
-- Supabase Auth account is created manually by your team (see SETUP.md), so
-- "authenticated" == "admin" for this schema's purposes.

alter table blog_posts enable row level security;
alter table team_portfolios enable row level security;
alter table newsletter_subscribers enable row level security;
alter table site_settings enable row level security;

-- blog_posts: public can read published posts; admins can do everything.
create policy "public read published posts" on blog_posts
  for select using (published = true);
create policy "admin full access to posts" on blog_posts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- team_portfolios: public can read approved rows and submit new ones (always
-- unapproved); admins can read/update/delete everything.
create policy "public read approved portfolios" on team_portfolios
  for select using (approved = true);
create policy "public submit portfolio" on team_portfolios
  for insert with check (approved = false);
create policy "admin manage portfolios" on team_portfolios
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin delete portfolios" on team_portfolios
  for delete using (auth.role() = 'authenticated');
create policy "admin read all portfolios" on team_portfolios
  for select using (auth.role() = 'authenticated');

-- newsletter_subscribers: public can subscribe (insert only, no read — keeps
-- emails private); admins can read/delete for list management/export.
create policy "public subscribe" on newsletter_subscribers
  for insert with check (true);
create policy "admin read subscribers" on newsletter_subscribers
  for select using (auth.role() = 'authenticated');
create policy "admin delete subscribers" on newsletter_subscribers
  for delete using (auth.role() = 'authenticated');

-- site_settings: public can read (needed for the announcement bar/season
-- page to render for anonymous visitors); admins can update.
create policy "public read settings" on site_settings
  for select using (true);
create policy "admin update settings" on site_settings
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------
-- RLS policies above only take effect once the underlying role has the
-- matching table-level privilege — Postgres checks GRANTs first. These
-- mirror what each policy already allows; RLS still restricts it further.

grant usage on schema public to anon, authenticated;

grant select on blog_posts to anon;
grant select, insert, update, delete on blog_posts to authenticated;

grant select, insert on team_portfolios to anon;
grant select, update, delete on team_portfolios to authenticated;

grant insert on newsletter_subscribers to anon;
grant select, delete on newsletter_subscribers to authenticated;

grant select on site_settings to anon;
grant select, update on site_settings to authenticated;
