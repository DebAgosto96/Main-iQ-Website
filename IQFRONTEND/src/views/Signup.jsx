import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:8080";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const logos = [
    { href: "https://www.tiktok.com/@iqbuvl", img: "/femalehoodie.png", alt: "hoodie" },
    { href: "https://www.tiktok.com/@iqbuvl", img: "/sorry.png", alt: "hoodie" },
    { href: "https://www.tiktok.com/@iqbuvl", img: "femalehoodie.png", alt: "hoodie" },
    { href: "https://www.tiktok.com/@iqbuvl", img: "/sorry.png", alt: "hoodie" },
    { href: "https://www.tiktok.com/@iqbuvl", img: "femalehoodie.png", alt: "hoodie" },
    { href: "https://www.tiktok.com/@iqbuvl", img: "/sorry.png", alt: "hoodie" },
    { href: "https://www.tiktok.com/@iqbuvl", img: "femalehoodie.png", alt: "hoodie" },
    { href: "https://www.tiktok.com/@iqbuvl", img: "/sorry.png", alt: "hoodie" },
  ];

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = form.firstName.trim();
    const lastName  = form.lastName.trim();
    const username  = form.username.trim();
    const email     = form.email.trim();
    const password  = form.password;

    if (!firstName || !lastName || !username || !email || !password) {
      toast.warn("⚠ Fill out every field.", {
        className: "neon-toast neon-warn",
        icon: "⚠",
        autoClose: 2000,
      });
      return;
    }
    if (password.length < 6) {
      toast.warn("⚠ Password must be at least 6 characters.", {
        className: "neon-toast neon-warn",
        icon: "⚠",
        autoClose: 2200,
      });
      return;
    }

    try {
      setLoading(true);
      setProgress(35);

      // Create account
      await axios.post(`${API_ORIGIN}/api/auth/signup`, {
        firstName, lastName, username, email, password,
      });

      setProgress(65);

      // Auto-login
      const res = await axios.post(`${API_ORIGIN}/api/auth/login`, { email, password });
      setProgress(85);

      const { token, role } = res.data || {};
      if (!token) throw new Error("Signup succeeded, but login returned no token.");

      localStorage.setItem("token", token);
      if (role) localStorage.setItem("role", role);

      setProgress(100);
      toast.success("🚀 Account created. You’re in!", {
        className: "neon-toast",
        icon: "🎉",
        autoClose: 1800,
      });

      navigate("/profile", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed.";
      toast.error(msg, {
        className: "neon-toast neon-error",
        icon: "❌",
        autoClose: 2400,
      });
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <form className="signupForm" onSubmit={handleSubmit} noValidate>
          <h1>Sign Up</h1>

          <div className="input-box">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={onChange}
              autoComplete="given-name"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={onChange}
              autoComplete="family-name"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={onChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>

          {/* match login ids so styling is identical */}
          <div id="progress-wrap" aria-hidden={progress === 0}>
            <div id="progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <div className="btn-container">
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </div>

          <div className="register-link">
            <p>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
              >
                Login
              </span>
            </p>
          </div>
        </form>

        <div className="scrolling-container">
          <div className="scrolling-track">
            {logos.concat(logos).map((item, idx) => (
              <a
                href={item.href}
                key={idx}
                className="scrolling-item"
                target="_blank"
                rel="noreferrer"
              >
                <img src={item.img} alt={item.alt} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
