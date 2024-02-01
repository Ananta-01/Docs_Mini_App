// App.js
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './assets/components/LoginPage';
import HomeScreen from './assets/components/HomeScreen';
import RegisterScreen from './assets/components/RegisterScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log('App component rendered. isLoggedIn:', isLoggedIn);

  const handleLogin = () => {
    console.log('Login successful');
    setIsLoggedIn(true);
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {/* {isLoggedIn ? (
              <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
              <>
                <Stack.Screen name="Login">
                  {props => <LoginPage {...props} onLogin={handleLogin} />}
                </Stack.Screen>
                <Stack.Screen
                  name="RegisterScreen"
                  component={RegisterScreen}
                />
              </>
            )} */}
            <Stack.Screen name="Login">
                  {props => <LoginPage {...props} onLogin={handleLogin} />}
                </Stack.Screen>
                <Stack.Screen
                  name="RegisterScreen"
                  component={RegisterScreen}
                />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
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
