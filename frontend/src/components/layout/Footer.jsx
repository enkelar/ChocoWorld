import './Footer.css';

export function Footer() {
  return (
    <footer className="cw-footer">
      <div className="container cw-footer-inner">
        <div>
          <h3 className="font-serif cw-footer-title">Visit the Salon</h3>
          <p className="cw-footer-address">
            Rruga Garibaldi, nr. 12
            <br />
            10000 Prishtinë, Kosova
          </p>
        </div>
        <div className="cw-footer-quote">
          <p className="font-serif italic">
            “Chocolate is a language of its own — a silent conversation between the
            artisan and the indulgence.”
          </p>
          <div className="cw-footer-links">
            <a
              href="https://www.instagram.com/chocoworldkosova/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/chocoworldkosovo/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
