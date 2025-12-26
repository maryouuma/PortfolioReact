// src/components/UserModal.jsx
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-800/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 border-b border-gray-700/50 relative sticky top-0 z-10">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>
          <div className="flex items-center gap-6">
            {/* Photo de profil avec upload */}
            <div className="relative w-24 h-24">
              {formData.profilePhoto ? (
                <img
                  src={formData.profilePhoto}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-purple-500/30"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <FaUserCircle className="text-6xl text-white" />
                </div>
              )}

              {/* Bouton upload photo */}
              <label className="absolute bottom-0 right-0 p-2 bg-purple-600 hover:bg-purple-700 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <Camera className="w-5 h-5 text-white" />
              </label>

              {/* Bouton supprimer photo */}
              {formData.profilePhoto && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  title="Supprimer la photo"
                  className="absolute -top-2 -left-2 p-1.5 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Nouvel Utilisateur
              </h3>
              <span className="inline-block px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                Ajouter un compte
              </span>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-8">
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
                message.type === "success"
                  ? "bg-green-500/10 border-green-500/30 text-green-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              <span className="font-medium">{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div>
              <label className="flex items-center gap-3 text-gray-300 mb-3 font-medium">
                <FaUser className="text-purple-400" />
                Nom complet <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Votre nom complet"
                autoFocus
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-3 text-gray-300 mb-3 font-medium">
                <FaEnvelope className="text-purple-400" />
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="votre.email@exemple.com"
              />
            </div>

            {/* Mot de passe et Rôle - Côte à côte */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mot de passe */}
              <div>
                <label className="flex items-center gap-3 text-gray-300 mb-3 font-medium">
                  <FaLock className="text-purple-400" />
                  Mot de passe <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="••••••••"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Minimum 6 caractères
                </p>
              </div>

              {/* Rôle */}
              <div>
                <label className="flex items-center gap-3 text-gray-300 mb-3 font-medium">
                  <FaUserCircle className="text-purple-400" />
                  Rôle <span className="text-red-400">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Ajouter
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-6 py-4 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-5 h-5" />
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
