import { useLanguage } from '../../context/LanguageContext';
import './ContactSection.css';

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="visit" className="cw-contact">
      <div className="container cw-contact-inner">
        <div className="cw-contact-copy">
          <span className="eyebrow">{t('contact_eyebrow')}</span>
          <h2 className="font-serif cw-contact-title">{t('contact_title')}</h2>
          <div className="cw-contact-list">
            <div className="cw-contact-row">
              <span className="cw-contact-bar" />
              <div>
                <p className="cw-contact-label">{t('contact_label_address1')}</p>
                <p>
                  Prishtina Mall, Food Court
                  <br />
                  10000 Prishtinë, Kosova
                </p>
              </div>
            </div>
            <div className="cw-contact-row">
              <span className="cw-contact-bar" />
              <div>
                <p className="cw-contact-label">{t('contact_label_address2')}</p>
                <p>
                  {t('contact_label_address_name')}
                  <br />
                  10000 Prishtinë, Kosova
                </p>
              </div>
            </div>
            <div className="cw-contact-row">
              <span className="cw-contact-bar" />
              <div>
                <p className="cw-contact-label">{t('contact_label_hours')}</p>
                <p>
                  {t('contact_hours_line1')}
                  <br />
                  {t('contact_hours_line2')}
                </p>
              </div>
            </div>
            <div className="cw-contact-row">
              <span className="cw-contact-bar" />
              <div>
                <p className="cw-contact-label">{t('contact_label_contact')}</p>
                <p>+383 046 656 656</p>
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

        <div className="cw-contact-maps">
          <div className="cw-contact-map">
            <iframe
              title="Choco World Kosova - Prishtina Mall"
              src="https://www.google.com/maps?q=Prishtina+Mall,Kosovo&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="cw-contact-map">
            <iframe
              title="Choco World Kosova - Palace of Youth"
              src="https://www.google.com/maps?q=Palace+of+Youth+and+Sports+Prishtina,Kosovo&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}