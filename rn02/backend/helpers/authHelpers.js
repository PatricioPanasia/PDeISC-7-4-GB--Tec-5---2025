// authHelpers.js - hashing y token generation usando crypto nativo
const crypto = require('crypto');

function generateSalt() {
  return crypto.randomBytes(16).toString('hex'); // 32 chars
}

function hashPassword(password, salt) {
  // PBKDF2: 100k iteraciones, sha256, 64 bytes
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
  return hash;
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex'); // 64 chars
}

module.exports = { generateSalt, hashPassword, generateToken };
