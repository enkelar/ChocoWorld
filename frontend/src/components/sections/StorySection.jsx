import './StorySection.css';

export function StorySection() {
  return (
    <section className="cw-story">
      <div className="container cw-story-inner">
        <span className="eyebrow" style={{ textAlign: 'center' }}>
          ChocoWorld Kosova
        </span>
        <h2 className="font-serif cw-story-title">
          {/* A sanctuary for those who linger over <span className="italic">cocoa</span>. */}
          Explore the world’s finest chocolate café & chain with rich flavors, pancakes, crêpes, brownies, gelato & more.
        </h2>
        {/* <p className="cw-story-text">
          Choco World Kosova was born from a love affair with Belgian chocolate and
          the slow craft of pastry. Every waffle is pressed to order, every crêpe
          folded by hand, and every cocoa pour is a small ceremony. Whether you stop
          in for an espresso or stay for the full dessert salon, you are part of the
          ritual.
        </p> */}
      </div>
    </section>
  );
}
