import React from "react";
import { Check, Bell } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Modal from "./Modal";

const NotificationModal = ({
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
      description: "Notifications dans votre navigateur",
    },
    { key: "sms", label: "SMS", description: "Recevez des alertes par SMS" },
  ];

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header personnalisé */}
      <div className="bg-gradient-to-r from-pink-600/20 to-pink-700/20 p-8 border-b border-gray-700/50 -m-6 mb-6 rounded-t-2xl sticky top-0 z-10 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/50">
            <Bell className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Gérer les notifications
            </h2>
            <span className="inline-block px-4 py-1.5 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm font-medium">
              Préférences de notifications
            </span>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="space-y-4">
        {notificationTypes.map(({ key, label, description }) => (
          <div
            key={key}
            className={`flex items-center justify-between p-4 ${colors.bg.tertiary} rounded-xl border ${colors.border} hover:border-pink-500/30 transition-all`}
          >
            <div>
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
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                notifSettings[key] ? "bg-pink-600" : "bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-lg ${
                  notifSettings[key] ? "translate-x-7" : ""
                }`}
              />
            </button>
          </div>
        ))}

        <button
          onClick={onSave}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] mt-6"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enregistrement...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              Sauvegarder les préférences
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default NotificationModal;
