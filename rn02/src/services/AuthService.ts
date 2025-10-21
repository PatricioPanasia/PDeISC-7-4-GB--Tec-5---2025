// src/services/AuthService.ts
import * as AuthSession from "expo-auth-session";

// --- CONFIG: PONÉ TUS CLIENT IDs AQUÍ ---
const GOOGLE_CLIENT_ID = "736928000126-9afc6qdotsdpob488r528ertj5cq98lv.apps.googleusercontent.com";
const FACEBOOK_APP_ID = "TU_FACEBOOK_APP_ID";
// ---------------------------------------

/**
 * Abre el flujo OAuth para Google y devuelve token o error.
 * usa useProxy:true (ideal para Expo Go/dev)
 */
export async function signInWithGoogle() {
  try {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent("profile email")}`;

    const result = await AuthSession.startAsync({ authUrl });
    // result.type === 'success' y result.params.access_token
    if (result.type === "success" && result.params?.access_token) {
      return { success: true, token: result.params.access_token };
    }
    return { success: false, error: result.type || "no_token" };
  } catch (err) {
    return { success: false, error: err };
  }
}

/**
 * Flujoo OAuth Facebook
 */
export async function signInWithFacebook() {
  try {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    const authUrl =
      `https://www.facebook.com/v15.0/dialog/oauth` +
      `?client_id=${encodeURIComponent(FACEBOOK_APP_ID)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent("email,public_profile")}`;

    const result = await AuthSession.startAsync({ authUrl });
    if (result.type === "success" && result.params?.access_token) {
      return { success: true, token: result.params.access_token };
    }
    return { success: false, error: result.type || "no_token" };
  } catch (err) {
    return { success: false, error: err };
  }
}
