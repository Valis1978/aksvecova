'use client';

import { useEffect, useRef } from 'react';

/**
 * Subtle gold dot cursor for AK Švecová — luxury law firm aesthetic.
 * Single gold dot with soft glow, grows gently on interactive elements.
 * No ring, no mix-blend-difference — clean and professional.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    document.body.classList.add('custom-cursor-active');

    const show = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }
    };

    const hide = () => {
      visibleRef.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      show();
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-magnetic], input, textarea, select, [role="button"]')) {
        dotRef.current?.classList.add('cursor-hover');
      }
    };

    const handleOut = () => {
      dotRef.current?.classList.remove('cursor-hover');
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    // Smooth lerp follow — slightly delayed for elegance
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const loop = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.18);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.18);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        top: -4,
        left: -4,
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: '#C4A265',
        boxShadow: '0 0 8px rgba(196, 162, 101, 0.4), 0 0 20px rgba(196, 162, 101, 0.15)',
        opacity: 0,
        transition: 'opacity 0.3s, width 0.25s, height 0.25s, top 0.25s, left 0.25s, box-shadow 0.25s',
        willChange: 'transform',
      }}
    />
  );
}
