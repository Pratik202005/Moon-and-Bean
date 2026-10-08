import { useEffect } from 'react';

// Reference counter to handle overlapping modals/drawers cleanly
let lockCount = 0;
let previousOverflow = '';

export const lockScroll = () => {
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.stop();
    }
  }
  lockCount++;
};

export const unlockScroll = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow || '';
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.start();
    }
  }
};

/**
 * useModalScrollLock Hook
 * Pauses Lenis smooth scroll and locks document.body scroll whenever isOpen is true.
 * Automatically restores scroll when the modal unmounts or closes.
 */
export const useModalScrollLock = (isOpen) => {
  useEffect(() => {
    if (!isOpen) return;

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [isOpen]);
};

export default useModalScrollLock;
