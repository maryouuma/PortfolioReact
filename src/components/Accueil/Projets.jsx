import React from "react";
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";

const Projets = () => {
  const user = {
    projects: [
      {
        id: 1,
        period: "Avril – Mai 2025",
        name: "Projet Académique / Personnel — Application Web de Gestion",
        description:
          "Développement d’une application web pour gérer utilisateurs, produits, commandes et rôles avec PHP & MySQL. Interface responsive avec HTML, CSS, JavaScript et Bootstrap.",
        achievements: [
          "Backend : PHP POO/procédural, gestion des sessions, CRUD complet pour toutes les entités",
          "Base de données : MySQL via XAMPP, création des tables et relations, clés primaires et étrangères",
          "Frontend : HTML, CSS, JS, Bootstrap pour design responsive et formulaires dynamiques",
          "Règles métier : Gestion des rôles (Admin/Employé), validation des données et gestion des stocks",
          "Tests : Fonctionnels sur toutes les entités et vérification de l’intégrité des données",
        ],
        technologies: [
          "PHP",
          "MySQL",
          "XAMPP",
          "HTML",
          "CSS",
          "JavaScript",
          "Bootstrap",
          "VS Code",
        ],
      },
      {
        id: 2,
        period: "Mai 2025",
        name: "Projet Académique / Professionnel — Système de Gestion de Pharmacie",
        description:
          "Backend complet en .NET C# avec base intégrée pour gérer patients, ordonnances, médicaments et pharmaciens. Gestion sécurisée des droits et règles métier.",
        achievements: [
          "Backend : C# .NET, DAO et ORM pour gestion des entités",
          "Base intégrée : LocalDB / SQL Server Express, relations et intégrité des données",
          "Règles métier : Authentification sécurisée, CRUD complet, validation des ordonnances, gestion des stocks",
          "Tests : Unitaires et fonctionnels, vérification de la cohérence des données",
        ],
        technologies: [
          "C# .NET",
          "Visual Studio 2022",
          "SQL Server Express / LocalDB",
          "DAO",
          "ORM",
          "Postman",
          "Git/GitHub",
        ],
      },
      {
        id: 3,
        period: "Mai 2025",
        name: "Projet académique — Jeu 2D “Dragon Runner”",
        description:
          "Développement d’un jeu 2D inspiré du dinosaure Google avec Unity et C#. Personnage animé, obstacles aléatoires et score dynamique.",
        achievements: [
          "Unity + C# : Programmation de la logique, collisions, animations, environnement dynamique",
          "Assets et animations : Création/importation des sprites, animations fluides",
          "Règles du jeu : Éviter les obstacles, score en temps réel, redémarrage automatique",
          "Tests : Simulation sur différentes résolutions, vérification collisions et score",
        ],
        technologies: ["Unity", "C#", "Visual Studio", "Git/GitHub"],
      },
      {
        id: 4,
        period: "Novembre – Décembre 2025",
        name: "Projet Académique – Gestion Académique avec Spring Boot & MySQL",
        description:
          "Backend complet pour gérer départements, enseignants, cours, étudiants et inscriptions via Spring Boot, MySQL et API REST sécurisée.",
        achievements: [
          "Configuration Spring Boot et connexion MySQL via XAMPP",
          "Modélisation entités : Département, Enseignant, Cours, Étudiant, Inscription et relations",
          "Backend : Services, Repositories, Controllers CRUD avec validation",
          "Tests : Fonctionnels via Postman et vérification des données",
        ],
        technologies: [
          "Spring Boot",
          "Java 17",
          "MySQL",
          "JPA/Hibernate",
          "XAMPP",
          "Postman",
          "Maven",
        ],
      },
      {
        id: 5,
        period: "Novembre – Décembre 2025",
        name: "Projet Académique — Application Mobile de Gestion RH",
        description:
          "Application mobile Flutter pour gestion RH connectée à SQL Server, avec suivi des employés, calendrier interactif et contrôle d’accès par rôle.",
        achievements: [
          "Frontend : Flutter, navigation, pages login/accueil, calendrier interactif, suivi des activités",
          "Backend : Node.js / Express, API REST pour employés, tâches et événements",
          "Base de données : SQL Server via SSMS, tables employé, tâches, événements, rôles",
          "Dashboard Admin : Vue quotidienne des tâches, gestion profils, accès sécurisé",
          "Tests : API et interactions Flutter, cohérence des données et navigation",
        ],
        technologies: [
          "Flutter",
          "Dart",
          "Node.js",
          "Express.js",
          "SQL Server",
          "SSMS",
          "VS Code",
          "Postman",
          "Git/GitHub",
        ],
      },
    ],
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 py-16 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="mb-12 scroll-mt-24 text-center"
          style={{ scrollMarginTop: "100px" }}
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700 mb-4">
            Mes Projets Académiques
          </h2>
          <p className="text-xl text-purple-700 max-w-3xl mx-auto font-medium">
            Découvrez mes réalisations académiques et personnelles, mettant en
            avant mes compétences techniques et pratiques.
          </p>
        </div>

        {/* Timeline / Projects */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-pink-500 shadow-lg"></div>

          <div className="space-y-12">
            {user.projects.map((proj, index) => (
              <div
                key={proj.id}
                className="relative grid md:grid-cols-2 gap-8 items-start"
              >
                {/* Date côté gauche/droite */}
                <div
                  className={`${
                    index % 2 === 0 ? "md:text-right" : "md:col-start-2"
                  }`}
                >
                  <div className="hidden md:block">
                    <div className="inline-block bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-pink-200">
                      <div className="flex items-center gap-2 font-semibold mb-2 justify-end text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                        <FaCalendar className="text-purple-500" />
                        <span>{proj.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Point central */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className="w-7 h-7 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full border-4 border-white shadow-lg shadow-purple-300"></div>
                </div>

                {/* Carte projet */}
                <div className={`${index % 2 === 0 ? "md:col-start-2" : ""}`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:scale-[1.02] transition-all duration-500 border border-pink-200/50 hover:border-purple-300/50 hover:shadow-2xl">
                    {/* Date mobile */}
                    <div className="md:hidden flex items-center gap-2 mb-5">
                      <div className="flex items-center gap-2 text-pink-600 font-semibold">
                        <FaCalendar />
                        <span>{proj.period}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-800 mb-3">
                      {proj.name}
                    </h3>
                    <p className="text-gray-700 mb-6 bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-100">
                      {proj.description}
                    </p>

                    <h4 className="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>{" "}
                      Réalisations clés
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {proj.achievements.map((a, i) => (
                        <li key={i} className="flex gap-3 text-gray-700">
                          <span className="text-purple-500 font-bold">✓</span>
                          <span className="flex-1">{a}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="mt-7 text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>{" "}
                      Technologies utilisées
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {proj.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white text-purple-700 rounded-full text-sm font-medium border border-purple-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projets;
