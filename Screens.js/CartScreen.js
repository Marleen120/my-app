import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert } from 'react-native';
import { collection, getFirestore, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native'; // Import LottieView
import {  addDoc } from 'firebase/firestore';



const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    const db = getFirestore();

    const unsubscribe = onSnapshot(collection(db, 'Cart'), snapshot => {
      AsyncStorage.getItem('currentUser').then(async (data) => {
        if (data) {
          let parsedData = JSON.parse(data);
          const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const myCartItems = items.filter(item => item.email === parsedData);
          const uniqueItems = getUniqueItems(myCartItems);
          setCartItems(uniqueItems);
          calculateTotalBill(uniqueItems);
        } else {
          console.log("User email not in local DB");
        }
      }).catch(error => console.log(error));
    });

    return () => unsubscribe(); // Unsubscribe from snapshot listener when component unmounts
  }, []); // Fetch cart items on component mount

  const getUniqueItems = (items) => {
    const uniqueItems = [];
    items.forEach(item => {
      if (!uniqueItems.some(uniqueItem => uniqueItem.testName === item.testName)) {
        uniqueItems.push(item);
      }
    });
    return uniqueItems;
  };

  const getQuantity = (item) => {
    return item.quantity || 1; // If quantity is undefined, default to 1
  };

  const calculateTotalBill = (items) => {
    let total = 0;
    items.forEach(item => {
        if (item.testPrice) {
            const price = parseFloat(item.testPrice);
            if (!isNaN(price)) {
                total += price;
            } else {
                console.log(`Invalid test price for item ${item.id}: ${item.testPrice}`);
            }
        } else {
            console.log(`No test price for item ${item.id}`);
        }
    });
    setTotalBill(total);
};


  const increaseQuantity = async (item) => {
    const db = getFirestore();
    const unitPrice = parseFloat(item.testPrice) / getQuantity(item);
    if (!isNaN(unitPrice)) {
      const newQuantity = (item.quantity || 0) + 1;
      const newPrice = unitPrice * newQuantity;
      try {
        await updateDoc(doc(db, 'Cart', item.id), {
          quantity: newQuantity,
          testPrice: `${newPrice.toFixed(2)} PKR`
        });
        const updatedCartItems = cartItems.map(cartItem => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: newQuantity,
              testPrice: `${newPrice.toFixed(2)} PKR`
            };
          }
          return cartItem;
        });
        setCartItems(updatedCartItems);
        calculateTotalBill(updatedCartItems);
      } catch (error) {
        console.log("Error updating quantity:", error);
      }
    } else {
      console.log(`Invalid test price for item ${item.id}: ${item.testPrice}`);
    }
  };
  
  const decreaseQuantity = async (item) => {
    const db = getFirestore();
    const unitPrice = parseFloat(item.testPrice) / getQuantity(item);
    if (!isNaN(unitPrice)) {
      const newQuantity = (item.quantity || 0) - 1;
      if (newQuantity <= 0) {
        removeItem(item.id);
      } else {
        const newPrice = unitPrice * newQuantity;
        try {
          await updateDoc(doc(db, 'Cart', item.id), {
            quantity: newQuantity,
            testPrice: `${newPrice.toFixed(2)} PKR`
          });
          const updatedCartItems = cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: newQuantity,
                testPrice: `${newPrice.toFixed(2)} PKR`
              };
            }
            return cartItem;
          });
          setCartItems(updatedCartItems);
          calculateTotalBill(updatedCartItems);
        } catch (error) {
          console.log("Error updating quantity:", error);
        }
      }
    } else {
      console.log(`Invalid test price for item ${item.id}: ${item.testPrice}`);
    }
  };
  
  const removeItem = async (id) => {
    const db = getFirestore();
    await deleteDoc(doc(db, 'Cart', id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.testName}</Text>
      <Text style={styles.itemPrice}>{item.testPrice}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(item)}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{getQuantity(item)}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item)}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  
  const proceedToCheckout = async () => {
    const db = getFirestore();
    const currentUser = await AsyncStorage.getItem('currentUser');
    
    if (currentUser) {
      const userEmail = JSON.parse(currentUser);
      try {
        const billRef = await addDoc(collection(db, 'Bills'), {
          userEmail: userEmail,
          totalBill: totalBill.toFixed(2) // Assuming you want to store the total bill with 2 decimal places
        });
        console.log("Bill added with ID: ", billRef.id);
        navigation.navigate('CheckoutScreen', { cartItems, totalBill });
      } catch (error) {
        console.error("Error adding bill: ", error);
      }
    } else {
      console.log("User email not found in local storage");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
   <View style={styles.totalBillContainer}>
        <LottieView
          source={require('../assets/bill.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.totalBill}>Total Bill: {totalBill.toFixed(2)} PKR</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={proceedToCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 25,
    },
    listContainer: {
      paddingBottom: 20,
    },
    cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
    },
    itemName: {
      fontSize: 17,
      flex: 1,
    },
    itemPrice: {
      fontSize: 15,
      color: 'green',
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantity: {
      marginHorizontal: 10,
      fontSize: 18,
    },
    totalBillContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // Margin between the total bill and "Proceed to Checkout" button
    },
    animation: {
      width: 50,
      height: 50,
      marginRight: 10, // Spacing between the animation and the total bill text\
      marginLeft:70,
    },
    totalBill: {
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1, // Ensure the total bill text takes remaining space
    },
    checkoutButton: {
      backgroundColor: 'green',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
      marginTop: 20,
    },
    checkoutButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center', // Center the text within the button
    },
    deleteButton: {
      backgroundColor: 'red',
      borderRadius: 5,
      padding: 5,
      marginLeft: 10,
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    quantityButton: {
      backgroundColor: 'green', // Set the background color of the quantity buttons to green
      borderRadius: 5,
      padding: 5,
      marginRight: 5,
      paddingHorizontal:8,
    },
    quantityButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15,
    },
  
  });
  

export default CartScreen;