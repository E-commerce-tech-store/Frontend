import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  image?: string;
};

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [
    {
      id: '1',
      name: 'Wireless Mouse',
      price: 89000, // $89.000 COP
      category: 'Electronics',
      stock: 15,
      description: 'A comfortable wireless mouse with ergonomic design.',
      image:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '2',
      name: 'Bluetooth Headphones',
      price: 259000, // $259.000 COP
      category: 'Electronics',
      stock: 8,
      description: 'Noise-cancelling over-ear headphones with long battery life.',
      image:
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '3',
      name: 'Mechanical Keyboard',
      price: 349000, // $349.000 COP
      category: 'Electronics',
      stock: 5,
      description: 'RGB backlit mechanical keyboard for gaming and work.',
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80'
    }
  ],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p))
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id)
    }))
}));
