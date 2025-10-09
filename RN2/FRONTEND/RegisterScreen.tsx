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
import { RegisterData } from '../types/auth';

type RootStackParamList = {
  MainMenu: undefined;
  Login: undefined;
  Register: undefined;
  Welcome: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList, 
  'Register'
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    setError('');

    try {
      const result = await authAPI.register(data);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      } else {
        setError(result.message || 'Error al registrar usuario');
      }
    } catch (error) {
      setError('Error de conexión. Verifica el servidor.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <Text style={styles.successTitle}>¡Registro Exitoso!</Text>
          <Text style={styles.successText}>
            Tu cuenta ha sido creada correctamente.
          </Text>
          <Text style={styles.successText}>
            Redirigiendo al inicio de sesión...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.title}>Crear Cuenta</Text>
          
          <AuthForm
            type="register"
            onSubmit={handleRegister}
            loading={loading}
            error={error}
          />

          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkText}>
              ¿Ya tienes cuenta? Inicia sesión aquí
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
    backgroundColor: '#1a237e',
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  successText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
});