import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

 import SignupScreen  from '../Signupp.js';
import Login from '../Login.js';
import AllTestsScreen from '../Screens.js/Alltests.js';
import MainHomeScreen from '../Screens.js/Home.js';
import BuyScreen from '../Screens.js/BuyScreen.js';
import BookHomeSampling from '../Screens.js/BookHomeSampling.js';
import CartScreen from '../Screens.js/CartScreen.js';
import AppointmentScreen from '../Screens.js/Appointment.js';
import BookTestsScreen from '../Screens.js/BookTests.js';

import BottomTabNavigation from './BottomTabNavigation.js';
import LogoutScreen from '../Screens.js/Logout.js';




const Drawer = createDrawerNavigator();


export default function DrawerNavigation() {
  return (
    <Drawer.Navigator >
       
        <Drawer.Screen name="Home." component={BottomTabNavigation} />
  
        <Drawer.Screen name="Logout" component={LogoutScreen} />

    </Drawer.Navigator>



  );
}
