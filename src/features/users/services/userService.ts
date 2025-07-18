import { api } from '@shared/services/api';

// User interfaces based on backend response
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  status: boolean;
  created_at: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string | null;
}

export interface UserStats {
  totalUsers: number;
  adminUsers: number;
  regularUsers: number;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: 'ADMIN' | 'USER';
  status: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'ADMIN' | 'USER';
  status?: boolean;
}

export interface UserOrder {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    productName: string;
  }>;
}

// User API service
export const userService = {
  // Get all users with order statistics
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get user statistics
  getUserStats: async (): Promise<UserStats> => {
    const response = await api.get('/users/stats');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Get user order history
  getUserOrders: async (id: string): Promise<UserOrder[]> => {
    const response = await api.get(`/users/${id}/orders`);
    return response.data;
  },

  // Create new user
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id: string, userData: UpdateUserRequest): Promise<User> => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  },

  // Soft delete user (set status to false)
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  }
};
