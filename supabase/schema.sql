-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).

-- 1. Quote / contact form submissions
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  suburb text,
  service text,
  message text
);

alter table leads enable row level security;

-- Anyone (anon key, i.e. the public site) can submit a lead, but cannot read them back.
create policy "Public can insert leads"
  on leads for insert
  to anon
  with check (true);

-- Only authenticated admin users can read leads.
create policy "Authenticated users can read leads"
  on leads for select
  to authenticated
  using (true);


-- 2. Portfolio projects
create table if not exists portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  service text not null,       -- e.g. 'wardrobes', 'kitchens'
  suburb text,
  summary text,
  cover_image_path text,       -- path in the 'portfolio' storage bucket
  published boolean not null default false
);

alter table portfolio_projects enable row level security;

create policy "Public can read published projects"
  on portfolio_projects for select
  to anon
  using (published = true);

create policy "Authenticated users can manage projects"
  on portfolio_projects for all
  to authenticated
  using (true)
  with check (true);


-- 3. Blog posts
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,       -- markdown
  cover_image_path text,
  published boolean not null default false
);

alter table blog_posts enable row level security;

create policy "Public can read published posts"
  on blog_posts for select
  to anon
  using (published = true);

create policy "Authenticated users can manage posts"
  on blog_posts for all
  to authenticated
  using (true)
  with check (true);


-- Storage: create two public buckets from the Supabase dashboard
-- (Storage > New bucket): "portfolio" and "blog" — both set to public
-- so next/image can read them via the remotePatterns config in next.config.js.
