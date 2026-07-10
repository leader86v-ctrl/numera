export interface Interpretation {
  title: string;
  short: string;
  detail: string;
}

function placeholder(n: number): Interpretation {
  return {
    title: `TODO(vishal): title for ${n}`,
    short: `TODO(vishal): short interpretation for ${n}`,
    detail: `TODO(vishal): detail interpretation for ${n}`,
  };
}

export const INTERPRETATIONS: Readonly<Record<number, Interpretation>> = {
  1: placeholder(1),
  2: placeholder(2),
  3: placeholder(3),
  4: placeholder(4),
  5: placeholder(5),
  6: placeholder(6),
  7: placeholder(7),
  8: placeholder(8),
  9: placeholder(9),
  11: placeholder(11),
  22: placeholder(22),
};

// 11 and 22 are master compounds with their own meaning; every other compound
// is looked up by its fully-reduced single digit (1-9).
export function getInterpretation(compound: number, single: number): Interpretation {
  if (compound === 11 || compound === 22) {
    return INTERPRETATIONS[compound];
  }
  return INTERPRETATIONS[single];
}
