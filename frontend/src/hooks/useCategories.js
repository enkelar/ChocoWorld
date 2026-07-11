import { useEffect, useState } from 'react';
import { fetchCategories } from '../lib/categories';

export function useCategories() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setIsLoading(true);
        const categories = await fetchCategories();
        if (active) setData(categories);
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { data, isLoading, error };
}