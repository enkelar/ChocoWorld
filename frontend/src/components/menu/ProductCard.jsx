import { Link } from 'react-router-dom';
import { getPlaceholderImage } from '../../lib/placeholders';
import './ProductCard.css';

export function ProductCard({ product, index = 0 }) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="cw-product-card animate-velvet-reveal"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="cw-product-img">
        <img src={product.image || getPlaceholderImage(product.category)} alt={product.name} loading="lazy" />
      </div>
      <div className="cw-product-info">
        <h3>{product.name}</h3>
        <p className="text-gold">€{product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
