import './BestSellersCard.css';

export function BestSellersCard({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="cw-best-card">
      <div className="cw-best-info">
        <span className="cw-best-eyebrow">★ Most loved</span>
        <span className="font-serif cw-best-label">Best Sellers</span>
        <span className="cw-best-tagline">The flavors everyone keeps coming back for</span>
      </div>
      <div className="cw-best-right">
        <div className="cw-best-plus" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
    </button>
  );
}