// authController.js
const db = require('../db');
const { generateSalt, hashPassword, generateToken } = require('../helpers/authHelpers');

async function register(req, res) {
  try {
    const { full_name, email, password } = req.body;
    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos (full_name, email, password).' });
    }

    // comprobar si email existe
    const [rows] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ error: 'El email ya está registrado.' });
    }

    const salt = generateSalt();
    const password_hash = hashPassword(password, salt);

    const [result] = await db.execute(
      'INSERT INTO users (full_name, email, password_hash, salt) VALUES (?, ?, ?, ?)',
      [full_name, email, password_hash, salt]
    );

    return res.json({ ok: true, userId: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error en el servidor.' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan datos (email, password).' });
    }

    const [rows] = await db.execute('SELECT id, password_hash, salt, full_name FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }
    const user = rows[0];
    const computedHash = hashPassword(password, user.salt);
    if (computedHash !== user.password_hash) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // generar token y guardarlo
    const token = generateToken();
    // opcional: establecer expiración (ej: 7 días)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
    await db.execute('INSERT INTO tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [user.id, token, expiresAt]);

    return res.json({ ok: true, token, full_name: user.full_name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error en el servidor.' });
  }
}

async function welcome(req, res) {
  try {
    // req.userId fue seteado por middleware auth
    const userId = req.userId;
    const [rows] = await db.execute('SELECT id, full_name, email, created_at FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado.' });
    const user = rows[0];
    return res.json({ ok: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error en el servidor.' });
  }
}

module.exports = { register, login, welcome };
