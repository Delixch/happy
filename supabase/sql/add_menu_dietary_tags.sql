-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query).
-- Adds vegan/vegetarian flags to menu_items so the Speisekarte can filter by them.
-- Safe to re-run: IF NOT EXISTS skips columns that are already there.

alter table public.menu_items
  add column if not exists is_vegan boolean not null default false,
  add column if not exists is_vegetarian boolean not null default false;
