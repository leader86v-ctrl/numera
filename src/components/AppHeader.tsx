import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from './theme';

export interface AppHeaderProps {
  onViewHistory?: () => void;
}

export function AppHeader({ onViewHistory }: AppHeaderProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: theme.cardBorder }]}>
      <Text style={[styles.title, { color: theme.text }]}>Numera</Text>
      {onViewHistory && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View history"
          onPress={onViewHistory}
          testID="view-history-button"
          hitSlop={8}
        >
          <Text style={[styles.historyLink, { color: theme.primary }]}>History</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  historyLink: {
    fontSize: 15,
    fontWeight: '600',
  },
});
