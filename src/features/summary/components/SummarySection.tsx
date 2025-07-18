import { useProducts } from '@features/products/hooks/useProducts';
import {
  PlusIcon,
  PencilIcon,
  ChartBarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

interface SummarySectionProps {
  onSectionChange: (section: string) => void;
  onAddProduct: () => void;
}

export default function SummarySection({ onSectionChange, onAddProduct }: SummarySectionProps) {
  const { data: products = [] } = useProducts();

  // Calculate summary metrics
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalCategories = [...new Set(products.map((p) => p.category))].length;
  const totalRevenue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stock ? Math.round(p.stock * 0.7) : 0),
    0
  );

  return (
    <section className="z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-sky-700">{totalProducts}</span>
          <span className="text-gray-500">Productos</span>
        </div>
        <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-violet-700">{totalStock}</span>
          <span className="text-gray-500">Stock total</span>
        </div>
        <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-emerald-700">{totalCategories}</span>
          <span className="text-gray-500">Categorías</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">Productos recientes</h2>
      <div className="bg-white/90 rounded-2xl shadow overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-100 text-sky-700">
                <th className="py-3 px-4 font-semibold">Nombre</th>
                <th className="py-3 px-4 font-semibold">Precio</th>
                <th className="py-3 px-4 font-semibold">Categoría</th>
                <th className="py-3 px-4 font-semibold">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((p) => (
                <tr key={p.id} className="border-b last:border-b-0 hover:bg-sky-50/40 transition">
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">
                    {p.price?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                  </td>
                  <td className="py-3 px-4">{p.category}</td>
                  <td className="py-3 px-4">{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/80 rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Actividad reciente</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 border-b pb-3 border-gray-100">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                <PlusIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Producto agregado</p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-b pb-3 border-gray-100">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                <PencilIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Producto actualizado</p>
                <p className="text-xs text-gray-500">Hace 1 día</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Stock bajo</p>
                <p className="text-xs text-gray-500">Hace 3 días</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Enlaces rápidos</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                onSectionChange('products');
                setTimeout(onAddProduct, 100);
              }}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl hover:shadow-md transition-shadow border border-sky-200"
            >
              <PlusIcon className="h-8 w-8 text-sky-600" />
              <span className="text-sm font-medium text-sky-700">Agregar producto</span>
            </button>
            <button
              onClick={() => onSectionChange('reports')}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl hover:shadow-md transition-shadow border border-violet-200"
            >
              <ChartBarIcon className="h-8 w-8 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">Ver reportes</span>
            </button>
            <button
              onClick={() => onSectionChange('orders')}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl hover:shadow-md transition-shadow border border-emerald-200"
            >
              <CurrencyDollarIcon className="h-8 w-8 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Pedidos</span>
            </button>
            <button
              onClick={() => onSectionChange('users')}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl hover:shadow-md transition-shadow border border-amber-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-amber-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-sm font-medium text-amber-700">Usuarios</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
