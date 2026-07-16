import { describe, it, expect, beforeEach, vi } from 'vitest';
import cache from '../cache.js';

describe('TTLCache', () => {
  beforeEach(() => {
    cache.clear();
    vi.useRealTimers();
  });

  it('returns undefined for a missing key', () => {
    expect(cache.get('nope')).toBeUndefined();
  });

  it('stores and retrieves a value before expiry', () => {
    cache.set('menu:full', { hello: 'world' }, 1000);
    expect(cache.get('menu:full')).toEqual({ hello: 'world' });
  });

  it('expires a value after its TTL passes', async () => {
    vi.useFakeTimers();
    cache.set('menu:full', { hello: 'world' }, 100);
    vi.advanceTimersByTime(150);
    expect(cache.get('menu:full')).toBeUndefined();
    vi.useRealTimers();
  });

  it('invalidate() removes an exact key match', () => {
    cache.set('menu:full', 1, 5000);
    cache.invalidate('menu:full');
    expect(cache.get('menu:full')).toBeUndefined();
  });

  it('invalidate() removes all keys sharing a prefix', () => {
    cache.set('menu:full', 1, 5000);
    cache.set('menu:categories', 2, 5000);
    cache.set('products:all', 3, 5000);
    cache.invalidate('menu:');
    expect(cache.get('menu:full')).toBeUndefined();
    expect(cache.get('menu:categories')).toBeUndefined();
    expect(cache.get('products:all')).toBe(3);
  });

  it('clear() wipes everything', () => {
    cache.set('a', 1, 5000);
    cache.set('b', 2, 5000);
    cache.clear();
    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('b')).toBeUndefined();
  });
});