export type ProjectCategory = "completed" | "concept"

export interface Tech {
  name: string
  color: string // Tailwind color class for the dot
}

export interface Project {
  id: string
  category: ProjectCategory
  title: string
  month: string
  year: string
  description: string // Short one-liner intro
  overview: string // Detailed explanation of what you built
  techStack: Tech[]
  deploymentUrl: string
  sourceUrl: string
}

export const projectsData: Project[] = [
  {
    id: "blockforge-web3-platform",
    category: "completed",
    title: "Blockforge – Web3 Service Provider",
    month: "June",
    year: "2025",
    description:
      "Full-stack marketing & blog platform for a Web3 SaaS startup.",
    overview:
      "Built a custom platform on Astro.js with file-based MDX routing, eliminating the need for a database entirely. React handled component reuse at scale, TailwindCSS ensured design consistency, and Framer Motion delivered the subtle animations. The result was a highly optimized, Git-backed architecture deployed on Netlify.",
    deploymentUrl: "https://blockchainforge.netlify.app",
    sourceUrl: "https://github.com/syedumaircodes/blockforge",
    techStack: [
      { name: "Astro.js", color: "bg-orange-500" },
      { name: "React", color: "bg-cyan-400" },
      { name: "TailwindCSS", color: "bg-sky-400" },
      { name: "Framer Motion", color: "bg-purple-500" },
      { name: "MDX", color: "bg-yellow-400" },
      { name: "Netlify", color: "bg-teal-400" },
    ],
  },
]
