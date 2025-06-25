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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">{isEdit ? 'Update' : 'Add'} Product</button>
    </form>
  );
}
