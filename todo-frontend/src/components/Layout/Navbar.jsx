// src/components/Layout/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink 
            to="/todos" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            My Todos
          </NavLink>
        </li>
        <li className="nav-item">
          <span className="user-greeting">
            Hello, {user?.name}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;