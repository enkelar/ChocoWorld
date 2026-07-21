import { useFormState } from "../../hooks/useFormState";

const EMPTY = { 
  label: "", 
  labelSq: "", 
  slug: "", 
  tagline: "", 
  taglineSq: "", 
  displayOrder: 0 
};

export function CategoryForm({ initial, onSubmit, onCancel, submitting }) {
  
  const [form, update] = useFormState(EMPTY, initial);
  
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
          Name (English)
          <input
            required
            value={form.label}
            onChange={(e) => update("label", e.target.value)}
          />
        </label>
        <label>
          Name (Albanian)
          <input
            value={form.labelSq}
            onChange={(e) => update("labelSq", e.target.value)}
            placeholder="Emri në shqip"
          />
        </label>
      </div>

      <div className="cw-pform-grid">
        <label>
          Slug
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="auto if left blank"
          />
        </label>
        <label>
          Display order
          <input
            type="number"
            value={form.displayOrder}
            onChange={(e) => update("displayOrder", e.target.value)}
          />
        </label>
      </div>

      <div className="cw-pform-grid">
        <label>
          Tagline (English)
          <input
            value={form.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            placeholder="Short line shown under the category title"
          />
        </label>
        <label>
          Tagline (Albanian)
          <input
            value={form.taglineSq}
            onChange={(e) => update("taglineSq", e.target.value)}
            placeholder="Nëntitulli në shqip"
          />
        </label>
      </div>

      <div className="cw-pform-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting
            ? "Saving…"
            : initial
              ? "Save changes"
              : "Create category"}
        </button>
      </div>
    </form>
  );
}
