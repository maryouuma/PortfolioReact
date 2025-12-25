// src/components/Animations/AnimatedPageWrapper.jsx
import React from "react";
import { FadeIn, ScaleIn, SlideIn } from "./Animations";

/**
 * Wrapper pour animer une page entière avec des animations séquentielles PLUS LENTES
 */
export const AnimatedPageWrapper = ({ children }) => {
  return (
    <div className="space-y-6">
      {React.Children.map(children, (child, index) => (
        <FadeIn key={index} delay={index * 0.2} duration={0.8} direction="up">
          {child}
        </FadeIn>
      ))}
    </div>
  );
};

/**
 * Composant pour animer les en-têtes de page
 */
export const AnimatedHeader = ({
  icon: Icon,
  title,
  subtitle,
  action,
  gradient = "from-purple-400 to-pink-400",
}) => {
  return (
    <ScaleIn duration={0.7}>
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-xl">
        <div className="flex justify-between items-center">
          <SlideIn direction="left" duration={0.8} delay={0.1}>
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <h1
                  className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}
                >
                  {title}
                </h1>
                {subtitle && <p className="text-gray-400">{subtitle}</p>}
              </div>
            </div>
          </SlideIn>
          {action && (
            <SlideIn direction="right" duration={0.8} delay={0.3}>
              {action}
            </SlideIn>
          )}
        </div>
      </div>
    </ScaleIn>
  );
};

/**
 * Composant pour animer les cartes de statistiques
 */
export const AnimatedStatsCard = ({ stat, index = 0, onClick }) => {
  return (
    <FadeIn delay={0.2 + index * 0.15} duration={0.8} direction="up">
      <div
        onClick={onClick}
        className="group bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 cursor-pointer"
      >
        <div
          className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.bgColor} mb-4 border border-gray-700/30 group-hover:scale-110 transition-transform duration-500`}
        >
          <div className={`bg-clip-text bg-gradient-to-r ${stat.color}`}>
            {stat.icon}
          </div>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.title}</h3>
        <p
          className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
        >
          {stat.value}
        </p>
      </div>
    </FadeIn>
  );
};

/**
 * Composant pour animer les lignes de tableau
 */
export const AnimatedTableRow = ({ children, index = 0 }) => {
  return (
    <FadeIn delay={0.1 + index * 0.08} duration={0.6} direction="none">
      <tr className="hover:bg-gray-900/30 transition-all duration-300 hover:scale-[1.01]">
        {children}
      </tr>
    </FadeIn>
  );
};

/**
 * Composant pour animer les modals
 */
export const AnimatedModal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <ScaleIn duration={0.4}>{children}</ScaleIn>
    </div>
  );
};

/**
 * Composant pour animer les messages de succès/erreur
 */
export const AnimatedMessage = ({ type, text }) => {
  if (!text) return null;

  return (
    <SlideIn direction="down" duration={0.5}>
      <div
        className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
          type === "success"
            ? "bg-green-500/10 border-green-500/30 text-green-400"
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}
      >
        <span className="font-medium">{text}</span>
      </div>
    </SlideIn>
  );
};

/**
 * Composant pour animer les grilles de cartes
 */
export const AnimatedGrid = ({ children, columns = "md:grid-cols-2" }) => {
  return (
    <div className={`grid ${columns} gap-6`}>
      {React.Children.map(children, (child, index) => (
        <FadeIn
          key={index}
          delay={0.3 + index * 0.2}
          duration={0.8}
          direction="up"
        >
          {child}
        </FadeIn>
      ))}
    </div>
  );
};

/**
 * Composant pour animer les sections avec titre
 */
export const AnimatedSection = ({ title, children, delay = 0 }) => {
  return (
    <FadeIn delay={delay} duration={0.8} direction="up">
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl">
        {title && (
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            {title}
          </h2>
        )}
        {children}
      </div>
    </FadeIn>
  );
};

/**
 * Composant pour animer les boutons d'action
 */
export const AnimatedButton = ({
  children,
  onClick,
  variant = "primary",
  loading = false,
  delay = 0,
  ...props
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/50",
    secondary: "bg-gray-700 hover:bg-gray-600",
    danger: "bg-red-600 hover:bg-red-700 hover:shadow-red-500/50",
    success: "bg-green-600 hover:bg-green-700 hover:shadow-green-500/50",
  };

  return (
    <FadeIn delay={delay} duration={0.6}>
      <button
        onClick={onClick}
        disabled={loading}
        className={`px-6 py-3 ${variants[variant]} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2`}
        {...props}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Chargement...
          </>
        ) : (
          children
        )}
      </button>
    </FadeIn>
  );
};

/**
 * Composant pour animer les cartes cliquables
 */
export const AnimatedCard = ({
  children,
  onClick,
  delay = 0,
  hoverColor = "purple",
}) => {
  return (
    <FadeIn delay={delay} duration={0.8} direction="up">
      <div
        onClick={onClick}
        className={`bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl hover:border-${hoverColor}-500/50 transition-all duration-500 hover:scale-105 cursor-pointer`}
      >
        {children}
      </div>
    </FadeIn>
  );
};

/**
 * Composant pour animer les éléments d'activité
 */
export const AnimatedActivityItem = ({ children, index = 0 }) => {
  return (
    <FadeIn delay={0.4 + index * 0.15} duration={0.7} direction="left">
      {children}
    </FadeIn>
  );
};

/**
 * Composant pour animer les boutons d'action rapide
 */
export const AnimatedActionButton = ({ children, index = 0, ...props }) => {
  return (
    <FadeIn delay={0.5 + index * 0.12} duration={0.6} direction="up">
      <button {...props}>{children}</button>
    </FadeIn>
  );
};

export default {
  AnimatedPageWrapper,
  AnimatedHeader,
  AnimatedStatsCard,
  AnimatedTableRow,
  AnimatedModal,
  AnimatedMessage,
  AnimatedGrid,
  AnimatedSection,
  AnimatedButton,
  AnimatedCard,
  AnimatedActivityItem,
  AnimatedActionButton,
};
