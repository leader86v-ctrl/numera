import { useColorScheme } from 'react-native';

export interface Theme {
  background: string;
  cardBackground: string;
  cardBorder: string;
  text: string;
  mutedText: string;
  primary: string;
  onPrimary: string;
  disabled: string;
  danger: string;
}

const light: Theme = {
  background: '#ffffff',
  cardBackground: '#ffffff',
  cardBorder: '#dddddd',
  text: '#111111',
  mutedText: '#555555',
  primary: '#2f6feb',
  onPrimary: '#ffffff',
  disabled: '#cccccc',
  danger: '#c0392b',
};

const dark: Theme = {
  background: '#000000',
  cardBackground: '#1c1c1e',
  cardBorder: '#3a3a3c',
  text: '#f2f2f2',
  mutedText: '#a0a0a5',
  primary: '#5b8def',
  onPrimary: '#000000',
  disabled: '#3a3a3c',
  danger: '#ff6b6b',
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? dark : light;
}
