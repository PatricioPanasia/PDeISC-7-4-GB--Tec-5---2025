import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../styles/styles';
import Input from '../components/Input';
import { API_BASE } from '../api/api';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración para Expo AuthSession
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // --- Google Auth ---
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '736928000126-9afc6qdotsdpob488r528ertj5cq98lv.apps.googleusercontent.com',
    webClientId: '736928000126-9afc6qdotsdpob488r528ertj5cq98lv.apps.googleusercontent.com',
  });

  // --- Facebook Auth ---
  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: 'TU_FACEBOOK_APP_ID',
  });

  // Función de validación
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Limpiar errores cuando el usuario escribe
  const clearError = (field: string) => {
    setErrors(prev => ({...prev, [field]: ''}));
  };

  // Obtener información del usuario de Google
  const fetchGoogleUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userInfo = await response.json();
      return {
        email: userInfo.email,
        full_name: userInfo.name,
        picture: userInfo.picture,
      };
    } catch (error) {
      console.error('Error fetching Google user info:', error);
      return null;
    }
  };

  // Obtener información del usuario de Facebook
  const fetchFacebookUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userInfo = await response.json();
      return {
        email: userInfo.email,
        full_name: userInfo.name,
        picture: userInfo.picture?.data?.url,
      };
    } catch (error) {
      console.error('Error fetching Facebook user info:', error);
      return null;
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        handleOAuthLogin('google', authentication.accessToken);
      } else {
        Alert.alert('Error', 'No se pudo obtener el token de Google');
        setOauthLoading(null);
      }
    } else if (response?.type === 'error') {
      console.log('Google Auth Error:', response.error);
      Alert.alert('Error', `Error de autenticación: ${response.error?.message}`);
      setOauthLoading(null);
    }
  }, [response]);

  useEffect(() => {
    if (fbResponse?.type === 'success') {
      const { authentication } = fbResponse;
      if (authentication?.accessToken) {
        handleOAuthLogin('facebook', authentication.accessToken);
      } else {
        setOauthLoading(null);
      }
    } else if (fbResponse?.type === 'error') {
      console.log('Facebook Auth Error:', fbResponse.error);
      Alert.alert('Error', `Error de autenticación: ${fbResponse.error?.message}`);
      setOauthLoading(null);
    }
  }, [fbResponse]);

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(), 
          password 
        })
      });
      
      const data = await res.json();
      setLoading(false);
      
      console.log('Login response:', { status: res.status, data });
      
      if (res.ok) {
        // Login exitoso
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('¡Bienvenido!', `Hola ${data.full_name}`);
        navigation.navigate('Welcome', { 
          token: data.token, 
          full_name: data.full_name 
        });
      } else {
        // Error del servidor
        const errorMessage = data.error || 'Credenciales inválidas';
        Alert.alert('Error', errorMessage);
        
        // Si el usuario no existe, ofrecer registro
        if (res.status === 401 || errorMessage.includes('no existe') || errorMessage.includes('no registrado')) {
          Alert.alert(
            'Usuario no encontrado',
            '¿Te gustaría registrarte?',
            [
              { 
                text: 'Registrarme', 
                onPress: () => navigation.navigate('Register', { 
                  prefillEmail: email 
                }) 
              },
              { text: 'Cancelar', style: 'cancel' }
            ]
          );
        }
      }
    } catch (err) {
      setLoading(false);
      console.error('Login error:', err);
      Alert.alert('Error', 'No se pudo conectar al servidor. Verifica tu conexión.');
    }
  };

  const handleOAuthLogin = async (provider: string, token: string) => {
    setOauthLoading(provider);
    try {
      let userInfo = null;

      // Obtener información real del usuario según el provider
      if (provider === 'google') {
        userInfo = await fetchGoogleUserInfo(token);
      } else if (provider === 'facebook') {
        userInfo = await fetchFacebookUserInfo(token);
      }

      if (!userInfo || !userInfo.email) {
        Alert.alert('Error', `No se pudo obtener la información de ${provider}`);
        setOauthLoading(null);
        return;
      }

      console.log(`${provider} user info:`, userInfo);

      // Enviar datos al backend
      const res = await fetch(`${API_BASE}/oauth-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          provider, 
          token,
          email: userInfo.email,
          full_name: userInfo.full_name || userInfo.name
        })
      });
      
      const data = await res.json();
      setOauthLoading(null);
      
      console.log('OAuth login response:', { status: res.status, data });
      
      if (res.ok) {
        // OAuth login exitoso
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('¡Bienvenido!', `Hola ${data.full_name}`);
        navigation.navigate('Welcome', { 
          token: data.token, 
          full_name: data.full_name 
        });
      } else {
        // Si el usuario no existe, redirigir al registro
        if (res.status === 404 || data.error?.includes('no registrado')) {
          Alert.alert(
            'Usuario no registrado',
            `Para usar ${provider} necesitas registrarte primero.`,
            [
              { 
                text: 'Registrarme', 
                onPress: () => navigation.navigate('Register', { 
                  prefillEmail: userInfo.email,
                  prefillName: userInfo.full_name || userInfo.name
                }) 
              },
              { text: 'Cancelar', style: 'cancel' }
            ]
          );
        } else {
          Alert.alert('Error', data.error || `No se pudo autenticar con ${provider}`);
        }
      }
    } catch (err) {
      setOauthLoading(null);
      console.error('OAuth login error:', err);
      Alert.alert('Error', `Fallo la autenticación con ${provider}. Verifica tu conexión.`);
    }
  };

  const getOAuthButtonText = (provider: string) => {
    if (oauthLoading === provider) {
      return `Conectando con ${provider}...`;
    }
    return `Continuar con ${provider.charAt(0).toUpperCase() + provider.slice(1)}`;
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container]}>
        <View style={styles.topBackground} />
        <View style={styles.bottomBackground} />
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <Text style={styles.subtitle}>Bienvenido de vuelta</Text>

          {/* Email Input */}
          <Input
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              clearError('email');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Password Input */}
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

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#3478f6" }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.btnText}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Text>
          </TouchableOpacity>

          {/* Separador */}
          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>o</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Google OAuth Button */}
          <TouchableOpacity
            style={[
              styles.btn, 
              { backgroundColor: "#db4437", marginTop: 10 },
              oauthLoading && { opacity: 0.7 }
            ]}
            onPress={() => promptAsync()}
            disabled={!request || oauthLoading !== null}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>
              {getOAuthButtonText('google')}
            </Text>
          </TouchableOpacity>

          {/* Facebook OAuth Button */}
          <TouchableOpacity
            style={[
              styles.btn, 
              { backgroundColor: "#3b5998", marginTop: 10 },
              oauthLoading && { opacity: 0.7 }
            ]}
            onPress={() => fbPromptAsync()}
            disabled={!fbRequest || oauthLoading !== null}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>
              {getOAuthButtonText('facebook')}
            </Text>
          </TouchableOpacity>

          {/* Register Link */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('Register')}
            style={{ marginTop: 20 }}
          >
            <Text style={styles.linkText}>¿No tenés cuenta? Registrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}