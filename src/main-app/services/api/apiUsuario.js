const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.1.5:3001';

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token || null;
};

export const clearAuthToken = () => {
  authToken = null;
};

export async function apiUsuario(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    headers,
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

export async function updateUserProfile(userId, payload) {
  return apiUsuario(`/api/perfil/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function getUserProfile(userId, role) {
  const roleParam = role ? `?role=${encodeURIComponent(role)}` : '';
  return apiUsuario(`/api/perfil/${userId}${roleParam}`, {
    method: 'GET',
  });
}

