import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Button = ({ children, onClick, type = "button", className = "" }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-lg";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-text-light)'
      }}
    >
      {children}
    </button>
  );
};

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-lg shadow-md p-1 sm:p-2 w-full max-w-md" 
          style={{ backgroundColor: 'var(--color-cloud-100)', boxShadow: 'var(--shadow-soft)' }}>
      <input
        type="text"
        placeholder="Search for weather..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-2 sm:px-3 md:px-4 py-2 rounded-l-lg outline-none text-sm sm:text-base"
        style={{ backgroundColor: 'var(--color-cloud-100)', color: 'var(--color-night-700)', fontFamily: 'var(--font-body)' }}
      />
      <button
        type="submit"
        className="px-2 sm:px-3 md:px-4 py-2 rounded-r-lg transition-colors"
        style={{ backgroundColor: 'var(--color-sky-500)', color: 'white' }}
      >
        <FaSearch className="text-lg sm:text-xl" />
      </button>
    </form>
  );
};

export { Button, Searchbar };