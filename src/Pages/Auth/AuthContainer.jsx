import React, { useState } from "react";
import axios from "axios";

export default function AuthContainer({
  setUser,
  setToken,
  onSuccess,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email,
          password,
        }
      );

      if (!data.success) {
        setError(data.error || "Login failed");
        return;
      }

      const user = data.user;
      const token = data.token;

      setUser(user);
      setToken(token);

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "token",
        token
      );

      onSuccess();

    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

        <div className="text-center mb-8">

          <div className="w-14 h-14 mx-auto mb-4 bg-emerald-900 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
            G
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h2>

          <p className="text-slate-500 mt-2">
            Sign in to Gotiqa Smart Farm
          </p>

        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="farmer@gotiqa.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-700 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-700 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-900 text-white py-3 rounded-xl font-semibold hover:bg-emerald-800 transition disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Admins and registered farmers can access the platform.
        </div>

      </div>

    </div>
  );
}

