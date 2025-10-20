import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import { API_BASE } from '../api/api';

export default function WelcomeScreen({ route, navigation }: any) {
  const { token, full_name } = route.params || {};
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/welcome`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setUser(data.user);
        else {
          Alert.alert('Error', data.error || 'No autorizado');
          navigation.navigate('Login');
        }
      } catch (err) {
        Alert.alert('Error', 'No se pudo conectar al servidor.');
      }
    };
    load();
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={styles.topBackground} />
      <View style={styles.bottomBackground} />
      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>{user ? `Hola, ${user.full_name}` : `Hola, ${full_name}`}</Text>

        <Text style={{ color: '#fff', marginVertical: 10 }}>
          {user ? `Tu email: ${user.email}` : 'Cargando información...'}
        </Text>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#3478f6",}]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.btnText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
