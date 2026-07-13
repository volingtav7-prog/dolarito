const db = require('../config/db');

const createUser = async (nombre, email, passwordHash) => {
  const result = await db.query(
    'INSERT INTO usuarios (nombre, email, password_hash) VALUES ($1, $2, $3) RETURNING id_usuario, nombre, email, divisa_base_id',
    [nombre, email, passwordHash]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await db.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail
};
