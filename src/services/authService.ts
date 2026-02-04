// services/authService.ts
// Servicio que simula autenticación (sin backend real)

import { AuthCredentials, RegisterCredentials, User } from '@/src/types/authTypes';

// Simula delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Storage simulado en memoria
const mockUsers: { [email: string]: { password: string; name: string } } = {
  'demo@mail.com': { password: 'demo123', name: 'Usuario Demo' }
};

export const authService = {
  /**
   * Simula inicio de sesión
   */
  login: async (credentials: AuthCredentials): Promise<User> => {
    await delay(1000); // Simula latencia de red

    const user = mockUsers[credentials.email.toLowerCase()];
    
    if (!user || user.password !== credentials.password) {
      throw new Error('Credenciales incorrectas');
    }

    return {
      id: Math.random().toString(36).substring(7),
      email: credentials.email,
      name: user.name,
    };
  },

  /**
   * Simula registro de usuario
   */
  register: async (credentials: RegisterCredentials): Promise<User> => {
    await delay(1200);

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }

    if (credentials.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    const emailLower = credentials.email.toLowerCase();

    if (mockUsers[emailLower]) {
      throw new Error('Este correo ya está registrado');
    }

    // "Guardar" usuario en memoria
    mockUsers[emailLower] = {
      password: credentials.password,
      name: credentials.name,
    };

    return {
      id: Math.random().toString(36).substring(7),
      email: credentials.email,
      name: credentials.name,
    };
  },

  /**
   * Simula cierre de sesión
   */
  logout: async (): Promise<void> => {
    await delay(300);
  },
};