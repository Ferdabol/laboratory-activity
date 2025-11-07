import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { db, auth } from '../../../backend/firebase'; // import Firestore & Auth
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    if (!auth.currentUser) {
      setError('You must be logged in to create a post');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'post'), {
        ...formData,
        authorId: auth.currentUser.uid,  // link post to logged-in user
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        commentsCount: 0
      });

      navigate('/'); // redirect to posts list after creation
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to publish post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard this post?')) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#5C3D2E] mb-2 font-['Merriweather']">
          Create new Post
        </h1>
        <p className="text-[#2D2424]">Share your story with the world</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-700 rounded">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-semibold text-[#5C3D2E] mb-2">
            Post Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter an engaging title..."
            className="w-full px-4 py-3 border-2 border-[#E0C097] rounded-lg focus:outline-none focus:border-[#B85C38] focus:ring-2 focus:ring-[#B85C38] focus:ring-opacity-20 transition-colors text-[#2D2424]"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-semibold text-[#5C3D2E] mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Technology, Lifestyle, Travel..."
            className="w-full px-4 py-3 border-2 border-[#E0C097] rounded-lg focus:outline-none focus:border-[#B85C38] focus:ring-2 focus:ring-[#B85C38] focus:ring-opacity-20 transition-colors text-[#2D2424]"
            disabled={isSubmitting}
          />
        </div>

        {/* Image URL */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-semibold text-[#5C3D2E] mb-2">
            Featured Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 border-2 border-[#E0C097] rounded-lg focus:outline-none focus:border-[#B85C38] focus:ring-2 focus:ring-[#B85C38] focus:ring-opacity-20 transition-colors text-[#2D2424]"
            disabled={isSubmitting}
          />
          {formData.image && (
            <div className="mt-3">
              <img
                src={formData.image}
                alt="Preview"
                className="max-w-full h-48 object-cover rounded-lg"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-semibold text-[#5C3D2E] mb-2">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your story..."
            rows="12"
            className="w-full px-4 py-3 border-2 border-[#E0C097] rounded-lg focus:outline-none focus:border-[#B85C38] focus:ring-2 focus:ring-[#B85C38] focus:ring-opacity-20 transition-colors resize-none text-[#2D2424]"
            disabled={isSubmitting}
            required
          />
          <p className="mt-2 text-sm text-[#5C3D2E]">{formData.content.length} characters</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <PrimaryButton
            type="submit"
            disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </PrimaryButton>
          
          <SecondaryButton
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
