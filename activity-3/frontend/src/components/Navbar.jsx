import { Link, useLocation } from "react-router-dom";
import { FaBookOpen, FaHome, FaPen, FaFolder } from 'react-icons/fa';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="relative px-8 py-5 shadow-2xl" 
         style={{ 
           backgroundColor: 'var(--color-primary)',
           color: 'var(--color-text-light)',
           fontFamily: 'var(--font-heading)',
           borderBottom: '3px solid var(--color-accent)'
         }}>
      
      {/* Decorative wood grain overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: `repeating-linear-gradient(
               90deg,
               transparent,
               transparent 3px,
               rgba(0,0,0,0.1) 3px,
               rgba(0,0,0,0.1) 6px
             )`
           }}></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)'
           }}></div>
      
      <div className="relative z-10 flex justify-between items-center max-w-7xl mx-auto gap-12">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center space-x-3 group no-underline hover:no-underline flex-shrink-0">
          <div className="transform transition-transform group-hover:scale-110 group-hover:rotate-6">
            <FaBookOpen className="text-5xl drop-shadow-lg" style={{ color: 'var(--color-text-light)' }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight whitespace-nowrap" 
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  color: 'var(--color-text-light)',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
              My Bookshelf
            </h1>
            <p className="text-sm opacity-90 whitespace-nowrap font-medium" 
               style={{ 
                 fontFamily: 'var(--font-body)',
                 color: 'var(--color-text-light)',
                 textShadow: '1px 1px 2px rgba(0,0,0,0.4)'
               }}>
              Your Literary Collection
            </p>
          </div>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex space-x-3 flex-shrink-0">
          {([
            { path: '/', label: 'Home', icon: <FaHome size={20} /> },
            { path: '/books', label: 'Books', icon: <FaBookOpen size={20} /> },
            { path: '/authors', label: 'Authors', icon: <FaPen size={20} /> },
            { path: '/categories', label: 'Categories', icon: <FaFolder size={20} /> }
          ]).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 no-underline hover:no-underline flex items-center gap-2 group overflow-hidden"
              style={{
                backgroundColor: isActive(item.path) ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.15)',
                boxShadow: isActive(item.path) 
                  ? '0 4px 12px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)' 
                  : '0 2px 6px rgba(0,0,0,0.15)',
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-text-light)',
                border: isActive(item.path) ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent',
                textDecoration: 'none'
              }}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{
                     background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                   }}></div>
              
              <span className="transform transition-transform group-hover:scale-125 relative z-10">
                {item.icon}
              </span>
              <span className="relative z-10">{item.label}</span>
              
              {/* Active indicator dot */}
              {isActive(item.path) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: '#FFD700' }}></span>
              )}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Decorative bookshelf edge */}
      <div className="absolute bottom-0 left-0 right-0 h-2"
           style={{
             background: 'linear-gradient(to right, var(--color-accent), #D4A574, var(--color-accent))',
             boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
           }}></div>
    </nav>
  );
}
