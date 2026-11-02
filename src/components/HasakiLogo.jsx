import React from 'react';

export default function HasakiLogo({ size = 80, className = "" }) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-[20px] overflow-hidden flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/images/hasaki_logo.png"
        alt="Hasaki Logo"
        className="w-full h-full object-contain drop-shadow-sm select-none"
        onError={(e) => {
          // Fallback if image fails
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}
