import { Github, ExternalLink } from "lucide-react";

// --- TYPES ---
export type ProjectCategory =
  | "Web Development"
  | "Backend API"
  | "Data Systems"
  | "Other";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  github?: string;
  demo?: string;
}

// --- DATA ---
const PROJECTS: Project[] = [
  {
    title: "Blockforge",
    description:
      "Marketing website and blog for blockchain service provider to Web3 startups.",
    tech: ["Astro", "React", "TailwindCSS"],
    category: "Web Development",
    github: "https://github.com/syedumaircodes/blockforge",
    demo: "https://blockchainforge.netlify.app",
  },
  {
    title: "Digital Garden",
    description:
      "My notes on everything I've learned so far. Updated frequently.",
    tech: ["Notion", "Markdown"],
    category: "Other",
    demo: "https://syedumaircodes.notion.site/Digital-Garden-2fdb62b2d15f809d8f24f0c5db339a5c",
  },
];

// --- SUB-COMPONENTS ---
const ProjectCard = ({ project }: { project: Project }) => (
  <div className="group relative bg-accent rounded-lg p-6 transition-all duration-300 hover:border-azure hover:border-inline flex flex-col h-full">
    <div className="flex items-start justify-between mb-4">
      <div className="flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-azure hover:text-white transition-colors"
            aria-label="visit the project's github page"
          >
            <Github />
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="text-azure hover:text-white transition-colors"
            aria-label="see the project live"
          >
            <ExternalLink />
          </a>
        )}
      </div>
    </div>

    <div className="mb-2">
      <span className="text-[10px] text-azure uppercase tracking-widest font-bold">
        {project.category}
      </span>
      <h1 className="text-lg font-bold text-azure tracking-tight  transition-colors">
        {project.title}
      </h1>
    </div>

    <p className="text-sm text-azure leading-relaxed mb-6 flex-grow">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-2 pt-4">
      {project.tech.map((tag) => (
        <span
          key={tag}
          className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-azure text-white border border-emerald-500/20 rounded"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function Projects() {
  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
