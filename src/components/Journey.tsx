import { Briefcase, Users } from "lucide-react";
import { experience, type ExperienceItem } from "../data/experience";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function Marker({ type }: { type: ExperienceItem["type"] }) {
  const isWork = type === "work";
  const Icon = isWork ? Briefcase : Users;
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-circuit-bg ${isWork ? "border-circuit-copper text-circuit-copper" : "border-circuit-led text-circuit-led"
        }`}
    >
      <Icon size={15} />
    </span>
  );
}

function Card({ item, align }: { item: ExperienceItem; align: "left" | "right" }) {
  const isWork = item.type === "work";
  return (
    <div className={`panel rounded-lg p-5 ${align === "right" ? "md:text-right" : "md:text-left"}`}>
      <div
        className={`flex items-center gap-2 font-mono text-[10px] ${align === "right" ? "md:justify-end" : "md:justify-start"
          } ${isWork ? "text-circuit-copper" : "text-circuit-led"}`}
      >
        <span className="rounded-sm border border-current px-1.5 py-0.5 tracking-widest">
          {isWork ? "WORK" : "ORG"}
        </span>
        <span>{item.period}</span>
      </div>
      <h3 className="mt-2 font-mono text-sm font-bold text-circuit-text sm:text-base">
        {item.role}
      </h3>
      <p className="mt-0.5 text-xs text-circuit-muted sm:text-sm">{item.org}</p>
      <p className="mt-2 text-xs leading-relaxed text-circuit-muted sm:text-sm">
        {item.description}
      </p>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="border-t border-circuit-line py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="// 04 — Trace Path" title="Experience & Organization" />
        </Reveal>

        {/* Desktop / tablet: zigzag path centered on a vertical copper trace */}
        <ol className="relative mt-14 hidden md:block">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-circuit-copper-dim" />
          <div className="space-y-14">
            {experience.map((item, i) => {
              const onRight = i % 2 === 0;
              return (
                <Reveal key={item.id} delay={i * 90}>
                  <li className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-6">
                    <div className={onRight ? "" : "col-start-1"}>
                      {!onRight && <Card item={item} align="right" />}
                    </div>

                    <div className="relative flex justify-center">
                      <Marker type={item.type} />
                    </div>

                    <div className={onRight ? "col-start-3" : ""}>
                      {onRight && <Card item={item} align="left" />}
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </div>
        </ol>

        {/* Mobile: single left-rail trace */}
        <ol className="relative mt-10 space-y-6 border-l border-circuit-copper-dim pl-6 md:hidden">
          {experience.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <li className="relative">
                <span
                  className={`absolute -left-7.75 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-circuit-bg ${item.type === "work"
                      ? "border-circuit-copper text-circuit-copper"
                      : "border-circuit-led text-circuit-led"
                    }`}
                >
                  {item.type === "work" ? <Briefcase size={11} /> : <Users size={11} />}
                </span>
                <Card item={item} align="left" />
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
