/**
 * Scroll reveals.
 *
 * Elements marked with `data-reveal` animate in as they enter the viewport:
 * the work section's heading, rules and covers unmask while the project
 * details stagger up, and the contact section follows the same grammar.
 * One-shot — once an element has been revealed it stays revealed, so
 * scrolling back up never re-runs it.
 *
 * LCP safety: the hidden state is never in the stylesheet up front. This
 * module *arms* only the elements that sit entirely below the viewport at
 * init; anything already on screen is marked visible and painted at full
 * opacity. A reveal therefore cannot delay a potential LCP element, and with
 * no JavaScript there is no hidden state at all.
 *
 * CLS safety: only opacity, transform and clip-path are animated. The base
 * layout — including the cover's reserved aspect ratio — is untouched, so
 * no reveal can move content around it.
 *
 * The check is driven by the scroll event rather than a rAF loop or an
 * IntersectionObserver. A full-bleed cover is taller than the viewport, and
 * the observer's ratio semantics get murky with elements larger than the
 * root; a scroll-driven pass is exact, and it keeps working in a tab that is
 * not being painted.
 */

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** How far into the viewport an element must be before it reveals. */
const TRIGGER = 0.92

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

  let queue: HTMLElement[] = []

  // Arm only what is fully below the fold. Everything else — including a
  // deep link that lands mid-page — is visible immediately. Arming happens
  // after that first measurement, so the browser never paints a hidden
  // element that was already on screen.
  pending.forEach((element) => {
    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.setAttribute("data-reveal-armed", "")
      queue.push(element)
    } else {
      show(element)
    }
  })

  if (!queue.length) return

  const check = () => {
    if (!queue.length) return

    const line = window.innerHeight * TRIGGER
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

  // A resize may have pulled an armed element into view already.
  check()
}
