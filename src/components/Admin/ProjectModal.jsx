// src/components/ProjectModal.jsx
import { useState } from "react";
import { X, Save } from "lucide-react";
import { FaProjectDiagram } from "react-icons/fa";
import { createProject, updateProject } from "../api/projectsApi";

function ProjectModal({ isOpen, onClose, onSuccess, initialProject = null }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    title: initialProject?.title || "",
    description: initialProject?.description || "",
    techStack: initialProject?.techStack?.join(", ") || "",
    status: initialProject?.status || "draft",
  });

  const isEditMode = Boolean(initialProject);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (!formData.title.trim()) {
        showMessage("error", "Le titre du projet est obligatoire");
        setLoading(false);
        return;
      }

      const projectData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        techStack: formData.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        status: formData.status,
      };

      if (isEditMode) {
        // Mode édition
        const updated = await updateProject(initialProject.id, {
          ...initialProject,
          ...projectData,
        });
        showMessage("success", "Projet mis à jour avec succès !");
        setTimeout(() => {
          onSuccess(updated, "update");
          handleClose();
        }, 1000);
      } else {
        // Mode création
        const created = await createProject(projectData);
        showMessage("success", "Projet créé avec succès !");
        setTimeout(() => {
          onSuccess(created, "create");
          handleClose();
        }, 1000);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde", error);
      showMessage(
        "error",
        isEditMode
          ? "Erreur lors de la mise à jour du projet"
          : "Erreur lors de la création du projet"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      techStack: "",
      status: "draft",
    });
    setMessage({ type: "", text: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 p-8 border-b border-gray-700/50 relative sticky top-0 z-10">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/50">
              <FaProjectDiagram className="text-5xl text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {isEditMode ? "Modifier le Projet" : "Nouveau Projet"}
              </h3>
              <span className="inline-block px-4 py-1.5 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm font-medium">
                {isEditMode ? "Éditer un projet" : "Créer un projet"}
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
            {/* Titre */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Titre du projet <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Entrez le titre..."
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-colors"
                autoFocus
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Décrivez votre projet..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-colors resize-none"
              />
            </div>

            {/* Stack technique */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Stack technique
                <span className="text-gray-500 text-xs ml-2">
                  (séparée par des virgules)
                </span>
              </label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleInputChange}
                placeholder="React, Node.js, MySQL..."
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-colors"
              />
            </div>

            {/* Statut */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Statut
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-colors"
              >
                <option value="draft">Brouillon</option>
                <option value="online">En ligne</option>
                <option value="archived">Archivé</option>
              </select>
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
                    {isEditMode ? "Mise à jour..." : "Création..."}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {isEditMode ? "Mettre à jour" : "Créer"}
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
    </div>
  );
}

export default ProjectModal;
