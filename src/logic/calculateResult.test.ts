import { calculateResult } from './calculateResult';

describe('calculateResult', () => {
  it('computes psychic, destiny, and name numbers for a person', () => {
    const result = calculateResult('ANNA', { day: 23, month: 11, year: 1980 });

    expect(result).toEqual({
      psychic: { compound: 23, single: 5 },
      destiny: { compound: 25, single: 7 },
      name: { compound: 12, single: 3 },
    });
  });
});
