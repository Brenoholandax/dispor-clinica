import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: Role, nome: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  function login(role: Role, nome: string) {
    const u: User = { nome, email: '', role };
    setUser(u);
    sessionStorage.setItem('user', JSON.stringify(u));
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
