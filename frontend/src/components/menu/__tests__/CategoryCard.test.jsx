import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryCard } from '../CategoryCard';
import { LanguageProvider } from '../../../context/LanguageContext';

function renderWithLang(ui) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe('CategoryCard', () => {
  const category = {
    label: 'Waffles',
    labelSq: 'Vafle',
    tagline: 'Golden and warm',
    taglineSq: 'Të arta dhe të ngrohta',
  };

  it('renders the English label and tagline by default', () => {
    renderWithLang(<CategoryCard category={category} count={3} onClick={() => {}} />);
    expect(screen.getByText('Waffles')).toBeInTheDocument();
    expect(screen.getByText('Golden and warm')).toBeInTheDocument();
  });

  it('shows singular "item" for a count of 1', () => {
    renderWithLang(<CategoryCard category={category} count={1} onClick={() => {}} />);
    expect(screen.getByText(/1 item$/)).toBeInTheDocument();
  });

  it('shows plural "items" for counts other than 1', () => {
    renderWithLang(<CategoryCard category={category} count={0} onClick={() => {}} />);
    expect(screen.getByText(/0 items/)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    renderWithLang(<CategoryCard category={category} count={2} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});