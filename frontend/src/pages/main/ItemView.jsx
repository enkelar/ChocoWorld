import { Link, useParams } from 'react-router-dom';
import { LoadingState, EmptyState } from '../../components/shared/States';
import { useProductBySlug } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useLanguage } from '../../context/LanguageContext';
import { localize } from '../../lib/localize';
import { getPlaceholderImage } from '../../lib/placeholders';
import './ItemView.css';

export function ItemView() {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProductBySlug(slug);
  const { data: categories } = useCategories();
  const { lang, t } = useLanguage();
  
  const categoryObj = categories?.find((c) => c.slug === product?.category);
  const categoryLabel = categoryObj ? localize(categoryObj, 'label', lang) : product?.category;

  if (isLoading) {
    return (
      <main className="cw-item-page">
        <LoadingState label={t('item_loading')}  />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="cw-item-page">
        <EmptyState label={t('item_not_found')} />
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/menu" className="text-caramel" style={{ textDecoration: 'underline' }}>
            {t('back_to_menu')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cw-item-page">
      <div className="container cw-item-inner">
        <Link to={`/category/${product.category}`} className="cw-item-back">
          <span aria-hidden>←</span> {t('item_back_to')} {categoryLabel}
        </Link>

        <article className="cw-item-card">
          <div className="cw-item-image">
            <img src={product.image || getPlaceholderImage(product.category)} alt={localize(product, 'name', lang)} />
          </div>
          <div className="cw-item-body">
            <div className="cw-item-head">
              <div>
                <span className="eyebrow" style={{ marginBottom: 4 }}>
                  {categoryLabel}
                </span>
                <h1 className="font-serif">{localize(product, 'name', lang)}</h1>
              </div>
              <span className="font-serif italic cw-item-price">
                €{product.price.toFixed(2)}
              </span>
            </div>



            <div className="cw-item-meta">
              {localize(product, 'ingredients', lang) && (
                <div>
                  <p className="cw-item-meta-label">{t('item_ingredients')}</p>
                  <p className="cw-item-meta-text">{localize(product, 'ingredients', lang)}</p>
                </div>
              )}
              {product.allergens?.length > 0 && (
                <div>
                  <p className="cw-item-meta-label">{t('item_allergens')} </p>
                  <div className="cw-item-allergens">
                    {product.allergens.map((a) => (
                      <span key={a}>{a}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {product.bestSeller && (
              <p className="cw-item-bestSeller">★ Best Seller</p>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}

export default ItemView;
