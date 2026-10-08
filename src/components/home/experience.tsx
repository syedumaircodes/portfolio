import React from "react"

interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  description: string
}

const experiences: ExperienceItem[] = [
  {
    id: "heptic",
    role: "Junior Software Engineer",
    company: "Heptic.it",
    period: "2025 — Present",
    description: "Full-stack engineer building fullstack web and desktop apps",
  },
]

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="w-full px-4 py-16 sm:px-5 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl pt-10 sm:pt-12">
        <h2 className="mb-10 font-heading text-3xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-foreground sm:mb-12 sm:text-4xl">
          Work history
        </h2>

        <div className="divide-y divide-border border-y border-border">
          {experiences.map((exp) => (
            <article key={exp.id} className="py-6 sm:py-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-heading text-base leading-snug font-medium tracking-[-0.02em] text-foreground sm:text-lg">
                    {exp.role}
                  </h3>
                  <p className="mt-1 font-sans text-xs leading-5 text-muted-foreground sm:text-sm">
                    {exp.company}
                  </p>
                </div>
                <p className="shrink-0 pt-0.5 font-sans text-[11px] font-medium tracking-wide text-muted-foreground tabular-nums sm:text-xs">
                  {exp.period}
                </p>
              </div>
              <p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                {exp.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
