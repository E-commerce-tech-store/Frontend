import { useState } from 'react';
import {
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useAllOrders, useUpdateOrderStatus, useCancelOrder } from '../hooks/useOrders';
import { useAuthStatus } from '@features/auth/hooks/useAuth';
import { formatCOP } from '@shared/utils/formatCOP';
import type { OrderResponse } from '../services/orderService';

// Helper function to transform API data to component format
const transformOrderData = (apiOrder: OrderResponse): Order => {
  return {
    id: apiOrder.id,
    orderNumber: `ORD-${apiOrder.id.slice(-8).toUpperCase()}`,
    customerName: apiOrder.tbl_user.name,
    customerEmail: apiOrder.tbl_user.email,
    date: apiOrder.created_at,
    status: apiOrder.status as Order['status'],
    total: parseFloat(apiOrder.total),
    items: apiOrder.tbl_order_details.map((item) => ({
      id: item.id,
      name: item.tbl_products.name,
      quantity: parseInt(item.quantity),
      price: parseFloat(item.current_price)
    }))
  };
};

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'FINISHED' | 'PENDING' | 'CANCELLED';
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

  const { isAdmin } = useAuthStatus();
  const { data: ordersData, isLoading, error } = useAllOrders();
  const updateOrderStatusMutation = useUpdateOrderStatus();
  const cancelOrderMutation = useCancelOrder();

  // Transform API data to component format
  const orders: Order[] = ordersData ? ordersData.map(transformOrderData) : [];

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, text: 'Pendiente' },
      FINISHED: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, text: 'Entregado' },
      CANCELLED: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, text: 'Cancelado' }
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
    pending: orders.filter((o) => o.status === 'PENDING').length,
    delivered: orders.filter((o) => o.status === 'FINISHED').length,
    cancelled: orders.filter((o) => o.status === 'CANCELLED').length
  };

  const totalRevenue = orders
    .filter((o) => o.status === 'FINISHED')
    .reduce((sum, order) => sum + order.total, 0);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatusMutation.mutateAsync({ id: orderId, status: newStatus });
    } catch (error) {
      console.error('Failed to update order status:', error);
      // You might want to show a toast notification here
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await cancelOrderMutation.mutateAsync(orderId);
      setShowOrderDetail(null); // Close modal after canceling
    } catch (error) {
      console.error('Failed to cancel order:', error);
      // You might want to show a toast notification here
    }
  };

  if (isLoading) {
    return (
      <section className="z-10">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="z-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar los pedidos</h3>
          <p className="text-red-600">
            No se pudieron cargar los pedidos. Por favor, intenta nuevamente.
          </p>
        </div>
      </section>
    );
  }

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">{orderStats.total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
          <div className="text-sm text-gray-500">Pendientes</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{orderStats.delivered}</div>
          <div className="text-sm text-gray-500">Entregados</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600">{formatCOP(totalRevenue)}</div>
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
              <option value="PENDING">Pendiente</option>
              <option value="FINISHED">Entregado</option>
              <option value="CANCELLED">Cancelado</option>
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
                  <td className="py-3 px-4 font-medium">{formatCOP(order.total)}</td>
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
                          Total: <span className="font-bold text-lg">{formatCOP(order.total)}</span>
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
                            <p className="font-medium">{formatCOP(item.price)}</p>
                            <p className="text-sm text-gray-600">
                              Subtotal: {formatCOP(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.status !== 'CANCELLED' && order.status !== 'FINISHED' && isAdmin && (
                    <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3 justify-end">
                      {order.status === 'PENDING' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'FINISHED')}
                          disabled={updateOrderStatusMutation.isPending}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          Marcar como Entregado
                        </button>
                      )}
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancelOrderMutation.isPending}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
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
