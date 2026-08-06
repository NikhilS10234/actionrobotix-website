# Backend Setup (Supabase)

The blog, portfolio database, newsletter signup, and admin panel all need a
Supabase project. This is a one-time setup only your team can do (it needs
you to create/own the account).

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up / log in (free tier is enough).
2. Create a new project. Pick any name/region; save the database password somewhere safe.
3. Wait for the project to finish provisioning (~2 minutes).

## 2. Run the schema

1. In the Supabase dashboard, open **SQL Editor** → **New query**.
2. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) from this repo and click **Run**.
3. This creates the `blog_posts`, `team_portfolios`, `newsletter_subscribers`, and `site_settings` tables, seeds two default settings rows, and sets up the access rules (public visitors can read published content and submit portfolios/newsletter emails; only signed-in team accounts can manage everything).

## 3. Connect the site to your project

1. In the Supabase dashboard, go to **Project Settings → API**.
2. Copy the **Project URL** and the **anon public** key.
3. In this repo, copy `.env.example` to `.env` and paste them in:
   ```
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Restart `npm start` if it's running — Create React App only reads `.env` on startup.

Until this is done, the blog/portfolios/community/admin pages show a "not set
up yet" message instead of crashing — the rest of the site works normally.

## 4. Create admin (team) accounts

There is no public sign-up page — that's intentional, since any signed-in
account can manage the whole site. To create an account for a team member:

1. In the Supabase dashboard, go to **Authentication → Users → Add user**.
2. Enter their email and a temporary password (or use "send invite" if you've set up email sending in Supabase).
3. They can log in at `/admin/login` on the site, and reset their password from there if needed.

## 5. What you can manage from `/admin`

- **Blog** — write/edit/delete posts (Markdown content), toggle published/draft.
- **Portfolios** — approve, unapprove, or delete team portfolio submissions.
- **Newsletter** — view subscriber list, export as CSV, remove subscribers.
- **Site Settings** — edit the site-wide announcement banner text/link/on-off, and the `/season` page's heading/body.

## Notes / things intentionally out of scope

- **Sending newsletter campaigns**: this only captures emails. To actually send a newsletter, export the CSV from `/admin` and use whatever email tool you choose (Mailchimp, Buttondown, etc.) — that needs its own account/setup.
- **Discord**: the invite link on `/community` is a placeholder (`https://discord.gg/REPLACE_ME`). Update `DISCORD_INVITE_URL` in `src/pages/Community.jsx` once you have a real server invite.
- **Portfolio submissions are links, not file uploads** — teams submit a link to a Drive/PDF they host elsewhere, so there's no file storage to manage.
- **Donations**: the Support Us page still links out to GoFundMe rather than processing payments on-site, since that would need a payment processor account (Stripe, etc.) and PCI-compliance-relevant backend work.
