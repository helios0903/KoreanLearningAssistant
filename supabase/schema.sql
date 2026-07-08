-- Korean Flashcards — Supabase schema
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run.

create extension if not exists pgcrypto;

create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  korean text not null,
  chinese text not null,
  status text not null default 'new' check (status in ('new', 'learned', 'review')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists flashcards_user_id_idx on public.flashcards (user_id);

-- Row Level Security: every user can only ever see/change their own cards.
alter table public.flashcards enable row level security;

drop policy if exists "Users can view own flashcards" on public.flashcards;
create policy "Users can view own flashcards"
  on public.flashcards for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own flashcards" on public.flashcards;
create policy "Users can insert own flashcards"
  on public.flashcards for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own flashcards" on public.flashcards;
create policy "Users can update own flashcards"
  on public.flashcards for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own flashcards" on public.flashcards;
create policy "Users can delete own flashcards"
  on public.flashcards for delete
  using (auth.uid() = user_id);

-- Keep updated_at fresh on every edit.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists flashcards_set_updated_at on public.flashcards;
create trigger flashcards_set_updated_at
before update on public.flashcards
for each row execute function public.set_updated_at();

-- Turn on realtime change broadcasts for this table so every signed-in
-- device gets instant updates. (Also double-check this in Dashboard ->
-- Database -> Replication -> supabase_realtime, the table should be listed.)
-- Wrapped so re-running this script is safe even if already added.
do $$
begin
  alter publication supabase_realtime add table public.flashcards;
exception
  when duplicate_object then null;
end $$;
