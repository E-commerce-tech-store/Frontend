export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-600/30 via-teal-200/60 to-violet-300/60 p-10 rounded-3xl flex flex-col md:flex-row items-center gap-12 mt-6 border border-sky-600/20 shadow-xl">
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-sky-600/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-200/60 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="flex-1 min-w-0 z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight drop-shadow-lg">
          ¡Bienvenido a <span className="text-sky-600 drop-shadow">TechComp Store</span>!
        </h1>
        <p className="text-lg sm:text-xl text-gray-800 mb-8 font-medium max-w-xl drop-shadow">
          Explora lo último en tecnología y accesorios premium. Compra fácil, rápido y seguro.
          <br />
          <span className="text-sky-600 font-semibold">
            ¡Disfruta la mejor experiencia de compra online!
          </span>
        </p>
        <a
          href="#"
          className="relative inline-flex items-center gap-3 bg-gradient-to-r from-sky-600/80 to-violet-400/80 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 hover:from-sky-600/90 hover:to-violet-300 transition-all duration-200 overflow-hidden"
        >
          <span className="absolute -left-4 -top-4 w-16 h-16 bg-white/20 rounded-full blur-xl opacity-60 pointer-events-none animate-pulse" />
          <svg
            className="w-6 h-6 z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-6-6 6 6-6 6" />
          </svg>
          <span className="z-10">Comienza a comprar</span>
        </a>
      </div>
      <div className="flex-1 flex justify-center min-w-0 z-10">
        <div className="relative group">
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-sky-600/20 rounded-full blur-2xl opacity-50 pointer-events-none animate-pulse" />
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
            alt="Productos tecnológicos"
            className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl border-4 border-white group-hover:scale-105 transition-transform duration-300"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-6 py-2 rounded-full shadow-lg text-sky-600 font-semibold text-base">
            ¡Nuevos productos cada semana!
          </div>
        </div>
      </div>
    </section>
  );
}
