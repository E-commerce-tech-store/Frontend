import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useCreateProduct, useUpdateProduct } from '../hooks/useProducts';
import { useCategoryStore } from '@features/categories/store/categoryStore';
import type { Product } from '@/features/products/interfaces/product';

interface ProductFormProps {
  product?: Product;
  onSave?: () => void;
}

export default function ProductForm({ product, onSave }: ProductFormProps) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name ?? '',
    price: product?.price ?? 0,
    category_id: product?.category_id ?? '',
    stock: product?.stock ?? 0,
    description: product?.description ?? '',
    image_url: product?.image_url ?? ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEdit && product) {
        await updateProductMutation.mutateAsync({ id: product.id, data: form });
        toast.success('Producto actualizado exitosamente');
      } else {
        await createProductMutation.mutateAsync(form);
        toast.success('Producto creado exitosamente');
      }
      if (onSave) onSave();
      if (!isEdit) {
        setForm({
          name: '',
          price: 0,
          category_id: '',
          stock: 0,
          description: '',
          image_url: ''
        });
      }
    } catch (error: unknown) {
      console.error('Error saving product:', error);

      // Handle validation errors from backend
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string | string[] } } };
        const backendErrors = axiosError.response?.data?.message;

        if (Array.isArray(backendErrors)) {
          backendErrors.forEach((err) => toast.error(err));
        } else if (typeof backendErrors === 'string') {
          toast.error(backendErrors);
        } else {
          toast.error('Error al guardar el producto');
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error inesperado al guardar el producto');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mb-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del producto
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Precio en COP"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Cantidad disponible"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            required
          />
        </div>
      </div>

      <div className="mb-2">
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={form.category_id}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción del producto"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 min-h-[100px]"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          URL de la imagen
        </label>
        <input
          id="image"
          name="image"
          value={form.image_url}
          onChange={handleChange}
          placeholder="URL de la imagen del producto"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 text-white rounded-lg transition-colors shadow-md font-medium ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'
        }`}
      >
        {isSubmitting ? 'Guardando...' : isEdit ? 'Actualizar Producto' : 'Agregar Producto'}
      </button>
    </form>
  );
}
