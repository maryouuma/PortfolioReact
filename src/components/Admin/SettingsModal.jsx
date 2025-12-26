import React, { useState } from "react";
import {
  Settings,
  Bell,
  Lock,
  User,
  Save,
  X,
  Check,
  CheckCircle,
} from "lucide-react";

const useTheme = () => ({
  colors: {
    bg: {
      primary: "bg-gray-900",
      secondary: "bg-gray-800",
      tertiary: "bg-gray-700",
      hover: "hover:bg-gray-700",
    },
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
    },
    border: "border-gray-700",
  },
});

const SuccessToast = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
        <CheckCircle className="w-6 h-6" />
        <p className="font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 hover:bg-white/20 p-1 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const ModalBase = ({ isOpen, onClose, title, children }) => {
  const { colors } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`${colors.bg.secondary} rounded-2xl border ${colors.border} max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`sticky top-0 ${colors.bg.secondary} border-b ${colors.border} p-6 flex items-center justify-between z-10`}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 ${colors.bg.hover} rounded-lg transition-colors`}
          >
            <X
              className={`w-6 h-6 ${colors.text.secondary} hover:text-white`}
            />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

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
    <ModalBase isOpen={isOpen} onClose={onClose} title="Modifier le profil">
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
            className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-purple-500 transition-colors`}
            placeholder="Entrez votre nom"
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
            className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-purple-500 transition-colors`}
            placeholder="votre@email.com"
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
            className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-purple-500 transition-colors`}
            placeholder="+216 XX XXX XXX"
          />
        </div>

        <button
          onClick={onSave}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Enregistrer
            </>
          )}
        </button>
      </div>
    </ModalBase>
  );
};

const NotificationsModal = ({
  isOpen,
  onClose,
  notifSettings,
  setNotifSettings,
  onSave,
  loading,
}) => {
  const { colors } = useTheme();

  const notificationTypes = [
    {
      key: "email",
      label: "Email",
      description: "Recevez des notifications par email",
    },
    {
      key: "push",
      label: "Notifications Push",
      description: "Notifications en temps réel sur votre appareil",
    },
    { key: "sms", label: "SMS", description: "Recevez des alertes par SMS" },
  ];

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Gérer les notifications"
    >
      <div className="space-y-4">
        {notificationTypes.map(({ key, label, description }) => (
          <div
            key={key}
            className={`flex items-center justify-between p-4 ${colors.bg.tertiary} rounded-xl border ${colors.border} hover:border-pink-500/30 transition-colors`}
          >
            <div className="flex-1">
              <span className={`${colors.text.primary} font-semibold block`}>
                {label}
              </span>
              <span className={`${colors.text.secondary} text-sm`}>
                {description}
              </span>
            </div>
            <button
              onClick={() =>
                setNotifSettings({
                  ...notifSettings,
                  [key]: !notifSettings[key],
                })
              }
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                notifSettings[key] ? "bg-pink-600" : "bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  notifSettings[key] ? "translate-x-7" : ""
                }`}
              />
            </button>
          </div>
        ))}

        <button
          onClick={onSave}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enregistrement...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              Sauvegarder
            </>
          )}
        </button>
      </div>
    </ModalBase>
  );
};

