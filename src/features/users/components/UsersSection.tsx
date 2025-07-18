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
  UserGroupIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useUsers, useUserStats, useUpdateUserStatus, useDeleteUser } from '../hooks/useUsers';
import UserForm from './UserForm';
import type { User } from '../services/userService';

export default function UsersSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showUserDetail, setShowUserDetail] = useState<string | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);

  // Get data from API
  const { data: users = [], isLoading: usersLoading, error: usersError } = useUsers();
  const { data: userStats, isLoading: statsLoading } = useUserStats();
  const updateUserStatus = useUpdateUserStatus();
  const deleteUser = useDeleteUser();

  // Handle loading state
  if (usersLoading || statsLoading) {
    return (
      <section className="z-10">
        <div className="flex justify-center items-center h-96">
          <div className="text-lg text-gray-600">Cargando usuarios...</div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (usersError) {
    return (
      <section className="z-10">
        <div className="flex justify-center items-center h-96">
          <div className="text-lg text-red-600">Error al cargar usuarios</div>
        </div>
      </section>
    );
  }

  const getRoleBadge = (role: User['role']) => {
    const roleConfig = {
      ADMIN: { color: 'bg-purple-100 text-purple-800', icon: ShieldCheckIcon, text: 'Admin' },
      USER: { color: 'bg-blue-100 text-blue-800', icon: UserIcon, text: 'Cliente' }
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
      true: { color: 'bg-green-100 text-green-800', text: 'Activo' },
      false: { color: 'bg-red-100 text-red-800', text: 'Inactivo' }
    };

    const config = statusConfig[status.toString() as keyof typeof statusConfig];

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
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'active' && user.status) ||
      (selectedStatus === 'inactive' && !user.status);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const calculatedStats = {
    total: users.length,
    customers: users.filter((u) => u.role === 'USER').length,
    admins: users.filter((u) => u.role === 'ADMIN').length,
    active: users.filter((u) => u.status).length,
    inactive: users.filter((u) => !u.status).length
  };

  const handleStatusChange = (userId: string, newStatus: boolean) => {
    updateUserStatus.mutate({ id: userId, status: newStatus });
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      deleteUser.mutate(userId);
    }
  };

  return (
    <section className="z-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gestión de Usuarios</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Total de usuarios: <span className="font-medium">{users.length}</span>
          </div>
          <button
            onClick={() => setShowUserForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            Crear Usuario
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">{userStats?.totalUsers || 0}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{userStats?.regularUsers || 0}</div>
          <div className="text-sm text-gray-500">Clientes</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{userStats?.adminUsers || 0}</div>
          <div className="text-sm text-gray-500">Admins</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{calculatedStats.active}</div>
          <div className="text-sm text-gray-500">Activos</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{calculatedStats.inactive}</div>
          <div className="text-sm text-gray-500">Inactivos</div>
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
              <option value="USER">Clientes</option>
              <option value="ADMIN">Administradores</option>
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
                <th className="py-3 px-4 font-semibold">Última orden</th>
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
                    {new Date(user.created_at).toLocaleDateString('es-CO')}
                  </td>
                  <td className="py-3 px-4">
                    {user.lastOrderDate
                      ? new Date(user.lastOrderDate).toLocaleDateString('es-CO')
                      : 'Nunca'}
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
                      {user.role !== 'ADMIN' && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
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
                            Registro: {new Date(user.created_at).toLocaleDateString('es-CO')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                          <span>
                            Última orden:{' '}
                            {user.lastOrderDate
                              ? new Date(user.lastOrderDate).toLocaleDateString('es-CO')
                              : 'Sin órdenes'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {user.role === 'USER' && (
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

                  {user.role !== 'ADMIN' && (
                    <div className="pt-4 border-t border-gray-200 flex gap-3 justify-end">
                      {user.status && (
                        <button
                          onClick={() => handleStatusChange(user.id, false)}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                          Desactivar Usuario
                        </button>
                      )}
                      {!user.status && (
                        <button
                          onClick={() => handleStatusChange(user.id, true)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Activar Usuario
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

      {/* User Form Modal */}
      <UserForm isOpen={showUserForm} onClose={() => setShowUserForm(false)} />
    </section>
  );
}
