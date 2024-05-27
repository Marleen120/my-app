import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const BookHomeSampling = () => {
  const navigation = useNavigation();

  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [address, setAddress] = useState('');
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [scheduleTime, setScheduleTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateLabel, setDateLabel] = useState('Select Date');
  const [timeLabel, setTimeLabel] = useState('Select Time');
  const [buttonColor, setButtonColor] = useState('lightyellow'); // Default button color

  const handleBookAppointment = async () => {
    if (patientName && phoneNumber && email && address && scheduleDate && scheduleTime) {
      if (emailError) {
        alert('Please enter a valid email address.');
        return;
      } 

      const db = getFirestore();

      try {
        await addDoc(collection(db, 'Users'), {
          patientName,
          phoneNumber,
          email,
          address,
          scheduleDate: serverTimestamp(),
          scheduleTime: scheduleTime.getHours() + ':' + scheduleTime.getMinutes(),
        });

        setButtonColor('lightgreen'); // Change button color to light green
        navigation.navigate('Alltests');
      } catch (error) {
        console.error('Error adding data to Firestore:', error);
      }
    } else {
      alert('Please fill all required fields and select a test to add.');
    }
  };

  const handlePhoneNumberChange = (text) => {
    if (/^\d{0,11}$/.test(text)) {
      setPhoneNumber(text);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setScheduleDate(selectedDate);
      setDateLabel('Selected Date');
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const selectedHour = selectedTime.getHours();
      if (selectedHour >= 9 && selectedHour <= 23) {
        setScheduleTime(selectedTime);
        setTimeLabel('Selected Time');
      } else {
        alert('Please select a time between 9 AM and 11:59 PM.');
      }
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setEmailError('Please enter a valid email address. ');
    } else {
      setEmailError('');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/homesample.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>Book Home Sampling</Text>
          <TextInput
            style={styles.input}
            placeholder="Patient Name"
            placeholderTextColor="black"
            value={patientName}
            onChangeText={setPatientName}
            placeholderFontSize={20} 
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="black"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
            maxLength={11}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="black"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
          {emailError ? (
           <View style={styles.errorContainer}>
             <Text style={styles.errorIcon}>⚠️</Text>
             <Text style={styles.error}>{emailError}</Text>
           </View>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Location Address"
            placeholderTextColor="black"
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
            <Text style={{ color: 'black' }}>{dateLabel}: {scheduleDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
            <Text style={{ color: 'black' }}>{timeLabel}: {scheduleTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={scheduleDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={scheduleTime}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
          <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={handleBookAppointment}>
            <Text style={styles.buttonText}>Add Tests & Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: { width: 3, height: 4 },
    textShadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    color: 'black',
    
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  error: {
    color: 'blue',
    marginBottom: 10,
    textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginLeft: 5,
    fontSize:14,
  },
  errorIcon: {
  
    marginBottom:10,
  
    
  },
});
export default BookHomeSampling;