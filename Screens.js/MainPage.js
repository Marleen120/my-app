import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const MainPage = ({ navigation }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace('Signup'); // Replace 'Signup' with the name of your signup screen route
      }, 4000);

      return () => clearTimeout(timer);
    }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.jpeg')} // Assuming your logo image is named 'logo.png' and located in the 'assets' folder
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome to Marleen's Laboratory    </Text>
      <Text style={styles.welcomeText1}>Your health is our priority.   </Text>
      <Text style={styles.loadingText}>Loading...</Text>
      <LottieView
        style={{ width: 200, height: 200 }}
        source={require('../assets/loader.json')} // Assuming your animation file is named 'loader.json' and located in the 'assets' folder
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',



  },
  logo: {
    marginTop:200,
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 10,
    marginTop:20,
    color: 'black',
  },
  welcomeText1: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 24,
    color: 'black',
  },
});

export default MainPage;
