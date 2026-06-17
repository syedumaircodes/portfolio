// src/components/shared/Footer.tsx
import { motion } from "motion/react"
import { ArrowUp } from "lucide-react"

// Moved outside the component to avoid recreation on every render
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-16 w-full border-t border-border/40 px-6 py-10 md:mt-24"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Branding (flex-1 forces equal width sharing) */}
        <div className="flex flex-1 flex-col items-center gap-2 sm:items-start">
          <span className="font-heading text-2xl tracking-tight text-foreground italic">
            Syed Umair Ali
          </span>
          <span className="font-sans text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
            © 2026 • Made in Karachi
          </span>
        </div>

        {/* Center: Social Links (Natural width, stays perfectly centered) */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/syedumaircodes"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-[10px] font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            Github
          </a>
          <a
            href="https://linkedin.com/in/syedumaircodes"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-[10px] font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            LinkedIn
          </a>
          <a
            href="mailto:syedumairali.617@gmail.com"
            className="font-sans text-[10px] font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            Email
          </a>
        </div>

        {/* Right: Back to Top (flex-1 to balance the left side, justify-end to push to right edge) */}
        <div className="flex flex-1 justify-center sm:justify-end">
          <a
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-sans text-[10px] font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            Back to Top
            <ArrowUp
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
