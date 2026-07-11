import { fireEvent, render } from '@testing-library/react-native';
import type { HistoryEntry } from '../logic/history';
import { HistoryScreen } from './HistoryScreen';

const ENTRIES: HistoryEntry[] = [
  {
    id: 'entry-1',
    name: 'ANNA',
    date: { day: 23, month: 11, year: 1980 },
    results: {
      psychic: { compound: 23, single: 5 },
      destiny: { compound: 25, single: 7 },
      name: { compound: 12, single: 3 },
    },
    timestamp: 1000,
  },
  {
    id: 'entry-2',
    name: 'BOB',
    date: { day: 1, month: 1, year: 1990 },
    results: {
      psychic: { compound: 1, single: 1 },
      destiny: { compound: 11, single: 2 },
      name: { compound: 8, single: 8 },
    },
    timestamp: 2000,
  },
];

describe('HistoryScreen', () => {
  it('shows an empty state when there are no entries', async () => {
    const { getByText } = await render(
      <HistoryScreen
        entries={[]}
        onSelectEntry={() => {}}
        onDeleteEntry={() => {}}
        onBack={() => {}}
      />,
    );

    expect(getByText(/No calculations yet/)).toBeTruthy();
  });

  it('lists every entry with its name, date, and results', async () => {
    const { getByTestId } = await render(
      <HistoryScreen
        entries={ENTRIES}
        onSelectEntry={() => {}}
        onDeleteEntry={() => {}}
        onBack={() => {}}
      />,
    );

    expect(getByTestId('history-entry-entry-1')).toHaveTextContent('ANNA', { exact: false });
    expect(getByTestId('history-entry-entry-2')).toHaveTextContent('BOB', { exact: false });
  });

  it('calls onSelectEntry with the tapped entry', async () => {
    const onSelectEntry = jest.fn();
    const { getByTestId } = await render(
      <HistoryScreen
        entries={ENTRIES}
        onSelectEntry={onSelectEntry}
        onDeleteEntry={() => {}}
        onBack={() => {}}
      />,
    );

    await fireEvent.press(getByTestId('history-entry-entry-1'));

    expect(onSelectEntry).toHaveBeenCalledWith(ENTRIES[0]);
  });

  it('requires a confirm tap before calling onDeleteEntry', async () => {
    const onDeleteEntry = jest.fn();
    const { getByTestId, queryByTestId } = await render(
      <HistoryScreen
        entries={ENTRIES}
        onSelectEntry={() => {}}
        onDeleteEntry={onDeleteEntry}
        onBack={() => {}}
      />,
    );

    await fireEvent.press(getByTestId('history-delete-entry-2'));
    expect(onDeleteEntry).not.toHaveBeenCalled();
    expect(queryByTestId('history-confirm-delete-entry-2')).toBeTruthy();

    await fireEvent.press(getByTestId('history-confirm-delete-entry-2'));
    expect(onDeleteEntry).toHaveBeenCalledWith('entry-2');
  });

  it('cancels the pending delete without calling onDeleteEntry', async () => {
    const onDeleteEntry = jest.fn();
    const { getByTestId, queryByTestId } = await render(
      <HistoryScreen
        entries={ENTRIES}
        onSelectEntry={() => {}}
        onDeleteEntry={onDeleteEntry}
        onBack={() => {}}
      />,
    );

    await fireEvent.press(getByTestId('history-delete-entry-2'));
    await fireEvent.press(getByTestId('history-cancel-delete-entry-2'));

    expect(onDeleteEntry).not.toHaveBeenCalled();
    expect(queryByTestId('history-confirm-delete-entry-2')).toBeNull();
    expect(getByTestId('history-delete-entry-2')).toBeTruthy();
  });

  it('calls onBack when the back button is pressed', async () => {
    const onBack = jest.fn();
    const { getByTestId } = await render(
      <HistoryScreen
        entries={ENTRIES}
        onSelectEntry={() => {}}
        onDeleteEntry={() => {}}
        onBack={onBack}
      />,
    );

    await fireEvent.press(getByTestId('history-back-button'));

    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
