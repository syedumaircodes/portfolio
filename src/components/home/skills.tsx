import React from "react"
import * as m from "motion/react-m"
import { type Variants } from "motion/react"

const Stack: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Go",
  "Postgres",
  "Supabase",
  "AWS",
  "Docker",
  "Framer Motion",
  "Tailwind",
  "GraphQL",
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }, // Fast stagger for a smooth waterfall effect
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const Skills: React.FC = () => {
  return (
    <section className="w-full px-6 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Top Heading Group */}
        <div className="mb-8 space-y-3">
          {/* Section Label: Matches the 'Resources' style */}
          <m.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block font-sans text-[11px] font-bold tracking-[0.2em] text-foreground/80 uppercase"
          >
            Skills and Technologies
          </m.span>
        </div>

        {/* Full-width Skill Pills Row */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2.5 sm:gap-3"
        >
          {Stack.map((item) => (
            <m.div
              key={item}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-default rounded-full bg-card px-5 py-2.5 font-sans text-sm font-medium text-white select-none"
            >
              {item}
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}

export default Skills
