import React, { useEffect } from "react";
import { X, ExternalLink, Code2, Terminal } from "lucide-react";
import type { Project } from "../data/data.ts";
import { useWebHaptics } from "web-haptics/react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const { trigger } = useWebHaptics();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity duration-300 flex items-center justify-center p-4 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        {/* Modal Card */}
        <div
          className={`relative w-full max-w-2xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-y-auto transform transition-all duration-300 ease-out ${
            isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-10 p-2 bg-zinc-900/50 rounded-full"
          >
            <X size={20} />
          </button>

          <div className="p-8 md:p-10">
            <header className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {project.title}
                </h2>
                <span className="px-2 py-0.5 rounded border border-zinc-700 text-[10px] font-mono text-zinc-400">
                  {project.year}
                </span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={project.deploymentUrl}
                  target="_blank"
                  onClick={() => trigger("success")}
                  className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  onClick={() => trigger("success")}
                  className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Code2 size={16} /> GitHub
                </a>
              </div>
            </header>

            <section className="mt-10 space-y-10">
              {/* Tech Stack */}
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/30 text-xs text-zinc-400"
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${tech.color}`}
                      />
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem/Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Problem
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Solution
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/10 overflow-hidden font-mono">
                <div className="px-4 py-2 border-b border-zinc-800 flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest">
                  <Terminal size={12} /> Impact Metrics
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 uppercase">
                        {m.label}
                      </span>
                      <span className="text-lg text-white font-medium">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Preview */}
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">
                  Project Preview
                </h3>
                <img
                  src={project.dashboardImage}
                  alt={project.title}
                  className="rounded-lg border border-zinc-800 w-full grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
