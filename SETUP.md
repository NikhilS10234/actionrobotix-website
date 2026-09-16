# Backend Setup (Supabase)

The podcast, site settings, and admin panel need a Supabase project.
This is a one-time setup only your team can do.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up / log in (free tier is enough).
2. Create a new project. Pick any name/region; save the database password somewhere safe.
3. Wait for the project to finish provisioning (~2 minutes).

## 2. Run the schema

1. In the Supabase dashboard, open **SQL Editor** → **New query**.
2. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) from this repo and click **Run**.
3. Run [`supabase/002_admins_podcast.sql`](supabase/002_admins_podcast.sql) next.
4. These create the site settings, admin, and podcast tables and seed the BioBuzz announcement and season content.

## 3. Connect the site to your project

1. In the Supabase dashboard, go to **Project Settings → API**.
2. Copy the **Project URL** and the **anon public** key.
3. In this repo, copy `.env.example` to `.env` and paste them in:
   ```
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Restart `npm start` if it's running. Create React App only reads `.env` on startup.

Until this is done, the podcast and admin pages show a "not set up yet"
message instead of crashing. The rest of the site works normally.

## 4. Create admin (team) accounts

There is no public sign-up page. That's intentional, since any signed-in
account can manage the whole site. To create an account for a team member:

1. In the Supabase dashboard, go to **Authentication → Users → Add user**.
2. Enter their email and a temporary password (or use "send invite" if you've set up email sending in Supabase).
3. They can log in at `/admin/login` on the site, and reset their password from there if needed.

## 5. What you can manage from `/admin`

- **Podcast**: add, edit, or remove podcast episodes.
- **Site Settings**: edit the site-wide announcement banner and the `/season` page content.

## Notes / things intentionally out of scope

- **Donations**: the Support Us page still links out to GoFundMe rather than processing payments on-site, since that would need a payment processor account and PCI-compliance-relevant backend work.
