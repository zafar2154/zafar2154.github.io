import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import { Briefcase, Users } from "lucide-react";
import { experience, type ExperienceItem } from "../data/experience";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useTilt } from "../hooks/useMicroInteractions";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Drives one timeline. A dot rides the trace as the page scrolls; each item
 * lights up and its card slides in when the dot reaches that item's marker,
 * and reverses if you scroll back up. The dot sits at the middle of the
 * viewport, so it always marks the part you are reading.
 *
 * Expected markup inside `ref`: [data-fill], [data-dot], and per item a
 * [data-item] holding [data-marker], [data-card] and optionally [data-stub].
 */
function useTraceTimeline(ref: RefObject<HTMLDivElement | null>, query: string) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        run: `${query} and (prefers-reduced-motion: no-preference)`,
        still: `${query} and (prefers-reduced-motion: reduce)`,
      },
      (context) => {
        const items = gsap.utils.toArray<HTMLElement>("[data-item]", root);
        const fill = root.querySelector<HTMLElement>("[data-fill]");
        const dot = root.querySelector<HTMLElement>("[data-dot]");
        if (!fill || !dot) return;

        const markers = items.map(
          (el) => el.querySelector<HTMLElement>("[data-marker]")!
        );

        // Reduced motion: no travelling dot, everything shown as already reached.
        if (context.conditions?.still) {
          markers.forEach((m) => m.setAttribute("data-lit", "true"));
          gsap.set(fill, { scaleY: 1 });
          gsap.set(dot, { autoAlpha: 0 });
          return () => markers.forEach((m) => m.removeAttribute("data-lit"));
        }

        const parts = items.map((el, i) => {
          const card = el.querySelector<HTMLElement>("[data-card]")!;
          const stub = el.querySelector<HTMLElement>("[data-stub]");
          const side = el.dataset.side;
          // Cards start tucked toward the trace and slide out from it.
          const from = side === "left" ? 40 : side === "right" ? -40 : -24;
          gsap.set(card, { autoAlpha: 0, x: from });
          if (stub) {
            gsap.set(stub, {
              scaleX: 0,
              transformOrigin: side === "left" ? "right center" : "left center",
            });
          }

          const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          tl.to(card, { autoAlpha: 1, x: 0, duration: 0.6 }, 0.05);
          if (stub) tl.to(stub, { scaleX: 1, duration: 0.25 }, 0);
          tl.fromTo(
            markers[i],
            { scale: 1 },
            { scale: 1.2, duration: 0.18, yoyo: true, repeat: 1 },
            0
          );
          return { marker: markers[i], tl };
        });

        gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
        gsap.set(dot, { y: 0 });

        const dotTo = gsap.quickTo(dot, "y", { duration: 0.2, ease: "power2.out" });
        const fillTo = gsap.quickTo(fill, "scaleY", { duration: 0.2, ease: "power2.out" });

        let height = 1;
        let ys: number[] = [];
        const lit: boolean[] = parts.map(() => false);

        const measure = () => {
          const top = root.getBoundingClientRect().top;
          height = root.offsetHeight || 1;
          ys = markers.map((m) => {
            const r = m.getBoundingClientRect();
            return r.top + r.height / 2 - top;
          });
        };

        const render = (progress: number, instant: boolean) => {
          const y = progress * height;
          if (instant) {
            gsap.set(dot, { y });
            gsap.set(fill, { scaleY: progress });
          } else {
            dotTo(y);
            fillTo(progress);
          }
          parts.forEach((part, i) => {
            const on = y >= ys[i];
            if (on === lit[i]) return;
            lit[i] = on;
            part.marker.setAttribute("data-lit", String(on));
            if (instant) part.tl.progress(on ? 1 : 0);
            else if (on) part.tl.play();
            else part.tl.reverse();
          });
        };

        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 50%",
          end: "bottom 50%",
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            measure();
            render(self.progress, true);
          },
          onUpdate: (self) => render(self.progress, false),
        });
        measure();
        render(st.progress, true);

        return () => {
          st.kill();
          parts.forEach((p) => {
            p.tl.kill();
            p.marker.removeAttribute("data-lit");
          });
        };
      }
    );

    return () => mm.revert();
  }, [ref, query]);
}

