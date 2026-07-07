import { defineNitroConfig } from "nitro/config";

// Deploy target. This project is configured for TanStack Start SSR on Netlify.
// Override with NITRO_PRESET only when intentionally building for another host.
export default defineNitroConfig({
  preset: process.env.NITRO_PRESET ?? "netlify",
});
