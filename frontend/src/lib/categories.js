import { api } from './api';

// Local cache so components that need a category synchronously (e.g. right
// after a fetch elsewhere) can look one up without re-hitting the network.
let cache = [];

export async function fetchCategories() {
  const data = await api.get('/categories');
  cache = data;
  return data;
}

export async function createCategory({ label, slug, tagline, displayOrder }) {
  const created = await api.post('/categories', { label, slug, tagline, displayOrder });
  cache = [...cache, created];
  return created;
}

export async function updateCategory(id, { label, slug, tagline, displayOrder }) {
  const updated = await api.put(`/categories/${id}`, { label, slug, tagline, displayOrder });
  cache = cache.map((c) => (c._id === id ? updated : c));
  return updated;
}

export async function deleteCategory(id) {
  await api.delete(`/categories/${id}`);
  cache = cache.filter((c) => c._id !== id);
}

// Synchronous lookup against the last-fetched cache. Call fetchCategories()
// first (e.g. on app load or menu page mount) to populate it.
export function getCategory(slug) {
  return cache.find((c) => c.slug === slug);
}

export function getCategories() {
  return cache;
}