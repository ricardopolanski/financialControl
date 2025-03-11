// src/services/api.js

const API_BASE_URL = 'http://localhost:3000'; // adjust this to your API URL

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Return an array of error messages instead of a single string
      const errorMessages = data?.errors?.map(err => err.message) || ['Registration failed'];
      return { errors: errorMessages };  // Return errors as an object
    }

    return data;
  } catch (error) {
    console.error(error);
    return { errors: ['Something went wrong with registration'] };  // Return errors object for consistency
  }
};

// Add this to your existing src/services/api.js file

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle different types of login errors
      if (response.status === 401) {
        return { errors: ['Invalid username or password'] };
      } else {
        const errorMessages = data?.errors?.map(err => err.message) || ['Login failed'];
        return { errors: errorMessages };
      }
    }

    return data; // Contains token and user information
  } catch (error) {
    console.error(error);
    return { errors: ['Something went wrong with login'] };
  }
};




