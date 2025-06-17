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
    try {
        const response = await fetch(`${API_URL}/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: todo.title,
                description: todo.description,
                status: todo.status || 'Pending'
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle field-specific errors
            if (data.field) {
                throw new Error(`${data.field}: ${data.message}`);
            }
            throw new Error(data.message || 'Failed to create todo');
        }

        return {
            success: true,
            message: data.message,
            todo: data.todo
        };

    } catch (error) {
        console.error('Create todo error:', error);
        throw error; // Re-throw for handling in UI
    }
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
    try {
        const response = await fetch(`${API_URL}/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete todo');
        }

        if (!data.success) {
            throw new Error(data.message || 'Todo deletion unsuccessful');
        }

        return {
            success: true,
            deletedId: data.deletedId,
            message: data.message,
            todo: data.deletedTodo
        };
        
    } catch (error) {
        console.error('Delete todo error:', error);
        throw error; // Re-throw for error handling in components
    }
};