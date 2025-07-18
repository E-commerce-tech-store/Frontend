import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../icons/Logo';
import {
  HomeIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TagIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline';

interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  path?: string;
}

const DEFAULT_MENU: MenuItem[] = [
  {
    key: 'summary',
    label: 'Resumen',
    path: '/admin/dashboard',
    icon: <HomeIcon className="h-5 w-5" />
  },
  {
    key: 'products',
    label: 'Productos',
    path: '/admin/products',
    icon: <ShoppingBagIcon className="h-5 w-5" />
  },
  {
    key: 'reports',
    label: 'Reportes',
    path: '/admin/reports',
    icon: <ChartBarIcon className="h-5 w-5" />
  },
  {
    key: 'categories',
    label: 'Categorías',
    path: '/admin/categories',
    icon: <TagIcon className="h-5 w-5" />
  },
  {
    key: 'orders',
    label: 'Órdenes',
    path: '/admin/orders',
    icon: <ShoppingCartIcon className="h-5 w-5" />
  },
  {
    key: 'users',
    label: 'Usuarios',
    path: '/admin/users',
    icon: <UserGroupIcon className="h-5 w-5" />
  }
];

interface DashboardPanelProps {
  children: ReactNode;
  title?: string;
  menu?: MenuItem[];
  activeKey?: string;
}

export default function DashboardPanel({
  children,
  title = 'Panel de Administración',
  menu = DEFAULT_MENU,
  activeKey = 'summary'
}: DashboardPanelProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white/90 via-sky-600/10 to-violet-100/60">
      <aside
        className={`
          ${collapsed ? 'w-20' : 'w-64'}
          min-h-screen bg-white/80 border-r border-gray-100 shadow-2xl 
          flex flex-col py-8 px-4 z-20 transition-all duration-300
        `}
      >
        <div
          className="mb-10 flex items-center justify-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <Logo />
          {!collapsed && (
            <span className="ml-2 text-2xl font-black text-sky-700 tracking-tight">Admin</span>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-4 -right-3 bg-white w-6 h-6 rounded-full border border-gray-200 shadow-md flex items-center justify-center text-sky-600 hover:bg-sky-50 transition-colors"
        >
          {collapsed ? (
            <ArrowRightIcon className="h-3 w-3" />
          ) : (
            <ArrowLeftIcon className="h-3 w-3" />
          )}
        </button>

        <nav className="flex flex-col gap-2 flex-grow">
          {menu.map((item) => (
            <Link
              key={item.key}
              to={item.path || '#'}
              replace
              className={`
                text-left px-4 py-3 rounded-xl font-semibold transition-colors flex items-center
                ${
                  activeKey === item.key
                    ? 'bg-sky-100 text-sky-700 shadow'
                    : 'text-gray-700 hover:bg-sky-50'
                }
              `}
            >
              {item.icon && <span className="mr-3">{item.icon}</span>}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-gray-600 hover:text-sky-600 transition-colors px-4 py-2 rounded-xl"
          >
            <HomeIcon className="h-5 w-5" />
            {!collapsed && <span>Ir a la tienda</span>}
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors px-4 py-2 rounded-xl"
          >
            <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
            {!collapsed && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 flex flex-col items-stretch relative">
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-sky-600/20 rounded-full blur-2xl opacity-40 pointer-events-none animate-pulse" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-violet-200/30 rounded-full blur-lg opacity-30 pointer-events-none animate-pulse" />

        <div className="flex justify-between items-center mb-8 z-10">
          <h1 className="text-3xl font-black text-sky-700 tracking-tight">{title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover border-2 border-sky-600/30 shadow"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="Avatar"
              />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-700">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@techcomp.com'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-colors shadow-sm"
                title="Cerrar Sesión"
                aria-label="Logout"
              >
                <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="z-10 flex-grow">{children}</div>
      </main>
    </div>
  );
}
