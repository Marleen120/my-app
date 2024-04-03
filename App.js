import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Screens.js/Home.js';
import SettingsScreen from './Screens.js/SettingsScreen';
 import SignupScreen  from './Signupp.js'
import Login from './Login';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();



function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="signup" component={SignupScreen} />
      
      

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={TabNavigator} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={SignupScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
