import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e0f16", // fondo oscuro principal
  },

  // Tarjeta central con fondo oscuro y contraste
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 16,
    padding: 25,
    backgroundColor: "#1a1b23", // gris oscuro neutro
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
    color: "#ffffff", // texto principal claro
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    marginBottom: 18,
    color: "#bbbbbb", // gris medio
    textAlign: "center",
  },

  input: {
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#2a2b33", // campo oscuro
    color: "#ffffff", // texto claro
    borderWidth: 1,
    borderColor: "#3a3b45",
  },

  inputError: {
    borderColor: '#ff4444',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
  },

  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
    marginLeft: 8,
  },

  btn: {
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#3478f6", // azul vibrante
  },

  btnText: {
    color: "#ffffff", // texto blanco sobre azul
    fontWeight: "700",
    fontSize: 16,
  },

  linkText: {
    color: "#58a6ff", // azul claro visible sobre fondo oscuro
    marginTop: 14,
    textAlign: "center",
    fontWeight: "500",
  },

  // Esferas decorativas con transparencia
  topBackground: {
    position: "absolute",
    top: -120,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255, 120, 80, 0.15)", // leve brillo cálido
  },

  bottomBackground: {
    position: "absolute",
    bottom: -120,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(80, 120, 255, 0.15)", // leve brillo frío
  },

  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  separatorText: {
    color: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 10,
    fontSize: 14,
  },
});