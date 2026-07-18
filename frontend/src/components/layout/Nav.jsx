import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from '../shared/LanguageToggle';
import ChocoDrip from '../../assets/ChocoDrip.png'
import ChocoDripMobile from '../../assets/ChocoDripMobile.png'
import logo from '../../assets/ChocoWorldLogo.svg';
import './Nav.css';

export function Nav() {
  const { t } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the dropdown whenever the route changes (e.g. tapping a link)
  useEffect(() => {
    // eslint-disable-next-line
    setMenuOpen(false);
  }, [location.pathname]);

  // Let keyboard users dismiss the dropdown with Escape
  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const linkClass = ({ isActive }) => (isActive ? 'active' : '');
  const showDrip = location.pathname === '/' || location.pathname === '/about';

  return (
    <header className="cw-nav">
      <div className="container cw-nav-inner">
        <Link to="/" className="cw-logo font-serif italic">
          <img src={logo} alt="ChocoWorld logo" className="cw-logo-img" />
          <span>ChocoWorld</span>
        </Link>

        {/* Full link row — visible on wider screens, hidden below the breakpoint */}
        <nav className="cw-nav-links">
          <NavLink to="/" end className={linkClass}>
            {t('nav_home')}
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            {t('nav_about')}
          </NavLink>
          <NavLink to="/menu" className={linkClass}>
            {t('nav_menu')}
          </NavLink>
          <NavLink to="/admin" className="cw-admin-link">
            {t('nav_admin')}
          </NavLink>
          <LanguageToggle />
        </nav>

        {/* Hamburger — only visible below the breakpoint */}
        <button
          type="button"
          className={`cw-nav-burger${menuOpen ? ' is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="cw-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Dropdown panel — always in the DOM so the height/opacity transition can run;
          collapses to zero height via CSS when closed. */}
      <nav id="cw-mobile-menu" className={`cw-nav-mobile${menuOpen ? ' is-open' : ''}`}>
        <div className="cw-nav-mobile-inner">
          <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>
            {t('nav_home')}
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>
            {t('nav_about')}
          </NavLink>
          <NavLink to="/menu" className={linkClass} onClick={() => setMenuOpen(false)}>
            {t('nav_menu')}
          </NavLink>
          <NavLink to="/admin" className={linkClass} onClick={() => setMenuOpen(false)}>
            {t('nav_admin')}
          </NavLink>
          <div className="cw-nav-mobile-lang">
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {showDrip && (
        <div className="drip">
          <img src={ChocoDrip} alt="" className="drip-desktop" />
          <img src={ChocoDripMobile} alt="" className="drip-mobile" />
        </div>
      )}
    </header>
  );
}