import { useState } from 'react';
import { runMutation } from '../lib/fetchCache';

export function useAdminCrud({ createFn, updateFn, deleteFn, invalidateKeys, refetch, labelOf }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(editing, values) {
    setSubmitting(true);
    setError('');
    try {
      if (editing && editing !== 'new') {
        await runMutation(() => updateFn(editing._id ?? editing.id, values), invalidateKeys);
      } else {
        await runMutation(() => createFn(values), invalidateKeys);
      }
      refetch();
      return true;
    } catch (err) {
      setError(err.message || 'Could not save');
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(item) {
    const name = labelOf ? labelOf(item) : item.name || item.label;
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await runMutation(() => deleteFn(item._id ?? item.id), invalidateKeys);
      refetch();
    } catch (err) {
      setError(err.message || 'Could not delete');
    }
  }

  return { submitting, error, handleSubmit, handleDelete };
}