# A&E Joinery website

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Supabase.

## What's in this first version

- Homepage: hero, trust bar, services (wardrobes flagship + custom joinery),
  why-choose-us / process, areas-we-serve links, quote form
- Quote form wired to `/api/quote`, which writes to a Supabase `leads` table
- Supabase schema (`supabase/schema.sql`) for leads, portfolio projects, and
  blog posts, with Row Level Security so the public site can only submit
  leads and read *published* content — never edit or read leads back
- SEO basics: metadata, Open Graph, LocalBusiness JSON-LD schema, sitemap
  generation on build

- A `/api/quote/health` self-check for diagnosing a form that isn't saving

**Not built yet** (next phases): email notification when a lead comes in (needs
an email integration provisioned on Vercel first — see below), an admin area to
manage leads/portfolio/blog content in Supabase, portfolio and blog content.

### Getting emailed when a lead comes in

Leads currently land in the Supabase `leads` table only. To also get an email,
provision an email provider through the Vercel Marketplace first — it sets the
API key up as an environment variable automatically:

```bash
vercel link
vercel integration discover --category messaging
vercel integration add <provider> --yes
```

Run these from your own machine, where you're logged in to Vercel. Once the
provider is installed, the send step goes in `app/api/quote/route.ts` where the
lead is saved.

## Running it yourself

You'll need [Node.js](https://nodejs.org) installed (LTS version).

```bash
npm install
cp .env.local.example .env.local
# then fill in .env.local with your real Supabase URL + anon key
npm run dev
```

Open http://localhost:3000.

## Setting up Supabase

1. In your Supabase project, go to **SQL Editor > New query**, paste in the
   contents of `supabase/schema.sql`, and run it. This creates the `leads`,
   `portfolio_projects`, and `blog_posts` tables with the right permissions.
2. Go to **Storage** and create two buckets, both set to **public**:
   `portfolio` and `blog`.
3. Go to **Settings > API** and copy your **Project URL** and **anon public
   key** into `.env.local` (and later, into Vercel's environment variables).

## If the quote form isn't working

Open **https://your-site/api/quote/health** in a browser. It tells you exactly
what's wrong, and never shows your keys:

| What it says | What to do |
| --- | --- |
| `missing_environment_variables` | The Supabase URL/key aren't set on the deployment. Add them in Vercel under **Settings > Environment Variables**, then redeploy. |
| `leads_table_missing` | `supabase/schema.sql` was never run. Paste it into the Supabase **SQL Editor** and run it. |
| `supabase_unreachable` | The Supabase URL is wrong, or the project is paused (free projects pause after inactivity — resume it in the dashboard). |
| `supabase_error` | Something else; the message says what. Usually a missing Row Level Security policy. |
| `ok: true` | The form can reach the leads table — submissions are saving. |

Every failed submission is also written to the Vercel runtime logs with the
visitor's details (`[quote] Unsaved lead: ...`), so a lead is never lost to a
misconfiguration — you can still read it back and call them.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, click **Add New > Project**, and import that repository.
3. In the project's **Settings > Environment Variables**, add the same
   variables from `.env.local.example` with your real values.
4. Deploy. Vercel will run `npm install` and `npm run build` for you —
   nothing else to configure.