const SecurityModal = ({
  isOpen,
  onClose,
  securityData,
  setSecurityData,
  onSave,
  loading,
}) => {
  const { colors } = useTheme();

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Paramètres de sécurité">
      <div className="space-y-6">
        <div>
          <label
            className={`block text-sm font-semibold ${colors.text.primary} mb-2`}
          >
            Mot de passe actuel
          </label>
          <input
            type="password"
            value={securityData.currentPassword}
            onChange={(e) =>
              setSecurityData({
                ...securityData,
                currentPassword: e.target.value,
              })
            }
            className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-cyan-500 transition-colors`}
            placeholder="••••••••"
          />
        </div>

        <div>
          <label
            className={`block text-sm font-semibold ${colors.text.primary} mb-2`}
          >
            Nouveau mot de passe
          </label>
          <input
            type="password"
            value={securityData.newPassword}
            onChange={(e) =>
              setSecurityData({ ...securityData, newPassword: e.target.value })
            }
            className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-cyan-500 transition-colors`}
            placeholder="••••••••"
          />
          <p className={`${colors.text.secondary} text-xs mt-1`}>
            Minimum 6 caractères
          </p>
        </div>

        <div>
          <label
            className={`block text-sm font-semibold ${colors.text.primary} mb-2`}
          >
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            value={securityData.confirmPassword}
            onChange={(e) =>
              setSecurityData({
                ...securityData,
                confirmPassword: e.target.value,
              })
            }
            className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-cyan-500 transition-colors`}
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={onSave}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Mise à jour...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Mettre à jour
            </>
          )}
        </button>
      </div>
    </ModalBase>
  );
};

const AdminSettings = () => {
  const { colors } = useTheme();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+216 12 345 678",
  });

  const [notifSettings, setNotifSettings] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const showSuccessToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveProfile = () => {
    if (!profileData.name.trim()) {
      showSuccessToast("❌ Le nom est obligatoire");
      return;
    }

    if (!profileData.email.trim()) {
      showSuccessToast("❌ L'email est obligatoire");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      showSuccessToast("❌ Email invalide");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showSuccessToast("✅ Profil mis à jour avec succès!");
      setShowProfileModal(false);
    }, 1500);
  };

  const handleSaveNotifications = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showSuccessToast("✅ Préférences de notifications mises à jour!");
      setShowNotifModal(false);
    }, 1500);
  };

  const handleSaveSecurity = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      showSuccessToast("❌ Les mots de passe ne correspondent pas!");
      return;
    }

    if (!securityData.currentPassword || !securityData.newPassword) {
      showSuccessToast("❌ Veuillez remplir tous les champs!");
      return;
    }

    if (securityData.newPassword.length < 6) {
      showSuccessToast(
        "❌ Le mot de passe doit contenir au moins 6 caractères!"
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showSuccessToast("✅ Mot de passe mis à jour avec succès!");
      setSecurityData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowSecurityModal(false);
    }, 1500);
  };

  const settingsCards = [
    {
      icon: User,
      title: "Profil",
      description: "Gérez vos informations personnelles",
      buttonLabel: "Modifier le profil",
      gradient: "from-purple-600 to-purple-700",
      iconBg: "bg-purple-500/20",
      iconBorder: "border-purple-500/30",
      iconColor: "text-purple-400",
      borderHover: "hover:border-purple-500/50",
      onClick: () => setShowProfileModal(true),
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configurez vos préférences de notifications",
      buttonLabel: "Gérer les notifications",
      gradient: "from-pink-600 to-pink-700",
      iconBg: "bg-pink-500/20",
      iconBorder: "border-pink-500/30",
      iconColor: "text-pink-400",
      borderHover: "hover:border-pink-500/50",
      onClick: () => setShowNotifModal(true),
    },
    {
      icon: Lock,
      title: "Sécurité",
      description: "Protégez votre compte avec des paramètres avancés",
      buttonLabel: "Paramètres de sécurité",
      gradient: "from-cyan-600 to-cyan-700",
      iconBg: "bg-cyan-500/20",
      iconBorder: "border-cyan-500/30",
      iconColor: "text-cyan-400",
      borderHover: "hover:border-cyan-500/50",
      onClick: () => setShowSecurityModal(true),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {toast && <SuccessToast message={toast} onClose={() => setToast(null)} />}

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Paramètres</h1>
          </div>
          <p className="text-gray-400">
            Configurez votre espace d'administration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {settingsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <button
                key={index}
                onClick={card.onClick}
                className={`${colors.bg.secondary} backdrop-blur-xl rounded-2xl border ${colors.border} p-6 shadow-xl ${card.borderHover} transition-all duration-500 hover:scale-105 text-left w-full`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 ${card.iconBg} border ${card.iconBorder} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <h3 className={`text-xl font-bold ${colors.text.primary}`}>
                    {card.title}
                  </h3>
                </div>
                <p className={`${colors.text.secondary} text-sm mb-4`}>
                  {card.description}
                </p>
                <div
                  className={`px-4 py-3 bg-gradient-to-r ${card.gradient} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-center`}
                >
                  {card.buttonLabel}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
        setProfileData={setProfileData}
        onSave={handleSaveProfile}
        loading={loading}
      />

      <NotificationsModal
        isOpen={showNotifModal}
        onClose={() => setShowNotifModal(false)}
        notifSettings={notifSettings}
        setNotifSettings={setNotifSettings}
        onSave={handleSaveNotifications}
        loading={loading}
      />

      <SecurityModal
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
        securityData={securityData}
        setSecurityData={setSecurityData}
        onSave={handleSaveSecurity}
        loading={loading}
      />
    </div>
  );
};

export default AdminSettings;
