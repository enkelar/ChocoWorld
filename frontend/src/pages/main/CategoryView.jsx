import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductGrid } from '../../components/menu/ProductGrid';
import { LoadingState, EmptyState } from '../../components/shared/States';
import { useCategories } from '../../hooks/useCategories';
import { useMenuProducts } from '../../hooks/useProducts';
import './CategoryView.css';

export function CategoryView() {
  const { slug } = useParams();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: products, isLoading: productsLoading } = useMenuProducts(slug);

  const category = useMemo(
    () => (categories ?? []).find((c) => c.slug === slug),
    [categories, slug]
  );

  const items = useMemo(() => products ?? [], [products]);

  // Wait for categories to load before deciding the category doesn't exist —
  // otherwise we'd flash "not found" on every page load.
  if (categoriesLoading) {
    return (
      <main className="cw-category-page">
        <div className="container">
          <LoadingState label="Preparing the menu…" />
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="cw-category-page">
        <div className="container">
          <EmptyState label="Category not found" hint="Try browsing the full menu." />
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link to="/menu" className="text-caramel" style={{ textDecoration: 'underline' }}>
              Back to menu
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
            ← All categories
          </Link>
          <h1 className="font-serif">{category.label}</h1>
          <p className="cw-category-tagline">{category.tagline}</p>
        </div>

        {productsLoading && <LoadingState label="Preparing the menu…" />}

        {!productsLoading && items.length === 0 && (
          <EmptyState label="Nothing here yet" hint="Check back soon." />
        )}

        {items.length > 0 && <ProductGrid products={items} />}
      </div>
    </main>
  );
}

export default CategoryView;