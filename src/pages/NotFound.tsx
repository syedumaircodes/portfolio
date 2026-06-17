// src/pages/NotFound.tsx
import * as m from "motion/react-m"
import { Link } from "react-router-dom"
import { IconArrowLeft } from "@tabler/icons-react"

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center px-6">
      <div className="w-full max-w-3xl text-center md:text-left">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="space-y-6"
        >
          {/* Subtle Metadata Label */}
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
              Error 404
            </span>
          </div>

          {/* Large Editorial Heading */}
          <h1 className="font-heading text-6xl tracking-tight text-foreground italic md:text-8xl md:leading-tight">
            Lost in <br className="hidden md:block" />
            the void.
          </h1>

          {/* Description */}
          <p className="mx-auto max-w-md font-sans text-lg leading-relaxed font-light text-muted-foreground/90 md:mx-0 md:text-xl">
            The page or document you are looking for has been moved, deleted, or
            never existed in the first place.
          </p>

          {/* Back Action */}
          <div className="pt-8">
            <Link
              to="/"
              className="group inline-flex items-center rounded-full bg-primary px-8 py-3 font-sans text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
            >
              <IconArrowLeft
                size={16}
                className="mr-2 transition-transform duration-300 group-hover:-translate-x-1"
              />
              Return to Home
            </Link>
          </div>
        </m.div>
      </div>
    </div>
  )
}

export default NotFound
