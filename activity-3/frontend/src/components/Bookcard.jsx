import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  // Random colors for book cover
  const colors = [
    '#8B4513', '#A0522D', '#CD853F', '#D2691E', '#B8860B',
    '#8B7355', '#A0785A', '#BC8F8F', '#C19A6B', '#9B7653'
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Link to={`/books/${book._id}`}>
      <div className="book-card group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        {/* Book cover design */}
        <div className="relative h-80 w-56 rounded-lg overflow-hidden"
             style={{ 
               backgroundColor: randomColor,
               boxShadow: '6px 6px 15px rgba(0,0,0,0.3), inset -3px 0 6px rgba(0,0,0,0.2)'
             }}>
          
          {/* Book cover gradient overlay */}
          <div className="absolute inset-0 opacity-20"
               style={{
                 background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)'
               }}></div>
          
          {/* Book spine edge */}
          <div className="absolute left-0 top-0 h-full w-3 opacity-40"
               style={{
                 background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)',
               }}></div>
          
          {/* Book content */}
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            {/* Title */}
            <div>
              <h3 className="font-bold text-xl mb-3 line-clamp-4 leading-tight"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}>
                {book.title}
              </h3>
            </div>
            
            {/* Author and details at bottom */}
            <div>
              <p className="text-base font-semibold mb-1"
                 style={{ 
                   color: '#FFFFFF',
                   fontFamily: 'var(--font-body)',
                   textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                 }}>
                {book.author}
              </p>
              {book.genre && (
                <p className="text-sm opacity-90"
                   style={{ 
                     color: '#FFFFFF',
                     fontFamily: 'var(--font-body)'
                   }}>
                  {book.genre}
                </p>
              )}
              {book.publishedYear && (
                <p className="text-xs opacity-75 mt-1"
                   style={{ 
                     color: '#FFFFFF',
                     fontFamily: 'var(--font-body)'
                   }}>
                  Published: {book.publishedYear}
                </p>
              )}
            </div>
          </div>
          
          {/* Decorative corner elements */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white opacity-30"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white opacity-30"></div>
          
          {/* Page edge effect */}
          <div className="absolute right-0 top-0 h-full w-2 opacity-50"
               style={{
                 background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 2px, transparent 2px, transparent 4px)'
               }}></div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;