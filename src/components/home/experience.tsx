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
      className="w-full px-4 py-16 sm:px-5 sm:py-20 lg:py-18"
    >
      <div className="mx-auto max-w-5xl pt-10 sm:pt-12">
        <h2 className="mb-10 font-heading text-3xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-foreground sm:mb-12 sm:text-4xl">
          Work history
        </h2>

        <div className="border-y border-border">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="grid gap-5 py-7 sm:py-9 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-10"
            >
              <p className="font-sans text-xs font-medium tracking-wide text-muted-foreground tabular-nums sm:text-sm">
                {exp.period}
              </p>
              <div>
                <h3 className="font-heading text-xl leading-tight font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                  {exp.role}
                </h3>
                <p className="mt-1.5 font-sans text-sm font-medium text-foreground/75 sm:text-base">
                  {exp.company}
                </p>
                <p className="mt-4 max-w-2xl font-sans text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                  {exp.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
