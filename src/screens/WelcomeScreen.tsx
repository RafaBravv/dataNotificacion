// screens/WelcomeScreen.tsx
// Pantalla de bienvenida post-autenticación

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleWelcome } from '@/src/constants/estilosAuth';
import { useAuth } from '@/src/contexts/AuthContext';

export const WelcomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={StyleWelcome.container} edges={['top', 'bottom']}>
      <View style={StyleWelcome.content}>
        <Text style={StyleWelcome.emoji}>✨</Text>
        
        <Text style={StyleWelcome.title}>
          ¡Bienvenido!
        </Text>
        
        <View style={StyleWelcome.decorativeLine} />
        
        <Text style={StyleWelcome.subtitle}>
          Hola,
        </Text>
        
        <Text style={StyleWelcome.userName}>
          {user?.name}
        </Text>
        
        <Text style={StyleWelcome.subtitle}>
          Has iniciado sesión exitosamente
        </Text>

        <TouchableOpacity 
          style={StyleWelcome.logoutButton}
          onPress={logout}
        >
          <Text style={StyleWelcome.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};