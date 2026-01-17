const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.1.5:3001';

export async function apiUsuario(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.detail || data.message || 'Error en el servidor');
    error.status = response.status;
    throw error;
  }

  return data;
}

