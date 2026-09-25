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
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Section Eyebrow / Header */}
        <h2 className="mb-8 font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Work History
        </h2>

        {/* Experience List Container */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {experiences.map((exp) => (
            <div key={exp.id} className="group py-6 transition-colors md:py-7">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
                {/* Left Side: Role & Company */}
                <div className="flex flex-col gap-1 transition-transform duration-200 ease-out group-hover:translate-x-1">
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {exp.role}
                  </h3>
                  <span className="font-sans text-xs font-medium tracking-wide text-muted-foreground">
                    at <span className="text-foreground/90">{exp.company}</span>
                  </span>
                </div>

                {/* Right Side: Period & Description */}
                <div className="flex flex-col items-start gap-1.5 md:max-w-xs md:items-end md:text-right lg:max-w-sm">
                  <span className="font-sans text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    {exp.period}
                  </span>
                  <p className="font-sans text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
