import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // Fail loudly in the browser console; UI shows a config error banner.
  // eslint-disable-next-line no-console
  console.error(
    "[EMS] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
      "Create a .env file (see .env.example) and set them in Netlify → Site settings → Environment variables.",
  );
}

export const supabase: SupabaseClient = createClient(
  url ?? "https://placeholder.supabase.co",
  anonKey ?? "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

export const isSupabaseConfigured = Boolean(url && anonKey);