function Card({ item, align }: { item: ExperienceItem; align: "left" | "right" }) {
  const isWork = item.type === "work";
  const tiltRef = useTilt<HTMLDivElement>({ max: 4, scale: 1.015, lift: 3 });
  return (
    <div
      ref={tiltRef}
      className={`panel rounded-lg p-5 transition-colors hover:border-circuit-led/50 ${align === "right" ? "md:text-right" : "md:text-left"}`}
    >
      <div
        className={`flex items-center gap-2 font-mono text-[10px] ${
          align === "right" ? "md:justify-end" : "md:justify-start"
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

/** The copper trace, its filled portion, and the travelling LED dot. */
function Trace({ railClass }: { railClass: string }) {
  return (
    <>
      <div aria-hidden className={`absolute top-0 h-full w-px bg-circuit-line ${railClass}`} />
      <div aria-hidden className={`absolute top-0 h-full w-px ${railClass}`}>
        <div data-fill className="h-full w-full bg-circuit-copper" />
      </div>
      <div aria-hidden className={`absolute top-0 z-0 h-0 w-0 ${railClass}`}>
        <span className="led-dot absolute -ml-1.75 -mt-1.75 block h-3.5 w-3.5 rounded-full bg-circuit-led" data-dot />
      </div>
    </>
  );
}

const litColor = (type: ExperienceItem["type"]) =>
  type === "work"
    ? "data-[lit=true]:border-circuit-copper data-[lit=true]:text-circuit-copper data-[lit=true]:shadow-[0_0_14px_-2px_rgba(201,129,77,0.6)]"
    : "data-[lit=true]:border-circuit-led data-[lit=true]:text-circuit-led data-[lit=true]:shadow-[0_0_14px_-2px_rgba(74,222,128,0.5)]";

export default function Journey() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useTraceTimeline(desktopRef, "(min-width: 768px)");
  useTraceTimeline(mobileRef, "(max-width: 767px)");

  return (
    <section id="journey" className="relative overflow-hidden border-t border-circuit-line py-20 sm:py-28">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="// 04 — Trace Path" title="Experience & Organization" />
        </Reveal>

        {/* Desktop / tablet: zigzag around a central trace */}
        <div ref={desktopRef} className="relative mt-14 hidden md:block">
          <Trace railClass="left-1/2 -translate-x-1/2" />
          <ol className="relative space-y-14">
            {experience.map((item, i) => {
              const onRight = i % 2 === 0;
              const Icon = item.type === "work" ? Briefcase : Users;
              return (
                <li
                  key={item.id}
                  data-item
                  data-side={onRight ? "right" : "left"}
                  className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-6"
                >
                  <div className="col-start-1">
                    {!onRight && (
                      <div data-card>
                        <Card item={item} align="right" />
                      </div>
                    )}
                  </div>

                  <span
                    data-marker
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-circuit-line bg-circuit-bg text-circuit-muted transition-colors duration-300 ${litColor(item.type)}`}
                  >
                    <Icon size={15} />
                  </span>

                  <div className="col-start-3">
                    {onRight && (
                      <div data-card>
                        <Card item={item} align="left" />
                      </div>
                    )}
                  </div>

                  <span
                    data-stub
                    aria-hidden
                    className="absolute top-1/2 h-px w-6 bg-circuit-copper-dim"
                    style={onRight ? { left: "calc(50% + 18px)" } : { right: "calc(50% + 18px)" }}
                  />
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile: single rail on the left */}
        <div ref={mobileRef} className="relative mt-10 pl-9 md:hidden">
          <Trace railClass="left-3" />
          <ol className="relative space-y-6">
            {experience.map((item) => {
              const Icon = item.type === "work" ? Briefcase : Users;
              return (
                <li key={item.id} data-item data-side="rail" className="relative">
                  <span
                    data-marker
                    className={`absolute -left-9 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-circuit-line bg-circuit-bg text-circuit-muted transition-colors duration-300 ${litColor(item.type)}`}
                  >
                    <Icon size={11} />
                  </span>
                  <span
                    data-stub
                    aria-hidden
                    className="absolute -left-3 top-7 h-px w-3 bg-circuit-copper-dim"
                  />
                  <div data-card>
                    <Card item={item} align="left" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
