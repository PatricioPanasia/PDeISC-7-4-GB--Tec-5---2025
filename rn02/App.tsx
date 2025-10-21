// App.tsx (raíz)
import React, { useState } from "react";
import { View } from "react-native";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import { AuthProvider } from "./src/context/AuthContext";

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

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        {screen === "Login" && <LoginScreen navigation={navigation} />}
        {screen === "Register" && <RegisterScreen navigation={navigation} />}
        {screen === "Welcome" && <WelcomeScreen navigation={navigation} route={{ params }} />}
      </View>
    </AuthProvider>
  );
}
