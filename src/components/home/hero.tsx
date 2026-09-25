import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileText,
  IconBookmark,
} from "@tabler/icons-react"
import ProfileResume from "../../assets/SyedUmairAli_Resume.pdf"

const Hero = () => {
  return (
    <section className="w-full px-6 py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-3xl">
        {/* Header Block */}
        <header className="flex flex-col gap-3 md:gap-4">
          <h1 className="font-heading text-4xl leading-[1.08] font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Syed Umair Ali
          </h1>
        </header>

        {/* Bio / Summary Block */}
        <article className="mt-6 md:mt-8">
          <p className="font-sans text-base leading-relaxed font-normal text-muted-foreground sm:text-lg md:text-xl">
            I build software that handles serious scale without sacrificing
            design polish. Clean architecture on the backend, effortless UX on
            the frontend.
          </p>
        </article>

        {/* Actions & Social Links */}
        <footer className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between md:mt-14">
          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com/in/syedumaircodes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="visit my LinkedIn profile"
              className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconBrandLinkedin size={22} stroke={1.75} />
            </a>
            <a
              href="https://github.com/syedumaircodes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="visit my Github profile"
              className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconBrandGithub size={22} stroke={1.75} />
            </a>
            <a
              href="https://substack.com/@syedumaircodes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="visit my substack"
              className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconBookmark size={22} stroke={1.75} />
            </a>
            <a
              href={ProfileResume}
              download
              aria-label="download my resume"
              className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconFileText size={22} stroke={1.75} />
            </a>
          </div>

          <a
            href="mailto:syedumairali.617@gmail.com"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-heading text-sm font-semibold text-primary-foreground shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="relative z-10">Get in Touch</span>
          </a>
        </footer>
      </div>
    </section>
  )
}

export default Hero
