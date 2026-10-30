import { ArrowDown, Mail } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { profile } from "../data/profile";
import { desktopIntro, mobileIntro, setupParallax, setupImageHover } from "../animations/hero";
import { gsap, gsapScrollTo } from "../lib/gsap";
import { useMagnetic, useTilt } from "../hooks/useMicroInteractions";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TypewriterGSAP from "../animations/typewriter";

type PinData = { id: string; label: string };

const leftPins: PinData[] = [
  { id: "01", label: profile.name },
  { id: "02", label: profile.role },
  { id: "03", label: profile.location },
];

const rightPins: PinData[] = [
  { id: "04", label: profile.focus.join(", ") },
  { id: "05", label: profile.email },
  { id: "06", label: profile.status },
];

/** One IC pin: label, lead line and solder dot, with the dot facing the chip. */
function Pin({
  pin,
  side,
  className = "",
  labelClassName = "max-w-44",
}: {
  pin: PinData;
  side: "left" | "right";
  className?: string;
  labelClassName?: string;
}) {
  const label = (
    <div className="min-w-0 leading-tight">
      <div className="font-mono text-[10px] text-circuit-copper">PIN {pin.id}</div>
      <div className={`wrap-anywhere text-xs text-circuit-muted ${labelClassName}`}>
        {pin.label}
      </div>
    </div>
  );
  const line = <div className="h-px w-6 shrink-0 bg-circuit-copper-dim sm:w-8 lg:w-4 xl:w-8" />;
  const dot = <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-circuit-copper" />;

  return side === "left" ? (
    <div className={`flex items-center justify-end gap-2 text-right ${className}`}>
      {label}
      {line}
      {dot}
    </div>
  ) : (
    <div className={`flex items-center gap-2 ${className}`}>
      {dot}
      {line}
      {label}
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useTilt<HTMLDivElement>({ max: 2.5, scale: 1.02, lift: 0 });
  const contactBtnRef = useMagnetic<HTMLButtonElement>(0.15);
  const projectsBtnRef = useMagnetic<HTMLButtonElement>(0.15);

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // reduce motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".hero-label",
            ".hero-title",
            ".hero-focus",
            ".hero-intro",
            ".hero-button",
            ".hero-status",
            ".hero-visual-container",
            ".hero-visual-stage",
            ".hero-card-pin",
            ".hero-card-intro",
            ".hero-card-breathe",
            ".hero-card",
            ".hero-left-pin",
            ".hero-right-pin",
            ".hero-end-left-pins",
            ".hero-end-right-pins",
            ".about-section",
            ".about-inner",
          ],
          {
            clearProps: "all",
          },
        );
      });

      // desktop — the two-column layout starts at lg, so the pinned About
      // story only runs there; tablets get the same flow as phones.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          desktopIntro();

          setupParallax(heroRef.current!);

          return setupImageHover(cardRef.current!);
        },
      );

      // mobile + tablet
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          mobileIntro();
        },
      );

      return () => {
        mm.revert();
      };
    }, heroRef);

    return () => ctx.revert();
  }, [cardRef]);

  return (
    <section ref={heroRef} id="home" className="hero-section relative">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 py-26 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start lg:gap-10 lg:px-10">
        {/* On tall screens the hero text and the card both centre on the viewport.
            The card pins at viewport centre, so if it started higher than that
            the pin would fire on load and drop it away from its pins. */}
        <div className="lg:col-start-1 lg:row-start-1 lg:flex lg:min-h-[calc(100svh-22.5rem)] lg:flex-col lg:justify-center">
          <p className="hero-label trace-label text-xs text-circuit-copper">
            // S1 — Electrical Engineering
          </p>
          <h1 className="hero-title mt-4 overflow-hidden font-mono text-4xl font-extrabold leading-tight tracking-tight text-circuit-text sm:text-5xl">
            <span className="hero-title-line block">
              {profile.name.split(" ").slice(0, 2).join(" ")}
            </span>

            <span className="hero-title-line block">
              {profile.name.split(" ").slice(2).join(" ")}
            </span>
          </h1>
          <div className="hero-focus trace-label mt-4 text-sm text-circuit-led">
            <TypewriterGSAP
              words={profile.focus}
              typeSpeed={0.08}
              deleteSpeed={0.04}
              delayBetween={1}
            />
          </div>
          <p className="hero-intro mt-5 max-w-xl text-sm leading-relaxed text-circuit-muted sm:text-base">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              ref={contactBtnRef}
              onClick={() => gsapScrollTo("contact")}
              className="hero-button inline-flex items-center gap-2 rounded-sm bg-circuit-led px-5 py-2.5 font-mono text-xs font-bold tracking-wide text-circuit-bg will-change-transform"
            >
              <Mail size={14} />
              Get in touch
            </button>

            <button
              ref={projectsBtnRef}
              onClick={() => gsapScrollTo("projects")}
              className="hero-button inline-flex items-center gap-2 rounded-sm border border-circuit-copper/60 px-5 py-2.5 font-mono text-xs font-bold tracking-wide text-circuit-copper will-change-transform"
            >
              View projects
              <ArrowDown size={14} />
            </button>
          </div>

          <div className="hero-status mt-8 flex items-center gap-2 font-mono text-[11px] text-circuit-muted">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-circuit-led" />
            STATUS: {profile.status}
          </div>
        </div>

        <div className="hero-visual-container lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <div className="hero-visual-stage grid items-center gap-1 pt-15 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:min-h-[calc(100svh-26rem)]">
            {/* LEFT PINS */}
            <div className="hero-left-pins hidden flex-col justify-around gap-6 py-4 sm:flex">
              {leftPins.map((pin) => (
                <Pin key={pin.id} pin={pin} side="left" className="hero-left-pin" />
              ))}
            </div>

            {/* LAYER 1 — hanya ScrollTrigger (pin) yang boleh menyentuh elemen ini */}
            <div className="hero-card-pin">
              {/* LAYER 2 — hanya intro animation */}
              <div className="hero-card-intro relative">
                {/* END LEFT PINS — appear at card's end-pin position */}
                <div className="hero-end-left-pins pointer-events-none absolute right-full w-max top-1/2 hidden -translate-y-1/2 flex-col justify-around gap-6 py-4 pr-1 opacity-0 sm:flex">
                  {leftPins.map((pin) => (
                    <Pin
                      key={pin.id}
                      pin={pin}
                      side="left"
                      labelClassName="max-w-24 xl:max-w-36"
                    />
                  ))}
                </div>

                {/* LAYER 3 — hanya breathing */}
                <div className="hero-card-breathe">
                  {/* LAYER 4 — hanya hover tilt */}
                  <div
                    ref={cardRef}
                    className="hero-card relative mx-auto w-64 shrink-0 rounded-xl border border-circuit-line bg-circuit-panel p-3 copper-glow will-change-transform sm:w-72 lg:w-60 xl:w-72"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-circuit-line/80 isolate">
                      <img
                        src={profile.photo}
                        alt={profile.name}
                        className="hero-image absolute inset-0 h-full w-full object-cover contrast-110 saturate-75 will-change-transform"
                      />
                      <img
                        src={profile.photoSecondary || profile.photo}
                        alt=""
                        className="hero-image-secondary absolute inset-0 h-full w-full object-cover contrast-125 saturate-100 opacity-0 will-change-transform"
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[10px] text-circuit-muted">
                      <span className="truncate">IC: {profile.name}</span>

                      <span className="shrink-0">GPA: {profile.gpa}</span>
                    </div>
                  </div>
                </div>

                {/* END RIGHT PINS — appear at card's end-pin position */}
                <div className="hero-end-right-pins pointer-events-none absolute left-full w-max top-1/2 hidden -translate-y-1/2 flex-col justify-around gap-6 py-4 pl-1 opacity-0 sm:flex">
                  {rightPins.map((pin) => (
                    <Pin
                      key={pin.id}
                      pin={pin}
                      side="right"
                      labelClassName="max-w-24 xl:max-w-36"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT PINS */}
            <div className="hero-right-pins hidden flex-col justify-around gap-6 py-4 sm:flex">
              {rightPins.map((pin) => (
                <Pin key={pin.id} pin={pin} side="right" className="hero-right-pin" />
              ))}
            </div>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-2 font-mono text-xs sm:hidden">
            {[...leftPins, ...rightPins].map((pin) => (
              <div
                key={pin.id}
                className="flex items-center justify-between border-b border-circuit-line/70 py-1.5"
              >
                <dt className="text-circuit-copper">PIN {pin.id}</dt>

                <dd className="max-w-[70%] text-right text-circuit-muted">
                  {pin.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* about */}
        <div className="lg:col-start-1 lg:row-start-2">
          <section id="about" className="about-section py-20 sm:py-28">
            <div className="about-inner mx-auto max-w-full">
              <Reveal>
                <SectionHeading index="// 02 — Register" title="About Me" />
              </Reveal>

              <div>
                {profile.about.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 120}>
                    <div className="panel h-full rounded-lg p-6">
                      <p className="font-mono text-[10px] text-circuit-copper">
                        0x{(i + 1).toString().padStart(2, "0")}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-circuit-muted sm:text-base">
                        {paragraph}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
