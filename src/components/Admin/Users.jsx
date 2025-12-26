import React, { useEffect, useState, useMemo } from "react";
import { Search, Trash2, UserCheck, Plus, Eye } from "lucide-react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { getUsers, deleteUser } from "../api/usersApi";
import UserModal from "./UserModal";
import UserDetailModal from "./UserDetailModal";
import {
  AnimatedPageWrapper,
  AnimatedHeader,
  AnimatedMessage,
} from "../Animations/AnimatedPageWrapper";
import { FadeIn } from "../Animations/Animations";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Erreur de réseau", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    if (searchTerm !== "") {
      document.title = "recherche : " + searchTerm;
    } else {
      document.title = "Gestion des Utilisateurs";
    }
  }, [searchTerm]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);
  };

  const handleUserSuccess = (newUser) => {
    fetchUsers();
    showMessage("success", "Utilisateur ajouté avec succès !");
  };

  const handleDeleteUser = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await deleteUser(id);
        fetchUsers();
        showMessage("success", "Utilisateur supprimé avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
        showMessage("error", "Erreur lors de la suppression de l'utilisateur");
      }
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };

  return (
    <AnimatedPageWrapper>
      {/* Message de succès/erreur */}
      <AnimatedMessage type={message.type} text={message.text} />

      {/* Header avec animation */}
      <AnimatedHeader
        icon={FaUser}
        title="Gestion des Utilisateurs"
        subtitle="Gérez et administrez tous les utilisateurs"
        action={
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Ajouter un utilisateur
          </button>
        }
      />

      {/* Barre de recherche - Animation séparée */}
      <FadeIn delay={0.4} duration={0.8}>
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un utilisateur..."
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </FadeIn>

      {/* Table des utilisateurs - PAS D'ANIMATION SUR LES LIGNES */}
      <FadeIn delay={0.6} duration={0.8}>
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-900/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/30">
                        {user.profilePhoto ? (
                          <img
                            src={user.profilePhoto}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <FaUserCircle className="text-2xl text-white" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm font-semibold text-purple-300">
                        <UserCheck className="w-4 h-4" />
                        {user.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-200 font-medium">
                        {user.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-400">{user.email}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-pink-500/10 text-pink-400 border border-pink-500/30"
                            : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                        }`}
                      >
                        {user.role === "admin" ? "🔑 Admin" : "👤 User"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {/*<button
                          onClick={() => handleViewDetails(user)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 border border-cyan-500/50"
                        >
                          <Eye className="w-4 h-4" />
                          Voir
                        </button>*/}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 border border-red-500/50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center">
                          <Search className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-gray-500">
                          Aucun utilisateur trouvé
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* Modal Ajouter */}
      <UserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleUserSuccess}
      />

      {/* Modal Détails */}
      <UserDetailModal
        isOpen={showDetailModal}
        onClose={closeDetailModal}
        user={selectedUser}
        users={users}
        setUsers={setUsers}
        showMessage={showMessage}
      />
    </AnimatedPageWrapper>
  );
};

export default AdminUsers;
