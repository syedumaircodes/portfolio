import React, { useEffect } from "react";
import { X, ExternalLink, Code2, Terminal } from "lucide-react";
import type { Project } from "../data/data.ts";

interface ProjectSidebarProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] lg:w-[600px] bg-zinc-950 border-l border-zinc-800 z-50 transform transition-transform duration-500 ease-out p-8 overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <header className="space-y-4 mt-8">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-white">{project.title}</h2>
            <span className="px-2 py-0.5 rounded border border-zinc-700 text-[10px] font-mono text-zinc-400">
              {project.year}
            </span>
          </div>
          <p className="text-zinc-400 leading-relaxed">{project.description}</p>

          <div className="flex gap-3 pt-2">
            <a
              href={project.deploymentUrl}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <ExternalLink size={16} /> Visit Deployment
            </a>
            <a
              href={project.sourceUrl}
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Code2 size={16} /> Source
            </a>
          </div>
        </header>

        <section className="mt-12 space-y-8">
          {/* Tech Stack */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-300"
                >
                  <div className={`h-1.5 w-1.5 rounded-full ${tech.color}`} />
                  {tech.name}
                </div>
              ))}
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="space-y-6">
            <p className="text-zinc-300 text-sm leading-relaxed">
              <span className="font-bold text-white">The Problem:</span>{" "}
              {project.problem}
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              <span className="font-bold text-white">The Solution:</span>{" "}
              {project.solution}
            </p>
          </div>

          {/* Metrics Card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 overflow-hidden font-mono">
            <div className="px-4 py-2 border-b border-zinc-800 flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest">
              <Terminal size={12} /> Metric Improvement
            </div>
            <div className="p-4 space-y-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex justify-between text-xs">
                  <span className="text-zinc-500">{m.label}</span>
                  <span className="text-zinc-200">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-zinc-400 text-sm">{project.longDescription}</p>

          {/* Dashboard Preview */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">
              Project Overview
            </h3>
            <img
              src={project.dashboardImage}
              alt="Dashboard preview"
              className="rounded-xl border border-zinc-800  transition-all duration-500 w-full"
            />
          </div>
        </section>
      </aside>
    </>
  );
};

export default ProjectSidebar;
