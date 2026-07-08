import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-DaTckOMQ.js
console.error("[EMS] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Create a .env file (see .env.example) and set them in Netlify → Site settings → Environment variables.");
var supabase = createClient("https://placeholder.supabase.co", "placeholder-anon-key", { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true
} });
//#endregion
export { supabase as t };
