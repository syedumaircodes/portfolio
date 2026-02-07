import { Github, Mail, Linkedin } from "lucide-react";

const Header = () => {
  return (
    <header className="relative w-full min-h-[500px] flex flex-items-center justify-center font-sans bg-azure text-accent overflow-hidden py-16 px-6">
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        {/* Main Title */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          Software Engineer <span className="text-accent">|</span> Data
          Professional
        </h1>

        {/* Bio Section */}
        <div className="space-y-6">
          <p className="text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            I'm a software and devops engineer with a parallel career as a data
            professional. I combine domain knowledge with engineering experience
            to build software and data platforms and the large-scale systems
            that power them.
          </p>

          <p className="text-sm md:text-base font-medium">
            Interested in data, software or just tech in general? Let's talk.
          </p>
        </div>

        {/* Contact / Links */}
        <div className="flex flex-col items-center gap-3 pt-4 text-sm md:text-base">
          <a
            href="https://github.com/syedumaircodes"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 transition-colors hover:text-white"
          >
            <span className=" flex items-center gap-1.5">
              <Github size={16} /> GitHub:
            </span>
            <span>@syedumaircodes</span>
          </a>
          {/* Linkedin */}
          <a
            href="https://linkedin.com/in/syedumaircodes"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 transition-colors hover:text-white"
          >
            <span className=" flex items-center gap-1.5">
              <Linkedin size={16} /> LinkedIn:
            </span>
            <span>/in/syedumaircodes</span>
          </a>

          {/* Email Link */}
          <div className="flex items-center gap-2">
            <span className=" flex items-center gap-1.5">
              <Mail size={16} /> Email:
            </span>
            <a
              href="mailto:syedumairali.617@gmail.com"
              className=" hover:text-white transition-colors"
            >
              syedumairali.617@gmail.com
            </a>
          </div>
          <a
            href="https://docs.google.com/document/d/1OVvzftFMGC8erOxmHZBn3rTuVHZV4CGMgglPFt22OBA/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 transition-colors hover:text-white"
          >
            <span>View Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
