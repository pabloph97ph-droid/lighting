import React from 'react';

interface JumperMonogramProps {
  size?: number;
  className?: string;
}

export const JumperMonogram: React.FC<JumperMonogramProps> = ({ size = 28, className = '' }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none group ${className}`}
      style={{ width: size, height: size }}
      title="JUMPER"
    >
      {/* Background purple glow aura */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#C084FC] opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-300 pointer-events-none"
        style={{ transform: 'scale(1.15)' }}
      />

      {/* SVG Monogram J */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_2px_10px_rgba(168,85,247,0.65)]"
      >
        <defs>
          {/* Main energetic gradient */}
          <linearGradient id="jumperGrad" x1="4" y1="2" x2="32" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#D8B4FE" />
            <stop offset="60%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>

          {/* Border highlight gradient */}
          <linearGradient id="jumperBorder" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.8" />
          </linearGradient>

          {/* Subtle inner shadow filter */}
          <filter id="jumperGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#C084FC" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Squircle container background */}
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="10"
          fill="#0D0A17"
          stroke="url(#jumperBorder)"
          strokeWidth="1.2"
        />

        {/* Ambient inner soft glow */}
        <circle cx="18" cy="18" r="11" fill="#7C3AED" fillOpacity="0.22" />

        {/* The 'J' sculptural stroke: bold, fluid, modern, curved */}
        <path
          d="M21.5 8.5V21.5C21.5 24.8 18.8 27.5 15.5 27.5C12.4 27.5 9.8 25.1 9.6 22C9.5 21.2 10.2 20.5 11 20.5C11.8 20.5 12.4 21.1 12.6 21.8C12.8 23.3 14 24.5 15.5 24.5C17.2 24.5 18.5 23.2 18.5 21.5V8.5C18.5 7.7 19.2 7 20 7C20.8 7 21.5 7.7 21.5 8.5Z"
          fill="url(#jumperGrad)"
          filter="url(#jumperGlow)"
        />

        {/* Accent top horizontal notch on the J for distinct identity */}
        <path
          d="M17 9.2H24.5"
          stroke="#E9D5FF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />

        {/* Tiny energy spark dot */}
        <circle cx="24.5" cy="9.2" r="1.2" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
