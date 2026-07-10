import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { InputScreen } from './src/screens/InputScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <InputScreen
        onCalculate={(name, date) => {
          // eslint-disable-next-line no-console
          console.log('Calculate pressed', name, date);
        }}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
