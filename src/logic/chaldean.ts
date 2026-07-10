import { reduce } from './reduce';

const CHALDEAN_GROUPS: readonly { value: number; letters: string }[] = [
  { value: 1, letters: 'AIJQY' },
  { value: 2, letters: 'BKR' },
  { value: 3, letters: 'CGLS' },
  { value: 4, letters: 'DMT' },
  { value: 5, letters: 'EHNX' },
  { value: 6, letters: 'UVW' },
  { value: 7, letters: 'OZ' },
  { value: 8, letters: 'FP' },
];

const LETTER_VALUES: Readonly<Record<string, number>> = CHALDEAN_GROUPS.reduce(
  (map, { value, letters }) => {
    for (const letter of letters) {
      map[letter] = value;
    }
    return map;
  },
  {} as Record<string, number>,
);

export function letterValue(char: string): number {
  return LETTER_VALUES[char.toUpperCase()] ?? 0;
}

export function nameValue(name: string): number {
  let sum = 0;
  for (const char of name) {
    sum += letterValue(char);
  }
  return sum;
}

export function nameNumber(name: string): { compound: number; single: number } {
  return reduce(nameValue(name));
}
