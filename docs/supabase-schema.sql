-- =====================================================================
-- Employee Management System — Supabase schema
-- Paste this entire file into Supabase → SQL Editor → New query → Run.
-- Safe to re-run (idempotent).
-- =====================================================================

-- 1. Enum for employee status ------------------------------------------
do $$ begin
  create type public.employee_status as enum ('active', 'inactive', 'on_leave');
exception when duplicate_object then null; end $$;

-- 2. Employees table ---------------------------------------------------
create table if not exists public.employees (
  id             uuid primary key default gen_random_uuid(),
  employee_id    text not null unique,
  first_name     text not null,
  last_name      text not null,
  email          text not null unique,
  phone          text,
  gender         text,
  department     text,
  designation    text,
  salary         numeric(12, 2),
  joining_date   date,
  date_of_birth  date,
  address        text,
  city           text,
  state          text,
  country        text,
  zip_code       text,
  status         public.employee_status not null default 'active',
  profile_image  text,
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists employees_department_idx on public.employees (department);
create index if not exists employees_status_idx     on public.employees (status);
create index if not exists employees_created_at_idx on public.employees (created_at desc);

-- 3. updated_at trigger ------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists employees_set_updated_at on public.employees;
create trigger employees_set_updated_at
  before update on public.employees
  for each row execute function public.set_updated_at();

-- 4. Data API grants (required for PostgREST) --------------------------
grant select, insert, update, delete on public.employees to authenticated;
grant all on public.employees to service_role;

-- 5. Row Level Security ------------------------------------------------
alter table public.employees enable row level security;

drop policy if exists "employees_select_authenticated" on public.employees;
create policy "employees_select_authenticated"
  on public.employees for select
  to authenticated
  using (true);

drop policy if exists "employees_insert_authenticated" on public.employees;
create policy "employees_insert_authenticated"
  on public.employees for insert
  to authenticated
  with check (true);

drop policy if exists "employees_update_authenticated" on public.employees;
create policy "employees_update_authenticated"
  on public.employees for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "employees_delete_authenticated" on public.employees;
create policy "employees_delete_authenticated"
  on public.employees for delete
  to authenticated
  using (true);

-- =====================================================================
-- 6. Storage bucket for profile images
-- =====================================================================
insert into storage.buckets (id, name, public)
  values ('employee-images', 'employee-images', true)
  on conflict (id) do update set public = excluded.public;

-- Storage policies: any authenticated user can manage employee photos
drop policy if exists "employee_images_read"   on storage.objects;
create policy "employee_images_read"
  on storage.objects for select
  to public
  using (bucket_id = 'employee-images');

drop policy if exists "employee_images_insert" on storage.objects;
create policy "employee_images_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'employee-images');

drop policy if exists "employee_images_update" on storage.objects;
create policy "employee_images_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'employee-images')
  with check (bucket_id = 'employee-images');

drop policy if exists "employee_images_delete" on storage.objects;
create policy "employee_images_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'employee-images');
