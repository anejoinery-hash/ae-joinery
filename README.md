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

**Not built yet** (next phases): individual service pages, location/suburb
pages, portfolio page, blog, about/FAQ/privacy/terms, and an admin area to
manage leads/portfolio/blog content in Supabase. Say the word and I'll
keep going page by page.

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

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, click **Add New > Project**, and import that repository.
3. In the project's **Settings > Environment Variables**, add the same
   variables from `.env.local.example` with your real values.
4. Deploy. Vercel will run `npm install` and `npm run build` for you —
   nothing else to configure.
