import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const login = async (username, password) => {
  try {
    console.log('Attempting login with:', { username, password });
    
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    
    console.log('Login response:', response);
    
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('Token stored in localStorage');
      return true;
    } else {
      console.error('No token received in response:', response.data);
      return false;
    }
  } catch (error) {
    console.error('Login failed with error:', error);
    
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {

      console.error('No response received from server:', error.request);
    } else {

      console.error('Error setting up request:', error.message);
    }
    
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  console.log('User logged out, token removed');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log('Checking authentication, token exists:', !!token);
  return !!token;
};

export const getToken = () => {
  return localStorage.getItem('token');
};