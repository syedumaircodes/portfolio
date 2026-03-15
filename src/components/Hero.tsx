import React from "react";
import { Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";
import ProfileImage from "../assets/profile.webp";
import ProfileResume from "../assets/SyedUmairAli_Resume.pdf";

interface HeroProps {
  name?: string;
  role?: string;
  description?: string;
  imageUrl?: string;
}

const Hero: React.FC<HeroProps> = ({
  name = "Syed Umair Ali",
  role = "Software and Data Engineer",
  description = "Full-Stack Engineer building fast, reliable, and scalable systems. Proficient in Python, FastAPI, Next.js, and GCP, with hands-on experience shipping production-grade applications.",
  imageUrl = ProfileImage,
}) => {
  return (
    <section className="w-full text-white py-8 px-6 md:py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="flex items-center gap-4 md:gap-6">
          <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
            <img
              src={imageUrl}
              alt={`${name} profile picture`}
              className="rounded-full object-cover w-full h-full grayscale"
              loading="eager"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              {name}
            </h1>
            <h2 className="text-zinc-400 text-sm md:text-lg font-medium">
              {role}
            </h2>
          </div>
        </header>

        {/* Description Section */}
        <article className="max-w-2xl">
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            {description}
          </p>
        </article>

        {/* Footer Section: Links and Call to Action */}
        <footer className="flex  flex-wrap items-center justify-between gap-6 pt-4 border-t border-transparent">
          {/* Social / Contact Icons */}
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/syedumaircodes"
              target="_blank"
              aria-label="Follw me on Linkedin"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/syedumaircodes"
              aria-label="Check my Github"
              target="_blank"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:syedumairali.617@gmail.com"
              aria-label="email me"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Action Button */}
          <a
            href={ProfileResume}
            download
            target="_blank"
            className="group flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 transition-all active:scale-95"
          >
            Resume
            <ArrowUpRight
              size={16}
              className="text-zinc-500 group-hover:text-white transition-colors"
            />
          </a>
        </footer>
      </div>
    </section>
  );
};

export default Hero;
