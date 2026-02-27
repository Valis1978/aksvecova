'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Direction = 'bottom' | 'top' | 'left' | 'right' | 'center';

interface ClipRevealOptions {
  direction?: Direction;
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  fade?: boolean;
}

const clipPaths: Record<Direction, { from: string; to: string }> = {
  bottom: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
  top: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
  left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
  right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
  center: { from: 'inset(50% 50% 50% 50%)', to: 'inset(0% 0% 0% 0%)' },
};

/**
 * Directional clip-path wipe reveal on scroll.
 * AK Švecová — replaces inline GSAP clip-path code with reusable hook.
 */
export function useClipReveal<T extends HTMLElement>(options: ClipRevealOptions = {}) {
  const ref = useRef<T>(null);

  const {
    direction = 'bottom',
    duration = 1.2,
    ease = 'power3.inOut',
    delay = 0,
    stagger = 0,
    start = 'top 80%',
    fade = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const clip = clipPaths[direction];
    const targets = stagger > 0 ? Array.from(el.children) as HTMLElement[] : [el];

    gsap.fromTo(targets,
      { clipPath: clip.from, ...(fade ? { opacity: 0 } : {}) },
      {
        clipPath: clip.to,
        ...(fade ? { opacity: 1 } : {}),
        duration,
        ease,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [direction, duration, ease, delay, stagger, start, fade]);

  return ref;
}

export default useClipReveal;
