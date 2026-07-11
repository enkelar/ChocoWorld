import { useEffect, useState } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../lib/categories';
import './CategoryManager.css';

const EMPTY = { label: '', slug: '', tagline: '', displayOrder: 0 };

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function loadCategories() {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCategories();
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function resetForm() {
    setForm(EMPTY);
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const payload = { ...form, displayOrder: parseInt(form.displayOrder, 10) || 0 };
      if (editingId) {
        await updateCategory(editingId, payload);
      } else {
        await createCategory(payload);
      }
      resetForm();
      loadCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(category) {
    setForm({
      label: category.label,
      slug: category.slug,
      tagline: category.tagline || '',
      displayOrder: category.displayOrder ?? 0,
    });
    setEditingId(category._id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this category? Products using it must be reassigned first.')) return;
    setError('');
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="cw-catmgr">
      <h2>Manage Categories</h2>

      {error && <p className="cw-catmgr-error">{error}</p>}

      <form className="cw-catmgr-form" onSubmit={handleSubmit}>
        <input
          required
          placeholder="Label (e.g. Waffles)"
          value={form.label}
          onChange={(e) => update('label', e.target.value)}
        />
        <input
          placeholder="Slug (auto if left blank)"
          value={form.slug}
          onChange={(e) => update('slug', e.target.value)}
        />
        <input
          placeholder="Tagline"
          value={form.tagline}
          onChange={(e) => update('tagline', e.target.value)}
        />
        <input
          type="number"
          placeholder="Display order"
          value={form.displayOrder}
          onChange={(e) => update('displayOrder', e.target.value)}
        />
        <div className="cw-catmgr-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving…' : editingId ? 'Save changes' : 'Add category'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-outline" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading categories…</p>
      ) : (
        <table className="cw-catmgr-table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Slug</th>
              <th>Tagline</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.label}</td>
                <td>{cat.slug}</td>
                <td>{cat.tagline}</td>
                <td>{cat.displayOrder}</td>
                <td>
                  <button className="btn btn-outline" onClick={() => handleEdit(cat)}>
                    Edit
                  </button>
                  <button className="btn btn-outline" onClick={() => handleDelete(cat._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}