import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ setAuth, setLoggedInUser }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !username.trim() || !password) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Call the backend register endpoint
      await axios.post("http://localhost:3000/auth/register", {
        name,
        username,
        password,
      });

      // Auto-login after successful registration
      const loginRes = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      const data = loginRes.data || {};
      const user = data.user || { username, name };

      localStorage.setItem("user", JSON.stringify(user));
      setLoggedInUser(user);
      setAuth(true);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <section className="w-full max-w-md bg-[var(--color-card)]/90 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-[var(--color-muted)] p-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-primary)] text-white shadow-md mb-3">
            <span aria-hidden className="text-2xl">🪪</span>
          </div>
          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            Create your account
          </h2>
          <p className="mt-1 text-sm text-[var(--color-accent)]">
            Make a account for your personal notes!
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <div
              role="alert"
              className="mb-4 rounded-md bg-red-100 text-red-700 px-3 py-2 text-sm font-medium"
            >
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[var(--color-text)] mb-1"
            >
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-muted)] rounded-md bg-white/80 text-[var(--color-text)] placeholder:text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[var(--color-text)] mb-1"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-muted)] rounded-md bg-white/80 text-[var(--color-text)] placeholder:text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[var(--color-text)] mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-12 border border-[var(--color-muted)] rounded-md bg-white/80 text-[var(--color-text)] placeholder:text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                placeholder="Create a password"
                required
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

          <div className="mb-6">
            <label
              className="block text-sm font-medium text-[var(--color-text)] mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-3 py-2 pr-12 border border-[var(--color-muted)] rounded-md bg-white/80 text-[var(--color-text)] placeholder:text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                placeholder="Confirm password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-dark)] transition"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center py-2.5 rounded-md bg-[var(--color-dark)] hover:bg-[var(--color-accent)] text-[var(--color-text-light)] font-medium shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <footer className="mt-6 text-center text-sm text-[var(--color-text)]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--color-dark)] font-medium hover:text-[var(--color-accent)] underline-offset-2 hover:underline"
          >
            Sign in
          </Link>
        </footer>
      </section>
    </div>
  );
};

export default Register;