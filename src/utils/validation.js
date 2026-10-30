import { getTodayISO } from './formatters';

/**
 * Validate the demo reservation inquiry.
 * Swap this for provider-specific validation when wiring a real booking system.
 */
export function validateInquiry(values, { timeSlots = [], maxPartySize = 8 } = {}) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();
  const party = Number(values.party);

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.name = 'Please enter at least two characters.';
  } else if (name.length > 80) {
    errors.name = 'Please keep your name under 80 characters.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'Enter a valid email address, like name@example.com.';
  }

  if (!values.date) {
    errors.date = 'Choose a date for your visit.';
  } else if (values.date < getTodayISO()) {
    errors.date = 'Please choose today or a future date.';
  }

  if (!values.time) {
    errors.time = 'Choose a preferred time.';
  } else if (timeSlots.length && !timeSlots.includes(values.time)) {
    errors.time = 'Choose one of the available times.';
  }

  if (!Number.isInteger(party) || party < 1) {
    errors.party = 'Choose your party size.';
  } else if (party > maxPartySize) {
    errors.party = `For parties larger than ${maxPartySize}, please call the restaurant.`;
  }

  if (message.length > 400) {
    errors.message = 'Please keep your note under 400 characters.';
  }

  return errors;
}
