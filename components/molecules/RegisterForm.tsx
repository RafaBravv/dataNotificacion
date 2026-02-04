// components/molecules/RegisterForm.tsx
// Formulario de registro de usuario

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { AuthInput } from '@/components/atoms/AuthInput';
import { AuthButton } from '@/components/atoms/AuthButton';
import { PlaceHolderStyle, StyleAuthForm } from '@/constants/estilosAuth';
import { RegisterCredentials } from '@/types/authTypes';

interface RegisterFormProps {
  onSubmit: (credentials: RegisterCredentials) => Promise<void>;
  isLoading: boolean;
}

export const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await onSubmit({ name, email, password, confirmPassword });
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    }
  };

  const isFormValid = name && email && password && confirmPassword;

  return (
    <View style={StyleAuthForm.container}>
      {error ? (
        <View style={StyleAuthForm.errorContainer}>
          <Text style={StyleAuthForm.errorText}>{error}</Text>
        </View>
      ) : null}

      <AuthInput
        label="Nombre completo"
        value={name}
        onChangeText={setName}
        placeholder="Juan Pérez"
        placeholderTextColor={PlaceHolderStyle.placeholder}
        autoComplete="name"
      />

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
        placeholder="Mínimo 6 caracteres"
        placeholderTextColor={PlaceHolderStyle.placeholder}
        isPassword
        autoComplete="password-new"
      />

      <AuthInput
        label="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Repite tu contraseña"
        placeholderTextColor={PlaceHolderStyle.placeholder}
        isPassword
        autoComplete="password-new"
      />

      <AuthButton
        title="Crear Cuenta"
        onPress={handleSubmit}
        isLoading={isLoading}
        disabled={!isFormValid}
      />
    </View>
  );
};