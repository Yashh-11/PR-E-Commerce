import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Headers from "./Headers";
import { getStoredCartItems, saveCartItems } from "../utils/cart";

const Cart = () => {
  const [cartItems, setCartItems] = useState(getStoredCartItems());

  const updateQty = (productId, delta) => {
    const updated = cartItems.map((item) => {
      const itemId = item._id || item.id || item.title;
      if (itemId !== productId) return item;

      return {
        ...item,
        qty: Math.max(1, (item.qty || 1) + delta),
      };
    });

    setCartItems(updated);
    saveCartItems(updated);
  };

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const unitPrice = Number(item.price) || 0;
        const qty = Number(item.qty) || 1;
        return sum + unitPrice * qty;
      }, 0),
    [cartItems]
  );

  return (
    <div className="page-shell">
      <Headers />

      <section className="section card-premium hero-copy">
        <span className="eyebrow">Your cart</span>
        <h1 className="section-title mt-3">Cart Summary</h1>
        <p className="section-note mt-2">Manage quantity and review live total price.</p>
      </section>

      <section className="section">
        {cartItems.length === 0 ? (
          <div className="card-premium hero-copy">
            <p className="section-note">Your cart is empty.</p>
            <Link className="btn-cta btn-cta-primary mt-3" to="/products">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => {
                const productId = item._id || item.id || item.title;
                const qty = Number(item.qty) || 1;
                const unitPrice = Number(item.price) || 0;
                const itemTotal = unitPrice * qty;

                return (
                  <article className="card-premium cart-card" key={productId}>
                    <div>
                      <h3 className="product-name">{item.title}</h3>
                      <p className="product-text">{item.description || "No description available."}</p>
                    </div>

                    <div className="cart-meta">
                      <span className="price">Rs. {unitPrice}</span>
                      <div className="qty-controls">
                        <button
                          className="btn-qty"
                          onClick={() => updateQty(productId, -1)}
                          aria-label="decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-value">{qty}</span>
                        <button
                          className="btn-qty"
                          onClick={() => updateQty(productId, 1)}
                          aria-label="increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="cart-line-total">Rs. {itemTotal}</span>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="card-premium cart-total-wrap">
              <span className="section-note">Grand Total</span>
              <h3 className="section-title">Rs. {totalPrice}</h3>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Cart;
