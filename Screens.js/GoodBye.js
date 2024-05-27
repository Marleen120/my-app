import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const GoodByeScreen = ({ navigation }) => {
  const handleFeedbackNavigation = () => {
    navigation.navigate('Feedback'); // Navigate to the Feedback screen
  };

  const handleHomeNavigation = () => {
    navigation.navigate('HomeScreen'); // Navigate to the Home screen
  };

  const handleLogoutNavigation = () => {
    // Your logout logic here...
 
    // For example, you can clear user authentication state and navigate to the Login screen
    navigation.navigate('Logout');
  };

  return (
    <ImageBackground source={require('../assets/goodbyebg.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Thank you for choosing Marleen's Lab! </Text>
        <Text style={styles.message}>
          Make sure to book your tests timely to keep a check on your health. We're happy to help you!
          Drop your feedbacks to let us better our performance.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleFeedbackNavigation}>
          <Text style={styles.buttonText}>Give Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleHomeNavigation}>
          <Text style={styles.buttonText}>Go Back To Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogoutNavigation}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop:20,
    borderColor:'black',
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoodByeScreen;
