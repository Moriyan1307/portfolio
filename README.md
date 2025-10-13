# Aaryan Mori Portfolio

Modern, case-study style personal portfolio built with Next.js 15, React 19, and Tailwind CSS 4. The site introduces Aaryan Mori’s background as a software engineer and founder, showcases selected achievements, and provides a deep dive into career highlights and freelance work.

## Overview
- Responsive single-page landing experience with animated hero, live clock, and rotating taglines.
- Dedicated work timeline that highlights roles, achievements, metrics, and project case studies with category filtering.
- Centralized navigation and footer with quick access to resume, portfolio, GitHub, LinkedIn, and company site.
- Analytics ready via Vercel Analytics and Speed Insights; themed with `next-themes` for system-aware light/dark modes.
- Blog routes scaffolded for future publishing (`/blog`, `/blog/[slug]`), plus placeholders for privacy and terms pages.

## Tech Stack
- Next.js 15 (App Router) with React 19 and TypeScript.
- Tailwind CSS 4 using the new `@tailwindcss/postcss` pipeline and custom CSS tokens in `src/app/globals.css`.
- `next-themes` for theme persistence, plus `@vercel/analytics` and `@vercel/speed-insights` integrations.
- Deployed assets served from the `public` directory (`logo.svg`, `og-image.png`).

## Project Structure
- `src/app/page.tsx` – Landing page with hero, skills matrix, service offerings, achievements, and call-to-action sections.
- `src/app/work/page.tsx` – Career journey and freelance project showcase with category filters and detailed card layouts.
- `src/app/taglines/taglines.tsx` – Source of rotating hero taglines.
- `src/components/nav.tsx` and `src/components/footer.tsx` – Global navigation and site footer.
- `src/app/globals.css` – Design tokens, typography utilities, and animation helpers shared across the site.
- `public` – Static assets referenced by Next.js.

## Getting Started
Prerequisites: Node.js 18.17+ or Bun 1.1+, pnpm/npm/yarn if you prefer those package managers.

1. Install dependencies  
   ```bash
   bun install        # or npm install / pnpm install / yarn install
   ```

2. Run the development server  
   ```bash
   bun run dev        # starts Next.js with Turbopack on http://localhost:3000
   ```

3. Production build & preview  
   ```bash
   bun run build
   bun run start      # serves the production build
   ```

4. Lint the project  
   ```bash
   bun run lint
   ```

## Content Management Guide
- **Navigation links**: Update email, resume, and social links in `src/components/nav.tsx`.
- **Hero & home sections**: Edit skills, services, achievements, and call-to-action content directly in `src/app/page.tsx`.
- **Taglines**: Add or revise hero taglines in `src/app/taglines/taglines.tsx`.
- **Career data**: Adjust roles, metrics, project details, and category tags inside `src/app/work/page.tsx`.
- **Branding**: Replace `public/logo.svg` and `public/og-image.png` to refresh the site identity and social previews.
- **Theme tokens**: Modify color variables and typography in `src/app/globals.css` to adjust the overall visual language.

## Deployment Notes
- Designed for deployment on Vercel; static assets and metadata (Open Graph / Twitter) are set up for rich previews.
- `ThemeProvider` in `src/app/layout.tsx` enables system theme detection—ensure cookies are allowed if testing locally.
- Analytics and Speed Insights run automatically when deployed on Vercel; disable imports in `layout.tsx` if not needed.

## Roadmap Ideas
- Populate `/blog` routes with MDX or a headless CMS integration.
- Implement real Privacy and Terms pages to replace current placeholders linked from the footer.
- Consider extracting hero/work data into JSON or CMS-backed sources for easier non-technical updates.

## License
Site footer references an MIT license. Add a dedicated `LICENSE` file if you plan to open-source the code publicly.
