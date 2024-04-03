import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);
      Alert.alert("Success", "User registered successfully!");
      navigation.navigate('Login'); // Navigate to the Login screen after successful signup
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Signup error:", errorCode, errorMessage);
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email} 
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true} // Hide password characters
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
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
});

export default Signup;
