import React from "react"
import { motion, type Variants } from "motion/react"

import { PenToolIcon } from "../ui/pen-tool"
import { BookTextIcon } from "../ui/book-text"

interface ResourceItem {
  title: string
  subtitle: string
  icon: React.ReactNode
  href: string
}

const resources: ResourceItem[] = [
  {
    title: "My Resources",
    subtitle: "Resources I use everyday",
    icon: <BookTextIcon />,
    href: "/resources",
  },
  {
    title: "Blogs & Articles",
    subtitle: "Ramblings and Experiences",
    icon: <PenToolIcon />,
    href: "/blogs",
  },
]

const Resources: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section className="w-full px-6 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Section Label: Matches the 'Role' style in Hero */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 font-sans text-[11px] font-bold tracking-[0.2em] text-muted-foreground/70 uppercase"
        >
          Resources
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {resources.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 transition-colors hover:bg-secondary/50"
            >
              {/* Icon Container with Sera-style subtle border */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
                {item.icon}
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <span className="font-heading text-xl tracking-tight text-foreground italic">
                  {item.title}
                </span>
                <span className="font-sans text-[10px] font-medium tracking-wider text-muted-foreground/80 uppercase">
                  {item.subtitle}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Resources
