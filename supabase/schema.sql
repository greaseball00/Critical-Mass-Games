-- Critical Mass Games — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- ============================================================
-- PROFILES
-- Extends auth.users with public profile data
-- ============================================================
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  username    text unique,
  full_name   text,
  avatar_url  text,
  bio         text,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- BOOKINGS
-- Table reservations tied to a user
-- ============================================================
create table if not exists public.bookings (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  table_id    integer not null check (table_id between 1 and 6),
  table_name  text not null,
  date        date not null,
  time_slot   text not null,
  duration    text not null,
  game_type   text not null,
  players     integer not null check (players >= 1 and players <= 10),
  notes       text,
  status      text default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed')),
  created_at  timestamptz default now() not null
);

-- Prevent double-booking the same table on the same date + time
create unique index if not exists bookings_no_overlap
  on public.bookings (table_id, date, time_slot)
  where status = 'confirmed';

-- ============================================================
-- EVENT SIGNUPS
-- User registration for weekly/special events
-- ============================================================
create table if not exists public.event_signups (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid references auth.users(id) on delete cascade not null,
  event_id     integer not null,
  event_title  text not null,
  event_date   date not null,
  event_time   text not null,
  created_at   timestamptz default now() not null,
  unique (user_id, event_id)  -- one signup per event per user
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Profiles: public read, own write
alter table public.profiles enable row level security;

create policy "Profiles are publicly readable"
  on public.profiles for select using (true);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Bookings: private — users see only their own
alter table public.bookings enable row level security;

create policy "Users can view their own bookings"
  on public.bookings for select using (auth.uid() = user_id);

create policy "Users can insert their own bookings"
  on public.bookings for insert with check (auth.uid() = user_id);

create policy "Users can cancel their own bookings"
  on public.bookings for update using (auth.uid() = user_id);

-- Event signups: private
alter table public.event_signups enable row level security;

create policy "Users can view their own event signups"
  on public.event_signups for select using (auth.uid() = user_id);

create policy "Users can sign up for events"
  on public.event_signups for insert with check (auth.uid() = user_id);

create policy "Users can remove their own event signups"
  on public.event_signups for delete using (auth.uid() = user_id);
