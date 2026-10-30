import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useScrollLock } from '../hooks/useScrollLock';
import { cn } from '../utils/cn';

/**
 * Accessible dialog shell: portal, scroll lock, focus trap, Escape to close,
 * and click-outside-to-close. Content owns its visible close button.
 */
export default function Modal({
  open,
  onClose,
  labelledBy,
  describedBy,
  children,
  className,
  overlayClassName,
  initialFocusRef,
  closeOnBackdrop = true,
}) {
  const panelRef = useRef(null);

  useScrollLock(open);
  useFocusTrap({ containerRef: panelRef, active: open, initialFocusRef });

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-[100] flex overflow-y-auto p-4 sm:p-6',
        overlayClassName ?? 'bg-black/80',
      )}
      onMouseDown={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={cn('relative m-auto w-full outline-none', className)}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
