import type { Config } from "tailwindcss";

/**
 * Tailwind is layered on top of the existing hand-written design system in
 * `app/globals.css`. Preflight (Tailwind's CSS reset) is DISABLED so utilities
 * can be adopted incrementally without altering the current styling — the
 * existing globals.css already provides its own resets and base styles.
 *
 * The theme below re-exposes the design tokens defined as CSS custom properties
 * in `:root` (see the top of globals.css) so Tailwind utilities such as
 * `bg-accent`, `text-secondary`, or `rounded-lg` resolve to the same values as
 * the raw CSS. Tokens remain the single source of truth in globals.css; change
 * them there and both worlds stay in sync.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  corePlugins: {
    // The existing globals.css owns base/reset styling; skip Tailwind's reset
    // to avoid regressing the current design.
    preflight: false,
  },
  theme: {
    extend: {
      // Desktop-first max-width breakpoints mirroring the original media
      // queries in globals.css, exposed as `mxl:` / `mlg:` / `msm:` / `mxs:`.
      screens: {
        mxl: { max: "1120px" },
        mlg: { max: "920px" },
        msm: { max: "620px" },
        mxs: { max: "420px" },
      },
      colors: {
        "bg-dark": "var(--bg-dark)",
        "bg-darker": "var(--bg-darker)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        "surface-glass": "var(--surface-glass)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-dark": "var(--accent-dark)",
        "accent-glow": "var(--accent-glow)",
        "accent-soft": "var(--accent-soft)",
        "accent-secondary": "var(--accent-secondary)",
        gold: "var(--gold)",
        cyan: "var(--cyan)",
        line: "var(--line)",
        "line-accent": "var(--line-accent)",
        glass: "var(--glass)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "var(--radius-sm)",
        lg: "var(--radius-lg)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
