import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { InputScreen } from './src/screens/InputScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import type { BirthDate } from './src/logic/dateNumbers';

interface Entry {
  name: string;
  date: BirthDate;
}

export default function App() {
  const [lastEntry, setLastEntry] = useState<Entry | null>(null);
  const [showResults, setShowResults] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {showResults && lastEntry ? (
        <ResultsScreen
          name={lastEntry.name}
          date={lastEntry.date}
          onCalculateAgain={() => setShowResults(false)}
        />
      ) : (
        <InputScreen
          initialName={lastEntry?.name}
          initialDate={lastEntry?.date}
          onCalculate={(name, date) => {
            setLastEntry({ name, date });
            setShowResults(true);
          }}
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
