import React from 'react';

export default function HasakiAIBotIcon({ size = 56, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 118 110"
      width={size}
      height={(size * 110) / 118}
      fill="none"
      className={`select-none pointer-events-none drop-shadow-md ${className}`}
    >
      {/* Outer circle with white fill & dark emerald green stroke */}
      <circle cx="53" cy="60" r="46" fill="#ffffff" stroke="#306e51" strokeWidth="3.5" />
      
      {/* Forehead Arc / Antenna line */}
      <path
        d="M 40 37 C 45 33, 61 33, 66 37"
        stroke="#306e51"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* 4-point golden sparkle star */}
      <path
        d="M 53 36 Q 53 43.5 45.5 43.5 Q 53 43.5 53 51 Q 53 43.5 60.5 43.5 Q 53 43.5 53 36 Z"
        fill="#ffbd59"
      />

      {/* Outer robot head with speech bubble beak at bottom */}
      <path
        d="M 36 53 L 70 53 A 12.5 12.5 0 0 1 82.5 65.5 A 12.5 12.5 0 0 1 70 78 L 54.5 78 L 49 84.5 L 46 78 L 36 78 A 12.5 12.5 0 0 1 23.5 65.5 A 12.5 12.5 0 0 1 36 53 Z"
        fill="#ffffff"
        stroke="#306e51"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />

      {/* Inner concentric capsule */}
      <rect
        x="29.5"
        y="58.5"
        width="47"
        height="14"
        rx="7"
        fill="none"
        stroke="#306e51"
        strokeWidth="2.2"
      />

      {/* Golden yellow round eyes */}
      <circle cx="42.5" cy="65.5" r="5" fill="#ffbd59" />
      <circle cx="63.5" cy="65.5" r="5" fill="#ffbd59" />

      {/* Top-Right AI Pill Badge with white stroke */}
      <rect
        x="56"
        y="4"
        width="56"
        height="34"
        rx="17"
        fill="#ffbd59"
        stroke="#ffffff"
        strokeWidth="3.5"
      />
      <text
        x="84"
        y="23"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontWeight="900"
        fontSize="18"
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        letterSpacing="0.5"
      >
        AI
      </text>
    </svg>
  );
}
