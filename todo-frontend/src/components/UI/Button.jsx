// src/components/UI/Button.jsx
import './Button.css';

const Button = ({ children, variant = 'primary', size = 'medium', ...props }) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;