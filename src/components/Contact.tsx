import type { ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ParallaxDots from "./ParallaxDots";
import { useTilt } from "../hooks/useMicroInteractions";

type InfoRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
};

function InfoRow({ icon, label, value, href }: InfoRowProps) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 4, scale: 1.02, lift: 3 });

  const content = (
    <div
      ref={tiltRef}
      className="panel flex h-full items-center gap-4 rounded-lg p-4 transition-colors hover:border-circuit-led/60"
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-circuit-line text-circuit-copper">
        {icon}
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-circuit-led led-dot" />
      </span>
      <div>
        <p className="trace-label text-[10px] text-circuit-muted">{label}</p>
        <p className="font-mono text-sm text-circuit-text">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-circuit-line bg-circuit-panel/30 py-20 sm:py-28">
      <ParallaxDots speed={12} className="opacity-40" mask={false} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="// 07 — I/O" title="Contact Me" align="left" />
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-6 max-w-md text-sm text-circuit-muted">
            Reach out directly through any of these channels — I'll get back to you as soon as I can.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <InfoRow
              icon={<Mail size={18} />}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <InfoRow icon={<Phone size={18} />} label="Phone" value={profile.phone} />
            <InfoRow
              icon={<LinkedinIcon size={18} />}
              label="LinkedIn"
              value="linkedin.com/in/zahid-faqih-alim-rabbani/"
              href={profile.socials.linkedin}
            />
            <InfoRow
              icon={<GithubIcon size={18} />}
              label="GitHub"
              value="zafar2154"
              href={profile.socials.github}
            />

            <InfoRow
              icon={<MapPin size={18} />}
              label="Address"
              value={profile.location}
            />
            <InfoRow
              icon={<InstagramIcon size={18} />}
              label="Instagram"
              value={"instagram.com/eza_zahid/"}
              href={profile.socials.instagram}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
