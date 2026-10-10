import { useState } from "react"
import { projectsData, type Project } from "../../data/data"
import ProjectModal from "./project-modal"
import blockforgeCover from "../../assets/projects/blockforge_cover.webp"
import commonplaceCover from "../../assets/projects/commonplace-cover.webp"
const projectImages: Record<string, string> = {
  "blockforge-web3-platform": blockforgeCover,
  "commonplace-knowledge-hub": commonplaceCover,
}

const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section id="work" className="w-full px-4 py-16 sm:px-5 sm:py-20 lg:py-18">
      <div className="mx-auto max-w-5xl pt-10 sm:pt-12">
        <h2 className="mb-10 font-heading text-3xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-foreground sm:mb-12 sm:text-4xl">
          Selected work
        </h2>

        <div className="space-y-5 sm:space-y-7">
          {projectsData.map((project) => (
            <button
              key={project.id}
              onClick={() => openProject(project)}
              aria-label={`View project: ${project.title}`}
              className="group grid w-full gap-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center"
            >
              <span className="relative block aspect-4/3 overflow-hidden rounded-xl bg-secondary">
                {projectImages[project.id] ? (
                  <img
                    src={projectImages[project.id]}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center font-heading text-2xl font-semibold tracking-[-0.04em] text-muted-foreground">
                    {project.title}
                  </span>
                )}
                <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
              </span>

              <span className="flex min-w-0 flex-col items-start py-1 md:py-4">
                <span className="flex items-center gap-2 font-sans text-xs font-medium tracking-wide text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-violet-400" />
                  <span className="capitalize">{project.category}</span>
                  <span aria-hidden="true" className="text-foreground/30">
                    /
                  </span>
                  <time dateTime={project.year}>
                    {project.month} {project.year}
                  </time>
                </span>
                <span className="mt-4 font-heading text-2xl leading-[1.08] font-semibold tracking-[-0.035em] text-foreground transition-colors group-hover:text-white sm:text-3xl">
                  {project.title}
                </span>
                <span className="mt-3 max-w-lg font-sans text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                  {project.description}
                </span>
                <span className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-foreground/25 font-sans text-sm font-medium text-foreground transition-colors group-hover:border-foreground group-hover:text-white">
                  Explore project
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
