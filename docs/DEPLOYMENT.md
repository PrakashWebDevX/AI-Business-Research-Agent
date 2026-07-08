# Deployment guide

## 1 — Supabase setup (5 min)

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → paste the entire contents of
   [`docs/supabase-schema.sql`](./supabase-schema.sql) → **Run**. This creates the
   `employees` table, RLS policies, the `employee-images` storage bucket, and its
   storage policies.
3. **Project Settings → API** — copy:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`

### Enable Google sign-in

1. **Authentication → Providers → Google → Enable**.
2. In Google Cloud Console, create an **OAuth 2.0 Client ID** (type: Web application).
   - Authorized redirect URI: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
     (Supabase shows the exact URL on that page.)
3. Paste the Google Client ID + Secret into the Supabase Google provider form → **Save**.
4. **Authentication → URL Configuration** → set:
   - Site URL: `https://your-site.netlify.app`
   - Redirect URLs: add `https://your-site.netlify.app/**` and `http://localhost:5173/**`.

### Email sign-in / password reset

- **Authentication → Providers → Email**: leave "Enable email provider" ON.
- **Email templates → Reset password**: the redirect uses the `redirectTo`
  the app already sends (`/reset-password`). No template edits required.

---

## 2 — Local development

```bash
cp .env.example .env
# edit .env — paste the Supabase URL + anon key
bun install
bun run dev
```

App runs on `http://localhost:5173` (or whatever port Vite prints).

---

## 3 — Deploy to Netlify

The project is a TanStack Start SSR app built by Nitro's `netlify` preset.
`netlify.toml` already configures the correct build:

```toml
[build]
  command = "bun run build"
  publish = "dist/client"

[build.environment]
  NODE_VERSION = "22"
  NITRO_PRESET = "netlify"
```

### Steps

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Netlify: **Add new site → Import from Git** → pick the repo.
3. **Site settings → Environment variables** → add:
   - `VITE_SUPABASE_URL` = `https://YOUR-PROJECT.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `YOUR-ANON-KEY`
4. **Trigger deploy**. Netlify runs `bun run build`, uploads `dist/client`, and
   auto-detects the Nitro SSR function under `.netlify/functions-internal`.

> The two `VITE_*` variables are the only settings you need to change per
> environment. Do NOT set a manual `functions` directory or SPA redirects —
> Nitro emits `dist/client/_redirects` automatically.

After the first deploy, go back to Supabase → Authentication → URL
Configuration and add your `.netlify.app` URL (or custom domain) to the
Site URL and Redirect URLs list.

---

## 4 — Sanity checklist

- [ ] SQL script ran without errors.
- [ ] `employee-images` bucket is public in Supabase Storage.
- [ ] Google OAuth callback is registered in Google Cloud + Supabase.
- [ ] Netlify env vars `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set.
- [ ] Netlify Site URL added to Supabase Auth → URL Configuration.
- [ ] Sign up with email works, and the confirmation email arrives.
- [ ] `/dashboard` loads after sign-in with a valid session.
