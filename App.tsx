import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import RecupContra from './Screens/RecupContra';
import VincularMaceta from './Screens/VincularMaceta';
import DashMoni from './Screens/DashMoni';
import DescripcionScreen from './Screens/DescripcionScreen';
import RachaScreen from './Screens/RachaScreen';




const Stack = createStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RecupContra: undefined;
  VincularMaceta: undefined;
  DashMoni: undefined;
  Descripcion: undefined;
  Racha: undefined;
}

const app = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RecupContra" component={RecupContra} />
        <Stack.Screen name="VincularMaceta" component={VincularMaceta} />
        <Stack.Screen name="DashMoni" component={DashMoni} />
        <Stack.Screen name="Descripcion" component={DescripcionScreen} />
        <Stack.Screen name="Racha" component={RachaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
;
export default app;
