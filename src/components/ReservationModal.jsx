import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Info,
  Loader2,
  X,
} from 'lucide-react';
import restaurant from '../config/restaurant';
import { cn } from '../utils/cn';
import { formatDate, getTodayISO } from '../utils/formatters';
import { validateInquiry } from '../utils/validation';
import Modal from './Modal';

const INITIAL_VALUES = {
  name: '',
  email: '',
  date: '',
  time: '',
  party: '2',
  message: '',
};

const FIELD_ORDER = ['name', 'email', 'date', 'time', 'party', 'message'];

export default function ReservationModal({ onClose }) {
  const config = restaurant.reservation;
  const isLive = config.mode === 'live' && typeof config.onSubmit === 'function';
  const isDemo = !isLive;

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const nameRef = useRef(null);
  const successRef = useRef(null);
  const today = getTodayISO();

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateInquiry(values, {
      timeSlots: config.timeSlots,
      maxPartySize: config.maxPartySize,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = FIELD_ORDER.find((field) => nextErrors[field]);
      document.getElementById(`reservation-${firstField}`)?.focus();
      return;
    }

    setStatus('submitting');

    try {
      const payload = {
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        party: Number(values.party),
      };

      if (isLive) {
        await config.onSubmit(payload);
      } else {
        // Demo only: simulate a short request so the confirmation state is legible.
        await new Promise((resolve) => window.setTimeout(resolve, 650));
      }

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStatus('idle');
    window.requestAnimationFrame(() => nameRef.current?.focus());
  };

  const summary = [
    { label: 'Date', value: values.date ? formatDate(values.date, restaurant.locale) : '—' },
    { label: 'Time', value: values.time || '—' },
    {
      label: 'Party',
      value: `${values.party} ${Number(values.party) === 1 ? 'guest' : 'guests'}`,
    },
  ];

  return (
    <Modal
      open
      onClose={onClose}
      labelledBy="reservation-heading"
      describedBy={
        status === 'success' ? 'reservation-success-message' : 'reservation-description'
      }
      initialFocusRef={nameRef}
      className="max-h-[calc(100dvh-2rem)] max-w-lg overflow-y-auto border border-hairline bg-surface shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:max-h-[calc(100dvh-3rem)]"
    >
      {status === 'success' ? (
        <div className="animate-fade-in px-5 py-10 text-center sm:px-8">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
            <Check className="h-6 w-6" aria-hidden="true" />
          </span>

          {isDemo && (
            <p className="mt-6 text-[9px] uppercase tracking-[0.26em] text-gold">
              Demo confirmation
            </p>
          )}

          <h2
            ref={successRef}
            id="reservation-heading"
            tabIndex={-1}
            className="mt-2 font-display text-[2rem] font-light leading-tight text-ink outline-none"
          >
            {isLive ? 'Inquiry sent.' : config.successTitle}
          </h2>
          <p
            id="reservation-success-message"
            className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-muted"
          >
            {isLive
              ? 'Thank you. The restaurant will be in touch to confirm your request.'
              : config.successMessage}
          </p>

          <dl className="mt-7 divide-y divide-hairline border-y border-hairline text-left">
            {summary.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 py-3">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-muted">
                  {row.label}
                </dt>
                <dd className="text-right text-sm text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button type="button" onClick={onClose} className="btn btn-primary">
              Close
            </button>
            <button type="button" onClick={reset} className="btn btn-outline">
              Make another inquiry
            </button>
          </div>

          <p className="mt-6 text-[10px] leading-relaxed text-muted/80">
            No details from this form are stored or sent.
          </p>
        </div>
      ) : (
        <>
          <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-hairline bg-surface/95 px-5 py-5 backdrop-blur-sm sm:px-7">
            <div>
              <p className="eyebrow">{config.eyebrow}</p>
              <h2
                id="reservation-heading"
                className="mt-3 font-display text-[2rem] font-light leading-tight text-ink"
              >
                {config.heading}
              </h2>
              {config.tamil && (
                <p lang="ta" className="mt-1 font-tamil text-sm text-gold/85">
                  {config.tamil}
                </p>
              )}
              <p
                id="reservation-description"
                className="mt-2 max-w-sm text-[12px] leading-relaxed text-muted"
              >
                {config.description}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close reservation form"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-hairline text-muted transition-colors hover:border-gold hover:text-gold"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="px-5 py-6 sm:px-7">
            {isDemo && (
              <div className="mb-6 flex gap-3 border border-hairline bg-canvas/60 p-3.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <p className="text-[11px] leading-relaxed text-muted">{config.disclaimer}</p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="reservation-name" className="field-label">
                  Guest name
                </label>
                <input
                  ref={nameRef}
                  id="reservation-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  className="field"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'reservation-name-error' : undefined}
                  placeholder="Your full name"
                  required
                />
                {errors.name && (
                  <p
                    id="reservation-name-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-[11px] text-danger"
                  >
                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="reservation-email" className="field-label">
                  Email
                </label>
                <input
                  id="reservation-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  onChange={handleChange}
                  className="field"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'reservation-email-error' : undefined}
                  placeholder="you@example.com"
                  required
                />
                {errors.email && (
                  <p
                    id="reservation-email-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-[11px] text-danger"
                  >
                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label htmlFor="reservation-date" className="field-label">
                  Date
                </label>
                <input
                  id="reservation-date"
                  name="date"
                  type="date"
                  min={today}
                  value={values.date}
                  onChange={handleChange}
                  className="field"
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? 'reservation-date-error' : undefined}
                  required
                />
                {errors.date && (
                  <p
                    id="reservation-date-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-[11px] text-danger"
                  >
                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label htmlFor="reservation-time" className="field-label">
                  Preferred time
                </label>
                <select
                  id="reservation-time"
                  name="time"
                  value={values.time}
                  onChange={handleChange}
                  className="field"
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? 'reservation-time-error' : undefined}
                  required
                >
                  <option value="">Select a time</option>
                  {config.timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p
                    id="reservation-time-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-[11px] text-danger"
                  >
                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {errors.time}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label htmlFor="reservation-party" className="field-label">
                  Party size
                </label>
                <select
                  id="reservation-party"
                  name="party"
                  value={values.party}
                  onChange={handleChange}
                  className="field"
                  aria-invalid={Boolean(errors.party)}
                  aria-describedby={errors.party ? 'reservation-party-error' : undefined}
                  required
                >
                  {Array.from({ length: config.maxPartySize }, (_, index) => index + 1).map(
                    (size) => (
                      <option key={size} value={String(size)}>
                        {size} {size === 1 ? 'guest' : 'guests'}
                      </option>
                    ),
                  )}
                </select>
                {errors.party && (
                  <p
                    id="reservation-party-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-[11px] text-danger"
                  >
                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {errors.party}
                  </p>
                )}
              </div>

              <p className="self-end pb-2 text-[11px] leading-relaxed text-muted">
                {config.largePartyNote}
              </p>

              <div className="sm:col-span-2">
                <label htmlFor="reservation-message" className="field-label">
                  Anything we should know?{' '}
                  <span className="normal-case tracking-normal text-muted/70">(optional)</span>
                </label>
                <textarea
                  id="reservation-message"
                  name="message"
                  rows={3}
                  maxLength={400}
                  value={values.message}
                  onChange={handleChange}
                  className="field resize-y"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'reservation-message-error' : 'reservation-message-help'
                  }
                  placeholder="Allergies, a celebration, or a preference for a quieter table."
                />
                <div className="mt-1.5 flex items-start justify-between gap-4">
                  {errors.message ? (
                    <p
                      id="reservation-message-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-[11px] text-danger"
                    >
                      <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                      {errors.message}
                    </p>
                  ) : (
                    <p id="reservation-message-help" className="text-[11px] text-muted">
                      Dietary needs and accessibility requests are helpful to know.
                    </p>
                  )}
                  <span className="shrink-0 text-[10px] tabular-nums text-muted/70">
                    {values.message.length}/400
                  </span>
                </div>
              </div>
            </div>

            {status === 'error' && (
              <div
                role="alert"
                className="mt-5 border border-danger/40 bg-danger/10 px-3.5 py-3 text-[12px] leading-relaxed text-danger"
              >
                Something went wrong while preparing this inquiry. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={cn('btn btn-primary mt-6 w-full', status === 'submitting' && 'gap-2')}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Preparing inquiry
                </>
              ) : (
                <>
                  {isDemo ? 'Submit Demo Inquiry' : 'Send Reservation Request'}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </>
              )}
            </button>

            <p className="mt-3 text-center text-[10px] leading-relaxed text-muted/80">
              {isDemo
                ? 'Nothing is sent or stored. This form exists to demonstrate the reservation flow.'
                : 'Your details are used only to respond to this request.'}
            </p>
          </form>
        </>
      )}
    </Modal>
  );
}
