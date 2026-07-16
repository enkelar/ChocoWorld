import { describe, it, expect } from 'vitest';
import { localize } from '../localize';

describe('localize', () => {
  const product = { name: 'Waffle', nameSq: 'Vaflë', description: 'Tasty' };

  it('returns the English field by default', () => {
    expect(localize(product, 'name', 'en')).toBe('Waffle');
  });

  it('returns the Sq field when lang is sq and it exists', () => {
    expect(localize(product, 'name', 'sq')).toBe('Vaflë');
  });

  it('falls back to English when the Sq field is missing', () => {
    expect(localize(product, 'description', 'sq')).toBe('Tasty');
  });

  it('returns an empty string for a null/undefined object', () => {
    expect(localize(null, 'name', 'en')).toBe('');
    expect(localize(undefined, 'name', 'en')).toBe('');
  });

  it('returns an empty string when the field itself is missing', () => {
    expect(localize({}, 'name', 'en')).toBe('');
  });
});