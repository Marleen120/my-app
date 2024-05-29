// styles.js

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 5,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'lightblue',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: 'center',
    marginTop: 40,
  },
  bookNowText: {
    color: 'black',
    textShadowColor: 'lightblue',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  locationText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  serviceButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  serviceButtonRow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '100%',
    height: '130%',
    marginTop: 70,
    marginBottom: 40,
  },
  articlesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleCard: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 200,
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  articleImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
});
