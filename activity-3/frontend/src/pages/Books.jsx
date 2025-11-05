import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/Bookcard";
import Button from "../components/Button";
import { FaBookOpen } from 'react-icons/fa';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for testing design
  const mockBooks = [
    {
      _id: '1',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      publishedYear: 1960
    },
    {
      _id: '2',
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      publishedYear: 1949
    },
    {
      _id: '3',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      publishedYear: 1813
    },
    {
      _id: '4',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      publishedYear: 1925
    },
    {
      _id: '5',
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling',
      genre: 'Fantasy',
      publishedYear: 1997
    },
    {
      _id: '6',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      publishedYear: 1937
    }
  ];

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/books");
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);    
      setBooks(mockBooks);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
          <FaBookOpen className="inline mr-2" size={32} /> My Book Collection
        </h1>
        <Link to="/add-book">
          <Button>+ Add New Book</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: 'var(--color-text)' }}>Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>No books in your collection yet.</p>
          <Link to="/add-book">
            <Button>Add Your First Book</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-start">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </>
  );
};

export default Books;