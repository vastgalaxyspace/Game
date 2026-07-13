# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing/portfolio website for **Mukta Game & Development**, a Blender + Unity studio.
Next.js 14 (App Router) + React 18 + TypeScript, with interactive 3D scenes rendered
via `@react-three/fiber` / `drei` (Three.js). Despite the `package.json` name
(`mukta-cinematic-showcase`) and the README (which describes an older single-model robot
showcase), the live site is a multi-page marketing site — the home hero is a 3D car model.

## Commands

```bash
npm install          # install deps
npm run dev          # next dev (default host/port)
npm run dev:local    # next dev pinned to 127.0.0.1:3000 via scripts/dev-server.mjs
npm run build        # production build
npm run start        # serve the production build
npm run lint         # next lint (eslint-config-next / core-web-vitals)
```

There is no test suite. Type checking happens through `next build` (tsconfig is `noEmit`, `strict`).

## Environment

The contact form API (`app/api/contact/route.ts`) sends mail via `nodemailer` over SMTP.
Required env vars (set in `.env`, gitignored): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASS`, `MAIL_TO`. `secure: true` is hardcoded (assumes port 465).

## Architecture

- **Routing**: App Router pages under `app/` — `page.tsx` (home), `about/`, `services/`,
  `contact/`. `app/layout.tsx` is the root layout: it renders `<SplashScreen />` +
  `<Header />` around all pages and holds site metadata.
- **Path alias**: `@/*` maps to repo root (see `tsconfig.json`), e.g. `@/components/Header`.
- **Styling**: a single global stylesheet, `app/globals.css` (~3800 lines), drives the entire
  design system via CSS custom properties (`--accent`, `--bg-dark`, `--surface`,
  `--text-primary`, etc.). Existing components use `className` + inline `style`.
  **Tailwind CSS is also configured** (`tailwind.config.ts`, `postcss.config.mjs`) and layered on
  top: preflight (Tailwind's reset) is **disabled** so utilities don't regress the hand-written
  styles, and the design tokens are re-exposed in the theme (`bg-accent`, `text-secondary`,
  `rounded-lg`, `font-display`, etc.). The CSS variables in `globals.css` remain the single source
  of truth for tokens — change them there and both raw CSS and Tailwind stay in sync. Prefer
  Tailwind utilities for new markup; keep shared/complex styles in `globals.css`.
- **Content is inlined**: page content (stats, expertise cards, testimonials) lives as literal
  arrays mapped inside the page components — there is no CMS or data layer. Note large commented-out
  sections (e.g. the Portfolio block in `app/page.tsx`) are intentionally disabled, not dead-by-accident.

### 3D rendering (the core of this repo)

All 3D uses `@react-three/fiber` + `@react-three/drei`. Three viewer components, all
`"use client"` and **dynamically imported with `{ ssr: false }`** (see `app/page.tsx`) because
Three.js cannot run during SSR:

- `components/CustomSketchfabViewer.tsx` — home hero. Loads the car GLB
  (`HERO_MODEL_PATH = "/nissan_fairlady_z_s30240z_1978.meshopt.glb"`) with `useGLTF`.
- `components/ShowcaseScene.tsx` — full cinematic scene (lights, camera rig, contact shadows,
  environment). Model path constant `MODEL_PATH` at top of file; camera distance clamps as
  `MIN_/MAX_CAMERA_DISTANCE`.
- `components/AboutModelViewer.tsx` — model viewer on the About page.

GLB/mesh assets live in `public/` (served from `/`), so model paths are absolute like
`/models/...` or `/nissan_fairlady...glb`. Prefer `.meshopt.glb` variants where they exist.

### Splash / hero-load coordination

`components/SplashScreen.tsx` and `CustomSketchfabViewer.tsx` coordinate through a shared, typed
module — **`lib/heroSignals.ts`** — so the splash hides only once the hero model is ready, and the
viewer starts auto-rotating only once the splash is gone. (This replaced an older stringly-typed
contract built on `window.__mukta*` flags and untyped DOM events.)

- `heroSignals.ts` exports two one-way latch signals with `get()` / `notify()` / `subscribe()`:
  - `heroModelReadySignal` — the viewer calls `.notify()` when its GLB finishes loading; the splash
    subscribes (falling back to `get()` if it already fired before the subscriber mounted).
  - `splashCompleteSignal` — the splash calls `.notify()` after its fade-out; the viewer subscribes.
- These are ES-module singletons shared across the dynamically-imported components; a late
  subscriber reads the latched value via `get()`, so ordering doesn't matter.
- `SplashScreen` combines `heroModelReadySignal` with `useProgress()` (drei loader progress) and
  minimum-duration timers (`MIN_SPLASH_DURATION_MS`, `SPLASH_FADE_DURATION_MS`) before fading out.
- The splash is **skipped on all non-home routes** (`pathname !== "/"`).

When touching either component, go through `lib/heroSignals.ts` — don't reintroduce `window` flags.

## Conventions

- Interactive components are `"use client"`; server components stay the default. Any component
  pulling in Three.js must be client-side and dynamically imported to avoid SSR crashes.
- `next/image` is used for raster assets (e.g. logo in `Header.tsx`) and `next/link` for nav.
