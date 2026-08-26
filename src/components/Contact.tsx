import { useState, type FormEvent, type ReactNode } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "../data/profile";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const fieldClass =
  "w-full rounded-sm border border-circuit-line bg-circuit-bg px-3 py-2.5 text-sm text-circuit-text placeholder:text-circuit-muted/60 focus:border-circuit-led focus:outline-none";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="border-t border-circuit-line bg-circuit-panel/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="// 05 — I/O" title="Contact Me" />
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <Reveal>
            <form onSubmit={handleSubmit} className="panel space-y-4 rounded-lg p-6">
              <div>
                <label htmlFor="name" className="trace-label mb-1.5 block text-[10px] text-circuit-copper">
                  Full name
                </label>
                <input
                  id="name"
                  required
                  className={fieldClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="trace-label mb-1.5 block text-[10px] text-circuit-copper">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className={fieldClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="trace-label mb-1.5 block text-[10px] text-circuit-copper">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className={fieldClass}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Let's talk about..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-sm bg-circuit-led px-5 py-2.5 font-mono text-xs font-bold tracking-wide text-circuit-bg transition-transform hover:-translate-y-0.5"
              >
                <Send size={14} />
                Send message
              </button>
              {sent && (
                <p className="font-mono text-[11px] text-circuit-led">
                  Your email client should now be open with the message ready to send.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={150} className="space-y-4">
            <InfoRow icon={<MapPin size={18} />} label="Address" value={profile.location} />
            <InfoRow icon={<Phone size={18} />} label="Phone" value={profile.phone} />
            <InfoRow icon={<Mail size={18} />} label="Email" value={profile.email} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="panel flex items-center gap-4 rounded-lg p-4">
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
}
