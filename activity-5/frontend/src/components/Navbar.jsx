import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('token'); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="bg-[#2D2424] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-[#E0C097] font-['Merriweather']">
              BlogSpace
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-[#E0C097] hover:text-[#B85C38] transition-colors font-semibold"
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/create"
                  className="text-[#E0C097] hover:text-[#B85C38] transition-colors font-semibold"
                >
                  Create Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-[#B85C38] text-white px-4 py-2 rounded hover:bg-[#5C3D2E] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#E0C097] hover:text-[#B85C38] transition-colors font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#B85C38] text-white px-4 py-2 rounded hover:bg-[#5C3D2E] transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#E0C097] focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/"
              className="block text-[#E0C097] hover:text-[#B85C38] py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/create"
                  className="block text-[#E0C097] hover:text-[#B85C38] py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-[#E0C097] hover:text-[#B85C38] py-2 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-[#E0C097] hover:text-[#B85C38] py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-[#E0C097] hover:text-[#B85C38] py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;