import React, { useEffect, useRef } from "react"
import { IconArrowUpRight, IconX } from "@tabler/icons-react"
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
  const dialogRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen || !project) return

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    const previousOverflow = document.body.style.overflow
    const dialog = dialogRef.current

    document.body.style.overflow = "hidden"
    dialog?.querySelector<HTMLButtonElement>("[data-dialog-close]")?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== "Tab" || !dialog) return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (!first || !last) {
        event.preventDefault()
        dialog.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [isOpen, project])

  if (!project || !isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-start bg-black/75 p-0 sm:items-center sm:justify-center sm:p-6 md:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
        tabIndex={-1}
        className="relative flex h-[100dvh] max-h-[100dvh] w-[min(90vw,28rem)] max-w-none flex-col overflow-hidden rounded-r-xl border-r border-border bg-background outline-none max-sm:animate-in max-sm:slide-in-from-left max-sm:duration-300 motion-reduce:animate-none sm:h-auto sm:max-h-[88dvh] sm:w-full sm:max-w-3xl sm:rounded-xl sm:border"
      >
        <button
          type="button"
          data-dialog-close=""
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-10 inline-flex size-11 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:top-4 sm:right-4"
        >
          <IconX size={19} stroke={1.75} />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pr-[max(1rem,env(safe-area-inset-right))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] sm:px-9 sm:py-9 lg:px-11 lg:py-10">
          <header className="pr-14 sm:pr-12">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-xs font-medium tracking-wide text-muted-foreground">
              <span className="uppercase">{project.category}</span>
              <span aria-hidden="true" className="text-foreground/35">
                /
              </span>
              <time dateTime={project.year}>
                {project.month} {project.year}
              </time>
            </div>

            <h2
              id="project-modal-title"
              className="mt-5 font-heading text-3xl leading-[1.04] font-semibold tracking-[-0.04em] text-balance text-foreground sm:mt-6 sm:text-4xl lg:text-5xl"
            >
              {project.title}
            </h2>
            <p
              id="project-modal-description"
              className="mt-4 max-w-2xl font-sans text-base leading-7 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-8"
            >
              {project.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
              {project.deploymentUrl && (
                <a
                  href={project.deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
                >
                  Live Preview <IconArrowUpRight size={16} stroke={1.8} />
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-5 font-heading text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
                >
                  Codebase <IconArrowUpRight size={16} stroke={1.8} />
                </a>
              )}
            </div>
          </header>

          <div className="my-8 h-px bg-border sm:my-9" />

          <div className="grid gap-8 sm:gap-9 md:grid-cols-[minmax(0,1.5fr)_minmax(12rem,0.8fr)] md:gap-12">
            <section
              className="space-y-3"
              aria-labelledby="project-overview-title"
            >
              <h3
                id="project-overview-title"
                className="font-heading text-base font-semibold tracking-[-0.02em] text-foreground"
              >
                Project overview
              </h3>
              <p className="max-w-prose font-sans text-base leading-7 whitespace-pre-line text-muted-foreground sm:text-[15px]">
                {project.overview}
              </p>
            </section>

            {project.techStack.length > 0 && (
              <section
                className="space-y-3"
                aria-labelledby="project-built-with-title"
              >
                <h3
                  id="project-built-with-title"
                  className="font-heading text-base font-semibold tracking-[-0.02em] text-foreground"
                >
                  Built with
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech.name}
                      className="inline-flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5 font-sans text-xs text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-full ${tech.color}`}
                      />
                      {tech.name}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
