import { useState } from 'react';
import toast from 'react-hot-toast';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '@features/cart/store/cartStore';
import { formatCOP } from '@shared/utils/formatCOP';
import type { Product } from '../interfaces/product';

export default function ProductGrid() {
  const { data: products = [], isLoading: loading, error } = useProducts();
  const { addToCart } = useCartStore();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});

  // Show error toast if there's an error
  if (error) {
    toast.error('Error al cargar los productos');
  }

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    for (let i = 0; i < qty; i++) addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 800);
  };

  if (loading) {
    return (
      <section className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-10 z-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white/90 rounded-3xl shadow-xl p-7 animate-pulse">
            <div className="w-36 h-36 bg-gray-200 rounded-2xl mb-5 mx-auto" />
            <div className="h-6 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded mb-4" />
            <div className="h-8 bg-gray-200 rounded" />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-10 z-10">
      <div className="absolute -top-20 left-1/3 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-violet-200/20 rounded-full blur-2xl opacity-30 pointer-events-none" />
      {products.length === 0 && <p>No products available.</p>}
      {products.map((product, i) => (
        <article
          key={i}
          className={`group relative bg-white/90 rounded-3xl shadow-xl p-7 flex flex-col items-center border border-gray-100 overflow-hidden transition-all duration-300 ${addedId === product.id ? 'ring-4 ring-green-400 scale-105 animate-pulse' : 'hover:scale-105 hover:shadow-2xl'}`}
        >
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-sky-600/20 rounded-full blur-xl opacity-40 pointer-events-none animate-pulse" />
          <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-violet-200/30 rounded-full blur-lg opacity-30 pointer-events-none animate-pulse" />
          <div className="absolute top-4 right-4 bg-sky-600/10 text-sky-600 px-3 py-1 rounded-full text-xs font-semibold z-10">
            Nuevo
          </div>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-36 h-36 object-contain mb-5 rounded-2xl bg-gray-50 shadow-md z-10 group-hover:scale-110 transition-transform duration-300"
          />
          <h3 className="text-2xl font-bold mb-1 text-gray-900 z-10 text-center group-hover:text-sky-700 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-gray-500 mb-3 text-sm z-10 text-center min-h-[40px]">
            {product.description}
          </p>
          <strong className="text-sky-600 text-2xl mb-4 font-semibold z-10">
            {formatCOP(product.price)}
          </strong>
          <div className="flex flex-col w-full gap-3 z-10 mt-auto">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <label htmlFor={`qty-${product.id}`} className="text-sm text-gray-500 font-medium">
                Cantidad:
              </label>
              <input
                id={`qty-${product.id}`}
                type="number"
                min={1}
                max={product.stock}
                value={quantities[product.id] || 1}
                onChange={(e) =>
                  setQuantities((q) => ({
                    ...q,
                    [product.id]: Math.max(1, Math.min(Number(e.target.value), product.stock))
                  }))
                }
                className="w-16 border border-sky-200 rounded-lg px-2 py-1 text-center focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition"
              />
              <span className="text-xs text-gray-400">Stock: {product.stock}</span>
            </div>
            <button
              className={`relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600/90 to-violet-400/90 text-white px-5 py-2.5 rounded-full font-semibold text-lg shadow-lg overflow-hidden transition-all duration-200 ${addedId === product.id ? 'bg-green-500/90 to-green-400/80 scale-105' : 'hover:from-sky-700 hover:to-violet-500 active:scale-95'}`}
              onClick={() => handleAddToCart(product)}
              disabled={addedId === product.id}
            >
              {addedId === product.id ? (
                <>
                  <CheckCircleIcon className="w-6 h-6 text-white animate-bounce" />
                  ¡Agregado!
                </>
              ) : (
                <>
                  <span className="absolute -left-2 -top-2 w-10 h-10 bg-white/20 rounded-full blur-lg opacity-50 pointer-events-none animate-pulse" />
                  Añadir al carrito
                </>
              )}
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
