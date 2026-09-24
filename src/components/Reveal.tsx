import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion) {
      gsap.set(node, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: delay / 1000,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, node);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
      {children}
    </div>
  );
}
