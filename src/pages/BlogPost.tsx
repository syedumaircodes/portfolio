// src/pages/BlogPost.tsx
import { useParams, Link } from "react-router-dom"
import * as m from "motion/react-m"
import { ArrowLeft } from "lucide-react"
import SEO from "../components/shared/SEO"
import Footer from "../components/shared/Footer"

const mdxFiles = import.meta.glob("../content/*.mdx", { eager: true })

const BlogPost = () => {
  const { slug } = useParams()
  const fileKey = Object.keys(mdxFiles).find((key) =>
    key.includes(`${slug}.mdx`)
  )

  if (!fileKey) {
    return <div className="py-24 text-center">Post not found.</div>
  }

  const module: any = mdxFiles[fileKey]
  const meta = module.meta
  const PostContent = module.default

  // Create the exact URL for this post
  const postUrl = `https://syedumaircodes.vercel.app/blogs/${slug}`

  return (
    <>
      {/* 💥 Dynamic SEO Injection 💥 */}
      <SEO
        title={`${meta.title} | Syed Umair Ali`}
        description={meta.excerpt}
        url={postUrl}
        type="article"
        publishDate={meta.date}
      />

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          to="/blogs"
          className="mb-10 inline-flex items-center text-[10px] font-bold tracking-[0.2em] text-foreground uppercase"
        >
          <ArrowLeft size={14} className="mr-2" /> Back to Blogs
        </Link>

        <m.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 space-y-6"
        >
          <div className="flex items-center gap-3 font-sans text-[10px] tracking-widest text-foreground/90 uppercase">
            <span>{meta.date}</span>
          </div>

          <h1 className="font-heading text-4xl tracking-tight text-foreground italic md:text-6xl">
            {meta.title}
          </h1>
        </m.header>

        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose max-w-none prose-zinc dark:prose-invert prose-headings:font-heading prose-headings:font-normal prose-headings:tracking-tight prose-p:font-sans prose-p:leading-relaxed prose-p:font-light"
        >
          <PostContent />
        </m.div>
      </article>

      <Footer />
    </>
  )
}

export default BlogPost
