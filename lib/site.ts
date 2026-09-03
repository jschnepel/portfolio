/**
 * Canonical site constants.
 *
 * These live outside app/ because Next.js route files (layout.tsx, page.tsx,
 * robots.ts, sitemap.ts) may only export a fixed set of names — exporting
 * anything else from them fails the build.
 *
 * SITE_URL must be a host that actually resolves. The apex domain does not, so
 * pointing this at it would emit every og:image against a dead URL.
 */
export const SITE_URL = "https://www.joeyschnepel.com";

export const SITE_DESCRIPTION =
  "Software engineer with a Master's in AI/ML, building interactive AI characters and autonomous systems that perceive and reason about people.";
