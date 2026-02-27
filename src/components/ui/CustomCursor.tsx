'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom cursor with mix-blend-mode: difference.
 * AK Švecová — gold inner dot (#C4A265), white outer ring.
 * Hidden on touch devices. CSS in globals.css.
 */
export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Use pointer: fine to detect mouse — maxTouchPoints > 0 is true on
    // Windows laptops with touchscreen even when using a mouse
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    // Hide default cursor only when custom cursor is active
    document.body.classList.add('custom-cursor-active');

    const show = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        if (outerRef.current) outerRef.current.style.opacity = '1';
        if (innerRef.current) innerRef.current.style.opacity = '1';
      }
    };

    const hide = () => {
      visibleRef.current = false;
      if (outerRef.current) outerRef.current.style.opacity = '0';
      if (innerRef.current) innerRef.current.style.opacity = '0';
    };

    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      show();
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-magnetic], input, textarea, select, [role="button"]')) {
        outerRef.current?.classList.add('cursor-grow');
      }
    };

    const handleOut = () => {
      outerRef.current?.classList.remove('cursor-grow');
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    // Lerp loop for outer ring
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const loop = () => {
      outerPos.current.x = lerp(outerPos.current.x, mouse.current.x, 0.15);
      outerPos.current.y = lerp(outerPos.current.y, mouse.current.y, 0.15);
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x - 18}px, ${outerPos.current.y - 18}px)`;
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
    <>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid white',
          opacity: 0,
          transition: 'opacity 0.3s, width 0.3s, height 0.3s, border-color 0.3s',
          willChange: 'transform',
        }}
      />
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: '#C4A265',
          opacity: 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
