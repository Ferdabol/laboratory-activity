import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { 
  FaBookOpen, FaBook, FaFlask, FaScroll, FaUser, 
  FaDragon, FaSearch, FaHeart, FaBolt, FaFeather, FaFolder 
} from 'react-icons/fa';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for testing design
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
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/categories");
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories(mockCategories);
      setLoading(false);
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
        <Link to="/add-category">
          <Button>+ Add New Category</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: 'var(--color-text)' }}>Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>No categories created yet.</p>
          <Link to="/add-category">
            <Button>Add Your First Category</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category._id} to={`/categories/${category._id}`}>
              <div className="card group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 text-center">
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
                
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-sm" style={{ color: 'var(--color-text)' }}>
                    View Books →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Categories;