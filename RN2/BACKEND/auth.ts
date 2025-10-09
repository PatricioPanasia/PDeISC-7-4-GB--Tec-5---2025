export interface User {
  id: number;
  email: string;
  password: string;
  created_at: Date;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: number;
    email: string;
  };
}

export interface JwtPayload {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}