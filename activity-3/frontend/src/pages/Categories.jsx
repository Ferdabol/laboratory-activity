import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { 
  FaBookOpen, FaBook, FaFlask, FaScroll, FaUser, 
  FaDragon, FaSearch, FaHeart, FaBolt, FaFeather, FaFolder, FaTimes, FaEdit, FaTrash 
} from 'react-icons/fa';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // Mock data 
  const mockCategories = [
    {
      _id: '1',
      name: 'Fiction',
      description: 'Imaginative narratives and stories that explore the human experience through creative storytelling.',
      bookCount: 24
    },
    {
      _id: '2',
      name: 'Non-Fiction',
      description: 'Factual books including memoirs, essays, and informative works based on real events and research.',
      bookCount: 18
    },
    {
      _id: '3',
      name: 'Science',
      description: 'Books exploring scientific concepts, discoveries, and the natural world through research and inquiry.',
      bookCount: 12
    },
    {
      _id: '4',
      name: 'History',
      description: 'Chronicles of past events, civilizations, and historical figures that shaped our world.',
      bookCount: 15
    },
    {
      _id: '5',
      name: 'Biography',
      description: 'Life stories and personal accounts of notable individuals and their remarkable journeys.',
      bookCount: 9
    },
    {
      _id: '6',
      name: 'Fantasy',
      description: 'Magical worlds, mythical creatures, and epic adventures in realms beyond imagination.',
      bookCount: 31
    },
    {
      _id: '7',
      name: 'Mystery',
      description: 'Intriguing puzzles, detective stories, and suspenseful tales that keep you guessing.',
      bookCount: 14
    },
    {
      _id: '8',
      name: 'Romance',
      description: 'Love stories, relationships, and emotional journeys of the heart.',
      bookCount: 22
    },
    {
      _id: '9',
      name: 'Thriller',
      description: 'High-stakes suspense, action-packed narratives, and edge-of-your-seat excitement.',
      bookCount: 16
    },
    {
      _id: '10',
      name: 'Poetry',
      description: 'Artistic expressions of emotion, beauty, and human experience through verse and rhythm.',
      bookCount: 7
    }
  ];

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(mockCategories);
      localStorage.setItem('categories', JSON.stringify(mockCategories));
    }
    setLoading(false);
  }, []);

  const handleModalOpen = (category = null) => {
    setEditingItem(category);
    setFormData(category ? { name: category.name, description: category.description } : { name: '', description: '' });
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: '', description: '' }); 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      // Update
      const updatedCategories = categories.map(category => category._id === editingItem._id ? { ...category, ...formData } : category);
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    } else {
      // Create
      const newCategory = { ...formData, _id: Date.now().toString(), bookCount: 0 };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
    handleModalClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updatedCategories = categories.filter(category => category._id !== id);
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
  };

  const categoryIcons = {
    'Fiction': <FaBookOpen size={40} color="var(--color-text-light)" />,
    'Non-Fiction': <FaBook size={40} color="var(--color-text-light)" />,
    'Science': <FaFlask size={40} color="var(--color-text-light)" />,
    'History': <FaScroll size={40} color="var(--color-text-light)" />,
    'Biography': <FaUser size={40} color="var(--color-text-light)" />,
    'Fantasy': <FaDragon size={40} color="var(--color-text-light)" />,
    'Mystery': <FaSearch size={40} color="var(--color-text-light)" />,
    'Romance': <FaHeart size={40} color="var(--color-text-light)" />,
    'Thriller': <FaBolt size={40} color="var(--color-text-light)" />,
    'Poetry': <FaFeather size={40} color="var(--color-text-light)" />,
    'default': <FaFolder size={40} color="var(--color-text-light)" />
  };

  const getIcon = (name) => categoryIcons[name] || categoryIcons.default;

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
          📂 Book Categories
        </h1>
        <Button onClick={() => handleModalOpen()}>+ Add New Category</Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: 'var(--color-text)' }}>Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>No categories created yet.</p>
          <Button onClick={() => handleModalOpen()}>Add Your First Category</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="card group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 text-center">
              <Link to={`/categories/${category._id}`}>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl"
                     style={{ backgroundColor: 'var(--color-accent)' }}>
                  {getIcon(category.name)}
                </div>
                
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                  {category.name}
                </h3>
                
                <p className="text-sm mb-4 line-clamp-2 min-h-[2.5rem]" style={{ color: 'var(--color-text)' }}>
                  {category.description || 'No description available'}
                </p>
                
                <div className="pt-4 border-t" style={{ borderColor: 'var(--color-accent)', opacity: 0.5 }}>
                  <span className="text-lg font-semibold" style={{ color: 'var(--color-primary)' }}>
                    📚 {category.bookCount || 0} books
                  </span>
                </div>
              </Link>
              
              <div className="mt-3 flex justify-center space-x-2">
                <button onClick={() => handleModalOpen(category)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit size={16} />
                </button>
                <button onClick={() => handleDelete(category._id)} className="text-red-500 hover:text-red-700">
                  <FaTrash size={16} />
                </button>
              </div>
              
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>
                  View Books →
                </span>
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
                      📂 {editingItem ? 'Edit Category' : 'Add New Category'}
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
                      <label className="block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        style={{ borderColor: 'var(--color-accent)' }}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" onClick={handleModalClose} className="bg-gray-500">Cancel</Button>
                      <Button type="submit">{editingItem ? 'Update Category' : 'Add Category'}</Button>
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

export default Categories;