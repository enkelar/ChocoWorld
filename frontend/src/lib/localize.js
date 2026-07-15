export function localize(obj, field, lang) {
  if (!obj) return '';
  if (lang === 'sq') {
    const sqVal = obj[`${field}Sq`];
    if (sqVal) return sqVal;
  }
  return obj[field] ?? '';
}