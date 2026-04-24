import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3200/api/user/login", user);

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to login. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <aside className="auth-aside">
          <div>
            <span className="auth-badge">Secure access</span>
            <h2 className="mt-3">Welcome Back To PR Commerce</h2>
            <div className="auth-points">
              <span>Fast checkout with saved preferences</span>
              <span>Track orders and delivery in real time</span>
              <span>Access premium member-only drops</span>
            </div>
          </div>
          <small>Designed for modern shopping teams and creators.</small>
        </aside>

        <section className="auth-form-wrap">
          <h3>Sign In</h3>
          <p>Continue with your account credentials.</p>

          <form onSubmit={handleSubmit}>
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
                name="password"
                value={user.password || ""}
                type="password"
                onChange={handleChange}
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="btn-cta btn-cta-primary auth-submit">
              Login
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </section>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Login;
