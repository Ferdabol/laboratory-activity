import { useState, useEffect } from "react";
import BookCard from "../components/Bookcard";
import Button from "../components/Button";
import { FaBookOpen, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../backend/firebase";
// 




const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  
  useEffect(() => {
  const fetchBooks = async () => {  
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
      const booksData = querySnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
      setBooks(booksData);
      console.log("Fetched books from Firestore:", booksData);
      
      
      localStorage.setItem('books', JSON.stringify(booksData));
      
    }catch (error) {
      console.error("Error fetching books: ", error);
    }
    setLoading(false);
  }
  
  fetchBooks();
}, []);
  
  

 
  

  const handleModalOpen = (book = null) => {
    setEditingItem(book);
    setFormData(book ? { title: book.title, author: book.author, genre: book.genre, publishedYear: book.publishedYear } : { title: '', author: '', genre: '', publishedYear: '' });
    setIsModalOpen(true);
    setIsEditMode(false); 
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ title: '', author: '', genre: '', publishedYear: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        publishedYear: formData.publishedYear ? Number(formData.publishedYear) : undefined,
      };

      if (editingItem) {
        // Update Firestore
        await updateDoc(doc(db, "books", editingItem._id), payload);
        const updatedBooks = books.map(book =>
          book._id === editingItem._id ? { ...book, ...payload } : book
        );
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
      } else {
        // Create in Firestore
        const colRef = collection(db, "books");
        const docRef = await addDoc(colRef, payload);
        const newBook = { _id: docRef.id, ...payload };
        const updatedBooks = [...books, newBook];
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
      }

      handleModalClose();
    } catch (error) {
      console.error("Error saving book to Firestore:", error);
      alert("Failed to save book. Check console for details.");
    }
  };

  // changed code: delete from Firestore
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteDoc(doc(db, "books", id));
      const updatedBooks = books.filter(book => book._id !== id);
      setBooks(updatedBooks);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
    } catch (error) {
      console.error("Error deleting book from Firestore:", error);
      alert("Failed to delete book. Check console for details.");
    }
    setIsDeleteMode(false); 
  };

  const handleEditMode = () => {
    setIsEditMode(true);
    setIsDeleteMode(false);
  };

  const handleDeleteMode = () => {
    setIsDeleteMode(true);
    setIsEditMode(false);
  };

  const handleCancelMode = () => {
    setIsEditMode(false);
    setIsDeleteMode(false);
  };

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
          <FaBookOpen className="inline mr-2" size={32} /> My Book Collection
        </h1>
        <div className="flex space-x-2">
          <Button onClick={handleEditMode} disabled={isEditMode || isDeleteMode}>
            <FaEdit className="inline mr-1" /> Edit Books
          </Button>
          <Button onClick={handleDeleteMode} disabled={isEditMode || isDeleteMode}>
            <FaTrash className="inline mr-1" /> Delete Books
          </Button>
          <Button onClick={() => handleModalOpen()}>
            + Add New Book
          </Button>
          {(isEditMode || isDeleteMode) && (
            <Button onClick={handleCancelMode} className="bg-gray-500">
              Cancel
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: 'var(--color-text)' }}>Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4" style={{ color: 'var(--color-text)' }}>No books in your collection yet.</p>
          <Button onClick={() => handleModalOpen()}>Add Your First Book</Button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-start">
          {books.map((book) => (
            <div
              key={book._id}
              className={`relative cursor-pointer transition-all duration-300 ${
                isEditMode || isDeleteMode ? 'hover:scale-105 hover:shadow-lg' : ''
              }`}
              onClick={() => {
                if (isEditMode) handleModalOpen(book);
                else if (isDeleteMode) handleDelete(book._id);
              }}
            >
              <BookCard book={book} />
              {(isEditMode || isDeleteMode) && (
                <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold">
                    {isEditMode ? 'Edit' : 'Delete'}
                  </span>
                </div>
              )}
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
                      <FaBookOpen className="inline mr-2" size={24} /> {editingItem ? 'Edit Book' : 'Add New Book'}
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
                      <Button type="submit">{editingItem ? 'Update Book' : 'Add Book'}</Button>
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