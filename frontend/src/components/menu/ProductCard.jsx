import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { localize } from '../../lib/localize';
import { getPlaceholderImage } from '../../lib/placeholders';
import './ProductCard.css';

export function ProductCard({ product, index = 0 }) {
  const { lang } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/product/${product.slug}`}
      className="cw-product-card animate-velvet-reveal"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="cw-product-img">
        <img
          src={product.image || getPlaceholderImage(product.category)}
          alt={localize(product, 'name', lang)}
          loading="lazy"
          width="400"
          height="400"
          className={loaded ? 'is-loaded' : ''}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="cw-product-info">
        <h3>{localize(product, 'name', lang)}</h3>
        <p className="text-gold">€{product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}