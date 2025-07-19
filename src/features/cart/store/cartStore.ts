import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TransformedProduct } from '@/features/products/interfaces/product';

export interface CartItem extends TransformedProduct {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: TransformedProduct) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              )
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item))
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalAmount: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage',
      // Only persist the items array
      partialize: (state) => ({ items: state.items })
    }
  )
);
