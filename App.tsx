// App.js

import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Background from './assets/components/Background';
import Foreground from './assets/components/Foreground';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
       <Background />
      <Foreground/> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#265073',
  },
});
