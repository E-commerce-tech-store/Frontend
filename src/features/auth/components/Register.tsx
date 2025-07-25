import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Register() {
  const { isAuthenticated } = useAuth();
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors({});

    try {
      await registerMutation.mutateAsync({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password
      });

      toast.success('¡Registro exitoso! Bienvenido.');
      // Navigation will be handled by the useEffect above
    } catch (error: unknown) {
      console.error('Registration error:', error);
      const axiosError = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        axiosError.response?.data?.message || 'Error en el registro. Inténtalo de nuevo.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative max-w-sm mx-auto mt-20 p-8 bg-gradient-to-br from-white/90 via-sky-600/10 to-violet-100/60 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center overflow-hidden">
      {/* Blurred background shapes */}
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-sky-600/20 rounded-full blur-xl opacity-40 pointer-events-none animate-pulse" />
      <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-violet-200/30 rounded-full blur-lg opacity-30 pointer-events-none animate-pulse" />

      <h2 className="text-2xl font-bold mb-6 text-gray-900 z-10">Registrarse</h2>

      <form onSubmit={handleRegister} className="w-full z-10">
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 bg-white/80 shadow-sm ${
              errors.name
                ? 'border-red-400 focus:ring-red-400'
                : 'border-gray-200 focus:ring-sky-400'
            }`}
            disabled={registerMutation.isPending}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 bg-white/80 shadow-sm ${
              errors.email
                ? 'border-red-400 focus:ring-red-400'
                : 'border-gray-200 focus:ring-sky-400'
            }`}
            disabled={registerMutation.isPending}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 bg-white/80 shadow-sm ${
              errors.password
                ? 'border-red-400 focus:ring-red-400'
                : 'border-gray-200 focus:ring-sky-400'
            }`}
            disabled={registerMutation.isPending}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 bg-white/80 shadow-sm ${
              errors.confirmPassword
                ? 'border-red-400 focus:ring-red-400'
                : 'border-gray-200 focus:ring-sky-400'
            }`}
            disabled={registerMutation.isPending}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-2xl transition-colors mb-2 shadow"
        >
          {registerMutation.isPending ? 'Creando cuenta...' : 'Registrarse'}
        </button>
      </form>

      <div className="mt-2 z-10">
        <Link to="/login" className="text-sky-600 hover:underline">
          ¿Ya tienes una cuenta? Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}
