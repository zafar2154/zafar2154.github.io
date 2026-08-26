import { profile } from "../data/profile";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="border-t border-circuit-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="// 02 — Register" title="About Me" />
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
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
  );
}
