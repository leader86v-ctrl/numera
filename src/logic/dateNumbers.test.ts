import { psychicNumber, destinyNumber, InvalidDateError } from './dateNumbers';

describe('psychicNumber', () => {
  it('reduces the day of month', () => {
    expect(psychicNumber(8).single).toBe(8);
    expect(psychicNumber(17).single).toBe(8);
  });

  it('throws a InvalidDateError for an out-of-range day', () => {
    expect(() => psychicNumber(0)).toThrow(InvalidDateError);
    expect(() => psychicNumber(32)).toThrow(InvalidDateError);
  });

  it('never returns NaN', () => {
    for (let day = 1; day <= 31; day += 1) {
      const result = psychicNumber(day);
      expect(Number.isNaN(result.compound)).toBe(false);
      expect(Number.isNaN(result.single)).toBe(false);
    }
  });
});

describe('destinyNumber', () => {
  it('reduces the sum of all digits of the full date', () => {
    expect(destinyNumber(23, 11, 1980).single).toBe(7);
  });

  it('throws a InvalidDateError for an impossible calendar date', () => {
    expect(() => destinyNumber(31, 2, 2000)).toThrow(InvalidDateError);
  });

  it('throws a InvalidDateError for out-of-range day or month', () => {
    expect(() => destinyNumber(0, 5, 2000)).toThrow(InvalidDateError);
    expect(() => destinyNumber(32, 5, 2000)).toThrow(InvalidDateError);
    expect(() => destinyNumber(15, 0, 2000)).toThrow(InvalidDateError);
    expect(() => destinyNumber(15, 13, 2000)).toThrow(InvalidDateError);
  });

  it('accepts Feb 29 on a leap year but not on a non-leap year', () => {
    expect(() => destinyNumber(29, 2, 2000)).not.toThrow();
    expect(() => destinyNumber(29, 2, 1999)).toThrow(InvalidDateError);
  });

  it('never returns NaN', () => {
    const result = destinyNumber(23, 11, 1980);
    expect(Number.isNaN(result.compound)).toBe(false);
    expect(Number.isNaN(result.single)).toBe(false);
  });
});
