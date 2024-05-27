import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo vector icons
import CartScreen from '../Screens.js/CartScreen.js';
import HomeStackNavigation from './HomeStackNavigation.jsx';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Set icon name based on route name
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CartScreen') {
            iconName = focused ? 'cart' : 'cart-outline';
          } 
          
          // Return Ionicons component with appropriate icon name
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue', // Migrate tabBarOptions here
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{ display: 'flex' }, null],
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigation} options={{headerShown:false}} />
      <Tab.Screen name="CartScreen" component={CartScreen} />
    </Tab.Navigator>
  );
}
