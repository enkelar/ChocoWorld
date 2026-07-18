import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { Home } from './pages/main/Home';
import { About } from './pages/main/About';
import { Menu } from './pages/main/Menu';
import { BestSellers } from './pages/main/BestSellers';
import { CategoryView } from './pages/main/CategoryView';
import { ItemView } from './pages/main/ItemView';
import { LoadingState } from './components/shared/States';
import { NotFound } from './pages/main/NotFound';

const AdminAuth = lazy(() => import('./pages/admin/AdminAuth'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryManager = lazy(() => import('./pages/admin/CategoryManager'));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/category/:slug" element={<CategoryView />} />
        <Route path="/best-sellers" element={<BestSellers />} />
        <Route path="/product/:slug" element={<ItemView />} />
        <Route path="/admin/login" element={<Suspense fallback={<LoadingState label="Loading…" />}><AdminAuth /></Suspense>}/>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingState label="Loading…" />}>
              <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingState label="Loading…" />}>
                <CategoryManager />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;