import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleRegister(role: 'client') {
    if (!username || !password) {
      setError('Please fill all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // For demo, just log in after register
    login({ username, role });
    navigate('/');
  }

  return (
    <div className="relative max-w-sm mx-auto mt-20 p-8 bg-gradient-to-br from-white/90 via-sky-600/10 to-violet-100/60 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center overflow-hidden">
      {/* Blurred background shapes */}
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-sky-600/20 rounded-full blur-xl opacity-40 pointer-events-none animate-pulse" />
      <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-violet-200/30 rounded-full blur-lg opacity-30 pointer-events-none animate-pulse" />
      <h2 className="text-2xl font-bold mb-6 text-gray-900 z-10">Register</h2>
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
        className="w-full mb-4 px-3 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/80 shadow-sm z-10"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full mb-6 px-3 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/80 shadow-sm z-10"
      />
      {error && <div className="text-red-600 mb-4 w-full text-center z-10">{error}</div>}
      <button
        onClick={() => handleRegister('client')}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-2xl transition-colors mb-2 shadow z-10"
      >
        Register
      </button>
      <div className="mt-2 z-10">
        <a href="/login" className="text-sky-600 hover:underline">
          Already have an account? Login
        </a>
      </div>
    </div>
  );
}
