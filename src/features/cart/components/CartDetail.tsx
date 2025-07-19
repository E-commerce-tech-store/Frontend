import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { formatCOP } from '@shared/utils/formatCOP';
import { useCartStore } from '../store/cartStore';
import { useCreateOrder } from '@features/orders/hooks/useOrders';
import { useAuth } from '@features/auth/context/AuthContext';

export default function CartDetail() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalAmount } = useCartStore();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const createOrderMutation = useCreateOrder();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = getTotalAmount();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para realizar un pedido');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Tu carrito está vacío');
      return;
    }

    setIsCheckingOut(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          id_product: item.id,
          quantity: item.quantity
        }))
      };

      await createOrderMutation.mutateAsync(orderData);

      // Clear cart after successful order
      clearCart();

      toast.success('¡Pedido realizado exitosamente!');
      navigate('/orders');
    } catch (error: unknown) {
      console.error('Error creating order:', error);

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string | string[] } } };
        const backendError = axiosError.response?.data?.message;

        if (Array.isArray(backendError)) {
          backendError.forEach((err) => toast.error(err));
        } else if (typeof backendError === 'string') {
          toast.error(backendError);
        } else {
          toast.error('Error al crear el pedido');
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error inesperado al crear el pedido');
      }
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <section className="w-full mx-auto bg-white/95 rounded-3xl shadow-2xl p-8 mt-12 border border-sky-100 relative overflow-hidden">
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-sky-600/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <h2 className="text-3xl font-black mb-8 text-sky-700 tracking-tight text-center drop-shadow">
        🛒 Tu Carrito
      </h2>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <span className="text-6xl mb-4">🛍️</span>
          <p className="text-gray-400 text-lg font-medium mb-6">Tu carrito está vacío.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-sky-600 to-violet-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-sky-700 hover:to-violet-500 transition-all text-lg"
          >
            Continuar comprando
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl shadow mb-6">
            <table className="w-full text-left border-collapse bg-white/90">
              <thead>
                <tr className="bg-sky-100 text-sky-700 text-base">
                  <th className="py-3 px-4 font-semibold">Producto</th>
                  <th className="py-3 px-4 font-semibold">Precio</th>
                  <th className="py-3 px-4 font-semibold">Cantidad</th>
                  <th className="py-3 px-4 font-semibold">Subtotal</th>
                  <th className="py-3 px-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-b-0 hover:bg-sky-50/40 transition"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-contain rounded-xl bg-gray-50 border border-sky-100 shadow-sm"
                      />
                      <span className="font-semibold text-gray-800">{item.name}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-sky-700">{formatCOP(item.price)}</td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="w-16 border border-sky-200 rounded-lg px-2 py-1 text-center focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition"
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold text-violet-700">
                      {formatCOP(item.price * item.quantity)}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 font-semibold px-3 py-1 rounded transition hover:bg-red-50"
                        title="Eliminar"
                      >
                        <TrashIcon className="w-5 h-5" />
                        <span className="sr-only">Eliminar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mt-8">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold text-sky-700 mb-2">Total: {formatCOP(total)}</h3>
              <p className="text-gray-600">
                {items.reduce((acc, item) => acc + item.quantity, 0)} productos en tu carrito
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={clearCart}
                className="bg-gradient-to-r from-red-500 to-pink-400 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:from-red-600 hover:to-pink-500 transition-all text-lg"
              >
                Vaciar carrito
              </button>

              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all text-lg"
              >
                Seguir comprando
              </button>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || createOrderMutation.isPending}
                className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-green-600 hover:to-emerald-500 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isCheckingOut || createOrderMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <ShoppingBagIcon className="w-5 h-5" />
                    Realizar Pedido
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
