import { useState, useEffect } from "react";
import BookCard from "../components/Bookcard";
import Button from "../components/Button";
import { FaBookOpen, FaTimes } from 'react-icons/fa';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: ''
  });

  // Mock data 
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
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      setBooks(mockBooks);
      localStorage.setItem('books', JSON.stringify(mockBooks));
    }
    setLoading(false);
  }, []);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ title: '', author: '', genre: '', publishedYear: '' }); 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { ...formData, _id: Date.now().toString() };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    handleModalClose();
  };

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
          <FaBookOpen className="inline mr-2" size={32} /> My Book Collection
        </h1>
        <Button onClick={handleModalOpen}>+ Add New Book</Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: 'var(--color-text)' }}>Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>No books in your collection yet.</p>
          <Button onClick={handleModalOpen}>Add Your First Book</Button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-start">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          {/* Modal content */}
          <div className="relative flex items-center justify-center h-full">
            <div className="relative rounded-lg shadow-2xl p-6 md:p-8 max-w-md w-full mx-4" 
                 style={{ backgroundColor: 'var(--color-primary)' }}>
              
              {/* Wood grain texture effect */}
              <div className="absolute inset-0 opacity-10 rounded-lg pointer-events-none" 
                   style={{
                     backgroundImage: `repeating-linear-gradient(
                       90deg,
                       transparent,
                       transparent 2px,
                       rgba(0,0,0,0.1) 2px,
                       rgba(0,0,0,0.1) 4px
                     )`
                   }}>
              </div>
              
              {/* Top shelf edge */}
              <div className="absolute top-0 left-0 right-0 h-3 rounded-t-lg shadow-inner" 
                   style={{ backgroundColor: 'var(--color-accent)' }}></div>
              
              {/* Content area */}
              <div className="relative rounded-md shadow-inner p-6 min-h-[40vh]" 
                   style={{ backgroundColor: 'var(--color-bg)' }}>
                
                {/* Decorative shelf brackets */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 rounded-tl-md opacity-40" 
                     style={{ borderColor: 'var(--color-primary)' }}></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 rounded-tr-md opacity-40" 
                     style={{ borderColor: 'var(--color-primary)' }}></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 rounded-bl-md opacity-40" 
                     style={{ borderColor: 'var(--color-primary)' }}></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 rounded-br-md opacity-40" 
                     style={{ borderColor: 'var(--color-primary)' }}></div>
                
                {/* Main content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                      <FaBookOpen className="inline mr-2" size={24} /> Add New Book
                    </h2>
                    <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700">
                      <FaTimes size={20} />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        style={{ borderColor: 'var(--color-accent)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Author</label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        style={{ borderColor: 'var(--color-accent)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Genre</label>
                      <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        style={{ borderColor: 'var(--color-accent)' }}
                      >
                        <option value="">Select Genre</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Biography">Biography</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Dystopian">Dystopian</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Published Year</label>
                      <input
                        type="number"
                        name="publishedYear"
                        value={formData.publishedYear}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        style={{ borderColor: 'var(--color-accent)' }}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" onClick={handleModalClose} className="bg-gray-500">Cancel</Button>
                      <Button type="submit">Add Book</Button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Bottom shelf edge */}
              <div className="absolute bottom-0 left-0 right-0 h-3 rounded-b-lg shadow-md" 
                   style={{ backgroundColor: 'var(--color-accent)' }}></div>
              
              {/* Side supports */}
              <div className="absolute top-0 left-0 w-2 h-full rounded-l-lg" 
                   style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)' }}></div>
              <div className="absolute top-0 right-0 w-2 h-full rounded-r-lg" 
                   style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.2), transparent)' }}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Books;