// HomeScreen.tsx
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Background from './Background';
import Foreground from './Foreground';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ route }:any) => {
  const { params } = route;
  const userId = params ? params.id : null;

  console.log('User ID:', userId);
  const isFocused = useIsFocused();
  console.log('HomeScreen focused:', isFocused);

  useEffect(() => {
    console.log('HomeScreen rendered');
    
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Background />
      <Foreground userId={userId} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#265073',
    },
  });