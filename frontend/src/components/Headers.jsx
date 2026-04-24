import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Headers = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => (pathname === path ? "active" : "");

  let loggedInUser = null;
  try {
    loggedInUser = JSON.parse(localStorage.getItem("user") || "null");
  } catch (error) {
    loggedInUser = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand-mark">EC</span>
        <span>EazeCommerce</span>
      </Link>

      <nav className="nav-links">
        <Link className={`nav-link-chip ${isActive("/")}`} to="/">
          Home
        </Link>
        <Link className={`nav-link-chip ${isActive("/products")}`} to="/products">
          Products
        </Link>
        <Link className={`nav-link-chip ${isActive("/cart")}`} to="/cart">
          Cart
        </Link>

        {loggedInUser?.email ? (
          <>
            <span className="user-email-pill">{loggedInUser.email}</span>
            <button className="btn-cta btn-cta-secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn-cta btn-cta-secondary" to="/login">
              Login
            </Link>
            <Link className="btn-cta btn-cta-primary" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Headers;
