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
  id_product: string;
  id_order: string;
  quantity: string;
  subtotal: string;
  current_price: string;
  created_at: string;
  tbl_products: {
    id: string;
    category_id: string;
    name: string;
    stock: string;
    description: string;
    price: string;
    image_url: string;
    status: boolean;
    created_at: string;
  };
}

export interface OrderResponse {
  id: string;
  id_user: string;
  total: string;
  created_at: string;
  status: 'FINISHED' | 'PENDING' | 'CANCELLED';
  tbl_order_details: OrderItemResponse[];
  tbl_user: {
    id: string;
    name: string;
    email: string;
  };
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
  },

  // Cancel order
  cancelOrder: async (id: string): Promise<void> => {
    await orderAPI.cancelOrder(id);
  }
};
