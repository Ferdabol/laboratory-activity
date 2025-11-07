import { useState } from 'react';
import { SmallButton } from './Buttons';

const CommentList = ({ comments, onDeleteComment }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    setDeletingId(commentId);
    // API call will be added here later
    setDeletingId(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-[#5C3D2E] mb-2">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-[#E0C097]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#5C3D2E] mb-2 font-['Merriweather']">
          No comments yet
        </h3>
        <p className="text-[#2D2424]">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#5C3D2E] mb-6 font-['Merriweather']">
        Comments ({comments.length})
      </h3>

      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B85C38] to-[#5C3D2E] flex items-center justify-center text-white font-bold">
                {comment.author?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h4 className="font-semibold text-[#2D2424]">
                  {comment.author?.name || 'Anonymous'}
                </h4>
                <p className="text-sm text-[#5C3D2E]">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
            </div>

            {comment.isOwner && (
              <SmallButton
                onClick={() => handleDelete(comment.id)}
                disabled={deletingId === comment.id}
                className="bg-red-600 hover:bg-red-700"
              >
                {deletingId === comment.id ? 'Deleting...' : 'Delete'}
              </SmallButton>
            )}
          </div>

          <div className="ml-13">
            <p className="text-[#2D2424] leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>

          {comment.updatedAt !== comment.createdAt && (
            <div className="mt-3 ml-13">
              <p className="text-xs text-[#5C3D2E] italic">
                Edited {formatDate(comment.updatedAt)}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;