// components/atoms/AuthInput.tsx
// Componente atómico para inputs de formulario

import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { StyleInput } from '@/src/constants/estilosAuth';

interface AuthInputProps extends TextInputProps {
  label: string;
  icon?: string;
  isPassword?: boolean;
}

export const AuthInput = ({ 
  label, 
  icon, 
  isPassword = false,
  ...props 
}: AuthInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={StyleInput.container}>
      <Text style={StyleInput.label}>{label}</Text>
      <View style={[
        StyleInput.inputWrapper,
        isFocused && StyleInput.inputWrapperFocused
      ]}>       
        <TextInput
          style={StyleInput.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !isPasswordVisible}
          autoCapitalize="none"
          {...props}
        />

        {isPassword && (
          <TouchableOpacity 
            style={StyleInput.toggleButton}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Text style={StyleInput.toggleIcon}>
              {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};