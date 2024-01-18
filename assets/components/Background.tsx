import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

function Background() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>
          Docs...
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FBF9F1',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Background;
