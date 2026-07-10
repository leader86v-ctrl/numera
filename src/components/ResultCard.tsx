import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface ResultCardProps {
  title: string;
  compound: number;
  single: number;
  short: string;
  detail: string;
}

export function ResultCard({ title, compound, single, short, detail }: ResultCardProps) {
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
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});
