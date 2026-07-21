import { Link } from 'react-router-dom';
import { ProductGrid } from '../../components/menu/ProductGrid';
import { LoadingState, EmptyState } from '../../components/shared/States';
import { useBestSellers } from '../../hooks/useProducts';
import { useLanguage } from '../../context/LanguageContext';
import './CategoryView.css';

export function BestSellers() {
  const { data: products, isLoading } = useBestSellers();
  const { t } = useLanguage();

  const items = products ?? [];

  return (
    <main className="cw-category-page">
      <div className="container">
        <div className="cw-category-head">
          <Link to="/menu" className="cw-category-back">
            ← All categories
          </Link>
          <h1 className="font-serif">{t('best_sellers_title')}</h1>
          <p className="cw-category-tagline">{t('best_sellers_tagline')}</p>
        </div>

        {isLoading && <LoadingState label="Preparing the menu…" />}

        {!isLoading && items.length === 0 && (
          <EmptyState label="No best sellers yet" hint="Check back soon." />
        )}

        {items.length > 0 && (
         <ProductGrid
           products={items}
           originPath="/best-sellers"
           originLabel={t('best_sellers_title')}
         />
       )}

      </div>
    </main>
  );
}

export default BestSellers;