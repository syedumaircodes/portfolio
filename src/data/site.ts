/**
 * Single source of truth for everything rendered on the page.
 * Placeholder copy lives here — edit this file, not the components.
 */
import type { ImageMetadata } from "astro"
import spiritLibraryCover from "@/assets/projects/spirit-library.webp"

export type IconName =
  | "arrow-up-right"
  | "arrow-down"
  | "arrow-right"
  | "github"
  | "linkedin"
  | "twitter"
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

export type Capability = {
  /** Short discipline name. */
  label: string
  /** The tools that back it up. */
  detail: string
}

export type Site = {
  name: string
  role: string
  /**
   * Rendered as-is, split on "\n" into headline lines. Wrap a word in
   * asterisks to set it in the display face's true italic.
   */
  headline: string
  intro: string
  email: string
  /** Disciplines listed in the hero's index. */
  capabilities: Capability[]
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
    /** Kept out of public copy. Populated only if you want it named anywhere. */
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
  headline: "I turn ideas into *software*\nthat works in the real world.",
  intro:
    "I'm Syed Umair Ali, a full-stack engineer in Karachi. I build backends, interfaces, and the deployment pipeline that gets a product into users' hands.",
  email: "syedumairali.617@gmail.com",
  capabilities: [
    {
      label: "Backend & APIs",
      detail: "Python · FastAPI · Node.js · Nest.js · REST",
    },
    {
      label: "Interface systems",
      detail: "TypeScript · React · Next.js · Astro · TailwindCSS",
    },
    {
      label: "Infrastructure",
      detail: "GCP · Docker · CI/CD · PostgreSQL · Redis",
    },
    {
      label: "Creative front-end",
      detail: "GSAP · Three.js · Framer Motion",
    },
    {
      label: "Applied AI",
      detail: "LLM API integration · Data pipelines",
    },
  ],

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
      label: "Twitter",
      href: "https://twitter.com/syedumaircodes",
      icon: "twitter",
    },
    {
      label: "Substack",
      href: "https://substack.com/@syedumaircodes",
      icon: "bookmark",
    },

    {
      label: "Résumé",
      href: "/resume.pdf",
      icon: "file",
      download: "SyedUmairAli_Resume.pdf",
    },
  ],

  projects: [
    {
      id: "spirit-library-web-app",
      title: "Spirit Library",
      category: "Living notebook",
      month: "Oct",
      year: "2026",
      description:
        "A living personal library of everything I learn — notes on software engineering, databases, security and cloud. Each note is an MDX file grouped by topic and source, then compiled into static pages by Astro at build time. No database, no CMS, no editor to log into.",
      technologies: ["Astro", "MDX", "React", "TailwindCSS"],
      github: "https://github.com/syedumaircodes/commonplace",
      live: "https://spiritlibrary.vercel.app",
      cover: spiritLibraryCover,
    },
  ],

  seo: {
    url: "https://syedumaircodes.vercel.app",
    handle: "syedumaircodes",
    twitter: "@syedumaircodes",
    title: "Syed Umair Ali | Full-Stack Engineer & Product Builder in Karachi",
    description:
      "Full-stack engineer and product builder in Karachi, Pakistan. Syed Umair Ali builds SaaS products end to end with Python, FastAPI, Next.js and GCP.",
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
      employer: "",
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
      "JavaScript",
      "React",
      "Next.js",
      "Astro.js",
      "MDX",
      "TailwindCSS",
      "GSAP",
      "Three.js",
      "Framer Motion",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Google Cloud Platform",
      "Docker",
      "CI/CD",
      "Vercel",
      "Netlify",
      "Edge computing",
      "Data pipelines",
      "LLM API integration",
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
