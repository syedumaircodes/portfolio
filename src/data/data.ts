import blockforgecover from "../assets/projects/blockforge_cover.webp";
import blockforgesidebar from "../assets/projects/blockforge_sidebar.webp";
export interface Tech {
  name: string;
  color: string; // Tailwind color class for the dot
}

export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  month: string;
  year: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  image: string; // Card image
  dashboardImage: string; // Sidebar detail image
  techStack: Tech[];
  metrics: Metric[];
  deploymentUrl: string;
  sourceUrl: string;
}

export const projectsData: Project[] = [
  {
    id: "blockforge-web3-platform",
    title: "Blockforge – Web3 Service Provider",
    month: "June",
    year: "2025",
    description:
      "Full-stack marketing & blog platform for a Web3 SaaS startup, driving a 12% increase in customer acquisition post-launch.",
    longDescription:
      "Key features include a Git-based MDX blog system, Framer Motion animations, and a performance-optimized static architecture deployed on Netlify.",
    problem:
      "Blockforge needed a digital presence from scratch — no existing brand, no CMS, and a technically proficient team who wanted full control over blog content without managing a database or third-party CMS.",
    solution:
      "Built on Astro.js with file-based MDX routing, eliminating the need for a database entirely. React handled component reuse at scale, TailwindCSS ensured design consistency, and Framer Motion delivered the subtle animations the client requested.",
    image: blockforgecover,
    dashboardImage: blockforgesidebar,
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
    metrics: [
      { label: "Customer Acquisition", value: "+12%" },
      { label: "CMS Dependencies", value: "Zero" },
      { label: "Q1 Post-Launch", value: " 40% Growth" },
    ],
  },
  // Add more projects here following the same structure
];
