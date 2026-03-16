import React, { useState } from "react";
import { projectsData, type Project } from "../data/data";
import ProjectSidebar from "./ProjectSidebar";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsSidebarOpen(true);
  };

  return (
    <section className="w-full py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-end mb-8">
          <h2 className="text-[11px] font-bold tracking-[0.2em] text-neutral-100 uppercase">
            Projects
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectsData.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="group text-left relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 aspect-16/10 transition-all hover:border-neutral-700"
            >
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-500"
                />
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-lg font-bold text-white mb-1">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-x-2">
                  {project.techStack.map((t, i) => (
                    <span
                      key={t.name}
                      className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest"
                    >
                      {t.name}
                      {i < project.techStack.length - 1 && " •"}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProjectSidebar
        project={selectedProject}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </section>
  );
};

export default Projects;
