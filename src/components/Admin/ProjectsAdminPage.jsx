import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../api/projectsApi";
import ProjectsTable from "./ProjectsTable";
import ProjectModal from "./ProjectModal";
import { FolderGit2, Plus } from "lucide-react";
import {
  AnimatedPageWrapper,
  AnimatedHeader,
} from "../Animations/AnimatedPageWrapper";

function ProjectsAdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer ce projet ?")) return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      alert("Erreur lors de la suppression du projet");
    }
  }

  function handleEditClick(project) {
    setEditingProject(project);
    setShowModal(true);
  }

  function handleAddNew() {
    setEditingProject(null);
    setShowModal(true);
  }

  function handleProjectSuccess(project, action) {
    if (action === "create") {
      setProjects((prev) => [...prev, project]);
    } else if (action === "update") {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? project : p))
      );
    }
    setShowModal(false);
    setEditingProject(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditingProject(null);
  }

  return (
    <AnimatedPageWrapper>
      <AnimatedHeader
        icon={FolderGit2}
        title="Gestion des projets"
        subtitle="Créez et gérez vos projets"
        action={
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Nouveau projet
          </button>
        }
      />

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <ProjectsTable
        projects={projects}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      <ProjectModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSuccess={handleProjectSuccess}
        initialProject={editingProject}
      />
    </AnimatedPageWrapper>
  );
}

export default ProjectsAdminPage;
