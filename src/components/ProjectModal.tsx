import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "../data/projects";

export default function ProjectModal({
  project,
  index,
  onClose,
}: {
  project: Project;
  index: number;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-up"
      style={{ animationDuration: "0.2s" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="grid-dots sm:w-[90%] h-[86%] sm:h-[80%] w-full overflow-hidden rounded-xl border border-circuit-copper/50 bg-circuit-panel copper-glow flex flex-col">
        <nav className="shrink-0 z-10 flex items-center justify-between border-b border-circuit-line bg-circuit-panel/95 px-5 py-3 backdrop-blur">
          <span className="font-mono text-[10px] tracking-widest text-circuit-copper">
            DATASHEET // MOD.{(index + 1).toString().padStart(2, "0")}
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-sm border border-circuit-line text-circuit-muted transition-colors hover:border-circuit-copper hover:text-circuit-copper"
          >
            <X size={14} />
          </button>
        </nav>

        <main className="min-h-0 flex-1 w-full flex flex-col md:flex-row">
          <section className="relative w-full md:w-1/2 h-1/2 md:h-full p-4 rounded-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover rounded-xl border border-emerald-500 bg-circuit-panel copper-glow"
            />
            {project.badge && (
              <span className="absolute left-4 top-4 rounded-sm bg-circuit-amber px-2 py-1 font-mono text-[10px] font-bold text-circuit-bg shadow-sm">
                {project.badge}
              </span>
            )}

          </section>

          <section className="min-h-0 w-full md:w-1/2 flex-1 md:flex-none md:h-full overflow-y-auto text-white p-6 sm:p-4 scrollbar-thumb-circuit-copper">
            <div>
              <h3
                id="project-modal-title"
                className="font-mono text-xl font-bold text-circuit-text"
              >
                {project.title}
              </h3>
              <div className="my-6 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-circuit-line px-2 py-0.5 font-mono text-[10px] text-circuit-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="trace-label mb-2 text-[10px] text-circuit-copper">
              // Overview
              </p>
              <p className="text-sm leading-relaxed text-circuit-muted">
                {project.description}
              </p>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div>
                <p className="trace-label mb-3 mt-6 text-[10px] text-circuit-copper">
                // Key Features
                </p>
                <ul className="space-y-1.5">
                  {project.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-circuit-muted">
                      <span className="mt-1.5 h-1 w-3 shrink-0 bg-circuit-led/70" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-circuit-line pt-5">
              <span className="font-mono text-[10px] text-circuit-muted">
                REF: {project.id.toUpperCase()}
              </span>
              {project.link !== "#" ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm bg-circuit-led px-4 py-2 font-mono text-xs font-bold text-circuit-bg transition-transform hover:-translate-y-0.5"
                >
                  View source
                  <ExternalLink size={13} />
                </a>
              ) : (
                <span className="font-mono text-[11px] text-circuit-muted">
                  Source not published yet
                </span>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
