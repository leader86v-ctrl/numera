export interface Interpretation {
  title: string;
  short: string;
  detail: string;
}

export const INTERPRETATIONS: Readonly<Record<number, Interpretation>> = {
  1: {
    title: 'The Leader',
    short: 'Independent, driven, and built to go first.',
    detail:
      'The 1 is the number of the pioneer: independent, ambitious, and self-directed. ' +
      'It carries strong willpower and a natural instinct to lead rather than follow. ' +
      'People strongly touched by this number tend to be original thinkers who trust their ' +
      'own judgment, push projects forward through sheer determination, and feel most alive ' +
      'when carving out new ground rather than maintaining what already exists. The shadow ' +
      'side is a tendency toward stubbornness or impatience with others who move more slowly.',
  },
  2: {
    title: 'The Peacemaker',
    short: 'Sensitive, diplomatic, and built for partnership.',
    detail:
      'The 2 is the number of cooperation: sensitive, intuitive, and deeply attuned to other ' +
      "people's feelings. It thrives in partnership rather than solo pursuit, and brings a " +
      'natural gift for diplomacy, mediation, and reading the room. Those shaped by this number ' +
      'often prefer harmony over confrontation and do their best work supporting or balancing ' +
      'others. The shadow side is a tendency toward indecision or over-dependence on external ' +
      'approval.',
  },
  3: {
    title: 'The Communicator',
    short: 'Expressive, creative, and drawn to being heard.',
    detail:
      'The 3 is the number of self-expression: creative, sociable, and naturally optimistic. ' +
      'It carries a gift for words, art, or performance, and a warmth that draws people in. ' +
      'Those strongly touched by this number tend to process life out loud — through ' +
      'conversation, writing, or making things — and find joy in sharing ideas rather than ' +
      'sitting with them privately. The shadow side is scattered energy or surface-level focus ' +
      'when discipline is lacking.',
  },
  4: {
    title: 'The Builder',
    short: 'Grounded, disciplined, and built to last.',
    detail:
      'The 4 is the number of foundation: practical, disciplined, and steady under pressure. ' +
      'It favors order, method, and hard work over shortcuts, and brings a dependability that ' +
      'others come to rely on. People shaped by this number tend to build things meant to ' +
      'endure — systems, structures, careers — through patient, incremental effort rather than ' +
      'sudden leaps. The shadow side is rigidity or difficulty adapting when plans must change.',
  },
  5: {
    title: 'The Free Spirit',
    short: 'Adaptable, curious, and hungry for change.',
    detail:
      'The 5 is the number of freedom: adaptable, curious, and energized by variety. It resists ' +
      'routine and confinement, and draws people toward travel, change, and new experience. ' +
      'Those strongly touched by this number tend to be quick-thinking and versatile, able to ' +
      'pick up new situations fast, but restless when life feels too settled. The shadow side is ' +
      'impulsiveness or difficulty committing to one path for long.',
  },
  6: {
    title: 'The Nurturer',
    short: 'Caring, responsible, and centered on others.',
    detail:
      'The 6 is the number of care: responsible, warm, and naturally protective of the people ' +
      'around it. It carries a strong pull toward home, family, and community, and a genuine ' +
      'satisfaction in looking after others. Those shaped by this number often become the ' +
      'steady, dependable center of their circle. The shadow side is over-responsibility — ' +
      'taking on burdens that were never theirs to carry, or struggling to set boundaries.',
  },
  7: {
    title: 'The Seeker',
    short: 'Reflective, analytical, and drawn inward.',
    detail:
      'The 7 is the number of the inner life: analytical, intuitive, and drawn to questions ' +
      'beneath the surface. It favors solitude and study over crowds, and often carries a quiet ' +
      'spiritual or philosophical streak. Those strongly touched by this number tend to trust ' +
      'their own research and reflection more than popular opinion, and need real time alone to ' +
      'recharge. The shadow side is isolation or overthinking at the expense of action.',
  },
  8: {
    title: 'The Powerhouse',
    short: 'Ambitious, capable, and built for results.',
    detail:
      'The 8 is the number of material mastery: ambitious, authoritative, and comfortable with ' +
      'responsibility on a large scale. It carries a natural head for business, organization, ' +
      'and getting results, along with the drive to pursue achievement and financial security. ' +
      'Those shaped by this number often rise into positions of authority through sheer ' +
      'competence. The shadow side is workaholism or measuring self-worth purely through ' +
      'achievement.',
  },
  9: {
    title: 'The Humanitarian',
    short: 'Compassionate, idealistic, and thinking beyond the self.',
    detail:
      'The 9 is the number of completion and compassion: idealistic, generous, and concerned ' +
      'with the wellbeing of people beyond its own immediate circle. It carries a broad, ' +
      'big-picture view of the world and a genuine wish to leave things better than it found ' +
      'them. Those strongly touched by this number often feel most fulfilled through service, ' +
      'art, or causes larger than themselves. The shadow side is emotional overextension or ' +
      'disappointment when reality falls short of the ideal.',
  },
  11: {
    title: 'The Illuminator',
    short: 'Intuitive, inspired, and highly sensitive to what others miss.',
    detail:
      "The 11 is a master number: an amplified, more intense version of the 2's sensitivity, " +
      'carrying heightened intuition and a visionary streak. It often brings flashes of insight ' +
      'that arrive faster than logic can explain, and a pull toward inspiring others rather ' +
      'than simply cooperating with them. This intensity is a gift, but it can also run ' +
      'hot — bringing nervous energy, heightened sensitivity to criticism, or a feeling of not ' +
      'quite fitting the ordinary mold. Living up to an 11 tends to mean learning to trust and ' +
      'channel that intuition rather than being overwhelmed by it.',
  },
  22: {
    title: 'The Master Builder',
    short: 'Practical vision on a large scale.',
    detail:
      "The 22 is a master number: an amplified, more ambitious version of the 4's discipline, " +
      'paired with the ability to think in big, structural terms. It carries the rare ' +
      'combination of a grand vision and the patience to actually build it — turning ideas into ' +
      'lasting, tangible results rather than leaving them as dreams. This is a demanding number ' +
      'to carry: the scale of ambition can bring real pressure, and the gap between vision and ' +
      'present reality can feel heavy before the work catches up. Living up to a 22 tends to ' +
      'mean pacing that ambition into steady, achievable steps.',
  },
};

// 11 and 22 are master compounds with their own meaning; every other compound
// is looked up by its fully-reduced single digit (1-9).
export function getInterpretation(compound: number, single: number): Interpretation {
  if (compound === 11 || compound === 22) {
    return INTERPRETATIONS[compound];
  }
  return INTERPRETATIONS[single];
}
