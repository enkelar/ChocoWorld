const BASE_URL = '/api';

function shouldAuth(options) {
  if (typeof options.auth === 'boolean') return options.auth;
  // Default: only non-GET requests carry the token (admin mutations).
  return !!options.method && options.method !== 'GET';
}

async function request(path, options = {}) {
  const auth = shouldAuth(options);
  const token = auth ? localStorage.getItem('cw_token') : null;
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers, cache: 'no-store' });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

async function uploadRequest(path, formData, options = {}) {
  const auth = shouldAuth({ method: options.method || 'POST', ...options });
  const token = auth ? localStorage.getItem('cw_token') : null;
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    method: options.method || 'POST',
    headers,
    body: formData,
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Upload failed');
  }
  return data;
}

export const api = {
  get: (path, options) => request(path, options),
  post: (path, body, options) =>
    request(path, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (path, body, options) =>
    request(path, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
  upload: (path, formData, options) => uploadRequest(path, formData, options),
};