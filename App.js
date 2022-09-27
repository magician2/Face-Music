import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './Components/Splash';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Menu from './Components/Menu';
import CameraPage from './Components/Camera';
import Check from './Components/Check';
import Musicjs from './Components/Musicjs'
import NewPlayer from './Components/NewPlayer';

export default function App( ) {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Camera" component={CameraPage} />
          <Stack.Screen name="Check" component={Check}/>
          <Stack.Screen name="NewPlayer" component={NewPlayer}/>
         
        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaProvider>
     
  );
}
const Stack = createNativeStackNavigator();


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});