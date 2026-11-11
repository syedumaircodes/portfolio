/**
 * Cover parallax.
 *
 * The work section's screenshots drift a few percent against the scroll —
 * depth without distraction. The frame (`[data-parallax]`) is the full
 * cover box; the image lives in an inner span a little taller than the
 * frame, so the drift never exposes an edge.
 *
 * Transform only, throttled to one write per frame, and skipped entirely
 * for reduced motion — the cover is then simply still.
 *
 * Like `reveal.ts`, this runs off the scroll event rather than Lenis
 * directly, so it works in any context that fires real scroll positions.
 */

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Total drift, as a fraction of the frame's height. */
const RANGE = 0.05

export function initCoverParallax() {
  if (reduced()) return

  const frames = Array.from(
    document.querySelectorAll<HTMLElement>("[data-parallax]")
  )
    .map((frame) => ({ frame, target: frame.firstElementChild }))
    .filter((entry): entry is { frame: HTMLElement; target: Element } =>
      Boolean(entry.target)
    )
  if (!frames.length) return

  let queued = false

  const update = () => {
    queued = false
    const vh = window.innerHeight

    for (const { frame, target } of frames) {
      const rect = frame.getBoundingClientRect()
      // Idle far off-screen; the next scroll event picks it back up.
      if (rect.bottom < -vh * 0.2 || rect.top > vh * 1.2) continue

      // 0 as the cover enters the bottom edge, 1 as it leaves the top.
      const progress = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh + rect.height))
      )
      const shift = (progress - 0.5) * RANGE * rect.height
      ;(target as HTMLElement).style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`
    }
  }

  const onScroll = () => {
    if (!queued) {
      queued = true
      requestAnimationFrame(update)
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll, { passive: true })

  update()
}
