import React from "react";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Modal from "./Modal";

const SecurityModal = ({
  isOpen,
  onClose,
  securityData,
  setSecurityData,
  onSave,
  loading,
}) => {
  const { colors } = useTheme();
  const [showPasswords, setShowPasswords] = React.useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header personnalisé */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-cyan-700/20 p-8 border-b border-gray-700/50 -m-6 mb-6 rounded-t-2xl">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Paramètres de sécurité
            </h2>
            <span className="inline-block px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium">
              Modifier votre mot de passe
            </span>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="space-y-6">
        <div>
          <label
            className={`block text-sm font-semibold ${colors.text.primary} mb-2`}
          >
            Mot de passe actuel
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? "text" : "password"}
              value={securityData.currentPassword}
              onChange={(e) =>
                setSecurityData({
                  ...securityData,
                  currentPassword: e.target.value,
                })
              }
              className={`w-full px-4 py-3 pr-12 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
              placeholder="Entrez votre mot de passe actuel"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${colors.text.secondary} hover:text-white transition-colors`}
            >
              {showPasswords.current ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            className={`block text-sm font-semibold ${colors.text.primary} mb-2`}
          >
            Nouveau mot de passe
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              value={securityData.newPassword}
              onChange={(e) =>
                setSecurityData({
                  ...securityData,
                  newPassword: e.target.value,
                })
              }
              className={`w-full px-4 py-3 pr-12 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
              placeholder="Minimum 6 caractères"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${colors.text.secondary} hover:text-white transition-colors`}
            >
              {showPasswords.new ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            className={`block text-sm font-semibold ${colors.text.primary} mb-2`}
          >
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              value={securityData.confirmPassword}
              onChange={(e) =>
                setSecurityData({
                  ...securityData,
                  confirmPassword: e.target.value,
                })
              }
              className={`w-full px-4 py-3 pr-12 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
              placeholder="Confirmez votre nouveau mot de passe"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${colors.text.secondary} hover:text-white transition-colors`}
            >
              {showPasswords.confirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`p-4 ${colors.bg.tertiary} rounded-xl border ${colors.border}`}
        >
          <p className={`text-sm ${colors.text.secondary}`}>
            <strong className={colors.text.primary}>
              Conseils de sécurité :
            </strong>
            <br />• Utilisez au moins 6 caractères
            <br />• Combinez lettres, chiffres et symboles
            <br />• Évitez les mots de passe évidents
          </p>
        </div>

        <button
          onClick={onSave}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Mise à jour...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Mettre à jour le mot de passe
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default SecurityModal;
