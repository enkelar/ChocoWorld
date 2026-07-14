import { api } from './api';

export async function fetchCategories() {
  return api.get('/categories');
}

export async function createCategory({ label, slug, tagline, displayOrder }) {
  return api.post('/categories', { label, slug, tagline, displayOrder });
}

export async function updateCategory(id, { label, slug, tagline, displayOrder }) {
  return api.put(`/categories/${id}`, { label, slug, tagline, displayOrder });
}

export async function deleteCategory(id) {
  return api.delete(`/categories/${id}`);
}