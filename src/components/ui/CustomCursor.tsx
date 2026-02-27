'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor with mix-blend-mode: difference.
 * AK Švecová — gold inner dot (#C4A265), white outer ring.
 * Hidden on touch devices.
 */
export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Inner dot — instant
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
      }
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    // Grow on interactive elements
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
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
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
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [visible]);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid white',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s, width 0.3s, height 0.3s, border-color 0.3s',
          willChange: 'transform',
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: '#C4A265',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
      <style jsx global>{`
        .custom-cursor-active, .custom-cursor-active * {
          cursor: none !important;
        }
        .cursor-grow {
          width: 52px !important;
          height: 52px !important;
          margin-left: -8px;
          margin-top: -8px;
          border-color: rgba(196, 162, 101, 0.6) !important;
        }
      `}</style>
    </>
  );
}
