import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
  if (Platform.OS === 'web') {
    // Para web, usar un View con gradiente CSS
    return (
      <View 
        style={[
          styles.container,
          {
            background: 'linear-gradient(135deg, #1a237e 0%, #b71c1c 100%)'
          }
        ]}
      >
        {children}
      </View>
    );
  }

  // Para móvil, mantener el estilo original
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});