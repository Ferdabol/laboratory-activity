import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, orderBy, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from '../../../backend/firebase';
import { AuthContext } from '../context/AuthContext';
import CommentForm from '../components/Commentform';
import CommentList from '../components/Commentlist';
import { PrimaryButton, DangerButton, SecondaryButton } from '../components/Buttons';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Use context
  const isLoggedIn = !!user;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postRef = doc(db, "post", id);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          const postData = postSnap.data();
          setPost({
            id: postSnap.id,
            ...postData,
            isOwner: user?.uid === postData.authorId
          });
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user]);

  // Real-time comments listener (subcollection)
  useEffect(() => {
    const commentsRef = collection(db, "post", id, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        postId: id, // store postId for delete reference
        ...doc.data()
      }));
      setComments(fetchedComments);
    }, (err) => {
      console.error("Error fetching comments:", err);
    });

    return () => unsubscribe();
  }, [id]);

  const handleCommentAdded = (newComment) => {
    // Optional: Optimistic UI
    setComments(prev => [newComment, ...prev]);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, "post", id, "comments", commentId));
      // Real-time listener will update state automatically
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;

    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, "post", id));
      navigate('/');
    } catch (err) {
      console.error('Error deleting post:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#B85C38]"></div>
    </div>
  );

  if (error || !post) return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-[#5C3D2E] mb-4 font-['Merriweather']">Post Not Found</h2>
        <p className="text-[#2D2424] mb-6">{error || 'The post you are looking for does not exist.'}</p>
        <Link to="/"><PrimaryButton>Back to Home</PrimaryButton></Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-[#B85C38] hover:text-[#5C3D2E] transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Posts
        </Link>
      </div>

      {/* Post Content */}
      <article className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
        {post.image && <div className="w-full h-96 overflow-hidden"><img src={post.image} alt={post.title} className="w-full h-full object-cover"/></div>}
        <div className="p-8">
          {post.category && <span className="inline-block bg-[#B85C38] text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">{post.category}</span>}
          <h1 className="text-4xl font-bold text-[#5C3D2E] mb-4 font-['Merriweather']">{post.title}</h1>
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E0C097]">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#B85C38] to-[#5C3D2E] flex items-center justify-center text-white text-lg font-bold">
                {post.authorName?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div>
                <p className="font-semibold text-[#2D2424]">{post.authorName || 'Anonymous'}</p>
                <p className="text-sm text-[#5C3D2E]">{formatDate(post.createdAt)}</p>
              </div>
            </div>
            {post.isOwner && (
              <div className="flex gap-3">
                <Link to={`/posts/${id}/edit`}><SecondaryButton className="px-4 py-2">Edit</SecondaryButton></Link>
                <DangerButton onClick={handleDeletePost} disabled={isDeleting} className="px-4 py-2">
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </DangerButton>
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-[#2D2424] leading-relaxed whitespace-pre-wrap text-lg">{post.content}</p>
          </div>

          <div className="flex items-center space-x-6 mt-8 pt-6 border-t border-[#E0C097] text-[#5C3D2E]">
            {post.views !== undefined && (
              <div className="flex items-center space-x-2">
                <span>{post.views} views</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <span>{comments.length} comments</span>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div>
        {isLoggedIn ? (
          <CommentForm postId={id} user={user} onCommentAdded={handleCommentAdded} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
            <p className="text-[#2D2424] mb-4">
              Please <Link to="/login" className="text-[#B85C38] hover:text-[#5C3D2E] font-semibold">sign in</Link> to leave a comment
            </p>
          </div>
        )}
        <CommentList comments={comments} onDeleteComment={handleDeleteComment} currentUser={user} />
      </div>
    </div>
  );
};

export default PostDetail;
