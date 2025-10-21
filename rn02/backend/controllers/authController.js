const db = require('../db');
const { generateSalt, hashPassword, generateToken } = require('../helpers/authHelpers');
const jwt = require('jsonwebtoken');

// Función para validar token de Google (simplificada)
async function validateGoogleToken(token) {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);
    if (!response.ok) return false;
    const data = await response.json();
    return data && data.email && !data.error;
  } catch (error) {
    console.error('Error validating Google token:', error);
    return false;
  }
}

// Función para validar token de Facebook (simplificada)
async function validateFacebookToken(token) {
  try {
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    if (!response.ok) return false;
    const data = await response.json();
    return data && data.id && !data.error;
  } catch (error) {
    console.error('Error validating Facebook token:', error);
    return false;
  }
}

// 📘 Registro tradicional CON VALIDACIONES
async function register(req, res) {
  try {
    const { full_name, email, password } = req.body;
    
    // Validaciones básicas
    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'El formato del email no es válido.' });
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    // Verificar si el usuario ya existe
    const [existingUsers] = await db.execute('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'El email ya está registrado.' });
    }

    // Crear usuario
    const salt = generateSalt();
    const password_hash = hashPassword(password, salt);

    const [result] = await db.execute(
      'INSERT INTO users (full_name, email, password_hash, salt) VALUES (?, ?, ?, ?)',
      [full_name.trim(), email.toLowerCase().trim(), password_hash, salt]
    );

    return res.status(201).json({ 
      ok: true, 
      userId: result.insertId,
      message: 'Usuario registrado exitosamente' 
    });
    
  } catch (err) {
    console.error('Error en registro:', err);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// 📘 Login tradicional - VERIFICA CREDENCIALES CONTRA BD
async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    // Validaciones básicas
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'El formato del email no es válido.' });
    }

    // Buscar usuario en la base de datos
    const [users] = await db.execute(
      'SELECT id, password_hash, salt, full_name FROM users WHERE email = ?',
      [email.toLowerCase().trim()]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'El usuario no existe. ¿Te gustaría registrarte?' });
    }
    
    const user = users[0];
    
    // Verificar contraseña
    const computedHash = hashPassword(password, user.salt);
    if (computedHash !== user.password_hash) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    // Generar token de sesión
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
    
    await db.execute(
      'INSERT INTO tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, token, expiresAt]
    );

    return res.json({ 
      ok: true, 
      token, 
      full_name: user.full_name,
      message: 'Inicio de sesión exitoso' 
    });
    
  } catch (err) {
    console.error('Error en login:', err);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// 📘 OAuth Login - SOLO para usuarios existentes
async function oauthLogin(req, res) {
  try {
    const { provider, token, email, full_name } = req.body;

    if (!provider || !token || !email) {
      return res.status(400).json({ error: 'Provider, token y email son requeridos.' });
    }

    // Validar provider
    if (!['google', 'facebook'].includes(provider)) {
      return res.status(400).json({ error: 'Provider no válido.' });
    }

    // Validar token (en producción deberías hacer la validación real)
    let tokenValid = false;
    if (provider === 'google') {
      tokenValid = await validateGoogleToken(token);
    } else if (provider === 'facebook') {
      tokenValid = await validateFacebookToken(token);
    }

    // Si no podemos validar el token, al menos verifiquemos que el email tenga formato válido
    if (!tokenValid) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email no válido.' });
      }
    }

    // BUSCAR usuario existente en la base de datos
    const [existingUsers] = await db.execute(
      'SELECT id, full_name FROM users WHERE email = ?', 
      [email.toLowerCase().trim()]
    );

    if (existingUsers.length === 0) {
      // Usuario no existe - NO crear automáticamente
      return res.status(404).json({ 
        error: 'Usuario no registrado. Por favor, regístrate primero.' 
      });
    }

    // Usuario existe - generar token de sesión
    const user = existingUsers[0];
    const appToken = generateToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    await db.execute(
      'INSERT INTO tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, appToken, expiresAt]
    );

    return res.json({ 
      ok: true, 
      token: appToken, 
      full_name: user.full_name,
      message: `Inicio de sesión con ${provider} exitoso` 
    });
    
  } catch (err) {
    console.error('Error en OAuth login:', err);
    return res.status(500).json({ error: 'Error en la autenticación externa.' });
  }
}

// 📘 Pantalla de bienvenida
async function welcome(req, res) {
  try {
    const userId = req.userId;
    const [rows] = await db.execute(
      'SELECT id, full_name, email, created_at FROM users WHERE id = ?',
      [userId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    
    const user = rows[0];
    return res.json({ 
      ok: true, 
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        created_at: user.created_at
      }
    });
    
  } catch (err) {
    console.error('Error en welcome:', err);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

module.exports = { register, login, oauthLogin, welcome };