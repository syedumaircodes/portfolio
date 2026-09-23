import * as m from "motion/react-m"

const CTA = () => {
  return (
    <section id="contact" className="w-full px-6 py-16 md:py-18">
      <div className="mx-auto max-w-3xl">
        {/* Centered Content Block */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <p className="font-heading text-2xl leading-tight font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Let’s build something together.
          </p>

          <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
            I’m always open to discussing new opportunities, technical
            challenges, or interesting products. Feel free to reach out.
          </p>

          {/* Centered Action Button */}
          <div className="mt-8">
            <a
              href="mailto:syedumairali.617@gmail.com"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-heading text-xs font-semibold text-neutral-950 transition-all hover:bg-neutral-200 active:scale-95"
            >
              <span>Let's Chat</span>
            </a>
          </div>
        </m.div>
      </div>
    </section>
  )
}

export default CTA
