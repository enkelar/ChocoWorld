export function AdminModal({ title, onClose, children }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="cw-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cw-modal">
        <div className="cw-modal-head">
          <h2 className="font-serif">{title}</h2>
          <button className="cw-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}