import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ResultCard } from '../components/ResultCard';
import { useTheme } from '../components/theme';
import { getInterpretation } from '../content/interpretations';
import { calculateResult } from '../logic/calculateResult';
import type { BirthDate } from '../logic/dateNumbers';

export interface ResultsScreenProps {
  name: string;
  date: BirthDate;
  onCalculateAgain: () => void;
}

function formatDate(date: BirthDate): string {
  const { day, month, year } = date;
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

export function ResultsScreen({ name, date, onCalculateAgain }: ResultsScreenProps) {
  const theme = useTheme();
  const { psychic, destiny, name: nameResult } = calculateResult(name, date);

  const psychicInterpretation = getInterpretation(psychic.compound, psychic.single);
  const destinyInterpretation = getInterpretation(destiny.compound, destiny.single);
  const nameInterpretation = getInterpretation(nameResult.compound, nameResult.single);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.text }]}>Your Numbers</Text>
      <Text style={[styles.context, { color: theme.mutedText }]}>
        For {name} · born {formatDate(date)}
      </Text>

      <ResultCard
        title="Psychic"
        compound={psychic.compound}
        single={psychic.single}
        short={psychicInterpretation.short}
        detail={psychicInterpretation.detail}
      />
      <ResultCard
        title="Destiny"
        compound={destiny.compound}
        single={destiny.single}
        short={destinyInterpretation.short}
        detail={destinyInterpretation.detail}
      />
      <ResultCard
        title="Name"
        compound={nameResult.compound}
        single={nameResult.single}
        short={nameInterpretation.short}
        detail={nameInterpretation.detail}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Calculate again"
        onPress={onCalculateAgain}
        testID="calculate-again-button"
        style={[styles.button, { backgroundColor: theme.cardBorder }]}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>Calculate again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  context: {
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
