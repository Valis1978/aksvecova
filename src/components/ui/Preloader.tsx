'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Page preloader with GSAP counter animation + clip-path wipe exit.
 * AK Švecová: navy background, gold counter, Cormorant heading.
 */
export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    // Counter 0 → 100
    tl.to(counter, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.val)}`;
        }
      },
    }, 0);

    // Progress bar
    if (barRef.current) {
      tl.to(barRef.current, {
        scaleX: 1,
        duration: 2,
        ease: 'power2.inOut',
      }, 0);
    }

    // Hold
    tl.to({}, { duration: 0.3 });

    // Clip-path exit
    if (containerRef.current) {
      tl.to(containerRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power3.inOut',
      });
    }
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-navy"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      {/* Brand text */}
      <p className="text-[10px] uppercase tracking-[0.4em] text-gold/50 mb-6">
        Advokátní kancelář
      </p>

      {/* Counter */}
      <div className="relative mb-8">
        <span
          ref={counterRef}
          className="font-heading text-7xl sm:text-8xl font-light text-gold tabular-nums"
        >
          0
        </span>
        <span className="absolute -right-6 top-2 text-gold/40 text-lg">%</span>
      </div>

      {/* Progress bar */}
      <div className="w-32 h-px bg-white/10 relative overflow-hidden rounded-full">
        <div
          ref={barRef}
          className="absolute inset-0 bg-gold origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}
