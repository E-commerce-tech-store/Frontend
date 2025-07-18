import { useState, useEffect } from 'react';
import type { Category } from '../store/categoryStore';

interface CategoryFormProps {
  category?: Category | null;
  onSave: (categoryData: { name: string; description: string }) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export default function CategoryForm({ category, onSave, onCancel, loading }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description
      });
    } else {
      setFormData({
        name: '',
        description: ''
      });
    }
  }, [category]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSave({
        name: formData.name.trim(),
        description: formData.description.trim()
      });
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-2/5 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {category ? 'Editar Categoría' : 'Nueva Categoría'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Smartphones"
                disabled={loading}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe la categoría..."
                disabled={loading}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Guardando...' : category ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
