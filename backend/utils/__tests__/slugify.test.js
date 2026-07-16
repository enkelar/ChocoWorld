import { describe, it, expect } from 'vitest';
import slugify from '../slugify.js';

describe('slugify', () => {
  it('lowercases and hyphenates spaces', () => {
    expect(slugify('Velvet Belgian Waffle')).toBe('velvet-belgian-waffle');
  });

  it('strips non-alphanumeric characters', () => {
    expect(slugify('Café Crème & Sugar!')).toBe('caf-cr-me-sugar');
  });

  it('trims leading/trailing hyphens', () => {
    expect(slugify('  -Cold Brew-  ')).toBe('cold-brew');
  });

  it('handles empty input', () => {
    expect(slugify()).toBe('');
    expect(slugify('')).toBe('');
  });

  it('collapses multiple separators into one hyphen', () => {
    expect(slugify('waffle   &&&   pancake')).toBe('waffle-pancake');
  });
});