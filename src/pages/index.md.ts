import type { APIRoute } from "astro"
import { site } from "@/data/site"

/**
 * Static markdown representation of the single-page portfolio, emitted at
 * build time as /index.md. Vercel rewrites requests to `/` here when the
 * client asks for `Accept: text/markdown`, so the HTML build stays untouched.
 *
 * Copy lives in src/data/site.ts; only the structural prose is repeated here.
 */
export const prerender = true

const { seo } = site

const absolute = (href: string) =>
  /^https?:\/\//.test(href) ? href : new URL(href, seo.url).href

const link = (label: string, href: string) =>
  `[${label}](${absolute(href)})`

const markdown = `# ${site.name}

_${site.role}_

${site.headline.replace(/\*/g, "*").replace(/\n/g, " ")}

## About

${site.intro}

${seo.summary}

## What I work with

${site.capabilities.map(({ label, detail }) => `- **${label}** — ${detail}`).join("\n")}

## Selected Work

${site.projects
  .map(
    (project) => `### ${project.title}

_${project.category} / ${project.month} ${project.year}_

${project.description}

- Technologies: ${project.technologies.join(", ")}
- Live: ${link("Visit site", project.live)}
- Source: ${link("View source", project.github)}`
  )
  .join("\n\n")}

## Contact

Have a product to ship or a role to fill? ${link("Email me", `mailto:${site.email}`)}.

## Links

${site.socials.map((social) => `- ${link(social.label, social.href)}`).join("\n")}

---

Canonical: ${seo.url}/
Machine-readable profile: ${seo.url}/llms.txt
`

export const GET: APIRoute = () =>
  new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(Math.ceil(markdown.length / 4)),
    },
  })
