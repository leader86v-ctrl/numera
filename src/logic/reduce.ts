export class ReduceInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ReduceInputError';
  }
}

function digitSum(value: number): number {
  let sum = 0;
  let remaining = value;
  while (remaining > 0) {
    sum += remaining % 10;
    remaining = Math.floor(remaining / 10);
  }
  return sum;
}

export function reduce(n: number): { compound: number; single: number } {
  if (!Number.isInteger(n) || n < 0) {
    throw new ReduceInputError(`reduce() requires a non-negative integer, got ${n}`);
  }

  // Compound numbers are conventionally in the 1-99 range; larger inputs
  // (e.g. a full birth-year digit sum) collapse into that range first.
  let compound = n;
  while (compound > 99) {
    compound = digitSum(compound);
  }

  let single = compound;
  while (single > 9) {
    single = digitSum(single);
  }

  return { compound, single };
}
