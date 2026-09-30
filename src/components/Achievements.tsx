import { BadgeCheck, Trophy } from "lucide-react";
import { achievements, type Achievement } from "../data/achievements";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useTilt } from "../hooks/useMicroInteractions";

function Badge({ item }: { item: Achievement }) {
  const isAward = item.type === "award";
  const Icon = isAward ? Trophy : BadgeCheck;
  const accent = isAward ? "text-circuit-amber" : "text-circuit-led";
  const border = isAward ? "border-circuit-amber/50" : "border-circuit-led/50";
  const tiltRef = useTilt<HTMLDivElement>({ max: 5, scale: 1.02, lift: 4 });

  return (
    <div ref={tiltRef} className={`panel flex h-full gap-4 rounded-lg border p-5 ${border}`}>
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 bg-circuit-bg ${border} ${accent}`}
      >
        <Icon size={18} />
      </span>
      <div>
        <div className={`flex items-center gap-2 font-mono text-[10px] ${accent}`}>
          <span className="rounded-sm border border-current px-1.5 py-0.5 tracking-widest">
            {isAward ? "AWARD" : "CERTIFICATION"}
          </span>
          <span className="text-circuit-muted">{item.year}</span>
        </div>
        <h3 className="mt-2 font-mono text-sm font-bold leading-snug text-circuit-text">
          {item.title}
        </h3>
        <p className="mt-0.5 text-xs text-circuit-muted">{item.issuer}</p>
        <p className="mt-2 text-xs leading-relaxed text-circuit-muted">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative overflow-hidden border-t border-circuit-line bg-circuit-panel/30 py-20 sm:py-28">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="// 05 — Badges" title="Achievements & Certifications" />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {achievements.map((item, i) => (
            <Reveal key={item.id} delay={i * 100} className="h-full">
              <Badge item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
