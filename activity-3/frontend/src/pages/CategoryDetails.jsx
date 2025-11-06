import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BookCard from "../components/Bookcard";
import Button from "../components/Button";
import { FaArrowLeft } from 'react-icons/fa';

const CategoryDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    const storedBooks = localStorage.getItem('books');
    
    if (storedCategories && storedBooks) {
      const categories = JSON.parse(storedCategories);
      const allBooks = JSON.parse(storedBooks);
      
      const foundCategory = categories.find(cat => cat._id === id);
      if (foundCategory) {
        setCategory(foundCategory);
        const filteredBooks = allBooks.filter(book => book.genre === foundCategory.name);
        setBooks(filteredBooks);
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-xl" style={{ color: 'var(--color-text)' }}>Loading category...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>Category not found.</p>
        <Link to="/categories">
          <Button>Back to Categories</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/categories" title="Back to Categories" aria-label="Back to Categories">
            <Button className="p-2">
              <FaArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
              📂 {category.name}
            </h1>
            <p className="text-lg mt-2" style={{ color: 'var(--color-text)' }}>
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>
            No books in this category yet.
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

export default CategoryDetails;