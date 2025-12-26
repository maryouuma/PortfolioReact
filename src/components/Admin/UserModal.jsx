// src/components/admin/UserModal.jsx
import { useState } from "react";
import { X, Save, Camera } from "lucide-react";
import { FaUser, FaEnvelope, FaLock, FaUserCircle } from "react-icons/fa";
import { createUser } from "../api/usersApi";
import { createPortal } from "react-dom";

function UserModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    profilePhoto: null,
  });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showMessage("error", "Veuillez sélectionner une image valide");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage("error", "L'image ne doit pas dépasser 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: reader.result,
      }));
      showMessage("success", "Photo ajoutée !");
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      profilePhoto: null,
    }));
    showMessage("success", "Photo supprimée !");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.password.trim()
      ) {
        showMessage("error", "Veuillez remplir tous les champs");
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showMessage("error", "Email invalide");
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        showMessage(
          "error",
          "Le mot de passe doit contenir au moins 6 caractères"
        );
        setLoading(false);
        return;
      }

      const newUser = await createUser(formData);
      showMessage("success", "Utilisateur ajouté avec succès !");

      setTimeout(() => {
        onSuccess(newUser);
        handleClose();
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      showMessage("error", "Erreur lors de l'ajout de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
      profilePhoto: null,
    });
    setMessage({ type: "", text: "" });
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal - Ajout du max-width et centrage */}
      <div className="relative bg-gradient-to-br from-gray-800/98 via-gray-900/98 to-gray-800/98 backdrop-blur-xl rounded-3xl border border-gray-700/70 w-full max-w-4xl shadow-2xl shadow-purple-500/20 max-h-[90vh] overflow-y-auto z-10 animate-slideUpFade">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-purple-600/30 p-10 border-b border-gray-700/70 relative sticky top-0 z-10 backdrop-blur-xl shadow-lg">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-3 bg-gray-800/80 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg"
          >
            <X className="w-6 h-6 text-gray-300 hover:text-white" />
          </button>
          <div className="flex items-center gap-8">
            {/* Photo de profil avec upload */}
            <div className="relative w-32 h-32 group flex-shrink-0">
              {formData.profilePhoto ? (
                <img
                  src={formData.profilePhoto}
                  alt="Profile"
                  className="w-full h-full rounded-2xl object-cover border-4 border-purple-500/50 shadow-xl shadow-purple-500/30 group-hover:border-purple-400 transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/50 group-hover:shadow-purple-500/70 transition-all duration-300">
                  <FaUserCircle className="text-7xl text-white drop-shadow-lg" />
                </div>
              )}

              {/* Bouton upload photo */}
              <label className="absolute bottom-0 right-0 p-3 bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-purple-500/50 border border-purple-400/50">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <Camera className="w-6 h-6 text-white" />
              </label>

              {/* Bouton supprimer photo */}
              {formData.profilePhoto && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  title="Supprimer la photo"
                  className="absolute -top-2 -left-2 p-2 bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 hover:scale-110 shadow-xl border border-red-400/50"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                Nouvel Utilisateur
              </h3>
              <span className="inline-block px-5 py-2 bg-purple-500/30 border-2 border-purple-500/50 rounded-xl text-purple-200 text-sm font-bold shadow-lg backdrop-blur-sm">
                ➕ Ajouter un compte
              </span>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-10">
          {message.text && (
            <div
              className={`mb-6 p-5 rounded-2xl border-2 flex items-center gap-3 shadow-lg animate-slideIn ${
                message.type === "success"
                  ? "bg-green-500/10 border-green-500/50 text-green-400"
                  : "bg-red-500/10 border-red-500/50 text-red-400"
              }`}
            >
              <span className="font-semibold text-base">{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Nom */}
            <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 p-7 rounded-2xl border border-gray-700/70 shadow-lg hover:shadow-xl hover:border-gray-600 transition-all duration-300">
              <label className="flex items-center gap-3 text-gray-300 mb-4 font-semibold text-sm">
                <FaUser className="text-purple-400 text-xl" />
                Nom complet <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-gray-900/60 border-2 border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all text-lg shadow-inner"
                placeholder="Votre nom complet"
                autoFocus
              />
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 p-7 rounded-2xl border border-gray-700/70 shadow-lg hover:shadow-xl hover:border-gray-600 transition-all duration-300">
              <label className="flex items-center gap-3 text-gray-300 mb-4 font-semibold text-sm">
                <FaEnvelope className="text-purple-400 text-xl" />
                Email <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-gray-900/60 border-2 border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all text-lg shadow-inner"
                placeholder="votre.email@exemple.com"
              />
            </div>

            {/* Mot de passe et Rôle - Côte à côte */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mot de passe */}
              <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 p-7 rounded-2xl border border-gray-700/70 shadow-lg hover:shadow-xl hover:border-gray-600 transition-all duration-300">
                <label className="flex items-center gap-3 text-gray-300 mb-4 font-semibold text-sm">
                  <FaLock className="text-purple-400 text-xl" />
                  Mot de passe <span className="text-red-400 ml-1">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-gray-900/60 border-2 border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all text-lg shadow-inner"
                  placeholder="••••••••"
                />
                <p className="mt-3 text-xs text-gray-500 font-medium">
                  ℹ Minimum 6 caractères
                </p>
              </div>

              {/* Rôle */}
              <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 p-7 rounded-2xl border border-gray-700/70 shadow-lg hover:shadow-xl hover:border-gray-600 transition-all duration-300">
                <label className="flex items-center gap-3 text-gray-300 mb-4 font-semibold text-sm">
                  <FaUserCircle className="text-purple-400 text-xl" />
                  Rôle <span className="text-red-400 ml-1">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-gray-900/60 border-2 border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all text-lg shadow-inner cursor-pointer"
                >
                  <option value="user">👤 Utilisateur</option>
                  <option value="admin">🔒 Administrateur</option>
                </select>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-5 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-8 py-5 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border border-green-500/50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    Ajouter l'utilisateur
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-8 py-5 bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600 shadow-lg"
              >
                <X className="w-6 h-6" />
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default UserModal;
