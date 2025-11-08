import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../backend/firebase';

const PostCard = ({ post }) => {
  const [authorName, setAuthorName] = useState('Anonymous');

  // Fetch author info from Firestore
  useEffect(() => {
    const fetchAuthor = async () => {
      if (post.authorId) {
        try {
          const userRef = doc(db, 'users', post.authorId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setAuthorName(userSnap.data().name || 'Anonymous');
          }
        } catch (err) {
          console.error('Error fetching author:', err);
        }
      }
    };
    fetchAuthor();
  }, [post.authorId]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    let date;
    // Handle Firestore Timestamp or JS Date
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else {
      date = new Date(timestamp);
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (!content) return '';
    return content.length <= maxLength ? content : content.substring(0, maxLength) + '...';
  };

  return (
    <Link to={`/posts/${post.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        {/* Featured Image */}
        {post.image && (
          <div className="h-48 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category/Tag */}
          {post.category && (
            <span className="inline-block bg-[#B85C38] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">
              {post.category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-[#5C3D2E] mb-3 font-['Merriweather'] hover:text-[#B85C38] transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[#2D2424] mb-4 flex-1 line-clamp-3">
            {truncateContent(post.content || post.excerpt || '')}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E0C097]">
            {/* Author Info */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#B85C38] to-[#5C3D2E] flex items-center justify-center text-white text-sm font-bold">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2D2424]">{authorName}</p>
                <p className="text-xs text-[#5C3D2E]">{formatDate(post.createdAt)}</p>
              </div>
            </div>

            {/* Read More Icon */}
            <div className="text-[#B85C38]">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* Stats */}
          {(post.commentCount !== undefined || post.views !== undefined) && (
            <div className="flex items-center space-x-4 mt-3 text-sm text-[#5C3D2E]">
              {post.commentCount !== undefined && (
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
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
                  <span>{post.commentCount}</span>
                </div>
              )}
              {post.views !== undefined && (
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>{post.views}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
