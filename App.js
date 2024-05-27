import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from "react-native";
// import SettingsScreen from './Screens.js/SettingsScreen';
//  import SignupScreen  from './Signupp.js'
// import Login from './Login.js';
// import AllTestsScreen from './Screens.js/Alltests.js';
// import MainHomeScreen from './Screens.js/Home.js';
// import BuyScreen from './Screens.js/BuyScreen.js';
// import BookHomeSampling from './Screens.js/BookHomeSampling.js';
// import CartScreen from './Screens.js/CartScreen.js';
// import AppointmentScreen from './Screens.js/Appointment.js';
// import BookTestsScreen from './Screens.js/BookTests.js';


import BottomTabNavigation from './Navigations/BottomTabNavigation';
import DrawerNavigation from './Navigations/DrawerNavigation';
import AuthNavigation from './Navigations/AuthNavigation'
LogBox.ignoreAllLogs(true);


// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (

  //   <View>
    <NavigationContainer  >

      {/* <BottomTabNavigation/> */}
      {/* <DrawerNavigation/> */}
      <AuthNavigation/>
      
    </NavigationContainer>
    // </View>

  );
}

