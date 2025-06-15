// src/services/todos.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const getTodos = async (token) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch todos');
  }

  return response.json();
};

export const createTodo = async (todo, token) => {
  const response = await fetch(`${API_URL}/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create todo');
  }

  return response.json();
};

export const updateTodo = async (id, updates, token) => {
  const response = await fetch(`${API_URL}/todo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update todo');
  }

  return response.json();
};

export const deleteTodo = async (id, token) => {
  const response = await fetch(`${API_URL}/todo/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete todo');
  }

  return response.json();
};