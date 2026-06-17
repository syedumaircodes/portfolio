import React, { useEffect } from "react"
import * as m from "motion/react-m"
import { AnimatePresence } from "motion/react"
import { X, ExternalLink } from "lucide-react"
import { GithubIcon } from "../ui/github.tsx"
import type { Project } from "../../data/data.ts"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"

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
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl"
          />

          <div className="pointer-events-none fixed inset-0 z-60 flex items-center justify-center p-4 md:p-6">
            <m.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl"
            >
              {/* Floating, Sticky Close Button */}
              <div className="absolute top-4 right-4 z-20 md:top-5 md:right-5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full bg-background/60 backdrop-blur-md transition-all hover:bg-secondary active:scale-95"
                  aria-label="Close modal"
                >
                  <X size={18} strokeWidth={1.5} />
                </Button>
              </div>

              {/* Scrollable Content Area - Reduced Padding */}
              <div className="no-scrollbar flex-1 overflow-y-auto px-6 pt-12 pb-10 md:px-10 md:pt-14">
                {/* Meta Header */}
                <header className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="default"
                        className="border-transparent bg-primary/10 font-sans text-[10px] tracking-widest text-primary uppercase transition-colors hover:bg-primary/20"
                      >
                        {project.category}
                      </Badge>
                      <Separator className="w-4 bg-border" />
                      <span className="font-sans text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                        {project.year}
                      </span>
                    </div>

                    {/* Slightly smaller text to save vertical space */}
                    <h2 className="font-heading text-3xl tracking-tight text-foreground italic md:text-5xl">
                      {project.title}
                    </h2>
                  </div>

                  <p className="font-sans text-base leading-relaxed font-light text-muted-foreground md:text-lg">
                    {project.description}
                  </p>

                  {/* MOVED UP: Tech Stack */}
                  <div className="pt-1 pb-2">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech.name}
                          className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/20 px-3 py-1 text-[10px] font-medium text-foreground transition-colors hover:border-primary/40"
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${tech.color}`}
                          />
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Conditionally rendered action buttons */}
                  <div className="flex flex-wrap gap-3">
                    {project.deploymentUrl && (
                      <Button
                        asChild
                        size="sm"
                        className="rounded-full px-5 transition-all active:scale-95"
                      >
                        <a
                          href={project.deploymentUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink className="mr-2 h-3.5 w-3.5" /> Live
                          Preview
                        </a>
                      </Button>
                    )}

                    {project.sourceUrl && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-full px-5 transition-all active:scale-95"
                      >
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <GithubIcon className="mr-2 h-3.5 w-3.5" /> Codebase
                        </a>
                      </Button>
                    )}
                  </div>
                </header>

                <Separator className="my-8 opacity-50" />

                {/* Main Content Section */}
                <section>
                  {/* Overview Block */}
                  <div className="space-y-3">
                    <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] text-primary/80 uppercase">
                      Project Overview
                    </h4>
                    <p className="text-[14px] leading-relaxed font-light whitespace-pre-line text-muted-foreground/90 md:text-[15px]">
                      {project.overview}
                    </p>
                  </div>
                </section>
              </div>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
