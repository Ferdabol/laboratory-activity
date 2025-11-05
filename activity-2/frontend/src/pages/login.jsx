import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setAuth, setLoggedInUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    if (!username.trim()) {
      setError("Please enter your username."); 
      return false;
    }
    if (!password) {
      setError("Please enter your password.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/login", { username, password });
      const data = res.data || {};
      const user = data.user || { username, name: data.name || username };
      localStorage.setItem("user", JSON.stringify(user));
      setLoggedInUser(user);
      setAuth(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <section className="w-full max-w-md bg-[var(--color-card)]/90 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-[var(--color-muted)] p-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-primary)] text-[var(--color-text-light)] shadow-md mb-3">
            <span aria-hidden className="text-2xl">🗒️</span>
          </div>
          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-[var(--color-accent)]">
            Sign in to your notes dashboard
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <div
              role="alert"
              className="mb-4 rounded-md bg-[var(--color-dark)]/10 text-[var(--color-dark)] px-3 py-2 text-sm font-medium"
            >
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="username" 
              className="block text-sm font-medium text-[var(--color-text)] mb-1"
            >
              Username 
            </label>
            <input
              id="username" 
              name="username" 
              type="text" 
              required
              autoComplete="username" 
              className="w-full px-3 py-2 border border-[var(--color-muted)] rounded-md bg-[var(--color-card)]/80 text-[var(--color-text)] placeholder:text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Your username" 
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--color-text)] mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="w-full px-3 py-2 pr-12 border border-[var(--color-muted)] rounded-md bg-[var(--color-card)]/80 text-[var(--color-text)] placeholder:text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-dark)] transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center py-2.5 rounded-md bg-[var(--color-dark)] hover:bg-[var(--color-accent)] text-[var(--color-text-light)] font-medium shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <footer className="mt-6 text-center text-sm text-[var(--color-text)]">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[var(--color-dark)] font-medium hover:text-[var(--color-accent)] underline-offset-2 hover:underline"
          >
            Create one
          </Link>
        </footer>
      </section>
    </div>
  );
};

export default Login;