import { useState } from 'react';
import { useProductStore } from '../store/productStore';
import DashboardPanel from '../components/DashboardPanel';
import ProductForm from '../components/ProductForm';
import AdminOnlySection from '../components/AdminOnlySection';
import type { Product } from '../store/productStore';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  // Get path to determine which section to show
  const path = window.location.pathname;
  const { products, deleteProduct } = useProductStore();

  // Set the active section based on the current path
  const getInitialSection = () => {
    if (path.includes('/admin/products')) return 'products';
    if (path.includes('/admin/reports')) return 'reports';
    return 'summary'; // default
  };

  const [currentSection, setCurrentSection] = useState(getInitialSection());
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [salesData] = useState([
    { month: 'Ene', sales: 1200000 },
    { month: 'Feb', sales: 1500000 },
    { month: 'Mar', sales: 1800000 },
    { month: 'Abr', sales: 1400000 },
    { month: 'May', sales: 1600000 },
    { month: 'Jun', sales: 2100000 }
  ]);

  // const [categoryData] = useState([
  //   { category: 'Electronics', sales: 4500000 },
  //   { category: 'Computers', sales: 3200000 },
  //   { category: 'Accessories', sales: 1800000 }
  // ]);

  // Example summary data
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalCategories = [...new Set(products.map((p) => p.category))].length;
  const totalRevenue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stock ? Math.round(p.stock * 0.7) : 0),
    0
  );
  // const averagePrice =
  //   products.length > 0
  //     ? products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length
  //     : 0;

  // Calculate month-over-month growth
  const currentMonthSales = salesData[salesData.length - 1]?.sales || 0;
  const previousMonthSales = salesData[salesData.length - 2]?.sales || 0;
  // const salesGrowth = previousMonthSales
  //   ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
  //   : 0;

  // Handle adding a new product
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  // Handle editing a product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  // Handle saving a product (create or update)
  const handleSaveProduct = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (productId: string) => {
    setShowDeleteConfirm(productId);
  };

  // Handle delete product
  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId);
    setShowDeleteConfirm(null);
  };

  return (
    <DashboardPanel title="Panel de Negocio" activeKey={currentSection}>
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              onClick={() => setCurrentSection('summary')}
              className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                currentSection === 'summary'
                  ? 'text-sky-600 border-sky-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
            >
              <ChartBarIcon className="w-4 h-4 mr-2" />
              Resumen
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setCurrentSection('products')}
              className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                currentSection === 'products'
                  ? 'text-sky-600 border-sky-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
            >
              <ShoppingBagIcon className="w-4 h-4 mr-2" />
              Productos
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setCurrentSection('reports')}
              className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                currentSection === 'reports'
                  ? 'text-sky-600 border-sky-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
            >
              <CurrencyDollarIcon className="w-4 h-4 mr-2" />
              Reportes
            </button>
          </li>
        </ul>
      </div>

      {/* SUMMARY SECTION */}
      {currentSection === 'summary' && (
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
                {totalRevenue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
              </span>
              <span className="text-gray-500">Ingresos estimados</span>
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
                    <tr
                      key={p.id}
                      className="border-b last:border-b-0 hover:bg-sky-50/40 transition"
                    >
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
                    setCurrentSection('products');
                    setTimeout(() => handleAddProduct(), 100);
                  }}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl hover:shadow-md transition-shadow border border-sky-200"
                >
                  <PlusIcon className="h-8 w-8 text-sky-600" />
                  <span className="text-sm font-medium text-sky-700">Agregar producto</span>
                </button>
                <button
                  onClick={() => setCurrentSection('reports')}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl hover:shadow-md transition-shadow border border-violet-200"
                >
                  <ChartBarIcon className="h-8 w-8 text-violet-600" />
                  <span className="text-sm font-medium text-violet-700">Ver reportes</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl hover:shadow-md transition-shadow border border-emerald-200">
                  <CurrencyDollarIcon className="h-8 w-8 text-emerald-600" />
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

          {/* Admin Only Section */}
          <div className="mt-6">
            <AdminOnlySection />
          </div>
        </section>
      )}

      {/* PRODUCTS SECTION */}
      {currentSection === 'products' && (
        <section className="z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Gestión de Productos</h2>
            <button
              onClick={handleAddProduct}
              className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg flex items-center gap-2 transition-colors shadow-md"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Nuevo Producto</span>
            </button>
          </div>

          {/* Product Form Modal */}
          {showProductForm && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowProductForm(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <h3 className="text-xl font-bold mb-4 text-sky-700">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                <ProductForm product={editingProduct || undefined} onSave={handleSaveProduct} />
              </div>
            </div>
          )}

          {/* Product List */}
          <div className="bg-white/90 rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-sky-100 text-sky-700">
                    <th className="py-3 px-4 font-semibold">Imagen</th>
                    <th className="py-3 px-4 font-semibold">Nombre</th>
                    <th className="py-3 px-4 font-semibold">Precio</th>
                    <th className="py-3 px-4 font-semibold">Categoría</th>
                    <th className="py-3 px-4 font-semibold">Stock</th>
                    <th className="py-3 px-4 font-semibold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b last:border-b-0 hover:bg-sky-50/40 transition"
                    >
                      <td className="py-3 px-4">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                            <ShoppingBagIcon className="h-6 w-6" />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">
                        {product.price?.toLocaleString('es-CO', {
                          style: 'currency',
                          currency: 'COP'
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-sky-100 text-sky-800 rounded-md text-xs">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-medium ${product.stock <= 5 ? 'text-red-600' : 'text-green-600'}`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-1.5 bg-sky-100 rounded-md text-sky-700 hover:bg-sky-200 transition-colors"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteConfirm(product.id)}
                            className="p-1.5 bg-red-100 rounded-md text-red-700 hover:bg-red-200 transition-colors"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>

                      {/* Delete confirmation modal */}
                      {showDeleteConfirm === product.id && (
                        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">
                              Confirmar Eliminación
                            </h3>
                            <p className="text-gray-600 mb-6">
                              ¿Estás seguro que deseas eliminar el producto{' '}
                              <span className="font-semibold">{product.name}</span>? Esta acción no
                              se puede deshacer.
                            </p>
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 transition-colors"
                              >
                                Cancelar
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </tr>
                  ))}

                  {products.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-gray-500">
                        No hay productos disponibles. Agrega un nuevo producto para comenzar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* REPORTS SECTION */}
      {currentSection === 'reports' && (
        <section className="z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/90 rounded-2xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Ventas Mensuales</h3>
              <div className="h-60 relative">
                {/* Simple SVG bar chart representing monthly sales */}
                <svg className="w-full h-full" viewBox="0 0 300 150">
                  {/* Y axis */}
                  <line x1="40" y1="10" x2="40" y2="130" stroke="#e5e7eb" strokeWidth="2" />

                  {/* X axis */}
                  <line x1="40" y1="130" x2="290" y2="130" stroke="#e5e7eb" strokeWidth="2" />

                  {/* Bars - we'll just hardcode these for the UI mockup */}
                  <rect x="50" y="90" width="30" height="40" fill="#0369a1" rx="3" />
                  <rect x="90" y="70" width="30" height="60" fill="#0369a1" rx="3" />
                  <rect x="130" y="50" width="30" height="80" fill="#0369a1" rx="3" />
                  <rect x="170" y="80" width="30" height="50" fill="#0369a1" rx="3" />
                  <rect x="210" y="60" width="30" height="70" fill="#0369a1" rx="3" />
                  <rect x="250" y="30" width="30" height="100" fill="#0284c7" rx="3" />

                  {/* Labels */}
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
                {/* Simple SVG pie chart representing category distribution */}
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Simple pie chart - hardcoded for UI mockup */}
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
                    // Generate mock sales data for the report
                    const soldUnits = Math.round((5 - index) * 3 + Math.random() * 10);
                    const revenue = soldUnits * p.price;

                    return (
                      <tr
                        key={p.id}
                        className="border-b last:border-b-0 hover:bg-sky-50/40 transition"
                      >
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
          </div>
        </section>
      )}
    </DashboardPanel>
  );
}
