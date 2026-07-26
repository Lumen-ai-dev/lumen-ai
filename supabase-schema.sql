-- Run this in Supabase: Project → SQL Editor → New query → paste this → Run

create table profiles (
  id uuid references auth.users on delete cascade primary key,
  plan text not null default 'free',              -- 'free' or 'pro'
  messages_used_today int not null default 0,
  last_reset_date date not null default current_date,
  created_at timestamp with time zone default now()
);

-- Security: each person can only see and edit their own profile row
alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );
