import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { Home } from './pages/main/Home';
import { Menu } from './pages/main/Menu';
import { CategoryView } from './pages/main/CategoryView';
import { ItemView } from './pages/main/ItemView';
import { AdminAuth } from './pages/admin/AdminAuth';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import CategoryManager from './pages/admin/CategoryManager';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/category/:slug" element={<CategoryView />} />
          <Route path="/product/:slug" element={<ItemView />} />
          <Route path="/admin/login" element={<AdminAuth />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute>
                <CategoryManager />
              </ProtectedRoute>
            }
          /></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
