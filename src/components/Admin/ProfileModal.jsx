import React from "react";
import { User, Save, Camera, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Modal from "./Modal";

const ProfileModal = ({
  isOpen,
  onClose,
  profileData,
  setProfileData,
  onSave,
  loading,
}) => {
  const { colors } = useTheme();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header personnalisé avec avatar */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 border-b border-gray-700/50 -m-6 mb-6 rounded-t-2xl">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 p-2 bg-purple-600 hover:bg-purple-700 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Modifier le profil
            </h2>
            <span className="inline-block px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
              Informations personnelles
            </span>
          </div>
        </div>
      </div>

      {/* Contenu du formulaire */}
      <div className="space-y-6">
        <div>
          <label
            className={`flex items-center gap-2 text-sm font-semibold ${colors.text.primary} mb-2`}
          >
            <User className="w-4 h-4 text-purple-400" />
            Nom complet
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
            className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
            placeholder="Entrez votre nom complet"
          />
        </div>

        <div>
          <label
            className={`text-sm font-semibold ${colors.text.primary} mb-2 block`}
          >
            Email
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
            placeholder="votre.email@example.com"
          />
        </div>

        <div>
          <label
            className={`text-sm font-semibold ${colors.text.primary} mb-2 block`}
          >
            Téléphone
          </label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) =>
              setProfileData({ ...profileData, phone: e.target.value })
            }
            className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
            placeholder="+216 XX XXX XXX"
          />
        </div>

        <button
          onClick={onSave}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Enregistrer les modifications
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default ProfileModal;
