// src/components/shared/Footer.tsx
import * as m from "motion/react-m"
import { IconArrowUp } from "@tabler/icons-react"

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const Footer = () => {
  return (
    <m.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-20 w-full border-t border-white/10 px-6 py-10 md:mt-28 md:py-12"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Branding & Copyright */}
        <div className="flex flex-1 flex-col items-center gap-1 sm:items-start">
          <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
            Syed Umair Ali
          </span>
          <span className="font-sans text-xs font-normal text-muted-foreground/60">
            © 2026 • Made in Karachi
          </span>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center justify-center gap-5 sm:gap-6">
          <a
            href="https://github.com/syedumaircodes"
            target="_blank"
            rel="noreferrer"
            className="font-heading text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/syedumaircodes"
            target="_blank"
            rel="noreferrer"
            className="font-heading text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href="https://substack.com/@syedumaircodes"
            target="_blank"
            rel="noreferrer"
            className="font-heading text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            Substack
          </a>
          <a
            href="mailto:syedumairali.617@gmail.com"
            className="font-heading text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>

        {/* Right: Back to Top */}
        <div className="flex flex-1 justify-center sm:justify-end">
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 font-heading text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Back to Top</span>
            <IconArrowUp
              size={14}
              strokeWidth={2}
              className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </m.footer>
  )
}

export default Footer
