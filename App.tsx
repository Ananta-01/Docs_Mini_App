import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Background from './assets/components/Background';
import Foreground from './assets/components/Foreground';
import { PaperProvider } from 'react-native-paper';
import Cards from './assets/components/Cards';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from './assets/components/LoginPage';



export default function App() {
  const Stack = createNativeStackNavigator();
  return (

    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Background />
          <Foreground />

          {/* <Stack.Navigator  screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginPage} />
          
          </Stack.Navigator> */}
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#265073',
  },
});
