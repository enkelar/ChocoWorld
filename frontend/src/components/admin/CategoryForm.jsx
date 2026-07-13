import { useState } from 'react';

const EMPTY = { label: '', slug: '', tagline: '', description: '', displayOrder: 0 };

export function CategoryForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(() => (initial ? { ...EMPTY, ...initial } : EMPTY));

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      displayOrder: parseInt(form.displayOrder, 10) || 0,
    });
  }

  return (
    <form className="cw-pform" onSubmit={handleSubmit}>
      <div className="cw-pform-grid">
        <label>
          Name
          <input
            required
            value={form.label}
            onChange={(e) => update('label', e.target.value)}
          />
        </label>
        <label>
          Slug
          <input
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
            placeholder="auto if left blank"
          />
        </label>
      </div>

      <label>
        Tagline
        <input
          value={form.tagline}
          onChange={(e) => update('tagline', e.target.value)}
          placeholder="Short line shown under the category title"
        />
      </label>

      <label>
        Description
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
        />
      </label>

      <label>
        Display order
        <input
          type="number"
          value={form.displayOrder}
          onChange={(e) => update('displayOrder', e.target.value)}
        />
      </label>

      <div className="cw-pform-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : initial ? 'Save changes' : 'Create category'}
        </button>
      </div>
    </form>
  );
}