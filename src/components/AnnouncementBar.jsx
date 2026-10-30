import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import restaurant from '../config/restaurant';

/** Slim, optional announcement strip. Hiding it is a local UI action only. */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const { announcement } = restaurant;

  if (!announcement?.enabled || !visible) return null;

  return (
    <div className="relative border-b border-hairline bg-surface">
      <div className="shell flex min-h-11 items-center justify-center gap-2.5 py-2 pl-4 pr-12 text-center">
        <p className="truncate text-[10px] uppercase tracking-[0.14em] text-muted sm:text-[11px]">
          {announcement.text}
        </p>
        {announcement.link && (
          <a
            href={announcement.link.href}
            aria-label={announcement.link.label}
            className="group inline-flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-soft sm:text-[11px]"
          >
            <span className="hidden sm:inline">{announcement.link.label}</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        )}
      </div>

      {announcement.dismissible && (
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute right-1 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center text-muted transition-colors hover:text-ink"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
