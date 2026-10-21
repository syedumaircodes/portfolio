/**
 * Scroll reveals.
 *
 * Elements marked with `data-reveal` animate in as they enter the viewport:
 * the work section's cover unmasks from the bottom while its details stagger
 * up, and the contact section's statement and links follow the same grammar.
 * One-shot — once an element has been revealed it stays revealed, so
 * scrolling back up never re-runs it.
 *
 * The check is driven by the scroll event rather than a rAF loop or an
 * IntersectionObserver. A full-bleed cover is taller than the viewport, and
 * the observer's ratio semantics get murky with elements larger than the
 * root; a scroll-driven pass is exact, and it keeps working in a tab that is
 * not being painted.
 */

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function initReveals() {
  const pending = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]")
  )
  if (!pending.length) return

  const show = (element: Element) => {
    element.classList.add("is-visible")

    // A clip-path keeps its element promoted to its own compositing layer
    // even when it is fully open, so it is released once the mask is done.
    const target = element as HTMLElement
    if (target.dataset.reveal === "media") {
      target.addEventListener("transitionend", (event) => {
        if ((event as TransitionEvent).propertyName === "clip-path") {
          target.style.clipPath = "none"
        }
      })
    }
  }

  // No motion: everything is simply present.
  if (reduced()) {
    pending.forEach(show)
    return
  }

  let queue = pending

  const check = () => {
    if (!queue.length) return

    // Reveal once an element's top edge crosses 92% of the viewport, and
    // reveal anything already scrolled past.
    const line = window.innerHeight * 0.92
    const reveal: HTMLElement[] = []

    for (const element of queue) {
      const rect = element.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top < line) reveal.push(element)
    }

    // Write after the reads, so the pass never forces a reflow mid-loop.
    reveal.forEach(show)
    queue = queue.filter((element) => !element.classList.contains("is-visible"))

    if (!queue.length) {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }
  }

  window.addEventListener("scroll", check, { passive: true })
  window.addEventListener("resize", check, { passive: true })

  // Whatever is already in view (or above it) reveals straight away.
  check()
}
