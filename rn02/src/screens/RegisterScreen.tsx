import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../styles/styles';
import Input from '../components/Input';
import { API_BASE } from '../api/api';

export default function RegisterScreen({ navigation }: any) {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Función de validación
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Validar nombre completo
    if (!full_name.trim()) {
      newErrors.full_name = 'El nombre completo es requerido';
    } else if (full_name.trim().length < 2) {
      newErrors.full_name = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(full_name)) {
      newErrors.full_name = 'El nombre solo puede contener letras y espacios';
    }

    // Validar email
    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    // Validar contraseña
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Debe contener mayúsculas, minúsculas y números';
    }

    // Validar confirmación de contraseña
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Limpiar errores cuando el usuario escribe
  const clearError = (field: string) => {
    setErrors(prev => ({...prev, [field]: ''}));
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: full_name.trim(), email: email.trim().toLowerCase(), password })
      });
      const data = await res.json();
      setLoading(false);
      
      if (res.ok) {
        Alert.alert('✅ Registrado', 'Usuario creado correctamente. Iniciá sesión.');
        navigation.navigate('Login');
      } else {
        Alert.alert('❌ Error', data.error || 'Error en el registro');
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('❌ Error', 'No se pudo conectar al servidor.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container]}>
        <View style={styles.topBackground} />
        <View style={styles.bottomBackground} />
        <View style={styles.card}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Registrate para continuar</Text>
          
          {/* Nombre completo */}
          <Input
            style={[styles.input, errors.full_name && styles.inputError]}
            placeholder="Nombre completo"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={full_name}
            onChangeText={(text) => {
              setFullName(text);
              clearError('full_name');
            }}
          />
          {errors.full_name && <Text style={styles.errorText}>{errors.full_name}</Text>}

          {/* Email */}
          <Input
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.6)"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              clearError('email');
            }}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Contraseña */}
          <Input
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Contraseña"
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              clearError('password');
            }}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          {/* Confirmar contraseña */}
          <Input
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder="Confirmar contraseña"
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              clearError('confirmPassword');
            }}
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#3478f6" }]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.btnText}>{loading ? 'Guardando...' : 'Registrar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>¿Tenés cuenta? Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}