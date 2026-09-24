import { useLayoutEffect, useRef } from "react";
import { education, skillColumns } from "../data/education";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ParallaxDots from "./ParallaxDots";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function SkillsEducation() {
  const timelineRef = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    const node = timelineRef.current;
    if (!node || prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const dots = node.querySelectorAll<HTMLElement>("[data-node]");
      gsap.fromTo(
        dots,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          ease: "back.out(2)",
          stagger: 0.15,
          scrollTrigger: { trigger: node, start: "top 75%", once: true },
        }
      );
    }, node);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative overflow-hidden border-t border-circuit-line py-20 sm:py-28">
      <ParallaxDots speed={12} className="opacity-40" mask={false} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="// 06 — Firmware" title="Education & Skills" />
        </Reveal>

        <div className="mt-12 grid gap-14 md:grid-cols-2">
          {/* Timeline as a copper trace connecting solder-pad nodes */}
          <Reveal>
            <h3 className="trace-label mb-6 text-xs text-circuit-muted">
              Education timeline
            </h3>
            <ol ref={timelineRef} className="relative border-l border-circuit-copper-dim pl-6">
              {education.map((item, i) => (
                <li key={item.title} className="relative pb-10 last:pb-0">
                  <span
                    data-node
                    className="absolute -left-[27px] top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-circuit-copper bg-circuit-bg transition-transform duration-300 hover:scale-125"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-circuit-copper" />
                  </span>
                  <p className="font-mono text-[10px] text-circuit-copper">
                    {item.years}
                  </p>
                  <h4 className="mt-1 font-mono text-sm font-bold text-circuit-text">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="mt-0.5 text-xs text-circuit-muted">
                      {item.subtitle}
                    </p>
                  )}
                  {i === education.length - 1 && (
                    <p className="mt-3 max-w-sm text-xs leading-relaxed text-circuit-muted">
                      Currently completing the final year of my electrical
                      engineering degree, focused on IoT, embedded systems,
                      and control.
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Skills as two columns of IC-leg style badges */}
          <Reveal delay={150}>
            <h3 className="trace-label mb-6 text-xs text-circuit-muted">
              Toolkit
            </h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {skillColumns.map((col) => (
                <div key={col.heading}>
                  <p className="mb-3 text-xs font-semibold text-circuit-text">
                    {col.heading}
                  </p>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li
                        key={item}
                        className="group flex items-center gap-2 font-mono text-xs text-circuit-muted transition-colors hover:text-circuit-text"
                      >
                        <span className="h-1 w-3 shrink-0 bg-circuit-led/70 transition-all duration-300 group-hover:w-5 group-hover:bg-circuit-led" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
