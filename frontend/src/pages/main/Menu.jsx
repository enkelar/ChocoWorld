import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BestSellersCard } from '../../components/menu/BestSellersCard';
import { CategoryCard } from '../../components/menu/CategoryCard';
import { LoadingState, EmptyState } from '../../components/shared/States';
import { useMenu } from '../../hooks/useMenu';
import { useLanguage } from '../../context/LanguageContext';
import './Menu.css';

export function Menu() {
  const { data, isLoading } = useMenu();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Memoize categories and products
  const categories = useMemo(() => data?.categories ?? [], [data]);
  const products = useMemo(() => data?.products ?? [], [data]);

  const countByCategory = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    });
    return map;
  }, [products]);

  const bestSellersCount = useMemo(
  () => products.filter((p) => p.bestSeller).length,
  [products]
);

  return (
    <main className="cw-menu-page">
      <div className="container cw-menu-inner">
        <div className="cw-menu-head">
          <span className="eyebrow">{t('menu_eyebrow')}</span>
          <h1 className="font-serif">{t('menu_title')}</h1>
          <p className="cw-menu-sub">{t('menu_sub')}</p>
        </div>

        {isLoading && <LoadingState label={t('loading_menu')}  />}

        <div className="cw-menu-list">
          {bestSellersCount > 0 && (
            <BestSellersCard
              count={bestSellersCount}
              onClick={() => navigate('/best-sellers')}
            />
          )}
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              category={cat}
              count={countByCategory.get(cat.slug) ?? 0}
              onClick={() => navigate(`/category/${cat.slug}`)}
            />
          ))}
        </div>

        {!isLoading && categories.length === 0 && (
          <EmptyState
            label={t('menu_empty_categories')}
            hint={t('menu_empty_categories_hint')}
          />
        )}

        {!isLoading && categories.length > 0 && products.length === 0 && (
          <EmptyState
            label={t('menu_empty_products')}
            hint={t('menu_empty_products_hint')}
          />
        )}
      </div>
    </main>
  );
}

export default Menu;