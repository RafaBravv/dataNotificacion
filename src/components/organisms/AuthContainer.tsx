// components/organisms/AuthContainer.tsx
// Contenedor que maneja el cambio entre login y registro

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LoginForm } from '@/src/components/molecules/LoginForm';
import { RegisterForm } from '@/src/components/molecules/RegisterForm';
import { StyleAuthScreen } from '@/src/constants/estilosAuth';
import { useAuth } from '@/src/contexts/AuthContext';

export const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, isLoading } = useAuth();

  return (
    <KeyboardAvoidingView
      style={StyleAuthScreen.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView 
        contentContainerStyle={StyleAuthScreen.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={StyleAuthScreen.logo}>🔐</Text>
        
        <Text style={StyleAuthScreen.title}>
          {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
        </Text>
        
        <Text style={StyleAuthScreen.subtitle}>
          {isLogin 
            ? 'Ingresa tus credenciales para continuar' 
            : 'Regístrate para comenzar'}
        </Text>

        {isLogin ? (
          <LoginForm onSubmit={login} isLoading={isLoading} />
        ) : (
          <RegisterForm onSubmit={register} isLoading={isLoading} />
        )}

        <View>
          <Text style={StyleAuthScreen.switchText}>
            {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={StyleAuthScreen.switchButton}>
                {isLogin ? 'Regístrate' : 'Inicia sesión'}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};