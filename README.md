# astro-folio

A minimal, single-page dark portfolio built with Astro, Tailwind CSS v4 and shadcn
tokens. No client-side framework code ships — the only JavaScript on the page is a
small inline script that powers the sticky-header state.

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
  styles/global.css       design tokens and base layer
  pages/index.astro       section composition
```

## Agent discovery

`vercel.json` adds an [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) `Link`
response header on `/` so agents and crawlers can discover the machine-readable
resources without parsing the HTML:

- `/.well-known/api-catalog` — `rel="api-catalog"`, an [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727#section-3) linkset
- `/.well-known/ard.json` — `rel="ard"`, the [ARD](https://agenticresourcediscovery.org/) capability manifest
- `/llms.txt` — `rel="describedby"`, the authoritative text profile
- `/index.md` — markdown representation of the page, negotiated via `Accept`

The catalog is served as `application/linkset+json` from `public/.well-known/`.
Response headers only apply on Vercel; `astro dev` and `astro preview` do not
read `vercel.json`.

### Markdown for agents

`/` content-negotiates on `Accept`. Requests containing `text/markdown` are
routed by a `vercel.json` `routes` rule to the prebuilt `/index.md` and served as
`text/markdown; charset=utf-8`; everything else keeps the HTML page. The rule is
in `routes` rather than `rewrites` because Vercel checks the filesystem before
rewrites run, so a rewrite for `/` would never fire — `index.html` already
answers that path. The markdown is generated at build time from
`src/data/site.ts` by `src/pages/index.md.ts`, so it never drifts from the page
copy. `Vary: Accept` is set on both responses.

### WebMCP tools

`src/scripts/webmcp.ts` registers the page's real actions as
[WebMCP](https://webmachinelearning.github.io/webmcp/) tools when the browser
exposes `document.modelContext` (falling back to `navigator.modelContext`):

- `get_profile`, `list_projects`, `get_project` — read the same data the page renders
- `scroll_to_section` — bring `top`, `work` or `contact` into view
- `open_project` — open a project's live site or source in a new tab
- `download_resume` — download the PDF

Tools are read-only where they only return data, marked consequential where they
open or download something, and unregistered via an `AbortSignal` on `pagehide`.
Browsers without WebMCP load the page unchanged.

### Agentic Resource Discovery

`public/.well-known/ard.json` is the [ARD](https://agenticresourcediscovery.org/)
capability manifest, also served at the predecessor path
`/.well-known/ai-catalog.json`. It lists the resources this site actually
publishes — the page and its WebMCP tools, `llms.txt`, `index.md`, the API
catalog, and the résumé PDF — with `urn:air:` identifiers and representative
queries. Both paths are served as `application/json` with
`Access-Control-Allow-Origin: *`, and `robots.txt` advertises the manifest with
an `Agentmap` directive.

## Design notes

- **Tokens** live in `src/styles/global.css`. The dark palette is the shipped theme; the
  near-black background, hairline borders and surface tints are tuned for contrast.
- **Typography** is Inter Variable throughout, with tight tracking on display sizes and a
  fluid `clamp()` headline so it never needs a breakpoint of its own.
- **Motion** is CSS-only transitions (e.g. button hovers), and scrolling plus every
  transition is disabled under `prefers-reduced-motion`. Above-the-fold content
  renders visible immediately (no entrance animation) so it can never delay
  Largest Contentful Paint.
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
