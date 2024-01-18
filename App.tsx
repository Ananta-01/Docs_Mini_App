import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Background from './assets/components/Background';
import Foreground from './assets/components/Foreground';
import { PaperProvider } from 'react-native-paper';
import Cards from './assets/components/Cards';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Background />
        <Foreground />


      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#265073',
  },
});
