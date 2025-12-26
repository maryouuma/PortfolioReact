import React from "react";
import { X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ScaleIn } from "../Animations/Animations";

const Modal = ({ isOpen, onClose, children }) => {
  const { colors } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <ScaleIn duration={0.4}>
        <div
          className={`${colors.bg.secondary} backdrop-blur-xl rounded-2xl border ${colors.border} max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton de fermeture en haut à droite */}
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={onClose}
              className={`p-2 ${colors.bg.tertiary} hover:bg-gray-700 rounded-full transition-colors hover:scale-110 shadow-lg`}
            >
              <X
                className={`w-6 h-6 ${colors.text.secondary} hover:text-white transition-colors`}
              />
            </button>
          </div>

          {/* Contenu du modal */}
          <div className="p-6">{children}</div>
        </div>
      </ScaleIn>
    </div>
  );
};

export default Modal;
