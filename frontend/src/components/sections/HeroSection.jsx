import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import heroImg from '../../assets/ChocoHero.webp';
import './HeroSection.css';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="cw-hero">
      <div className="container cw-hero-inner">
        <div className="cw-hero-copy">
          <span className="eyebrow">{t('hero_eyebrow')}</span>
          <h1 className="font-serif cw-hero-title">{t('hero_title')}</h1>
          <p className="cw-hero-text">{t('hero_text')} </p>
          <div className="cw-hero-actions">
            <Link to="/menu" className="btn btn-primary">
              {t('hero_cta_menu')} <span aria-hidden>→</span>
            </Link>
            <a href="#visit" className="btn btn-outline">
              {t('hero_cta_visit')}
            </a>
          </div>
        </div>
        <div className="cw-hero-image">
          <img
            src={heroImg}
            alt="ChocoWorld ambiance"
            width="960"
            height="640"
            fetchpriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
