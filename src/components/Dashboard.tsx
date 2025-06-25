import { useState } from 'react';
import { useProductStore } from '../store/productStore';
import type { Product } from '../store/productStore';
import ProductForm from './ProductForm';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { products, deleteProduct } = useProductStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
        <Link
          to="/"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded shadow transition-colors"
        >
          Ir a la tienda
        </Link>
      </div>
      <button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
      >
        Add Product
      </button>
      {showForm && (
        <ProductForm
          product={editing || undefined}
          onSave={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
      <h3>Product List</h3>
      <table border={1} cellPadding={8} style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>{p.description}</td>
              <td>
                <button
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteProduct(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
