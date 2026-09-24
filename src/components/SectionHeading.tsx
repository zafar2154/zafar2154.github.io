import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function SectionHeading({
  index,
  title,
  align = "left",
}: {
  index: string;
  title: string;
  align?: "left" | "center";
}) {
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const line = lineRef.current;
    if (!line || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.out",
          transformOrigin: align === "center" ? "center" : "left",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, line);

    return () => ctx.revert();
  }, [align]);

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="trace-label text-xs text-circuit-copper">{index}</p>
      <h2 className="mt-2 font-mono text-2xl font-extrabold tracking-tight text-circuit-text sm:text-3xl">
        {title}
      </h2>
      <div
        ref={lineRef}
        className={`mt-4 h-px w-16 bg-circuit-led/70 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
