export function LoadingState({ label = 'Loading…' }) {
  return <p className="loading-state">{label}</p>;
}

export function EmptyState({ label, hint }) {
  return (
    <p className="empty-state">
      {label}
      {hint && <span className="hint">{hint}</span>}
    </p>
  );
}
