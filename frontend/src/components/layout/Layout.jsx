import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';

export const Layout = memo(() => {
  return (
    <div className="app-shell">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
});