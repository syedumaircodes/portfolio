import { useState } from "react"
import * as m from "motion/react-m"
import { type Variants } from "motion/react"
import { projectsData, type Project } from "../../data/data"
import ProjectModal from "./project-modal"

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <m.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 font-sans text-[11px] font-bold tracking-[0.2em] text-foreground/80 uppercase"
        >
          Projects & Concepts
        </m.h2>

        {/* Project List Container */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col border-t border-border"
        >
          {projectsData.map((project) => (
            <m.button
              key={project.id}
              variants={itemVariants}
              onClick={() => openProject(project)}
              whileHover="hover"
              className="group relative flex items-center justify-between border-b border-border py-6 text-left transition-colors hover:bg-muted/30 md:py-8"
            >
              {/* Left Side: Title */}
              <div className="flex flex-col gap-1">
                <span className="font-heading text-2xl tracking-tight text-foreground italic transition-all duration-300 group-hover:pl-2 md:text-3xl">
                  {project.title}
                </span>
              </div>

              {/* Right Side: Meta and Icon */}
              <div className="flex items-center gap-2">
                <span className="hidden font-sans text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase transition-colors group-hover:text-foreground sm:block">
                  {project.month} {project.year}
                </span>

                <m.div
                  variants={{
                    hover: { x: 2, y: -2, scale: 1.1 },
                  }}
                  className="text-muted-foreground/40 transition-colors group-hover:text-primary"
                ></m.div>
              </div>
            </m.button>
          ))}
        </m.div>
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
