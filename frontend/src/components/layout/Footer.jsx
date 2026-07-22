import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="cw-footer">
      <div className="container cw-footer-inner">
        <div className="cw-footer-grid">
          <div>
            <h4 className="font-serif cw-footer-title">{t('footer_visit_title')}</h4>
            <p className="cw-footer-address">
              <br></br>
              Prishtina Mall, Food Court
              <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&
              <br/>
              Rruga Garibaldi, nr. 12
              <br />
              10000 Prishtinë, Kosova
            </p>
            <div className="cw-footer-hours">
              <div className="cw-footer-hours-row">
                <span>{t('footer_hours_row1_label')}</span>
                <span className="cw-footer-hours-value">08:30 – 23:00</span>
              </div>
              
            </div>
          </div>

          <div className="cw-footer-side">
            <p className="font-serif italic cw-footer-quote">
              {t('footer_quote')}
            </p>
            <div className="cw-footer-links">
              <a
                href="https://www.tiktok.com/@chocoworldkosova"
                target="_blank"
                rel="noreferrer"
              >
                TikTok
              </a>
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
                {t('nav_admin')}
              </Link>
            </div>
          </div>
        </div>

        <div className="cw-footer-bottom">
          <span>© {new Date().getFullYear()} Choco World Kosova</span>
          <span>{t('footer_crafted')}</span>
        </div>
      </div>
    </footer>
  );
}