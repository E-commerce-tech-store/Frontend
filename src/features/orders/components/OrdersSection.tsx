import { useState } from 'react';
import {
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  TruckIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function OrdersSection() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOrderDetail, setShowOrderDetail] = useState<string | null>(null);

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      customerName: 'Juan Pérez',
      customerEmail: 'juan.perez@email.com',
      date: '2024-07-15',
      status: 'delivered',
      total: 2500000,
      items: [{ id: '1', name: 'iPhone 15 Pro', quantity: 1, price: 2500000 }]
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      customerName: 'María García',
      customerEmail: 'maria.garcia@email.com',
      date: '2024-07-16',
      status: 'shipped',
      total: 1800000,
      items: [{ id: '2', name: 'MacBook Air M2', quantity: 1, price: 1800000 }]
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      customerName: 'Carlos López',
      customerEmail: 'carlos.lopez@email.com',
      date: '2024-07-17',
      status: 'processing',
      total: 450000,
      items: [{ id: '3', name: 'AirPods Pro', quantity: 1, price: 450000 }]
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      customerName: 'Ana Martínez',
      customerEmail: 'ana.martinez@email.com',
      date: '2024-07-18',
      status: 'pending',
      total: 3200000,
      items: [{ id: '4', name: 'iMac 24"', quantity: 1, price: 3200000 }]
    },
    {
      id: '5',
      orderNumber: 'ORD-2024-005',
      customerName: 'Luis Rodríguez',
      customerEmail: 'luis.rodriguez@email.com',
      date: '2024-07-10',
      status: 'cancelled',
      total: 850000,
      items: [{ id: '5', name: 'iPad Air', quantity: 1, price: 850000 }]
    }
  ]);

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, text: 'Pendiente' },
      processing: { color: 'bg-blue-100 text-blue-800', icon: ClockIcon, text: 'Procesando' },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: TruckIcon, text: 'Enviado' },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, text: 'Entregado' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, text: 'Cancelado' }
    };

    const config = statusConfig[status];
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

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length
  };

  const totalRevenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <section className="z-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gestión de Pedidos</h2>
        <div className="text-sm text-gray-600">
          Total de pedidos: <span className="font-medium">{orders.length}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">{orderStats.total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
          <div className="text-sm text-gray-500">Pendientes</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{orderStats.processing}</div>
          <div className="text-sm text-gray-500">Procesando</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{orderStats.shipped}</div>
          <div className="text-sm text-gray-500">Enviados</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{orderStats.delivered}</div>
          <div className="text-sm text-gray-500">Entregados</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600">
            {totalRevenue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
          </div>
          <div className="text-sm text-gray-500">Ingresos</div>
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
                placeholder="Buscar por número de pedido, cliente o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="processing">Procesando</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/90 rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-100 text-sky-700">
                <th className="py-3 px-4 font-semibold">Número de Pedido</th>
                <th className="py-3 px-4 font-semibold">Cliente</th>
                <th className="py-3 px-4 font-semibold">Fecha</th>
                <th className="py-3 px-4 font-semibold">Estado</th>
                <th className="py-3 px-4 font-semibold">Total</th>
                <th className="py-3 px-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b last:border-b-0 hover:bg-sky-50/40 transition"
                >
                  <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{new Date(order.date).toLocaleDateString('es-CO')}</td>
                  <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                  <td className="py-3 px-4 font-medium">
                    {order.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setShowOrderDetail(order.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-sky-100 text-sky-700 rounded-md hover:bg-sky-200 transition-colors text-sm"
                    >
                      <EyeIcon className="h-4 w-4" />
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    {searchTerm || selectedStatus !== 'all'
                      ? 'No se encontraron pedidos con los filtros aplicados.'
                      : 'No hay pedidos disponibles.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showOrderDetail && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowOrderDetail(null)}
            >
              <XCircleIcon className="h-6 w-6" />
            </button>

            {(() => {
              const order = orders.find((o) => o.id === showOrderDetail);
              if (!order) return null;

              return (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-sky-700">
                    Detalles del Pedido {order.orderNumber}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Información del Cliente</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Nombre:</span> {order.customerName}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> {order.customerEmail}
                        </p>
                        <p>
                          <span className="font-medium">Fecha:</span>{' '}
                          {new Date(order.date).toLocaleDateString('es-CO')}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Estado del Pedido</h4>
                      <div className="space-y-2">
                        {getStatusBadge(order.status)}
                        <p className="text-sm text-gray-600">
                          Total:{' '}
                          <span className="font-bold text-lg">
                            {order.total.toLocaleString('es-CO', {
                              style: 'currency',
                              currency: 'COP'
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Productos</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {item.price.toLocaleString('es-CO', {
                                style: 'currency',
                                currency: 'COP'
                              })}
                            </p>
                            <p className="text-sm text-gray-600">
                              Subtotal:{' '}
                              {(item.price * item.quantity).toLocaleString('es-CO', {
                                style: 'currency',
                                currency: 'COP'
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3 justify-end">
                      {order.status === 'pending' && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Marcar como Procesando
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Marcar como Enviado
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Marcar como Entregado
                        </button>
                      )}
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Cancelar Pedido
                      </button>
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
