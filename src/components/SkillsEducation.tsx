import { useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { education } from "../data/education";
import { skills, type Skill } from "../data/skills";
import { skillIcons } from "./skillIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { gsap, prefersReducedMotion } from "../lib/gsap";

/** Dark brand colours vanish on the navy background, so fall back to the text colour. */
function hoverColor(hex: string) {
  const n = parseInt(hex, 16);
  const luma = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return luma < 0.35 ? "#e7ecf3" : `#${hex}`;
}

function SkillTile({ skill }: { skill: Skill }) {
  const icon = skillIcons[skill.key];
  return (
    <li
      data-skill
      tabIndex={0}
      aria-label={skill.name}
      style={{ "--brand": hoverColor(icon.hex) } as CSSProperties}
      className="group relative flex h-14 w-14 items-center justify-center rounded-md border border-circuit-line bg-circuit-panel text-circuit-muted transition-colors duration-200 hover:border-(--brand) hover:text-(--brand) focus-visible:border-(--brand) focus-visible:text-(--brand)"
    >
      {icon.render(26)}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-sm border border-circuit-line bg-circuit-bg px-2 py-1 font-mono text-[10px] text-circuit-text opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {skill.name}
      </span>
    </li>
  );
}

export default function SkillsEducation() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  // Education: the trace draws across and the nodes pop on, once.
  useLayoutEffect(() => {
    const node = timelineRef.current;
    if (!node || prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const line = node.querySelector<HTMLElement>("[data-edu-line]");
      const dots = node.querySelectorAll<HTMLElement>("[data-node]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: node, start: "top 75%", once: true },
      });
      if (line) {
        tl.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power2.inOut", transformOrigin: "left center" },
          0
        );
      }
      tl.fromTo(
        dots,
        { scale: 0 },
        { scale: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.22 },
        0.05
      );
    }, node);
    return () => ctx.revert();
  }, []);

  // Skills: logos come in as a quick wave, once.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        grid.querySelectorAll("[data-skill]"),
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.025,
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        }
      );
    }, grid);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative overflow-hidden border-t border-circuit-line py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="// 06 — Firmware" title="Education & Skills" />
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <h3 className="trace-label mb-8 text-xs text-circuit-muted">Education</h3>
          </Reveal>

          {/* One trace through four stages; the university is the one that matters most. */}
          <ol
            ref={timelineRef}
            className="relative grid gap-0 md:grid-cols-[1fr_1fr_1fr_2fr] md:gap-8"
          >
            <div
              aria-hidden
              className="absolute left-0 right-0 top-1.75 hidden h-px bg-circuit-line md:block"
            >
              <div data-edu-line className="h-full w-full bg-circuit-copper-dim" />
            </div>

            {education.map((item, i) => {
              const current = i === education.length - 1;
              return (
                <li
                  key={item.title}
                  className="relative border-l border-circuit-copper-dim pb-8 pl-6 last:pb-0 md:border-l-0 md:pb-0 md:pl-0 md:pt-8"
                >
                  <span
                    data-node
                    className={`absolute -left-1.75 top-1 flex items-center justify-center rounded-full border-2 bg-circuit-bg md:left-0 md:top-0 ${
                      current
                        ? "h-4 w-4 border-circuit-led"
                        : "h-3.5 w-3.5 border-circuit-copper"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${current ? "led-dot bg-circuit-led" : "bg-circuit-copper"}`}
                    />
                  </span>

                  <div className={current ? "panel rounded-lg border-circuit-copper/50 p-4" : ""}>
                    <p className={`font-mono text-[10px] ${current ? "text-circuit-led" : "text-circuit-copper"}`}>
                      {item.years}
                    </p>
                    <h4
                      className={`mt-1 font-mono font-bold text-circuit-text ${current ? "text-base" : "text-sm"}`}
                    >
                      {item.title}
                    </h4>
                    {item.subtitle && (
                      <p className="mt-0.5 text-xs text-circuit-muted">{item.subtitle}</p>
                    )}
                    {current && item.note && (
                      <p className="mt-3 text-xs leading-relaxed text-circuit-muted">
                        {item.note}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-16">
          <Reveal>
            <h3 className="trace-label mb-6 text-xs text-circuit-muted">Toolkit</h3>
          </Reveal>
          <ul ref={gridRef} className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <SkillTile key={skill.key} skill={skill} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
