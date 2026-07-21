import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductGrid } from '../../components/menu/ProductGrid';
import { LoadingState, EmptyState } from '../../components/shared/States';
import { useCategories } from '../../hooks/useCategories';
import { useMenuProducts } from '../../hooks/useProducts';
import { useLanguage } from '../../context/LanguageContext';
import { localize } from '../../lib/localize';
import './CategoryView.css';

export function CategoryView() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: products, isLoading: productsLoading } = useMenuProducts(slug);

  const category = useMemo(
    () => (categories ?? []).find((c) => c.slug === slug),
    [categories, slug]
  );

  const items = useMemo(() => products ?? [], [products]);

  if (categoriesLoading) {
    return (
      <main className="cw-category-page">
        <div className="container">
          <LoadingState label={t('loading_menu')} />
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="cw-category-page">
        <div className="container">
          <EmptyState label={t('category_not_found')} hint={t('category_not_found_hint')} />
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link to="/menu" className="text-caramel" style={{ textDecoration: 'underline' }}>
              {t('back_to_menu')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cw-category-page">
      <div className="container">
        <div className="cw-category-head">
          <Link to="/menu" className="cw-category-back">
            {t('back_to_categories')}
          </Link>
          <h1 className="font-serif">{localize(category, 'label', lang)}</h1>
          <p className="cw-category-tagline">{localize(category, 'tagline', lang)}</p>
        </div>

        {productsLoading && <LoadingState label={t('loading_menu')} />}

        {!productsLoading && items.length === 0 && (
          <EmptyState label={t('category_empty')} hint={t('category_empty_hint')} />
        )}

        {items.length > 0 && (
          <ProductGrid
            products={items}
            originPath={`/category/${slug}`}
            originLabel={localize(category, 'label', lang)}
          />
        )}
      </div>
    </main>
  );
}

export default CategoryView;