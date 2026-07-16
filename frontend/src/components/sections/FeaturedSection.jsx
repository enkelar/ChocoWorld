import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { localize } from '../../lib/localize';
import { getPlaceholderImage } from '../../lib/placeholders'
import './FeaturedSection.css';

const SKELETON_COUNT = 3;

export function FeaturedSection({ products = [], isLoading = false }) {
  const { lang, t } = useLanguage();

  return (
    <section className="cw-featured">
      <div className="container">
        <div className="cw-featured-head">
          <h2 className="font-serif">{t('featured_title')}</h2>
          <Link to="/menu" className="text-gold cw-featured-link">
            {t('featured_link')}
          </Link>
        </div>
        <div className="cw-featured-grid">
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div key={i} className="cw-featured-card cw-featured-skeleton" aria-hidden="true">
                  <div className="cw-featured-img" />
                  <div className="cw-featured-info">
                    <span className="cw-skeleton-line" style={{ width: '60%' }} />
                    <span className="cw-skeleton-line" style={{ width: '30%' }} />
                  </div>
                </div>
              ))
            : products.map((p) => (
                <Link key={p._id} to={`/product/${p.slug}`} className="cw-featured-card">
                  <div className="cw-featured-img">
                    <img
                      src={p.image || getPlaceholderImage(p.category)}
                      alt={localize(p, 'name', lang)}
                      loading="lazy"
                      width="450"
                      height="563"
                    />
                  </div>
                  <div className="cw-featured-info">
                    <h3 className="font-serif">{localize(p, 'name', lang)}</h3>
                    <span className="text-gold font-serif italic">
                      €{p.price.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}