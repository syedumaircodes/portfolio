import { getLenis, initLenis, lockScroll, unlockScroll } from "./lenis"

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
  // The hero locks the scroll while it assembles, so the scroll instance has
  // to exist first. initLenis is idempotent.
  initLenis()

  const curtain = q<HTMLElement>(root, "[data-curtain]")
  const title = q<HTMLElement>(root, "[data-title]")
  const bloom = q<HTMLElement>(root, "[data-bloom]")
  const grain = q<HTMLElement>(root, "[data-grain]")
  const support = q<HTMLElement>(root, "[data-support]")

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

    /* -------------------------------------------------------------------
       Settle the reveal.

       Each word carries a clip-path, and both the clip and a `will-change`
       keep it promoted to its own compositing layer. Eleven permanently
       promoted text layers is real memory and real rasterisation work, for
       an effect that has already played.

       The animations are cancelled rather than left holding their final
       keyframe — a filled animation overrides inline styles and the
       stylesheet, so clearing the clip alone would not release the layer.
       Cancelling returns every element to its stylesheet state, which is
       the finished state, once `is-settled` lifts the word clips.
    ------------------------------------------------------------------- */
    const settle = () => {
      tl.forEach((animation) => {
        try {
          animation.cancel()
        } catch {
          /* already gone */
        }
      })
      root.classList.add("is-settled")
      curtain?.remove()
    }

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

    /* -------------------------------------------------------------------
       The page is frozen for the length of the reveal and released the
       moment the last beat lands. A visitor who tries to scroll in the
       meantime releases it immediately — nobody should feel stuck.
    ------------------------------------------------------------------- */
    lockScroll()

    const release = () => {
      unlockScroll()
      window.removeEventListener("wheel", release)
      window.removeEventListener("pointerdown", release)
      window.removeEventListener("keydown", release)
    }

    window.addEventListener("wheel", release, { passive: true, once: true })
    // pointerdown fires before click, so a tap on an in-page link during the
    // reveal unlocks the page and the click still lands.
    window.addEventListener("pointerdown", release, {
      passive: true,
      once: true,
    })
    window.addEventListener("keydown", release, { once: true })

    const last = tl[tl.length - 1]
    if (last) {
      last.finished.then(release).catch(release)
    }
    // Backstop, in case the animation never reports back.
    window.setTimeout(release, 3200)

    // Settle the reveal once it has played, and as a backstop if the tab was
    // backgrounded and the compositor never got to it.
    if (last) {
      last.finished.then(settle).catch(settle)
    }
    window.setTimeout(settle, 3600)
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
  let lastProgress = -1
  let lastBloomX = Number.NaN
  let lastBloomY = Number.NaN

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

  // The hero's height is read on every frame to work out the scroll
  // progress. Reading it live forces a synchronous layout, so it is cached
  // and only refreshed when the layout could have changed.
  let heroHeight = root.offsetHeight || window.innerHeight
  const measure = () => {
    heroHeight = root.offsetHeight || window.innerHeight
  }
  window.addEventListener("resize", measure, { passive: true })

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

    const progress = Math.min(1, Math.max(0, scroll / heroHeight))

    // Only touch the DOM when the values have actually moved. An idle
    // pointer should cost nothing.
    if (Math.abs(progress - lastProgress) > 0.0005) {
      lastProgress = progress
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
    }

    if (bloom) {
      const bx = hasPointer ? eased.x : window.innerWidth * 0.5
      const by = hasPointer ? eased.y : window.innerHeight * 0.35
      // The bloom is sized responsively, so centre it on its own box.
      const offset = bloom.offsetWidth / 2
      const x = bx - offset
      const y = by - offset + progress * -60
      // The bloom is a large painted surface; moving it costs a composite
      // every frame, so it only moves when it has actually moved.
      if (Math.abs(x - lastBloomX) > 0.5 || Math.abs(y - lastBloomY) > 0.5) {
        lastBloomX = x
        lastBloomY = y
        bloom.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
          1
        )}px, 0)`
      }
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
