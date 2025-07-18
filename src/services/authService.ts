import { api } from './api';

// Types for authentication
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AdminData {
  message: string;
  // Add other admin-specific data properties as needed
}

export interface UpdateProfileData {
  name?: string;
}

// Authentication API service
export const authService = {
  // Register a new user
  register: async (data: RegisterData): Promise<LoginResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Login user
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // Get user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  // Access admin-only route
  getAdminData: async (): Promise<AdminData> => {
    const response = await api.get('/auth/admin-only');
    return response.data;
  }
};

// Helper functions for token management
export const tokenService = {
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  setToken: (token: string): void => {
    localStorage.setItem('auth_token', token);
  },

  removeToken: (): void => {
    localStorage.removeItem('auth_token');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
};

// Helper functions for user data management
export const userService = {
  getUser: (): User | null => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  setUser: (user: User): void => {
    localStorage.setItem('user_data', JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem('user_data');
  }
};
