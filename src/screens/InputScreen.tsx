import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../components/theme';
import type { BirthDate } from '../logic/dateNumbers';

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const CURRENT_YEAR = new Date().getFullYear();
const EARLIEST_YEAR = 1900;
const YEARS = Array.from({ length: CURRENT_YEAR - EARLIEST_YEAR + 1 }, (_, i) => CURRENT_YEAR - i);

const UNSET = '';

function toOptionValue(n: number | null): string {
  return n === null ? UNSET : String(n);
}

function fromOptionValue(value: string): number | null {
  return value === UNSET ? null : Number(value);
}

function isRealCalendarDate(day: number, month: number, year: number): boolean {
  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
}

export interface InputScreenProps {
  initialName?: string;
  initialDate?: BirthDate;
  onCalculate: (name: string, date: BirthDate) => void;
  onViewHistory?: () => void;
}

export function InputScreen({
  initialName = '',
  initialDate,
  onCalculate,
  onViewHistory,
}: InputScreenProps) {
  const theme = useTheme();
  const [name, setName] = useState(initialName);
  const [day, setDay] = useState<number | null>(initialDate?.day ?? null);
  const [month, setMonth] = useState<number | null>(initialDate?.month ?? null);
  const [year, setYear] = useState<number | null>(initialDate?.year ?? null);

  const isDateValid = useMemo(() => {
    if (day === null || month === null || year === null) {
      return false;
    }
    return isRealCalendarDate(day, month, year);
  }, [day, month, year]);

  const canCalculate = name.trim().length > 0 && isDateValid;

  const handleCalculate = () => {
    if (day === null || month === null || year === null || !canCalculate) {
      return;
    }
    onCalculate(name.trim(), { day, month, year });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Full name</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.cardBorder, color: theme.text }]}
        value={name}
        onChangeText={setName}
        placeholder="Full name"
        placeholderTextColor={theme.mutedText}
        accessibilityLabel="Full name"
        autoCapitalize="words"
        testID="name-input"
      />

      <Text style={[styles.label, { color: theme.text }]}>Birth date</Text>
      <View style={styles.dateRow}>
        <Picker
          selectedValue={toOptionValue(day)}
          onValueChange={(value) => setDay(fromOptionValue(value))}
          accessibilityLabel="Birth day"
          testID="day-picker"
          style={styles.picker}
        >
          <Picker.Item label="Day" value={UNSET} />
          {DAYS.map((d) => (
            <Picker.Item key={d} label={String(d)} value={String(d)} />
          ))}
        </Picker>

        <Picker
          selectedValue={toOptionValue(month)}
          onValueChange={(value) => setMonth(fromOptionValue(value))}
          accessibilityLabel="Birth month"
          testID="month-picker"
          style={styles.picker}
        >
          <Picker.Item label="Month" value={UNSET} />
          {MONTHS.map((m) => (
            <Picker.Item key={m.value} label={m.label} value={String(m.value)} />
          ))}
        </Picker>

        <Picker
          selectedValue={toOptionValue(year)}
          onValueChange={(value) => setYear(fromOptionValue(value))}
          accessibilityLabel="Birth year"
          testID="year-picker"
          style={styles.picker}
        >
          <Picker.Item label="Year" value={UNSET} />
          {YEARS.map((y) => (
            <Picker.Item key={y} label={String(y)} value={String(y)} />
          ))}
        </Picker>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Calculate"
        accessibilityState={{ disabled: !canCalculate }}
        disabled={!canCalculate}
        onPress={handleCalculate}
        testID="calculate-button"
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: canCalculate ? theme.primary : theme.disabled },
          pressed && canCalculate && styles.buttonPressed,
        ]}
      >
        <Text
          style={[styles.buttonText, { color: canCalculate ? theme.onPrimary : theme.mutedText }]}
        >
          Calculate
        </Text>
      </Pressable>

      {onViewHistory && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View history"
          onPress={onViewHistory}
          testID="view-history-button"
          style={styles.historyLink}
        >
          <Text style={[styles.historyLinkText, { color: theme.primary }]}>View history</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 8,
  },
  picker: {
    flex: 1,
  },
  button: {
    marginTop: 24,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  historyLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  historyLinkText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
