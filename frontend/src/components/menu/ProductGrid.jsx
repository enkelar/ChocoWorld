import { ProductCard } from './ProductCard';
import './ProductGrid.css';

export function ProductGrid({ products, originPath, originLabel }) {
  return (
    <div className="cw-product-grid">
      {products.map((p, i) => (
        <ProductCard
         key={p._id}
         product={p}
         index={i}
         originPath={originPath}
         originLabel={originLabel}
       />
      ))}
    </div>
  );
}
