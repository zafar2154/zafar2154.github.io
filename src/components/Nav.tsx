import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/profile";
import { gsap, gsapScrollTo, prefersReducedMotion } from "../lib/gsap";
import { useMagnetic, usePressFeedback } from "../hooks/useMicroInteractions";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const logoRef = useMagnetic<HTMLButtonElement>(0.25);
  const menuBtnRef = usePressFeedback<HTMLButtonElement>();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = mobileMenuRef.current;
    if (!node) return;

    if (prefersReducedMotion) {
      node.style.display = open ? "block" : "none";
      return;
    }

    if (open) {
      node.style.display = "block";
      gsap.fromTo(
        node,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        node.querySelectorAll("li"),
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, delay: 0.05 }
      );
    } else if (node.style.display === "block") {
      gsap.to(node, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          node.style.display = "none";
        },
      });
    }
  }, [open]);

  const handleNavClick = (id: string) => {
    setOpen(false);
    gsapScrollTo(id);
  };

  return (
    <header className="relative z-50 border-b border-circuit-line bg-circuit-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <button
          ref={logoRef}
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-circuit-text"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-circuit-copper/60 text-circuit-copper transition-colors hover:border-circuit-copper hover:bg-circuit-copper/10">
            Z
          </span>
          ZAFAR
          <span className="hidden items-center gap-1.5 pl-2 text-[10px] font-medium text-circuit-muted sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-circuit-led animate-blink" />
            ONLINE
          </span>
        </button>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 font-mono text-xs">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`group relative flex flex-col items-center rounded-sm px-3 py-1.5 transition-colors ${
                    active === link.id
                      ? "text-circuit-led"
                      : "text-circuit-muted hover:text-circuit-text"
                  }`}
                >
                  <span className="tracking-widest">{link.testPoint}</span>
                  <span className="text-[11px] normal-case tracking-normal">
                    {link.label}
                  </span>
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-circuit-led transition-all duration-300 ${
                      active === link.id ? "w-3/4" : "w-0 group-hover:w-1/2"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuBtnRef}
          className="text-circuit-text md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        style={{ display: "none", overflow: "hidden" }}
        className="border-t border-circuit-line bg-circuit-bg px-5 py-3 md:hidden"
      >
        <nav>
          <ul className="flex flex-col gap-1 font-mono text-sm">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`flex w-full items-center justify-between rounded-sm px-2 py-2 transition-colors ${
                    active === link.id ? "text-circuit-led" : "text-circuit-muted"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] tracking-widest">{link.testPoint}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
