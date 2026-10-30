import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, X } from 'lucide-react';
import restaurant from '../config/restaurant';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useScrollLock } from '../hooks/useScrollLock';
import BrandMark from './BrandMark';

/**
 * Full-screen mobile navigation. Navigation clicks close the menu first,
 * then scroll once the page is unlocked.
 */
export default function MobileMenu({ open, onClose, onReserve }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useScrollLock(open);
  useFocusTrap({ containerRef: panelRef, active: open, initialFocusRef: closeRef });

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleNavClick = (event, href) => {
    event.preventDefault();
    onClose();
    window.setTimeout(() => {
      const target = document.querySelector(href);
      if (!target) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
    }, 60);
  };

  const handleReserve = () => {
    onClose();
    window.setTimeout(onReserve, 60);
  };

  const address = restaurant.location;

  return createPortal(
    <div
      id="mobile-menu"
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="animate-fade-in fixed inset-0 z-[95] overflow-y-auto overscroll-contain bg-canvas outline-none lg:hidden"
    >
      <div className="shell flex min-h-[100dvh] flex-col">
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-hairline">
          <BrandMark />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center border border-hairline text-ink transition-colors hover:border-gold hover:text-gold"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 py-6">
          <ul className="divide-y divide-hairline">
            {restaurant.nav.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className="group flex items-center justify-between py-5"
                >
                  <span className="flex items-baseline gap-4">
                    <span aria-hidden="true" className="text-[10px] tracking-[0.2em] text-gold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-3xl font-light text-ink transition-colors duration-300 group-hover:text-gold">
                      {item.label}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto space-y-5 border-t border-hairline py-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted">Hours</p>
            <p className="mt-1 text-sm text-ink">{restaurant.hoursSummary}</p>
          </div>

          {address?.isPlaceholder ? (
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">Find us</p>
              <p className="mt-1 text-sm text-ink">
                {address.addressLine1} · {address.neighborhood}, {address.city}
              </p>
              <p className="mt-1 text-[11px] text-muted">Sample address for this demo.</p>
            </div>
          ) : (
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">Find us</p>
              <p className="mt-1 text-sm text-ink">
                {address.addressLine1}, {address.addressLine2}
              </p>
            </div>
          )}

          <button type="button" onClick={handleReserve} className="btn btn-primary w-full">
            Reserve a Table
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
