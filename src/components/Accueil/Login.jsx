// Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Commun/Navbar.jsx";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de connexion");
      localStorage.setItem("authToken", data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 px-4 pt-20">
        <div className="w-full max-w-md bg-gradient-to-tr from-pink-100 via-purple-100 to-indigo-100 rounded-3xl shadow-2xl p-10 border border-pink-200">
          <h1 className="text-3xl font-extrabold text-purple-700 text-center animate-pulse">
            Connexion
          </h1>
          <p className="mt-2 text-center text-purple-600">
            Connectez-vous pour accéder à l&apos;espace administration
          </p>

          {error && (
            <div className="mt-4 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Adresse e-mail
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@example.com"
                className="block w-full rounded-xl border border-purple-300 px-4 py-2 text-gray-900 placeholder-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full rounded-xl border border-purple-300 px-4 py-2 text-gray-900 placeholder-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold py-2.5 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-purple-600">
            Email de test: eve.holt@reqres.in — Mot de passe: cityslicka
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

reqres_a054589d15d14dfbaa184cffb7898043;
