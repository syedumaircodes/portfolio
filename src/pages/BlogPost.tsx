import { useParams, Link } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/shared/Footer"

const mdxFiles = import.meta.glob("../content/*.mdx", { eager: true })

const BlogPost = () => {
  const { slug } = useParams()

  // Find the file that matches the URL slug
  const fileKey = Object.keys(mdxFiles).find((key) =>
    key.includes(`${slug}.mdx`)
  )

  if (!fileKey) {
    return <div className="py-24 text-center">Post not found.</div>
  }

  const module: any = mdxFiles[fileKey]
  const meta = module.meta
  const PostContent = module.default // MDX compiles the content into a default React component

  return (
    <>
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          to="/blogs"
          className="mb-10 inline-flex items-center text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} className="mr-2" /> Back to Blogs
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 space-y-6"
        >
          <div className="flex items-center gap-3 font-sans text-[11px] tracking-widest text-muted-foreground/60 uppercase">
            <span>{meta.date}</span>
          </div>

          <h1 className="font-heading text-4xl tracking-tight text-foreground italic md:text-6xl">
            {meta.title}
          </h1>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose max-w-none prose-zinc dark:prose-invert prose-headings:font-heading prose-headings:font-normal prose-headings:tracking-tight prose-p:font-sans prose-p:leading-relaxed prose-p:font-light"
        >
          <PostContent />
        </motion.div>
      </article>
      <Footer />
    </>
  )
}

export default BlogPost
