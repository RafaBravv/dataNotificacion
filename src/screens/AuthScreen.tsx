// screens/AuthScreen.tsx
// Pantalla principal que decide entre login o bienvenida

import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { AuthContainer } from '@/src/components/organisms/AuthContainer';
import { WelcomeScreen } from '@/src/screens/WelcomeScreen';
import { useAuth } from '@/src/contexts/AuthContext';

export const AuthScreen = () => {
  const { user, isLoading } = useAuth();

  // Mostrar pantalla de carga mientras se verifica la sesión guardada
  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#FAFAFA' 
      }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ 
          marginTop: 20, 
          fontSize: 16, 
          color: '#666' 
        }}>
          Verificando sesión...
        </Text>
      </View>
    );
  }

  // Si hay usuario autenticado, mostrar pantalla de bienvenida
  if (user) {
    return <WelcomeScreen />;
  }

  // Si no hay usuario, mostrar formulario de login/registro
  return <AuthContainer />;
};