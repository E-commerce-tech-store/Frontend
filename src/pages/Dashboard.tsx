import { useState } from 'react';
import { useProductStore } from '../store/productStore';
import type { Product } from '../store/productStore';
import ProductForm from '../components/ProductForm';

const MENU = [
  { key: 'summary', label: 'Resumen' },
  { key: 'products', label: 'Productos' },
  { key: 'reports', label: 'Reportes' },
  { key: 'categories', label: 'Categorías' }
];

export default function Dashboard() {
  const { products, deleteProduct } = useProductStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [section, setSection] = useState('summary');

  // Example summary data
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white/90 via-sky-600/10 to-violet-100/60">
      {/* Aside menu */}
      <aside className="w-60 min-h-screen bg-white/80 border-r border-gray-100 shadow-2xl flex flex-col py-8 px-4 z-20">
        <div className="mb-10 text-2xl font-black text-sky-700 tracking-tight text-center">
          Admin
        </div>
        <nav className="flex flex-col gap-2">
          {MENU.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`text-left px-4 py-2 rounded-xl font-semibold transition-colors ${section === item.key ? 'bg-sky-100 text-sky-700 shadow' : 'text-gray-700 hover:bg-sky-50'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-10 flex flex-col items-stretch relative">
        {/* Blurred background shapes */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-sky-600/20 rounded-full blur-2xl opacity-40 pointer-events-none animate-pulse" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-violet-200/30 rounded-full blur-lg opacity-30 pointer-events-none animate-pulse" />
        {section === 'summary' && (
          <section className="z-10">
            <h2 className="text-3xl font-black mb-8 text-sky-700 tracking-tight text-center drop-shadow">
              Resumen
            </h2>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col items-center">
                <span className="text-2xl font-bold text-sky-700">{totalProducts}</span>
                <span className="text-gray-500">Productos</span>
              </div>
              <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col items-center">
                <span className="text-2xl font-bold text-violet-700">{totalStock}</span>
                <span className="text-gray-500">Stock total</span>
              </div>
            </div>
          </section>
        )}
        {section === 'products' && (
          <section className="z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Productos</h3>
              <button
                onClick={() => {
                  setEditing(null);
                  setShowForm(true);
                }}
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-full shadow transition-colors"
              >
                Agregar producto
              </button>
            </div>
            {showForm && (
              <div className="mb-6">
                <ProductForm
                  product={editing || undefined}
                  onSave={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                />
              </div>
            )}
            <div className="overflow-x-auto rounded-xl shadow mb-6">
              <table className="w-full text-left border-collapse bg-white/90">
                <thead>
                  <tr className="bg-sky-100 text-sky-700 text-base">
                    <th className="py-3 px-4 font-semibold">Nombre</th>
                    <th className="py-3 px-4 font-semibold">Precio</th>
                    <th className="py-3 px-4 font-semibold">Categoría</th>
                    <th className="py-3 px-4 font-semibold">Stock</th>
                    <th className="py-3 px-4 font-semibold">Descripción</th>
                    <th className="py-3 px-4 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b last:border-b-0 hover:bg-sky-50/40 transition"
                    >
                      <td className="py-3 px-4">{p.name}</td>
                      <td className="py-3 px-4">{p.price}</td>
                      <td className="py-3 px-4">{p.category}</td>
                      <td className="py-3 px-4">{p.stock}</td>
                      <td className="py-3 px-4">{p.description}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button
                          onClick={() => {
                            setEditing(p);
                            setShowForm(true);
                          }}
                          className="bg-violet-500 hover:bg-violet-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {section === 'reports' && (
          <section className="bg-white/80 rounded-2xl shadow p-6 mb-8 z-10">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Reportes y Gráficas</h3>
            <div className="text-gray-400">(Aquí irán los reportes y gráficas personalizadas)</div>
          </section>
        )}
        {section === 'categories' && (
          <section className="bg-white/80 rounded-2xl shadow p-6 z-10">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Gestión de Categorías (opcional)
            </h3>
            <div className="text-gray-400">
              (Aquí puedes agregar la gestión de categorías si lo deseas)
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
