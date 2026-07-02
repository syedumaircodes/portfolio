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
    description:
      "Full-stack engineer building internationalized frontends and secure backends with RBAC.",
  },
]

// Animation variants (Matching ProjectList exactly)
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

const Experience: React.FC = () => {
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
          Work History
        </m.h2>

        {/* Experience List Container */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col border-t border-border"
        >
          {experiences.map((exp) => (
            <m.div
              key={exp.id}
              variants={itemVariants}
              whileHover="hover"
              className="group relative flex flex-col justify-between gap-4 border-b border-border py-6 text-left transition-colors md:flex-row md:items-center md:py-8"
            >
              {/* Left Side: Role & Company */}
              <div className="flex flex-col gap-1 transition-all duration-300 group-hover:pl-2">
                <span className="font-heading text-2xl leading-none tracking-tight text-foreground italic md:text-3xl">
                  {exp.role}
                </span>
                <span className="mt-1 font-sans text-[11px] leading-none font-bold tracking-wider text-muted-foreground uppercase">
                  at {exp.company}
                </span>
              </div>

              {/* Right Side: Meta and Short Description */}
              <div className="flex max-w-md flex-col items-start gap-1.5 md:items-end md:text-right">
                {/* Period metadata */}
                <span className="font-sans text-[10px] leading-none font-medium tracking-[0.15em] text-muted-foreground uppercase transition-colors group-hover:text-foreground">
                  {exp.period}
                </span>

                {/* Description block matching the row style */}
                <p className="font-sans text-xs leading-relaxed text-muted-foreground/80 transition-colors group-hover:text-foreground/90">
                  {exp.description}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}

export default Experience
