import { TrashIcon } from '@heroicons/react/24/outline';
import { formatCOP } from '@shared/utils/formatCOP';
import { useCartStore } from '../store/cartStore';

export default function CartDetail() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
          <p className="text-gray-400 text-lg font-medium">Tu carrito está vacío.</p>
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
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <h3 className="text-2xl font-bold text-sky-700">Total: {formatCOP(total)}</h3>
            <button
              onClick={clearCart}
              className="bg-gradient-to-r from-red-500 to-pink-400 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:from-red-600 hover:to-pink-500 transition-all text-lg"
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </section>
  );
}
