import Lenis from "lenis"

/**
 * A single weighted-scroll instance for the whole site.
 *
 * Lenis is the difference between "the page moves" and "the page has weight".
 * It is created once, exposed to the hero's scroll-linked motion, and skipped
 * entirely for visitors who ask for reduced motion.
 */

let instance: Lenis | null = null

export function initLenis(): Lenis | null {
  if (instance) return instance
  if (typeof window === "undefined") return null

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  if (reduceMotion) return null

  instance = new Lenis({
    duration: 1.15,
    // Exponential ease-out: fast pickup, long settle. Never linear.
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    // Matches the `scroll-mt-24` on the page sections, so Lenis and the
    // native anchor jump land in the same place.
    anchors: { offset: -96 },
  })

  const raf = (time: number) => {
    instance?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return instance
}

export function getLenis(): Lenis | null {
  return instance
}
