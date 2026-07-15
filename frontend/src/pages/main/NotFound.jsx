import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="cw-category-page">
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="eyebrow">404</span>
        <h1 className="font-serif">Page not found</h1>
        <p className="cw-category-tagline" style={{ marginBottom: 24 }}>
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;