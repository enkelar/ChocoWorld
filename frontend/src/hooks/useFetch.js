
import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../lib/api';
import { getCached, setCached, getInFlight, setInFlight } from '../lib/fetchCache';

export function useFetch(key, fetcher) {
  const cachedOnMount = key ? getCached(key) : undefined;

  const [data, setData] = useState(cachedOnMount ?? null);
  const [isLoading, setIsLoading] = useState(!!key && cachedOnMount === undefined);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState(null);

  const keyRef = useRef(key);
  // eslint-disable-next-line
  keyRef.current = key;

  const load = useCallback(
    (background) => {
      if (!key) return Promise.resolve();

      if (background) setIsRefetching(true);
      else setIsLoading(true);

      let promise = getInFlight(key);
      if (!promise) {
        const fetchFn = fetcher ?? (() => api.get(key));
        promise = fetchFn().then((result) => {
          setCached(key, result);
          return result;
        });
        setInFlight(key, promise);
      }

      return promise
        .then((result) => {
          if (keyRef.current !== key) return; // stale — a newer key took over
          setData(result);
          setError(null);
        })
        .catch((err) => {
          if (keyRef.current !== key) return;
          setError(err);
        })
        .finally(() => {
          if (keyRef.current !== key) return;
          setIsLoading(false);
          setIsRefetching(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );

  useEffect(() => {
    if (!key) {
    // eslint-disable-next-line
      setData(null);
      setIsLoading(false);
      return;
    }

    const existing = getCached(key);
    if (existing !== undefined) {
      // Cached under the NEW key — safe to show immediately.
      setData(existing);
      setIsLoading(false);
      load(true);
    } else {
      setData(null);
      load(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const refetch = useCallback(() => load(true), [load]);

  return { data, isLoading, isRefetching, error, refetch };
}