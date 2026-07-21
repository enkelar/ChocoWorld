import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createCategory, updateCategory, deleteCategory } from '../../lib/categories';
import { useCategories } from '../../hooks/useCategories';
import { useAdminCrud } from '../../hooks/useAdminCrud';import { CategoryForm } from '../../components/admin/CategoryForm';
import { LoadingState } from '../../components/shared/States';
import { AdminModal } from '../../components/admin/AdminModal';
import '../../pages/admin/AdminDashboard.css';
import '../../components/admin/AdminProductForm.css';

export default function CategoryManager() {
  const { data: categories, isLoading, isRefetching, refetch } = useCategories();
  const [editing, setEditing] = useState(null); // null | 'new' | category
  const [search, setSearch] = useState('');
  const { submitting, error, handleSubmit: submit, handleDelete } = useAdminCrud({
    createFn: createCategory,
    updateFn: updateCategory,
    deleteFn: deleteCategory,
    invalidateKeys: ['/categories', '/menu'],
    refetch,
    labelOf: (cat) => cat.label,
  });

  const filtered = useMemo(() => {
    return (categories ?? []).filter((c) =>
      c.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  async function handleSubmit(values) {
    const ok = await submit(editing, values);
    if (ok) setEditing(null);
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
       <AdminModal
         title={editing === 'new' ? 'New category' : `Edit · ${editing.label}`}
         onClose={() => setEditing(null)}
       >
         <CategoryForm
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