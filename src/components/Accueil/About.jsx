// src/components/Accueil/About.jsx
import React from "react";
import {
  FaCode,
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaCheckCircle,
  FaAward,
  FaGraduationCap,
} from "react-icons/fa";
import { FadeIn, ScaleIn, SlideIn } from "../Animations/Animations";

const About = () => {
  const user = {
    name: "Maryam Besbes",
    title: "Étudiante en Génie Logiciel & Développeuse Full-Stack",
    tagline:
      "Passionnée par le développement mobile, l'IA et les technologies modernes",

    mainDescription:
      "Étudiante en 3ᵉ année Génie Logiciel et Systèmes d'Information à l'Institut International de Technologie (IIT Sfax). Je suis passionnée par le développement mobile, la data et les technologies web. J'ai réalisé plusieurs projets personnels et professionnels en utilisant Flutter, React Native, Unity, Node.js et des outils d'analyse de données.",

    mission:
      "Mon objectif est de développer des solutions intuitives et performantes tout en améliorant constamment mes compétences dans le développement logiciel, l'IA et les technologies émergentes.",

    stats: {
      projects: 8,
      softSkills: [
        { skill: "Communication", value: "💬 90%" },
        { skill: "Créativité", value: "✨ 85%" },
        { skill: "Travail en équipe", value: "🤝 95%" },
      ],
    },

    features: [
      {
        icon: <FaCode className="text-3xl" />,
        title: "Développement polyvalent",
        description:
          "Expérience dans le développement mobile, web, data scraping et conception de jeux 2D avec Unity.",
      },
      {
        icon: <FaRocket className="text-3xl" />,
        title: "Progression rapide",
        description:
          "Capable d'apprendre et d'intégrer rapidement de nouvelles technologies en environnement professionnel.",
      },
      {
        icon: <FaUsers className="text-3xl" />,
        title: "Travail en équipe",
        description:
          "Excellentes compétences en communication et collaboration, acquises lors de stages et projets académiques.",
      },
      {
        icon: <FaLightbulb className="text-3xl" />,
        title: "Créativité & Innovation",
        description:
          "Je conçois des interfaces fluides, des solutions efficaces et j'optimise constamment mes projets.",
      },
    ],

    expertise: [
      "Développement mobile avec Flutter, React Native et Android Studio",
      "Création de jeux 2D sous Unity avec C#",
      "Développement web avec React, Node.js, Express.js",
      "Analyse de données et Web Scraping avec Python",
      "Développement de microservices et architectures REST",
      "Business Intelligence avec Power BI et Talend",
    ],

    values: [
      {
        title: "Responsabilité",
        description:
          "Je m'engage à fournir un travail sérieux, structuré et de qualité.",
      },
      {
        title: "Esprit d'équipe",
        description:
          "J'aime collaborer, partager mes connaissances et apprendre des autres.",
      },
      {
        title: "Ambition",
        description:
          "Je vise l'excellence et je cherche continuellement à relever de nouveaux défis.",
      },
    ],

    education: [
      {
        icon: <FaGraduationCap />,
        degree: "Licence en Génie Logiciel et Systèmes d'Information",
        school: "Institut International de Technologie – Sfax",
        year: "2023 → Présent",
      },
      {
        icon: <FaAward />,
        degree: "Baccalauréat Sciences Expérimentales",
        school: "Lycée Abou Kacem Chebbi – Sfax",
        year: "2023",
      },
    ],
  };

  return (
    <section
      id="about"
      className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 pt-24"
    >
      {/* HERO */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn delay={0.2}>
              <h2 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {user.tagline}
              </h2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="mt-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 sm:text-5xl">
                À propos de moi
              </p>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="mt-6 text-lg leading-8 text-gray-300 bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 shadow-lg">
                {user.mainDescription}
              </p>
            </FadeIn>
          </div>

          {/* STATS */}
          <FadeIn delay={0.8}>
            <div className="mx-auto mt-16 max-w-5xl">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <Stat
                  value={user.stats.projects + "+"}
                  label="Projets académiques"
                  delay={1}
                />
                {user.stats.softSkills.map((s, i) => (
                  <Stat
                    key={i}
                    value={s.value}
                    label={s.skill}
                    delay={1.1 + i * 0.1}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* FEATURES */}
      <div className="overflow-hidden py-24 sm:py-32 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn delay={0.2}>
              <h2 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Pourquoi moi ?
              </h2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="mt-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                Une développeuse motivée & polyvalente
              </p>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50">
                {user.mission}
              </p>
            </FadeIn>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {user.features.map((f, i) => (
                <ScaleIn key={i} delay={0.8 + i * 0.15}>
                  <div className="relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-500 border border-gray-700/50">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-purple-600 to-pink-600 text-white h-14 w-14 flex items-center justify-center rounded-full shadow-lg shadow-purple-500/50">
                      {f.icon}
                    </div>
                    <div className="pt-8 text-center">
                      <h3 className="font-bold text-xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {f.title}
                      </h3>
                      <p className="text-gray-300">{f.description}</p>
                    </div>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EXPERTISE */}
      <Section
        title="Mon Expertise"
        subtitle="Compétences Techniques & Domaines"
      >
        <div className="grid gap-5 max-w-3xl mx-auto">
          {user.expertise.map((skill, i) => (
            <SlideIn key={i} delay={i * 0.1} direction="left">
              <div className="flex items-start gap-4 bg-gray-800/50 backdrop-blur-xl p-7 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.01] transition-all duration-300 border border-gray-700/50">
                <FaCheckCircle className="text-purple-400 text-xl mt-1 flex-shrink-0" />
                <p className="text-gray-200 text-lg font-medium">{skill}</p>
              </div>
            </SlideIn>
          ))}
        </div>
      </Section>

      {/* VALUES */}
      <Section title="Mes Valeurs" subtitle="Principes qui guident mon travail">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {user.values.map((value, i) => (
            <FadeIn key={i} delay={i * 0.2} direction="up">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-500 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section title="Parcours Académique" subtitle="Formation & Diplômes">
        <div className="space-y-6 max-w-3xl mx-auto">
          {user.education.map((edu, i) => (
            <SlideIn key={i} delay={i * 0.2} direction="right">
              <div className="flex gap-6 bg-gray-800/50 backdrop-blur-xl p-7 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.01] transition-all duration-300 border border-gray-700/50">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center rounded-full text-2xl shadow-lg shadow-purple-500/50 flex-shrink-0">
                  {edu.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-300 mt-2 font-medium">{edu.school}</p>
                  <p className="text-purple-400 text-sm mt-1 font-medium">
                    {edu.year}
                  </p>
                </div>
              </div>
            </SlideIn>
          ))}
        </div>
      </Section>
    </section>
  );
};

const Stat = ({ value, label, delay = 0 }) => (
  <ScaleIn delay={delay}>
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 text-center hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-gray-700/50">
      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
        {value}
      </div>
      <div className="text-sm text-purple-300 font-medium">{label}</div>
    </div>
  </ScaleIn>
);

const Section = ({ title, subtitle, children }) => (
  <div className="py-24 sm:py-32 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <FadeIn delay={0.2}>
          <h2 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.4}>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mt-2">
            {subtitle}
          </p>
        </FadeIn>
      </div>
      {children}
    </div>
  </div>
);

export default About;
