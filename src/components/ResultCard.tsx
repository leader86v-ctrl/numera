import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from './theme';

export interface ResultCardProps {
  title: string;
  compound: number;
  single: number;
  short: string;
  detail: string;
}

export function ResultCard({ title, compound, single, short, detail }: ResultCardProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const value = `${compound}/${single}`;
  const description = expanded ? detail : short;

  return (
    <Pressable
      onPress={() => setExpanded((current) => !current)}
      accessibilityRole="button"
      accessibilityLabel={`${title} number: ${value}. ${description}. ${expanded ? 'Tap to show less.' : 'Tap to show more.'}`}
      testID={`${title.toLowerCase()}-card`}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
        ]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.mutedText }]}>{title}</Text>
          <Text style={[styles.chevron, { color: theme.mutedText }]}>{expanded ? '⌃' : '⌄'}</Text>
        </View>
        <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
        <Text style={[styles.description, { color: theme.text }]}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  chevron: {
    fontSize: 16,
    fontWeight: '700',
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
  },
});
