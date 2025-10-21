// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

type UserData = {
  provider: string;
  token: string;
  email?: string;
  name?: string;
  picture?: string;
};

type AuthContextType = {
  user: UserData | null;
  login: (userData: UserData) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await SecureStore.getItemAsync("rn02_user");
        if (raw) setUser(JSON.parse(raw));
      } catch (e) {
        console.warn("No se pudo cargar usuario seguro:", e);
      }
    })();
  }, []);

  const login = async (userData: UserData) => {
    setUser(userData);
    try {
      await SecureStore.setItemAsync("rn02_user", JSON.stringify(userData));
    } catch (e) {
      console.warn("No se pudo guardar usuario:", e);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await SecureStore.deleteItemAsync("rn02_user");
    } catch (e) {
      console.warn("No se pudo borrar usuario:", e);
    }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
