import { useState } from 'react';
import { ClockIcon, CheckCircleIcon, XCircleIcon, EyeIcon } from '@heroicons/react/24/outline';
import { formatCOP } from '@shared/utils/formatCOP';
import { useUserOrders } from '../hooks/useOrders';
import type { OrderResponse } from '../services/orderService';

export default function OrderHistory() {
  const { data: orders = [], isLoading, error } = useUserOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);

  const getStatusInfo = (status: string) => {
    const statusConfig = {
      PENDING: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: ClockIcon,
        text: 'Pendiente'
      },
      FINISHED: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircleIcon,
        text: 'Entregado'
      },
      CANCELLED: {
        color: 'bg-red-100 text-red-800',
        icon: XCircleIcon,
        text: 'Cancelado'
      }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <section className="w-full mx-auto bg-white/95 rounded-3xl shadow-2xl p-8 mt-12 border border-sky-100">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full mx-auto bg-white/95 rounded-3xl shadow-2xl p-8 mt-12 border border-sky-100">
        <h2 className="text-3xl font-bold text-sky-700 mb-6">Historial de Pedidos</h2>
        <div className="text-center py-8">
          <p className="text-red-600">Error al cargar los pedidos. Por favor intenta de nuevo.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full mx-auto bg-white/95 rounded-3xl shadow-2xl p-8 mt-12 border border-sky-100 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-sky-600/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <h2 className="text-3xl font-black mb-8 text-sky-700 tracking-tight text-center drop-shadow">
          📋 Historial de Pedidos
        </h2>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-6xl mb-4">📦</span>
            <p className="text-gray-400 text-lg font-medium mb-6">
              Aún no has realizado ningún pedido.
            </p>
            <button
              onClick={() => (window.location.href = '/')}
              className="bg-gradient-to-r from-sky-600 to-violet-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-sky-700 hover:to-violet-500 transition-all text-lg"
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white/80 rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          Pedido #{order.id.slice(-8).toUpperCase()}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {statusInfo.text}
                        </span>
                      </div>

                      <div className="text-gray-600 space-y-1">
                        <p>Fecha: {formatDate(order.created_at)}</p>
                        <p>
                          Total:{' '}
                          <span className="font-bold text-sky-600">
                            {formatCOP(parseFloat(order.total))}
                          </span>
                        </p>
                        <p>Items: {order.tbl_order_details?.length} producto(s)</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-lg hover:bg-sky-200 transition-colors"
                      >
                        <EyeIcon className="w-4 h-4" />
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Detalles del Pedido #{selectedOrder.id.slice(-8).toUpperCase()}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Información del Pedido</h4>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Estado:</span>{' '}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                        getStatusInfo(selectedOrder.status).color
                      }`}
                    >
                      {getStatusInfo(selectedOrder.status).text}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Fecha:</span>{' '}
                    {formatDate(selectedOrder.created_at)}
                  </p>
                  <p>
                    <span className="font-medium">Total:</span>{' '}
                    <span className="font-bold text-lg text-sky-600">
                      {formatCOP(parseFloat(selectedOrder.total))}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Productos</h4>
              <div className="space-y-3">
                {selectedOrder.tbl_order_details.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.tbl_products.image_url}
                      alt={item.tbl_products.name}
                      className="w-16 h-16 object-contain rounded-lg bg-white border"
                    />
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800">{item.tbl_products.name}</h5>
                      <p className="text-gray-600 text-sm">{item.tbl_products.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600">
                          Cantidad: {item.quantity} × {formatCOP(parseFloat(item.current_price))}
                        </span>
                        <span className="font-bold text-sky-600">
                          {formatCOP(parseFloat(item.subtotal))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
