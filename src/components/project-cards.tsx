// --- TYPES ---
export type ProjectCategory =
  | "Computational Pathology"
  | "Medical AI"
  | "Distributed Systems"
  | "Infrastructure";

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
    title: "PathoScan AI",
    description:
      "Deep learning pipeline for high-resolution whole-slide imaging analysis. Optimizing inference across heterogeneous clusters.",
    tech: ["Python", "PyTorch", "Kubernetes"],
    category: "Computational Pathology",
    github: "https://github.com/syedumaircodes",
  },
  {
    title: "BioStack Mesh",
    description:
      "A service mesh architecture designed for low-latency medical device data synchronization and HIPAA-compliant telemetry.",
    tech: ["Go", "Rust", "Envoy"],
    category: "Distributed Systems",
    github: "https://github.com/syedumaircodes",
  },
  {
    title: "NeuroCore Engine",
    description:
      "Real-time EEG signal processing library with automated spike detection and visualization for clinical researchers.",
    tech: ["C++", "WebAssembly", "D3.js"],
    category: "Medical AI",
    github: "https://github.com/syedumaircodes",
    demo: "#",
  },
  {
    title: "HealthNode DB",
    description:
      "Distributed ledger specifically architected for immutable medical record audit trails across multiple hospital providers.",
    tech: ["PostgreSQL", "gRPC", "Docker"],
    category: "Infrastructure",
    github: "https://github.com/syedumaircodes",
  },
];

// --- SUB-COMPONENTS ---
const ProjectCard = ({ project }: { project: Project }) => (
  <div className="group relative bg-[#0d1a1a] border border-emerald-900/30 rounded-lg p-6 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] flex flex-col h-full">
    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-emerald-500/20 group-hover:border-emerald-500/60 transition-colors" />

    <div className="flex items-start justify-between mb-4">
      <div className="flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          ></a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          ></a>
        )}
      </div>
    </div>

    <div className="mb-2">
      <span className="text-[10px] text-emerald-500/60 uppercase tracking-widest font-bold">
        {project.category}
      </span>
      <h3 className="text-lg font-bold text-white font-mono tracking-tight group-hover:text-emerald-400 transition-colors">
        {project.title}
      </h3>
    </div>

    <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-2 pt-4 border-t border-emerald-900/20">
      {project.tech.map((tag) => (
        <span
          key={tag}
          className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-emerald-950/40 text-emerald-400/80 border border-emerald-500/20 rounded"
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
