import { Link } from 'react-router-dom';
import heroImg from '../../assets/ChocoHero.png';
import './HeroSection.css';

export function HeroSection() {
  return (
    <section className="cw-hero">
      <div className="container cw-hero-inner">
        <div className="cw-hero-copy">
          <span className="eyebrow">Prishtinë, Kosova</span>
          <h1 className="font-serif cw-hero-title">
            The Art of <span className="italic">Molten</span> Indulgence
          </h1>
          <p className="cw-hero-text">
            Handcrafted Turkish chocolate meets artisan pastry craft in the heart of
            the city. Waffles, pancakes, crêpes and gelato — textures of silk and
            gold.
          </p>
          <div className="cw-hero-actions">
            <Link to="/menu" className="btn btn-primary">
              Open Digital Menu <span aria-hidden>→</span>
            </Link>
            <a href="#visit" className="btn btn-outline">
              Visit the Salon
            </a>
          </div>
        </div>
        <div className="cw-hero-image">
          <img
            src={heroImg}
            alt="Molten dark chocolate pouring over a golden Belgian waffle"
          />
        </div>
      </div>
    </section>
  );
}
