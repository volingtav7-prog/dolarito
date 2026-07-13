// ── server/controllers/authController.js ─────────────────────────────────────
// Controller de autenticación.
// Solo maneja HTTP: extrae datos del request, llama al service, responde.

const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const result = await authService.registerUser(nombre, email, password);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error en register:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error interno del servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error interno del servidor' });
  }
};

module.exports = { register, login };
