import { m, type Variants } from "motion/react"

const DISCIPLINES = [
  {
    title: "Product Engineering",
    description:
      "Full-stack architecture and frontend polish. I bridge backend logic with responsive, accessible interfaces ready for production scale.",
  },
  {
    title: "Data Engineering",
    description:
      "Reliable data pipelines and schema design. I make high-volume, complex data clean, fast, and ready for user-facing applications.",
  },
  {
    title: "Product Design",
    description:
      "Scalable design systems and intuitive user flows. I turn dense workflows and data dashboards into interfaces people actually want to use.",
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function About() {
  return (
    <section id="about" className="w-full px-6 py-16 md:py-20">
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mx-auto max-w-3xl"
      >
        {/* Statement & Bio Block */}
        <m.div variants={revealVariants} className="max-w-2xl">
          <p className="font-heading text-2xl leading-tight font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            I design interfaces, build the databases, and write the code.
          </p>
          <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
            I’m Umair, an engineer focused on data-intensive applications. From
            drafting design systems to optimizing data models and deploying
            production services, I help teams build tools that look sharp,
            perform under load, and solve real user problems.
          </p>
        </m.div>

        {/* Disciplines Linear Rows */}
        <m.div
          variants={revealVariants}
          className="mt-12 divide-y divide-white/10 border-y border-white/10"
        >
          {DISCIPLINES.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:py-6"
            >
              <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground sm:w-1/3 sm:text-base">
                {item.title}
              </h3>
              <p className="font-sans text-xs leading-relaxed text-muted-foreground sm:w-2/3 sm:text-sm sm:leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </m.div>
      </m.div>
    </section>
  )
}
