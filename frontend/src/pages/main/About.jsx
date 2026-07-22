import AboutHero from '../../assets/AboutHero.webp';
import './About.css';

export function About() {
  return (
    <main className="cw-about-page">
      {/* Hero */}
      <section className="cw-about-hero">
        <div className="container cw-about-hero-inner">
          <div className="cw-about-hero-copy">
            <span className="eyebrow">Our Story</span>
            <h1 className="font-serif cw-about-hero-title">
              At <span className="italic">ChocoWorld</span>, freshness is at the heart of everything we do.
            </h1>
            <p className="cw-about-hero-text">
              From fresh fruit to handcrafted desserts, crêpes, pancakes, brownies, and our own
              handmade gelato — we bring you premium chocolate treats that taste as delicious as
              they look. Every dessert is made with quality, warmth, and a little modern flair,
              because every bite should be memorable.
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
              <p className="font-serif italic">"Cocoa is our language."</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Beginning */}
      <section className="cw-about-beginning">
        <div className="container cw-about-beginning-inner">
          <span className="eyebrow cw-about-beginning-eyebrow">The Beginning</span>
          <h2 className="font-serif cw-about-beginning-title">
            <span className="italic">Freshness</span> Freshness is where our story begins.
          </h2>
          <div className="cw-about-beginning-text">
            <p>
              At ChocoWorld, we believe desserts are more than just something sweet, 
              they’re an experience. Every crêpe, waffle, brownie, fresh fruit creation, 
              and scoop of our handmade gelato is crafted with premium ingredients and prepared fresh to order.
            </p>
            <p>
              Combined with warm hospitality and genuine service, our goal is simple: 
              to create a place where every visit feels special and every dessert leaves a lasting impression.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy / Pillars */}
      <section className="cw-about-pillars">
        <div className="container">
          <div className="cw-about-pillars-head">
            <span className="eyebrow">Our Philosophy</span>
            <h2 className="font-serif">Made slowly. Served warmly.</h2>
          </div>

          <div className="cw-about-pillars-grid">
            <div className="cw-about-pillar">
              <span className="cw-about-pillar-icon" aria-hidden>🍫</span>
              <h3 className="font-serif">Premium Chocolate</h3>
              {/* <p>
                We use real chocolate and cocoa from trusted producers. No shortcuts —
                just honest, premium chocolate with a rich, clean taste.
              </p> */}
            </div>
            <div className="cw-about-pillar">
              <span className="cw-about-pillar-icon" aria-hidden>🥞</span>
              <h3 className="font-serif">Handcrafted, Always Fresh</h3>
              {/* <p>
                Every waffle is pressed when you order it. Every crêpe is folded by hand.
                Fresh isn't a promise here — it's just how we work.
              </p> */}
            </div>
            <div className="cw-about-pillar">
              <span className="cw-about-pillar-icon" aria-hidden>☕</span>
              <h3 className="font-serif">A Warm Welcome</h3>
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
          <span className="eyebrow">Visit Us</span>
          <h2 className="font-serif">Come in. Linger. Leave happier.</h2>
          <p>
            We're in the heart of Prishtinë, ready to welcome chocolate lovers, coffee drinkers,
            dessert seekers, and anyone who believes fresh, handcrafted treats make life a
            little sweeter.
          </p>
          <a
            href="https://maps.google.com/?q=Rruga+Garibaldi+12+Prishtinë+Kosova"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Get Directions <span aria-hidden>→</span>
          </a>
          <div className="cw-about-cta-meta">
            <p>Rruga Garibaldi, nr. 12 — 10000 Prishtinë, Kosova</p>
            <p>Prishtina Mall, Food Court</p>
            <p>Mon — Sun: 08:30 – 23:00 </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;