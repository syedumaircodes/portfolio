import { getLenis } from "./lenis"

/**
 * Hero choreography.
 *
 * Two systems run side by side:
 *
 *  1. A load timeline built on the Web Animations API. Every element animates
 *     transform/opacity only, so the whole sequence stays on the compositor.
 *  2. A continuous rAF loop that layers scroll-linked drift and pointer
 *     parallax on top of the finished composition.
 *
 * Both respect prefers-reduced-motion: the timeline is skipped and the final
 * composition is simply rendered.
 */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const q = <T extends Element>(root: ParentNode, sel: string) =>
  root.querySelector<T>(sel)

const qa = <T extends Element>(root: ParentNode, sel: string) =>
  Array.from(root.querySelectorAll<T>(sel))

export function initHero() {
  const root = q<HTMLElement>(document, "[data-hero]")
  if (!root) return

  try {
    run(root)
  } catch (error) {
    // If anything in the timeline fails, drop back to the static composition
    // rather than leaving the hero half-animated.
    document.documentElement.classList.remove("js")
    console.error("[hero] choreography failed", error)
  }
}

function run(root: HTMLElement) {
  const curtain = q<HTMLElement>(root, "[data-curtain]")
  const title = q<HTMLElement>(root, "[data-title]")
  const bloom = q<HTMLElement>(root, "[data-bloom]")
  const grain = q<HTMLElement>(root, "[data-grain]")
  const support = q<HTMLElement>(root, "[data-support]")
  const ticker = q<HTMLElement>(root, "[data-ticker]")

  const words = qa<HTMLElement>(root, "[data-word]")
  const indexItems = qa<HTMLElement>(root, "[data-index-item]")

  /* ---------------------------------------------------------------------
     Load timeline
  --------------------------------------------------------------------- */
  if (!reduced()) {
    const tl: Animation[] = []
    const at = (
      el: Element | null | undefined,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions
    ) => {
      if (!el) return
      tl.push(el.animate(keyframes, { fill: "both", ...options }))
    }

    // Safety net: if the tab is backgrounded mid-load the compositor can
    // starve and leave the hero half-assembled. Snap to the end state.
    window.setTimeout(() => {
      tl.forEach((animation) => {
        try {
          animation.finish()
        } catch {
          /* already settled */
        }
      })
    }, 4000)

    // 0 — the curtain lifts off the page.
    at(
      curtain,
      [
        { clipPath: "inset(0% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 100% 0%)" },
      ],
      { duration: 1100, delay: 150, easing: EASE }
    )

    // 250+ — the statement rises out of its clips, word by word.
    words.forEach((word, i) => {
      at(
        word,
        [
          {
            transform: "translate3d(0,0.3em,0)",
            clipPath: "inset(-0.25em 0 100% 0)",
          },
          {
            transform: "translate3d(0,0,0)",
            clipPath: "inset(-0.25em 0 -0.25em 0)",
          },
        ],
        { duration: 1300, delay: 250 + i * 68, easing: EASE }
      )
    })

    // 950 — the capability index, row by row.
    indexItems.forEach((item, i) => {
      at(
        item,
        [
          { opacity: 0, transform: "translate3d(0,14px,0)" },
          { opacity: 1, transform: "translate3d(0,0,0)" },
        ],
        { duration: 800, delay: 950 + i * 70, easing: EASE }
      )
    })

    // 1080 — the supporting column.
    at(
      support,
      [
        { opacity: 0, transform: "translate3d(0,20px,0)" },
        { opacity: 1, transform: "translate3d(0,0,0)" },
      ],
      { duration: 1000, delay: 1200, easing: EASE }
    )

    // 1200 — the ticker.
    at(
      ticker,
      [
        { opacity: 0, transform: "translate3d(0,100%,0)" },
        { opacity: 1, transform: "translate3d(0,0,0)" },
      ],
      { duration: 1000, delay: 1200, easing: EASE }
    )
  } else {
    // Reduced motion: drop the curtain and release the clips so the hero is
    // simply present rather than animated.
    curtain?.remove()
    document.documentElement.classList.remove("js")
  }

  /* ---------------------------------------------------------------------
     Scroll-linked drift + pointer parallax
  --------------------------------------------------------------------- */
  const pointer = { x: 0, y: 0 }
  const eased = { x: 0, y: 0 }
  let scroll = 0
  let scrollTarget = 0
  let hasPointer = false

  const lenis = getLenis()
  if (lenis) {
    lenis.on("scroll", (e: { scroll: number }) => {
      scrollTarget = e.scroll
    })
  } else {
    window.addEventListener(
      "scroll",
      () => {
        scrollTarget = window.scrollY
      },
      { passive: true }
    )
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      hasPointer = true
    },
    { passive: true }
  )

  const heroHeight = () => root.offsetHeight || window.innerHeight

  // The loop only runs while the hero is on screen. Everything it writes is
  // a transform or an opacity, so nothing is laid out while it runs.
  let visible = true
  let running = false
  const motion = !reduced()

  const frame = () => {
    // Ease the scroll value so the drift lags the input slightly.
    scroll += (scrollTarget - scroll) * 0.12
    eased.x += (pointer.x - eased.x) * 0.06
    eased.y += (pointer.y - eased.y) * 0.06

    const progress = Math.min(1, Math.max(0, scroll / heroHeight()))

    if (title) {
      const lift = progress * -70
      const scale = 1 - progress * 0.055
      const driftX = hasPointer ? (eased.x / window.innerWidth - 0.5) * 14 : 0
      title.style.transform = `translate3d(${driftX.toFixed(2)}px, ${lift.toFixed(
        2
      )}px, 0) scale(${scale.toFixed(4)})`
      title.style.opacity = String(Math.max(0, 1 - progress * 0.55))
    }

    if (support) {
      support.style.opacity = String(Math.max(0, 1 - progress * 1.5))
      support.style.transform = `translate3d(0, ${(-progress * 34).toFixed(
        2
      )}px, 0)`
    }

    if (bloom) {
      const bx = hasPointer ? eased.x : window.innerWidth * 0.5
      const by = hasPointer ? eased.y : window.innerHeight * 0.35
      bloom.style.transform = `translate3d(${(bx - 320).toFixed(
        1
      )}px, ${(by - 320 + progress * -60).toFixed(1)}px, 0)`
    }

    if (grain) {
      grain.style.transform = `translate3d(${(progress * -40).toFixed(
        2
      )}px, ${(progress * -40).toFixed(2)}px, 0)`
    }

    if (visible) requestAnimationFrame(frame)
    else running = false
  }

  const play = () => {
    if (!motion || running) return
    running = true
    requestAnimationFrame(frame)
  }

  if (motion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) play()
      },
      { rootMargin: "20% 0px" }
    )
    observer.observe(root)
  } else if (motion) {
    play()
  }

  /* ---------------------------------------------------------------------
     Ticker. The travel distance is half the track, so the duration is
     derived from the measured width. That keeps the speed identical on
     every screen, whatever the type scales to, and keeps the loop seamless.
  --------------------------------------------------------------------- */
  const track = q<HTMLElement>(root, ".marquee-track")
  if (track) {
    const SPEED = 74 // pixels per second

    const syncDuration = () => {
      const distance = track.scrollWidth / 2
      if (!distance) return
      track.style.setProperty(
        "--marquee-duration",
        `${(distance / SPEED).toFixed(2)}s`
      )
    }

    syncDuration()
    window.addEventListener("resize", syncDuration, { passive: true })
    document.fonts?.ready.then(syncDuration).catch(() => {})

    if ("ResizeObserver" in window) {
      new ResizeObserver(syncDuration).observe(track)
    }
  }

  /* ---------------------------------------------------------------------
     Live local time — Karachi, PKT. Rendered wherever a [data-clock]
     element exists; skipped entirely if the hero has none.
  --------------------------------------------------------------------- */
  const clock = q<HTMLElement>(root, "[data-clock]")
  if (clock) {
    const tick = () => {
      clock.textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date())
    }
    tick()
    setInterval(tick, 1000)
  }
}
