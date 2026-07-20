import { describe, it, expect } from 'vitest';
import { localize } from '../localize';

describe('localize', () => {
  const product = { name: 'Waffle', ingredients: 'Waffle batter, chocolate' };

  it('returns the English field by default', () => {
    expect(localize(product, 'name', 'en')).toBe('Waffle');
  });

  it('returns the Sq field when lang is sq and it exists', () => {
    const productSq = { name: 'Waffle', ingredientsSq: 'Miell për wafle, çokolate' };
    expect(localize(productSq, 'ingredients', 'sq')).toBe('Miell për wafle, çokolate');
  });

  it('falls back to English when the Sq field is missing', () => {
    expect(localize(product, 'ingredients', 'sq')).toBe('Waffle batter, chocolate');
  });

  it('returns an empty string for a null/undefined object', () => {
    expect(localize(null, 'name', 'en')).toBe('');
    expect(localize(undefined, 'name', 'en')).toBe('');
  });

  it('returns an empty string when the field itself is missing', () => {
    expect(localize({}, 'name', 'en')).toBe('');
  });
});