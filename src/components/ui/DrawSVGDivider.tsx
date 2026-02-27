'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);
}

/**
 * Self-drawing SVG wave divider — draws on scroll.
 * AK Švecová: navy → gold → navy gradient.
 */
export default function DrawSVGDivider({ className = '' }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(path,
      { drawSVG: '0%' },
      {
        drawSVG: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: path,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg className="w-full h-4" viewBox="0 0 1200 16" preserveAspectRatio="none" fill="none">
        <path
          ref={pathRef}
          d="M0,8 C200,2 400,14 600,8 C800,2 1000,14 1200,8"
          stroke="url(#svecova-divider-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="svecova-divider-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#0A1628" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#C4A265" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#0A1628" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
