import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useAuth';
import { useAuth } from '../context/AuthContext';

export default function Login({ redirectToDashboard }: { redirectToDashboard?: boolean } = {}) {
  const { isAuthenticated } = useAuth();
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (redirectToDashboard) {
        navigate('/admin/dashboard');
      } else {
        navigate(location.state?.from || '/');
      }
    }
  }, [isAuthenticated, navigate, location, redirectToDashboard]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors({});

    try {
      await loginMutation.mutateAsync({ email, password });

      // Navigation will be handled by the useEffect above
    } catch (error: unknown) {
      console.error('Login error:', error);
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrors({
        general: axiosError.response?.data?.message || 'Login failed. Please try again.'
      });
    }
  };

  return (
    <div className="relative max-w-sm mx-auto mt-20 p-8 bg-gradient-to-br from-white/90 via-sky-600/10 to-violet-100/60 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center overflow-hidden">
      {/* Blurred background shapes */}
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-sky-600/20 rounded-full blur-xl opacity-40 pointer-events-none animate-pulse" />
      <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-violet-200/30 rounded-full blur-lg opacity-30 pointer-events-none animate-pulse" />

      <h2 className="text-2xl font-bold mb-6 text-gray-900 z-10">Login</h2>

      <form onSubmit={handleLogin} className="w-full z-10">
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errors.general}
          </div>
        )}

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 bg-white/80 shadow-sm ${
              errors.email
                ? 'border-red-400 focus:ring-red-400'
                : 'border-gray-200 focus:ring-sky-400'
            }`}
            disabled={loginMutation.isPending}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 bg-white/80 shadow-sm ${
              errors.password
                ? 'border-red-400 focus:ring-red-400'
                : 'border-gray-200 focus:ring-sky-400'
            }`}
            disabled={loginMutation.isPending}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-2xl transition-colors mb-4 shadow"
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-2 z-10">
        <Link to="/register" className="text-sky-600 hover:underline">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}
