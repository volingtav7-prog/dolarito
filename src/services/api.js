// ── src/services/api.js ─────────────────────────────────────────────────────
// Centraliza todas las llamadas HTTP al backend.
// La URL base se configura via variable de entorno VITE_API_URL.

const BASE_URL = (import.meta.env.VITE_API_URL ?? '/api').trim();

/**
 * Helper genérico para fetch con JSON.
 * Lanza un Error con el mensaje del backend si la respuesta no es ok.
 */
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      data?.message || data?.error || `Error ${res.status}: ${res.statusText}`;
    throw new Error(message);
  }

  return data;
}

// ── Auth endpoints ────────────────────────────────────────────────────────────

/**
 * Registra un nuevo usuario.
 * @param {{ name: string, email: string, password: string }} payload
 * @returns {Promise<any>} Respuesta del servidor
 */
export function authRegister({ name, email, password }) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

/**
 * Inicia sesión y devuelve el JWT.
 * @param {{ email: string, password: string }} payload
 * @returns {Promise<{ token: string, user?: object }>}
 */
export function authLogin({ email, password }) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
