// screens/AuthScreen.tsx
// Pantalla principal que decide entre login o bienvenida

import React from 'react';
import { AuthContainer } from '@/components/organisms/AuthContainer';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { useAuth } from '@/contexts/AuthContext';

export const AuthScreen = () => {
  const { user } = useAuth();

  // Si hay usuario autenticado, mostrar pantalla de bienvenida
  if (user) {
    return <WelcomeScreen />;
  }

  // Si no hay usuario, mostrar formulario de login/registro
  return <AuthContainer />;
};