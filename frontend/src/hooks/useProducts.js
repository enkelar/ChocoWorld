import { useFetch } from './useFetch';

export function useMenuProducts(category) {
  const key = category ? `/products?category=${category}` : '/products';
  return useFetch(key);
}

export function useFeaturedProducts() {
  return useFetch('/products/featured');
}

export function useProductBySlug(slug) {
  return useFetch(slug ? `/products/${slug}` : null);
}