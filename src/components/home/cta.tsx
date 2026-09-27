import claudeIcon from "@/assets/icons/claude.svg"
import chatgptIcon from "@/assets/icons/chatgpt.svg"
import grokIcon from "@/assets/icons/grok.svg"

const aiList = [
  {
    name: "ChatGPT",
    icon: chatgptIcon,
    // Optional: Pre-fill a query or simply link to the platform
    href: "https://chatgpt.com/?q=Explore%20https%3A%2F%2Fsyedumaircodes.vercel.app%2F%20and%20tell%20me%20about%20Syed%20Umair%20Ali.%20Give%20me%20a%20concise%2C%20useful%20overview%20of%20his%20background%2C%20technical%20strengths%2C%20projects%2C%20and%20the%20kinds%20of%20problems%20he%20can%20help%20solve.%20Focus%20on%20information%20that%20would%20help%20me%20understand%20whether%20his%20work%20is%20relevant%20to%20what%20I%E2%80%99m%20looking%20for.",
  },
  {
    name: "Claude",
    icon: claudeIcon,
    href: "https://claude.ai/new?q=Explore%20https%3A%2F%2Fsyedumaircodes.vercel.app%2F%20and%20tell%20me%20about%20Syed%20Umair%20Ali.%20Give%20me%20a%20concise%2C%20useful%20overview%20of%20his%20background%2C%20technical%20strengths%2C%20projects%2C%20and%20the%20kinds%20of%20problems%20he%20can%20help%20solve.%20Focus%20on%20information%20that%20would%20help%20me%20understand%20whether%20his%20work%20is%20relevant%20to%20what%20I%E2%80%99m%20looking%20for.",
  },
  {
    name: "Grok",
    icon: grokIcon,
    href: "https://grok.com/?q=Explore%20https%3A%2F%2Fsyedumaircodes.vercel.app%2F%20and%20tell%20me%20about%20Syed%20Umair%20Ali.%20Give%20me%20a%20concise%2C%20useful%20overview%20of%20his%20background%2C%20technical%20strengths%2C%20projects%2C%20and%20the%20kinds%20of%20problems%20he%20can%20help%20solve.%20Focus%20on%20information%20that%20would%20help%20me%20understand%20whether%20his%20work%20is%20relevant%20to%20what%20I%E2%80%99m%20looking%20for.",
  },
]

const CTA = () => {
  return (
    <section id="contact" className="w-full px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl space-y-16">
        {/* =========================================
            SECTION 1: Ask AI About Me
            ========================================= */}
        <div className="flex flex-col items-center text-center">
          <p className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Ask your favorite AI about me
          </p>

          <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
            Still curious about my background, skills, and work? Prompt your
            go-to AI model to get an unbiased summary.
          </p>

          {/* AI Icons Grid */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {aiList.map((ai) => (
              <a
                key={ai.name}
                href={ai.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Ask ${ai.name}`}
                className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3 shadow-sm transition-colors duration-200 hover:border-neutral-700 hover:bg-neutral-800 active:scale-95 sm:h-16 sm:w-16 sm:p-3.5"
              >
                <img
                  src={ai.icon}
                  alt={`${ai.name} icon`}
                  className="h-full w-full object-contain opacity-75 transition-opacity duration-200 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Optional Subtle Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-neutral-800/80" />
          <span className="absolute bg-background px-4 text-xs tracking-wider text-muted-foreground uppercase">
            Then
          </span>
        </div>

        {/* =========================================
            SECTION 2: Let's Build Together (Contact)
            ========================================= */}
        <div className="flex flex-col items-center text-center">
          <p className="font-heading text-2xl leading-tight font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Let’s build something together.
          </p>

          <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
            I’m always open to discussing new opportunities, technical
            challenges, or interesting products. Feel free to reach out.
          </p>

          {/* Centered Action Button */}
          <div className="mt-8">
            <a
              href="mailto:syedumairali.617@gmail.com"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-heading text-xs font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 active:scale-95"
            >
              <span>Let's Chat</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
