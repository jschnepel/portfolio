# Portfolio Bold Restyle — Design Doc

**Date:** 2026-06-23
**Owner:** Joey Schnepel
**Archetype:** Disciplined dark text-first craft, robotics/terminal point of view (Brittany Chiang / Rauno / Linear discipline — NOT 3D spectacle).

## Goal

Keep the existing Next.js 15 / React 19 / Tailwind 4 architecture, content, and dark/terminal DNA. Aggressively rework the **visual system** so the site reads as "exceptional," not "competent dark template." Add a designed light/escape theme. Defer the live ballbot physics sim to Phase 2.

## Decisions (locked)

- **Hero:** Keep the skeleton-on-flamingo space image as the hero. Fix hierarchy, type scale, and overlay treatment around it.
- **Ballbot sim:** Phase 2. This restyle does NOT build the inverted-pendulum physics. `BallbotFollower` stays as-is for now (but must respect the theme + reduced-motion).
- **Theme:** Add a real light mode + toggle. Dark is default and primary; light is a deliberately-designed escape hatch, not an afterthought.

## Non-goals

- No new aesthetic direction (no Swiss/brutalist/3D pivot).
- No live physics sim, no embedded ML demo, no functional terminal upgrade (all Phase 2+).
- No content rewrite. No backend. No router/architecture changes.

---

## 1. Theme system (new capability)

**Mechanics**
- `data-theme="dark" | "light"` on `<html>`. Default `dark`.
- Client `ThemeProvider` (small) + a toggle in `Nav`. Persist to `localStorage("theme")`. On first visit, respect `prefers-color-scheme`.
- **No-flash:** inline `<script>` in `<head>` (via `layout.tsx`) sets the attribute before paint from localStorage/media query.
- Honor `prefers-reduced-motion` for the toggle transition (no cross-fade if reduced).

**Token strategy (Tailwind v4)**
- Keep `@theme` for *static* tokens: fonts, the 4 domain accents, type scale, spacing, radii, easing.
- Move *color* tokens (bg, surfaces, borders, text ramp, divider, noise opacity) to CSS custom properties defined on `:root` (dark) and overridden under `[data-theme="light"]`. Components reference `var(--color-*)` — they already mostly do.
- Accents get light-mode variants where contrast demands it (e.g. yellow/green darkened ~1 step for legibility on light surfaces). Define `--accent-*` per theme.

**Surface scale (4 steps, per theme)** — `--surface-0` (canvas) → `--surface-1` → `--surface-2` → `--surface-3` (elevated).

**Hero in light mode:** the hero is a dark space image; it keeps its own dark treatment in both themes (dark hero → light body is intentional and common). The overlay gradient resolves into `--color-bg` of the active theme.

**Other theme-aware pieces:** `FrostLayers`, `BlurredBackground`, noise overlay, `ScrollProgress`, scrollbar, selection, focus rings, dividers, prose.

## 2. Typography discipline (Linear/Vercel mechanics over existing character)

Keep the three families: **Chakra Petch** (display/headings), **Barlow** (body), **Share Tech Mono** (labels/metrics/telemetry).

- **Violent scale contrast.** Define a real type scale token set. Push display sizes up (hero `clamp(48px, 7vw, 92px)`), keep labels tiny (11px mono). Big jump between display and body.
- **Negative tracking on display:** -1px to -2px (`letter-spacing`) on the largest headings; current `.page-title` -0.5px → push display tier further.
- **Mono is rationed:** only section labels (`// like this`), metrics/stats, version/date tags, and telemetry. Never body copy.
- **`tabular-nums`** on every metric/stat/number (extend the existing stat treatment).
- **Tight weight scale:** Chakra Petch 700 for display only; body weights 400/500. Avoid mid-weight sprawl.

## 3. Color discipline — accents as status lights

Four domain accents (`robotics #00E5A0`, `ai #4DA8FF`, `platform #F5C344`, `coaching #FF6B4A`) are a real strength. Rules:
- An accent appears **only within its domain's context** (that project's card/case study/tag) **+ at most one primary action** per screen.
- Never sprinkle all four together as decoration. The featured area uses ONE accent at a time.
- Default link/active/focus uses a single neutral-leaning accent (AI blue) so the domain colors stay meaningful.
- Hover/active states key off the relevant domain accent (the existing `ColorBleed` already does this — keep, make theme-aware).

## 4. Hierarchy & layout per page

**Home (`HomeClient`)**
- Hero: keep image; rework the gradient/overlay for cleaner text legibility; apply new display scale + tracking; tighten the intro→name→tagline→blurb→stats rhythm (less uniform spacing, intentional rhythm). Stats get bigger and `tabular-nums`.
- **Featured work → asymmetric bento.** Replace the 3 equal cards with **one large featured project (Ballbot) + two smaller** — real hierarchy. Each card gains a one-line **quantified result** chip (e.g. "60% faster inspection"). Cards use shadow-as-border elevation + their domain accent on hover only.
- Keep "How I think", Duck Hunt ("break time"), Writing, Footer — restyle to the new system; ensure each section has a clear label + rhythm.

**Projects (`ProjectsClient`)**
- Lead with one **featured large tile**, then the grid. Add quantified-result chips and recruiter-scannable stack tags per card. Elevation via shadow-as-border, not flat fills.

**Resume (`ResumeClient`)**
- **Add an `<h1>`** ("Resume" / name) — fixes the a11y/SEO gap.
- Restructure for hierarchy: clear section headers, stronger rhythm between blocks, the client-logo row treated as a designed band (not a flat dump). Keep the red accent bar idea but align it to the accent-discipline rules.

**Contact (`/contact`)**
- Build out the empty space: a larger typographic statement, an **availability status line** (status-light dot), the three channels (email/LinkedIn/GitHub) as designed rows with real hover/focus/copy states. Email row supports click-to-copy with a "Copied" state (Rauno mechanic).

## 5. Elevation recipe

- `box-shadow: 0 0 0 1px var(--surface-border), 0 8px 30px -12px rgba(0,0,0,.5)` style for elevated cards (shadow-as-border + soft drop), tuned per theme.
- 4-step surface scale (above). Cards sit on `--surface-1/2`, hover lifts to next step + accent border.

## 6. Robustness fixes

- **ScrollReveal failsafe:** content must not be permanently invisible if JS/observer fails. Add a fallback (e.g. reveal-after-timeout, or `@media (scripting: none)` / `.no-js` reveal, or initial-in-viewport elements start visible). Keep the animation for the JS-happy path.
- **Resume `h1`** (also under §4).
- Keep all existing reduced-motion handling; extend it to the theme toggle and any new motion.

## 7. Out-of-scope follow-ups (Phase 2, noted not built)

- Live inverted-pendulum ballbot sim + `status` terminal telemetry command.
- Embedded interactive ML artifact (defect-detection / embedding viz).
- Video-led case studies.
- Functional terminal (autocomplete, history).

---

## Testing / verification

- Re-run the Playwright audit (desktop 1440 + mobile 390) across all 5 routes in **both themes**: zero console/page errors, resume has exactly one `h1`, all imgs have alt, all interactive elements have accessible names.
- Visual screenshots of every route × {dark, light} × {desktop, mobile} reviewed for hierarchy/contrast.
- Theme toggle: no flash on load, persists across reload, respects system preference on first visit.
- `prefers-reduced-motion`: no reveal/shimmer/toggle motion; content fully visible.
- Contrast check on light mode text + accents (WCAG AA for body text).
