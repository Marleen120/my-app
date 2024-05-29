import React, { useEffect, useState } from 'react';
import { View, Text,  TouchableOpacity, Image, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';
import CustomButton from '../CustomButtons';
import { styles } from '../Styles';
const MainHomeScreen = ({ navigation }) => {
  const [locationName, setLocationName] = useState(null);

  const articles = [
    { title: "Calcium deficiency", content: "Content of article 1", image: require('../assets/calcium.jpg') },
    { title: "Medical technology", content: "Content of article 2", image: require('../assets/meditech.jpg') },
    { title: "Arising heart diseases", content: "Content of article 3", image: require('../assets/heart.jpg') },
    { title: "Covid vaccines", content: "Content of article 4", image: require('../assets/covid.jpg') }
  ];

  const articleContent = {
    "Content of article 1": 
      "Calcium Deficiency:\n\n" +
      "Introduction:\n" +
      "Calcium deficiency, also known as hypocalcemia, refers to a deficiency of calcium in the body. Calcium is an essential mineral required for various physiological processes, including bone formation, muscle contraction, nerve signaling, and blood clotting.\n\n" +
      "Symptoms:\n" +
      "Symptoms of calcium deficiency may include muscle cramps, numbness or tingling in the fingers and toes, fatigue, and brittle nails. Severe cases can lead to osteoporosis, a condition characterized by weak and brittle bones.\n\n" +
      "Prevention and Management:\n" +
      "Adequate intake of calcium-rich foods such as dairy products, leafy greens, and fortified foods, as well as supplements if necessary, can help prevent and manage calcium deficiency.\n",
  
    "Content of article 2": 
      "Medical Technology:\n\n" +
      "Introduction:\n" +
      "Medical technology encompasses a wide range of tools, techniques, and equipment used in healthcare to diagnose, monitor, and treat diseases and medical conditions.\n\n" +
      "Advances:\n" +
      "Advances in medical technology have revolutionized healthcare delivery, enabling more accurate diagnoses, less invasive procedures, and better patient outcomes. Examples of medical technology include imaging modalities like MRI and CT scans, diagnostic tests such as blood tests and genetic screenings, therapeutic devices like pacemakers and insulin pumps, and telemedicine platforms that allow remote patient monitoring and consultations.\n\n" +
      "Promise of Innovation:\n" +
      "Continued innovation in medical technology holds the promise of further improving healthcare accessibility, efficiency, and effectiveness.\n",
  
    "Content of article 3": 
      "Arising Heart Diseases:\n\n" +
      "Introduction:\n" +
      "Arising heart diseases are conditions that affect the structure or function of the heart and blood vessels, leading to symptoms such as chest pain, shortness of breath, palpitations, and fatigue.\n\n" +
      "Common Conditions:\n" +
      "Common heart diseases include coronary artery disease, heart failure, arrhythmias, and valvular heart disease. Risk factors for heart diseases include high blood pressure, high cholesterol, smoking, obesity, diabetes, and a sedentary lifestyle.\n\n" +
      "Prevention and Management:\n" +
      "Prevention strategies include adopting a healthy diet, regular exercise, smoking cessation, stress management, and medication adherence for underlying conditions. Early detection and treatment are crucial for managing heart diseases and reducing the risk of complications.\n",
  
    "Content of article 4": 
      "Covid Vaccines:\n\n" +
      "Introduction:\n" +
      "Covid vaccines are vaccines developed to provide immunity against the novel coronavirus, SARS-CoV-2, which causes coronavirus disease 2019 (COVID-19).\n\n" +
      "Importance:\n" +
      "Vaccines play a critical role in controlling the spread of infectious diseases by stimulating the immune system to recognize and fight off pathogens. Several COVID-19 vaccines have been authorized for emergency use worldwide, including mRNA vaccines, viral vector vaccines, and protein subunit vaccines.\n\n" +
      "Safety and Efficacy:\n" +
      "These vaccines have undergone rigorous testing in clinical trials to ensure safety and efficacy. Vaccination campaigns aim to achieve herd immunity, where a sufficient proportion of the population is immune to the virus, thereby reducing transmission and protecting vulnerable individuals from severe illness and death.\n"
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Location permission not granted');
      }
      console.log("Location permission granted");
      getLocation();
    } catch (error) {
      console.error('Error requesting location permission:', error.message);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
      await getLocationName(latitude, longitude);
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const getLocationName = async (latitude, longitude) => {
    try {
      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (geocode.length > 0) {
        const { city, country } = geocode[0];
        const locationName = `${city}, ${country}`;
        setLocationName(locationName);
        console.log('Location Name:', locationName);
        navigation.navigate('HomeScreen', { locationName });
      }
    } catch (error) {
      console.log('Error fetching location name:', error);
    }
  };

  const navigateToService = (service, article) => {
    switch (service) {
      case 'Book Home Sampling':
        navigation.navigate('BookHomeSampling');
        break;
      case 'All Tests':
        navigation.navigate('Alltests');
        break;
      case 'Book Appointment':
        navigation.navigate('BookAppointment');
        break;
      case 'Book Doctor Appointment':
        navigation.navigate('Feedback');
        break;
      case 'Article':
        navigation.navigate('ArticleScreen', { article: article, content: articleContent[article.content] });
        break;
      default:
        break;
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../assets/Animation.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.sliderText}>Lab tests made available at your door step</Text>
        <Text style={styles.bookNowText}>Book Now!</Text>
        {/* {locationName && <Text style={styles.locationText}>Current Location: {locationName}</Text>} */}
      </View>
{/* CUSTOM BUTTON */}
      <View style={styles.serviceButtonsContainer}>
        <View style={styles.serviceButtonRow}>
          <CustomButton 
            iconSource={require('../assets/homee.jpg')} 
            text="Home Sampling" 
            onPress={() => navigateToService('Book Home Sampling')} 
          />
          <CustomButton 
            iconSource={require('../assets/test.jpg')} 
            text="Tests" 
            onPress={() => navigateToService('All Tests')} 
          />
        </View>

        <View style={styles.serviceButtonRow}>
          <CustomButton 
            iconSource={require('../assets/appointment.jpg')} 
            text="Book Appointment" 
            onPress={() => navigateToService('Book Appointment')} 
          />
          <CustomButton 
            iconSource={require('../assets/doctors.jpg')} 
            text="Feedback" 
            onPress={() => navigateToService('Book Doctor Appointment')} 
          />
        </View>
      </View>

      {/* CUSTOM FLAT LIST  */}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.articlesContainer}>
        {articles.map((article, index) => (
          <TouchableOpacity key={index} style={styles.articleCard} onPress={() => navigateToService('Article', article)}>
            <Image source={article.image} style={styles.articleImage} />
            <Text style={styles.articleTitle}>{article.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingTop: 5,
//   },
//   textContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sliderText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'lightblue',
//     textShadowColor: 'black',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 1,
//     textAlign: 'center',
//     marginTop:40,
//   },
//   bookNowText: {
//     color: 'black',
//     textShadowColor: 'lightblue',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 1,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   locationText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: 'gray',
//   },
//   sliderContainer: {
//     width: '100%',
//     height: 190,
//     marginBottom: 16,
//   },
//   sliderImage: {
//     width: '100%',
//     height: '80%',
//     resizeMode: 'cover',
//   },
//   serviceButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   serviceButtonRow: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   animationContainer: {
//     width: '100%',
//     height: 200,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   animation: {
//     width: '100%',
//     height: '130%',
//     marginTop: 70,
//     marginBottom: 40,
//   },
//   articlesContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   articleCard: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 10,
//     marginRight: 10,
//     width: 200,
//   },
//   articleTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   articleContent: {
//     fontSize: 14,
//   },
//   articleImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 10,
//     marginBottom: 5,
//   },
// });

export default MainHomeScreen;
