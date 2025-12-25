// src/components/Animations/Animations.jsx
import React, { useEffect, useRef, useState } from "react";

// Hook personnalisé pour détecter quand un élément entre dans le viewport
export const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Une fois visible, on arrête d'observer (animation une seule fois)
          if (options.once !== false) {
            observer.disconnect();
          }
        } else if (options.once === false) {
          setIsInView(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return [ref, isInView];
};

// Composant FadeIn - Apparition en fondu
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
}) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const directions = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${
        isInView
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${directions[direction]}`
      }`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Composant ScaleIn - Apparition avec zoom
export const ScaleIn = ({ children, delay = 0, duration = 0.6 }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all ${
        isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Composant SlideIn - Apparition en glissement
export const SlideIn = ({
  children,
  delay = 0,
  duration = 0.8,
  direction = "left",
}) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const directions = {
    left: "-translate-x-full",
    right: "translate-x-full",
    up: "translate-y-full",
    down: "-translate-y-full",
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${
        isInView
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${directions[direction]}`
      }`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Composant RotateIn - Apparition avec rotation
export const RotateIn = ({ children, delay = 0, duration = 0.8 }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all ${
        isInView ? "opacity-100 rotate-0" : "opacity-0 -rotate-12"
      }`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Composant StaggerContainer - Pour animer plusieurs éléments avec décalage
export const StaggerContainer = ({ children, staggerDelay = 0.1 }) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <FadeIn delay={index * staggerDelay}>{child}</FadeIn>
      ))}
    </>
  );
};

export default {
  FadeIn,
  ScaleIn,
  SlideIn,
  RotateIn,
  StaggerContainer,
  useInView,
};
