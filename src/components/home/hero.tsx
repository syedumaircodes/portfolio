import * as m from "motion/react-m"
import { type Variants } from "motion/react"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileText,
  IconArrowUpRight,
} from "@tabler/icons-react"
import ProfileResume from "../../assets/SyedUmairAli_SoftwareEngineer.pdf"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

const Hero = () => {
  return (
    <m.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full px-6 py-16 md:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <header className="space-y-4">
          <h1 className="font-heading text-5xl tracking-tight text-foreground italic md:text-7xl">
            Syed Umair Ali
          </h1>

          <m.div variants={itemVariants} className="flex items-center gap-3">
            <h2 className="font-sans text-sm font-medium tracking-[0.2em] text-foreground/80 uppercase">
              Full-Stack Engineer & Product Builder
            </h2>
          </m.div>
        </header>

        <article className="mt-10 max-w-2xl">
          <p className="text-lg leading-relaxed font-light text-foreground md:text-xl">
            I like building things that real people use. My focus is always on
            getting a working product shipped so we can start learning from real
            users.
          </p>
        </article>

        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "circOut" }}
          className="my-12 h-px w-full origin-left bg-border"
        />

        <footer className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <m.div variants={itemVariants} className="flex items-center gap-8">
            <a
              href="https://linkedin.com/in/syedumaircodes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="visit my LinkedIn profile"
              className="text-foreground transition-colors hover:text-primary"
            >
              <IconBrandLinkedin />
            </a>
            <a
              href="https://github.com/syedumaircodes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors hover:text-primary"
              aria-label="visit my Github profile"
            >
              <IconBrandGithub />
            </a>
            <a
              href={ProfileResume}
              download
              aria-label="download my resume"
              className="text-foreground transition-colors hover:text-primary"
            >
              <IconFileText />
            </a>
          </m.div>

          <m.a
            variants={itemVariants}
            href="mailto:syedumairali.617@gmail.com"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground"
          >
            <span className="relative z-10">Email Me</span>
            <m.div
              variants={{
                hover: { x: 3, y: -3 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <IconArrowUpRight />
            </m.div>
          </m.a>
        </footer>
      </div>
    </m.section>
  )
}

export default Hero
