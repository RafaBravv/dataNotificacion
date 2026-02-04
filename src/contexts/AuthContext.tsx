// contexts/AuthContext.tsx
// Contexto global para manejar el estado de autenticación con persistencia

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, User, AuthCredentials, RegisterCredentials } from '@/src/types/authTypes';
import { authService } from '@/src/services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = '@auth_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Iniciar en true para verificar sesión guardada

  // Cargar usuario guardado al iniciar la app
  useEffect(() => {
    loadStoredUser();
  }, []);

  /**
   * Carga el usuario guardado en AsyncStorage
   */
  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error al cargar usuario guardado:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Guarda el usuario en AsyncStorage
   */
  const saveUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      throw new Error('No se pudo guardar la sesión');
    }
  };

  /**
   * Elimina el usuario de AsyncStorage
   */
  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error('Error al limpiar usuario:', error);
    }
  };

  const login = async (credentials: AuthCredentials) => {
    setIsLoading(true);
    try {
      const userData = await authService.login(credentials);
      await saveUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      const userData = await authService.register(credentials);
      await saveUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    await clearUser();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};