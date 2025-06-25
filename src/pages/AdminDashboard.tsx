import { useProductStore } from '../store/productStore';
import DashboardPanel from '../components/DashboardPanel';

export default function AdminDashboard() {
  const { products } = useProductStore();

  // Example summary data
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalCategories = [...new Set(products.map((p) => p.category))].length;
  const averagePrice =
    products.length > 0
      ? products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length
      : 0;

  return (
    <DashboardPanel title="Resumen" activeKey="summary">
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
          <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-amber-700">
              {averagePrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
            </span>
            <span className="text-gray-500">Precio promedio</span>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Producto agregado</p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b pb-3 border-gray-100">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
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
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl hover:shadow-md transition-shadow border border-sky-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-sky-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
                <span className="text-sm font-medium text-sky-700">Agregar producto</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl hover:shadow-md transition-shadow border border-violet-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-violet-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-violet-700">Ver reportes</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl hover:shadow-md transition-shadow border border-emerald-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-emerald-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-emerald-700">Ventas</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl hover:shadow-md transition-shadow border border-amber-200">
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
    </DashboardPanel>
  );
}
