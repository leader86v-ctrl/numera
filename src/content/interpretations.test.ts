import { getInterpretation, INTERPRETATIONS } from './interpretations';

describe('INTERPRETATIONS', () => {
  it('covers numbers 1-9 and master compounds 11 and 22', () => {
    const expectedKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22];
    for (const key of expectedKeys) {
      expect(INTERPRETATIONS[key]).toBeDefined();
    }
  });

  it('has a non-empty title and short for every entry', () => {
    for (const entry of Object.values(INTERPRETATIONS)) {
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.short.length).toBeGreaterThan(0);
    }
  });
});

describe('getInterpretation', () => {
  it('returns the master-number entry when compound is 11 or 22', () => {
    expect(getInterpretation(11, 2)).toBe(INTERPRETATIONS[11]);
    expect(getInterpretation(22, 4)).toBe(INTERPRETATIONS[22]);
  });

  it('returns the single-digit entry otherwise', () => {
    expect(getInterpretation(23, 5)).toBe(INTERPRETATIONS[5]);
  });
});
