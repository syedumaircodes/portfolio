import React from "react"
import * as m from "motion/react-m"
import { type Variants } from "motion/react"

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

const Experience: React.FC = () => {
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Section Eyebrow / Header */}
        <m.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase"
        >
          Work History
        </m.h2>

        {/* Experience List Container */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="divide-y divide-white/10 border-y border-white/10"
        >
          {experiences.map((exp) => (
            <m.div
              key={exp.id}
              variants={itemVariants}
              className="group py-6 transition-colors md:py-7"
            >
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
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}

export default Experience
