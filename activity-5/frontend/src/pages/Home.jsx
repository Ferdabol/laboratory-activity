import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/Postcard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // API call will be added here later
      setPosts([]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#352a24] to-[#B85C38] rounded-lg shadow-xl p-8 md:p-12 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Merriweather']">
          blog-blogan
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <Link
          to="/create"
          className="inline-block bg-white text-[#5C3D2E] px-6 py-3 rounded-lg font-semibold hover:bg-[#E0C097] transition-colors"
        >
          Start Writing
        </Link>
      </section>

      {/* Featured Posts Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#5C3D2E] font-['Merriweather']">
            Latest Posts
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B85C38]"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-[#5C3D2E] text-lg">No posts yet. Be the first to create one!</p>
            <Link
              to="/create"
              className="inline-block mt-4 bg-[#B85C38] text-white px-6 py-2 rounded hover:bg-[#5C3D2E] transition-colors"
            >
              Create Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-[#5C3D2E] mb-4 font-['Merriweather']">
          Ready to Share Your Story?
        </h2>
        <p className="text-[#2D2424] mb-6">
          Join our community of writers and share your unique perspective.
        </p>
        <Link
          to="/register"
          className="inline-block bg-[#B85C38] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5C3D2E] transition-colors"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;