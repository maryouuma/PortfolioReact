import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaSave,
  FaTimes,
  FaUserCircle,
  FaCheck,
} from "react-icons/fa";
import { getUsers, updateUser } from "./api/usersApi.js";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Données du profil
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  // Données du formulaire d'édition
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Charger les données du profil au montage
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      // Extraire l'ID utilisateur du token (format: user-ID-timestamp)
      const userId = token.split("-")[1];

      // Récupérer tous les utilisateurs
      const users = await getUsers();

      // Trouver l'utilisateur connecté
      const currentUser = users.find((u) => u.id === userId);

      if (currentUser) {
        setProfile(currentUser);
        setFormData({
          name: currentUser.name,
          email: currentUser.email,
        });
      } else {
        setMessage({ type: "error", text: "Utilisateur non trouvé" });
      }
    } catch (error) {
      console.error("Erreur lors du chargement du profil:", error);
      setMessage({
        type: "error",
        text: "Erreur lors du chargement du profil",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage({ type: "", text: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: profile.name,
      email: profile.email,
    });
    setMessage({ type: "", text: "" });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      // Validation
      if (!formData.name.trim() || !formData.email.trim()) {
        setMessage({ type: "error", text: "Veuillez remplir tous les champs" });
        return;
      }

      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setMessage({ type: "error", text: "Email invalide" });
        return;
      }

      // Mise à jour dans la base de données
      const updatedUser = {
        ...profile,
        name: formData.name,
        email: formData.email,
      };

      await updateUser(profile.id, updatedUser);

      // Mise à jour de l'état local
      setProfile(updatedUser);
      setIsEditing(false);
      setMessage({
        type: "success",
        text: "Profil mis à jour avec succès !",
      });

      // Effacer le message après 3 secondes
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setMessage({
        type: "error",
        text: "Erreur lors de la mise à jour du profil",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-16 pt-24">
      {/* Effets lumineux */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Mon Profil
          </h2>
          <p className="text-xl text-gray-400 font-medium">
            Gérez vos informations personnelles
          </p>
        </div>

        {/* Message de feedback */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
              message.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {message.type === "success" ? (
              <FaCheck className="text-xl" />
            ) : (
              <FaTimes className="text-xl" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* Carte de profil */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
          {/* Header de la carte avec avatar */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 border-b border-gray-700/50">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                <FaUserCircle className="text-6xl text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {profile.name}
                </h3>
                <span className="inline-block px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                  {profile.role === "admin" ? "Administrateur" : "Utilisateur"}
                </span>
              </div>
            </div>
          </div>

          {/* Contenu de la carte */}
          <div className="p-8">
            {!isEditing ? (
              // Mode affichage
              <div className="space-y-6">
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
                  <label className="flex items-center gap-3 text-gray-400 mb-2 font-medium">
                    <FaUser className="text-purple-400" />
                    Nom complet
                  </label>
                  <p className="text-xl text-gray-200 font-semibold pl-7">
                    {profile.name}
                  </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
                  <label className="flex items-center gap-3 text-gray-400 mb-2 font-medium">
                    <FaEnvelope className="text-purple-400" />
                    Email
                  </label>
                  <p className="text-xl text-gray-200 font-semibold pl-7">
                    {profile.email}
                  </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
                  <label className="flex items-center gap-3 text-gray-400 mb-2 font-medium">
                    <FaUserCircle className="text-purple-400" />
                    Rôle
                  </label>
                  <p className="text-xl text-gray-200 font-semibold pl-7">
                    {profile.role === "admin"
                      ? "Administrateur"
                      : "Utilisateur"}
                  </p>
                </div>

                <button
                  onClick={handleEdit}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <FaEdit className="text-xl" />
                  Modifier mon profil
                </button>
              </div>
            ) : (
              // Mode édition
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-3 text-gray-300 mb-3 font-medium">
                    <FaUser className="text-purple-400" />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 text-gray-300 mb-3 font-medium">
                    <FaEnvelope className="text-purple-400" />
                    Email
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

                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
                  <label className="flex items-center gap-3 text-gray-400 mb-2 font-medium">
                    <FaUserCircle className="text-purple-400" />
                    Rôle
                  </label>
                  <p className="text-lg text-gray-400 pl-7">
                    {profile.role === "admin"
                      ? "Administrateur"
                      : "Utilisateur"}{" "}
                    (non modifiable)
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <FaSave className="text-xl" />
                        Enregistrer
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="flex-1 px-6 py-4 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTimes className="text-xl" />
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-8 bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <p className="text-gray-400 text-center text-sm">
            💡 <strong className="text-gray-300">Astuce :</strong> Gardez vos
            informations à jour pour une meilleure expérience
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
