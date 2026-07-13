import { Link, NavLink } from 'react-router-dom';
import './Nav.css';

export function Nav() {
  return (
    <header className="cw-nav">
      <div className="container cw-nav-inner">
        <Link to="/" className="cw-logo font-serif italic">
          ChocoWorld
        </Link>
        <nav className="cw-nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? 'active' : '')}>
            Menu
          </NavLink>
          <NavLink to="/admin" className="cw-admin-link">
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
