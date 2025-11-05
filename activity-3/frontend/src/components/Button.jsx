const Button = ({ children, onClick, type = "button", variant = "primary", className = "" }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0";
  
  const variants = {
    primary: "shadow-md hover:shadow-lg",
    secondary: "border-2 hover:shadow-md",
    danger: "shadow-md hover:shadow-lg"
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-text-light)'
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      borderColor: 'var(--color-primary)'
    },
    danger: {
      backgroundColor: '#C85A54',
      color: 'var(--color-text-light)'
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </button>
  );
};

export default Button;