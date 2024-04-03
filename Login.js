
import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
      navigation.navigate('Home');
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
      console.error("Error code:", errorCode);
      console.error("Error message:", errorMessage);
    }
  };

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       console.log("Pichle page k function ko call krne k liye")
//     });
//     return unsubscribe;
//   }, [navigation]);

  return (
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
        secureTextEntry={true} // Hide password characters
      />
     <Button title="Login" onPress={handleLogin} />
  <View style={styles.signupContainer}>
    <Text style={styles.signupText}>Don't have an account? </Text>
    <Text style={styles.signupLink} onPress={handleSignup}>Signup</Text>
  </View>
</View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  signupText: {
    marginRight:'10%',
    marginTop: 20,
    fontSize: 16,
    
  },
  signupLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  SignupButton:{
    marginTop:'10%',
  }
});

export default Login;