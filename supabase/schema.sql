-- Run this once in the Supabase SQL Editor.
-- The browser client uses only the publishable/anon key; RLS protects every row.

create table if not exists public.planner_documents (
  user_id uuid primary key references auth.users(id) on delete cascade,
  tasks jsonb not null default '[]'::jsonb,
  sessions jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.planner_documents enable row level security;

drop policy if exists "Users can read their planner" on public.planner_documents;
create policy "Users can read their planner"
  on public.planner_documents for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their planner" on public.planner_documents;
create policy "Users can insert their planner"
  on public.planner_documents for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their planner" on public.planner_documents;
create policy "Users can update their planner"
  on public.planner_documents for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
