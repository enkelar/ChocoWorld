import { api } from './api';

// lib/categories.js
let cache = null;
let inFlight = null;

export async function fetchCategoriesCached() {
  if (cache) return cache;
  if (!inFlight) {
    inFlight = fetchCategories().then((data) => {
      cache = data;
      inFlight = null;
      return data;
    });
  }
  return inFlight;
}

export function invalidateCategoriesCache() {
  cache = null;
}

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

export function getCategory(slug) {
  return cache.find((c) => c.slug === slug);
}

export function getCategories() {
  return cache;
}