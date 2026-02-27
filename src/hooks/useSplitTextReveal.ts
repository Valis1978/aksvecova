'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealOptions {
  type?: 'chars' | 'words' | 'lines';
  duration?: number;
  stagger?: number;
  ease?: string;
  y?: number;
  delay?: number;
  onScroll?: boolean;
  start?: string;
}

/**
 * GSAP SplitText-style reveal — splits text into chars/words/lines and animates them.
 * Manual splitting (no SplitText plugin dependency for compatibility).
 * Navy/Gold AK Švecová palette.
 */
export function useSplitTextReveal<T extends HTMLElement>(options: SplitTextRevealOptions = {}) {
  const ref = useRef<T>(null);
  const splitDone = useRef(false);

  const {
    type = 'chars',
    duration = 0.6,
    stagger = 0.02,
    ease = 'power3.out',
    y = 40,
    delay = 0,
    onScroll = true,
    start = 'top 85%',
  } = options;

  const split = useCallback((el: HTMLElement): HTMLElement[] => {
    const text = el.textContent || '';
    el.setAttribute('aria-label', text);

    if (type === 'words') {
      const words = text.split(/\s+/).filter(Boolean);
      el.innerHTML = words
        .map((w) => `<span class="split-word" style="display:inline-block;overflow:hidden"><span style="display:inline-block">${w}</span></span>`)
        .join('<span style="display:inline-block;width:0.3em">&nbsp;</span>');
      return Array.from(el.querySelectorAll('.split-word > span'));
    }

    if (type === 'lines') {
      el.innerHTML = `<span class="split-line" style="display:block;overflow:hidden"><span style="display:block">${text}</span></span>`;
      return Array.from(el.querySelectorAll('.split-line > span'));
    }

    // chars (default)
    const chars: string[] = [];
    for (const char of text) chars.push(char);
    el.innerHTML = chars
      .map((c) => c === ' '
        ? '<span style="display:inline-block;width:0.3em">&nbsp;</span>'
        : `<span class="split-char" style="display:inline-block">${c}</span>`)
      .join('');
    return Array.from(el.querySelectorAll('.split-char'));
  }, [type]);

  useEffect(() => {
    const el = ref.current;
    if (!el || splitDone.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    splitDone.current = true;
    const targets = split(el);

    gsap.set(targets, { y, opacity: 0 });

    const animConfig: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      delay,
    };

    if (onScroll) {
      animConfig.scrollTrigger = {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      };
    }

    gsap.to(targets, animConfig);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [split, duration, stagger, ease, y, delay, onScroll, start]);

  return ref;
}

export default useSplitTextReveal;
