import { ArrowDown, Mail } from "lucide-react";
import { profile } from "../data/profile";
import Reveal from "./Reveal";

const leftPins = [
  { id: "01", label: profile.name },
  { id: "02", label: `${profile.role}` },
  { id: "03", label: profile.location },
];

const rightPins = [
  { id: "04", label: profile.focus },
  { id: "05", label: profile.email },
  { id: "06", label: profile.status },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 grid-dots opacity-70"
        style={{
          maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <Reveal className="relative">
          <p className="trace-label text-xs text-circuit-copper">
            // S1 — Electrical Engineering
          </p>
          <h1 className="mt-4 font-mono text-4xl font-extrabold leading-tight tracking-tight text-circuit-text sm:text-5xl">
            {profile.name.split(" ").slice(0, 2).join(" ")}
            <br />
            {profile.name.split(" ").slice(2).join(" ")}
          </h1>
          <p className="trace-label mt-4 text-sm text-circuit-led">
            {profile.focus}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-circuit-muted sm:text-base">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-sm bg-circuit-led px-5 py-2.5 font-mono text-xs font-bold tracking-wide text-circuit-bg transition-transform hover:-translate-y-0.5"
            >
              <Mail size={14} />
              Get in touch
            </button>
            <button
              onClick={() => scrollTo("experience")}
              className="inline-flex items-center gap-2 rounded-sm border border-circuit-copper/60 px-5 py-2.5 font-mono text-xs font-bold tracking-wide text-circuit-copper transition-transform hover:-translate-y-0.5"
            >
              View projects
              <ArrowDown size={14} />
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 font-mono text-[11px] text-circuit-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-circuit-led animate-blink" />
            STATUS: {profile.status}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr]">
            <div className="hidden flex-col justify-around gap-6 py-4 sm:flex">
              {leftPins.map((pin) => (
                <div key={pin.id} className="flex items-center justify-end gap-2 text-right">
                  <div className="leading-tight">
                    <div className="font-mono text-[10px] text-circuit-copper">
                      PIN {pin.id}
                    </div>
                    <div className="max-w-[11rem] text-xs text-circuit-muted">
                      {pin.label}
                    </div>
                  </div>
                  <div className="h-px w-6 bg-circuit-copper-dim sm:w-8" />
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-circuit-copper" />
                </div>
              ))}
            </div>

            <div className="relative mx-auto w-64 shrink-0 rounded-xl border border-circuit-line bg-circuit-panel p-3 copper-glow sm:w-72">
              <div className="absolute -top-1.5 -left-1.5 h-3 w-3 rounded-full bg-circuit-copper" />
              <div className="overflow-hidden rounded-lg border border-circuit-line/80">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="aspect-square w-full object-cover contrast-110 saturate-75"
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-circuit-muted">
                <span>IC: ZFAR-01</span>
                <span>PKG: DIP-6</span>
              </div>
            </div>

            <div className="hidden flex-col justify-around gap-6 py-4 sm:flex">
              {rightPins.map((pin) => (
                <div key={pin.id} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-circuit-copper" />
                  <div className="h-px w-6 bg-circuit-copper-dim sm:w-8" />
                  <div className="leading-tight">
                    <div className="font-mono text-[10px] text-circuit-copper">
                      PIN {pin.id}
                    </div>
                    <div className="max-w-[11rem] break-words text-xs text-circuit-muted">
                      {pin.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-2 font-mono text-xs sm:hidden">
            {[...leftPins, ...rightPins].map((pin) => (
              <div
                key={pin.id}
                className="flex items-center justify-between border-b border-circuit-line/70 py-1.5"
              >
                <dt className="text-circuit-copper">PIN {pin.id}</dt>
                <dd className="text-right text-circuit-muted">{pin.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
