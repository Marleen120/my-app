
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground } from 'react-native';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User data:", user);
      AsyncStorage.setItem('currentUser',JSON.stringify(user.email))
      navigation.navigate('DrawerNavigation');
      
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log("User does not exist. Please sign up.");
      } else {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error code:", errorCode);
        console.error("Error message:", errorMessage);
      }
    }
  };

  const handleSignup = async () => {
    navigation.navigate('Signup'); // Navigate to the Signup screen

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User data:", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.error("Error code:", errorCode);
      // console.error("Error message:", errorMessage);
    }
  };

  return (
    <ImageBackground
    source={require('./assets/pic1.jpg')}
    style={styles.background}
  >
  
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <Button title="Login" onPress={handleLogin} />
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Text style={styles.signupLink} onPress={handleSignup}>Signup </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background for text input
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    marginTop:'5%',
    marginRight: '5%',
    fontSize: 16,
    color: 'white',
    textShadowColor: 'black', // Add text shadow color
    textShadowOffset: { width: 2, height: 2 }, // Set text shadow offset
    textShadowRadius: 2, // Set text shadow radius
  },
  
  signupLink: {
    color: 'white',
    marginTop:'5%',
    textDecorationLine: 'underline',
    marginRight:'15%',
    fontSize: 16,
    textShadowColor: 'black', // Add text shadow color
    textShadowOffset: { width: 2, height: 2 }, // Set text shadow offset
    textShadowRadius: 2, // Set text shadow radius
  },
  
});

export default Login;