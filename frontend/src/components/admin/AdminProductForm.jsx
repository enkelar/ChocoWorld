import { useEffect, useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
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

function normalizeProduct(initial) {
  return {
    ...EMPTY,
    ...initial,
    name: initial.name ?? '',
    category: initial.category ?? '',
    description: initial.description ?? '',
    ingredients: initial.ingredients ?? '',
    allergens: Array.isArray(initial.allergens)
      ? initial.allergens.join(', ')
      : '',
    image: initial.image ?? '',
    displayOrder: initial.displayOrder ?? 0,
    price: initial.price ?? 0,
    featured: !!initial.featured,
    available: initial.available !== false,
  };
}

export function AdminProductForm({ initial, onSubmit, onCancel, submitting }) {
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } =
    useCategories();

  const [form, setForm] = useState(() =>
    initial ? normalizeProduct(initial) : EMPTY
  );

  // Default to the first available category once categories arrive, if
  // creating a new product and none is selected yet.
  useEffect(() => {
    if (categories?.length) {

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((f) => (f.category ? f : { ...f, category: categories[0].slug }));
    }
  }, [categories]);

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

  const categoryList = categories ?? [];

  return (
    <form className="cw-pform" onSubmit={handleSubmit}>
      <div className="cw-pform-grid">
        <label>
          Name
          <input
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
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
            {!categoriesLoading && categoryList.length === 0 && (
              <option value="">No categories yet</option>
            )}
            {categoryList.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label || c.name}
              </option>
            ))}
          </select>
          {categoriesError && (
            <span className="cw-pform-error">Could not load categories</span>
          )}
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
          <input
            value={form.image}
            onChange={(e) => update('image', e.target.value)}
          />
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
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Saving…' : initial ? 'Save changes' : 'Create product'}
        </button>
      </div>
    </form>
  );
}