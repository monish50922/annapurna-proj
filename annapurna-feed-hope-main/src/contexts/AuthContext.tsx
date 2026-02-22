import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import type { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

const ROLE_DASHBOARDS: Record<UserRole, string> = {
  DONOR: '/donor/dashboard',
  NGO: '/ngo/dashboard',
  ADMIN: '/admin/dashboard',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('annapurna_token');
    const savedUser = localStorage.getItem('annapurna_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    const { token: t, user: u } = data;
    localStorage.setItem('annapurna_token', t);
    localStorage.setItem('annapurna_user', JSON.stringify(u));
    setToken(t);
    setUser(u);
    navigate(ROLE_DASHBOARDS[u.role as UserRole]);
  }, [navigate]);

  const register = useCallback(async (name: string, email: string, password: string, role: UserRole) => {
    await api.post('/auth/register', { name, email, password, role });
    navigate('/login');
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('annapurna_token');
    localStorage.removeItem('annapurna_user');
    setToken(null);
    setUser(null);
    navigate('/');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
