-- Action Robotix website Supabase schema
-- Run this once in your Supabase project's SQL editor.

create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into site_settings (key, value) values
  ('announcement', '{"enabled": true, "version": "2026-2027-biobuzz", "text": "The 2026-2027 FTC BioBuzz season has started!", "link": "/season"}'),
  ('season_blurb', '{"heading": "The 2026-2027 BioBuzz Season Has Started", "body": "BioBuzz is underway. Our team is studying the game, developing our robot, and sharing updates throughout the season."}')
on conflict (key) do nothing;

alter table site_settings enable row level security;

create policy "public read settings" on site_settings
  for select using (true);

grant usage on schema public to anon, authenticated;
grant select on site_settings to anon;
