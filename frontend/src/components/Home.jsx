import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.png";
import Headers from "./Headers";
import { addProductToCart } from "../utils/cart";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getTag = (index) => (index % 2 === 0 ? "New" : "Trending");

  const handleAddToCart = (product) => {
    addProductToCart(product);
    navigate("/cart");
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3200/api/product");
        const list = res?.data?.products || [];
        setFeaturedProducts(Array.isArray(list) ? list.slice(0, 4) : []);
      } catch (error) {
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

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

        {loading ? (
          <p className="section-note">Loading products...</p>
        ) : featuredProducts.length === 0 ? (
          <p className="section-note">No product data found.</p>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product, index) => (
              <article className="card-premium product-card" key={product._id || product.title}>
                <span className="product-chip">{getTag(index)}</span>
                <h3 className="product-name">{product.title}</h3>
                <p className="product-text">{product.description || "No description available."}</p>
                <div className="product-footer">
                  <span className="price">Rs. {product.price ?? "0"}</span>
                  <button
                    className="btn-cta btn-cta-secondary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
