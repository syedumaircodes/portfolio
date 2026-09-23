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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function About() {
  return (
    /* Matches Hero padding and width exactly */
    <section id="about" className="w-full px-6 py-16 md:py-20">
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mx-auto max-w-3xl"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10 lg:gap-12">
          {/* Left Column: Heading & Bio */}
          <m.div variants={revealVariants} className="flex flex-col">
            <h2 className="font-heading text-xl leading-[1.2] font-medium tracking-tight text-foreground sm:text-2xl md:text-[1.65rem]">
              I design the interface, architect the data, and ship the code.
            </h2>
            <p className="mt-4 font-sans text-xs leading-relaxed text-muted-foreground sm:text-[13px] md:text-sm md:leading-relaxed">
              I’m Umair, an engineer focused on data-intensive applications.
              From drafting design systems to optimizing data models and
              deploying production services, I help teams build tools that look
              sharp, perform under load, and solve real user problems.
            </p>
          </m.div>

          {/* Right Column: Disciplines */}
          <m.div
            variants={revealVariants}
            className="divide-y divide-white/10 md:self-start"
          >
            {DISCIPLINES.map((item) => (
              <div
                key={item.title}
                className="py-4 first:pt-0 last:pb-0 md:py-5 md:first:pt-0 md:last:pb-0"
              >
                <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground md:text-[15px]">
                  {item.title}
                </h3>
                <p className="mt-1.5 font-sans text-xs leading-relaxed text-muted-foreground md:text-[13px]">
                  {item.description}
                </p>
              </div>
            ))}
          </m.div>
        </div>
      </m.div>
    </section>
  )
}
