import { useLayoutEffect, useRef } from "react";
import { BadgeCheck, GraduationCap, Trophy } from "lucide-react";
import { achievements, type Achievement } from "../data/achievements";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useTilt } from "../hooks/useMicroInteractions";
import { gsap, prefersReducedMotion } from "../lib/gsap";

const kinds = {
  award: { label: "AWARD", Icon: Trophy, accent: "text-circuit-amber", border: "border-circuit-amber/50" },
  certification: { label: "CERTIFICATION", Icon: BadgeCheck, accent: "text-circuit-led", border: "border-circuit-led/50" },
  thesis: { label: "THESIS", Icon: GraduationCap, accent: "text-circuit-copper", border: "border-circuit-copper/50" },
} as const;

/**
 * The headline achievement. It lands once as it scrolls into view, like a
 * stamp pressed onto the page, and its indicator LED flickers on.
 */
function Featured({ item }: { item: Achievement }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const ledRef = useRef<HTMLSpanElement>(null);
  const { label, Icon, accent } = kinds[item.type];

  useLayoutEffect(() => {
    const card = cardRef.current;
    const led = ledRef.current;
    if (!card || !led || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(led, { opacity: 0.15 });
      gsap
        .timeline({ scrollTrigger: { trigger: card, start: "top 80%", once: true } })
        .fromTo(
          card,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "power3.in" }
        )
        .to(led, { opacity: 1, duration: 0.12, repeat: 4, yoyo: true });
    }, card);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="panel relative flex h-full min-h-105 overflow-hidden rounded-lg border border-circuit-amber/50"
    >
      {item.image && (
        <img
          src={item.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-circuit-bg via-circuit-bg/75 to-circuit-bg/10" />
      <span
        ref={ledRef}
        aria-hidden
        className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-circuit-amber shadow-[0_0_8px_2px_rgba(242,169,59,0.7)]"
      />

      <div className="relative mt-auto p-6 sm:p-8">
        <div className={`flex items-center gap-2 font-mono text-[10px] ${accent}`}>
          <Icon size={14} />
          <span className="rounded-sm border border-current px-1.5 py-0.5 tracking-widest">
            {label}
          </span>
          <span className="text-circuit-muted">{item.year}</span>
        </div>
        <h3 className="mt-3 font-mono text-xl font-bold leading-snug text-circuit-text sm:text-2xl">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-circuit-muted">{item.issuer}</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-circuit-text/80">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function Badge({ item }: { item: Achievement }) {
  const { label, Icon, accent, border } = kinds[item.type];
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
            {label}
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
  const featured = achievements.find((a) => a.featured);
  const rest = achievements.filter((a) => a !== featured);

  return (
    <section id="achievements" className="relative overflow-hidden border-t border-circuit-line bg-circuit-panel/30 py-20 sm:py-28">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="// 05 — Badges" title="Achievements & Certifications" />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {featured && (
            <div className="lg:col-span-3">
              <Featured item={featured} />
            </div>
          )}
          <div className={`flex flex-col gap-6 ${featured ? "lg:col-span-2" : "lg:col-span-5"}`}>
            {rest.map((item, i) => (
              <Reveal key={item.id} delay={i * 100} className="flex-1">
                <Badge item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
