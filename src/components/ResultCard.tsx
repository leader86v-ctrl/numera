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
      accessibilityLabel={`${title} number: ${value}. ${description}`}
      testID={`${title.toLowerCase()}-card`}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
        ]}
      >
        <Text style={[styles.title, { color: theme.mutedText }]}>{title}</Text>
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
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
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
