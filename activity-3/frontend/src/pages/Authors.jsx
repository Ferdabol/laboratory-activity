import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { FaPen, FaBook } from 'react-icons/fa';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for testing design
  const mockAuthors = [
    {
      _id: '1',
      name: 'Harper Lee',
      country: 'United States',
      biography: 'American novelist best known for To Kill a Mockingbird, published in 1960. Won the Pulitzer Prize for Fiction in 1961.',
      bookCount: 2
    },
    {
      _id: '2',
      name: 'George Orwell',
      country: 'United Kingdom',
      biography: 'English novelist, essayist, journalist and critic. Best known for the dystopian novel 1984 and the allegorical novella Animal Farm.',
      bookCount: 8
    },
    {
      _id: '3',
      name: 'Jane Austen',
      country: 'United Kingdom',
      biography: 'English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century.',
      bookCount: 6
    },
    {
      _id: '4',
      name: 'F. Scott Fitzgerald',
      country: 'United States',
      biography: 'American novelist and short story writer, widely regarded as one of the greatest American writers of the 20th century.',
      bookCount: 4
    },
    {
      _id: '5',
      name: 'J.K. Rowling',
      country: 'United Kingdom',
      biography: 'British author, best known for writing the Harry Potter fantasy series, which has won multiple awards and sold more than 500 million copies.',
      bookCount: 14
    },
    {
      _id: '6',
      name: 'J.R.R. Tolkien',
      country: 'United Kingdom',
      biography: 'English writer, poet, philologist, and academic, best known as the author of The Hobbit and The Lord of the Rings.',
      bookCount: 12
    }
  ];

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/authors");
      const data = await response.json();
      setAuthors(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching authors:", error);
      setAuthors(mockAuthors);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
          <FaPen className="inline mr-2" size={32} /> Authors Collection
        </h1>
        <Link to="/add-author">
          <Button>+ Add New Author</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: 'var(--color-text)' }}>Loading authors...</p>
        </div>
      ) : authors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>No authors in your collection yet.</p>
          <Link to="/add-author">
            <Button>Add Your First Author</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <Link key={author._id} to={`/authors/${author._id}`}>
              <div className="card group cursor-pointer transform transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: 'var(--color-accent)' }}>
                    <FaPen size={24} color="var(--color-text-light)" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                      {author.name}
                    </h3>
                    <p className="text-sm opacity-75" style={{ color: 'var(--color-text)' }}>
                      {author.country || 'Unknown Country'}
                    </p>
                  </div>
                </div>
                <p className="text-sm line-clamp-2" style={{ color: 'var(--color-text)' }}>
                  {author.biography || 'No biography available'}
                </p>
                <div className="mt-4 pt-4 border-t flex justify-between items-center"
                     style={{ borderColor: 'var(--color-accent)', opacity: 0.5 }}>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                    <FaBook className="inline mr-1" size={14} /> {author.bookCount || 0} books
                  </span>
                  <span className="text-sm opacity-75">View Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Authors;