import { motion, type Variants } from "motion/react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/shared/Footer"

const resourcesData = [
  {
    category: "Productivity Apps",
    items: [
      {
        name: "Todoist",
        description: "My main task management app, nothing comes close to this",
        link: "https://todoist.com",
      },
      {
        name: "Obsidian",
        description:
          "My favorite note taking app for everything from work, learning, and projects.",
        link: "https://obsidian.md",
      },
      {
        name: "Mailspring",
        description:
          "My preffered client for emails, the keyboard shortcuts are perfect",
        link: "https://www.getmailspring.com/",
      },
    ],
  },
  {
    category: "Development Apps",
    items: [
      {
        name: "VS Code",
        description:
          "My main editor. Stripped down with a minimal config that I made myself",
        link: "https://code.visualstudio.com/",
      },
      {
        name: "DB Pro",
        description:
          "My new choice for a database management app, the UI is amazing",
        link: "https://www.dbpro.app/",
      },
      {
        name: "Helium Browser",
        description:
          "Helium replaced chrome and brave for me, the perfect minimal browser",
        link: "https://helium.computer/",
      },
    ],
  },
  {
    category: "Courses & Reading",
    items: [],
  },
]

const Resources = () => {
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

  return (
    <>
      <div className="w-full px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Back to Home Link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="group inline-flex items-center font-sans text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-primary"
            >
              <ArrowLeft
                size={14}
                className="mr-2 transition-transform group-hover:-translate-x-1"
              />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 space-y-4"
          >
            <h1 className="font-heading text-5xl tracking-tight text-foreground italic md:text-7xl">
              Favorite Resources
            </h1>
            <p className="font-sans text-lg leading-relaxed font-light text-muted-foreground/90 md:text-xl">
              A curated list of the tools and literature I use to build and
              design software.
            </p>
          </motion.header>

          {/* Categories List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {resourcesData.map((section, idx) => (
              <motion.section
                key={idx}
                variants={itemVariants}
                className="space-y-6"
              >
                {/* Category Title */}
                <div className="flex items-center gap-4">
                  <h2 className="font-sans text-[11px] font-bold tracking-[0.2em] text-foreground uppercase">
                    {section.category}
                  </h2>
                </div>

                {/* Items in Category */}
                <div className="flex flex-col border-t border-border/40">
                  {section.items.map((item, itemIdx) => {
                    const ItemWrapper = item.link ? "a" : "div"
                    return (
                      <ItemWrapper
                        key={itemIdx}
                        href={item.link ? item.link : undefined}
                        target={item.link ? "_blank" : undefined}
                        rel={item.link ? "noreferrer" : undefined}
                        className={`group flex flex-col justify-between border-b border-border/40 py-5 transition-colors sm:flex-row sm:items-center ${
                          item.link ? "cursor-pointer hover:bg-muted/30" : ""
                        }`}
                      >
                        <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                          {/* Item Name */}
                          <span className="font-heading text-xl text-foreground italic transition-colors group-hover:text-primary sm:w-1/3">
                            {item.name}
                          </span>

                          {/* Item Description */}
                          <div className="mt-2 flex flex-1 items-center justify-between sm:mt-0">
                            <span className="font-sans text-sm font-light text-muted-foreground/80 sm:max-w-[90%]">
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </ItemWrapper>
                    )
                  })}
                </div>
              </motion.section>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Resources
