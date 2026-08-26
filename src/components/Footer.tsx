import { GithubIcon, InstagramIcon, LinkedinIcon } from "./icons";
import { profile } from "../data/profile";

const socialLinks = [
  { href: profile.socials.github, label: "GitHub", icon: GithubIcon },
  { href: profile.socials.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: profile.socials.instagram, label: "Instagram", icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-circuit-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 sm:px-8">
        <div className="flex gap-3">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-circuit-line text-circuit-muted transition-colors hover:border-circuit-copper hover:text-circuit-copper"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
        <p className="font-mono text-[11px] text-circuit-muted">
          &copy; {new Date().getFullYear()} — Built by {profile.name}
        </p>
      </div>
    </footer>
  );
}
