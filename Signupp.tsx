import React, { Component } from 'react';
import { View, Button, Text, TextInput, StyleSheet, ImageBackground, Alert } from 'react-native';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
//SIGNUP TSX + CLASS COMPONENT

interface SignupProps {
  navigation: any; // Adjust according to your navigation type if needed
}

interface SignupState {
  email: string;
  password: string;
}

class Signup extends Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSignup = async () => {
    const { email, password } = this.state;

    // Regular expression to check for at least one digit and one alphabet character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!passwordRegex.test(password)) {
      Alert.alert("Error", "Password must be at least 6 characters long and contain at least one letter and one digit.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);
      Alert.alert("Success", "User registered successfully!");
      this.props.navigation.navigate('Login'); // Navigate to the Login screen after successful signup
    } catch (error: any) {
      const errorMessage = error.message;
      console.error("Signup error:", errorMessage);
      Alert.alert("Error", errorMessage);
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('./assets/pic2.jpg')} // Adjust the path to your background image
        style={styles.background}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={true} // Hide password characters
          />
          <Button title="Signup" onPress={this.handleSignup} />
          <View style={styles.signupContainer}>
            <Text style={styles.login}>Already have an account? </Text>
            <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('Login')}>Login  </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

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
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  login: {
    marginTop: '5%',
    marginRight: '5%',
    fontSize: 16,
    color: 'white',
    textShadowColor: 'blue', // Add text shadow color
  },
  loginText: {
    marginTop: '5%',
    marginRight: '5%',
    fontSize: 16,
    color: 'white',
    textShadowColor: 'blue', // Add text shadow color
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    // textDecorationLine: 'underline', // Underline the text
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
});

export default Signup;
