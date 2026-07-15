import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from '../shared/LanguageToggle';
import './Nav.css';

export function Nav() {
  const { t } = useLanguage();

  return (
    <header className="cw-nav">
      <div className="container cw-nav-inner">
        <Link to="/" className="cw-logo font-serif italic">
          ChocoWorld
        </Link>
        <nav className="cw-nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('nav_home')}
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('nav_menu')}
          </NavLink>
          <NavLink to="/admin" className="cw-admin-link">
            {t('nav_admin')}
          </NavLink>
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
