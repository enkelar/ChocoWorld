import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMenuProductsPaged } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { AdminProductForm } from '../../components/admin/AdminProductForm';
import { LoadingState } from '../../components/shared/States';
import { api } from '../../lib/api';
import { runMutation } from '../../lib/fetchCache';
import { AdminModal } from '../../components/admin/AdminModal';
import './AdminDashboard.css';

export function AdminDashboard() {
  const { logout } = useAuth();
  const [page, setPage] = useState(1);
  const [filterCat, setFilterCat] = useState('all');
  const [search, setSearch] = useState('');

  const { data, isLoading, isRefetching, refetch } = useMenuProductsPaged({
    category: filterCat === 'all' ? undefined : filterCat,
    page,
    limit: 20,
  });
  const products = data?.products;

  const { data: categories } = useCategories();
  const [editing, setEditing] = useState(null); // null | 'new' | product
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const filtered = useMemo(() => {
    return (products ?? []).filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [products, search]);

  function handleCategoryChange(e) {
    setFilterCat(e.target.value);
    setPage(1);
  }

  async function handleSubmit(values) {
    setSubmitting(true);
    setError('');
    try {
      if (editing && editing !== 'new') {
        await runMutation(() => api.put(`/products/${editing._id}`, values), ['/products', '/menu']);
      } else {
        await runMutation(() => api.post('/products', values), ['/products', '/menu']);
      }
      setEditing(null);
      refetch();
    } catch (err) {
      setError(err.message || 'Could not save product');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await runMutation(() => api.delete(`/products/${product._id}`), ['/products', '/menu']);
      refetch();
    } catch (err) {
      setError(err.message || 'Could not delete product');
    }
  }

  return (
    <main className="cw-dashboard">
      <div className="container">
        <div className="cw-dashboard-head">
          <div>
            <span className="eyebrow">Admin</span>
            <h1 className="font-serif">Menu management</h1>
          </div>
          <div className="cw-dashboard-actions">
            <Link to="/admin/categories" className="btn btn-outline">
              Categories
            </Link>
            <Link to="/menu" className="btn btn-outline">
              View menu
            </Link>
            <button className="btn btn-outline" onClick={logout}>
              Sign out
            </button>
            <button className="btn btn-primary" onClick={() => setEditing('new')}>
              + New product
            </button>
          </div>
        </div>

        <div className="cw-dashboard-filters">
          <input
            className="cw-dashboard-search"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="cw-dashboard-select"
            value={filterCat}
            onChange={handleCategoryChange}
          >
            <option value="all">All categories</option>
            {(categories ?? []).map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="cw-dashboard-error">{error}</p>}

        {isLoading ? (
          <LoadingState label="Loading products…" />
        ) : (
          <div className="cw-dashboard-table-wrap">
            {isRefetching && (
              <div className="cw-dashboard-refresh-hint">Updating…</div>
            )}
            <table className="cw-dashboard-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th className="cw-right cw-dash-hide-mobile">Price</th>
                  <th className="cw-center cw-dash-hide-mobile">Featured</th>
                  <th className="cw-center cw-dash-hide-mobile">Best Seller</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div className="cw-dashboard-product">
                        {p.image ? (
                          <img src={p.image} alt="" />
                        ) : (
                          <div className="cw-dashboard-thumb-empty" />
                        )}
                        <div>
                          <div className="cw-dashboard-name">{p.name}</div>
                          <div className="cw-dashboard-slug">{p.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="cw-dashboard-cat">{p.category}</td>
                    <td className="cw-right font-serif cw-dash-hide-mobile">€{p.price.toFixed(2)}</td>
                    <td className="cw-center cw-dash-hide-mobile">
                      {p.featured ? '✔' : <span className="cw-danger-text">—</span>}
                    </td>
                    <td className="cw-center cw-dash-hide-mobile">
                      {p.bestSeller ? '★' : <span className="cw-danger-text">—</span>}
                    </td>
                    <td>
                      <div className="cw-dashboard-row-actions">
                        <button className="cw-pill-btn" onClick={() => setEditing(p)}>
                          Edit
                        </button>
                        <button
                          className="cw-pill-btn cw-pill-danger"
                          onClick={() => handleDelete(p)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="cw-dashboard-empty-row">
                      No products match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {data?.totalPages > 1 && (
              <div className="cw-dashboard-pager">
                <button
                  className="btn btn-outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Previous
                </button>
                <span>
                  Page {data.page} of {data.totalPages}
                </span>
                <button
                  className="btn btn-outline"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {editing && (
        <AdminModal
          title={editing === 'new' ? 'New product' : `Edit · ${editing.name}`}
          onClose={() => setEditing(null)}
        >
          <AdminProductForm
            initial={editing === 'new' ? null : editing}
            submitting={submitting}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
          />
        </AdminModal>
      )}
    </main>
  );
}

export default AdminDashboard;