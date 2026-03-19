import React from "react";
import { Pen, BookOpen } from "lucide-react";
import { useWebHaptics } from "web-haptics/react";

interface ResourceItem {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
}

const resources: ResourceItem[] = [
  {
    title: "Study Resources",
    subtitle: "LINKS TO RESOURCES I USE",
    icon: <Pen size={18} className="text-neutral-200" />,
    href: "https://github.com/syedumaircodes/self-taught-developer",
  },
  {
    title: "Knowledge Base",
    subtitle: "TECHNICAL STUDY NOTES",
    icon: <BookOpen size={18} className="text-neutral-200" />,
    href: "https://github.com/syedumaircodes/second-brain",
  },
];

const Resources: React.FC = () => {
  const { trigger } = useWebHaptics();

  return (
    <section className="w-full py-4 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-[11px] font-bold tracking-[0.2em] text-neutral-100 uppercase mb-5">
          Resources
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => trigger("success")}
              target="_blank"
              className="group flex items-center gap-4 p-4 rounded-xl border border-neutral-800/60 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-neutral-700 transition-all duration-200"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-800/50 border border-neutral-700/50 group-hover:border-neutral-600 transition-colors">
                {item.icon}
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-neutral-100">
                  {item.title}
                </span>
                <span className="text-[10px] font-medium tracking-wider text-neutral-200 uppercase mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
