import { describe, it, expect, beforeEach } from 'vitest';
import {
  getCached,
  setCached,
  getInFlight,
  setInFlight,
  invalidate,
  runMutation,
} from '../fetchCache';

describe('fetchCache', () => {
  beforeEach(() => {
    invalidate('');
  });

  it('getCached returns undefined for an unset key', () => {
    expect(getCached('/menu')).toBeUndefined();
  });

  it('setCached then getCached round-trips a value', () => {
    setCached('/menu', { categories: [] });
    expect(getCached('/menu')).toEqual({ categories: [] });
  });

  it('setInFlight registers a promise retrievable by getInFlight', async () => {
    const promise = Promise.resolve('done');
    setInFlight('/menu', promise);
    expect(getInFlight('/menu')).toBe(promise);
    await promise;
  });

  it('in-flight entry is cleared once the promise settles', async () => {
    const promise = Promise.resolve('done');
    setInFlight('/menu', promise);
    await promise;
    await Promise.resolve(); // flush the .finally()
    expect(getInFlight('/menu')).toBeUndefined();
  });

  it('invalidate removes exact and prefixed cache keys', () => {
    setCached('/menu', 1);
    setCached('/menu/extra', 2);
    setCached('/products', 3);
    invalidate('/menu');
    expect(getCached('/menu')).toBeUndefined();
    expect(getCached('/menu/extra')).toBeUndefined();
    expect(getCached('/products')).toBe(3);
  });

  it('runMutation invalidates the given keys after the mutation resolves', async () => {
    setCached('/products', ['old']);
    const result = await runMutation(async () => 'created', ['/products']);
    expect(result).toBe('created');
    expect(getCached('/products')).toBeUndefined();
  });
});