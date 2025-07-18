import { api } from '@shared/services/api';
import type { Product } from '../interfaces/product';

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  image_url?: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category_id?: string;
  image_url?: string;
}

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get('/products');
    return response.data;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async createProduct(product: CreateProductRequest): Promise<Product> {
    const response = await api.post('/products', product);
    return response.data;
  },

  async updateProduct(id: string, product: UpdateProductRequest): Promise<Product> {
    const response = await api.patch(`/products/${id}`, product);
    return response.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  }
};
