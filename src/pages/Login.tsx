import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Login({ redirectToDashboard }: { redirectToDashboard?: boolean } = {}) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function handleLogin() {
    // For demo, just use the username
    login({ username, role: 'client' });
    if (redirectToDashboard) {
      navigate('/dashboard');
    } else {
      navigate(location.state?.from || '/');
    }
  }
  return (
    <div className="relative max-w-sm mx-auto mt-20 p-8 bg-gradient-to-br from-white/90 via-sky-600/10 to-violet-100/60 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center overflow-hidden">
      {/* Blurred background shapes */}
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-sky-600/20 rounded-full blur-xl opacity-40 pointer-events-none animate-pulse" />
      <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-violet-200/30 rounded-full blur-lg opacity-30 pointer-events-none animate-pulse" />
      <h2 className="text-2xl font-bold mb-6 text-gray-900 z-10">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/80 shadow-sm z-10"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 px-3 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/80 shadow-sm z-10"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-2xl transition-colors mb-4 shadow z-10"
      >
        Login
      </button>
      <div className="mt-2 z-10">
        <a href="/register" className="text-sky-600 hover:underline">
          Don't have an account? Register
        </a>
      </div>
    </div>
  );
}
