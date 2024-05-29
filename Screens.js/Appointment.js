import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import useCustomHookEmail from '../UseCustomHookEmail'; // Adjust the import path if needed

const AppointmentScreen = () => {
  const navigation = useNavigation();
  
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { email, setEmail, emailError, handleEmailChange } = useCustomHookEmail(); // Using custom hook for email
  
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [buttonColor, setButtonColor] = useState('lightyellow'); // Default button color
  const [dateLabel, setDateLabel] = useState('Select Date');
  const [timeLabel, setTimeLabel] = useState('Select Time');

  const handleBookAppointment = async () => {
    if (patientName && phoneNumber && email && scheduleDate && selectedTime && validateEmail(email)) {
      setButtonColor('lightgreen'); // Change button color to light green
      const db = getFirestore();

      try {
        await addDoc(collection(db, 'Users'), {
          patientName,
          phoneNumber,
          email,
          scheduleDate: serverTimestamp(),
          selectedTime,
        });

        navigation.navigate('BookTests');
      } catch (error) {
        console.error('Error adding appointment:', error);
      }
    } else {
      setButtonColor('lightyellow'); // Change button color back to light yellow
      alert('Please fill all required fields and provide a valid email.');
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
      setScheduleDate(selectedDate); // Update the selected date
      setDateLabel('Selected Date');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleTimeChange = (itemValue, itemIndex) => {
    setSelectedTime(itemValue); // Update the selected time
    setTimeLabel('Selected Time');
  };

  // Format date function
  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };

  // Generate all times 24/7
  const generateAllTimes = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour < 10 ? '0' : ''}${hour}:${minute === 0 ? '00' : minute}`;
        times.push({ label: timeString, value: timeString });
      }
    }
    return times;
  };

  return (
    <ImageBackground
      source={require('../assets/appointmentbook.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Test Sample Appointment</Text>
        <TextInput
          style={styles.input}
          placeholder="Patient Name"
          placeholderTextColor="grey"
          value={patientName}
          onChangeText={setPatientName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="grey"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
          maxLength={11}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="grey"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        {emailError ? (
          <View style={styles.errorContainer}>
            <FontAwesome name="exclamation-circle" size={20} color="red" style={styles.errorIcon} />
            <Text style={styles.error}>{emailError}</Text>
          </View>
        ) : null}
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text style={{ color: 'grey' }}>{dateLabel}: {formatDate(scheduleDate)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={scheduleDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <View style={styles.input}>
          <Text style={{ color: 'grey' }}>{timeLabel}:</Text>
          <Picker
            selectedValue={selectedTime}
            style={{ height: 50, width: 150 }}
            onValueChange={handleTimeChange} // Pass the handler function directly
          >
            {generateAllTimes().map((timeOption) => (
              <Picker.Item key={timeOption.value} label={timeOption.label} value={timeOption.value} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={handleBookAppointment}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    marginBottom: 15,
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 1,
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
    marginLeft: 10,
    textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginLeft: 5,
    fontSize: 16,
  },
  errorIcon: {
    marginBottom: 10,
    color: 'blue',
  },
});

export default AppointmentScreen;
