import * as SecureStore from 'expo-secure-store';
import { AuthResponse, LoginData, RegisterData, User } from '../types/auth';

const API_BASE_URL = 'http://localhost:3001/api';

// Almacenamiento seguro
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const authAPI = {
  // Guardar token
  async saveToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  // Obtener token
  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  // Guardar datos del usuario
  async saveUser(user: User): Promise<void> {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  },

  // Obtener datos del usuario
  async getUser(): Promise<User | null> {
    const userData = await SecureStore.getItemAsync(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  // Eliminar datos de sesión
  async clearAuthData(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  },

  // Registro
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        message: 'Error de conexión. Verifica que el servidor esté ejecutándose.',
      };
    }
  },

  // Login
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.success && result.token && result.user) {
        await this.saveToken(result.token);
        await this.saveUser(result.user);
      }
      
      return result;
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: 'Error de conexión. Verifica que el servidor esté ejecutándose.',
      };
    }
  },

  // Obtener datos del usuario actual
  async getCurrentUser(): Promise<{ success: boolean; user?: User; message?: string }> {
    try {
      const token = await this.getToken();
      
      if (!token) {
        return { success: false, message: 'No hay sesión activa' };
      }

      const response = await fetch(`${API_BASE_URL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (result.success && result.user) {
        await this.saveUser(result.user);
      }
      
      return result;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return {
        success: false,
        message: 'Error de conexión',
      };
    }
  },

  // Cerrar sesión
  async logout(): Promise<void> {
    await this.clearAuthData();
  },
};