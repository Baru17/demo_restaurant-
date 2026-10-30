/** Format a menu price for the configured currency. */
export function formatPrice(amount, currency = 'USD', locale = 'en-US') {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '—';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Human-readable date, used in the demo confirmation state. */
export function formatDate(dateString, locale = 'en-US') {
  if (!dateString) return '';
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** Local (not UTC) ISO date for the date input's minimum value. */
export function getTodayISO() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

/** Return the opening-hours entry for today, if configured. */
export function getTodayHours(hours = []) {
  const today = DAY_NAMES[new Date().getDay()];
  return hours.find((entry) => entry.day === today) ?? null;
}

/** Accessible, reduced-motion-aware scroll to an element or the top. */
export function scrollToTarget(target) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!target) {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    return;
  }
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  element?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
}
