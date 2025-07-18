import React, { createContext, useContext, useEffect } from 'react';
import { userService, tokenService } from '../services/authService';
import { useAuthStatus, useLogout } from '../hooks/useAuth';
import type { User } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  isUser: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, isAdmin, isUser } = useAuthStatus();
  const logoutMutation = useLogout();

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = userService.getUser();
    const token = tokenService.getToken();

    // If no token but user data exists, clear user data
    if (!token && storedUser) {
      userService.removeUser();
    }
  }, []);

  const logout = () => {
    logoutMutation.mutate();
  };

  const value: AuthContextType = {
    user: user || null,
    isAuthenticated,
    isLoading,
    isAdmin,
    isUser,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
