import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ResultCard } from '../components/ResultCard';
import { nameNumber } from '../logic/chaldean';
import { destinyNumber, psychicNumber, type BirthDate } from '../logic/dateNumbers';

export interface ResultsScreenProps {
  name: string;
  date: BirthDate;
  onCalculateAgain: () => void;
}

export function ResultsScreen({ name, date, onCalculateAgain }: ResultsScreenProps) {
  const psychic = psychicNumber(date.day);
  const destiny = destinyNumber(date.day, date.month, date.year);
  const nameResult = nameNumber(name);

  return (
    <View style={styles.container}>
      <ResultCard title="Psychic" compound={psychic.compound} single={psychic.single} />
      <ResultCard title="Destiny" compound={destiny.compound} single={destiny.single} />
      <ResultCard title="Name" compound={nameResult.compound} single={nameResult.single} />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Calculate again"
        onPress={onCalculateAgain}
        testID="calculate-again-button"
        style={styles.button}
      >
        <Text style={styles.buttonText}>Calculate again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
