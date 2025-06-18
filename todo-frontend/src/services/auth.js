// src/services/auth.js
const API_URL = 'https://todo-backend-hcu0.onrender.com/api';

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  // const data=await response.json()
// console.log('response inside auth.js >> ',data)
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
 
  return response.json();
};

export const signup = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signup failed');
  }

  return response.json();
};