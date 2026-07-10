import { reduce } from './reduce';

export interface BirthDate {
  day: number;
  month: number;
  year: number;
}

export class InvalidDateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidDateError';
  }
}

function assertValidDay(day: number): void {
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    throw new InvalidDateError(`Invalid day: ${day}`);
  }
}

function assertValidMonth(month: number): void {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new InvalidDateError(`Invalid month: ${month}`);
  }
}

function assertValidYear(year: number): void {
  if (!Number.isInteger(year) || year < 1) {
    throw new InvalidDateError(`Invalid year: ${year}`);
  }
}

function daysInMonth(month: number, year: number): number {
  // Day 0 of the following (1-indexed) month rolls back to the last day of `month`.
  return new Date(year, month, 0).getDate();
}

function sumOfDigits(n: number): number {
  let sum = 0;
  let remaining = n;
  while (remaining > 0) {
    sum += remaining % 10;
    remaining = Math.floor(remaining / 10);
  }
  return sum;
}

export function psychicNumber(day: number): { compound: number; single: number } {
  assertValidDay(day);
  return reduce(day);
}

export function destinyNumber(
  day: number,
  month: number,
  year: number,
): { compound: number; single: number } {
  assertValidDay(day);
  assertValidMonth(month);
  assertValidYear(year);

  if (day > daysInMonth(month, year)) {
    throw new InvalidDateError(`${year}-${month}-${day} is not a valid calendar date`);
  }

  const digitTotal = sumOfDigits(day) + sumOfDigits(month) + sumOfDigits(year);
  return reduce(digitTotal);
}
