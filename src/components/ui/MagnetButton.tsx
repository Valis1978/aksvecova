'use client';

import React, { useState, useRef, useCallback } from 'react';

interface MagnetButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

/**
 * A button/link that magnetically follows the cursor on hover.
 * AK Švecová — gold/navy variant.
 */
export default function MagnetButton({ children, className = '', href, onClick, strength = 0.15 }: MagnetButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  }, [strength]);

  const reset = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.4s ease-out',
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={(e) => { handleMouse(e); setIsHovered(true); }}
        onMouseLeave={reset}
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={(e) => { handleMouse(e); setIsHovered(true); }}
      onMouseLeave={reset}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
