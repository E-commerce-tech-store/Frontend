import { orderAPI } from '@shared/services/api';

export interface OrderItem {
  id_product: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
}

export interface OrderItemResponse {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
  };
}

export interface OrderResponse {
  id: string;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
  updated_at: string;
  items: OrderItemResponse[];
}

export const orderService = {
  // Create a new order
  createOrder: async (orderData: CreateOrderRequest): Promise<OrderResponse> => {
    const response = await orderAPI.create(orderData);
    return response.data;
  },

  // Get user's orders
  getUserOrders: async (): Promise<OrderResponse[]> => {
    const response = await orderAPI.getUserOrders();
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<OrderResponse> => {
    const response = await orderAPI.getById(id);
    return response.data;
  },

  // Get all orders (Admin only)
  getAllOrders: async (): Promise<OrderResponse[]> => {
    const response = await orderAPI.getAll();
    return response.data;
  },

  // Update order status (Admin only)
  updateOrderStatus: async (id: string, status: string): Promise<OrderResponse> => {
    const response = await orderAPI.updateStatus(id, status);
    return response.data;
  }
};
