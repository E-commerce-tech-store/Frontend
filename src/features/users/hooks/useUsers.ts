import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { userService } from '../services/userService';
import type { CreateUserRequest, UpdateUserRequest } from '../services/userService';

// Helper function to extract error message
const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'data' in error.response &&
    error.response.data &&
    typeof error.response.data === 'object' &&
    'message' in error.response.data
  ) {
    return String(error.response.data.message);
  }
  return defaultMessage;
};

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  stats: () => [...userKeys.all, 'stats'] as const,
  orders: (id: string) => [...userKeys.all, 'orders', id] as const
};

// Hook to get all users
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: userService.getUsers,
    staleTime: 30000, // 30 seconds
    gcTime: 5 * 60 * 1000 // 5 minutes
  });
};

// Hook to get user statistics
export const useUserStats = () => {
  return useQuery({
    queryKey: userKeys.stats(),
    queryFn: userService.getUserStats,
    staleTime: 60000, // 1 minute
    gcTime: 5 * 60 * 1000 // 5 minutes
  });
};

// Hook to get user by ID
export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000
  });
};

// Hook to get user orders
export const useUserOrders = (id: string) => {
  return useQuery({
    queryKey: userKeys.orders(id),
    queryFn: () => userService.getUserOrders(id),
    enabled: !!id,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000
  });
};

// Hook to create user
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserRequest) => userService.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
      toast.success('Usuario creado exitosamente');
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error, 'Error al crear usuario');
      toast.error(message);
    }
  });
};

// Hook to update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: UpdateUserRequest }) =>
      userService.updateUser(id, userData),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(updatedUser.id) });
      toast.success('Usuario actualizado exitosamente');
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error, 'Error al actualizar usuario');
      toast.error(message);
    }
  });
};

// Hook to delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
      toast.success('Usuario eliminado exitosamente');
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error, 'Error al eliminar usuario');
      toast.error(message);
    }
  });
};

// Hook to update user status (activate/deactivate/ban)
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      userService.updateUser(id, { status }),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(updatedUser.id) });

      const statusText = updatedUser.status ? 'activado' : 'desactivado';
      toast.success(`Usuario ${statusText} exitosamente`);
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error, 'Error al cambiar estado del usuario');
      toast.error(message);
    }
  });
};
