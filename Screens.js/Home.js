import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
import NewCustomHook from './NewCustomHook';
import booksData from './Books'; // Renamed to avoid variable name conflict

const Home = () => {
  const allBooks = NewCustomHook(booksData); // Fetch all books
  const [books, setBooks] = useState(allBooks); // Initial state with all books
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredBooks = allBooks.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  // Render a loading indicator if data is not available yet
  if (!books) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search books..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.id ? item.id.toString() : ''} {"         "} {item.title}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Use index as key if id is undefined
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    padding: 10,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default Home;
