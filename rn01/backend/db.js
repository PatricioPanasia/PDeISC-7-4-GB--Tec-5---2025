// db.js - conexión a MySQL usando mysql2 (promises)
const mysql = require('mysql2/promise');

// Cambiá estos valores a los de tu XAMPP
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',      // si tenés password, colocalo
  database: 'rn01_auth',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
