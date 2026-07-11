import { nameNumber } from './chaldean';
import { destinyNumber, psychicNumber, type BirthDate } from './dateNumbers';

export interface CalculationResult {
  psychic: { compound: number; single: number };
  destiny: { compound: number; single: number };
  name: { compound: number; single: number };
}

export function calculateResult(name: string, date: BirthDate): CalculationResult {
  return {
    psychic: psychicNumber(date.day),
    destiny: destinyNumber(date.day, date.month, date.year),
    name: nameNumber(name),
  };
}
