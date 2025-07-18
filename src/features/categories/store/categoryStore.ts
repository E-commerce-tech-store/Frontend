import { create } from 'zustand';
import toast from 'react-hot-toast';
import { categoryAPI } from '@shared/services/api';

export interface Category {
  id: string;
  name: string;
  status: boolean;
  created_at: string;
  _count: {
    tbl_products: number;
  };
}

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchCategories: () => Promise<void>;
  fetchCategoriesWithCount: () => Promise<void>;
  createCategory: (category: { name: string; description: string }) => Promise<void>;
  updateCategory: (id: string, category: { name: string; description: string }) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await categoryAPI.getAll();
      set({ categories: response.data, loading: false });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
        loading: false
      });
    }
  },

  fetchCategoriesWithCount: async () => {
    set({ loading: true, error: null });
    try {
      const response = await categoryAPI.getWithCount();
      set({ categories: response.data, loading: false });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch categories with count',
        loading: false
      });
    }
  },

  createCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await categoryAPI.create(category);
      const currentCategories = get().categories;
      set({
        categories: [...currentCategories, response.data],
        loading: false
      });
      toast.success('Categoría creada exitosamente');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear la categoría';
      set({
        error: errorMessage,
        loading: false
      });
      toast.error(errorMessage);
      throw error;
    }
  },

  updateCategory: async (id, category) => {
    set({ loading: true, error: null });
    try {
      const response = await categoryAPI.update(id, category);
      const currentCategories = get().categories;
      set({
        categories: currentCategories.map((cat) => (cat.id === id ? response.data : cat)),
        loading: false
      });
      toast.success('Categoría actualizada exitosamente');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error al actualizar la categoría';
      set({
        error: errorMessage,
        loading: false
      });
      toast.error(errorMessage);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      await categoryAPI.delete(id);
      const currentCategories = get().categories;
      set({
        categories: currentCategories.filter((cat) => cat.id !== id),
        loading: false
      });
      toast.success('Categoría eliminada exitosamente');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error al eliminar la categoría';
      set({
        error: errorMessage,
        loading: false
      });
      toast.error(errorMessage);
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));
