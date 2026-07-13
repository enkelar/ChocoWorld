import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../lib/categories';
import { useCategories } from '../../hooks/useCategories';
import { invalidate } from '../../lib/fetchCache';
import { CategoryForm } from '../../components/admin/CategoryForm';
import { LoadingState } from '../../components/shared/States';
import '../../pages/admin/AdminDashboard.css';
import '../../components/admin/AdminProductForm.css';

export default function CategoryManager() {
  const { data: categories, isLoading, isRefetching, refetch } = useCategories();
  const [editing, setEditing] = useState(null); // null | 'new' | category
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const filtered = useMemo(() => {
    return (categories ?? []).filter((c) =>
      c.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  async function reload() {
    invalidate('/categories');
    await fetchCategories();
    refetch();
  }

  async function handleSubmit(values) {
    setSubmitting(true);
    setError('');
    try {
      if (editing && editing !== 'new') {
        await updateCategory(editing._id, values);
      } else {
        await createCategory(values);
      }
      setEditing(null);
      await reload();
    } catch (err) {
      setError(err.message || 'Could not save category');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(cat) {
    if (!window.confirm(`Delete "${cat.label}"? Products using it must be reassigned first.`)) return;
    try {
      await deleteCategory(cat._id);
      await reload();
    } catch (err) {
      setError(err.message || 'Could not delete category');
    }
  }

  return (
    <main className="cw-dashboard">
      <div className="container">
        <div className="cw-dashboard-head">
          <div>
            <span className="eyebrow">Admin</span>
            <h1 className="font-serif">Categories</h1>
          </div>
          <div className="cw-dashboard-actions">
            <Link to="/admin" className="btn btn-outline">
              Products
            </Link>
            <Link to="/menu" className="btn btn-outline">
              View menu
            </Link>
            <button className="btn btn-primary" onClick={() => setEditing('new')}>
              + New category
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
        </div>

        {error && <p className="cw-dashboard-error">{error}</p>}

        {isLoading ? (
          <LoadingState label="Loading categories…" />
        ) : (
          <div className="cw-dashboard-table-wrap">
            {isRefetching && (
              <div className="cw-dashboard-refresh-hint">Updating…</div>
            )}
            <table className="cw-dashboard-table cw-catmgr-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th className="cw-catmgr-hide-mobile">Tagline</th>
                  <th className="cw-center cw-catmgr-hide-mobile">Order</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((cat) => (
                  <tr key={cat._id}>
                    <td className="cw-dashboard-name">{cat.label}</td>
                    <td className="cw-catmgr-hide-mobile">{cat.tagline}</td>
                    <td className="cw-center cw-catmgr-hide-mobile">{cat.displayOrder}</td>
                    <td>
                      <div className="cw-dashboard-row-actions">
                        <button className="cw-pill-btn" onClick={() => setEditing(cat)}>
                          Edit
                        </button>
                        <button
                          className="cw-pill-btn cw-pill-danger"
                          onClick={() => handleDelete(cat)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="cw-dashboard-empty-row">
                      No categories match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div
          role="dialog"
          aria-modal="true"
          className="cw-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditing(null);
          }}
        >
          <div className="cw-modal">
            <div className="cw-modal-head">
              <h2 className="font-serif">
                {editing === 'new' ? 'New category' : `Edit · ${editing.label}`}
              </h2>
              <button
                className="cw-modal-close"
                onClick={() => setEditing(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <CategoryForm
              initial={editing === 'new' ? null : editing}
              submitting={submitting}
              onSubmit={handleSubmit}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </main>
  );
}