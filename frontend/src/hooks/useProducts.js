import { useFetch } from './useFetch';

export function useMenuProducts(category) {
  const key = category ? `/products?category=${category}` : '/products';
  return useFetch(key);
}

export function useMenuProductsPaged({ category, page = 1, limit = 20 } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  params.set('page', page);
  params.set('limit', limit);
  return useFetch(`/products?${params.toString()}`);
}

export function useFeaturedProducts() {
  return useFetch('/products/featured');
}

export function useProductBySlug(slug) {
  return useFetch(slug ? `/products/${slug}` : null);
}

export function useBestSellers() {
  return useFetch('/products/best-sellers');
}