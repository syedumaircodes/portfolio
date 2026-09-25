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
    <section className="w-full px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <h2 className="mb-8 font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Selected Work
        </h2>

        {/* Project List Container */}
        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {projectsData.map((project) => (
            <button
              key={project.id}
              onClick={() => openProject(project)}
              className="group relative flex w-full items-center justify-between py-5 text-left transition-colors sm:py-6 md:py-7"
            >
              {/* Left Side: Title */}
              <div className="flex items-center gap-3">
                <span className="font-heading text-lg font-medium tracking-tight text-foreground transition-transform duration-200 ease-out group-hover:translate-x-1 sm:text-xl">
                  {project.title}
                </span>
              </div>

              {/* Right Side: Meta and Arrow Icon */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="hidden font-sans text-xs font-medium tracking-wider text-muted-foreground uppercase transition-colors group-hover:text-foreground sm:block">
                  {project.month} {project.year}
                </span>

                <div className="text-muted-foreground/50 transition-colors group-hover:text-foreground">
                  <IconArrowUpRight size={18} stroke={1.75} />
                </div>
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
  )
}

export default ProjectList
