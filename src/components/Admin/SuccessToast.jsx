import React from "react";
import { CheckCircle, X, AlertCircle } from "lucide-react";
import { FadeIn } from "../Animations/Animations";

const SuccessToast = ({ message, onClose, type = "success" }) => {
  const isError = message.includes("❌") || type === "error";

  return (
    <FadeIn duration={0.4}>
      <div className="fixed top-6 right-6 z-[1000]">
        <div
          className={`${
            isError
              ? "bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50"
              : "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/50"
          } text-white px-6 py-4 rounded-xl flex items-center gap-3 min-w-[300px] max-w-sm animate-slideInRight`}
        >
          {isError ? (
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
          )}
          <p className="font-semibold flex-1 break-words">{message}</p>
          <button
            onClick={onClose}
            className="ml-2 hover:bg-white/20 p-1 rounded transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </FadeIn>
  );
};

export default SuccessToast;
