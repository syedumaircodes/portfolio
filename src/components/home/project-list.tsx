import { useState } from "react"
import { IconArrowUpRight } from "@tabler/icons-react"
import { projectsData, type Project } from "../../data/data"
import ProjectModal from "./project-modal"

const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section id="work" className="w-full px-4 py-16 sm:px-5 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl pt-10 sm:pt-12">
        <h2 className="mb-10 font-heading text-3xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-foreground sm:mb-12 sm:text-4xl">
          Selected work
        </h2>

        <div className="divide-y divide-border border-y border-border">
          {projectsData.map((project) => (
            <button
              key={project.id}
              onClick={() => openProject(project)}
              className="group flex min-h-16 w-full items-center justify-between gap-4 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:py-8"
            >
              <span className="min-w-0 font-heading text-base leading-snug font-medium tracking-[-0.02em] text-foreground transition-transform duration-200 ease-out group-hover:translate-x-1 sm:text-lg">
                {project.title}
              </span>
              <span className="flex shrink-0 items-center gap-2.5 sm:gap-4">
                <span className="font-sans text-[11px] font-medium tracking-wide text-muted-foreground tabular-nums transition-colors group-hover:text-foreground sm:text-xs">
                  {project.month} {project.year}
                </span>
                <span className="text-muted-foreground/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground">
                  <IconArrowUpRight size={18} stroke={1.75} />
                </span>
              </span>
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
  )
}

export default ProjectList
