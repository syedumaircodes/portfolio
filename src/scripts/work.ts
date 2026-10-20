/**
 * Work section reveals.
 *
 * Each project reveals as it enters the viewport: the cover unmasks from the
 * bottom while the details stagger up behind it. One-shot — once an element
 * has been revealed it stays revealed, so scrolling back up never re-runs it.
 *
 * The check is driven by the scroll event rather than a rAF loop or an
 * IntersectionObserver. A full-bleed cover is taller than the viewport, and
 * the observer's ratio semantics get murky with elements larger than the
 * root; a scroll-driven pass is exact, and it keeps working in a tab that is
 * not being painted.
 */

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function initWork() {
  const root = document.querySelector<HTMLElement>("[data-work]")
  if (!root) return

  let pending = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"))
  if (!pending.length) return

  const show = (element: Element) => element.classList.add("is-visible")

  // No motion: everything is simply present.
  if (reduced()) {
    pending.forEach(show)
    return
  }

  const check = () => {
    if (!pending.length) return

    // Reveal once an element's top edge crosses 92% of the viewport, and
    // reveal anything already scrolled past.
    const line = window.innerHeight * 0.92
    const reveal: HTMLElement[] = []

    for (const element of pending) {
      const rect = element.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top < line) reveal.push(element)
    }

    // Write after the reads, so the pass never forces a reflow mid-loop.
    reveal.forEach(show)
    pending = pending.filter(
      (element) => !element.classList.contains("is-visible")
    )

    if (!pending.length) {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }
  }

  window.addEventListener("scroll", check, { passive: true })
  window.addEventListener("resize", check, { passive: true })

  // Whatever is already in view (or above it) reveals straight away.
  check()
}
