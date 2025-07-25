// import { useState } from 'react';
// import { useProducts } from '@features/products/hooks/useProducts';
// import { ArrowDownIcon, ArrowUpIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function ReportsSection() {
  // const { data: products = [] } = useProducts();

  // const [salesData] = useState([
  //   { month: 'Ene', sales: 1200000 },
  //   { month: 'Feb', sales: 1500000 },
  //   { month: 'Mar', sales: 1800000 },
  //   { month: 'Abr', sales: 1400000 },
  //   { month: 'May', sales: 1600000 },
  //   { month: 'Jun', sales: 2100000 }
  // ]);

  // // Calculate month-over-month growth
  // const currentMonthSales = salesData[salesData.length - 1]?.sales || 0;
  // const previousMonthSales = salesData[salesData.length - 2]?.sales || 0;

  return (
    <section className="z-10">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/90 rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Ventas Mensuales</h3>
          <div className="h-60 relative">
            <svg className="w-full h-full" viewBox="0 0 300 150">
              <line x1="40" y1="10" x2="40" y2="130" stroke="#e5e7eb" strokeWidth="2" />
              <line x1="40" y1="130" x2="290" y2="130" stroke="#e5e7eb" strokeWidth="2" />
              <rect x="50" y="90" width="30" height="40" fill="#0369a1" rx="3" />
              <rect x="90" y="70" width="30" height="60" fill="#0369a1" rx="3" />
              <rect x="130" y="50" width="30" height="80" fill="#0369a1" rx="3" />
              <rect x="170" y="80" width="30" height="50" fill="#0369a1" rx="3" />
              <rect x="210" y="60" width="30" height="70" fill="#0369a1" rx="3" />
              <rect x="250" y="30" width="30" height="100" fill="#0284c7" rx="3" />

              <text x="65" y="145" textAnchor="middle" fontSize="12" fill="#6b7280">
                Ene
              </text>
              <text x="105" y="145" textAnchor="middle" fontSize="12" fill="#6b7280">
                Feb
              </text>
              <text x="145" y="145" textAnchor="middle" fontSize="12" fill="#6b7280">
                Mar
              </text>
              <text x="185" y="145" textAnchor="middle" fontSize="12" fill="#6b7280">
                Abr
              </text>
              <text x="225" y="145" textAnchor="middle" fontSize="12" fill="#6b7280">
                May
              </text>
              <text x="265" y="145" textAnchor="middle" fontSize="12" fill="#6b7280">
                Jun
              </text>
            </svg>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Este mes</p>
              <p className="text-xl font-bold text-sky-700">
                {salesData[salesData.length - 1]?.sales.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP'
                })}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {previousMonthSales && currentMonthSales > previousMonthSales ? (
                <ArrowUpIcon className="h-4 w-4 text-emerald-600" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  previousMonthSales && currentMonthSales > previousMonthSales
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }`}
              >
                {Math.abs(
                  ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
                ).toFixed(1)}
                %
              </span>
              <span className="text-sm text-gray-500">vs mes anterior</span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Ventas por Categoría</h3>
          <div className="h-60 relative">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <path d="M100,100 L100,20 A80,80 0 0,1 176,126 z" fill="#0ea5e9" />
              <path d="M100,100 L176,126 A80,80 0 0,1 36,130 z" fill="#8b5cf6" />
              <path d="M100,100 L36,130 A80,80 0 0,1 100,20 z" fill="#f59e0b" />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sky-500"></div>
              <span className="text-sm text-gray-600">Electronics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-500"></div>
              <span className="text-sm text-gray-600">Computers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-gray-600">Accessories</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/90 rounded-2xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Productos Más Vendidos</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-100 text-sky-700">
                <th className="py-3 px-4 font-semibold">Producto</th>
                <th className="py-3 px-4 font-semibold">Categoría</th>
                <th className="py-3 px-4 font-semibold">Unidades vendidas</th>
                <th className="py-3 px-4 font-semibold">Ingresos</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((p, index) => {
                const soldUnits = Math.round((5 - index) * 3 + Math.random() * 10);
                const revenue = soldUnits * p.price;

                return (
                  <tr key={p.id} className="border-b last:border-b-0 hover:bg-sky-50/40 transition">
                    <td className="py-3 px-4 flex items-center gap-3">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                          <ShoppingBagIcon className="h-5 w-5" />
                        </div>
                      )}
                      <span className="font-medium">{p.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-sky-100 text-sky-800 rounded-md text-xs">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">{soldUnits}</td>
                    <td className="py-3 px-4">
                      {revenue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100 flex justify-end">
          <button className="py-2 px-4 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-lg transition-colors">
            Descargar reporte completo
          </button>
        </div>
      </div> */}
    </section>
  );
}
