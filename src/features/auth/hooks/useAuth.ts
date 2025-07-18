import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, tokenService, userService } from '../services/authService';

export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
  adminData: () => [...authKeys.all, 'admin-data'] as const
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      // Store token and user data
      tokenService.setToken(data.token);
      userService.setUser(data.user);

      // Update query cache
      queryClient.setQueryData(authKeys.profile(), data.user);

      // Invalidate and refetch any cached data
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    }
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Store token and user data
      tokenService.setToken(data.token);
      userService.setUser(data.user);

      // Update query cache
      queryClient.setQueryData(authKeys.profile(), data.user);

      // Invalidate and refetch any cached data
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Clear local storage
      tokenService.removeToken();
      userService.removeUser();
    },
    onSuccess: () => {
      // Clear query cache
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear();
    }
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authService.getProfile,
    enabled: tokenService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: unknown) => {
      // Don't retry on 401 errors
      const axiosError = error as { response?: { status?: number } };
      if (axiosError?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    }
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (updatedUser) => {
      // Update local storage
      userService.setUser(updatedUser);

      // Update query cache
      queryClient.setQueryData(authKeys.profile(), updatedUser);
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
    }
  });
};

export const useAdminData = () => {
  const profile = useProfile();
  const isAdmin = profile.data?.role === 'ADMIN';

  return useQuery({
    queryKey: authKeys.adminData(),
    queryFn: authService.getAdminData,
    enabled: tokenService.isAuthenticated() && isAdmin,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: unknown) => {
      // Don't retry on 401 or 403 errors
      const axiosError = error as { response?: { status?: number } };
      if (axiosError?.response?.status === 401 || axiosError?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    }
  });
};

export const useAuthStatus = () => {
  const profile = useProfile();

  return {
    isAuthenticated: tokenService.isAuthenticated() && !!profile.data,
    isLoading: profile.isLoading,
    user: profile.data,
    isAdmin: profile.data?.role === 'ADMIN',
    isUser: profile.data?.role === 'USER'
  };
};
