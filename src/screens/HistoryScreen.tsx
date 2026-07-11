import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../components/theme';
import type { HistoryEntry } from '../logic/history';

export interface HistoryScreenProps {
  entries: HistoryEntry[];
  onSelectEntry: (entry: HistoryEntry) => void;
  onDeleteEntry: (id: string) => void;
  onBack: () => void;
}

function formatDate(entry: HistoryEntry): string {
  const { day, month, year } = entry.date;
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

function formatResults(entry: HistoryEntry): string {
  const { psychic, destiny, name } = entry.results;
  return `${psychic.compound}/${psychic.single} · ${destiny.compound}/${destiny.single} · ${name.compound}/${name.single}`;
}

export function HistoryScreen({
  entries,
  onSelectEntry,
  onDeleteEntry,
  onBack,
}: HistoryScreenProps) {
  const theme = useTheme();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBack}
          testID="history-back-button"
          hitSlop={8}
        >
          <Text style={[styles.backButtonText, { color: theme.primary }]}>‹ Back</Text>
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>History</Text>
        <View style={styles.headerSpacer} />
      </View>

      {entries.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme.mutedText }]}>
          No calculations yet. Numbers you calculate will show up here.
        </Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isConfirming = confirmDeleteId === item.id;
            return (
              <View
                style={[
                  styles.row,
                  { borderColor: theme.cardBorder, backgroundColor: theme.cardBackground },
                ]}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`View ${item.name}'s calculation from ${formatDate(item)}`}
                  onPress={() => {
                    setConfirmDeleteId(null);
                    onSelectEntry(item);
                  }}
                  testID={`history-entry-${item.id}`}
                  style={styles.entryButton}
                >
                  <Text style={[styles.entryName, { color: theme.text }]}>{item.name}</Text>
                  <Text style={[styles.entryDate, { color: theme.mutedText }]}>
                    {formatDate(item)}
                  </Text>
                  <Text style={[styles.entryResults, { color: theme.text }]}>
                    {formatResults(item)}
                  </Text>
                </Pressable>

                {isConfirming ? (
                  <View style={styles.confirmRow}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Cancel delete"
                      onPress={() => setConfirmDeleteId(null)}
                      testID={`history-cancel-delete-${item.id}`}
                      style={styles.deleteButton}
                    >
                      <Text style={[styles.cancelButtonText, { color: theme.mutedText }]}>
                        Cancel
                      </Text>
                    </Pressable>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Confirm delete for ${item.name}'s calculation`}
                      onPress={() => {
                        setConfirmDeleteId(null);
                        onDeleteEntry(item.id);
                      }}
                      testID={`history-confirm-delete-${item.id}`}
                      style={[styles.deleteButton, styles.confirmDeleteButton]}
                    >
                      <Text style={[styles.confirmDeleteButtonText, { color: theme.danger }]}>
                        Delete?
                      </Text>
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${item.name}'s calculation`}
                    onPress={() => setConfirmDeleteId(item.id)}
                    testID={`history-delete-${item.id}`}
                    style={styles.deleteButton}
                  >
                    <Text style={[styles.deleteButtonText, { color: theme.danger }]}>Delete</Text>
                  </Pressable>
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerSpacer: {
    width: 44,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  entryButton: {
    flex: 1,
  },
  entryName: {
    fontSize: 16,
    fontWeight: '700',
  },
  entryDate: {
    fontSize: 14,
    marginTop: 2,
  },
  entryResults: {
    fontSize: 14,
    marginTop: 4,
  },
  confirmRow: {
    flexDirection: 'row',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  deleteButtonText: {
    fontWeight: '600',
  },
  confirmDeleteButton: {
    borderRadius: 8,
  },
  confirmDeleteButtonText: {
    fontWeight: '700',
  },
  cancelButtonText: {
    fontWeight: '600',
  },
});
