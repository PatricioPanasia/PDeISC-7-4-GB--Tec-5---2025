import React, { useState, useEffect } from "react";
import { View } from "react-native";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import { testBackend } from "./src/api/api"; // 👈 importamos la función de prueba

type Screen = "Login" | "Register" | "Welcome";

export default function App() {
  const [screen, setScreen] = useState<Screen>("Login");
  const [params, setParams] = useState<any>({});

  const navigation = {
    navigate: (s: Screen, p?: any) => {
      setScreen(s);
      if (p) setParams(p);
    },
  };

  // 👇 Esto se ejecuta automáticamente al iniciar la app
  useEffect(() => {
    testBackend();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {screen === "Login" && <LoginScreen navigation={navigation} />}
      {screen === "Register" && <RegisterScreen navigation={navigation} />}
      {screen === "Welcome" && (
        <WelcomeScreen navigation={navigation} route={{ params }} />
      )}
    </View>
  );
}
