// src/components/Layout/Header.jsx
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../UI/Button';
import Navbar from './Navbar';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Todo App</h1>
        <div className="header-actions">
          {user && (
            <Navbar />
          )}
          <Button 
            variant="secondary" 
            size="small"
            onClick={toggleTheme}
            className="theme-toggle"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Button>
          {user && (
            <Button 
              variant="danger" 
              size="small"
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;