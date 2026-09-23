import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  IconCrown,
  IconMenu,
  IconMoon,
  IconSun,
  IconX,
} from "@tabler/icons-react"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 12)

    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })
    return () => window.removeEventListener("scroll", updateScrollState)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset"

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false)
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`mx-auto grid max-w-7xl grid-cols-3 items-center rounded-2xl border px-3 transition-all duration-500 ease-out sm:px-5 ${
            isScrolled
              ? "h-14 border-border/80 bg-background/80 backdrop-blur-xl sm:h-16"
              : "h-14 border-transparent bg-background/45 backdrop-blur-md sm:h-18"
          }`}
        >
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="-ml-1 h-9 w-9 rounded-xl text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-muted/75 hover:text-foreground active:scale-95 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <IconMenu className="h-[1.1rem] w-[1.1rem]" />
            </Button>

            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Primary navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
                >
                  {link.label}
                  <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center justify-center">
            <a
              href="/"
              className="group flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/70 hover:shadow-sm active:translate-y-0 active:scale-95"
              aria-label="Home"
            >
              <IconCrown className="h-5 w-5 stroke-[1.75] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[-8deg] sm:h-6 sm:w-6" />
            </a>
          </div>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-xl text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-muted/75 hover:text-foreground active:scale-95"
            >
              <IconSun className="h-4 w-4 scale-100 rotate-0 transition-all duration-500 dark:scale-0 dark:-rotate-90" />
              <IconMoon className="absolute h-4 w-4 scale-0 rotate-90 transition-all duration-500 dark:scale-100 dark:rotate-0" />
            </Button>

            <a
              href="mailto:syedumairali.617@gmail.com"
              className="group hidden h-9 items-center gap-1.5 rounded-xl bg-foreground px-4 text-sm font-medium text-background shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:gap-2 hover:shadow-lg hover:shadow-foreground/10 active:translate-y-0 active:scale-[0.98] md:inline-flex"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm transition-all duration-500 md:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-r-3xl border-r border-border/80 bg-background/95 p-5 backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:p-6 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between border-b border-border/70 pb-5">
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground transition-transform duration-300 group-hover:rotate-[-8deg]">
              <IconCrown className="h-4 w-4 stroke-[1.75]" />
            </span>
            <span className="text-sm font-semibold tracking-[-0.02em] text-foreground">
              Syed Umair Ali
            </span>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl text-muted-foreground transition-all duration-300 hover:rotate-90 hover:bg-muted hover:text-foreground"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <IconX className="h-[1.1rem] w-[1.1rem]" />
          </Button>
        </div>

        <nav
          className="flex flex-1 flex-col justify-center gap-2"
          aria-label="Mobile navigation links"
        >
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                transitionDelay: mobileMenuOpen
                  ? `${120 + index * 70}ms`
                  : "0ms",
              }}
              className={`group flex items-center justify-center rounded-2xl px-4 py-4 text-xl font-medium tracking-[-0.03em] text-muted-foreground transition-all duration-500 ease-out hover:bg-muted hover:text-foreground ${
                mobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-border/70 pt-5">
          <a
            href="mailto:syedumairali.617@gmail.com"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            Let&apos;s work together
          </a>
        </div>
      </aside>
    </>
  )
}
