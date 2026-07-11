import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteHistoryEntry, getHistory, saveHistoryEntry } from './history';

const RESULTS = {
  psychic: { compound: 23, single: 5 },
  destiny: { compound: 25, single: 7 },
  name: { compound: 12, single: 3 },
};

const DATE = { day: 23, month: 11, year: 1980 };

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('saveHistoryEntry / getHistory', () => {
  it('persists an entry with a generated id and timestamp', async () => {
    const saved = await saveHistoryEntry({ name: 'ANNA', date: DATE, results: RESULTS });

    expect(saved.id).toBeTruthy();
    expect(typeof saved.timestamp).toBe('number');
    expect(saved.name).toBe('ANNA');
    expect(saved.date).toEqual(DATE);
    expect(saved.results).toEqual(RESULTS);

    const history = await getHistory();
    expect(history).toHaveLength(1);
    expect(history[0]).toEqual(saved);
  });

  it('returns entries most-recent-first', async () => {
    const first = await saveHistoryEntry({ name: 'ANNA', date: DATE, results: RESULTS });
    const second = await saveHistoryEntry({ name: 'BOB', date: DATE, results: RESULTS });

    const history = await getHistory();
    expect(history.map((entry) => entry.id)).toEqual([second.id, first.id]);
  });

  it('returns an empty list when nothing has been saved', async () => {
    expect(await getHistory()).toEqual([]);
  });
});

describe('deleteHistoryEntry', () => {
  it('removes only the entry with the matching id', async () => {
    const first = await saveHistoryEntry({ name: 'ANNA', date: DATE, results: RESULTS });
    const second = await saveHistoryEntry({ name: 'BOB', date: DATE, results: RESULTS });

    await deleteHistoryEntry(first.id);

    const history = await getHistory();
    expect(history.map((entry) => entry.id)).toEqual([second.id]);
  });
});
