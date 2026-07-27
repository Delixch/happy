-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query).
-- It locks down writes to authenticated users only, while keeping reads public
-- (the public website reads these tables anonymously).
--
-- Safe to re-run: policies are dropped and recreated each time.

do $$
declare
  t text;
begin
  foreach t in array array['menu_items', 'team_members', 'media_items', 'jobs', 'daily_specials', 'deals', 'instagram_posts']
  loop
    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "Public read access" on public.%I;', t);
    execute format('create policy "Public read access" on public.%I for select using (true);', t);

    execute format('drop policy if exists "Authenticated insert access" on public.%I;', t);
    execute format('create policy "Authenticated insert access" on public.%I for insert to authenticated with check (true);', t);

    execute format('drop policy if exists "Authenticated update access" on public.%I;', t);
    execute format('create policy "Authenticated update access" on public.%I for update to authenticated using (true) with check (true);', t);

    execute format('drop policy if exists "Authenticated delete access" on public.%I;', t);
    execute format('create policy "Authenticated delete access" on public.%I for delete to authenticated using (true);', t);
  end loop;
end $$;
