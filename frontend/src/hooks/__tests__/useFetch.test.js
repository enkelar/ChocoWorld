import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../useFetch';
import { invalidate } from '../../lib/fetchCache';

describe('useFetch', () => {
  beforeEach(() => {
    invalidate(''); // clear shared cache between tests
  });

  it('returns data once the fetcher resolves', async () => {
    const fetcher = vi.fn().mockResolvedValue({ hello: 'world' });
    const { result } = renderHook(() => useFetch('/test-key-1', fetcher));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toEqual({ hello: 'world' });
  });

  it('ignores a stale response after the key changes mid-flight', async () => {
    let resolveFirst;
    const firstFetch = new Promise((resolve) => {
      resolveFirst = resolve;
    });

    const fetcherA = vi.fn(() => firstFetch);
    const fetcherB = vi.fn().mockResolvedValue({ value: 'B' });

    const { result, rerender } = renderHook(({ key, fetcher }) => useFetch(key, fetcher), {
      initialProps: { key: '/key-a', fetcher: fetcherA },
    });

    // Switch keys before the first fetch resolves — simulates fast navigation.
    rerender({ key: '/key-b', fetcher: fetcherB });
    await waitFor(() => expect(result.current.data).toEqual({ value: 'B' }));

    // Now resolve the stale first fetch — it must NOT overwrite the current data.
    resolveFirst({ value: 'A (stale)' });
    await new Promise((r) => setTimeout(r, 0));

    expect(result.current.data).toEqual({ value: 'B' });
  });

  it('surfaces an error without touching data on fetch failure', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('network down'));
    const { result } = renderHook(() => useFetch('/test-key-err', fetcher));

    await waitFor(() => expect(result.current.error).toBeTruthy());
    expect(result.current.error.message).toBe('network down');
    expect(result.current.data).toBeNull();
  });
});