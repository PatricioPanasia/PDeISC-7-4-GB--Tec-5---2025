// src/api/api.ts
export const API_BASE = "http://localhost:3000/api";

// Prueba de conexión con el backend
export async function testBackend() {
  try {
    const res = await fetch("http://localhost:3000/test");
    const text = await res.text();
    console.log("✅ Backend responde:", text);
  } catch (err) {
    console.error("❌ No se pudo conectar al backend:", err);
  }
}
