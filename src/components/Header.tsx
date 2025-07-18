import { useEffect, useState } from 'react';
import Logo from '../icons/Logo';
import ShoppingCartIcon from '../icons/ShopingCart';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '../icons/LoginIcon';
import { useCartStore } from '../store/cartStore';

export default function Header() {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { items } = useCartStore();
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header
      className={`sticky top-0 left-0 w-full bg-white/90 backdrop-blur-lg border border-sky-600/20 rounded-3xl flex flex-col md:flex-row items-center justify-between px-8 py-4 mt-4 mb-2 gap-4 md:gap-0 overflow-hidden z-50 transition-all duration-300 ${
        scrolled ? 'shadow-2xl bg-white/95' : 'shadow-xl'
      }`}
      style={{ transition: 'box-shadow 0.3s, background 0.3s' }}
    >
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-600/30 rounded-full blur-2xl opacity-60 animate-pulse pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-violet-200/50 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none" />
      <div
        className="flex items-center gap-3 z-10 select-none hover:scale-105 transition-transform duration-200 cursor-pointer"
        onClick={() => navigate('/')}
      >
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
        <button
          className="relative flex items-center gap-2 bg-sky-600/20 text-sky-600 p-2 rounded-full hover:bg-sky-600/30 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-600/40"
          onClick={() => navigate('/cart')}
          aria-label="Go to cart"
        >
          <ShoppingCartIcon />
          <span className="absolute -top-1 -right-1 bg-sky-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
            {items.length}
          </span>
        </button>
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-sky-600/10 p-1.5 rounded-full hover:bg-sky-600/20 transition-colors border border-sky-600/10 shadow focus:outline-none focus:ring-2 focus:ring-sky-600/30"
              onClick={handleUserMenuToggle}
            >
              <img
                className="w-9 h-9 rounded-full object-cover border-2 border-sky-600 shadow-sm"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt={user.name}
              />
              {isAdmin && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                  A
                </span>
              )}
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Role: {user.role}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    My Dashboard
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        navigate('/admin/dashboard');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-red-600"
                    >
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            className="flex items-center gap-2 bg-sky-600/10 p-1.5 rounded-full hover:bg-sky-600/20 transition-colors border border-sky-600/10 shadow focus:outline-none focus:ring-2 focus:ring-sky-600/30"
            onClick={() => navigate('/login')}
            aria-label="Login"
          >
            <LoginIcon />
          </button>
        )}
      </div>
    </header>
  );
}
