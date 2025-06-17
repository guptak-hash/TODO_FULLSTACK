// src/hooks/useTodos.js
import { useState, useEffect } from 'react';
import { 
  getTodos, 
  createTodo as apiCreateTodo, 
  updateTodo as apiUpdateTodo, 
  deleteTodo as apiDeleteTodo 
} from '../services/todos';
import { useAuth } from '../context/AuthContext';

export const useTodos = () => {
  const { token } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const data = await getTodos(token);
      setTodos(data.todos);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo) => {
    try {
      const newTodo = await apiCreateTodo(todo, token);
      // const newTodoData=await newTodo.json()
      setTodos(prev => [...prev, newTodo.todo]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodoStatus = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo._id === id);
      const updatedTodo = await apiUpdateTodo(id, 
        { status: todoToUpdate.status === 'Pending' ? 'Completed' : 'Pending' }, 
        token
      );
      setTodos(prev => prev.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeTodo = async (id) => {
    try {
      await apiDeleteTodo(id, token);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);


  // In your useTodos hook
// const updateTodo = async (id, updates) => {
//   try {
//     const updatedTodo = await apiUpdateTodo(id, updates, token);
//     setTodos(prev => prev.map(todo => 
//       todo._id === id ? updatedTodo : todo
//     ));
//   } catch (err) {
//     setError(err.message);
//     throw err;
//   }
// };

const updateTodo = async (id, updates) => {
  try {
    const updatedTodo = await apiUpdateTodo(id, updates, token);
    setTodos(prev => prev.map(todo => 
      todo._id === id ? { ...todo, ...updatedTodo } : todo
    ));
    return updatedTodo;
  } catch (err) {
    setError(err.message);
    throw err;
  }
};

// Add this to the returned object
return { todos, loading, error, addTodo, toggleTodoStatus, removeTodo, updateTodo };

  // return { todos, loading, error, addTodo, toggleTodoStatus, removeTodo, refreshTodos: fetchTodos };
};