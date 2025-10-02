import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabTwoScreen() {
  return (
    <LinearGradient
      colors={['blue', 'red']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.text}>Hola mundo</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // centra vertical
    alignItems: 'center',      // centra horizontal
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});
