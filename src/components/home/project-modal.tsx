import React, { useEffect } from "react"
import * as m from "motion/react-m"
import { AnimatePresence } from "motion/react"
import { IconX } from "@tabler/icons-react"
import type { Project } from "../../data/data"

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <m.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/95 shadow-2xl backdrop-blur-2xl sm:rounded-3xl"
          >
            {/* Minimalist Floating Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="transition-color absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground active:scale-95 sm:top-5 sm:right-5 sm:h-9 sm:w-9"
            >
              <IconX size={18} strokeWidth={1.75} />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-6 pt-10 pb-8 sm:px-9 sm:pt-12 sm:pb-10">
              <header className="flex flex-col gap-4">
                {/* Eyebrow: Category & Date */}
                <div className="flex items-center gap-2 font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  <span>{project.category}</span>
                  <span className="text-white/20">•</span>
                  <span>{project.year}</span>
                </div>

                {/* Project Title */}
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                  {project.title}
                </h2>

                {/* Subtitle / Short Description */}
                <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="pt-1">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech.name}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-3 py-1 font-sans text-xs text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${tech.color}`}
                          />
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {project.deploymentUrl && (
                    <a
                      href={project.deploymentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-heading text-xs font-semibold text-neutral-950 transition-opacity hover:bg-neutral-200 active:scale-95"
                    >
                      <span>Live Preview</span>
                    </a>
                  )}

                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-heading text-xs font-semibold text-foreground transition-opacity hover:bg-white/10 active:scale-95"
                    >
                      <span>Codebase</span>
                    </a>
                  )}
                </div>
              </header>

              {/* Subtle Divider */}
              <div className="my-8 h-px w-full bg-white/10" />

              {/* Main Overview Section */}
              <section className="space-y-3">
                <h3 className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Project Overview
                </h3>
                <p className="font-sans text-xs leading-relaxed whitespace-pre-line text-muted-foreground/90 sm:text-sm sm:leading-relaxed">
                  {project.overview}
                </p>
              </section>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
