import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { 
  FaBookOpen, FaBook, FaFlask, FaScroll, FaUser, 
  FaDragon, FaSearch, FaHeart, FaBolt, FaFeather, FaFolder, FaTimes, FaEdit, FaTrash 
} from 'react-icons/fa';

import { db } from "../../../backend/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  // ✅ FETCH categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data()
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  // ✅ OPEN Modal
  const handleModalOpen = (category = null) => {
    setEditingItem(category);
    setFormData(
      category
        ? { name: category.name, description: category.description }
        : { name: "", description: "" }
    );
    setIsModalOpen(true);
  };

  // ✅ CLOSE Modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: "", description: "" });
  };

  // ✅ Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ SUBMIT (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        bookCount: editingItem?.bookCount || 0
      };

      if (editingItem) {
        await updateDoc(doc(db, "categories", editingItem._id), payload);
        setCategories(categories.map(cat =>
          cat._id === editingItem._id ? { ...cat, ...payload } : cat
        ));
      } else {
        const docRef = await addDoc(collection(db, "categories"), payload);
        setCategories([...categories, { _id: docRef.id, ...payload }]);
      }

      handleModalClose();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category. Check console for details.");
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await deleteDoc(doc(db, "categories", id));
      setCategories(categories.filter(cat => cat._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Icon mapping
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

      {/* ✅ Modal with labels untouched */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="relative rounded-lg shadow-2xl p-6 md:p-8 max-w-md w-full mx-4"
              style={{ backgroundColor: 'var(--color-primary)' }}>

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

              <div className="absolute top-0 left-0 right-0 h-3 rounded-t-lg shadow-inner"
                style={{ backgroundColor: 'var(--color-accent)' }}></div>

              <div className="relative rounded-md shadow-inner p-6 min-h-[40vh]"
                style={{ backgroundColor: 'var(--color-bg)' }}>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                      📂 {editingItem ? "Edit Category" : "Add New Category"}
                    </h2>
                    <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700">
                      <FaTimes size={20} />
                    </button>
                  </div>

                  {/* ✅ FORM WITH LABELS */}
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
                      <Button type="submit">{editingItem ? "Update Category" : "Add Category"}</Button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-3 rounded-b-lg shadow-md"
                style={{ backgroundColor: 'var(--color-accent)' }}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
