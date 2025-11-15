import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { FaPen, FaBook, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../backend/firebase";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    biography: "",
    bookCount: 0
  });

  // ✅ Fetch Authors from Firestore
  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, "authors"));
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setAuthors(data);
      } catch (err) {
        console.error("Error fetching authors:", err);
      }
      setLoading(false);
    };

    fetchAuthors();
  }, []);

  // ✅ Open Modal (Edit or Add)
  const handleModalOpen = (author = null) => {
    setEditingItem(author);
    setFormData(
      author
        ? { name: author.name, country: author.country, biography: author.biography, bookCount: author.bookCount }
        : { name: "", country: "", biography: "", bookCount: 0 }
    );
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save to Firestore (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        // ✅ Update Firestore document
        await updateDoc(doc(db, "authors", editingItem.id), formData);

        setAuthors((prev) =>
          prev.map((a) => (a.id === editingItem.id ? { ...a, ...formData } : a))
        );

      } else {
        // ✅ Add new document
        const docRef = await addDoc(collection(db, "authors"), {
          ...formData,
          bookCount: 0,
        });

        setAuthors((prev) => [...prev, { id: docRef.id, ...formData, bookCount: 0 }]);
      }

      handleModalClose();

    } catch (error) {
      console.error("Error saving author:", error);
      alert("Failed to save author. Check console for details.");
    }
  };

  // ✅ Delete Author
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this author?")) return;

    try {
      await deleteDoc(doc(db, "authors", id));
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
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
          <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>No authors yet.</p>
          <Button onClick={() => handleModalOpen()}>Add First Author</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div key={author.id} className="card group cursor-pointer transform transition-all duration-300 hover:-translate-y-2">
              <Link to={`/authors/${author.id}`}>
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
                      {author.country || "Unknown Country"}
                    </p>
                  </div>
                </div>
                <p className="text-sm line-clamp-2" style={{ color: 'var(--color-text)' }}>
                  {author.biography || "No biography available"}
                </p>
              </Link>
              <div className="mt-4 pt-4 border-t flex justify-between items-center"
                style={{ borderColor: "var(--color-accent)", opacity: 0.5 }}>
                <span className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                  <FaBook className="inline mr-1" size={14} /> {author.bookCount || 0} books
                </span>
                <div className="flex space-x-2">
                  <button onClick={() => handleModalOpen(author)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit size={16} />
                  </button>
                  <button onClick={() => handleDelete(author.id)} className="text-red-500 hover:text-red-700">
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Modal code stays same */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="relative rounded-lg shadow-2xl p-6 md:p-8 max-w-md w-full mx-4"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              <div className="relative rounded-md shadow-inner p-6 min-h-[40vh]"
                style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    {editingItem ? "Edit Author" : "Add New Author"}
                  </h2>
                  <button onClick={handleModalClose}>
                    <FaTimes size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  Name: <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
                  Country:<input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded" />
                  Biography:<textarea name="biography" value={formData.biography} onChange={handleChange} className="w-full p-2 border rounded" />
                  <div className="flex justify-end space-x-2">
                    <Button type="button" onClick={handleModalClose} className="bg-gray-500">Cancel</Button>
                    <Button type="submit">{editingItem ? "Update" : "Add"}</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Authors;
