import { useState } from 'react';
import restaurant from '../config/restaurant';
import { cn } from '../utils/cn';

/**
 * Image with reserved layout space, lazy loading, and a graceful fallback
 * if a file is missing or a remote host is unavailable.
 */
export default function SmartImage({
  src,
  alt,
  className,
  imageClassName,
  position = 'center',
  eager = false,
  sizes,
  fit = 'cover',
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-elevated', className)}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ objectPosition: position }}
          className={cn(
            'h-full w-full',
            fit === 'contain' ? 'object-contain' : 'object-cover',
            loaded && 'animate-image-reveal',
            imageClassName,
          )}
        />
      )}

      {failed && (
        <div
          role="img"
          aria-label={alt || 'Image unavailable'}
          className="image-fallback absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center"
        >
          <span
            aria-hidden="true"
            className="font-display text-2xl tracking-[0.16em] text-ink/80"
          >
            {restaurant.name}
          </span>
          <span
            aria-hidden="true"
            className="text-[9px] uppercase tracking-[0.26em] text-muted"
          >
            Image unavailable
          </span>
        </div>
      )}
    </div>
  );
}
