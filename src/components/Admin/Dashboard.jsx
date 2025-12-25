import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaProjectDiagram,
  FaEnvelope,
  FaChartLine,
  FaPlus,
  FaEye,
  FaTasks,
} from "react-icons/fa";
import ProjectModal from "./ProjectModal";
import UserModal from "./UserModal";
import {
  AnimatedPageWrapper,
  AnimatedHeader,
  AnimatedStatsCard,
  AnimatedSection,
  AnimatedActivityItem,
  AnimatedActionButton,
} from "../Animations/AnimatedPageWrapper";
import { FadeIn } from "../Animations/Animations";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const stats = [
    {
      title: "Total Utilisateurs",
      value: "1,234",
      icon: <FaUsers className="text-4xl" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-500/20 to-purple-600/20",
      onClick: () => navigate("/admin/users"),
    },
    {
      title: "Projets Actifs",
      value: "24",
      icon: <FaProjectDiagram className="text-4xl" />,
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-500/20 to-pink-600/20",
      onClick: () => navigate("/admin/projects"),
    },
    {
      title: "Messages",
      value: "89",
      icon: <FaEnvelope className="text-4xl" />,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "from-cyan-500/20 to-cyan-600/20",
      onClick: () => navigate("/admin/forms"),
    },
    {
      title: "Croissance",
      value: "+12%",
      icon: <FaChartLine className="text-4xl" />,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-500/20 to-emerald-600/20",
      onClick: () => navigate("/admin/analytics"),
    },
  ];

  const recentActivities = [
    {
      action: "Nouvel utilisateur inscrit",
      time: "Il y a 5 min",
      color: "purple",
    },
    { action: "Projet mis à jour", time: "Il y a 1 heure", color: "pink" },
    { action: "Message reçu", time: "Il y a 2 heures", color: "cyan" },
    {
      action: "Statistiques générées",
      time: "Il y a 3 heures",
      color: "emerald",
    },
  ];

  const actionButtons = [
    {
      icon: FaPlus,
      label: "Ajouter un utilisateur",
      onClick: () => setShowUserModal(true),
      gradient: "from-purple-600 to-purple-700",
      shadow: "purple",
    },
    {
      icon: FaProjectDiagram,
      label: "Créer un projet",
      onClick: () => setShowProjectModal(true),
      gradient: "from-pink-600 to-pink-700",
      shadow: "pink",
    },
    {
      icon: FaEye,
      label: "Voir les rapports",
      onClick: () => navigate("/admin/analytics"),
      gradient: "from-cyan-600 to-cyan-700",
      shadow: "cyan",
    },
    {
      icon: FaTasks,
      label: "Gérer les messages",
      onClick: () => navigate("/admin/forms"),
      gradient: "from-emerald-600 to-emerald-700",
      shadow: "emerald",
    },
  ];

  const performanceMetrics = [
    {
      value: "85%",
      label: "Taux de satisfaction",
      gradient: "from-purple-400 to-purple-500",
      bg: "from-purple-500/10 to-purple-600/10",
      border: "purple",
    },
    {
      value: "1.2k",
      label: "Visites ce mois",
      gradient: "from-pink-400 to-pink-500",
      bg: "from-pink-500/10 to-pink-600/10",
      border: "pink",
    },
    {
      value: "42",
      label: "Tâches en cours",
      gradient: "from-cyan-400 to-cyan-500",
      bg: "from-cyan-500/10 to-cyan-600/10",
      border: "cyan",
    },
  ];

  const handleUserSuccess = (user) => {
    console.log("Utilisateur créé:", user);
  };

  const handleProjectSuccess = (project, action) => {
    console.log("Projet créé/modifié:", project, action);
  };

  return (
    <AnimatedPageWrapper>
      <AnimatedHeader
        title="Dashboard Administrateur"
        subtitle="Bienvenue dans votre espace d'administration"
      />

      {/* Cartes statistiques animées séparément */}
      <FadeIn delay={0.3} duration={0.8}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedStatsCard
              key={index}
              stat={stat}
              index={index}
              onClick={stat.onClick}
            />
          ))}
        </div>
      </FadeIn>

      {/* Section Activité récente et Actions rapides */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Activité Récente */}
        <FadeIn delay={0.9} duration={0.8} direction="left">
          <AnimatedSection title="Activité Récente">
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <AnimatedActivityItem key={i} index={i}>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:translate-x-2">
                    <div
                      className={`w-3 h-3 rounded-full bg-${activity.color}-500 flex-shrink-0 animate-pulse`}
                    ></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-200">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </AnimatedActivityItem>
              ))}
            </div>
          </AnimatedSection>
        </FadeIn>

        {/* Actions Rapides */}
        <FadeIn delay={1.1} duration={0.8} direction="right">
          <AnimatedSection title="Actions Rapides">
            <div className="space-y-3">
              {actionButtons.map((btn, index) => {
                const Icon = btn.icon;
                return (
                  <AnimatedActionButton
                    key={index}
                    index={index}
                    onClick={btn.onClick}
                    className={`w-full px-6 py-4 bg-gradient-to-r ${btn.gradient} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-${btn.shadow}-500/50 transition-all duration-300 hover:scale-105 border border-${btn.shadow}-500/50 flex items-center justify-center gap-2`}
                  >
                    <Icon className="w-5 h-5" />
                    {btn.label}
                  </AnimatedActionButton>
                );
              })}
            </div>
          </AnimatedSection>
        </FadeIn>
      </div>

      {/* Section performances */}
      <FadeIn delay={1.5} duration={0.9} direction="up">
        <AnimatedSection title="Aperçu des performances">
          <div className="grid md:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => (
              <FadeIn key={index} delay={1.7 + index * 0.15} duration={0.7}>
                <div
                  className={`text-center p-6 bg-gradient-to-br ${metric.bg} rounded-xl border border-${metric.border}-500/30 hover:border-${metric.border}-500/50 transition-all duration-300 hover:scale-105 cursor-pointer`}
                >
                  <p
                    className={`text-4xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent mb-2`}
                  >
                    {metric.value}
                  </p>
                  <p className="text-gray-400 font-medium">{metric.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </AnimatedSection>
      </FadeIn>

      {/* Modals */}
      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSuccess={handleUserSuccess}
      />

      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSuccess={handleProjectSuccess}
      />
    </AnimatedPageWrapper>
  );
};

export default AdminDashboard;
