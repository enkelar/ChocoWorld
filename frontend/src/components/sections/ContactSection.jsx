import './ContactSection.css';

export function ContactSection() {
  return (
    <section id="visit" className="cw-contact">
      <div className="container cw-contact-inner">
        <div className="cw-contact-copy">
          <span className="eyebrow">Visit Us</span>
          <h2 className="font-serif cw-contact-title">Come spend an afternoon.</h2>
          <div className="cw-contact-list">
            <div className="cw-contact-row">
              <span className="cw-contact-bar" />
              <div>
                <p className="cw-contact-label">Address</p>
                <p>
                  Rruga Garibaldi, nr. 12
                  <br />
                  10000 Prishtinë, Kosova
                </p>
              </div>
            </div>
            <div className="cw-contact-row">
              <span className="cw-contact-bar" />
              <div>
                <p className="cw-contact-label">Hours</p>
                <p>
                  Mon – Fri · 08:00 – 22:00
                  <br />
                  Sat – Sun · 09:00 – 23:00
                </p>
              </div>
            </div>
            <div className="cw-contact-row">
              <span className="cw-contact-bar" />
              <div>
                <p className="cw-contact-label">Get in touch</p>
                <p>+383 — — — — —</p>
                <div className="cw-contact-social">
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
          </div>
        </div>
        <div className="cw-contact-map">
          <iframe
            title="Choco World Kosova map"
            src="https://www.google.com/maps?q=Prishtina,Kosovo&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
