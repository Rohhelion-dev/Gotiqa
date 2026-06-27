import React, { useState } from "react";
import axios from "axios";

export default function AuthContainer({ setUser, setToken, onSuccess }) {

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
        { email, password }
      );

      // HARD VALIDATION (important fix)
      if (!data || !data.success) {
        setError(data?.error || "Login failed");
        return;
      }

      const user = data.user;
      const token = data.token;

      if (!user || !token) {
        setError("Invalid server response");
        return;
      }

      setUser(user);
      setToken(token);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      onSuccess();

    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Server unreachable. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-br from-emerald-50 via-white to-slate-100">

      <div className="w-full max-w-md">

        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-3xl p-10">

          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-emerald-900 flex items-center justify-center text-white font-bold">
              G
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h2>

            <p className="text-slate-500 mt-2">
              Sign in to Gotiqa Smart Farm Dashboard
            </p>
          </div>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-900 outline-none"
              placeholder="farmer@gotiqa.com"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-900 outline-none"
              placeholder="••••••••"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-900 text-white py-3 rounded-xl font-semibold hover:bg-emerald-800 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Secure access for authorized farm administrators only
          </p>

        </div>
      </div>
    </div>
  );
}