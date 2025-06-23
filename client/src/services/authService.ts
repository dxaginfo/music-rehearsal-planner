import axios from 'axios';
import { LoginCredentials, RegisterData, User } from '../types';

const API_URL = '/api/auth';

const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data.user;
};

const register = async (userData: RegisterData): Promise<User> => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data.user;
};

const logout = async (): Promise<void> => {
  localStorage.removeItem('token');
};

const checkAuthStatus = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};

const authService = {
  login,
  register,
  logout,
  checkAuthStatus,
};

export default authService;