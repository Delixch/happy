-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query).
-- It locks down writes to authenticated users only, while keeping reads public
-- (the public website reads these tables anonymously).
--
-- Safe to re-run: ALL existing policies on each table are dropped first
-- (whatever they're named), then the correct 4 are recreated. This matters
-- because Postgres RLS policies are OR'd together -- a single leftover
-- permissive policy from when the table was first created is enough to let
-- anonymous writes through even after adding a stricter one alongside it.

do $$
declare
  t text;
  pol record;
begin
  foreach t in array array['menu_items', 'team_members', 'media_items', 'jobs', 'daily_specials', 'deals', 'instagram_posts']
  loop
    execute format('alter table public.%I enable row level security;', t);

    for pol in select policyname from pg_policies where schemaname = 'public' and tablename = t
    loop
      execute format('drop policy if exists %I on public.%I;', pol.policyname, t);
    end loop;

    execute format('create policy "Public read access" on public.%I for select using (true);', t);
    execute format('create policy "Authenticated insert access" on public.%I for insert to authenticated with check (true);', t);
    execute format('create policy "Authenticated update access" on public.%I for update to authenticated using (true) with check (true);', t);
    execute format('create policy "Authenticated delete access" on public.%I for delete to authenticated using (true);', t);
  end loop;
end $$;

-- Verify: should show exactly 4 rows per table, all named as above.
select tablename, policyname, roles, cmd
from pg_policies
where schemaname = 'public'
order by tablename, cmd;
