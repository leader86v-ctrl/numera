import { StyleSheet, Text, View } from 'react-native';

export interface ResultCardProps {
  title: string;
  compound: number;
  single: number;
}

export function ResultCard({ title, compound, single }: ResultCardProps) {
  const value = `${compound}/${single}`;

  return (
    <View style={styles.card} accessible accessibilityLabel={`${title} number: ${value}`}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
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
});
