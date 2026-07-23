import { useLanguage } from '../../context/LanguageContext';
import AboutHero from '../../assets/AboutHero.webp';
import './About.css';

export function About() {

  const { t } = useLanguage();

  return (
    <main className="cw-about-page">
      {/* Hero */}
      <section className="cw-about-hero">
        <div className="container cw-about-hero-inner">
          <div className="cw-about-hero-copy">
            <span className="eyebrow">{t('about_hero_eyebrow')}</span>
            <h1 className="font-serif cw-about-hero-title">
              {t('about_hero_title')}            
            </h1>
            <p className="cw-about-hero-text">
              {t('about_hero_text')}
            </p>
          </div>
          <div className="cw-about-hero-media">
            <img
              src= {AboutHero}
              alt="Artisan dark chocolate pieces and cocoa beans arranged on marble"
              width={1200}
              height={800}
              loading="lazy"
            />
            <div className="cw-about-hero-quote">
              <p className="font-serif italic">{t('about_hero_quote')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Beginning */}
      <section className="cw-about-beginning">
        <div className="container cw-about-beginning-inner">
          <span className="eyebrow cw-about-beginning-eyebrow">{t('about_beginning_eyebrow')}</span>
          <h2 className="font-serif cw-about-beginning-title">
            {t('about_beginning_title')}
          </h2>
          <div className="cw-about-beginning-text">
            <p>
              {t('about_beginning_text1')}
            </p>
            <p>
              {t('about_beginning_text2')}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy / Pillars */}
      <section className="cw-about-pillars">
        <div className="container">
          <div className="cw-about-pillars-head">
            <span className="eyebrow">{t('about_pillars_eyebrow')}</span>
            <h2 className="font-serif">{t('about_pillars_title')}</h2>
          </div>

          <div className="cw-about-pillars-grid">
            <div className="cw-about-pillar">
              <span className="cw-about-pillar-icon" aria-hidden>🍫</span>
              <h3 className="font-serif">{t('about_pillar1')}</h3>
              {/* <p>
                We use real chocolate and cocoa from trusted producers. No shortcuts —
                just honest, premium chocolate with a rich, clean taste.
              </p> */}
            </div>
            <div className="cw-about-pillar">
              <span className="cw-about-pillar-icon" aria-hidden>🥞</span>
              <h3 className="font-serif">{t('about_pillar2')}</h3>
              {/* <p>
                Every waffle is pressed when you order it. Every crêpe is folded by hand.
                Fresh isn't a promise here — it's just how we work.
              </p> */}
            </div>
            <div className="cw-about-pillar">
              <span className="cw-about-pillar-icon" aria-hidden>☕</span>
              <h3 className="font-serif">{t('about_pillar3')}</h3>
              {/* <p>
                We believe dessert should be enjoyed slowly. Our salon is a warm, modern space
                made for lingering — slow sips, shared plates, and good company.
              </p> */}
            </div>
          </div>
        </div>
      </section>

      <section className="cw-about-cta">
        <div className="container cw-about-cta-inner">
          <span className="eyebrow">{t('about_contact_eyebrow')}</span>
          <h2 className="font-serif">{t('about_contact_title')}</h2>
          <p>
            {t('about_contact_text')}
          </p>
          <a
            href="https://www.google.com/maps/place/Youth+and+Sports+Center/@42.661219,21.1568458,18.48z/data=!4m15!1m8!3m7!1s0x13549ee4f18ba3fb:0x189f57f3727e8636!2sYouth+and+Sports+Center!8m2!3d42.6610999!4d21.1567011!10e1!16s%2Fm%2F0130sdbs!3m5!1s0x13549ee4f18ba3fb:0x189f57f3727e8636!8m2!3d42.6610999!4d21.1567011!16s%2Fm%2F0130sdbs?entry=ttu&g_ep=EgoyMDI2MDcyMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            {t('about_contact_button')} <span aria-hidden>→</span>
          </a>
          <div className="cw-about-cta-meta">
            <p>{t('about_location')}</p>
            <p>{t('contact_label_address_name2')}</p>
            <p>{t('contact_hours_line1')} </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;