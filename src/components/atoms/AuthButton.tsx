// components/atoms/AuthButton.tsx
// Componente atómico para botones de acción

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { StyleButton } from '@/src/constants/estilosAuth';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const AuthButton = ({ 
  title, 
  onPress, 
  isLoading = false,
  disabled = false 
}: AuthButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        StyleButton.button,
        StyleButton.buttonPrimary,
        (disabled || isLoading) && StyleButton.buttonDisabled
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <View style={StyleButton.loadingContainer}>
          <ActivityIndicator color="#FFF" />
          <Text style={StyleButton.buttonText}>Cargando...</Text>
        </View>
      ) : (
        <Text style={StyleButton.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};