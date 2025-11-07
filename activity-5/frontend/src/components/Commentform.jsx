import { useState } from 'react';
import { PrimaryButton, SecondaryButton } from './Buttons';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: comment })
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const newComment = await response.json();
      setComment('');
      if (onCommentAdded) {
        onCommentAdded(newComment);
      }
    } catch (err) {
      setError('Failed to post comment. Please try again.');
      console.error('Error posting comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setComment('');
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-[#5C3D2E] mb-4 font-['Merriweather']">
        Leave a Comment
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows="4"
            className="w-full px-4 py-3 border-2 border-[#E0C097] rounded-lg focus:outline-none focus:border-[#B85C38] focus:ring-2 focus:ring-[#B85C38] focus:ring-opacity-20 transition-colors resize-none text-[#2D2424]"
            disabled={isSubmitting}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="flex gap-3">
          <PrimaryButton
            type="submit"
            disabled={isSubmitting || !comment.trim()}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </PrimaryButton>
          
          {comment && (
            <SecondaryButton
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </SecondaryButton>
          )}
        </div>
      </form>

      <div className="mt-4 text-sm text-[#5C3D2E]">
        <p>💡 <span className="font-semibold">Tip:</span> Be respectful and constructive in your comments.</p>
      </div>
    </div>
  );
};

export default CommentForm;