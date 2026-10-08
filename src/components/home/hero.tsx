import {
  IconArrowDown,
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileText,
  IconBookmark,
} from "@tabler/icons-react"
import ProfileResume from "../../assets/SyedUmairAli_Resume.pdf"

const Hero = () => {
  return (
    <section className="w-full px-5 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:gap-10">
          <header>
            <h1 className="font-heading text-2xl leading-tight font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
              Syed Umair Ali
            </h1>
            <p className="mt-2 font-sans text-sm leading-6 text-muted-foreground sm:text-base">
              Full-stack software engineer
            </p>
          </header>

          <div>
            <h2 className="max-w-4xl font-heading text-3xl leading-[0.99] font-semibold tracking-[-0.04em] text-balance text-foreground md:text-5xl">
              I turn ideas into software that works in the real world.
            </h2>
            <p className="mt-6 max-w-2xl font-sans text-base leading-7 text-muted-foreground sm:mt-8 sm:text-lg sm:leading-8">
              I turn complex workflows into simple, reliable experiences that
              work for the people using them.{" "}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="mailto:syedumairali.617@gmail.com"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:w-auto"
              >
                Let’s talk <IconArrowUpRight size={17} stroke={1.8} />
              </a>
              <a
                href="#work"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-border px-6 font-heading text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:w-auto"
              >
                Explore my work <IconArrowDown size={16} stroke={1.8} />
              </a>
            </div>
          </div>
        </div>

        <footer className="mt-14 flex flex-wrap items-center gap-3 border-t border-border pt-5 sm:mt-20 sm:gap-5">
          <span className="mr-1 shrink-0 font-sans text-xs font-medium text-muted-foreground">
            Elsewhere
          </span>
          <a
            href="https://linkedin.com/in/syedumaircodes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="visit my LinkedIn profile"
            className="rounded-sm p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <IconBrandLinkedin size={22} stroke={1.75} />
          </a>
          <a
            href="https://github.com/syedumaircodes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="visit my Github profile"
            className="rounded-sm p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <IconBrandGithub size={22} stroke={1.75} />
          </a>
          <a
            href="https://substack.com/@syedumaircodes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="visit my Substack"
            className="rounded-sm p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <IconBookmark size={22} stroke={1.75} />
          </a>
          <a
            href={ProfileResume}
            download
            className="inline-flex min-h-10 items-center gap-2 rounded-sm px-2 font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <IconFileText size={17} stroke={1.75} />
          </a>
        </footer>
      </div>
    </section>
  )
}

export default Hero
