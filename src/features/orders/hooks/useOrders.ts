import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orderService';
import type { CreateOrderRequest } from '../services/orderService';

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  userOrders: () => [...orderKeys.all, 'user'] as const,
  adminOrders: () => [...orderKeys.all, 'admin'] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const
};

// Get user's orders
export const useUserOrders = () => {
  return useQuery({
    queryKey: orderKeys.userOrders(),
    queryFn: orderService.getUserOrders,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

// Get order by ID
export const useOrder = (id: string) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000 // 10 minutes
  });
};

// Get all orders (Admin only)
export const useAllOrders = () => {
  return useQuery({
    queryKey: orderKeys.adminOrders(),
    queryFn: orderService.getAllOrders,
    staleTime: 2 * 60 * 1000 // 2 minutes
  });
};

// Create order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: CreateOrderRequest) => orderService.createOrder(orderData),
    onSuccess: (newOrder) => {
      // Invalidate and refetch user orders
      queryClient.invalidateQueries({ queryKey: orderKeys.userOrders() });
      // Add the new order to cache
      queryClient.setQueryData(orderKeys.detail(newOrder.id), newOrder);
    },
    onError: (error) => {
      console.error('Failed to create order:', error);
      throw error; // Re-throw for component error handling
    }
  });
};

// Update order status (Admin only)
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      orderService.updateOrderStatus(id, status),
    onSuccess: (updatedOrder) => {
      // Update the specific order in cache
      queryClient.setQueryData(orderKeys.detail(updatedOrder.id), updatedOrder);
      // Invalidate orders lists to refetch
      queryClient.invalidateQueries({ queryKey: orderKeys.userOrders() });
      queryClient.invalidateQueries({ queryKey: orderKeys.adminOrders() });
    },
    onError: (error) => {
      console.error('Failed to update order status:', error);
      throw error; // Re-throw for component error handling
    }
  });
};

// Cancel order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderService.cancelOrder(id),
    onSuccess: (_, orderId) => {
      // Invalidate orders lists to refetch
      queryClient.invalidateQueries({ queryKey: orderKeys.userOrders() });
      queryClient.invalidateQueries({ queryKey: orderKeys.adminOrders() });
      // Remove the specific order from cache
      queryClient.removeQueries({ queryKey: orderKeys.detail(orderId) });
    },
    onError: (error) => {
      console.error('Failed to cancel order:', error);
      throw error; // Re-throw for component error handling
    }
  });
};
