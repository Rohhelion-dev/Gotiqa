import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function SignUpForm({ setUser, setToken, onSuccess, onShowLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Full name must be at least 2 characters.";
    }

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

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
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
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (!data.success) {
        setError(data.error || "Registration failed. Please try again.");
        return;
      }

      if (data.user && data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        setUser?.(data.user);
        setToken?.(data.token);
      }

      setMessage("Account created successfully.");
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

  const inputClass = (fieldName) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-emerald-700/30 ${
      fieldErrors[fieldName]
        ? "border-red-400 focus:border-red-500"
        : "border-slate-300 focus:border-emerald-700"
    }`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-900 text-xl font-bold text-white">
            G
          </div>

          <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>

          <p className="mt-2 text-sm text-slate-500">
            Start managing your livestock records with Gotiqa.
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

        {message && (
          <div
            role="status"
            className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="signup-name"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>

            <input
              id="signup-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass("name")}
              placeholder="John Doe"
              autoComplete="name"
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "signup-name-error" : undefined}
            />

            {fieldErrors.name && (
              <p id="signup-name-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="signup-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass("email")}
              placeholder="farmer@gotiqa.com"
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "signup-email-error" : undefined}
            />

            {fieldErrors.email && (
              <p id="signup-email-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="signup-password"
              type={showPasswords ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass("password")}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={
                fieldErrors.password ? "signup-password-error" : undefined
              }
            />

            {fieldErrors.password && (
              <p id="signup-password-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-confirm-password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Confirm Password
            </label>

            <input
              id="signup-confirm-password"
              type={showPasswords ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClass("confirmPassword")}
              placeholder="Repeat your password"
              autoComplete="new-password"
              aria-invalid={Boolean(fieldErrors.confirmPassword)}
              aria-describedby={
                fieldErrors.confirmPassword
                  ? "signup-confirm-password-error"
                  : undefined
              }
            />

            {fieldErrors.confirmPassword && (
              <p
                id="signup-confirm-password-error"
                className="mt-1 text-sm text-red-600"
              >
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowPasswords((current) => !current)}
            className="text-sm font-medium text-emerald-800 hover:text-emerald-950"
          >
            {showPasswords ? "Hide passwords" : "Show passwords"}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-900 py-3 font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onShowLogin}
            className="font-semibold text-emerald-800 hover:text-emerald-950"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}