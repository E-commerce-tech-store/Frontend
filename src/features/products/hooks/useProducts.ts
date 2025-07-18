import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';
import type { Product } from '../interfaces/product';

export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id?: string;
  image?: string;
};

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const
};

// Get all products
export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: async () => {
      return await productService.getAllProducts();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true // Always refetch when component mounts
  });
};

// Get single product
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      return await productService.getProductById(id);
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000 // 10 minutes
  });
};

// Create product (Admin only)
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: ProductFormData) => {
      return await productService.createProduct({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        category_id: productData.category_id || '',
        image_url: productData.image
      });
    },
    onSuccess: () => {
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create product:', error);
      throw error; // Re-throw for component error handling
    }
  });
};

// Update product (Admin only)
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Product> }) => {
      return await productService.updateProduct(id, data);
    },
    onSuccess: (updatedProduct) => {
      // Update the specific product in cache
      queryClient.setQueryData(productKeys.detail(updatedProduct.id), updatedProduct);
      // Invalidate products list to refetch
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update product:', error);
      throw error; // Re-throw for component error handling
    }
  });
};

// Delete product (Admin only)
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await productService.deleteProduct(id);
      return id;
    },
    onSuccess: (deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
      // Invalidate products list to refetch
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete product:', error);
      throw error; // Re-throw for component error handling
    }
  });
};

// Custom hook to refetch products manually
export const useRefetchProducts = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: productKeys.lists() });
  };
};
