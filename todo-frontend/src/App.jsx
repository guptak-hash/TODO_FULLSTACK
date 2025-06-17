// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate, HashRouter} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import TodoList from './components/Todo/TodoList';
import Header from './components/Layout/Header';
import './styles/themes.css';
import './styles/utilities.css';
// import { HashRouter } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ThemeProvider>
          <div className="app-container">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
                <Route path="/todos" element={
                  <PrivateRoute>
                    <TodoList />
                  </PrivateRoute>
                } />
                {/* <Route path="/" element={<Navigate to="/todos" replace />} /> */}
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;