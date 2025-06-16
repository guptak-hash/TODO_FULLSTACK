// src/services/todos.js
const API_URL = 'http://localhost:3000/api';

export const getTodos = async (token) => {
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        
        // if (!response.ok) {
        //     throw new Error(data.message || 'Failed to fetch todos');
        // }

        if (!data.success) {
            // Handle cases where success is false but status code is 200
            console.log('No todos found:', data.message);
            return { todos: [], count: 0, source: 'none' };
        }

        return {
            todos: data.todos || [],
            count: data.count || 0,
            source: data.source || 'unknown',
            message: data.message
        };
        
    } catch (error) {
        console.error('Fetch todos error:', error);
        throw new Error(error.message || 'Network error while fetching todos');
    }
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