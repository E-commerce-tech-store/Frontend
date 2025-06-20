import './App.css';
import Logo from './icons/Logo';
import ShoppingCartIcon from './icons/ShopingCart';

export default function App() {
  return (
    <main className="relative grid gap-4">
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none z-0" />
      <div className="fixed -bottom-40 -right-40 w-[34rem] h-[34rem] bg-violet-200/40 rounded-full blur-[100px] opacity-40 animate-pulse pointer-events-none z-0" />

      <header className="relative w-full bg-white/90 backdrop-blur-lg border border-sky-600/20 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between px-8 py-4 mt-4 mb-2 gap-4 md:gap-0 overflow-hidden z-20 transition-all duration-200">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-600/30 rounded-full blur-2xl opacity-60 animate-pulse pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-violet-200/50 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none" />
        <div className="flex items-center gap-3 z-10">
          <Logo />
          <span className="text-sky-600 font-extrabold text-2xl tracking-tight drop-shadow-sm">
            TechComp Store
          </span>
        </div>
        <div className="flex-1 flex justify-center w-full md:mx-8 z-10">
          <input
            className="rounded-full px-6 py-2 w-full max-w-md border border-sky-600/20 outline-none bg-white/90 shadow focus:ring-2 focus:ring-sky-600/30 transition backdrop-blur  text-gray-700 text-base"
            type="search"
            name="search"
            id="search"
            placeholder="Buscar productos..."
            autoComplete="off"
          />
        </div>
        <div className="flex items-center gap-3 z-10">
          <button className="relative flex items-center gap-2 bg-sky-600/20 text-sky-600 p-2 rounded-full hover:bg-sky-600/30 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-600/40">
            <ShoppingCartIcon />
            <span className="absolute -top-1 -right-1 bg-sky-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
              2
            </span>
          </button>
          <button className="flex items-center gap-2 bg-sky-600/10 p-1.5 rounded-full hover:bg-sky-600/20 transition-colors border border-sky-600/10 shadow focus:outline-none focus:ring-2 focus:ring-sky-600/30">
            <img
              className="w-9 h-9 rounded-full object-cover border-2 border-sky-600 shadow-sm"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Avatar"
            />
          </button>
        </div>
      </header>

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

      <section className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-6 z-10">
        <div className="absolute -top-20 left-1/3 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-violet-200/20 rounded-full blur-2xl opacity-30 pointer-events-none" />
        {[
          {
            name: 'Auriculares Inalámbricos',
            desc: 'Bluetooth 5.0',
            price: '59.99$',
            img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80'
          },
          {
            name: 'Teclado Mecánico',
            desc: 'RGB, Switch Red',
            price: '89.99$',
            img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
          },
          {
            name: 'Mouse Gamer',
            desc: '16000 DPI',
            price: '39.99$',
            img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
          },
          {
            name: 'Smartwatch',
            desc: 'Monitor de ritmo cardíaco',
            price: '129.99$',
            img: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80'
          },
          {
            name: 'Cámara Web HD',
            desc: '1080p, Micrófono integrado',
            price: '49.99$',
            img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80'
          },
          {
            name: 'Altavoz Bluetooth',
            desc: 'Portátil, Batería 12h',
            price: '34.99$',
            img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
          },
          {
            name: 'Monitor 27" 2K',
            desc: 'IPS, 144Hz',
            price: '299.99$',
            img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
          },
          {
            name: 'Disco SSD 1TB',
            desc: 'NVMe, Alta velocidad',
            price: '109.99$',
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80'
          }
        ].map((product, i) => (
          <article
            key={i}
            className="relative bg-gradient-to-br from-white/90 via-sky-600/10 to-violet-100/60 rounded-3xl shadow-lg p-6 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-sky-600/20 rounded-full blur-xl opacity-40 pointer-events-none animate-pulse" />
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-violet-200/30 rounded-full blur-lg opacity-30 pointer-events-none animate-pulse" />
            <div className="absolute top-4 right-4 bg-sky-600/10 text-sky-600 px-3 py-1 rounded-full text-xs font-semibold z-10">
              Nuevo
            </div>
            <img
              src={product.img}
              alt={product.name}
              className="w-32 h-32 object-contain mb-4 rounded-2xl bg-gray-50 shadow-sm z-10"
            />
            <h3 className="text-xl font-bold mb-1 text-gray-900 z-10">{product.name}</h3>
            <p className="text-gray-400 mb-2 text-sm z-10">{product.desc}</p>
            <strong className="text-sky-600 text-2xl mb-4 font-semibold z-10">
              {product.price}
            </strong>
            <button className="relative w-full bg-gradient-to-r from-sky-600/80 to-violet-400/80 text-white px-4 py-2 rounded-full font-medium hover:bg-sky-600/90 transition-colors shadow-md overflow-hidden">
              <span className="absolute -left-2 -top-2 w-10 h-10 bg-white/20 rounded-full blur-lg opacity-50 pointer-events-none animate-pulse" />
              <span className="z-10">Añadir al carrito</span>
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
