import claudeIcon from "@/assets/icons/claude.svg"
import chatgptIcon from "@/assets/icons/chatgpt.svg"
import grokIcon from "@/assets/icons/grok.svg"
import { IconArrowUpRight } from "@tabler/icons-react"

const aiList = [
  {
    name: "ChatGPT",
    icon: chatgptIcon,
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
    <section
      id="contact"
      className="w-full px-5 pt-16 pb-14 sm:px-6 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20"
    >
      <div className="mx-auto max-w-5xl pt-9 sm:pt-11">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <h2 className="font-heading text-2xl leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-foreground sm:text-3xl">
              Ask your favorite AI about me
            </h2>
            <p className="mt-4 max-w-lg font-sans text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Still curious about my background, skills, and work? Prompt your
              go-to AI model to get an unbiased summary.
            </p>
            <nav
              aria-label="Ask an AI about Umair"
              className="mt-6 flex flex-wrap gap-x-2 gap-y-2"
            >
              {aiList.map((ai) => (
                <a
                  key={ai.name}
                  href={ai.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ask ${ai.name} about Syed Umair Ali`}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-sans text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <img
                    src={ai.icon}
                    alt=""
                    className="size-[18px] object-contain opacity-75 transition-opacity duration-200 group-hover:opacity-100"
                  />
                  {ai.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:border-l md:border-border md:pl-10 lg:pl-12">
            <h2 className="font-heading text-2xl leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-foreground sm:text-3xl">
              Let’s build something together.
            </h2>
            <p className="mt-4 max-w-lg font-sans text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              I’m always open to discussing new opportunities, technical
              challenges, or interesting products. Feel free to reach out.
            </p>
            <a
              href="mailto:syedumairali.617@gmail.com"
              className="group mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-6 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Let’s Chat
              <IconArrowUpRight
                size={17}
                stroke={1.8}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
