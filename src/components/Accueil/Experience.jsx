import React from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
} from "lucide-react";
const businessImage = "/assets/assets/business.jpg";
const sparkImage = "/assets/assets/spark.jpeg";
const iitImage = "/assets/assets/iit.png";
const cvPdf = "/assets/CV_Maryam_BESBES.pdf";
import { FadeIn, ScaleIn, SlideIn } from "../Animations/Animations";

const Experience = () => {
  const user = {
    name: "Maryam Besbes",
    title: "Développeuse Mobile & Full-Stack",
    email: "besbesmaryouma66@gmail.com",
    phone: "+216 95 575 561",
    location: "Sfax, Tunisie",
    experience: "Étudiante",
    availability: "Disponible pour stage ou emploi",
    bio: "Étudiante en 3ème année Génie Logiciel & Systèmes d'Information, passionnée par le développement mobile, l'IA et les nouvelles technologies. Expérience dans Flutter, React Native, SQL Server, Node.js et Unity.",

    experiences: [
      {
        id: 1,
        period: "Juillet 2025",
        role: "Stagiaire en Développement Mobile",
        company: "Business Software",
        location: "Sfax",
        type: "Stage d'été – 2ème année",
        description:
          "Développement d'une application mobile complète pour scanner des produits, gérer un panier et valider des commandes, connectée à un backend Node.js/Express et une base de données SQL Server.",
        achievements: [
          "Frontend Mobile : React Native CLI, React Navigation, scan de codes-barres",
          "Backend / Serveur : Node.js + Express, structuré en MVC",
          "Base de données : SQL Server via SSMS, optimisation des requêtes",
          "Interface Web Admin : Dashboard pour gérer articles et employés",
          "Tests : API via Postman, tests réels sur smartphone",
        ],
        technologies: [
          "React Native CLI",
          "Node.js",
          "Express.js",
          "SQL Server",
          "Postman",
        ],
        image: businessImage,
      },
      {
        id: 2,
        period: "Août 2024",
        role: "Stagiaire en Web Scraping",
        company: "Spark IT",
        location: "Sfax",
        type: "Stage d'été – 1ère année",
        description:
          "Stage d'été en Web Scraping visant à automatiser l'extraction et le traitement de données depuis plusieurs sites web.",
        achievements: [
          "Développement d'outils d'extraction automatisée avec Python",
          "Analyse et structuration des données collectées",
          "Optimisation du code pour améliorer la rapidité",
          "Vérification de l'exactitude des données collectées",
        ],
        technologies: [
          "Python",
          "BeautifulSoup",
          "Selenium",
          "Scrapy",
          "Pandas",
        ],
        image: sparkImage,
      },
      {
        id: 3,
        period: "Août 2025",
        role: "Stagiaire Communication & Administration",
        company: "Institut International de Technologie (IIT)",
        location: "Sfax",
        type: "Stage professionnel",
        description:
          "Participation au département communication et gestion administrative.",
        achievements: [
          "Gestion des publications institutionnelles",
          "Organisation et classement des dossiers internes",
          "Contribution à la visibilité des événements",
          "Support aux équipes pour la communication digitale",
        ],
        technologies: ["Communication", "Organisation", "Marketing Digital"],
        image: iitImage,
      },
    ],

    cv: {
      name: "Mon CV",
      description: "Curriculum Vitae complet",
      url: cvPdf,
    },
  };

  return (
    <section
      id="parcours-professionnel"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-16 pt-24"
    >
      {/* Effets lumineux */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <FadeIn delay={0.2}>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Mon Parcours Professionnel
            </h2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
              {user.experience} d'expérience en développement mobile, web et
              projets logiciels.
            </p>
          </FadeIn>
        </div>

        {/* Info Card */}
        <FadeIn delay={0.6}>
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12 border border-gray-700/50">
            <div className="grid md:grid-cols-2 gap-8">
              <SlideIn delay={0.8} direction="left">
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                    {user.name}
                  </h3>
                  <p className="text-xl font-semibold text-gray-300 mb-5">
                    {user.title}
                  </p>
                  <p className="text-gray-400 leading-relaxed bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
                    {user.bio}
                  </p>
                </div>
              </SlideIn>

              <SlideIn delay={1} direction="right">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300 bg-gray-900/50 p-3 rounded-xl border border-gray-700/50">
                    <MapPin className="text-purple-400 text-lg" />
                    <span className="font-medium">{user.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 bg-gray-900/50 p-3 rounded-xl border border-gray-700/50">
                    <span className="text-purple-400 text-lg">📧</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 bg-gray-900/50 p-3 rounded-xl border border-gray-700/50">
                    <span className="text-purple-400 text-lg">📱</span>
                    <span className="font-medium">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-xl border border-purple-500/30">
                    <Briefcase className="text-purple-400 text-lg" />
                    <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {user.availability}
                    </span>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-purple-500/50"></div>

          <div className="space-y-12">
            {user.experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="relative grid md:grid-cols-2 gap-8 items-start"
              >
                {/* Date */}
                <div
                  className={`${
                    index % 2 === 0 ? "md:text-right" : "md:col-start-2"
                  }`}
                >
                  <FadeIn
                    delay={1.2 + index * 0.2}
                    direction={index % 2 === 0 ? "right" : "left"}
                  >
                    <div className="hidden md:block">
                      <div className="inline-block bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-gray-700/50">
                        <div className="flex items-center gap-2 font-semibold mb-2 justify-end bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          <Calendar className="text-purple-400" />
                          <span>{exp.period}</span>
                        </div>
                        <p className="text-sm text-gray-400 font-medium">
                          {exp.type}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                </div>

                {/* Point */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <ScaleIn delay={1.2 + index * 0.2}>
                    <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full border-4 border-gray-900 shadow-lg shadow-purple-500/50"></div>
                  </ScaleIn>
                </div>

                {/* Card */}
                <div className={`${index % 2 === 0 ? "md:col-start-2" : ""}`}>
                  <ScaleIn delay={1.2 + index * 0.2}>
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 hover:scale-[1.02] transition-all duration-500 border border-gray-700/50 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={exp.image}
                          alt={exp.company}
                          className="w-20 h-20 rounded-xl object-cover border-2 border-gray-700 shadow-md"
                        />

                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {exp.role}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 text-gray-400 mb-5">
                        <Briefcase className="text-purple-400" />
                        <span className="font-semibold text-gray-300">
                          {exp.company}
                        </span>
                        <span className="text-purple-400">•</span>
                        <MapPin className="text-purple-400 w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>

                      <p className="text-gray-400 mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
                        {exp.description}
                      </p>

                      <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Réalisations clés
                      </h4>

                      <ul className="space-y-2.5 mb-6">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex gap-3 text-gray-400">
                            <CheckCircle className="text-purple-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span className="flex-1">{ach}</span>
                          </li>
                        ))}
                      </ul>

                      <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        Technologies utilisées
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-500/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScaleIn>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CV Section */}
        <FadeIn delay={1.8}>
          <div className="mt-16 bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700/50">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 flex items-center gap-3">
              <FileText className="text-purple-400" /> Mon CV
            </h3>

            <div className="py-7 px-5 hover:bg-gray-900/30 transition-all duration-300 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-6 items-center">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center shadow-lg">
                    <FileText className="text-purple-400 text-2xl" />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-200">
                      {user.cv.name}
                    </h4>
                    <p className="text-sm text-gray-400 font-medium">
                      {user.cv.description}
                    </p>
                  </div>
                </div>

                <a
                  href={user.cv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 font-semibold"
                >
                  <FileText className="w-5 h-5" /> Voir mon CV
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Experience;
