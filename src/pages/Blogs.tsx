import * as m from "motion/react-m"
import { type Variants } from "motion/react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/shared/Footer"
import SEO from "@/components/shared/SEO"

// 1. Automatically fetch all MDX files
const mdxFiles = import.meta.glob("../content/*.mdx", { eager: true })

// 2. Map them into an array we can render
const blogs = Object.entries(mdxFiles).map(
  ([filepath, module]: [string, any]) => {
    const slug = filepath.split("/").pop()?.replace(".mdx", "")
    return {
      slug,
      ...module.meta, // Spreads title, date, readingTime, excerpt
    }
  }
)

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const Blogs = () => {
  return (
    <>
      <SEO
        title="Blogs and Articles | Syed Umair Ali"
        description="My thoughts on being a tech worker and personal life."
        url="https://syedumaircodes.vercel.app/blogs"
      />
      <div className="w-full px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Back to Home Link */}
          <m.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="group inline-flex items-center font-sans text-[10px] font-bold tracking-[0.2em] text-foreground uppercase"
            >
              <ArrowLeft
                size={14}
                className="mr-2 transition-transform group-hover:-translate-x-1"
              />
              Back to Home
            </Link>
          </m.div>

          <m.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 space-y-4"
          >
            <h1 className="font-heading text-5xl tracking-tight text-foreground italic md:text-7xl">
              Blogs & Articles
            </h1>
            <p className="font-sans text-lg leading-relaxed font-light text-foreground/80 md:text-xl">
              My thoughts on being a tech worker and personal life.
            </p>
          </m.header>

          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col border-t border-border"
          >
            {blogs.map((blog) => (
              <m.div
                key={blog.slug}
                variants={itemVariants}
                whileHover="hover"
                className="group relative border-b border-border transition-colors hover:bg-muted/30"
              >
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="flex flex-col gap-3 py-8 md:py-10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="px-3 font-sans text-[10px] font-bold tracking-[0.2em] text-foreground/80 uppercase transition-colors group-hover:text-primary">
                        {blog.date}
                      </span>
                    </div>
                    <m.div
                      variants={{ hover: { x: 2, y: -2, scale: 1.1 } }}
                      className="text-foreground/40 transition-colors group-hover:text-foreground"
                    ></m.div>
                  </div>
                  <h2 className="px-3 font-heading text-2xl tracking-tight text-foreground italic transition-transform duration-300 md:text-3xl">
                    {blog.title}
                  </h2>
                  <p className="max-w-2xl px-3 font-sans text-sm leading-relaxed font-light text-foreground/80 transition-transform duration-300 md:text-base">
                    {blog.excerpt}
                  </p>
                </Link>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Blogs
