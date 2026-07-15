import { useLanguage } from '../../context/LanguageContext';
import { localize } from '../../lib/localize';
import './CategoryCard.css';

export function CategoryCard({ category, count, onClick }) {
  const { lang } = useLanguage();

  return (
    <button type="button" onClick={onClick} className="cw-cat-card">
      <div className="cw-cat-info">
        <span className="font-serif cw-cat-label">{localize(category, 'label', lang)}</span>
        <span className="cw-cat-tagline">{localize(category, 'tagline', lang)}</span>
      </div>
      <div className="cw-cat-right">
        <span className="cw-cat-count">
          {count} {count === 1 ? 'item' : 'items'}
        </span>
        <div className="cw-cat-plus" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
    </button>
  );
}
