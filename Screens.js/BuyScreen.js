import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import { collection, addDoc, getFirestore, query, where, getDocs, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BuyScreen = ({ navigation, route }) => {
  const { testName, testPrice } = route.params || {};
  const [addedToCart, setAddedToCart] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false); // State to control animation visibility

  const navigateToAllTests = () => {
    setAddedToCart(false);
    navigation.navigate('Alltests');
  };

  const addToCart = async () => {
    try {
      const db = getFirestore();
      const cartCollection = collection(db, 'Cart');

      const userEmail = await AsyncStorage.getItem('currentUser');
      const parsedUserEmail = JSON.parse(userEmail);

      // Check if the item is already in the cart
      const q = query(cartCollection, where('email', '==', parsedUserEmail), where('testName', '==', testName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If the item is already in the cart, update the quantity
        querySnapshot.forEach(async (docSnapshot) => {
          const cartItem = docSnapshot.data();
          const newQuantity = (cartItem.quantity || 1) + 1;
          await updateDoc(docSnapshot.ref, { quantity: newQuantity });
        });
      } else {
        // If the item is not in the cart, add it with quantity 1
        await addDoc(cartCollection, { testName, testPrice, email: parsedUserEmail, quantity: 1 });
      }

      console.log('Test added to cart successfully!');
      setAddedToCart(true);

      Alert.alert(
        'Success',
        'Test successfully added to the cart!',
        [
          {
            text: 'OK',
            onPress: () => {
              setAddedToCart(true);
              setShowAnimation(true); // Set showAnimation to true when OK is pressed
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error adding test to cart:', error);
    }
  };

  const navigateToCart = () => {
    navigation.navigate('CartScreen');
  };

  return (
    <ImageBackground source={require('../assets/buy.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.testDetails}>
          <Text style={styles.testName}>{testName}</Text>
          <Text style={styles.testPrice}>{testPrice}</Text>
        </View>

        <TouchableOpacity style={styles.buyButton} onPress={addToCart}>
          <Text style={styles.buyButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewCartButton} onPress={navigateToCart}>
          <Text style={styles.viewCartButtonText}>View Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton} onPress={navigateToAllTests}>
          <Text style={styles.buyButtonText}>Add Another Test</Text>
        </TouchableOpacity>

        {addedToCart && showAnimation && ( // Display animation if addedToCart and showAnimation are both true
          <View style={styles.cartAlert}>
            <LottieView
              source={require('../assets/cartalert.json')}
              autoPlay
              loop={false}
              style={{ width: 300, height: 160 }}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  testDetails: {
    marginBottom: 20,
    marginTop: 90,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  testPrice: {
    textAlign: 'center',
    fontSize: 16,
    color: 'green',
  },
  buyButton: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
  buyButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewCartButton: {
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
  viewCartButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartAlert: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default BuyScreen;
