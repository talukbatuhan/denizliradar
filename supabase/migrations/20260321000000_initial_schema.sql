-- Denizli Radar: initial schema

create extension if not exists "pgcrypto";

create type public.article_status as enum ('draft', 'published', 'archived');

create type public.homepage_slot as enum (
  'top_story',
  'side_story',
  'grid',
  'turkiye_featured',
  'turkiye_secondary'
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  display_name text,
  created_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content jsonb not null default '[]'::jsonb,
  category_id uuid not null references public.categories (id) on delete restrict,
  cover_image_url text not null default '',
  status public.article_status not null default 'draft',
  published_at timestamptz,
  read_time_minutes int not null default 3 check (read_time_minutes > 0),
  view_count int not null default 0 check (view_count >= 0),
  homepage_slot public.homepage_slot,
  author_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index articles_status_published_at_idx
  on public.articles (status, published_at desc);

create index articles_category_id_idx on public.articles (category_id);

create index articles_homepage_slot_idx
  on public.articles (homepage_slot)
  where homepage_slot is not null;

create index articles_view_count_idx on public.articles (view_count desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_set_updated_at
before update on public.articles
for each row
execute function public.set_updated_at();

create or replace function public.is_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'editor')
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, display_name)
  values (
    new.id,
    'editor',
    coalesce(new.raw_user_meta_data ->> 'display_name', new.email)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.categories enable row level security;
alter table public.profiles enable row level security;
alter table public.articles enable row level security;

create policy "categories_public_read"
on public.categories
for select
to anon, authenticated
using (true);

create policy "profiles_read_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "profiles_admin_read_all"
on public.profiles
for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "articles_public_read_published"
on public.articles
for select
to anon, authenticated
using (status = 'published');

create policy "articles_editors_select_all"
on public.articles
for select
to authenticated
using (public.is_editor());

create policy "articles_editors_insert"
on public.articles
for insert
to authenticated
with check (public.is_editor());

create policy "articles_editors_update"
on public.articles
for update
to authenticated
using (public.is_editor())
with check (public.is_editor());

create policy "articles_editors_delete"
on public.articles
for delete
to authenticated
using (public.is_editor());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'article-covers',
  'article-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

create policy "article_covers_public_read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'article-covers');

create policy "article_covers_editors_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'article-covers'
  and public.is_editor()
);

create policy "article_covers_editors_update"
on storage.objects
for update
to authenticated
using (bucket_id = 'article-covers' and public.is_editor())
with check (bucket_id = 'article-covers' and public.is_editor());

create policy "article_covers_editors_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'article-covers' and public.is_editor());

insert into public.categories (slug, label, name, sort_order) values
  ('gundem', 'GÜNDEM', 'Gündem', 1),
  ('turkiye', 'TÜRKİYE', 'Türkiye', 2),
  ('denizli', 'DENİZLİ', 'Denizli', 3),
  ('ekonomi', 'EKONOMİ', 'Ekonomi', 4),
  ('spor', 'SPOR', 'Spor', 5),
  ('egitim', 'EĞİTİM', 'Eğitim', 6),
  ('asayis', 'ASAYİŞ', 'Asayiş', 7),
  ('siyaset', 'SİYASET', 'Siyaset', 8),
  ('yasam', 'YAŞAM', 'Yaşam', 9);
