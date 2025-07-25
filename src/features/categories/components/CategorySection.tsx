import { useCategoriesWithCount } from '../hooks/useCategories';

export default function CategorySection() {
  const { data: categories = [], isLoading, error } = useCategoriesWithCount();

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Explora nuestras categorías
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/90 rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explora nuestras categorías</h2>
          <p className="text-red-600 mb-4">Error al cargar las categorías</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explora nuestras categorías</h2>
          <p className="text-gray-500">No hay categorías disponibles por el momento.</p>
        </div>
      </section>
    );
  }

  // Category icons mapping
  const getCategoryIcon = (categoryName: string) => {
    const icons: { [key: string]: string } = {
      electronics: '💻',
      computers: '🖥️',
      laptops: '💻',
      phones: '📱',
      tablets: '📱',
      accessories: '🔌',
      gaming: '🎮',
      audio: '🎧',
      cameras: '📷',
      wearables: '⌚',
      storage: '💾',
      networking: '🌐',
      software: '💿',
      default: '📦'
    };

    const lowerName = categoryName.toLowerCase();
    for (const [key, icon] of Object.entries(icons)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }
    return icons.default;
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-10 left-1/4 w-64 h-64 bg-sky-600/10 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-80 h-80 bg-violet-200/20 rounded-full blur-2xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explora nuestras{' '}
            <span className="bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
              categorías
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra exactamente lo que necesitas navegando por nuestras categorías especializadas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white/90 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Card background decoration */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-sky-600/10 rounded-full blur-xl opacity-40 pointer-events-none group-hover:opacity-60 transition-opacity" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-violet-200/20 rounded-full blur-lg opacity-30 pointer-events-none group-hover:opacity-50 transition-opacity" />

              {/* Category icon */}
              <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-sky-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">{getCategoryIcon(category.name)}</span>
              </div>

              {/* Category name */}
              <h3 className="relative z-10 text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-sky-700 transition-colors">
                {category.name}
              </h3>

              {/* Category description */}
              <p className="relative z-10 text-sm text-gray-600 text-center mb-3 line-clamp-2">
                {category.description}
              </p>

              {/* Product count */}
              <div className="relative z-10 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                  {category._count?.tbl_products || 0} productos
                </span>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-600/5 to-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-violet-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200">
            <span>Ver todos los productos</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
