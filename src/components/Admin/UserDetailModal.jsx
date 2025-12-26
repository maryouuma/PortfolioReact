// src/components/admin/UserDetailModal.jsx
import { useState } from "react";
import { X, Save, Camera, Edit } from "lucide-react";
import { FaUser, FaEnvelope, FaLock, FaUserCircle } from "react-icons/fa";
import { updateUser } from "../api/usersApi";
import { createPortal } from "react-dom";

// Composant pour les champs modifiables inline
const EditableField = ({
  icon,
  label,
  value,
  userId,
  fieldName,
  type = "text",
  onUpdate,
  users,
  showMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const userToUpdate = users.find((u) => u.id === userId);
      const updatedUser = await updateUser(userId, {
        ...userToUpdate,
        [fieldName]: editValue,
      });
      onUpdate(editValue);
      setIsEditing(false);
      showMessage("success", `${label} mis à jour !`);
    } catch (error) {
      showMessage("error", "Erreur lors de la mise à jour");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 p-7 rounded-2xl border border-gray-700/70 shadow-lg hover:shadow-xl hover:border-gray-600 transition-all duration-300">
      <label className="flex items-center gap-3 text-gray-300 mb-4 font-semibold text-sm">
        {icon}
        {label} <span className="text-red-400 ml-1">*</span>
      </label>
      {isEditing ? (
        <div className="flex items-center gap-3">
          <input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-5 py-4 bg-gray-800 border-2 border-purple-500 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all text-lg shadow-inner"
            autoFocus
            placeholder={
              type === "password" ? "••••••••" : `Entrez ${label.toLowerCase()}`
            }
          />
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="p-4 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 shadow-lg hover:shadow-green-500/50"
          >
            {isSaving ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditValue(value);
            }}
            className="p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <input
            type={type}
            value={type === "password" ? "••••••••" : value}
            readOnly
            className="flex-1 px-5 py-4 bg-gray-900/60 border-2 border-gray-700 rounded-xl text-gray-200 cursor-not-allowed text-lg"
          />
          <button
            onClick={() => setIsEditing(true)}
            className="p-4 bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/50"
          >
            <Edit className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

function UserDetailModal({
  isOpen,
  onClose,
  user,
  users,
  setUsers,
  showMessage,
}) {
  const [selectedUser, setSelectedUser] = useState(user);

  if (!isOpen || !selectedUser) return null;

  const handlePhotoChange = async (e) => {
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
    reader.onloadend = async () => {
      try {
        const updatedUser = await updateUser(selectedUser.id, {
          ...selectedUser,
          profilePhoto: reader.result,
        });
        setUsers(
          users.map((u) => (u.id === selectedUser.id ? updatedUser : u))
        );
        setSelectedUser(updatedUser);
        showMessage("success", "Photo de profil mise à jour !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la photo", error);
        showMessage("error", "Erreur lors de la mise à jour de la photo");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = async () => {
    if (window.confirm("Supprimer la photo de profil ?")) {
      try {
        const updatedUser = await updateUser(selectedUser.id, {
          ...selectedUser,
          profilePhoto: null,
        });
        setUsers(
          users.map((u) => (u.id === selectedUser.id ? updatedUser : u))
        );
        setSelectedUser(updatedUser);
        showMessage("success", "Photo supprimée !");
      } catch {
        showMessage("error", "Erreur lors de la suppression");
      }
    }
  };

  const handleClose = () => {
    setSelectedUser(null);
    onClose();
  };

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
              {selectedUser.profilePhoto ? (
                <img
                  src={selectedUser.profilePhoto}
                  alt={selectedUser.name}
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
              {selectedUser.profilePhoto && (
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
              <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg truncate">
                {selectedUser.name}
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-block px-5 py-2 bg-purple-500/30 border-2 border-purple-500/50 rounded-xl text-purple-200 text-sm font-bold shadow-lg backdrop-blur-sm">
                  {selectedUser.role === "admin"
                    ? "🔒 Administrateur"
                    : "👤 Utilisateur"}
                </span>
                <span className="inline-block px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-300 text-xs font-medium backdrop-blur-sm">
                  ID: {selectedUser.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* ID Utilisateur - NON MODIFIABLE */}
            <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 p-7 rounded-2xl border border-gray-700/70 shadow-lg hover:shadow-xl hover:border-gray-600 transition-all duration-300">
              <label className="flex items-center gap-3 text-gray-300 mb-4 font-semibold text-sm">
                <FaUserCircle className="text-purple-400 text-xl" />
                ID Utilisateur
              </label>
              <input
                type="text"
                value={selectedUser.id}
                readOnly
                className="w-full px-5 py-4 bg-gray-900/60 border-2 border-gray-700 rounded-xl text-gray-300 cursor-not-allowed font-mono text-lg"
              />
            </div>

            {/* Nom - MODIFIABLE */}
            <EditableField
              icon={<FaUser className="text-purple-400 text-xl" />}
              label="Nom complet"
              value={selectedUser.name}
              userId={selectedUser.id}
              fieldName="name"
              users={users}
              showMessage={showMessage}
              onUpdate={(newValue) => {
                const updatedUser = { ...selectedUser, name: newValue };
                setSelectedUser(updatedUser);
                setUsers(
                  users.map((u) => (u.id === selectedUser.id ? updatedUser : u))
                );
              }}
            />

            {/* Email - MODIFIABLE */}
            <EditableField
              icon={<FaEnvelope className="text-purple-400 text-xl" />}
              label="Email"
              value={selectedUser.email}
              userId={selectedUser.id}
              fieldName="email"
              type="email"
              users={users}
              showMessage={showMessage}
              onUpdate={(newValue) => {
                const updatedUser = { ...selectedUser, email: newValue };
                setSelectedUser(updatedUser);
                setUsers(
                  users.map((u) => (u.id === selectedUser.id ? updatedUser : u))
                );
              }}
            />

            {/* Mot de passe - MODIFIABLE */}
            <EditableField
              icon={<FaLock className="text-purple-400 text-xl" />}
              label="Mot de passe"
              value={selectedUser.password}
              userId={selectedUser.id}
              fieldName="password"
              type="password"
              users={users}
              showMessage={showMessage}
              onUpdate={(newValue) => {
                const updatedUser = { ...selectedUser, password: newValue };
                setSelectedUser(updatedUser);
                setUsers(
                  users.map((u) => (u.id === selectedUser.id ? updatedUser : u))
                );
              }}
            />
          </div>

          <button
            onClick={handleClose}
            className="w-full mt-8 px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 border border-purple-500/50"
          >
            <X className="w-6 h-6" />
            Fermer
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default UserDetailModal;
