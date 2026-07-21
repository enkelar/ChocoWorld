import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { LanguageProvider } from '../../../context/LanguageContext';

function renderCard(props) {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <ProductCard product={{ _id: '1', slug: 'waffle', name: 'Waffle', price: 4.5, category: 'waffles' }} {...props} />
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe('ProductCard', () => {
  it('links to the product detail page', () => {
    renderCard();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/product/waffle');
  });

  it('renders the formatted price', () => {
    renderCard();
    expect(screen.getByText('€4.50')).toBeInTheDocument();
  });
});