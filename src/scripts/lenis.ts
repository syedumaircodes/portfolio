import Lenis from "lenis"

/**
 * A single weighted-scroll instance for the whole site.
 *
 * Lenis is the difference between "the page moves" and "the page has weight".
 * It is created once, exposed to the hero's scroll-linked motion, and skipped
 * entirely for visitors who ask for reduced motion.
 */

let instance: Lenis | null = null
let locked = false

export function initLenis(): Lenis | null {
  if (instance) return instance
  if (typeof window === "undefined") return null

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  if (reduceMotion) return null

  // Mobile browsers restore the previous scroll position on reload. Combined
  // with a hero that assembles on load, that reads as the viewport being
  // yanked around. Start every visit at the top, deliberately.
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"
  }
  window.scrollTo(0, 0)

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

/**
 * Freeze the page while the hero assembles.
 *
 * A half-built hero is not something a visitor should be able to scroll away
 * from, and on touch devices a scrollable page under a fixed overlay is the
 * usual trigger for the browser nudging the visual viewport.
 */
export function lockScroll() {
  if (!instance || locked) return
  locked = true
  instance.stop()
}

export function unlockScroll() {
  if (!instance || !locked) return
  locked = false
  instance.start()
}

export function getLenis(): Lenis | null {
  return instance
}
