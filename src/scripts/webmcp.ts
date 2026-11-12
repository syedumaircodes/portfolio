import { site } from "@/data/site"

/**
 * WebMCP: expose the page's real, public actions as browser-agent tools.
 *
 * Everything registered here maps to something a visitor can already do —
 * read the profile, inspect a project, jump to a section, open a project,
 * download the résumé. Nothing is simulated, and the API is feature-detected,
 * so browsers without WebMCP simply load the page as before.
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 */

type ToolInput = Record<string, unknown>

type WebMcpTool = {
  name: string
  title?: string
  description: string
  inputSchema: Record<string, unknown>
  annotations?: {
    readOnlyHint?: boolean
    untrustedContentHint?: boolean
    consequentialHint?: boolean
  }
  execute: (input: ToolInput, options?: { signal?: AbortSignal }) => unknown
}

type ModelContextHost = {
  modelContext?: {
    registerTool: (
      tool: WebMcpTool,
      options?: { signal?: AbortSignal }
    ) => Promise<void>
  }
}

const NO_INPUT = {
  type: "object",
  properties: {},
  additionalProperties: false,
}

const absolute = (href: string) =>
  /^https?:\/\//.test(href) ? href : new URL(href, site.seo.url).href

const projectSummary = (project: (typeof site.projects)[number]) => ({
  id: project.id,
  title: project.title,
  category: project.category,
  month: project.month,
  year: project.year,
  description: project.description,
  technologies: project.technologies,
  live: project.live,
  github: project.github,
})

const resumeHref = absolute(
  site.socials.find((social) => social.download)?.href ?? "/resume.pdf"
)

const tools: WebMcpTool[] = [
  {
    name: "get_profile",
    title: "Get profile",
    description:
      "Return Syed Umair Ali's public profile: role, headline, summary, location, email and social links.",
    inputSchema: NO_INPUT,
    annotations: { readOnlyHint: true },
    execute: () => ({
      name: site.name,
      role: site.role,
      headline: site.headline.replace(/\*/g, "").replace(/\n/g, " "),
      intro: site.intro,
      summary: site.seo.summary,
      location: site.seo.location,
      email: site.email,
      socials: site.socials.map(({ label, href }) => ({
        label,
        href: absolute(href),
      })),
      capabilities: site.capabilities,
    }),
  },
  {
    name: "list_projects",
    title: "List projects",
    description:
      "List the projects featured on the portfolio with their descriptions, stacks and links.",
    inputSchema: NO_INPUT,
    annotations: { readOnlyHint: true },
    execute: () => site.projects.map(projectSummary),
  },
  {
    name: "get_project",
    title: "Get project",
    description: "Return full details for one featured project by its id.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Project id, as returned by list_projects.",
          enum: site.projects.map((project) => project.id),
        },
      },
      required: ["id"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: (input) => {
      const id = String(input.id)
      const project = site.projects.find((item) => item.id === id)
      if (!project) throw new Error(`Unknown project id: ${id}`)
      return projectSummary(project)
    },
  },
  {
    name: "scroll_to_section",
    title: "Scroll to section",
    description:
      "Move the page to one of its sections so the user and agent see the same content.",
    inputSchema: {
      type: "object",
      properties: {
        section: {
          type: "string",
          description: "Section to bring into view.",
          enum: ["top", "work", "contact"],
        },
      },
      required: ["section"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: (input) => {
      const section = String(input.section)
      const target = document.getElementById(section)
      if (!target) throw new Error(`Unknown section: ${section}`)
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
      target.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      })
      return { section }
    },
  },
  {
    name: "open_project",
    title: "Open project",
    description:
      "Open a featured project's live site or source repository in a new tab.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Project id, as returned by list_projects.",
          enum: site.projects.map((project) => project.id),
        },
        target: {
          type: "string",
          description: "Which link to open. Defaults to the live site.",
          enum: ["live", "source"],
        },
      },
      required: ["id"],
      additionalProperties: false,
    },
    annotations: { consequentialHint: true },
    execute: (input) => {
      const id = String(input.id)
      const project = site.projects.find((item) => item.id === id)
      if (!project) throw new Error(`Unknown project id: ${id}`)
      const target = String(input.target ?? "live")
      const url = target === "source" ? project.github : project.live
      window.open(url, "_blank", "noopener,noreferrer")
      return { opened: url }
    },
  },
  {
    name: "download_resume",
    title: "Download résumé",
    description: "Download Syed Umair Ali's résumé as a PDF.",
    inputSchema: NO_INPUT,
    annotations: { consequentialHint: true },
    execute: () => {
      const link = document.createElement("a")
      link.href = resumeHref
      link.download = "SyedUmairAli_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      link.remove()
      return { download: resumeHref }
    },
  },
]

export function initWebMcp() {
  if (typeof window === "undefined") return

  const context =
    (document as unknown as ModelContextHost).modelContext ??
    (navigator as unknown as ModelContextHost).modelContext
  if (!context) return

  // Tools exist for the lifetime of this document; abort cleanly on unload.
  const controller = new AbortController()
  window.addEventListener("pagehide", () => controller.abort(), { once: true })

  for (const tool of tools) {
    context
      .registerTool(
        {
          ...tool,
          execute: async (input, options) => tool.execute(input, options),
        },
        { signal: controller.signal }
      )
      .catch((error) =>
        console.warn(`WebMCP: could not register ${tool.name}`, error)
      )
  }
}
