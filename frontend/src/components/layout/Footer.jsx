import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
  return (
    <footer className="cw-footer">
      <div className="container cw-footer-inner">
        <div className="cw-footer-grid">
          <div>
            <h4 className="font-serif cw-footer-title">Visit the Salon</h4>
            <p className="cw-footer-address">
              Rruga Garibaldi, nr. 12
              <br />
              10000 Prishtinë, Kosova
            </p>
            <div className="cw-footer-hours">
              <div className="cw-footer-hours-row">
                <span>Mon — Sun</span>
                <span className="cw-footer-hours-value">09:00 – 23:00</span>
              </div>
              <div className="cw-footer-hours-row">
                <span>Sat — Sun</span>
                <span className="cw-footer-hours-value">09:00 – 23:00</span>
              </div>
            </div>
          </div>

          <div className="cw-footer-side">
            <p className="font-serif italic cw-footer-quote">
              "Chocolate is a language of its own — a silent conversation between the
              artisan and the indulgence."
            </p>
            <div className="cw-footer-links">
              <a
                href="https://www.instagram.com/chocoworldkosova/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/chocoworldkosovo/"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <Link to="/admin" className="cw-footer-admin-link">
                Admin
              </Link>
            </div>
          </div>
        </div>

        <div className="cw-footer-bottom">
          <span>© {new Date().getFullYear()} Choco World Kosova</span>
          <span>Crafted with passion in Prishtinë</span>
        </div>
      </div>
    </footer>
  );
}