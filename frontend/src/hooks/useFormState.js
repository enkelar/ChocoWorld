import { useState } from 'react';

export function useFormState(defaults, initial) {
  const [form, setForm] = useState(() => ({ ...defaults, ...(initial || {}) }));

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  return [form, update, setForm];
}