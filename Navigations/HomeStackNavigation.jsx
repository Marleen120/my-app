import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 


// ************************************************ Importing own components *************************************************************

import HomeScreen from '../Screens.js/Home'
import Alltests from '../Screens.js/Alltests'
import BookHomeSampling from '../Screens.js/BookHomeSampling'
import BuyScreen from '../Screens.js/BuyScreen';
import BookTests from '../Screens.js/BookTests';
import AppointmentScreen from '../Screens.js/Appointment';
import CheckoutScreen from '../Screens.js/CheckoutScreen';
import BookCheckout from '../Screens.js/BookCheckout';
import LogoutScreen from '../Screens.js/Logout';
import ArticleScreen from '../Screens.js/ArticleScreen';
import FeedbackScreen from '../Screens.js/Feedback';
import CartScreen from '../Screens.js/CartScreen';
import GoodByeScreen from '../Screens.js/GoodBye';


const Stack = createStackNavigator();

export default function HomeStackNavigation() {
  return (

    <Stack.Navigator screenOptions={{ headerShown: true}}>

<Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          
          options={({ route }) => ({
            headerStyle: { backgroundColor: 'lightblue' },
            title: route.params?.locationName || 'Home', // Use a dynamic title based on route params
          })}
        />


        <Stack.Screen name="Alltests" component={Alltests} />
        <Stack.Screen name="BookAppointment" component={AppointmentScreen} />
        <Stack.Screen name="BookTests" component={BookTests } />
        <Stack.Screen name="BookHomeSampling" component={BookHomeSampling } />
        <Stack.Screen name="BuyScreen" component={BuyScreen } />
        <Stack.Screen name="Feedback" component={FeedbackScreen}  options={{ headerStyle: { backgroundColor: 'lightblue' } }}/>
        <Stack.Screen name="Cart" component={CartScreen}  options={{ headerStyle: { backgroundColor: 'lightblue' } }}/>
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen}  options={{ headerStyle: { backgroundColor: 'lightblue' } }}/>
        <Stack.Screen name="BookCheckout" component={BookCheckout} />
        <Stack.Screen name="Logout" component={LogoutScreen}  />
        <Stack.Screen name="ArticleScreen" component={ArticleScreen}  options={{ headerStyle: { backgroundColor: 'lightblue' } }}/>
        <Stack.Screen name="GoodBye" component={GoodByeScreen} />





      </Stack.Navigator>
    
  )
}