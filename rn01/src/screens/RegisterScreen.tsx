import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import Input from '../components/Input';
import { API_BASE } from '../api/api';

export default function RegisterScreen({ navigation }: any) {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!full_name || !email || !password) return Alert.alert('Completa todos los campos');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, email, password })
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        Alert.alert('Registrado', 'Usuario creado correctamente. Iniciá sesión.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error || 'Error en registro');
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo conectar al servidor.');
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.topBackground} />
      <View style={styles.bottomBackground} />
      <View style={styles.card}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Registrate para continuar</Text>
        <Input
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={full_name}
          onChangeText={setFullName}
        />
        <Input
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.6)"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="rgba(255,255,255,0.6)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#3478f6", }]}
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
  );
}
