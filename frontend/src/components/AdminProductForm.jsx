import { useEffect, useState } from 'react';
import { fetchCategories } from '../lib/categories';
import './AdminProductForm.css';

const EMPTY = {
  name: '',
  category: '',
  price: 0,
  description: '',
  ingredients: '',
  allergens: '',
  image: '',
  displayOrder: 0,
  featured: false,
  available: true,
};

export function AdminProductForm({ initial, onSubmit, onCancel, submitting }) {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState('');

  const [form, setForm] = useState(() =>
    initial
      ? {
          ...EMPTY,
          ...initial,
          allergens: (initial.allergens || []).join(', '),
          displayOrder: initial.displayOrder ?? 0,
        }
      : EMPTY
  );

  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        setCategoriesLoading(true);
        const data = await fetchCategories();
        if (!active) return;
        setCategories(data);

        // Default to the first available category if creating a new
        // product and none is selected yet.
        setForm((f) =>
          f.category ? f : { ...f, category: data[0]?.slug || '' }
        );
      } catch {
        if (active) setCategoriesError('Could not load categories');
      } finally {
        if (active) setCategoriesLoading(false);
      }
    }

    loadCategories();
    return () => {
      active = false;
    };
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      price: parseFloat(form.price) || 0,
      displayOrder: parseInt(form.displayOrder, 10) || 0,
      allergens: form.allergens
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
    });
  }

  return (
    <form className="cw-pform" onSubmit={handleSubmit}>
      <div className="cw-pform-grid">
        <label>
          Name
          <input required value={form.name} onChange={(e) => update('name', e.target.value)} />
        </label>
        <label>
          Category
          <select
            required
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            disabled={categoriesLoading}
          >
            {categoriesLoading && <option value="">Loading categories…</option>}
            {!categoriesLoading && categories.length === 0 && (
              <option value="">No categories yet</option>
            )}
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label || c.name}
              </option>
            ))}
          </select>
          {categoriesError && <span className="cw-pform-error">{categoriesError}</span>}
        </label>
      </div>

      <div className="cw-pform-grid">
        <label>
          Price (€)
          <input
            required
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => update('price', e.target.value)}
          />
        </label>
        <label>
          Image URL
         
          <input value={form.image} onChange={(e) => update('image', e.target.value)} />
        </label>
      </div>

      <label>
        Description
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
        />
      </label>

      <label>
        Ingredients
        <textarea
          rows={2}
          value={form.ingredients}
          onChange={(e) => update('ingredients', e.target.value)}
        />
      </label>

      <label>
        Allergens (comma-separated)
        <input
          value={form.allergens}
          onChange={(e) => update('allergens', e.target.value)}
          placeholder="Gluten, Dairy, Nuts"
        />
      </label>

      <div className="cw-pform-grid">
        <label>
          Display order
          <input
            type="number"
            value={form.displayOrder}
            onChange={(e) => update('displayOrder', e.target.value)}
          />
        </label>
        <div className="cw-pform-toggles">
          <label className="cw-pform-checkbox">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update('featured', e.target.checked)}
            />
            Featured on homepage
          </label>
          <label className="cw-pform-checkbox">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => update('available', e.target.checked)}
            />
            Available
          </label>
        </div>
      </div>

      <div className="cw-pform-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : initial ? 'Save changes' : 'Create product'}
        </button>
      </div>
    </form>
  );
}