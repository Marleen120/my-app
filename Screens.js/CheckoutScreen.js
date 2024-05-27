import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore'; // Import deleteDoc for clearing cart items
import { getAuth } from 'firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Dropdown } from 'react-native-element-dropdown';

const CheckoutScreen = () => {
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cardType, setCardType] = useState('debit');
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();

  const data = [
    { label: 'Debit Card', value: 'debit' },
    { label: 'Credit Card', value: 'credit' },
  ];

  const fetchUserData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const loggedInUserEmail = user.email;
        const db = getFirestore();

        const userQuerySnapshot = await getDocs(query(collection(db, 'Users'), where('email', '==', loggedInUserEmail)));
        let userDataFetched = null;
        userQuerySnapshot.forEach((doc) => {
          userDataFetched = doc.data();
        });
        console.log('Fetched user data:', userDataFetched); // Log fetched user data
        setUserData(userDataFetched);

        const cartQuerySnapshot = await getDocs(query(collection(db, 'Cart'), where('email', '==', loggedInUserEmail)));
        const cartItems = cartQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCartData(cartItems);
      } else {
        console.log('No user is currently logged in.');
      }
    } catch (error) {
      console.error('Error fetching user and cart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleConfirmOrder = async () => {
    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error('No user is currently logged in.');
        return;
      }

      const loggedInUserEmail = user.email;

      // Update payment method for all cart items with the user's email
      const cartQuerySnapshot = await getDocs(query(collection(db, 'Cart'), where('email', '==', loggedInUserEmail)));
      const cartItems = cartQuerySnapshot.docs.map(doc => updateDoc(doc.ref, { paymentMethod }));

      // Clear the cart items from the Firestore
      for (const docSnap of cartQuerySnapshot.docs) {
        await deleteDoc(docSnap.ref);
      }

      setCartData([]); // Clear the cart data in the UI
      setOrderPlaced(true);
      setLoading(false);
    } catch (error) {
      console.error('Error updating payment method in cart:', error);
    }

    // Alerting the user that the order has been placed
    Alert.alert(
      'Order Placed',
      'Your order has been placed successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowAnimation(true); // Show the animation after OK is pressed
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (!loading && !userData) {
      navigation.navigate('BookCheckout');
    }
    console.log('User data:', userData); // Log user data after setting the state
  }, [loading, userData]);

  useEffect(() => {
    if (orderPlaced && animationFinished) {
      navigation.navigate('GoodBye');
    }
  }, [orderPlaced, animationFinished]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/checkoutbg.jpg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Patient Details</Text>
        <View style={styles.userDataContainer}>
          <Text style={styles.userInfo}>Name: {userData?.patientName}</Text>
          <Text style={styles.userInfo}>Email: {userData?.email}</Text>
          <Text style={styles.userInfo}>Address: {userData?.address}</Text>
        </View>
        <Text style={styles.title}>Order Summary</Text>
        <View style={styles.cartDataContainer}>
          {cartData.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Text style={styles.cartItemText}>Selected Test: {item.testName}</Text>
              <Text style={styles.cartItemText}>Quantity: {item.quantity}</Text>
              <Text style={styles.cartItemText}>Price: {item.testPrice}</Text>
            </View>
          ))}
        </View>
        <View style={styles.paymentContainer}>
          <Text style={styles.title}>Select Payment Method</Text>
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'cash' ? styles.selectedPaymentOption : null]}
            onPress={() => setPaymentMethod('cash')}
          >
            <Text>Cash on Delivery   </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'card' ? styles.selectedPaymentOption : null]}
            onPress={() => setPaymentMethod('card')}
          >
            <Text>Pay by Card   </Text>
          </TouchableOpacity>
          {paymentMethod === 'card' && (
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              data={data}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select card type' : '...'}
              placeholderTextColor="black"
              value={cardType}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setCardType(item.value);
                setIsFocus(false);
              }}
            />
          )}
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
      {showAnimation && (
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/checkingout.json')}
            autoPlay
            loop={false}
            onAnimationFinish={() => setAnimationFinished(true)}
            style={styles.animation}
          />
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    marginTop: 30,
    color: 'black',
    textShadowColor: 'lightblue',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  userDataContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  cartDataContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
  },
  cartItem: {
    marginBottom: 10,
  },
  cartItemText: {
    marginBottom: 5,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  animationContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  animation: {
    width: 200,
    height: 200,
  },
  paymentContainer: {
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedPaymentOption: {
    backgroundColor: '#32CD32', // Background color for selected payment method
    marginBottom: 20,
  },
  dropdown: {
    borderColor: 'gray', // Border color for the dropdown
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 20, // Background color for the dropdown
  },
  dropdownContainer: {
    marginTop: 10, // Adjust as needed
  },
});

export default CheckoutScreen;