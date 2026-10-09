const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full px-5 py-6 sm:px-6 sm:py-7">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] items-center gap-y-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-heading text-sm font-semibold tracking-[-0.02em] text-foreground">
            Syed Umair Ali
          </span>
          <span className="font-sans text-xs leading-5 text-muted-foreground">
            © {year} <span aria-hidden="true">·</span> Made in Karachi
          </span>
        </div>

        <nav
          aria-label="Social links"
          className="row-start-2 flex flex-wrap items-center gap-x-1 gap-y-1 pt-2 sm:col-start-2 sm:row-start-1 sm:justify-end sm:pt-0"
        >
          <a
            href="https://github.com/syedumaircodes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-sm px-2 font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/syedumaircodes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-sm px-2 font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            LinkedIn
          </a>
          <a
            href="https://substack.com/@syedumaircodes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-sm px-2 font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Substack
          </a>
          <a
            href="mailto:syedumairali.617@gmail.com"
            className="inline-flex min-h-11 items-center rounded-sm px-2 font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Email
          </a>
        </nav>

      </div>
    </footer>
  )
}

export default Footer
