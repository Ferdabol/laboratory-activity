import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { FaPen, FaBook, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    biography: ''
  });

  // Mock data 
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
    const storedAuthors = localStorage.getItem('authors');
    if (storedAuthors) {
      setAuthors(JSON.parse(storedAuthors));
    } else {
      setAuthors(mockAuthors);
      localStorage.setItem('authors', JSON.stringify(mockAuthors));
    }
    setLoading(false);
  }, []);

  const handleModalOpen = (author = null) => {
    setEditingItem(author);
    setFormData(author ? { name: author.name, country: author.country, biography: author.biography } : { name: '', country: '', biography: '' });
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: '', country: '', biography: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      // Update
      const updatedAuthors = authors.map(author => author._id === editingItem._id ? { ...author, ...formData } : author);
      setAuthors(updatedAuthors);
      localStorage.setItem('authors', JSON.stringify(updatedAuthors));
    } else {
      // Create
      const newAuthor = { ...formData, _id: Date.now().toString(), bookCount: 0 };
      const updatedAuthors = [...authors, newAuthor];
      setAuthors(updatedAuthors);
      localStorage.setItem('authors', JSON.stringify(updatedAuthors));
    }
    handleModalClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      const updatedAuthors = authors.filter(author => author._id !== id);
      setAuthors(updatedAuthors);
      localStorage.setItem('authors', JSON.stringify(updatedAuthors));
    }
  };

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
          <FaPen className="inline mr-2" size={32} /> Authors Collection
        </h1>
        <Button onClick={() => handleModalOpen()}>+ Add New Author</Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: 'var(--color-text)' }}>Loading authors...</p>
        </div>
      ) : authors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>No authors in your collection yet.</p>
          <Button onClick={() => handleModalOpen()}>Add Your First Author</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div key={author._id} className="card group cursor-pointer transform transition-all duration-300 hover:-translate-y-2">
              <Link to={`/authors/${author._id}`}>
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
              </Link>
              <div className="mt-4 pt-4 border-t flex justify-between items-center"
                   style={{ borderColor: 'var(--color-accent)', opacity: 0.5 }}>
                <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                  <FaBook className="inline mr-1" size={14} /> {author.bookCount || 0} books
                </span>
                <div className="flex space-x-2">
                  <button onClick={() => handleModalOpen(author)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit size={16} />
                  </button>
                  <button onClick={() => handleDelete(author._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
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
              
              {/* Content area  */}
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
                      <FaPen className="inline mr-2" size={24} /> {editingItem ? 'Edit Author' : 'Add New Author'}
                    </h2>
                    <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700">
                      <FaTimes size={20} />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        style={{ borderColor: 'var(--color-accent)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        style={{ borderColor: 'var(--color-accent)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Biography</label>
                      <textarea
                        name="biography"
                        value={formData.biography}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        style={{ borderColor: 'var(--color-accent)' }}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" onClick={handleModalClose} className="bg-gray-500">Cancel</Button>
                      <Button type="submit">{editingItem ? 'Update Author' : 'Add Author'}</Button>
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

export default Authors;