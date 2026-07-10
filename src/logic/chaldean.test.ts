import { letterValue, nameValue } from './chaldean';

describe('letterValue', () => {
  it('maps known letters to their Chaldean values', () => {
    expect(letterValue('A')).toBe(1);
    expect(letterValue('f')).toBe(8);
    expect(letterValue('O')).toBe(7);
  });

  it('returns 0 for non-alphabetic characters', () => {
    expect(letterValue('-')).toBe(0);
    expect(letterValue(' ')).toBe(0);
    expect(letterValue('5')).toBe(0);
  });

  it('never maps a letter to 9, and stays within 1-8 for every letter', () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (const letter of alphabet) {
      const value = letterValue(letter);
      expect(value).not.toBe(9);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(8);
    }
  });
});

describe('nameValue', () => {
  it('sums letter values for a name', () => {
    expect(nameValue('ANNA')).toBe(12);
  });

  it('is case-insensitive', () => {
    expect(nameValue('anna')).toBe(nameValue('ANNA'));
  });

  it('ignores spaces, hyphens, and apostrophes', () => {
    expect(nameValue("Mary-Jane O'Neil")).toBe(nameValue('MaryJane ONeil'));
  });
});
