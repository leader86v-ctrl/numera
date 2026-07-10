import { reduce, ReduceInputError } from './reduce';

describe('reduce', () => {
  it('reduces 12 to compound 12, single 3', () => {
    expect(reduce(12)).toEqual({ compound: 12, single: 3 });
  });

  it('leaves a single digit unchanged', () => {
    expect(reduce(7)).toEqual({ compound: 7, single: 7 });
  });

  it('reduces 29 to compound 29, single 2', () => {
    expect(reduce(29)).toEqual({ compound: 29, single: 2 });
  });

  it('collapses a large input into a two-digit compound before reducing to single', () => {
    const result = reduce(1997);
    expect(result.single).toBe(8);
    expect(result.compound).toBeGreaterThanOrEqual(10);
    expect(result.compound).toBeLessThanOrEqual(99);
  });

  it('throws a ReduceInputError for negative input', () => {
    expect(() => reduce(-1)).toThrow(ReduceInputError);
  });

  it('throws a ReduceInputError for non-integer input', () => {
    expect(() => reduce(2.5)).toThrow(ReduceInputError);
  });
});
