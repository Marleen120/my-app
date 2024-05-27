
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import colors from './components/Colors';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import LoginScreen from '../../Screens/Login/LoginScreen';
// import SignupScreen from '../../Screens/SignUp/SignupScreen';
import Login from '../Login';
import Signup from '../Signupp';
import DrawerNavigation from '../Navigations/DrawerNavigation';
import MainPage from '../Screens.js/MainPage';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      

      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} options={{}}/>
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />

    </Stack.Navigator>

    

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
