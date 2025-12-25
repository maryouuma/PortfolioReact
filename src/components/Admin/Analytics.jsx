import React from "react";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";
import {
  AnimatedPageWrapper,
  AnimatedHeader,
  AnimatedGrid,
  AnimatedSection,
} from "../Animations/AnimatedPageWrapper";
import { FadeIn } from "../Animations/Animations";

const AdminAnalytics = () => {
  const metrics = [
    {
      title: "Croissance",
      value: "+23%",
      icon: TrendingUp,
      color: "purple",
      progress: 75,
    },
    {
      title: "Utilisateurs actifs",
      value: "1,842",
      icon: Users,
      color: "pink",
      progress: 60,
    },
    {
      title: "Taux d'engagement",
      value: "87%",
      icon: Activity,
      color: "cyan",
      progress: 87,
    },
  ];

  return (
    <AnimatedPageWrapper>
      <AnimatedHeader
        icon={BarChart3}
        title="Statistiques"
        subtitle="Analysez les performances de votre plateforme"
      />

      {/* Cartes métriques */}
      <AnimatedGrid columns="md:grid-cols-3">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 h-12 bg-${metric.color}-500/20 border border-${metric.color}-500/30 rounded-xl flex items-center justify-center`}
              >
                <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{metric.title}</p>
                <p className={`text-3xl font-bold text-${metric.color}-400`}>
                  {metric.value}
                </p>
              </div>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <FadeIn delay={0.5 + index * 0.1}>
                <div
                  className={`h-full bg-gradient-to-r from-${metric.color}-600 to-${metric.color}-600 rounded-full transition-all duration-1000`}
                  style={{ width: `${metric.progress}%` }}
                ></div>
              </FadeIn>
            </div>
          </div>
        ))}
      </AnimatedGrid>

      {/* Graphique placeholder */}
      <AnimatedSection title="Graphiques et statistiques">
        <div className="flex items-center justify-center h-64 bg-gray-900/50 rounded-xl border border-gray-700/50">
          <FadeIn delay={0.5}>
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-500">Graphiques détaillés à venir...</p>
            </div>
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Section insights */}
      <AnimatedGrid columns="md:grid-cols-2">
        <AnimatedSection title="📈 Tendances">
          <div className="space-y-4">
            {[
              {
                label: "Nouveaux utilisateurs",
                value: "+45%",
                color: "emerald",
              },
              { label: "Taux de conversion", value: "+12%", color: "blue" },
              { label: "Engagement moyen", value: "+8%", color: "purple" },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.3 + i * 0.1}>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-900/50 border border-gray-700/50">
                  <span className="text-gray-300">{item.label}</span>
                  <span className={`text-${item.color}-400 font-bold text-lg`}>
                    {item.value}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection title="🎯 Objectifs">
          <div className="space-y-4">
            {[
              {
                label: "Objectif mensuel",
                progress: 85,
                target: "10k visites",
              },
              { label: "Satisfaction client", progress: 92, target: "90%" },
              { label: "Nouveaux projets", progress: 70, target: "20 projets" },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.3 + i * 0.1}>
                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">{item.label}</span>
                    <span className="text-purple-400 text-sm font-medium">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-1000"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    Cible: {item.target}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </AnimatedSection>
      </AnimatedGrid>
    </AnimatedPageWrapper>
  );
};

export default AdminAnalytics;
