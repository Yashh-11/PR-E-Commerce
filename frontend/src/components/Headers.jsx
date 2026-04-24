import React from "react";
import { Link, useLocation } from "react-router-dom";

const Headers = () => {
  const { pathname } = useLocation();

  const isActive = (path) => (pathname === path ? "active" : "");

  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand-mark">P</span>
        <span>PR Commerce</span>
      </Link>

      <nav className="nav-links">
        <Link className={`nav-link-chip ${isActive("/")}`} to="/">
          Home
        </Link>
        <Link className={`nav-link-chip ${isActive("/products")}`} to="/products">
          Products
        </Link>
        <Link className="btn-cta btn-cta-secondary" to="/login">
          Login
        </Link>
        <Link className="btn-cta btn-cta-primary" to="/signup">
          Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Headers;
