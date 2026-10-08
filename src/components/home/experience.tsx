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
    <section id="experience" className="w-full px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl pt-10 sm:pt-12">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10 lg:gap-16">
          <h2 className="font-heading text-3xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-foreground sm:text-4xl md:col-span-5 md:text-5xl">
            Work history
          </h2>

          <div className="md:col-span-7">
            {experiences.map((exp) => (
              <article
                key={exp.id}
                className="grid gap-4 border-y border-border py-6 sm:py-7 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
              >
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
                    {exp.role}
                  </h3>
                  <p className="mt-1 font-sans text-sm leading-6 text-muted-foreground sm:text-[15px]">
                    {exp.company}
                  </p>
                  <p className="mt-4 max-w-lg font-sans text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                    {exp.description}
                  </p>
                </div>
                <p className="font-sans text-xs font-medium tracking-wide text-muted-foreground sm:text-sm md:pt-1 md:text-right">
                  {exp.period}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
