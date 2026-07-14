import { Link, useParams } from 'react-router-dom';
import { LoadingState, EmptyState } from '../../components/shared/States';
import { useProductBySlug } from '../../hooks/useProducts';
import { getPlaceholderImage } from '../../lib/placeholders';
import './ItemView.css';

export function ItemView() {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProductBySlug(slug);

  if (isLoading) {
    return (
      <main className="cw-item-page">
        <LoadingState label="Loading item…" />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="cw-item-page">
        <EmptyState label="Product not found" />
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/menu" className="text-caramel" style={{ textDecoration: 'underline' }}>
            Back to menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cw-item-page">
      <div className="container cw-item-inner">
        <Link to="/menu" className="cw-item-back">
          <span aria-hidden>←</span> Back to menu
        </Link>

        <article className="cw-item-card">
          <div className="cw-item-image">
            <img src={product.image || getPlaceholderImage(product.category)} alt={product.name} />
          </div>
          <div className="cw-item-body">
            <div className="cw-item-head">
              <div>
                <span className="eyebrow" style={{ marginBottom: 4 }}>
                  {product.category}
                </span>
                <h1 className="font-serif">{product.name}</h1>
              </div>
              <span className="font-serif italic cw-item-price">
                €{product.price.toFixed(2)}
              </span>
            </div>

            {product.description && <p className="cw-item-desc">{product.description}</p>}

            <div className="cw-item-meta">
              {product.ingredients && (
                <div>
                  <p className="cw-item-meta-label">Ingredients</p>
                  <p className="cw-item-meta-text">{product.ingredients}</p>
                </div>
              )}
              {product.allergens?.length > 0 && (
                <div>
                  <p className="cw-item-meta-label">Allergen notice</p>
                  <div className="cw-item-allergens">
                    {product.allergens.map((a) => (
                      <span key={a}>{a}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!product.available && (
              <p className="cw-item-unavailable">Currently unavailable.</p>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}

export default ItemView;
