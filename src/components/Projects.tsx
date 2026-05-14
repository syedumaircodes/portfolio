import { useState } from "react";
import { projectsData, type Project } from "../data/data";
import ProjectModal from "./ProjectSidebar";

const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section className="w-full py-4 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[11px] font-bold tracking-[0.2em] text-neutral-100 uppercase mb-5">
          Projects and Concepts
        </h2>

        <div className="flex flex-col divide-y divide-zinc-800/50">
          {projectsData.map((project) => (
            <button
              key={project.id}
              onClick={() => openProject(project)}
              className="group flex items-center justify-between py-5 hover:px-2 transition-all duration-300 ease-out text-left"
            >
              <div className="flex flex-col">
                <span className="text-zinc-100 group-hover:text-white font-medium text-base transition-colors">
                  {project.title}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-zinc-500 font-mono text-sm tabular-nums group-hover:text-zinc-300 transition-colors">
                  {project.month} {project.year}
                </span>
                <span className="text-zinc-700 group-hover:text-zinc-300 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M4 10L10 4M10 4H5M10 4V9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ProjectList;
