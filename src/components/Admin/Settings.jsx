import React, { useState, useEffect } from "react";
import { Settings as SettingsIcon, Bell, Lock, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { getUsers, updateUser } from "../api/usersApi";
import {
  AnimatedPageWrapper,
  AnimatedHeader,
} from "../Animations/AnimatedPageWrapper";
import { FadeIn } from "../Animations/Animations";
import ProfileModal from "./ProfileModal";
import NotificationModal from "./NotificationModal";
import SecurityModal from "./SecurityModal";
import SuccessToast from "./SuccessToast";

const AdminSettings = () => {
  const { colors } = useTheme();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
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

  useEffect(() => {
    if (currentUser && currentUser.notificationSettings) {
      setNotifSettings(currentUser.notificationSettings);
    }
  }, [currentUser]);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const userId = token.split("-")[1];
      const users = await getUsers();
      const user = users.find((u) => u.id === userId);

      if (user) {
        setCurrentUser(user);
        setProfileData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        });
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'utilisateur:", error);
      showSuccessToast("❌ Erreur lors du chargement des données");
    }
  };

  const showSuccessToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveProfile = async () => {
    if (!currentUser) {
      showSuccessToast("❌ Utilisateur non trouvé");
      return;
    }

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
    try {
      const updatedUser = await updateUser(currentUser.id, {
        ...currentUser,
        name: profileData.name.trim(),
        email: profileData.email.trim(),
        phone: profileData.phone.trim(),
      });

      setCurrentUser(updatedUser);
      showSuccessToast("✅ Profil mis à jour avec succès!");
      setShowProfileModal(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      showSuccessToast("❌ Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    if (!currentUser) {
      showSuccessToast("❌ Utilisateur non trouvé");
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await updateUser(currentUser.id, {
        ...currentUser,
        notificationSettings: notifSettings,
      });

      setCurrentUser(updatedUser);
      showSuccessToast("✅ Préférences de notifications mises à jour!");
      setShowNotifModal(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      showSuccessToast("❌ Erreur lors de la mise à jour des notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSecurity = async () => {
    if (!currentUser) {
      showSuccessToast("❌ Utilisateur non trouvé");
      return;
    }

    if (securityData.newPassword !== securityData.confirmPassword) {
      showSuccessToast("❌ Les mots de passe ne correspondent pas!");
      return;
    }

    if (!securityData.currentPassword || !securityData.newPassword) {
      showSuccessToast("❌ Veuillez remplir tous les champs!");
      return;
    }

    if (securityData.currentPassword !== currentUser.password) {
      showSuccessToast("❌ Mot de passe actuel incorrect!");
      return;
    }

    if (securityData.newPassword.length < 6) {
      showSuccessToast(
        "❌ Le mot de passe doit contenir au moins 6 caractères!"
      );
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await updateUser(currentUser.id, {
        ...currentUser,
        password: securityData.newPassword,
      });

      setCurrentUser(updatedUser);
      showSuccessToast("✅ Mot de passe mis à jour avec succès!");
      setSecurityData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowSecurityModal(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      showSuccessToast("❌ Erreur lors de la mise à jour du mot de passe");
    } finally {
      setLoading(false);
    }
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
    <AnimatedPageWrapper>
      {toast && <SuccessToast message={toast} onClose={() => setToast(null)} />}

      <AnimatedHeader
        icon={SettingsIcon}
        title="Paramètres"
        subtitle="Configurez votre espace d'administration"
      />

      <FadeIn delay={0.5} duration={0.8}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <FadeIn
                key={index}
                delay={0.7 + index * 0.2}
                duration={0.8}
                direction="up"
              >
                <button
                  onClick={card.onClick}
                  className={`${colors.bg.secondary} backdrop-blur-xl rounded-2xl border ${colors.border} p-6 shadow-xl ${card.borderHover} transition-all duration-500 hover:scale-105 hover:shadow-2xl text-left w-full group`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 ${card.iconBg} border ${card.iconBorder} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
                    >
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <h3 className={`text-xl font-bold ${colors.text.primary}`}>
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className={`${colors.text.secondary} text-sm mb-4 leading-relaxed`}
                  >
                    {card.description}
                  </p>
                  <div
                    className={`px-4 py-3 bg-gradient-to-r ${card.gradient} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-center group-hover:shadow-xl`}
                  >
                    {card.buttonLabel}
                  </div>
                </button>
              </FadeIn>
            );
          })}
        </div>
      </FadeIn>

      {/* Modals */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
        setProfileData={setProfileData}
        onSave={handleSaveProfile}
        loading={loading}
      />

      <NotificationModal
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
    </AnimatedPageWrapper>
  );
};

export default AdminSettings;
