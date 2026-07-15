# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository. This file is the
source of truth for **how the portfolio is built, where every piece of content lives,
and what is currently going on**. Keep the [Portfolio Timeline](#-portfolio-timeline-living-section)
section updated — it is the living log of Aaryan's latest work and life.

> Last verified against the codebase: **2026-06-25** (production build passing). If you make structural changes,
> re-verify the affected section and update the date in the relevant entry.

---

## 1. What this is

A personal portfolio site for **Aaryan Mori** — full-stack software engineer & founder.
It is a small, content-dense, statically-renderable site: a landing page, a work/case-study
page, a scaffolded blog, and a custom 404. All content is **hardcoded in the components**
(no CMS, no database, no API, no runtime env vars).

- **Live URL:** https://aaryanmori.vercel.app/
- **Repo:** https://github.com/Moriyan1307/portfolio
- **Deploy target:** Vercel (zero-config; no `vercel.json`)
- **Current era:** "V2.0" redesign (commit `ab49f6e "Revamped version V2.0"`). The README
  predates V2.0 and is partially stale — **trust this file over README.md** (see §9).

---

## 2. Commands

Package manager is **Bun** (only `bun.lock` is committed). npm/pnpm/yarn also work.

```bash
bun install        # install deps (run this first — see lockfile drift note in §9)
bun run dev        # next dev --turbopack → http://localhost:3000
bun run build      # next build (production bundler, NOT turbopack)
bun run start      # serve the production build
bun run lint       # next lint (eslint flat config: next/core-web-vitals + next/typescript)
```

There are **no tests, no CI** (`.github/` absent), **no Prettier config**. `next lint` is the
only quality gate. There is no `engines` field and no `.nvmrc`; Node 18.18+/20+ is expected.

---

## 3. Tech stack

| Concern        | Choice                                                                 |
|----------------|-----------------------------------------------------------------------|
| Framework      | Next.js **15.3.8** (App Router, `src/app`) — lockfile reconciled 2026-06-25 |
| UI             | React **19**, TypeScript **5** (strict)                               |
| Styling        | Tailwind CSS **v4** (CSS-first, **no `tailwind.config.*`**) via `@tailwindcss/postcss` |
| Theming        | `next-themes` (`attribute="class"`, `defaultTheme="system"`) — ⚠️ partly non-functional, see §9 |
| Analytics      | `@vercel/analytics` + `@vercel/speed-insights` (only emit on Vercel)  |
| Fonts          | **Space Grotesk** + Inter via Google Fonts `@import` in `globals.css` (weights 400/500/600 only — no bold) |
| Code highlight | `sugar-high` — installed but **unused** (intended for the unbuilt blog) |

Path alias: `@/*` → `./src/*` (e.g. `@/components/nav`).

---

## 4. Architecture & routes

The root layout (`src/app/layout.tsx`, a **Server Component**) defines all SEO metadata,
wraps the app in `ThemeProvider`, and renders a fixed `<Navbar>` header, `{children}`, a
`<Footer>`, and the two Vercel analytics components.

### Route table

| Route          | File                              | Render | Notes |
|----------------|-----------------------------------|--------|-------|
| `/`            | `src/app/page.tsx`                | Client (`"use client"`) | Landing page; live clock + typewriter |
| `/work`        | `src/app/work/page.tsx`           | Client (`"use client"`) | Case studies + category filter |
| `/blog`        | `src/app/blog/page.tsx`           | Server | **Stub** — "Coming soon …"; nav labels it "Notes" |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx`    | Server | **Stub** — no `generateStaticParams`/metadata; `[slug]` unused |
| 404            | `src/app/not-found.tsx`           | Server | Custom 404 |
| `/privacy`     | — **missing** —                   | —      | ⚠️ Linked in footer but no page → 404 |
| `/terms`       | — **missing** —                   | —      | ⚠️ Linked in footer but no page → 404 |

- `src/app/taglines/taglines.tsx` is **NOT a route** — it's a data module exporting the
  `taglines` array consumed by the home page.
- No `sitemap.ts`, `robots.ts`, `loading.tsx`, `error.tsx`, or `template.tsx` exist.

### Component / file map

| File | Role |
|------|------|
| `src/app/layout.tsx` | Root layout, metadata, ThemeProvider, header/main/footer shell, analytics |
| `src/app/page.tsx` | Home — `LiveTime` clock, typewriter, and 6 sections (see §6) |
| `src/app/work/page.tsx` | Work — `filters` + `workStreams` data, filter state, `projectGrid` |
| `src/app/taglines/taglines.tsx` | 29 rotating hero taglines (data array) |
| `src/components/nav.tsx` | Navbar (Client) — `navItems`, `connectLinks`, active-link underline |
| `src/components/footer.tsx` | Footer — socials, dynamic-year copyright, legal links |
| `src/app/globals.css` | The entire design system (see §5) |
| `public/logo.svg` | Logo + favicon (used in nav, footer, metadata icon) |
| `public/og-image.png` | OG/Twitter share image (⚠️ actually 1200×1200, see §9) |

---

## 5. Design system (`src/app/globals.css`, 302 lines)

Tailwind v4 is configured **entirely in CSS** — there is no config file. Tokens are CSS
custom properties; a subset is exposed as Tailwind utilities via `@theme inline`.

### Color tokens (light / dark)

| Token | Light | Dark |
|-------|-------|------|
| `--background` | `#f5f5f7` | `#050505` |
| `--background-muted` | `#ededf1` | `#0d0d10` |
| `--foreground` | `#0a0a0a` | `#f5f5f7` |
| `--secondary` | `#6e6e73` | `#b3b3bd` |
| `--accent` | `#0b0b0e` | `#fefefe` |
| `--surface` | `rgba(255,255,255,.85)` | `rgba(15,15,20,.85)` |
| `--border` | `rgba(10,10,10,.08)` | `rgba(250,250,255,.08)` |
| `--success`/`--warning`/`--error` | `#1aa24b` / `#f5a524` / `#eb3f3f` | (same — not adjusted for dark) |

### Type scale (custom utility classes)
`.text-hero` (clamp 2.75→4.5rem), `.text-display` (2→3rem), `.text-headline` (1.5→2.25rem),
`.text-body` (1.125rem, `--secondary`), `.section-title`, `.section-eyebrow` (uppercase, 0.4em tracking).

### Layout / components
`.page-shell` (max-width **1200px** container), `.section-shell` (vertical rhythm + hairline
dividers), `.soft-card` (28px radius, blur, `--shadow-soft`), `.pill` / `.filter-pill[data-active]`,
`.glass` (⚠️ **defined but unused**), `.film-grain` (decorative SVG noise overlay).

### Motion
Keyframes `fadeInUp`, `fadeIn`, `scaleIn` → classes `.animate-fade-in-up`, `.animate-fade-in`
(unused), `.animate-scale-in`; `.stagger-1..5` delays (only `.stagger-2` is used).
`.transition-apple` = `all .3s cubic-bezier(.25,.46,.45,.94)` is the shared interaction easing.
Two JS-driven effects in `page.tsx`: the **live clock** (1s `setInterval`) and the **typewriter**
(type 65ms / delete 45ms / pause 2600ms). ⚠️ **No `prefers-reduced-motion` handling anywhere.**

---

## 6. Content & data model — where to edit what

Everything is hardcoded. There is no shared config for contact info, so the same values are
duplicated in several files. **When changing contact details, update ALL sites listed below.**

### Home page sections (`src/app/page.tsx`, ~501 lines, all inline)
In order: **Hero** (location pill, role eyebrow, H1 "Software that feels inevitable.", bio,
`heroStats`, two CTA buttons, `LiveTime`, typewriter, Signal board with `currentFocus` +
`operatingPrinciples`) → **Spotlight** (Misprint) → **Capabilities** (`capabilityAreas`,
"How I operate.") → **Career** (`journeyHighlights`, "Career headlines…") → **Signals/achievements**
(`achievementMoments`, "Moments I'm proud of.") → **CTA**. Edit the local `const` arrays or the
JSX literals directly.

### Work / experience (`src/app/work/page.tsx`, ~397 lines)
- `filters` (line ~6): `["All","Startups","Infrastructure","Education","Health","Studios"]`
- `workStreams` (lines ~15–167): array of **4 role objects**, reverse-chronological by hand.
  Shape: `{ id, role, company, timeline, location, summary, categories[], stack[], impact[], showcases[] }`.
  Each `showcase` = `{ title, description, technologies[], metrics{} }`.
- `projectGrid` (derived): flattens **all 7 showcases** for the "Spotlights" grid.

**To add/update a role:** edit the `workStreams` object. Place new roles at the **top** of the
array to appear first (no auto date-sort). Rules:
- `id` must be **unique** (used as React key *and* as `projectGrid` id prefix).
- `categories` values must **exactly match** strings in `filters` (case-sensitive) or the role
  won't appear under that filter. To add a category, add it to `filters` too.
- `metrics` **object keys are rendered as the on-screen labels** (uppercase) — write
  human-readable keys (`users`, `latency`, `uptime`). Data shape == presentation here.
- The category filter only filters the **role cards**, not the Spotlights grid (intentional).

### Taglines (`src/app/taglines/taglines.tsx`)
Plain string array (29 entries). ⚠️ `"Where elegant code meets human need."` is **duplicated**
(file lines 9 & 11 = array indices 7 & 9) — dedupe candidate.

### Nav (`src/components/nav.tsx`) & Footer (`src/components/footer.tsx`)
- `navItems`: Home `/`, Work `/work`, **Notes** `/blog`.
- `connectLinks` / footer links + the footer legal links `/privacy`, `/terms`.

### SEO / social (`src/app/layout.tsx` `metadata`)
Title, description, keywords, `openGraph`, `twitter` (`@aaryanmori`), `icons` (`/logo.svg`),
`metadataBase` = `https://aaryanmori.vercel.app/`. The canonical URL is hardcoded in 3 spots here.

### Contact info — duplicated edit sites (⚠️ keep in sync)
| Value | Where it appears |
|-------|------------------|
| Email `aaryanmori@gmail.com` | `page.tsx` (CTA), `work/page.tsx` (×2), `nav.tsx`, `footer.tsx` |
| Calendar `https://calendar.app.google/AzbtoyNQaMngZgXa8` | `page.tsx` const + `work/page.tsx` const (two separate constants) |
| Resume (Google Drive URL) | `nav.tsx`, `footer.tsx` |
| GitHub `github.com/Moriyan1307` | `page.tsx`, `nav.tsx`, `footer.tsx` |
| LinkedIn `linkedin.com/in/aaryan-mori-334098192/` | `nav.tsx`, `footer.tsx` |

---

## 7. Experience snapshot (as the site currently presents it)

This is what `/work` and the home page **currently claim** (most-recent first). Treat the
[Portfolio Timeline](#-portfolio-timeline-living-section) as the live, to-be-updated version.

1. **Stealth Startup** *(never name on site)* — Founding Engineer — *Jan 2026 – Present*, New York City, NY
   - First eng hire at a stealth hospitality revenue platform. Built the **dynamic pricing engine** (real-time rates up to 365 days out, steerable in plain language), an **agentic AI copilot** on the Claude SDK (orchestrator–synthesizer over a vector DB that takes real actions), and a **multi-agent code-review system** on Claude Code. Stack: Next.js + NestJS.
2. **Misprint Inc. (YC W25)** — Founding Software Engineer — *Aug 2025 – Oct 2025*, New York City, NY
   - Real-time valuation engine for Pokémon collectibles. Next.js 15 + Supabase + Postgres + Edge Functions. "60% faster queries", sub-minute freshness.
3. **FabLab** — Lead Full-stack Developer — *Oct 2023 – Dec 2025*, Arlington, TX
   - Scaled FabApp PHP → React/Node for 15K+ students; Azure AD/SAML SSO; "3× faster".
4. **HealthTick** — Software Developer — *Jan 2023 – Aug 2023*, Bangalore, India
   - Real-time psychological assessments (Next.js + Firebase), 2K+ sessions; Strapi health blog (+35% load).
5. **Privilon Technologies** — Founder — *May 2021 – Aug 2023*, Bangalore, India
   - Product studio: 15+ builds, 8 retained clients, 75+ engineers mentored.

Headline stats on the home hero: **15+ products shipped · 15K+ users impacted · 60%+ latency reduced.**
⚠️ The "60%" Misprint latency claim is surfaced in 3 places (heroStats, journeyHighlights,
spotlight) — keep them consistent when editing.

---

## 8. Conventions & gotchas

- **Static, client-heavy:** `/` and `/work` are full `"use client"` components despite static
  data. No data fetching, no env vars required. A redesign could make these RSC with small
  client islands (typewriter/clock, filter).
- **Typographic glyphs in data:** copy uses em-dash `—`, en-dash `–` (timelines), `×`
  ("3× faster"), `→` ("PHP → React"), and curly apostrophes `’`. Match them when editing.
- **Reverse-chronological by hand:** `workStreams` order = page order; there is no date sort.
- **No shared links/config module:** see the duplication table in §6.

---

## 9. Known issues / tech debt (verified 2026-06-22)

Fix these during the redesign; flag before relying on them.

1. **Lockfile drift:** ✅ **Resolved 2026-06-25** via `bun install` — `bun.lock` now resolves
   `next@15.3.8` to match `package.json`. (`eslint-config-next` stays intentionally pinned at `15.3.4`.)
2. **Theme toggle is non-functional:** `next-themes` uses `attribute="class"`, but dark tokens
   only exist under `@media (prefers-color-scheme: dark)` — there is **no `.dark {}` block**, so
   only the OS preference flips the palette and there is no toggle UI. To enable a real toggle,
   move dark tokens into `.dark`/`:root.dark` and add a toggle component.
3. **Dead Tailwind utilities:** `--border-strong`, `--background-muted`, `--grid-line`, `--glow`,
   `--shadow-soft` are raw CSS vars **not mapped in `@theme inline`**, so classes like
   `bg-background-muted` and `border-border-strong` (used across `page.tsx`/`work/page.tsx`)
   **resolve to nothing**. `bg-surface-hover` *is* mapped and works. Add the missing tokens to
   `@theme inline` (or stop using those classes).
4. **Double-nested `<main>`:** `layout.tsx:75` wraps `{children}` in `<main>`, and both
   `page.tsx:202` and `work/page.tsx:191` render their own `<main>` → two nested `<main>` per
   page (HTML-validity / a11y issue). Remove one.
5. **No `suppressHydrationWarning`** on `<html>` despite next-themes mutating the class and the
   client-only clock/typewriter. Add `suppressHydrationWarning` to `<html>` in `layout.tsx`.
6. **OG image mismatch:** metadata declares `1200×630` but `public/og-image.png` is actually
   `1200×1200` — social cards may crop. Fix the file or the dimensions.
7. **Broken footer links:** `/privacy` and `/terms` 404. Create the pages or remove the links.
8. **No `LICENSE` file** though the footer asserts "MIT License."
9. **Orphan asset:** `resume_loc.pdf` sits at repo **root** (not `public/`), is referenced by
   nothing, and isn't served. Real resume links use a Google Drive URL. Move to `public/` or delete.
10. **Dead deps/code:** `sugar-high` (unused), `autoprefixer` (installed but not in
    `postcss.config.mjs`, so it never runs — Tailwind v4 prefixes internally), the `.glass` CSS
    classes, a commented-out "Share a brief" button in `page.tsx`, and the duplicate tagline.
11. **No `prefers-reduced-motion`, no `sitemap.ts`/`robots.ts`, blog is a stub** (the
    `[slug]` route has no data layer).
12. **README is stale** vs V2.0 — it references a "skills matrix"/"service offerings" and a
    "company site" link that no longer exist, and calls the site "single-page." Use this file.

---

## 10. Redesign prototypes — REMOVED 2026-07-14 (this section is historical; `src/app/redesign/` no longer exists)

> Four live design directions for the V3 redesign. **Not linked from the live site and safe to delete
> wholesale.** Each prototype renders as a full-screen overlay (`position:fixed; inset:0; z-index:100`)
> that covers the existing nav/footer, so the current site is visually untouched. All use the real,
> stealth-safe content (the stealth company is never named).

- **View:** `bun run dev` → open `/redesign` (chooser) → click into each. Screenshots also live in
  gitignored `.playwright-mcp/`.
- **Files:** `src/app/redesign/page.tsx` (chooser) + `src/app/redesign/{signal,editorial,quiet,dossier}/page.tsx`.
  Each is a self-contained client component (only `react` + `next/link`; motion via an embedded `<style>`
  block with a slug-prefixed class namespace; no new deps, no shared CSS).

| Slug | Direction | Idea | Note |
|------|-----------|------|------|
| `signal` | Systems & Telemetry | Operator telemetry; career as a deploy log; mono accents + one green | overlaps `dossier`; has decorative uptime/sparkline (figurative) |
| `editorial` | Swiss Typography → **Editorial × Signal-board** | Name-forward hero (giant "Aaryan Mori."), Swiss grid + numbered sections, one vermilion accent | ⭐ **chosen** — revised 2026-06-25 to restore Aaryan's voice: live taglines, clock, film-grain, and full copy |
| `quiet` | Spatial Calm | Refines current V2; one idea per screen; scroll reveals; dot-rail | lots of negative space (intentional) |
| `dossier` | Operator Dashboard | Live "now" panel, per-role metric viz (CSS/SVG), ledger | densest; some figurative telemetry numbers |

- **Critique takeaways:** Editorial & Quiet are clearly distinct; Signal & Dossier are two takes on the
  same "engineer = live telemetry" metaphor (pick one). Watch for *fabricated metrics* (uptime %,
  sparklines) reading as fake. Once a direction is chosen, build it into the real routes and delete `/redesign`.

## 📌 Portfolio Timeline (living section)

> **Maintain this.** This is the single place to record what's actually happening with Aaryan's
> career and life so the site and this file never drift. When something changes (new role,
> shipped project, move, milestone), add a dated entry at the **top** of "Update log," then
> propagate the change into the site (`work/page.tsx`, `page.tsx`) and update the
> [Experience snapshot](#7-experience-snapshot-as-the-site-currently-presents-it).
> Use absolute dates (`YYYY-MM-DD`). Today is the reference for "now."

### Current status (as of 2026-06-25)
- 🟢 **Latest experience added.** Added the current **Founding Engineer @ Stealth Startup** role
  (stealth hospitality revenue platform — dynamic pricing engine, agentic AI copilot on the Claude
  SDK, multi-agent code review) to `/work` and the home Career section, in the site's voice. Build passes.
  ⚠️ **Stealth rule:** never use the real company name on the site; it is labeled "Stealth Startup."
- 🟢 **Dates finalized 2026-06-25:** Stealth **Jan 2026 – Present**; FabLab now **Oct 2023 – Dec 2025**
  (ended, no longer "Present"); Misprint confirmed **Aug 2025 – Oct 2025**. *(Stealth-role location assumed New York City, NY — confirm if different.)*
- 🟢 **Redesign direction chosen: Editorial** (`/redesign/editorial`), revised into "Editorial × Signal-board"
  to keep Aaryan's voice — name-forward hero, live taglines/clock/film-grain, full copy (see §10).
  Other 3 directions (Signal, Quiet, Dossier) remain at `/redesign` for reference. Next: build into real routes (V3).

### Update log (newest first)
- **2026-07-15 (QUIET-DARK PROMOTED TO MAIN)** — The quiet-dark design IS the site now. `src/app/page.tsx`
  is a single self-contained page: theme system (dark default, light via sun/moon header toggle, system
  preference first, localStorage override, `data-theme` vars `--qd-*`), 2s logo intro (plays once per
  session via sessionStorage, click/key skips, reduced-motion skips), sticky header (inline logo.svg,
  Journey/Contact/GitHub links with underline-draw hovers, hides on scroll down), film grain + cursor
  lamp (the only background effects), staggered section reveals, typewriter + live clock signatures,
  and a new footer in the same language (logo, Email/GitHub/LinkedIn/Resume, © year, NYC + clock;
  Privacy/Terms 404 links and the false MIT claim are gone). Layout stripped to metadata + analytics
  (Navbar, Footer, next-themes ThemeProvider all removed). DELETED: `src/app/redesign/` (all
  prototypes), `src/app/blog/` (was a Coming-soon stub), `src/components/nav.tsx`, `footer.tsx`.
  The site is now exactly two routes: `/` and the 404. Production build passes; scroll effects run on
  window (no overlay wrapper). Sections 4-10 below describe the OLD site and are historical until
  rewritten. Known leftovers: globals.css still carries old design-system classes (mostly unused,
  harmless), IBM Plex Mono loads via @import inside the page style tag (candidate for next/font),
  next-themes still in package.json (unused).
- **2026-07-14 (full reset, clean slate)** — Aaryan rejected every redesign attempt (all 8 prototypes
  AND today's two homepage rewrites). Direction: revert everything, start over from the deployed
  original, and just add the stealth role plainly. Done: `src/app/redesign/` DELETED entirely,
  `page.tsx`/`work/page.tsx` restored from HEAD, then only these additions: Stealth Founding Engineer
  entry at the top of journeyHighlights and workStreams (simple wording: dynamic pricing engine,
  automated agents with owner approval, email/website infrastructure), currentFocus updated to
  stealth-era, FabLab end-dated (2025 home, Aug 2025 work per resume). Everything else on the site is
  exactly as deployed, including the Misprint spotlight. WRITING RULE from Aaryan (repeated,
  emphatic): plain words only. "Automated agents", not "agents that act while owners sleep". No
  poetic framing, no metaphors, no invented phrases. He will direct next steps himself. tsc clean
  (stale .next/types/app/redesign removed), / and /work 200, /redesign 404.
- **2026-07-14 (de-slop rebuild of the live pages)** — SUPERSEDED by the reset above; kept for history. — Aaryan called the site content AI slop and asked
  for a full structural rewrite in engineer voice, grounded in `resume_loc.pdf`. Homepage rebuilt from
  6 sections to 5, text-forward, card chrome removed: Hero (name-forward intro para + typewriter kept,
  small) / Now (one technical paragraph) / Selected systems (4 systems in prose with stack lines:
  pricing+agents, email infra, website pipeline, Misprint valuation) / Work index (plain rows) /
  Contact (two links, no CTA card). REMOVED: heroStats row ("15K+ users impacted", "60%+ latency
  reduced" with no baseline = the complaint), Signal board card, operatingPrinciples, capabilityAreas,
  achievementMoments, closing CTA card. /work fixed against the resume: FabLab role is "Full Stack
  Developer" (not Lead), timeline Oct 2023 – Aug 2025 (not Dec 2025), fabricated "99.9% uptime" chip
  removed, Misprint 60% now carries its context (data latency, key endpoints, schema redesign),
  HealthTick 35% attributed to the blog not assessments, Privilon stack corrected to AWS (was GCP) and
  its showcase is now the real Polymer Bazaar project from the resume. Content rule going forward: a
  number only appears with its mechanism and scope; no bare stat chips. Resolved: Aaryan
  confirmed 15,000 FabLab students (matches resume); site copy is correct as-is. tsc clean, / and /work 200. — Aaryan rejected all four June prototypes. Built 4 new ones
  under `src/app/redesign/{ratesheet,night-audit,spec,monograph}/page.tsx`, each with a locked token
  system and one signature element: **Ratesheet** (rate calendar identity; hero strip reprices on load,
  one cell clamps at floor; Archivo/Inter), **Night Audit** (blue-hour navy + tungsten amber; fixed
  audit-log rail timestamps sections on scroll via the real live clock; Fraunces/Public Sans/Plex Mono),
  **Spec** (twin registers: prose left, hand-written TS interfaces of the real systems right; full IBM
  Plex), **Monograph** (book typography; marker-yellow highlight sweeps + margin footnotes holding
  verified facts; Newsreader/Literata/Space Grotesk). Cross-critique pass ran; fixed: wrong date-range
  tab label, broken ARIA tabs contract (now aria-pressed buttons), aria-live noise on the audit log,
  reduced-motion gates on all tagline rotators, monograph desktop sup semantics + ReactNode import,
  overstated "no shared reputation" claim. DKIM/Route 53/SendGrid/14-step provisioning details are
  code-verified against the actual product repos (not fabricated). Chooser lists V2 four first
  (Ratesheet suggested); old four kept below for reference. Build passes; all routes 200. Known debt
  shared by all four: Google Fonts via @import in style tags (switch to next/font at port time). — The homepage **Spotlight card is now the stealth role**
  (was Misprint): "An intelligent pricing engine, and the agents that run it for you." Copy verified
  against the actual codebases (pricing module doc + repo recon). Also: 2 new stealth entries lead the
  Signals grid (6 cards, even), closing CTA opens with "Agentic revenue systems", and the `/work`
  stealth entry got the full verified treatment: end-to-end ownership summary, 5 impact bullets
  (pricing engine + agent layer + email infrastructure + AI website builder + multi-agent review), and
  2 new showcases (Automated Email Infrastructure, AI Website Builder), 4 showcases total. Misprint and
  all earlier roles untouched per Aaryan's direction. No em dashes in new copy. Build passes.
  Numbers in copy are code-verified: 365 nights nightly, 18 agent tools, 2.5-min site generation,
  weeks-to-minutes email provisioning.
- **2026-06-25 (editorial revision)** — Rebuilt `/redesign/editorial` into **"Editorial × Signal-board"**
  per Aaryan's feedback (the first pass buried his personality). Now: **name-forward hero** (giant
  "Aaryan Mori." + vermilion accent/underline), his signatures restored — rotating **taglines** (imports
  the real `@/app/taglines/taglines` module), the **live clock** pill, and **film-grain** — plus the
  **full copy** back (operating cadence, principles, spotlight on current stealth work, capabilities,
  5-role work index with metrics, signals, contact). Builds & renders (verified via Playwright); stealth
  honored. **Editorial is the chosen direction.** Next: port to real routes + responsive/dark polish.
- **2026-06-25 (redesign)** — Explored 4 redesign directions as **live, isolated prototypes** under
  `src/app/redesign/*` (`/redesign` chooser + `signal`, `editorial`, `quiet`, `dossier`), generated via a
  design workflow + critique pass. Each is a full-screen overlay (covers the old chrome; live site
  untouched), uses the real stealth-safe content, builds clean, and renders (verified via Playwright;
  screenshots in gitignored `.playwright-mcp/`). Fixed: `quiet` TS-strict types, `dossier` `//`-textnode
  lint errors + the metric-ring `--end` animation bug. **Open:** Aaryan to pick a direction (Editorial suggested).
- **2026-06-25** — Added the current **Founding Engineer (Stealth Startup)** role to `/work`
  (`workStreams`, top) and the home Career section (`journeyHighlights`) + refreshed the now-stale
  `currentFocus`. Kept fully stealth (no company name), matched site voice, 3 impact bullets + 2
  showcases. **Finalized timelines:** Stealth **Jan 2026 – Present**, FabLab **Oct 2023 – Dec 2025**
  (ended), Misprint **Aug 2025 – Oct 2025**. Ran `bun install` (reconciled `next` → 15.3.8, clearing
  issue #1) and `bun run build` — passing.
- **2026-06-22** — Created this `CLAUDE.md` via a fan-out workflow (5 subsystem mappers +
  completeness critic) to capture the full state of the V2.0 site. Documented architecture,
  design system, content model, and 12 known issues. Established this living timeline.
  *Pending from Aaryan:* latest experience + redesign direction.

### Experience timeline (mirror of what's live on the site)
*Keep this in lockstep with `src/app/work/page.tsx`. Most recent first.*

| Period | Company | Role | Location | Status |
|--------|---------|------|----------|--------|
| Jan 2026 – Present | Stealth Startup *(do not name)* | Founding Engineer | New York City, NY | on site — location assumed NYC |
| Aug 2025 – Oct 2025 | Misprint Inc. (YC W25) | Founding Software Engineer | New York City, NY | on site |
| Oct 2023 – Dec 2025 | FabLab | Lead Full-stack Developer | Arlington, TX | on site |
| Jan 2023 – Aug 2023 | HealthTick | Software Developer | Bangalore, India | on site |
| May 2021 – Aug 2023 | Privilon Technologies | Founder | Bangalore, India | on site |

### Open questions for Aaryan (fill these to update the site)
- [x] Current role: **Founding Engineer @ Stealth Startup** (hospitality revenue platform) — added 2026-06-25.
- [x] New role start: **Jan 2026 – Present**. FabLab ended **Dec 2025** (was "Present"). (2026-06-25)
- [ ] Confirm the stealth role **location** (assumed `New York City, NY`).
- [ ] **Pick a redesign direction** from `/redesign` — Signal / Editorial (suggested) / Quiet / Dossier,
      or a mash-up — then build it into the real routes and remove `/redesign`. (4 prototypes live as of 2026-06-25.)
- [ ] New headshot/OG image, updated resume, custom domain (move off `aaryanmori.vercel.app`)?

---

*When you finish a unit of work in this repo, update the relevant section above and the
"Last verified" date at the top. Keep the timeline honest — it's the project's memory.*
