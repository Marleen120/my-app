import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const AllTestsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTests, setFilteredTests] = useState([]);
  
  const tests = [
    { name: 'Blood Test', description: 'Complete Blood Count (CBC)', price: '1500 PKR' },
    { name: 'Urinalysis', description: 'Urine Test', price: '900 PKR' },
    { name: 'X-Ray', description: 'Radiography', price: '2000 PKR' },
    { name: 'COVID PCR Test', description: 'Polymerase Chain Reaction Test for COVID-19', price: '2500 PKR' },
    { name: 'Fasting Lipid Profile', description: 'Cholesterol and Lipid Levels Test', price: '1200 PKR' },
    { name: 'HbA1c Test', description: 'Glycated Hemoglobin Test', price: '900 PKR' },
    { name: 'HBsAg Test', description: 'Hepatitis B Surface Antigen Test', price: '1000 PKR' },
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
    { name: 'RBC Morphology', description: 'Red Blood Cell Morphology Test', price: '1000 PKR' },
    { name: 'ESR (Erythrocyte Sedimentation Rate)', description: 'Inflammation Marker Test', price: '600 PKR' },
    { name: 'Thyroid Antibodies Test', description: 'Detection of Antibodies against Thyroid', price: '900 PKR' },
    { name: 'Lung Function Test', description: 'Spirometry Test for Lung Function', price: '1300 PKR' },
    { name: 'Bone Density Test', description: 'DEXA Scan for Bone Density Measurement', price: '2000 PKR' },
    { name: 'Glucose Tolerance Test', description: 'Oral Glucose Tolerance Test', price: '1100 PKR' },
    { name: 'Cervical Smear (Pap Smear)', description: 'Screening Test for Cervical Cancer', price: '1000 PKR' },
    { name: 'Thyroid Function Panel', description: 'TSH, T3, T4, and Thyroid Antibodies Test', price: '1700 PKR' },
    { name: 'Coagulation Profile', description: 'Assessment of Blood Clotting Factors', price: '2200 PKR' },
  ];

  useEffect(() => {
    // Initialize filteredTests with tests
    setFilteredTests(tests);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = tests.filter(test =>
      test.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTests(filtered);
  };

  const handleTestSelection = async (test) => {
    try {
      const db = getFirestore(); // Get Firestore instance from your Firebase app
      const testsCollection = collection(db, 'SelectedTests');
      await addDoc(testsCollection, test);
      console.log('Test added to Firestore successfully!');
      navigation.navigate('BuyScreen', { testName: test.name, testPrice: test.price });
    } catch (error) {
      console.error('Error adding test to Firestore:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search tests..."
        onChangeText={handleSearch}
        value={searchQuery}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredTests.map((test, index) => (
          <TouchableOpacity
            key={index}
            style={styles.testItem}
            onPress={() => handleTestSelection(test)}>
            <View style={styles.testInfo}>
              <View>
                <Text style={styles.testName}>{test.name}</Text>
                <Text style={styles.testDescription}>{test.description}</Text>
              </View>
              <View style={styles.cartContainer}>
                <Text style={styles.testPrice}>{test.price}</Text>
                <FontAwesomeIcon name="shopping-cart" size={21} color="black" />
              </View>
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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  testItem: {
    width: '80%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    position: 'relative', // Added position relative
  },
  testInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  testDescription: {
    fontSize: 16,
    marginBottom: 50,
  },
  priceContainer: {
    flexDirection: 'row', // Put price and cart in a row
    alignItems: 'center',
  },
  testPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginRight: 10, // Add margin to separate price from cart
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute', // Position the cart icon absolutely
    bottom: 10,
    right: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'black', // Change text color to black
    backgroundColor: 'white', // Change background color to white
  },
});

export default AllTestsScreen;
