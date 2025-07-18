import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';
import type { Product, TransformedProduct } from '../interfaces/product';

export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id?: string;
  image_url?: string;
};

// Helper function to transform API response to component-friendly format
const transformProduct = (product: Product): TransformedProduct => ({
  id: product.id,
  name: product.name,
  price: Number(product.price),
  category: product.tbl_categories.name,
  categoryId: product.category_id,
  stock: Number(product.stock),
  description: product.description,
  image: product.image_url,
  createdAt: product.created_at
});

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
      const products = await productService.getAllProducts();
      // Transform the API response to match component expectations
      return products.map(transformProduct);
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
      const product = await productService.getProductById(id);
      // Transform the API response to match component expectations
      return transformProduct(product);
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
      const newProduct = await productService.createProduct({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        category_id: productData.category_id || '',
        image_url: productData.image_url
      });
      // Transform the created product response
      return transformProduct(newProduct);
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
    mutationFn: async ({ id, data }: { id: string; data: Partial<TransformedProduct> }) => {
      // Transform data back to API format
      const apiData = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category_id: data.categoryId,
        image_url: data.image
      };
      const updatedProduct = await productService.updateProduct(id, apiData);
      // Transform the updated product response
      return transformProduct(updatedProduct);
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
