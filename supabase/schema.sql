create extension if not exists "pgcrypto";

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  assignee text,
  due_date date,
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  created_by text,
  created_at timestamptz not null default now()
);

alter table tasks enable row level security;

-- Office board with no login: everyone with the link can read/write.
-- Tighten this policy if you later add real authentication.
create policy "public full access" on tasks
  for all
  using (true)
  with check (true);

alter publication supabase_realtime add table tasks;
