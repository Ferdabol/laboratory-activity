import React from "react";

/**
 * WeatherButton Component
 * Reusable animated button with weather-themed styles
 *
 * Props:
 * - variant: "primary" | "secondary" | "danger" | "frost"
 * - icon: ReactNode (optional)
 * - children: text content
 * - onClick: function
 * - disabled: boolean
 */

const WeatherButton = ({
  variant = "primary",
  icon: Icon,
  children,
  onClick,
  disabled = false,
}) => {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md backdrop-blur-md border select-none transform";

  const variants = {
    primary:
      "bg-gradient-to-r from-sky-400 to-sky-600 text-white border-sky-300 hover:from-sky-500 hover:to-sky-700 hover:shadow-sky-400/60",
    secondary:
      "bg-white/30 text-sky-900 border-white/40 hover:bg-white/50 hover:text-sky-800 hover:shadow-md",
    frost:
      "bg-white/20 text-sky-900 border-white/30 hover:bg-white/40 hover:shadow-sky-300/30",
    danger:
      "bg-gradient-to-r from-rose-400 to-red-600 text-white border-red-300 hover:from-rose-500 hover:to-red-700 hover:shadow-rose-400/50",
  };

  const hoverEffects =
    "hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:scale-95 active:translate-y-0";

  const glowPulse =
    variant === "primary"
      ? "hover:animate-pulse-glow"
      : variant === "danger"
      ? "hover:animate-pulse-glow-red"
      : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${hoverEffects} ${glowPulse} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {Icon && <span className="text-lg">{Icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default WeatherButton;
