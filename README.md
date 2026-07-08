# Employee Management System

A production-ready Employee Management System built with TanStack Start, React
19, TypeScript, Tailwind, shadcn/ui, TanStack Query, Supabase, and Recharts.

## Features

- **Auth** — email/password, Google OAuth, sign-up, forgot / reset password,
  session persistence, protected routes, auto-redirect.
- **Dashboard** — totals, active/inactive, department count, joins-this-month,
  employee growth (area chart), department distribution (pie), salary
  distribution (bar), recent employees list.
- **Employees module** — CRUD, search, filter by department + status,
  sortable columns, pagination, bulk delete, CSV/Excel export, CSV import,
  profile image upload (Supabase Storage), detail page.
- **UI** — Glassmorphism, aurora gradient auth screen, dark/light themes,
  loading skeletons, empty states, toast notifications, confirmation dialogs,
  fully responsive (mobile drawer sidebar).
- **Validation** — every form validated with Zod.
- **Deployment** — Netlify SSR via Nitro, only two env vars needed.

## Tech stack

React 19 · TypeScript · Vite · TanStack Start · TanStack Router · TanStack
Query · Tailwind CSS · shadcn/ui · Supabase (auth · Postgres · Storage) ·
React Hook Form · Zod · Recharts · Framer Motion · Lucide.

## Folder structure

```
src/
  components/       # UI + feature components (employees, layout, ui/*)
  hooks/            # useAuth, useTheme
  lib/              # supabase client, csv utils, small helpers
  routes/           # TanStack file-based routes
    _authenticated/ # protected subtree (ssr:false + auth gate)
  schemas/          # Zod schemas
  services/         # authService, employeeService, storageService
  types/            # shared TS types
docs/
  supabase-schema.sql   # paste into Supabase SQL editor
  DEPLOYMENT.md         # full deployment walkthrough
```

## Quick start

```bash
cp .env.example .env      # then paste your Supabase URL + anon key
bun install
bun run dev
```

Then open the printed local URL. The first thing you'll see is the sign-in
screen. Create an account, confirm your email in Supabase (or disable email
confirmations in Auth settings during dev), and you'll land on the dashboard.

## Setup checklist

1. **Supabase** — create a project, paste `docs/supabase-schema.sql` into the
   SQL editor and run it. This creates the `employees` table, RLS policies,
   the `employee-images` storage bucket, and its storage policies.
2. **Env vars** — copy `.env.example` to `.env` and paste your Supabase
   Project URL + anon key.
3. **Google OAuth** (optional) — enable Google in Supabase → Authentication →
   Providers. Details in [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).
4. **Netlify** — connect the repo. Set `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY` in Site settings → Environment variables. Deploy.

Full walkthrough with URL-configuration screenshots and CORS notes is in
[`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Vite dev server with HMR |
| `bun run build` | Production Nitro/Netlify build |
| `bun run build:dev` | Development-mode build (used for sanity checks) |
| `bun run preview` | Preview the built app locally |
| `bun run lint` | ESLint |
| `bun run format` | Prettier |

## API layer

All Supabase access lives in `src/services/`:

- `authService` — sign in/up, Google OAuth, password reset, sign out.
- `employeeService` — list/get/create/update/delete/bulkRemove/bulkInsert/stats.
- `storageService` — upload/delete profile images.

Pages consume services via TanStack Query hooks (`useQuery`, `useMutation`).
No fetching logic lives inside components.

## Deployment

See [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) for the full Netlify +
Supabase + Google OAuth walkthrough. TL;DR: push to GitHub, connect on
Netlify, set two env vars, deploy.
