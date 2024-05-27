import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native'; // Import LottieView

const LogoutScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false); // State to track button press

  const handleLogout = () => {
    setLoading(true); // Show loader
    setIsPressed(true); // Change button color to green
    // Simulate logout process (clear local storage, reset user state, etc.)
    setTimeout(() => {
      navigation.replace('Login'); // Navigate to the login screen after logout
    }, 2000); // Simulating a delay for demonstration purposes
  };

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../assets/Animation1.json')} // Path to your Lottie animation JSON file
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.text}> Come back soon, we will miss you! </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, isPressed && styles.buttonPressed]} // Apply buttonPressed style if button is pressed
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.text}> Logging out... </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  animationContainer: {
    width: '100%',
    height: 200, // Adjust the height as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    alignItems: 'center',
  },
  text: {
    marginTop: 20, // Add more margin to prevent cut-off
    fontSize: 20, // Increase font size
    color: 'black',
  },
  button: {
    marginTop: 90, // Add margin to separate the button from the animation
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    borderColor: 'black', // Add black border color
    borderWidth: 2,
    marginBottom:20,
  },
  buttonPressed: {
    backgroundColor: 'green', // Change button background color to green when pressed
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  animation: {
    width: '100%',
    height: '130%',
  },
});

export default LogoutScreen;
