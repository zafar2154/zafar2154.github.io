import { ArrowDown, Mail } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../data/profile";
import {
  desktopIntro,
  mobileIntro,
  setupParallax,
  setupImageHover,
  handleCardMove,
  handleCardLeave,
  magneticButton,
  resetMagneticButton,
} from "../animations/hero";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TypewriterGSAP from "../animations/typewriter";

gsap.registerPlugin(ScrollTrigger);

const leftPins = [
  { id: "01", label: profile.name },
  { id: "02", label: profile.role },
  { id: "03", label: profile.location },
];

const rightPins = [
  { id: "04", label: profile.focus },
  { id: "05", label: profile.email },
  { id: "06", label: profile.status },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
  });
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!heroRef.current || !backgroundRef.current) return;

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
            ".hero-card-intro",
            ".hero-card",
            ".hero-left-pin",
            ".hero-right-pin",
            ".hero-end-left-pins",
            ".hero-end-right-pins",
            ".about-section"
          ],
          {
            clearProps: "all",
          }
        );
      });

      // desktop
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          desktopIntro();

          setupParallax({
            hero: heroRef.current!,
            background: backgroundRef.current!,
          });

          return setupImageHover(cardRef.current!);
        });

      // mobile
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          mobileIntro();
        }
      );

      return () => {
        mm.revert();
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-section relative"
    >
      <div
        ref={backgroundRef}
        className="pointer-events-none absolute inset-0 grid-dots opacity-70"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />

      <div className="mx-auto grid w-full gap-14 px-5 py-26 sm:px-50 sm:py-28 lg:grid-cols-2 lg:items-start">
        <div className="lg:col-start-1 lg:row-start-1">
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
              onClick={() => scrollTo("contact")}
              onMouseMove={(e) =>
                magneticButton(e.currentTarget, e)
              }
              onMouseLeave={(e) =>
                resetMagneticButton(e.currentTarget)
              }
              className="hero-button inline-flex items-center gap-2 rounded-sm bg-circuit-led px-5 py-2.5 font-mono text-xs font-bold tracking-wide text-circuit-bg will-change-transform"
            >
              <Mail size={14} />
              Get in touch
            </button>

            <button
              onClick={() => scrollTo("experience")}
              onMouseMove={(e) =>
                magneticButton(e.currentTarget, e)
              }
              onMouseLeave={(e) =>
                resetMagneticButton(e.currentTarget)
              }
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
          <div className="hero-visual-stage grid items-center gap-1 sm:grid-cols-[1fr_auto_1fr] pt-15">
            {/* LEFT PINS */}

            <div className="hero-left-pins hidden flex-col justify-around gap-6 py-4 sm:flex">
              {leftPins.map((pin) => (
                <div
                  key={pin.id}
                  className="hero-left-pin flex items-center justify-end gap-2 text-right"
                >
                  <div className="leading-tight">
                    <div className="font-mono text-[10px] text-circuit-copper">
                      PIN {pin.id}
                    </div>

                    <div className="max-w-44 text-xs text-circuit-muted">
                      {pin.label}
                    </div>
                  </div>

                  <div className="h-px w-6 bg-circuit-copper-dim sm:w-8" />

                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-circuit-copper" />
                </div>
              ))}
            </div>
            <div className="hero-card-intro relative">
              {/* END LEFT PINS — appear at card's end-pin position */}
              <div className="hero-end-left-pins pointer-events-none absolute right-full top-1/2 -translate-y-1/2 hidden flex-col justify-around gap-6 py-4 pr-1 sm:flex opacity-0">
                {leftPins.map((pin) => (
                  <div
                    key={`end-${pin.id}`}
                    className="flex items-center justify-end gap-2 text-right"
                  >
                    <div className="leading-tight">
                      <div className="font-mono text-[10px] text-circuit-copper">
                        PIN {pin.id}
                      </div>
                      <div className="max-w-44 text-xs text-circuit-muted">
                        {pin.label}
                      </div>
                    </div>
                    <div className="h-px w-6 bg-circuit-copper-dim sm:w-8" />
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-circuit-copper" />
                  </div>
                ))}
              </div>

              <div
                ref={cardRef}
                onMouseMove={(e) => {
                  if (cardRef.current) {
                    handleCardMove(cardRef.current, e);
                  }
                }}
                onMouseLeave={() => {
                  if (cardRef.current) {
                    handleCardLeave(cardRef.current);
                  }
                }}
                className="hero-card relative mx-auto w-64 shrink-0 rounded-xl border border-circuit-line bg-circuit-panel p-3 copper-glow will-change-transform sm:w-72"
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
                  <img src={profile.photoSecondary || profile.photo} // Ganti dengan path foto kedua kamu
                    alt={`${profile.name} secondary`}
                    className="hero-image-secondary absolute inset-0 h-full w-full object-cover contrast-125 saturate-100 opacity-0 will-change-transform" />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[10px] text-circuit-muted">
                  <span className="truncate">
                    IC: Zahid Faqih Alim Rabbani
                  </span>

                  <span className="shrink-0">
                    GPA: 3.74
                  </span>
                </div>
              </div>

              {/* END RIGHT PINS — appear at card's end-pin position */}
              <div className="hero-end-right-pins pointer-events-none absolute left-full top-1/2 -translate-y-1/2 hidden flex-col justify-around gap-6 py-4 pl-1 sm:flex opacity-0">
                {rightPins.map((pin) => (
                  <div
                    key={`end-${pin.id}`}
                    className="flex items-center gap-2"
                  >
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-circuit-copper" />
                    <div className="h-px w-6 bg-circuit-copper-dim sm:w-8" />
                    <div className="leading-tight">
                      <div className="font-mono text-[10px] text-circuit-copper">
                        PIN {pin.id}
                      </div>
                      <div className="max-w-44 wrap-break-words text-xs text-circuit-muted">
                        {pin.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT PINS */}

            <div className="hero-right-pins hidden flex-col justify-around gap-6 py-4 sm:flex overflow-visible">
              {rightPins.map((pin) => (
                <div
                  key={pin.id}
                  className="hero-right-pin flex items-center gap-2"
                >
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-circuit-copper" />

                  <div className="h-px w-6 bg-circuit-copper-dim sm:w-8" />

                  <div className="leading-tight">
                    <div className="font-mono text-[10px] text-circuit-copper">
                      PIN {pin.id}
                    </div>

                    <div className="max-w-44 wrap-break-words text-xs text-circuit-muted">
                      {pin.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-2 font-mono text-xs sm:hidden">
            {[...leftPins, ...rightPins].map((pin) => (
              <div
                key={pin.id}
                className="flex items-center justify-between border-b border-circuit-line/70 py-1.5"
              >
                <dt className="text-circuit-copper">
                  PIN {pin.id}
                </dt>

                <dd className="max-w-[70%] text-right text-circuit-muted">
                  {pin.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* about */}
        <section id="about" className="about-section lg:col-start-1 lg:row-start-2 py-20 sm:py-28">
          <div className="mx-auto max-w-full">
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
    </section >
  );
}