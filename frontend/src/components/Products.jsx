import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "./Headers";
import { addProductToCart } from "../utils/cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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
        const list = res?.data?.products || res?.data?.product || [];
        setProducts(Array.isArray(list) ? list : []);
        setErrorMessage("");
      } catch (error) {
        setProducts([]);
        setErrorMessage(error?.response?.data?.message || "Unable to load products. Please make sure backend is running on port 3200.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="page-shell">
      <Headers />

      <section className="section card-premium hero-copy">
        <span className="eyebrow">Curated catalog</span>
        <h1 className="section-title mt-3">Products That Match A Professional Lifestyle</h1>
        <p className="section-note mt-2">
          Browse standout pieces selected for quality, performance, and visual impact.
        </p>
      </section>

      <section className="section">
        {loading ? (
          <p className="section-note">Loading products...</p>
        ) : errorMessage ? (
          <p className="section-note">{errorMessage}</p>
        ) : products.length === 0 ? (
          <p className="section-note">No product data found.</p>
        ) : (
          <div className="product-grid">
            {products.map((item, index) => (
              <article className="card-premium product-card" key={item._id || item.title}>
                <span className="product-chip">{getTag(index)}</span>
                <h3 className="product-name">{item.title}</h3>
                <p className="product-text">{item.description || "No description available."}</p>
                <div className="product-footer">
                  <span className="price">Rs. {item.price ?? "0"}</span>
                  <button className="btn-cta btn-cta-primary" onClick={() => handleAddToCart(item)}>
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

export default Products;
