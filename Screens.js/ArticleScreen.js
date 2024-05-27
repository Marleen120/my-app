import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ArticleScreen = ({ route }) => {
  const { article, content } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>{article.title}</Text>
        <Image source={article.image} style={styles.image} />
        <Text style={styles.content}>{content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});

export default ArticleScreen;
