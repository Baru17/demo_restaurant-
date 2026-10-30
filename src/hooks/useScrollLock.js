import { useEffect } from 'react';

// A shared counter keeps nested/overlapping dialogs from unlocking the page early.
let lockCount = 0;
let previousOverflow = '';
let previousPaddingRight = '';

/** Prevent background scrolling while a dialog is open. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const body = document.body;
    if (lockCount === 0) {
      previousOverflow = body.style.overflow;
      previousPaddingRight = body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    }
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPaddingRight;
      }
    };
  }, [locked]);
}
