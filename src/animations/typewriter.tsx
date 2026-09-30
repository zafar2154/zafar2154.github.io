import { useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import { profile } from '../data/profile';

gsap.registerPlugin(TextPlugin);

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
    if (!textRef.current) return;

    const tl = gsap.timeline({ repeat: -1, delay: startDelay });

    words.forEach((word) => {
      tl.to(textRef.current, {
        duration: word.length * typeSpeed,
        text: word,
        ease: 'none',
      })
        .to({}, { duration: delayBetween })
        .to(textRef.current, {
          duration: word.length * deleteSpeed,
          text: '',
          ease: 'none',
        })
        .to({}, { duration: 0.3 });
    });
  }, [words, typeSpeed, deleteSpeed, delayBetween, startDelay]);

  return (
    <span className="flex h-4 items-center font-mono font-bold text-emerald-500">
      <span ref={textRef} />
      <span className="ml-0.5 inline-block h-4 w-0.5 bg-current animate-pulse overflow-hidden" />
    </span>
  );
}