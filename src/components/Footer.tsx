import { GithubIcon, InstagramIcon, LinkedinIcon } from "./icons";
import { profile } from "../data/profile";
import { usePressFeedback } from "../hooks/useMicroInteractions";

const socialLinks = [
  { href: profile.socials.github, label: "GitHub", icon: GithubIcon },
  { href: profile.socials.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: profile.socials.instagram, label: "Instagram", icon: InstagramIcon },
];

function SocialLink({
  href,
  label,
  icon: Icon,
}: (typeof socialLinks)[number]) {
  const ref = usePressFeedback<HTMLAnchorElement>(0.85);
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-sm border border-circuit-line text-circuit-muted transition-all duration-300 hover:-translate-y-0.5 hover:rotate-6 hover:border-circuit-copper hover:text-circuit-copper"
    >
      <Icon size={16} />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-circuit-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 sm:px-8">
        <div className="flex gap-3">
          {socialLinks.map((link) => (
            <SocialLink key={link.label} {...link} />
          ))}
        </div>
        <p className="font-mono text-[11px] text-circuit-muted">
          &copy; {new Date().getFullYear()} — Built by {profile.name}
        </p>
      </div>
    </footer>
  );
}
