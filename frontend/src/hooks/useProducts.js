import { useEffect, useState, useCallback } from 'react';
import { api } from '../lib/api';

export function useMenuProducts(category) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    setIsLoading(true);
    const path = category ? `/products?category=${category}` : '/products';
    return api
      .get(path)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {

  // eslint-disable-next-line react-hooks/set-state-in-effect
    refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
}

export function useFeaturedProducts() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/products/featured').then(setData).finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
}

export function useProductBySlug(slug) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

      // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    setError(null);
    api
      .get(`/products/${slug}`)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [slug]);

  return { data, isLoading, error };
}
