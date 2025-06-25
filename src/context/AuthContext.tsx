import { create } from 'zustand';
import React, { createContext, useContext } from 'react';

export type User = { username: string; role: 'admin' | 'client' } | null;

interface AuthState {
  user: User;
  login: (u: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (u) => set({ user: u }),
  logout: () => set({ user: null })
}));

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const store = useAuthStore();
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
