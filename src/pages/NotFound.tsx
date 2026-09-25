import { Link } from "react-router-dom"
import Footer from "../components/layout/Footer"

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      {/* Centered 404 Canvas */}
      <main className="flex flex-1 items-center justify-center px-6 py-20 sm:py-24 md:py-28">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex flex-col items-center text-center">
            {/* Premium, Confident Headline */}
            <h1 className="mt-4 font-heading text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Signal lost.
            </h1>

            {/* Editorial Copy */}
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
              You’ve reached an unmapped route. The resource you requested has
              either been relocated, archived, or never initialized.
            </p>

            {/* Centered Return Action */}
            <div className="mt-8 flex justify-center">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-heading text-xs font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 active:scale-95"
              >
                <span>Take me back</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Pinned Footer */}
      <Footer />
    </div>
  )
}

export default NotFound
