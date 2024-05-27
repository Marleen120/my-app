import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const BookTestsScreen = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTests, setFilteredTests] = useState([
    { name: 'MRI', description: 'Magnetic Resonance Imaging', price: '5000 PKR' },
    { name: 'CT Scan', description: 'Computed Tomography Scan', price: '4000 PKR' },
    { name: 'X-Ray', description: 'Radiography', price: '2000 PKR' },
    { name: 'Endoscopy', description: 'Internal Examination ', price: '6000 PKR' },
    { name: 'Thyroid Function Test', description: 'TSH, T3, and T4 Levels Test', price: '1500 PKR' },
    { name: 'Renal Function Test', description: 'Kidney Function Test', price: '1400 PKR' },
    { name: 'Liver Function Test', description: 'Liver Enzyme and Bilirubin Levels Test', price: '1100 PKR' },
    { name: 'Electrocardiogram (ECG)', description: 'Heart Electrical Activity Test', price: '1800 PKR' },
    { name: 'Stool Test', description: 'Fecal Occult Blood Test', price: '900 PKR' },
    { name: 'Reticulocyte Count', description: 'Measurement of Immature Red Blood Cells', price: '1000 PKR' },
    { name: 'Malarial Parasite Test', description: 'Identification of Malaria Parasites', price: '700 PKR' },
    { name: 'Coombs Direct Test', description: 'Detection of Antibodies on Red Blood Cells', price: '1000 PKR' },
    { name: 'Bleeding Time Test', description: 'Measurement of Time for Blood to Clot', price: '600 PKR' },
    { name: 'Clotting Time Test', description: 'Measurement of Time for Blood to Clot', price: '600 PKR' },
    { name: 'RH Antibodies Test', description: 'Detection of Antibodies to RH Factor', price: '800 PKR' },
    { name: 'Plasma Glucose Random', description: 'Random Blood Sugar Test', price: '500 PKR' },
    { name: 'Serum Total Bilirubin Test', description: 'Measurement of Bilirubin Levels in Blood', price: '900 PKR' },
    { name: 'Serum Calcium Test', description: 'Measurement of Calcium Levels in Blood', price: '800 PKR' },
  ]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = filteredTests.filter(test =>
      test.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTests(filtered);
  };

  const handleTestSelection = (test) => {
    navigation.navigate('BuyScreen', { testName: test.name, testPrice: test.price });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tests..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
      
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredTests.map((test, index) => (
          <TouchableOpacity
            key={index}
            style={styles.testItem}
            onPress={() => handleTestSelection(test)}>
            <View>
              <Text style={styles.testName}>{test.name}</Text>
              <Text style={styles.testDescription}>{test.description}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.testPrice}>{test.price}</Text>
              <FontAwesomeIcon name="shopping-cart" size={21} color="black" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  testItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    paddingBottom:28,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  testDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  testPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginRight: 10, 
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'white',
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default BookTestsScreen;
