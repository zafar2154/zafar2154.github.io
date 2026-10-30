import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { profile } from '../data/profile';

interface TypewriterGSAPProps {
  words?: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetween?: number;
  startDelay?: number;
}

export default function TypewriterGSAP({
  words = profile.focus,
  typeSpeed = 0.08,
  deleteSpeed = 0.04,
  delayBetween = 1.2,
  startDelay = 1.8,
}: TypewriterGSAPProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = textRef.current;
    if (!el) return;

    // Reduced motion: show the first word and leave it still.
    if (prefersReducedMotion) {
      el.textContent = words[0] ?? '';
      return;
    }

    const tl = gsap.timeline({ repeat: -1, delay: startDelay });

    words.forEach((word) => {
      tl.to(el, {
        duration: word.length * typeSpeed,
        text: word,
        ease: 'none',
      })
        .to({}, { duration: delayBetween })
        .to(el, {
          duration: word.length * deleteSpeed,
          text: '',
          ease: 'none',
        })
        .to({}, { duration: 0.3 });
    });
  }, [words, typeSpeed, deleteSpeed, delayBetween, startDelay]);

  // Screen readers get the full list once instead of every typed letter.
  return (
    <span className="flex h-4 items-center font-mono font-bold">
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true" className="flex items-center">
        <span ref={textRef} />
        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current" />
      </span>
    </span>
  );
}
