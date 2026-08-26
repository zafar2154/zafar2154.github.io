import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/profile";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const handleNavClick = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-circuit-line transition-colors ${
        scrolled ? "bg-circuit-bg/90 backdrop-blur" : "bg-circuit-bg/60 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-circuit-text"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-circuit-copper/60 text-circuit-copper">
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
                  className={`group flex flex-col items-center rounded-sm px-3 py-1.5 transition-colors ${
                    active === link.id
                      ? "text-circuit-led"
                      : "text-circuit-muted hover:text-circuit-text"
                  }`}
                >
                  <span className="tracking-widest">{link.testPoint}</span>
                  <span className="text-[11px] normal-case tracking-normal">
                    {link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="text-circuit-text md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-circuit-line bg-circuit-bg px-5 py-3 md:hidden">
          <ul className="flex flex-col gap-1 font-mono text-sm">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`flex w-full items-center justify-between rounded-sm px-2 py-2 ${
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
      )}
    </header>
  );
}
