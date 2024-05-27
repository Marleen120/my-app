import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase auth methods
import { useNavigation } from '@react-navigation/native';

const AppointmentCheckoutScreen = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation(); // Hook to use navigation

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      // Get the current user from Firebase auth
      const auth = getAuth();
      const user = auth.currentUser;

      // Check if user is authenticated
      if (user) {
        // Get user's email
        const loggedInUserEmail = user.email;
        const db = getFirestore();
        const querySnapshot = await getDocs(query(collection(db, 'Users'), where('email', '==', loggedInUserEmail)));
        let userDataFetched = null;
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          userDataFetched = doc.data();
        });
        setUserData(userDataFetched);
      } else {
        console.log('No user is currently logged in.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Fetch user data only once when the component mounts

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <View style={styles.userDataContainer}>
        <Text style={styles.userInfo}>Name: {userData?.patientName}</Text>
        <Text style={styles.userInfo}>Email: {userData?.email}</Text>
        <Text style={styles.userInfo}>Address: {userData?.address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userDataContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AppointmentCheckoutScreen;
