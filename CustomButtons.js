// components/CustomButton.js
import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

const CustomButton = ({ iconSource, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.serviceButton} onPress={onPress}>
      <View style={styles.iconBox}>
        <Image source={iconSource} style={styles.icon} />
      </View>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.serviceButtonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceButton: {
    alignItems: 'center',
    marginBottom: 20,
    width: '45%',
    marginTop: 40,
  },
  serviceButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  iconBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  buttonTextContainer: {
    width: 100,
  },
});

export default CustomButton;
