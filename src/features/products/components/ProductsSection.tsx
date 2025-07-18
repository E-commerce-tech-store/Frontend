import { useState } from 'react';
import toast from 'react-hot-toast';
import { useProducts, useDeleteProduct } from '../hooks/useProducts';
import ProductForm from './ProductForm';
import type { Product } from '../interfaces/product';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

export default function ProductsSection() {
  const { data: products = [] } = useProducts();
  const deleteProductMutation = useDeleteProduct();
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Handle adding a new product
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  // Handle editing a product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  // Handle saving a product (create or update)
  const handleSaveProduct = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (productId: string) => {
    setShowDeleteConfirm(productId);
  };

  // Handle delete product
  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProductMutation.mutateAsync(productId);
      setShowDeleteConfirm(null);
      toast.success('Producto eliminado exitosamente');
    } catch (error: unknown) {
      console.error('Error deleting product:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string | string[] } } };
        const backendError = axiosError.response?.data?.message;

        if (Array.isArray(backendError)) {
          backendError.forEach((err) => toast.error(err));
        } else if (typeof backendError === 'string') {
          toast.error(backendError);
        } else {
          toast.error('Error al eliminar el producto');
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error inesperado al eliminar el producto');
      }
    }
  };

  return (
    <section className="z-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gestión de Productos</h2>
        <button
          onClick={handleAddProduct}
          className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg flex items-center gap-2 transition-colors shadow-md"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowProductForm(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-bold mb-4 text-sky-700">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
            <ProductForm product={editingProduct || undefined} onSave={handleSaveProduct} />
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="bg-white/90 rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-100 text-sky-700">
                <th className="py-3 px-4 font-semibold">Imagen</th>
                <th className="py-3 px-4 font-semibold">Nombre</th>
                <th className="py-3 px-4 font-semibold">Precio</th>
                <th className="py-3 px-4 font-semibold">Categoría</th>
                <th className="py-3 px-4 font-semibold">Stock</th>
                <th className="py-3 px-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b last:border-b-0 hover:bg-sky-50/40 transition"
                >
                  <td className="py-3 px-4">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                        <ShoppingBagIcon className="h-6 w-6" />
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">
                    {product.price?.toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP'
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-sky-100 text-sky-800 rounded-md text-xs">
                      {product.category || product.category_id || 'Sin categoría'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-medium ${product.stock <= 5 ? 'text-red-600' : 'text-green-600'}`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-1.5 bg-sky-100 rounded-md text-sky-700 hover:bg-sky-200 transition-colors"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteConfirm(product.id)}
                        className="p-1.5 bg-red-100 rounded-md text-red-700 hover:bg-red-200 transition-colors"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    No hay productos disponibles. Agrega un nuevo producto para comenzar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation modals */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Confirmar Eliminación</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro que deseas eliminar el producto{' '}
              <span className="font-semibold">
                {products.find((p) => p.id === showDeleteConfirm)?.name}
              </span>
              ? Esta acción no se puede deshacer.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteProduct(showDeleteConfirm)}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
