import axios from 'axios';

// Base API configuration
export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes('/auth/login');
      const isOnLoginPage = window.location.pathname === '/login';

      if (!isLoginRequest && !isOnLoginPage) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Category API endpoints
export const categoryAPI = {
  // Get all categories (Public)
  getAll: () => api.get('/categories'),

  // Get categories with product count (Public)
  getWithCount: () => api.get('/categories/with-count'),

  // Get category by ID (Public)
  getById: (id: string) => api.get(`/categories/${id}`),

  // Create new category (Admin only)
  create: (category: { name: string; description: string }) => api.post('/categories', category),

  // Update category (Admin only)
  update: (id: string, category: { name: string; description: string }) =>
    api.put(`/categories/${id}`, category),

  // Delete category (Admin only)
  delete: (id: string) => api.delete(`/categories/${id}`)
};

// Order API endpoints
export const orderAPI = {
  // Create new order (User only)
  create: (orderData: { items: { id_product: string; quantity: number }[] }) =>
    api.post('/orders', orderData),

  // Get user's orders (User only)
  getUserOrders: () => api.get('/orders'),

  // Get order by ID (User/Admin)
  getById: (id: string) => api.get(`/orders/${id}`),

  // Get all orders (Admin only)
  getAll: () => api.get('/orders/all'),

  // Update order status (Admin only)
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status })
};
