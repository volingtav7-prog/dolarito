// ── server/services/authService.js ───────────────────────────────────────────
// Lógica de negocio de autenticación.
// Los controllers llaman a este servicio; ellos solo manejan HTTP.

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SALT_ROUNDS = 10;
const JWT_EXPIRES = '24h';

/**
 * Registra un nuevo usuario.
 * @returns {{ user: object, token: string }}
 * @throws Error con mensaje descriptivo si falla la validación.
 */
async function registerUser(nombre, email, password) {
  if (!nombre || !email || !password) {
    throw Object.assign(new Error('Todos los campos son obligatorios'), { status: 400 });
  }

  const existing = await userModel.getUserByEmail(email);
  if (existing) {
    throw Object.assign(new Error('El email ya está registrado'), { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userModel.createUser(nombre, email, passwordHash);

  const token = signToken(user);
  return { user, token };
}

/**
 * Autentica un usuario existente.
 * @returns {{ user: object, token: string }}
 * @throws Error con mensaje descriptivo si las credenciales son inválidas.
 */
async function loginUser(email, password) {
  if (!email || !password) {
    throw Object.assign(new Error('Email y contraseña obligatorios'), { status: 400 });
  }

  const user = await userModel.getUserByEmail(email);
  if (!user) {
    throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
  }

  const { password_hash, ...safeUser } = user;
  const token = signToken(safeUser);
  return { user: safeUser, token };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function signToken(user) {
  return jwt.sign(
    { id_usuario: user.id_usuario, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

module.exports = { registerUser, loginUser };
