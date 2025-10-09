import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthForm } from '../components/AuthForm';
import { authAPI } from '../api/auth';
import { LoginData } from '../types/auth';

type RootStackParamList = {
  MainMenu: undefined;
  Login: undefined;
  Register: undefined;
  Welcome: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList, 
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    setError('');

    try {
      const result = await authAPI.login(data);
      
      if (result.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      } else {
        setError(result.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Error de conexión. Verifica el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          
          <AuthForm
            type="login"
            onSubmit={handleLogin}
            loading={loading}
            error={error}
          />

          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>
              ¿No tienes cuenta? Regístrate aquí
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e'
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 20,
    padding: 10,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});