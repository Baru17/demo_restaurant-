import restaurant from '../config/restaurant';
import { cn } from '../utils/cn';

/**
 * Wordmark rendered from the configured restaurant name.
 * Names containing `&` keep the styled connector; longer names simply render
 * as one line. The Tamil name is an optional second line.
 */
export default function BrandMark({
  className,
  nameClassName,
  showCity = false,
  showTamil = true,
  size = 'sm',
}) {
  const [firstPart, ...rest] = restaurant.name.split('&');
  const lastPart = rest.join('&').trim();
  const hasConnector = rest.length > 0;
  const isLarge = size === 'lg';
  const sizeClass = isLarge
    ? 'text-[1.2rem] sm:text-[1.7rem] lg:text-[2rem]'
    : 'text-[1rem] sm:text-[1.15rem] xl:text-[1.42rem]';
  const trackingClass = isLarge
    ? 'tracking-[0.12em] sm:tracking-[0.16em]'
    : 'tracking-[0.1em] sm:tracking-[0.14em] xl:tracking-[0.17em]';

  return (
    <span className={cn('inline-flex flex-col', className)}>
      <span
        className={cn(
          'font-display leading-none text-ink',
          trackingClass,
          sizeClass,
          nameClassName,
        )}
      >
        <span>{firstPart.trim()}</span>
        {hasConnector && (
          <span aria-hidden="true" className="px-[0.3em] italic text-gold">
            &amp;
          </span>
        )}
        {hasConnector && <span>{lastPart}</span>}
      </span>

      {showTamil && restaurant.nameTamil && (
        <span
          lang="ta"
          className={cn(
            'mt-1.5 font-tamil leading-none text-gold/90',
            isLarge ? 'text-[0.8rem] sm:text-[0.95rem]' : 'text-[0.62rem] sm:text-[0.7rem]',
          )}
        >
          {restaurant.nameTamil}
        </span>
      )}

      {showCity && (
        <span className="mt-1.5 pl-px text-[8px] uppercase tracking-[0.32em] text-muted">
          {restaurant.brandDescriptor} · {restaurant.location.city}
        </span>
      )}
    </span>
  );
}
