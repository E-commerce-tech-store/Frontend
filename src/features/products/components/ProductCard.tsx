type Product = {
  name: string;
  desc: string;
  price: string;
  img: string;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="relative bg-gradient-to-br from-white/90 via-sky-600/10 to-violet-100/60 rounded-3xl shadow-lg p-6 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-xl border border-gray-100 overflow-hidden">
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
      <strong className="text-sky-600 text-2xl mb-4 font-semibold z-10">{product.price}</strong>
      <button className="relative w-full bg-gradient-to-r from-sky-600/80 to-violet-400/80 text-white px-4 py-2 rounded-full font-medium hover:bg-sky-600/90 transition-colors shadow-md overflow-hidden">
        <span className="absolute -left-2 -top-2 w-10 h-10 bg-white/20 rounded-full blur-lg opacity-50 pointer-events-none animate-pulse" />
        <span className="z-10">Añadir al carrito</span>
      </button>
    </article>
  );
}
