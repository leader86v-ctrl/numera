import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CalculationResult } from './calculateResult';
import type { BirthDate } from './dateNumbers';

const STORAGE_KEY = '@numera/history';

export interface HistoryEntry {
  id: string;
  name: string;
  date: BirthDate;
  results: CalculationResult;
  timestamp: number;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

async function readEntries(): Promise<HistoryEntry[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  const parsed: unknown = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
}

async function writeEntries(entries: HistoryEntry[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export async function getHistory(): Promise<HistoryEntry[]> {
  const entries = await readEntries();
  // Entries are stored in insertion order; break same-millisecond timestamp
  // ties by insertion order so "most recent first" is always well-defined.
  return entries
    .map((entry, index) => ({ entry, index }))
    .sort((a, b) => b.entry.timestamp - a.entry.timestamp || b.index - a.index)
    .map(({ entry }) => entry);
}

export async function saveHistoryEntry(entry: {
  name: string;
  date: BirthDate;
  results: CalculationResult;
}): Promise<HistoryEntry> {
  const entries = await readEntries();
  const newEntry: HistoryEntry = {
    ...entry,
    id: generateId(),
    timestamp: Date.now(),
  };
  await writeEntries([...entries, newEntry]);
  return newEntry;
}

export async function deleteHistoryEntry(id: string): Promise<void> {
  const entries = await readEntries();
  await writeEntries(entries.filter((entry) => entry.id !== id));
}
