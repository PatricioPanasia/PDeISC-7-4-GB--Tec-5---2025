import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator 
} from 'react-native';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => void;
  loading: boolean;
  error?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ 
  type, 
  onSubmit, 
  loading, 
  error 
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [formErrors, setFormErrors] = React.useState<{[key: string]: string}>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'La contraseña debe contener al menos una letra mayúscula';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'La contraseña debe contener al menos un número';
    }
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
      return 'La contraseña debe contener al menos un carácter especial';
    }
    return null;
  };

  const handleSubmit = () => {
    const errors: {[key: string]: string} = {};

    // Validar email
    if (!email) {
      errors.email = 'El correo electrónico es requerido';
    } else if (!validateEmail(email)) {
      errors.email = 'Correo electrónico inválido';
    }

    // Validar contraseña
    if (!password) {
      errors.password = 'La contraseña es requerida';
    } else {
      const passwordError = validatePassword(password);
      if (passwordError) {
        errors.password = passwordError;
      }
    }

    // Validar confirmación de contraseña (solo en registro)
    if (type === 'register') {
      if (!confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = type === 'login' 
        ? { email, password }
        : { email, password, confirmPassword };
      
      onSubmit(formData);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formErrors.email && styles.inputError]}
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {formErrors.email && (
        <Text style={styles.errorText}>{formErrors.email}</Text>
      )}

      <TextInput
        style={[styles.input, formErrors.password && styles.inputError]}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {formErrors.password && (
        <Text style={styles.errorText}>{formErrors.password}</Text>
      )}

      {type === 'register' && (
        <>
          <TextInput
            style={[styles.input, formErrors.confirmPassword && styles.inputError]}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {formErrors.confirmPassword && (
            <Text style={styles.errorText}>{formErrors.confirmPassword}</Text>
          )}
        </>
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {type === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputError: {
    borderColor: '#ff4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});