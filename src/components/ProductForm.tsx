import React, { useState } from 'react';
import { useProductStore } from '../store/productStore';
import type { Product } from '../store/productStore';

interface ProductFormProps {
  product?: Product;
  onSave?: () => void;
}

export default function ProductForm({ product, onSave }: ProductFormProps) {
  const isEdit = !!product;
  const [form, setForm] = useState<Product>(
    product || { id: '', name: '', price: 0, category: '', stock: 0, description: '', image: '' }
  );
  const { addProduct, updateProduct } = useProductStore();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isEdit) {
      updateProduct(form);
    } else {
      addProduct({ ...form, id: Date.now().toString() });
    }
    if (onSave) onSave();
    setForm({ id: '', name: '', price: 0, category: '', stock: 0, description: '', image: '' });
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
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <input
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Categoría del producto"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          required
        />
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
          value={form.image}
          onChange={handleChange}
          placeholder="URL de la imagen del producto"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors shadow-md font-medium"
      >
        {isEdit ? 'Actualizar' : 'Agregar'} Producto
      </button>
    </form>
  );
}
