// components/molecules/LoginForm.tsx
// Formulario de inicio de sesión

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { AuthInput } from '@/src/components/atoms/AuthInput';
import { AuthButton } from '@/src/components/atoms/AuthButton';
import { PlaceHolderStyle, StyleAuthForm } from '@/src/constants/estilosAuth';
import { AuthCredentials } from '@/src/types/authTypes';

interface LoginFormProps {
  onSubmit: (credentials: AuthCredentials) => Promise<void>;
  isLoading: boolean;
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [email, setEmail] = useState('demo@mail.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      await onSubmit({ email, password });
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <View style={StyleAuthForm.container}>
      {error ? (
        <View style={StyleAuthForm.errorContainer}>
          <Text style={StyleAuthForm.errorText}>{error}</Text>
        </View>
      ) : null}

      <AuthInput
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        placeholder="tu@email.com"
        placeholderTextColor={PlaceHolderStyle.placeholder}
        keyboardType="email-address"
        autoComplete="email"
      />

      <AuthInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        placeholderTextColor={PlaceHolderStyle.placeholder}
        isPassword
        autoComplete="password"
      />

      <AuthButton
        title="Iniciar Sesión"
        onPress={handleSubmit}
        isLoading={isLoading}
        disabled={!email || !password}
      />
    </View>
  );
};