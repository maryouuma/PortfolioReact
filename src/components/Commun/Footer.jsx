import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  MapPin,
  Phone,
  Code,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = {
    github: "https://github.com/maryouuma",
    linkedin: "https://www.linkedin.com/in/maryam-besbes-5471a1312/",
    email: "mailto:besbesmaryouma@gmail.com",
  };

  const quickLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Expérience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Développement Mobile",
    "Développement Web",
    "UI/UX Design",
    "Web Scraping",
  ];

  return (
    <footer className="relative bg-gray-900 text-gray-300 border-t border-gray-800 mt-20 overflow-hidden">
      {/* Effets de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                BESBES Maryam
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Étudiante en Génie Logiciel & Développeuse Full-Stack passionnée
              par les technologies modernes et l'innovation.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href={socialLinks.email}
                className="group w-10 h-10 bg-gray-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-400">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Localisation</p>
              <p className="text-gray-300 font-medium">Sfax, Tunisie</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500/10 border border-pink-500/30 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Email</p>
              <a
                href="mailto:besbesmaryouma@gmail.com"
                className="text-gray-300 hover:text-pink-400 transition-colors font-medium"
              >
                besbesmaryouma66@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Téléphone</p>
              <a
                href="tel:+21695575561"
                className="text-gray-300 hover:text-cyan-400 transition-colors font-medium"
              >
                +216 95 575 561
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <span>© {currentYear} BESBES Maryam</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              Made with{" "}
              <Heart className="w-4 h-4 text-pink-500 animate-pulse" /> in Sfax
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg font-medium">
              Développeuse Full-Stack
            </span>
            <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg font-medium text-emerald-400">
              Disponible
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
