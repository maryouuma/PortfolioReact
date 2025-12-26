import React from "react";
import { X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const { colors } = useTheme();

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`relative ${colors.bg.secondary} backdrop-blur-xl rounded-2xl border ${colors.border} max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture en haut à droite */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-colors hover:scale-110 shadow-lg"
        >
          <X className="w-6 h-6 text-gray-300 hover:text-white transition-colors" />
        </button>

        {/* Contenu du modal */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
