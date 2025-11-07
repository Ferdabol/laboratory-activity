// Primary Button Component
export const PrimaryButton = ({ children, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#B85C38] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5C3D2E] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

// Secondary Button Component
export const SecondaryButton = ({ children, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#5C3D2E] text-[#E0C097] px-6 py-3 rounded-lg font-semibold hover:bg-[#2D2424] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

// Outline Button Component
export const OutlineButton = ({ children, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-transparent border-2 border-[#B85C38] text-[#B85C38] px-6 py-3 rounded-lg font-semibold hover:bg-[#B85C38] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

// Small Button Component
export const SmallButton = ({ children, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#B85C38] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#5C3D2E] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

// Delete/Danger Button Component
export const DangerButton = ({ children, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

// Light Button Component (for use on dark backgrounds)
export const LightButton = ({ children, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-white text-[#5C3D2E] px-6 py-3 rounded-lg font-semibold hover:bg-[#E0C097] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

// Icon Button Component
export const IconButton = ({ children, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-full hover:bg-[#E0C097] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

