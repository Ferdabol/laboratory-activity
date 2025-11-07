import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/Postcard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // API call will be added here later
      // Example: const response = await fetch(`/api/posts?page=${currentPage}&limit=${postsPerPage}`);
      // const data = await response.json();
      // setPosts(data.posts);
      // setTotalPages(data.totalPages);
      
      setPosts([]);
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className="px-4 py-2 rounded-lg border-2 border-[#E0C097] text-[#5C3D2E] hover:bg-[#E0C097] transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 text-[#5C3D2E]">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 rounded-lg border-2 transition-colors ${
            currentPage === i
              ? 'bg-[#B85C38] text-white border-[#B85C38]'
              : 'border-[#E0C097] text-[#5C3D2E] hover:bg-[#E0C097]'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2 text-[#5C3D2E]">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className="px-4 py-2 rounded-lg border-2 border-[#E0C097] text-[#5C3D2E] hover:bg-[#E0C097] transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#352a24] to-[#B85C38] rounded-lg shadow-xl p-8 md:p-12 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Merriweather']">
          Welcome to BlogSpace
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
          {posts.length > 0 && (
            <p className="text-[#5C3D2E]">
              Page {currentPage} of {totalPages}
            </p>
          )}
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
                {/* Previous Button */}
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#5C3D2E] text-white hover:bg-[#B85C38]'
                  }`}
                >
                  ← Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2 items-center">
                  {renderPageNumbers()}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#5C3D2E] text-white hover:bg-[#B85C38]'
                  }`}
                >
                  Next →
                </button>
              </div>
            )}
          </>
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