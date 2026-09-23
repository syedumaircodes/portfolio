import { useState } from "react"
import * as m from "motion/react-m"
import { type Variants } from "motion/react"
import { IconArrowUpRight } from "@tabler/icons-react"
import { projectsData, type Project } from "../../data/data"
import ProjectModal from "./project-modal"

// Animation variants matching Experience & Hero
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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
    <section className="w-full px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <m.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase"
        >
          Selected Work
        </m.h2>

        {/* Project List Container */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col divide-y divide-white/10 border-y border-white/10"
        >
          {projectsData.map((project) => (
            <m.button
              key={project.id}
              variants={itemVariants}
              onClick={() => openProject(project)}
              whileHover="hover"
              className="group relative flex w-full items-center justify-between py-5 text-left transition-colors sm:py-6 md:py-7"
            >
              {/* Left Side: Title */}
              <div className="flex items-center gap-3">
                <span className="font-heading text-lg font-medium tracking-tight text-foreground transition-transform duration-200 ease-out group-hover:translate-x-1 sm:text-xl">
                  {project.title}
                </span>
              </div>

              {/* Right Side: Meta and Animated Arrow Icon */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="hidden font-sans text-xs font-medium tracking-wider text-muted-foreground uppercase transition-colors group-hover:text-foreground sm:block">
                  {project.month} {project.year}
                </span>

                <m.div
                  variants={{
                    hover: { x: 2, y: -2 },
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="text-muted-foreground/50 transition-colors group-hover:text-foreground"
                >
                  <IconArrowUpRight size={18} stroke={1.75} />
                </m.div>
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
