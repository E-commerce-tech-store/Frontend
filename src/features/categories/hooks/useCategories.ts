import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryAPI } from '@shared/services/api';

export type Category = {
  id: string;
  name: string;
  description: string;
  created_at?: string;
};

export type CategoryWithCount = Category & {
  _count?: {
    tbl_products?: number;
  };
};

export type CategoryFormData = {
  name: string;
  description: string;
};

// Query keys
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  withCount: () => [...categoryKeys.all, 'with-count'] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const
};

// Get all categories
export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: async () => {
      const response = await categoryAPI.getAll();
      return response.data as Category[];
    },
    staleTime: 10 * 60 * 1000 // 10 minutes
  });
};

// Get categories with product count
export const useCategoriesWithCount = () => {
  return useQuery({
    queryKey: categoryKeys.withCount(),
    queryFn: async () => {
      const response = await categoryAPI.getWithCount();
      return response.data as CategoryWithCount[];
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

// Get single category
export const useCategory = (id: string) => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: async () => {
      const response = await categoryAPI.getById(id);
      return response.data as Category;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000 // 10 minutes
  });
};

// Create category (Admin only)
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryData: CategoryFormData) => {
      const response = await categoryAPI.create(categoryData);
      return response.data as Category;
    },
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.withCount() });
    },
    onError: (error) => {
      console.error('Failed to create category:', error);
    }
  });
};

// Update category (Admin only)
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CategoryFormData }) => {
      const response = await categoryAPI.update(id, data);
      return response.data as Category;
    },
    onSuccess: (updatedCategory) => {
      // Update the specific category in cache
      queryClient.setQueryData(categoryKeys.detail(updatedCategory.id), updatedCategory);
      // Invalidate categories lists to refetch
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.withCount() });
    },
    onError: (error) => {
      console.error('Failed to update category:', error);
    }
  });
};

// Delete category (Admin only)
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await categoryAPI.delete(id);
      return id;
    },
    onSuccess: (deletedId) => {
      // Remove the category from cache
      queryClient.removeQueries({ queryKey: categoryKeys.detail(deletedId) });
      // Invalidate categories lists to refetch
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.withCount() });
    },
    onError: (error) => {
      console.error('Failed to delete category:', error);
    }
  });
};
