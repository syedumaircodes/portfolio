import React from "react";

interface FooterProps {
  name?: string;
}

const Footer: React.FC<FooterProps> = ({ name = "Syed Umair Ali" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full  px-6 pb-8">
      <div className="max-w-3xl mx-auto">
        {/* Top Border/Separator */}
        <div className="w-full h-px bg-zinc-800/60 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Status Indicator Area */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              {/* Pinging effect for the "Live" feel */}
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] md:text-xs font-mono tracking-[0.15em] text-zinc-400 uppercase">
              All Systems Normal
            </span>
          </div>

          {/* Copyright Area */}
          <div className="text-[10px] md:text-xs font-medium text-zinc-500 tracking-tight">
            <span>
              &copy; {currentYear} {name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
