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
                  {t('contact_label_address_name2')}
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
                   href="https://www.tiktok.com/@chocoworldkosova"
                   target="_blank"
                   rel="noreferrer"
                   aria-label="TikTok"
                   className="cw-social-icon"
                 >
                   <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                     <path d="M16.6 5.82c-.63-.7-1.02-1.6-1.1-2.57h-2.98v13.3c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1-2.72-2.72 2.72 2.72 0 0 1 2.72-2.72c.25 0 .49.03.72.1v-3.02c-.24-.03-.48-.05-.72-.05-3.03 0-5.49 2.46-5.49 5.49 0 3.03 2.46 5.49 5.49 5.49 3.03 0 5.49-2.46 5.49-5.49V9.5a7.5 7.5 0 0 0 4.24 1.3V7.82c-1-.03-1.93-.37-2.7-1.01a5.3 5.3 0 0 1-.23-.99z"/>
                   </svg>
                 </a>

                 <a
                   href="https://www.instagram.com/chocoworldkosova/"
                   target="_blank"
                   rel="noreferrer"
                   aria-label="Instagram"
                   className="cw-social-icon"
                 >
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                     <rect x="3.5" y="3.5" width="17" height="17" rx="5"/>
                     <circle cx="12" cy="12" r="4.2"/>
                     <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none"/>
                   </svg>
                 </a>

                 <a
                   href="https://www.facebook.com/chocoworldkosovo/"
                   target="_blank"
                   rel="noreferrer"
                   aria-label="Facebook"
                   className="cw-social-icon"
                 >
                   <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                     <path d="M14.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A20.9 20.9 0 0 0 15.3 4.3c-2.25 0-3.79 1.37-3.79 3.89v2.25H9v2.96h2.5V21z"/>
                   </svg>
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