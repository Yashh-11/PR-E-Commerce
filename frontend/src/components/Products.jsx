import React from "react";
import Headers from "./Headers";

const products = [
  { name: "Monarch Blazer", tag: "Fashion", desc: "Tailored silhouette with all-day comfort stretch.", price: "$158" },
  { name: "Nova Sneakers", tag: "Footwear", desc: "Lightweight cushioning for city-paced movement.", price: "$112" },
  { name: "Atlas Backpack", tag: "Travel", desc: "Smart compartments for laptops and essentials.", price: "$96" },
  { name: "Brew Set Pro", tag: "Home", desc: "Ceramic coffee ritual set with minimalist finish.", price: "$74" },
  { name: "Pulse Earbuds", tag: "Tech", desc: "Noise isolation with balanced studio tuning.", price: "$139" },
  { name: "Luna Table Clock", tag: "Decor", desc: "Elegant bedside piece with silent mechanism.", price: "$48" },
  { name: "Aether Jacket", tag: "Outerwear", desc: "Water-resistant shell with premium lining.", price: "$171" },
  { name: "Core Bottle", tag: "Lifestyle", desc: "Double-wall steel and matte texture grip.", price: "$32" },
];

const Products = () => {
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
        <div className="product-grid">
          {products.map((item) => (
            <article className="card-premium product-card" key={item.name}>
              <span className="product-chip">{item.tag}</span>
              <h3 className="product-name">{item.name}</h3>
              <p className="product-text">{item.desc}</p>
              <div className="product-footer">
                <span className="price">{item.price}</span>
                <button className="btn-cta btn-cta-primary">Add to Cart</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
