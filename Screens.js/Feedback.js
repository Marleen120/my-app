import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the Icon component

const FeedbackScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleFeedbackSubmission = async () => {
    if (name && email && feedback && validateEmail(email)) {
      setIsLoading(true); // Set loading to true when submitting

      const db = getFirestore();

      try {
        await addDoc(collection(db, 'Feedbacks'), {
          name,
          email,
          feedback,
          timestamp: serverTimestamp() // Add a timestamp for when the feedback was submitted
        });

        setIsLoading(false); // Set loading to false after submission
        alert('Feedback submitted successfully!');
        navigation.navigate('HomeScreen'); // Navigate back to Home screen
      } catch (error) {
        console.error('Error adding feedback to Firestore:', error);
        setIsLoading(false); // Set loading to false if there's an error
        alert('Error submitting feedback. Please try again later.');
      }
    } else {
      alert('Please fill all required fields and provide a valid email address.');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <ImageBackground source={require('../assets/Feedbackbg.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Submit Feedback</Text>
        <Text style={styles.subHeading}>We value your feedback. Please provide your comments below:</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          placeholderTextColor="white"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          placeholderTextColor="white"
          onChangeText={(text) => {
            setEmail(text);
            if (!validateEmail(text)) {
              setEmailError('Please enter a valid email address.');
            } else {
              setEmailError('');
            }
          }}
          keyboardType="email-address"
        />
        {emailError ? (
          <View style={styles.errorContainer}>
            <Icon name="error" size={20} color="yellow" />
            <Text style={styles.error}>{emailError}</Text>
          </View>
        ) : null}
        <TextInput
          style={[styles.input, { height: 150 }]}
          placeholder="Your Feedback"
          placeholderTextColor="white"
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleFeedbackSubmission}>
          {isLoading ? (
            <ActivityIndicator color="white" size="small" /> // Show loader when loading is true
          ) : (
            <Text style={styles.buttonText}>Submit Feedback</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center', // Ensure the content is centered horizontally
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', // Adjust text color for better visibility
    textShadowColor: 'black',
    textShadowOffset: { width: 3, height: 4 },
    textShadowRadius: 2,
  },
  subHeading: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 30,
    width: '100%', // Ensure the input fields take the full width
    color: 'white', // Set the color of the text entered by the user to white
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '70%', // Ensure the button takes the full width
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  error: {
    color: 'yellow',
    marginLeft: 5,
  },
  
});

export default FeedbackScreen;
