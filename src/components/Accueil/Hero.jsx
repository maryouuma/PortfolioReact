import React from "react";
import { Link } from "react-router-dom";
import {
  FaRocket,
  FaPlay,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { Sparkles, Code, Zap } from "lucide-react";

const moi = "/assets/assets/moi.jpg";
import { FadeIn, ScaleIn, SlideIn } from "../Animations/Animations";

const Hero = () => {
  const user = {
    name: "BESBES Maryam",
    title: "Étudiante en Génie Logiciel & Développeuse Junior",
    tagline: "Je transforme mes idées en projets réels",
    description:
      "Passionnée par le développement mobile, les jeux vidéo et la création d'expériences digitales modernes. J'ai déjà réalisé plusieurs projets personnels, dont un jeu 2D sous Unity.",
    avatar: moi,

    stats: {
      projects: 5,
      clients: 100,
      support: "Motivée",
    },

    socials: {
      github: "https://github.com/maryouuma",
      linkedin: "https://www.linkedin.com/in/maryam-besbes-5471a1312/",
      email: "mailto:besbesmaryouma@gmail.com",
    },

    location: "Sfax, Tunisie",
  };

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 min-h-screen flex items-center pt-24 overflow-hidden"
    >
      {/* Effets de lumière d'ambiance */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <FadeIn delay={0.2} direction="down">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {user.location} • Étudiante motivée
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} direction="up">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="block text-gray-300">Bonjour, je suis</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mt-2">
                  {user.name}
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.6} direction="up">
              <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {user.title}
              </h2>
            </FadeIn>

            <FadeIn delay={0.8} direction="up">
              <p className="text-lg text-gray-400 max-w-xl bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl">
                {user.description}
              </p>
            </FadeIn>

            {/* Buttons */}
            <FadeIn delay={1} direction="up">
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/projects"
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <FaRocket className="group-hover:translate-y-[-2px] transition-transform" />
                  Voir mes projets
                </Link>

                <Link
                  to="/contact"
                  className="group border-2 border-purple-500 text-purple-400 px-8 py-4 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  <FaPlay className="group-hover:translate-x-1 transition-transform" />
                  Me contacter
                </Link>
              </div>
            </FadeIn>

            {/* Socials */}
            <FadeIn delay={1.2} direction="up">
              <div className="flex gap-4 pt-4">
                <a
                  href={user.socials.github}
                  className="group bg-gray-800 p-3 rounded-xl border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <FaGithub className="text-2xl text-gray-400 group-hover:text-purple-400" />
                </a>

                <a
                  href={user.socials.linkedin}
                  className="group bg-gray-800 p-3 rounded-xl border border-gray-700 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-2xl text-gray-400 group-hover:text-pink-400" />
                </a>

                <a
                  href={user.socials.email}
                  className="group bg-gray-800 p-3 rounded-xl border border-gray-700 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center"
                  title="Envoyer un email"
                >
                  <FaEnvelope className="text-2xl text-gray-400 group-hover:text-cyan-400" />
                </a>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={1.4} direction="up">
              <div className="flex gap-8 pt-8 border-t border-gray-700/50">
                {[
                  {
                    value: `${user.stats.projects}+`,
                    label: "Projets académiques & perso",
                  },
                  { value: `${user.stats.clients}%`, label: "Implication" },
                  { value: user.stats.support, label: "Motivation" },
                ].map((stat, index) => (
                  <ScaleIn key={index} delay={1.6 + index * 0.1}>
                    <div className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50">
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      <p className="text-gray-400 text-sm font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </ScaleIn>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Avatar */}
          <SlideIn delay={0.4} direction="right" duration={1}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>

              <div className="relative rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-700 hover:border-purple-500/50 hover:scale-[1.02] transition-all duration-500 hover:shadow-purple-500/50">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
              </div>

              {/* Décorations */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse"></div>
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
