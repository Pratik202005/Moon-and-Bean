import React, { useEffect, useRef } from 'react';

/**
 * SpecularGlow - Luxury Dynamic Cursor-Follow Specular Sheen (Apple/Linear-Grade)
 *
 * Tracks cursor position and renders a dynamic golden radial sheen along the card's
 * border perimeter and inner glass surface.
 *
 * Uses direct CSS variable injection (--mouse-x, --mouse-y) with hardware acceleration
 * to maintain 60-120fps fluid kinetic performance without triggering React re-renders.
 */
const SpecularGlow = ({
  glowColor = 'rgba(212, 175, 55, 0.18)',
  borderColor = 'rgba(212, 175, 55, 0.65)',
  size = 420,
  borderSize = 320,
}) => {
  const borderRef = useRef(null);

  useEffect(() => {
    const borderEl = borderRef.current;
    if (!borderEl) return;
    const parent = borderEl.parentElement;
    if (!parent) return;

    // Ensure parent has position relative & overflow hidden
    const computed = window.getComputedStyle(parent);
    if (computed.position === 'static') {
      parent.style.position = 'relative';
    }
    if (!parent.classList.contains('group')) {
      parent.classList.add('group');
    }

    const onMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      parent.style.setProperty('--mouse-x', `${x}px`);
      parent.style.setProperty('--mouse-y', `${y}px`);
    };

    const onMouseLeave = () => {
      parent.style.setProperty('--mouse-x', `-999px`);
      parent.style.setProperty('--mouse-y', `-999px`);
    };

    parent.addEventListener('mousemove', onMouseMove, { passive: true });
    parent.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      parent.removeEventListener('mousemove', onMouseMove);
      parent.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* 1. Dynamic Cursor-Follow Specular Border Glow (Border Perimeter Tracking) */}
      <div
        ref={borderRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-[1px]"
        style={{
          background: `radial-gradient(${borderSize}px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${borderColor}, transparent 70%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* 2. Dynamic Cursor-Follow Tactile Surface Radial Sheen (Liquid Glass Feel) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(${size}px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${glowColor}, transparent 70%)`,
        }}
      />
    </>
  );
};

export default SpecularGlow;
