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

export default function About() {
  return (
    <section id="about" className="w-full px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl pt-10 sm:pt-12">
        <div className="grid gap-7 md:grid-cols-12 md:gap-10 lg:gap-16">
          <h2 className="font-heading text-3xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-foreground sm:text-4xl md:col-span-5 md:text-5xl">
            I design interfaces, build the databases, and write the code.
          </h2>
          <p className="max-w-2xl self-end font-sans text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:col-span-7 md:pb-1">
            I’m Umair, an engineer focused on data-intensive applications. From
            drafting design systems to optimizing data models and deploying
            production services, I help teams build tools that look sharp,
            perform under load, and solve real user problems.
          </p>
        </div>

        <div className="mt-12 grid sm:mt-16 md:grid-cols-3">
          {DISCIPLINES.map((item) => (
            <article
              key={item.title}
              className="py-5 sm:py-6 md:border-b-0 md:py-7 md:pr-7 md:not-last:pr-8 lg:pr-10 lg:not-last:pr-12"
            >
              <h3 className="font-heading text-base font-semibold tracking-[-0.02em] text-foreground sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-3 max-w-sm font-sans text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-[15px] sm:leading-7">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
