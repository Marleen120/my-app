import { useEffect, useState } from 'react';
import booksData from './Books'; // Importing data from the books.js file

const NewCustomHook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Simulating an asynchronous fetch operation
    const fetchData = async () => {
      try {
        // Here you can perform any additional processing if required
        // For now, we'll just set the books data
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData(); // Call the fetch data function
  }, []); // Run the effect only once when the component mounts

  return books;
};

export default NewCustomHook;
