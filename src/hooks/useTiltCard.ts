'use client';

import { useEffect, useRef, useCallback } from 'react';

interface TiltCardOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glowColor?: string;
}

/**
 * 3D tilt effect with radial cursor glow — pure CSS, no framer-motion needed.
 * AK Švecová: navy/gold palette.
 */
export function useTiltCard<T extends HTMLElement>(options: TiltCardOptions = {}) {
  const ref = useRef<T>(null);

  const {
    maxTilt = 4,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
    glowColor = 'rgba(196, 162, 101, 0.12)',
  } = options;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    el.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`;
  }, [maxTilt, perspective, scale, glowColor]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.backgroundImage = '';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99), background-image ${speed}ms ease`;
    el.style.willChange = 'transform';

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, speed]);

  return ref;
}

export default useTiltCard;
