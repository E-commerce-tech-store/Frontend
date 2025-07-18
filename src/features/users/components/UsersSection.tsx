import { useState } from 'react';
import {
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  status: 'active' | 'inactive' | 'banned';
  registrationDate: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
}

export default function UsersSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showUserDetail, setShowUserDetail] = useState<string | null>(null);

  // Mock users data
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      role: 'customer',
      status: 'active',
      registrationDate: '2024-01-15',
      lastLogin: '2024-07-18',
      totalOrders: 5,
      totalSpent: 3750000
    },
    {
      id: '2',
      name: 'María García',
      email: 'maria.garcia@email.com',
      role: 'customer',
      status: 'active',
      registrationDate: '2024-02-20',
      lastLogin: '2024-07-17',
      totalOrders: 3,
      totalSpent: 2250000
    },
    {
      id: '3',
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      role: 'customer',
      status: 'inactive',
      registrationDate: '2024-03-10',
      lastLogin: '2024-06-15',
      totalOrders: 1,
      totalSpent: 450000
    },
    {
      id: '4',
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      role: 'customer',
      status: 'active',
      registrationDate: '2024-04-05',
      lastLogin: '2024-07-18',
      totalOrders: 2,
      totalSpent: 4050000
    },
    {
      id: '5',
      name: 'Admin Usuario',
      email: 'admin@ecommerce.com',
      role: 'admin',
      status: 'active',
      registrationDate: '2023-12-01',
      lastLogin: '2024-07-18',
      totalOrders: 0,
      totalSpent: 0
    },
    {
      id: '6',
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@email.com',
      role: 'customer',
      status: 'banned',
      registrationDate: '2024-05-12',
      lastLogin: '2024-07-01',
      totalOrders: 0,
      totalSpent: 0
    }
  ]);

  const getRoleBadge = (role: User['role']) => {
    const roleConfig = {
      admin: { color: 'bg-purple-100 text-purple-800', icon: ShieldCheckIcon, text: 'Admin' },
      customer: { color: 'bg-blue-100 text-blue-800', icon: UserIcon, text: 'Cliente' }
    };

    const config = roleConfig[role];
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <IconComponent className="h-3 w-3" />
        {config.text}
      </span>
    );
  };

  const getStatusBadge = (status: User['status']) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Activo' },
      inactive: { color: 'bg-gray-100 text-gray-800', text: 'Inactivo' },
      banned: { color: 'bg-red-100 text-red-800', text: 'Bloqueado' }
    };

    const config = statusConfig[status];

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: users.length,
    customers: users.filter((u) => u.role === 'customer').length,
    admins: users.filter((u) => u.role === 'admin').length,
    active: users.filter((u) => u.status === 'active').length,
    inactive: users.filter((u) => u.status === 'inactive').length,
    banned: users.filter((u) => u.status === 'banned').length
  };

  return (
    <section className="z-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gestión de Usuarios</h2>
        <div className="text-sm text-gray-600">
          Total de usuarios: <span className="font-medium">{users.length}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">{userStats.total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{userStats.customers}</div>
          <div className="text-sm text-gray-500">Clientes</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{userStats.admins}</div>
          <div className="text-sm text-gray-500">Admins</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{userStats.active}</div>
          <div className="text-sm text-gray-500">Activos</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">{userStats.inactive}</div>
          <div className="text-sm text-gray-500">Inactivos</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{userStats.banned}</div>
          <div className="text-sm text-gray-500">Bloqueados</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/90 rounded-2xl shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">Todos los roles</option>
              <option value="customer">Clientes</option>
              <option value="admin">Administradores</option>
            </select>
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="banned">Bloqueado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/90 rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-100 text-sky-700">
                <th className="py-3 px-4 font-semibold">Usuario</th>
                <th className="py-3 px-4 font-semibold">Rol</th>
                <th className="py-3 px-4 font-semibold">Estado</th>
                <th className="py-3 px-4 font-semibold">Registro</th>
                <th className="py-3 px-4 font-semibold">Último acceso</th>
                <th className="py-3 px-4 font-semibold">Pedidos</th>
                <th className="py-3 px-4 font-semibold">Total gastado</th>
                <th className="py-3 px-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-b-0 hover:bg-sky-50/40 transition"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                  <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                  <td className="py-3 px-4">
                    {new Date(user.registrationDate).toLocaleDateString('es-CO')}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(user.lastLogin).toLocaleDateString('es-CO')}
                  </td>
                  <td className="py-3 px-4 text-center">{user.totalOrders}</td>
                  <td className="py-3 px-4">
                    {user.totalSpent > 0
                      ? user.totalSpent.toLocaleString('es-CO', {
                          style: 'currency',
                          currency: 'COP'
                        })
                      : '-'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowUserDetail(user.id)}
                        className="p-1.5 bg-sky-100 rounded-md text-sky-700 hover:bg-sky-200 transition-colors"
                        title="Ver detalles"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 bg-yellow-100 rounded-md text-yellow-700 hover:bg-yellow-200 transition-colors"
                        title="Editar usuario"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      {user.role !== 'admin' && (
                        <button
                          className="p-1.5 bg-red-100 rounded-md text-red-700 hover:bg-red-200 transition-colors"
                          title="Eliminar usuario"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    {searchTerm || selectedRole !== 'all' || selectedStatus !== 'all'
                      ? 'No se encontraron usuarios con los filtros aplicados.'
                      : 'No hay usuarios disponibles.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {showUserDetail && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowUserDetail(null)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {(() => {
              const user = users.find((u) => u.id === showUserDetail);
              if (!user) return null;

              return (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="flex gap-2 mt-2">
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <UserGroupIcon className="h-5 w-5" />
                        Información del Usuario
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <span>
                            Registro: {new Date(user.registrationDate).toLocaleDateString('es-CO')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                          <span>
                            Último acceso: {new Date(user.lastLogin).toLocaleDateString('es-CO')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {user.role === 'customer' && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Estadísticas de Compras
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total de pedidos:</span>
                            <span className="font-medium">{user.totalOrders}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total gastado:</span>
                            <span className="font-medium">
                              {user.totalSpent > 0
                                ? user.totalSpent.toLocaleString('es-CO', {
                                    style: 'currency',
                                    currency: 'COP'
                                  })
                                : 'Sin compras'}
                            </span>
                          </div>
                          {user.totalOrders > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Promedio por pedido:</span>
                              <span className="font-medium">
                                {(user.totalSpent / user.totalOrders).toLocaleString('es-CO', {
                                  style: 'currency',
                                  currency: 'COP'
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {user.role !== 'admin' && (
                    <div className="pt-4 border-t border-gray-200 flex gap-3 justify-end">
                      {user.status === 'active' && (
                        <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                          Suspender Usuario
                        </button>
                      )}
                      {user.status === 'inactive' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Activar Usuario
                        </button>
                      )}
                      {user.status !== 'banned' && (
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          Bloquear Usuario
                        </button>
                      )}
                      {user.status === 'banned' && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Desbloquear Usuario
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
