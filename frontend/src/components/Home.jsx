import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";
import Headers from "./Headers";

const featuredProducts = [
  { name: "Luxe Leather Tote", label: "New", description: "Minimal carry-all crafted for daily business flow.", price: "$129" },
  { name: "Aero Smart Watch", label: "Trending", description: "Performance tracking with a refined steel look.", price: "$249" },
  { name: "Studio Headphones", label: "Editor Pick", description: "High-fidelity sound with a clean matte profile.", price: "$189" },
  { name: "Desk Lamp Arc", label: "Limited", description: "Architectural lighting for modern workspaces.", price: "$94" },
];

const Home = () => {
  return (
    <div className="page-shell">
      <Headers />

      <section className="hero-grid">
        <article className="card-premium hero-copy">
          <span className="eyebrow">Premium 2026 Collection</span>
          <h1 className="hero-title">Elevate Everyday Shopping With Timeless Design</h1>
          <p className="hero-subtitle">
            Discover curated essentials that blend style, utility, and confidence.
            Built for modern customers who expect quality in every detail.
          </p>

          <div className="hero-actions">
            <Link className="btn-cta btn-cta-primary" to="/products">
              Shop Collection
            </Link>
            <Link className="btn-cta btn-cta-secondary" to="/signup">
              Join Premium
            </Link>
          </div>

          <div className="metrics">
            <div className="metric-box">
              <div className="metric-label">Customer Rating</div>
              <div className="metric-value">4.9/5</div>
            </div>
            <div className="metric-box">
              <div className="metric-label">Orders Delivered</div>
              <div className="metric-value">50K+</div>
            </div>
            <div className="metric-box">
              <div className="metric-label">Premium Brands</div>
              <div className="metric-value">120+</div>
            </div>
          </div>
        </article>

        <aside className="card-premium hero-visual">
          <img src={heroImage} alt="Featured product collection" />
        </aside>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-note">Clean aesthetics. Reliable quality. Instant appeal.</p>
          </div>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <article className="card-premium product-card" key={product.name}>
              <span className="product-chip">{product.label}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-text">{product.description}</p>
              <div className="product-footer">
                <span className="price">{product.price}</span>
                <Link className="btn-cta btn-cta-secondary" to="/products">
                  View
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
