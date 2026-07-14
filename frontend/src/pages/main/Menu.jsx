import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '../../components/menu/CategoryCard';
import { LoadingState, EmptyState } from '../../components/shared/States';
import { useMenu } from '../../hooks/useMenu';
import './Menu.css';

export function Menu() {
  const { data, isLoading } = useMenu();
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

  return (
    <main className="cw-menu-page">
      <div className="container cw-menu-inner">
        <div className="cw-menu-head">
          <span className="eyebrow">Digital Menu</span>
          <h1 className="font-serif">Choose your indulgence</h1>
          <p className="cw-menu-sub">Tap a category to explore</p>
        </div>

        {isLoading && <LoadingState label="Preparing the menu…" />}

        <div className="cw-menu-list">
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
            label="No categories yet"
            hint="An admin can add categories from the admin dashboard."
          />
        )}

        {!isLoading && categories.length > 0 && products.length === 0 && (
          <EmptyState
            label="The menu is being prepared"
            hint="An admin can add products from the admin dashboard."
          />
        )}
      </div>
    </main>
  );
}

export default Menu;