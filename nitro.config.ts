import { defineNitroConfig } from "nitro/config";

// Deploy target. Overridable via NITRO_PRESET env var.
// - Lovable / Cloudflare (default): NITRO_PRESET=cloudflare_module
// - Netlify: set NITRO_PRESET=netlify (already wired in netlify.toml)
export default defineNitroConfig({
  preset: process.env.NITRO_PRESET ?? "cloudflare_module",
});
