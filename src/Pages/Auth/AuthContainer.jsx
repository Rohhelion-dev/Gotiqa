import React, { useState } from "react";
import api from "../../api/api";

api.post("/auth/login")

const API_URL = import.meta.env.VITE_API_URL ;

export default function AuthContainer({ setUser, setToken, onSuccess, onShowSignUp }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setFieldErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setError("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (!data.success) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      setUser(data.user);
      setToken(data.token);
      onSuccess?.();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to connect to server. Check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-900 text-xl font-bold text-white">
            G
          </div>

          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage your Gotiqa livestock records.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="login-email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="login-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="farmer@gotiqa.com"
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-emerald-700/30 ${
                fieldErrors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-emerald-700"
              }`}
            />

            {fieldErrors.email && (
              <p id="login-email-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={
                  fieldErrors.password ? "login-password-error" : undefined
                }
                className={`w-full rounded-xl border px-4 py-3 pr-20 text-sm outline-none transition focus:ring-2 focus:ring-emerald-700/30 ${
                  fieldErrors.password
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-300 focus:border-emerald-700"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-0 right-3 text-sm font-medium text-emerald-800 hover:text-emerald-950"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {fieldErrors.password && (
              <p id="login-password-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-900 py-3 font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          New to Gotiqa?{" "}
          <button
            type="button"
            onClick={onShowSignUp}
            className="font-semibold text-emerald-800 hover:text-emerald-950"
          >
            Create an account
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-slate-500">
          Admins and registered farmers can access the platform.
        </div>
      </div>
    </div>
  );
}