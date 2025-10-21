// server.js
const express = require('express');
const db = require('./db');
const { register, login, oauthLogin, welcome } = require('./controllers/authController');

const app = express();
app.use(express.json());

// Middleware CORS simple (sin paquete externo)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Middleware auth simple: busca Authorization: Bearer <token> en headers
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    if (
      req.path === '/api/login' ||
      req.path === '/api/register' ||
      req.path === '/api/oauth-login'
    ) {
      return next();
    }

    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No autorizado. Token faltante.' });
    }

    const token = auth.slice(7);
    try {
      const [rows] = await db.execute(
        'SELECT user_id, expires_at FROM tokens WHERE token = ?',
        [token]
      );
      if (rows.length === 0) return res.status(401).json({ error: 'Token inválido.' });

      const tokenRow = rows[0];
      if (tokenRow.expires_at && new Date(tokenRow.expires_at) < new Date()) {
        return res.status(401).json({ error: 'Token expirado.' });
      }

      req.userId = tokenRow.user_id;
      return next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error verificando token.' });
    }
  } else {
    next();
  }
});

// ✅ Rutas API
app.post('/api/register', register);
app.post('/api/login', login);
app.post('/api/oauth-login', oauthLogin);
app.get('/api/welcome', welcome);

// Ruta raíz
app.get('/', (req, res) => res.send('RN02 backend OK'));

// ✅ Ruta de prueba
app.get('/test', (req, res) => {
  res.send('Ruta /test funcionando correctamente 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
