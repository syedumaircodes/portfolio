# astro-folio

A minimal, single-page dark portfolio built with Astro, Tailwind CSS v4 and shadcn
tokens. No client-side framework code ships — the only JavaScript on the page is a
small inline script that powers the sticky-header state and scroll reveals.

## Content

Everything on the page is driven by one file: [`src/data/site.ts`](src/data/site.ts).
Edit the name, headline, intro, socials, projects, capabilities and about copy there —
no component changes are required.

> The email address, social URLs and project entries are placeholders and should be
> replaced before shipping.

## Structure

```
src/
  data/site.ts            content model + copy
  layouts/main.astro      document shell: head/SEO, skip link, footer
  components/
    hero.astro            full-screen hero: centered identity block, bottom-pinned social row
    work.astro            selected-work list
    contact.astro         contact call to action
    site-footer.astro     copyright + links
    icon.astro            inline SVG icon set (no icon runtime)
    ui/button.tsx         shadcn/base-ui button, available for future use
  styles/global.css       design tokens, base layer, hero reveal utility
  pages/index.astro       section composition
```

## Design notes

- **Tokens** live in `src/styles/global.css`. The dark palette is the shipped theme; the
  near-black background, hairline borders and surface tints are tuned for contrast.
- **Typography** is Inter Variable throughout, with tight tracking on display sizes and a
  fluid `clamp()` headline so it never needs a breakpoint of its own.
- **Motion** is CSS-only: above-the-fold content fades up on load via the `.reveal`
  utility, and both the effect and scrolling are disabled under
  `prefers-reduced-motion`. All content remains visible without JavaScript.
- **Layout** uses a single `max-w-[90rem]` container with responsive gutters (`px-6` →
  `sm:px-10` → `lg:px-16`), so the composition holds from 390px up. The hero is a
  three-band flex column — top padding, a `flex-1` centered identity block, and a
  bottom-anchored social row behind a hairline divider — so it always fills exactly one
  viewport without the CTAs crowding the social row on short screens.

## Commands

```bash
bun install
bun run dev        # local dev server
bun run build      # static build to dist/
bun run preview    # preview the build
bun run typecheck  # astro check
bun run lint       # eslint
bun run format     # prettier
```
