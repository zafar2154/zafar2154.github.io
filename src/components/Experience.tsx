import { useState } from "react";
import { ExternalLink, ScanLine } from "lucide-react";
import { projects } from "../data/projects";
import ProjectModal from "./ProjectModal";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="border-t border-circuit-line bg-circuit-panel/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="// 03 — Modules" title="Project Experience" />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 100} className="h-full">
              <article
                role="button"
                tabIndex={0}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(i);
                  }
                }}
                className="panel flex h-full cursor-pointer flex-col overflow-hidden rounded-lg transition-all hover:-translate-y-1 hover:border-circuit-led/60 focus-visible:-translate-y-1 focus-visible:border-circuit-led/60"
              >
                <div className="flex items-center justify-between border-b border-circuit-line px-4 py-2">
                  <span className="font-mono text-[10px] text-circuit-copper">
                    MOD.{(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-circuit-led/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-circuit-amber/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-circuit-copper/70" />
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  {project.badge && (
                    <span className="absolute left-3 top-3 rounded-sm bg-circuit-amber px-2 py-1 font-mono text-[10px] font-bold text-circuit-bg shadow-sm">
                      {project.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-mono text-base font-bold text-circuit-text">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-circuit-muted">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm border border-circuit-line px-2 py-0.5 font-mono text-[10px] text-circuit-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-circuit-line pt-4">
                    {project.link !== "#" ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-circuit-led hover:underline"
                      >
                        View source
                        <ExternalLink size={13} />
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] text-circuit-muted">
                        Source not published
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-circuit-muted">
                      <ScanLine size={12} />
                      Details
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <ProjectModal
          project={projects[activeIndex]}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}
