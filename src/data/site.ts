/**
 * Single source of truth for everything rendered on the page.
 * Placeholder copy lives here — edit this file, not the components.
 */
import type { ImageMetadata } from "astro"
import commonplaceCover from "@/assets/projects/commonplace-cover.webp"
import resumePdf from "@/assets/SyedUmairAli_Resume.pdf"


export type IconName =
  | "arrow-up-right"
  | "arrow-down"
  | "arrow-right"
  | "github"
  | "linkedin"
  | "bookmark"
  | "file"
  | "mail"

export type Social = {
  label: string
  href: string
  icon: IconName
  /** Suggested filename for links that should download instead of navigate. */
  download?: string
}

export type Project = {
  /** Stable slug, used as the key for a project's cover image. */
  id: string
  title: string
  category: string
  /** Short month label, e.g. "Feb". */
  month: string
  year: string
  description: string
  technologies: string[]
  /** Source repository URL. */
  github: string
  /** Live/deployed URL. */
  live: string
  /**
   * Optional cover image. Either an imported asset (e.g. `import cover from
   * "@/assets/projects/x.webp"`) or a plain URL (e.g. "/projects/x.webp").
   * Falls back to the project title.
   */
  cover?: ImageMetadata | string
}

export type Site = {
  name: string
  role: string
  /** Rendered as-is, split on "\n" into headline lines. */
  headline: string
  intro: string
  email: string
  socials: Social[]
  projects: Project[]
  /** Everything below feeds <head>, JSON-LD and llms.txt. Edit here, not the layout. */
  seo: Seo
}

export type Seo = {
  /** Canonical origin. Keep in sync with `site` in astro.config.mjs. */
  url: string
  /** Handle used consistently across GitHub, LinkedIn and X. */
  handle: string
  /** Used for the @handle twitter:site / twitter:creator tags. */
  twitter: string
  /** Longer, keyword-bearing <title> for the home page. */
  title: string
  /** 150–160 char meta description. */
  description: string
  /** Plain-text positioning statement reused in OG/Twitter and JSON-LD. */
  summary: string
  location: {
    city: string
    region: string
    country: string
    countryCode: string
    /** IANA time zone id, e.g. "Asia/Karachi". */
    timeZone: string
  }
  currentRole: {
    employer: string
    title: string
    startDate: string
  }
  education: {
    institution: string
    degree: string
    startDate: string
    endDate: string
  }
  /** Feeds `knowsAbout` in JSON-LD and the tech-stack list in llms.txt. */
  skills: string[]
  certifications: string[]
  /** Explicit social profile URLs for schema.org `sameAs`. */
  sameAs: string[]
  /** Absolute or root-relative social preview image (1200x600). */
  ogImage: string
  ogImageAlt: string
}

export const site: Site = {
  name: "Syed Umair Ali",
  role: "Full-stack software engineer",
  headline: "I turn ideas into software\nthat works in the real world.",
  intro:
    "I turn complex workflows into simple, reliable experiences that work for the people using them.",
  email: "syedumairali.617@gmail.com",

  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/syedumaircodes",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/syedumaircodes",
      icon: "github",
    },
    {
      label: "Substack",
      href: "https://substack.com/@syedumaircodes",
      icon: "bookmark",
    },
    
  {
      label: "Résumé",
      href: resumePdf,
      icon: "file",
      download: "SyedUmairAli_Resume.pdf",
    },
  ],

  projects: [
    {
      id: "atlas-analytics-workspace",
      title: "Commonplace",
      category: "Web app",
      month: "Oct",
      year: "2026",
      description:
        "A digital home for my notes, Its simple, focused design makes it easy to capture notes and revisit them later.",
      technologies: ["React", "Markdown", "TailwindCSS"],
      github: "https://github.com/syedumaircodes/commonplace",
      live: "https://commonplace.syedumairali-617.workers.dev/",
      cover: commonplaceCover,
    },
  ],

  seo: {
    url: "https://syedumaircodes.vercel.app",
    handle: "syedumaircodes",
    twitter: "@syedumaircodes",
    title: "Syed Umair Ali | Full-Stack Engineer & Product Builder in Karachi",
    description:
      "Syed Umair Ali (syedumaircodes) is a full-stack engineer and product builder in Karachi, Pakistan. 5+ years shipping SaaS products end to end with Python, FastAPI, Next.js and GCP.",
    summary:
      "Full-stack engineer and product builder based in Karachi, Pakistan. I specialise in end-to-end execution — from data to deployment — shipping real products, putting them in users' hands, and iterating rapidly. Pragmatic problem-solving over perfect code.",
    location: {
      city: "Karachi",
      region: "Sindh",
      country: "Pakistan",
      countryCode: "PK",
      timeZone: "Asia/Karachi",
    },
    currentRole: {
      employer: "Heptic",
      title: "Software Engineer",
      startDate: "2025-07",
    },
    education: {
      institution: "Virtual University of Pakistan",
      degree: "BS Computer Science",
      startDate: "2021",
      endDate: "2025",
    },
    skills: [
      "Python",
      "FastAPI",
      "Node.js",
      "Nest.js",
      "REST APIs",
      "TypeScript",
      "React",
      "Next.js",
      "Astro.js",
      "MDX",
      "TailwindCSS",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Google Cloud Platform",
      "Docker",
      "CI/CD",
      "Data pipelines",
      "LLM API integration",
      "GSAP",
      "Framer Motion",
      "Agile",
    ],
    certifications: [
      "Google Cloud Associate Cloud Engineer",
      "Oracle Cloud Foundations Associate",
    ],
    sameAs: [
      "https://github.com/syedumaircodes",
      "https://www.linkedin.com/in/syedumaircodes",
      "https://twitter.com/syedumaircodes",
      "https://substack.com/@syedumaircodes",
    ],
    ogImage: "/og-image.png",
    ogImageAlt:
      "Syed Umair Ali — full-stack engineer and product builder based in Karachi, Pakistan",
  },
}
