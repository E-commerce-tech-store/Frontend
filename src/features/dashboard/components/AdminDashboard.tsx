import { useState } from 'react';
import DashboardPanel from '@/features/dashboard/components/DashboardPanel';
import SummarySection from '@features/summary/components/SummarySection';
import ProductsSection from '@features/products/components/ProductsSection';
import CategoriesSection from '@features/categories/components/CategoriesSection';
import ReportsSection from '@features/reports/components/ReportsSection';
import OrdersSection from '@features/orders/components/OrdersSection';
import UsersSection from '@features/users/components/UsersSection';
import { useProducts } from '@features/products/hooks/useProducts';

import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  // Fetch products data - TanStack Query will handle caching and refetching
  useProducts();

  // Get path to determine which section to show
  const path = window.location.pathname;

  // Set the active section based on the current path
  const getInitialSection = () => {
    if (path.includes('/admin/products')) return 'products';
    if (path.includes('/admin/categories')) return 'categories';
    if (path.includes('/admin/reports')) return 'reports';
    if (path.includes('/admin/orders')) return 'orders';
    if (path.includes('/admin/users')) return 'users';
    return 'summary'; // default
  };

  const [currentSection, setCurrentSection] = useState(getInitialSection());

  // Handle adding a new product (for the summary section)
  const handleAddProduct = () => {
    // This will be handled by ProductsSection internally when the section changes
    setCurrentSection('products');
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
              onClick={() => setCurrentSection('categories')}
              className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                currentSection === 'categories'
                  ? 'text-sky-600 border-sky-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
            >
              <TagIcon className="w-4 h-4 mr-2" />
              Categorías
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
          <li className="mr-2">
            <button
              onClick={() => setCurrentSection('orders')}
              className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                currentSection === 'orders'
                  ? 'text-sky-600 border-sky-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
            >
              <ClipboardDocumentListIcon className="w-4 h-4 mr-2" />
              Pedidos
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setCurrentSection('users')}
              className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                currentSection === 'users'
                  ? 'text-sky-600 border-sky-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
            >
              <UsersIcon className="w-4 h-4 mr-2" />
              Usuarios
            </button>
          </li>
        </ul>
      </div>

      {/* SUMMARY SECTION */}
      {currentSection === 'summary' && (
        <SummarySection onSectionChange={setCurrentSection} onAddProduct={handleAddProduct} />
      )}

      {/* PRODUCTS SECTION */}
      {currentSection === 'products' && <ProductsSection />}

      {/* CATEGORIES SECTION */}
      {currentSection === 'categories' && <CategoriesSection />}

      {/* REPORTS SECTION */}
      {currentSection === 'reports' && <ReportsSection />}

      {/* ORDERS SECTION */}
      {currentSection === 'orders' && <OrdersSection />}

      {/* USERS SECTION */}
      {currentSection === 'users' && <UsersSection />}
    </DashboardPanel>
  );
}
