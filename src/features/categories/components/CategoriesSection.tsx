import { useState, useEffect } from 'react';
import { useCategoryStore } from '../store/categoryStore';
import CategoryForm from './CategoryForm';
import type { Category } from '../store/categoryStore';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CategoriesSection() {
  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
    fetchCategoriesWithCount,
    createCategory,
    updateCategory,
    deleteCategory,
    clearError
  } = useCategoryStore();

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCategoryDeleteConfirm, setShowCategoryDeleteConfirm] = useState<string | null>(null);

  // Load categories when component mounts
  useEffect(() => {
    fetchCategoriesWithCount();
  }, [fetchCategoriesWithCount]);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleSaveCategory = async (categoryData: { name: string; description: string }) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, categoryData);
      } else {
        await createCategory(categoryData);
      }
      setShowCategoryForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleCategoryDeleteConfirm = (categoryId: string) => {
    setShowCategoryDeleteConfirm(categoryId);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      setShowCategoryDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCloseCategoryError = () => {
    clearError();
  };

  return (
    <section className="z-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gestión de Categorías</h2>
        <button
          onClick={handleAddCategory}
          className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg flex items-center gap-2 transition-colors shadow-md"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {/* Error Display */}
      {categoryError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex justify-between items-center">
          <span>{categoryError}</span>
          <button onClick={handleCloseCategoryError} className="text-red-600 hover:text-red-800">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Category Form Modal */}
      {showCategoryForm && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => {
            setShowCategoryForm(false);
            setEditingCategory(null);
          }}
          loading={categoryLoading}
        />
      )}

      {/* Categories List */}
      <div className="bg-white/90 rounded-2xl shadow overflow-hidden">
        {categoryLoading ? (
          <div className="py-8 text-center text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
            <p className="mt-2">Cargando categorías...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sky-100 text-sky-700">
                  <th className="py-3 px-4 font-semibold">Nombre</th>
                  <th className="py-3 px-4 font-semibold">Descripción</th>
                  <th className="py-3 px-4 font-semibold text-center">Productos</th>
                  <th className="py-3 px-4 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b last:border-b-0 hover:bg-sky-50/40 transition"
                  >
                    <td className="py-3 px-4 font-medium">{category.name}</td>
                    <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                      {category.description}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-sky-100 text-sky-800 rounded-full text-sm font-medium">
                        {category.productCount || 0}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="p-1.5 bg-sky-100 rounded-md text-sky-700 hover:bg-sky-200 transition-colors"
                          title="Editar categoría"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleCategoryDeleteConfirm(category.id)}
                          className="p-1.5 bg-red-100 rounded-md text-red-700 hover:bg-red-200 transition-colors"
                          title="Eliminar categoría"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {categories.length === 0 && !categoryLoading && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No hay categorías disponibles. Agrega una nueva categoría para comenzar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showCategoryDeleteConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Confirmar Eliminación</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro que deseas eliminar la categoría{' '}
              <span className="font-semibold">
                {categories.find((c) => c.id === showCategoryDeleteConfirm)?.name}
              </span>
              ?
              {categories.find((c) => c.id === showCategoryDeleteConfirm)?.productCount &&
                categories.find((c) => c.id === showCategoryDeleteConfirm)!.productCount! > 0 && (
                  <>
                    <br />
                    <span className="text-red-600 font-medium">
                      Esta categoría tiene{' '}
                      {categories.find((c) => c.id === showCategoryDeleteConfirm)?.productCount}{' '}
                      producto(s) asociado(s).
                    </span>
                  </>
                )}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCategoryDeleteConfirm(null)}
                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteCategory(showCategoryDeleteConfirm)}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                disabled={categoryLoading}
              >
                {categoryLoading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
