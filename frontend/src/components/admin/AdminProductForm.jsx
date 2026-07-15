import { useEffect, useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { api } from '../../lib/api';
import './AdminProductForm.css';

const EMPTY = {
  name: '',
  nameSq: '',
  category: '',
  price: 0,
  description: '',
  descriptionSq: '',
  ingredients: '',
  ingredientsSq: '',
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
    nameSq: initial.nameSq ?? '',
    category: initial.category ?? '',
    description: initial.description ?? '',
    descriptionSq: initial.descriptionSq ?? '',
    ingredients: initial.ingredients ?? '',
    ingredientsSq: initial.ingredientsSq ?? '',
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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (categories?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((f) => (f.category ? f : { ...f, category: categories[0].slug }));
    }
  }, [categories]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploading(true);
    try {
      // 1) Get presigned upload URL from your server
      const { uploadURL, publicUrl } = await api.post('/uploads/image-url', {
        contentType: file.type,
      });

      // 2) Upload file directly to R2 using the presigned URL
      const putRes = await fetch(uploadURL, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!putRes.ok) {
        throw new Error('Image upload to storage failed.');
      }

      // 3) Use the public URL in the form
      update('image', publicUrl);
    } catch (err) {
      setUploadError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = ''; // allow re-selecting the same file later
    }
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
          Name (English)
          <input
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </label>
        <label>
          Name (Albanian)
          <input
            value={form.nameSq}
            onChange={(e) => update('nameSq', e.target.value)}
            placeholder="Emri në shqip"
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
      </div>

      <div className="cw-pform-grid">
        <label>
          Image URL
          <input
            value={form.image}
            onChange={(e) => update('image', e.target.value)}
            placeholder="Paste a URL, or upload a photo below"
          />
        </label>
        <div className="cw-pform-upload">
          {form.image && (
            <div className="cw-pform-preview">
              <img src={form.image} alt="Product preview" />
            </div>
          )}
          <label className="cw-pform-upload-btn">
            {uploading ? 'Uploading…' : 'Upload photo from device'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              disabled={uploading}
              hidden
            />
          </label>
          {uploadError && <span className="cw-pform-error">{uploadError}</span>}
        </div>
      </div>

      <label>
        Description (English)
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
        />
      </label>
      <label>
        Description (Albanian)
        <textarea
          rows={3}
          value={form.descriptionSq}
          onChange={(e) => update('descriptionSq', e.target.value)}
          placeholder="Përshkrimi në shqip"
        />
      </label>

      <label>
        Ingredients (English)
        <textarea
          rows={2}
          value={form.ingredients}
          onChange={(e) => update('ingredients', e.target.value)}
        />
      </label>
      <label>
        Ingredients (Albanian)
        <textarea
          rows={2}
          value={form.ingredientsSq}
          onChange={(e) => update('ingredientsSq', e.target.value)}
          placeholder="Përbërësit në shqip"
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
          disabled={submitting || uploading}
        >
          {submitting ? 'Saving…' : initial ? 'Save changes' : 'Create product'}
        </button>
      </div>
    </form>
  );
}