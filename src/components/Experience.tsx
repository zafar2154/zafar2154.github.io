import { useLayoutEffect, useRef, useState } from "react";
import { ExternalLink, MoveHorizontal, ScanLine } from "lucide-react";
import { projects, type Project } from "../data/projects";
import ProjectModal from "./ProjectModal";
import SectionHeading from "./SectionHeading";
import { useTilt } from "../hooks/useMicroInteractions";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { gsap, ScrollTrigger } from "../lib/gsap";

const pad = (n: number) => n.toString().padStart(2, "0");

function ProjectCard({
  project,
  index,
  onOpen,
  onFocusCard,
}: {
  project: Project;
  index: number;
  onOpen: (index: number, rect: DOMRect) => void;
  onFocusCard: (index: number, el: HTMLElement) => void;
}) {
  const tiltRef = useTilt<HTMLElement>({ max: 3, scale: 1.01, lift: 4 });
  const open = (el: HTMLElement) => onOpen(index, el.getBoundingClientRect());

  const story = [
    ["Problem", project.story.problem],
    ["Approach", project.story.approach],
    ["Outcome", project.story.outcome],
  ] as const;

  return (
    <article
      ref={tiltRef}
      role="button"
      tabIndex={0}
      onClick={(e) => open(e.currentTarget)}
      onFocus={(e) => onFocusCard(index, e.currentTarget)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(e.currentTarget);
        }
      }}
      className="panel flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg transition-colors hover:border-circuit-led/60 focus-visible:border-circuit-led/60 md:flex-row"
    >
      <div className="relative h-44 shrink-0 md:h-auto md:w-[42%]">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-linear-to-t from-circuit-bg/60 via-transparent to-transparent" />
        {project.badge && (
          <span className="absolute left-3 top-3 rounded-sm bg-circuit-amber px-2 py-1 font-mono text-[10px] font-bold text-circuit-bg shadow-sm">
            {project.badge}
          </span>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-circuit-line px-5 py-2">
          <span className="font-mono text-[10px] text-circuit-copper">
            MOD.{pad(index + 1)}
          </span>
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-circuit-led/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-circuit-amber/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-circuit-copper/70" />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-5 md:p-7">
          <h3 className="font-mono text-lg font-bold text-circuit-text md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 text-xs text-circuit-muted">{project.context}</p>

          <dl className="mt-5 grid grid-cols-[4.75rem_1fr] gap-x-4 gap-y-3">
            {story.map(([label, text]) => (
              <div key={label} className="contents">
                <dt className="font-mono text-[11px] leading-relaxed text-circuit-copper">
                  {label}
                </dt>
                <dd className="text-sm leading-relaxed text-circuit-muted">
                  {text}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-circuit-line px-2 py-0.5 font-mono text-[10px] text-circuit-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-circuit-line pt-4">
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
      </div>
    </article>
  );
}

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  // Desktop with motion allowed: the section pins and the track slides sideways
  // as the page scrolls. Everywhere else it is a native swipe/scroll-snap row.
  const pinned = useMediaQuery(
    "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
  );

  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const handleOpen = (index: number, rect: DOMRect) => {
    setOriginRect(rect);
    setActiveIndex(index);
  };

  useLayoutEffect(() => {
    if (!pinned) return;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const total = projects.length;
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) gsap.set(barRef.current, { scaleX: self.progress });
            if (headRef.current)
              gsap.set(headRef.current, { left: `${self.progress * 100}%` });
            if (counterRef.current) {
              const current = Math.round(self.progress * (total - 1)) + 1;
              counterRef.current.textContent = `${pad(current)} / ${pad(total)}`;
            }
          },
        },
      });
      triggerRef.current = tween.scrollTrigger ?? null;
    }, pin);

    // Web fonts change text height after first paint; re-measure once they load.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      triggerRef.current = null;
      ctx.revert();
    };
  }, [pinned]);

  // Keyboard users tabbing to an off-screen card: move the page scroll so the
  // track slides that card into view (the track itself has nothing to scroll).
  const handleFocusCard = (index: number, el: HTMLElement) => {
    const st = triggerRef.current;
    if (!pinned || !st) return;
    // Mouse clicks also focus the card; only keyboard focus should move the page.
    if (!el.matches(":focus-visible")) return;
    const rect = el.getBoundingClientRect();
    if (rect.left >= 0 && rect.right <= window.innerWidth) return;
    const fraction = projects.length > 1 ? index / (projects.length - 1) : 0;
    gsap.to(window, {
      scrollTo: st.start + fraction * (st.end - st.start),
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const edge = "max(1.25rem, calc((100vw - 72rem) / 2 + 2rem))";

  return (
    <section
      id="experience"
      className="relative border-t border-circuit-line bg-circuit-panel/30"
    >
      <div
        ref={pinRef}
        className={
          pinned
            ? "relative flex h-svh flex-col justify-center overflow-clip py-10"
            : "relative py-20 sm:py-28"
        }
      >
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <SectionHeading index="// 03 — Modules" title="Project Experience" />
        </div>

        <div className={pinned ? "mt-8" : "mt-10"}>
          <div
            ref={trackRef}
            className={
              pinned
                ? "flex w-max items-stretch gap-6 will-change-transform"
                : "flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
            }
            style={pinned ? { paddingInline: edge } : undefined}
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="w-[84vw] shrink-0 snap-center md:h-[clamp(400px,64vh,540px)] md:w-[min(88vw,920px)]"
              >
                <ProjectCard
                  project={project}
                  index={i}
                  onOpen={handleOpen}
                  onFocusCard={handleFocusCard}
                />
              </div>
            ))}
          </div>
        </div>

        {pinned ? (
          <div className="mx-auto mt-8 w-full max-w-6xl px-5 sm:px-8">
            <div className="flex items-center gap-4">
              <span
                ref={counterRef}
                className="font-mono text-[11px] text-circuit-copper"
              >
                {pad(1)} / {pad(projects.length)}
              </span>
              <div className="relative h-px flex-1 bg-circuit-line">
                <div
                  ref={barRef}
                  className="absolute inset-0 bg-circuit-copper"
                  style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
                />
                <span
                  ref={headRef}
                  className="led-dot absolute top-1/2 -ml-0.75 -mt-0.75 h-1.5 w-1.5 rounded-full bg-circuit-led"
                  style={{ left: 0 }}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-2 flex items-center gap-2 px-5 font-mono text-[11px] text-circuit-muted sm:px-8">
            <MoveHorizontal size={13} />
            Swipe to browse
          </p>
        )}
      </div>

      {activeIndex !== null && (
        <ProjectModal
          project={projects[activeIndex]}
          index={activeIndex}
          originRect={originRect}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}
