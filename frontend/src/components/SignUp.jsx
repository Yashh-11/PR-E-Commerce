import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3200/api/user/signup",
        user
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to create account.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <aside className="auth-aside">
          <div>
            <span className="auth-badge">Premium onboarding</span>
            <h2 className="mt-3">Create Your EazeCommerce Profile</h2>
            <div className="auth-points">
              <span>Unlock personalized recommendations instantly</span>
              <span>Get first access to seasonal premium launches</span>
              <span>Save favorites and build smarter shopping lists</span>
            </div>
          </div>
          <small>Join customers who value quality and consistency.</small>
        </aside>

        <section className="auth-form-wrap">
          <h3>Create Account</h3>
          <p>Enter your details to begin.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={user.name || ""}
                placeholder="Enter your name"
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={user.email || ""}
                placeholder="you@company.com"
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={user.password || ""}
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn-cta btn-cta-primary auth-submit">
              Sign Up
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </section>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default SignUp;
