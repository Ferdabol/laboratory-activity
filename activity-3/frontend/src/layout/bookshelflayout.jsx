import Navbar from "../components/Navbar";

const BookshelfLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Bookshelf frame */}
        <div className="relative rounded-lg shadow-2xl p-6 md:p-8" 
             style={{ backgroundColor: 'var(--color-primary)' }}>
          
          {/* Wood grain texture effect */}
          <div className="absolute inset-0 opacity-10 rounded-lg pointer-events-none" 
               style={{
                 backgroundImage: `repeating-linear-gradient(
                   90deg,
                   transparent,
                   transparent 2px,
                   rgba(0,0,0,0.1) 2px,
                   rgba(0,0,0,0.1) 4px
                 )`
               }}>
          </div>
          
          {/* Top shelf edge */}
          <div className="absolute top-0 left-0 right-0 h-3 rounded-t-lg shadow-inner" 
               style={{ backgroundColor: 'var(--color-accent)' }}></div>
          
          {/* Content area - shelf interior */}
          <div className="relative rounded-md shadow-inner p-6 min-h-[60vh]" 
               style={{ backgroundColor: 'var(--color-bg)' }}>
            
            {/* Decorative shelf brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 rounded-tl-md opacity-40" 
                 style={{ borderColor: 'var(--color-primary)' }}></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 rounded-tr-md opacity-40" 
                 style={{ borderColor: 'var(--color-primary)' }}></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 rounded-bl-md opacity-40" 
                 style={{ borderColor: 'var(--color-primary)' }}></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 rounded-br-md opacity-40" 
                 style={{ borderColor: 'var(--color-primary)' }}></div>
            
            {/* Main content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
          
          {/* Bottom shelf edge */}
          <div className="absolute bottom-0 left-0 right-0 h-3 rounded-b-lg shadow-md" 
               style={{ backgroundColor: 'var(--color-accent)' }}></div>
          
          {/* Side supports */}
          <div className="absolute top-0 left-0 w-2 h-full rounded-l-lg" 
               style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)' }}></div>
          <div className="absolute top-0 right-0 w-2 h-full rounded-r-lg" 
               style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.2), transparent)' }}></div>
        </div>
      </main>
    </div>
  );
};

export default BookshelfLayout;
