import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { InputScreen } from './src/screens/InputScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { calculateResult } from './src/logic/calculateResult';
import type { BirthDate } from './src/logic/dateNumbers';
import {
  deleteHistoryEntry,
  getHistory,
  saveHistoryEntry,
  type HistoryEntry,
} from './src/logic/history';

interface Entry {
  name: string;
  date: BirthDate;
}

type View = 'input' | 'results' | 'history';

export default function App() {
  const [lastEntry, setLastEntry] = useState<Entry | null>(null);
  const [view, setView] = useState<View>('input');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  const handleCalculate = (name: string, date: BirthDate) => {
    setLastEntry({ name, date });
    setView('results');

    const results = calculateResult(name, date);
    saveHistoryEntry({ name, date, results }).then((saved) => {
      setHistory((current) => [saved, ...current]);
    });
  };

  const handleSelectHistoryEntry = (entry: HistoryEntry) => {
    setLastEntry({ name: entry.name, date: entry.date });
    setView('results');
  };

  const handleDeleteHistoryEntry = (id: string) => {
    setHistory((current) => current.filter((entry) => entry.id !== id));
    deleteHistoryEntry(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {view === 'results' && lastEntry && (
        <ResultsScreen
          name={lastEntry.name}
          date={lastEntry.date}
          onCalculateAgain={() => setView('input')}
        />
      )}
      {view === 'history' && (
        <HistoryScreen
          entries={history}
          onSelectEntry={handleSelectHistoryEntry}
          onDeleteEntry={handleDeleteHistoryEntry}
          onBack={() => setView('input')}
        />
      )}
      {view === 'input' && (
        <InputScreen
          initialName={lastEntry?.name}
          initialDate={lastEntry?.date}
          onCalculate={handleCalculate}
          onViewHistory={() => setView('history')}
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
