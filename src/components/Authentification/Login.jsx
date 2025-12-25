import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaArrowLeft, FaLock, FaEnvelope } from "react-icons/fa";
import { LogIn } from "lucide-react";
import api from "../api/axios";
import { loginWithJson } from "../api/authApi";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token, user } = await loginWithJson(email, password);
      const data = { token, user };
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        navigate("/admin", { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 px-4 relative overflow-hidden">
      {/* Effets de lumière d'ambiance */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Bouton retour au site */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm text-purple-400 font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 border border-gray-700"
      >
        <FaArrowLeft />
        Retour au site
      </Link>

      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-700/50 relative z-10">
        <div className="text-center mb-8">
          {/* Logo/Icône */}
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
            <LogIn className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Connexion
          </h1>
          <p className="text-gray-400 font-medium">
            Accédez à l'espace administration
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400 flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <FaEnvelope className="text-purple-400" />
              Adresse e-mail
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="veuillez saisir votre email"
              className="block w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-3 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <FaLock className="text-purple-400" />
              Mot de passe
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="veuillez saisir votre mot de passe"
              className="block w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-3 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Connexion en cours...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Se connecter
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
          <p className="text-center text-sm text-purple-300 font-medium mb-2">
            🔐 Identifiants de test
          </p>
          <div className="space-y-1 text-center">
            <p className="text-xs text-gray-400">
              <span className="font-semibold text-purple-300">Email:</span>{" "}
              eve.holt@reqres.in
            </p>
            <p className="text-xs text-gray-400">
              <span className="font-semibold text-purple-300">
                Mot de passe:
              </span>{" "}
              cityslicka
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
