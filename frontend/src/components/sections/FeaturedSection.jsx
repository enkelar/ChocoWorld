import { Link } from 'react-router-dom';
import placeholderWaffle from '../../assets/placeholder-waffle.svg';
import './FeaturedSection.css';

export function FeaturedSection({ products = [] }) {
  return (
    <section className="cw-featured">
      <div className="container">
        <div className="cw-featured-head">
          <h2 className="font-serif">Signature Series</h2>
          <Link to="/menu" className="text-gold cw-featured-link">
            See full menu →
          </Link>
        </div>
        <div className="cw-featured-grid">
          {products.map((p) => (
            <Link key={p._id} to={`/product/${p.slug}`} className="cw-featured-card">
              <div className="cw-featured-img">
                <img src={p.image || placeholderWaffle} alt={p.name} loading="lazy" />
              </div>
              <div className="cw-featured-info">
                <h3 className="font-serif">{p.name}</h3>
                <span className="text-gold font-serif italic">
                  €{p.price.toFixed(2)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
