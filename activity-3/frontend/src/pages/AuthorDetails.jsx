import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BookCard from "../components/Bookcard";
import Button from "../components/Button";
import { FaArrowLeft, FaPen } from 'react-icons/fa';

const AuthorDetails = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const storedAuthors = localStorage.getItem('authors');
    const storedBooks = localStorage.getItem('books');
    
    if (storedAuthors && storedBooks) {
      const authors = JSON.parse(storedAuthors);
      const allBooks = JSON.parse(storedBooks);
      
      const foundAuthor = authors.find(auth => auth._id === id);
      if (foundAuthor) {
        setAuthor(foundAuthor);
        const filteredBooks = allBooks.filter(book => book.author === foundAuthor.name);
        setBooks(filteredBooks);
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-xl" style={{ color: 'var(--color-text)' }}>Loading author...</p>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="text-center py-12">
        <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>Author not found.</p>
        <Link to="/authors">
          <Button>Back to Authors</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/authors" title="Back to Authors" aria-label="Back to Authors">
            <Button className="p-2">
              <FaArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
              <FaPen className="inline mr-2" size={32} /> {author.name}
            </h1>
            <p className="text-lg mt-2" style={{ color: 'var(--color-text)' }}>
              {author.country || 'Unknown Country'}
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text)' }}>
              {author.biography || 'No biography available'}
            </p>
          </div>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>
            No books by this author yet.
          </p>
          <Link to="/books">
            <Button>Add Books</Button>
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

export default AuthorDetails;