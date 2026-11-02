import React, { useEffect, useState } from 'react';
import HasakiLogo from './HasakiLogo';

export default function Screen1Splash({ onFinish }) {
  const [timeLeft, setTimeLeft] = useState(1.0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1000; // Exact 1 second as requested

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, (duration - elapsed) / 1000);
      setTimeLeft(remaining);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsTransitioning(true);
        setTimeout(() => {
          onFinish();
        }, 180);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div 
      className={`relative w-full h-full min-h-[680px] flex flex-col items-center justify-between overflow-hidden bg-[#f4f8f5] select-none transition-all duration-300 ${
        isTransitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(200, 230, 214, 0.45) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(180, 220, 200, 0.4) 0%, transparent 45%),
          radial-gradient(circle at 50% 50%, #ffffff 0%, #f0f7f3 100%)
        `
      }}
    >
      {/* Background organic curves and leaf silhouettes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg 
          className="absolute -top-10 -left-10 w-[140%] h-[50%] text-emerald-700/10" 
          viewBox="0 0 500 300" 
          fill="none"
        >
          <path 
            d="M 0 100 C 150 160, 300 20, 500 120 L 500 0 L 0 0 Z" 
            fill="currentColor" 
          />
          <path 
            d="M -50 180 C 120 220, 280 80, 550 190" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            fill="none" 
          />
        </svg>

        {/* Botanical leaf silhouettes */}
        <svg 
          className="absolute right-0 top-1/4 w-48 h-64 text-emerald-800/[0.04] transform translate-x-12 -rotate-12"
          viewBox="0 0 200 300" 
          fill="currentColor"
        >
          <path d="M50 0 C120 40 180 120 160 200 C140 280 60 260 20 220 C-20 180 0 80 50 0 Z" />
        </svg>

        <svg 
          className="absolute -left-10 bottom-24 w-56 h-72 text-emerald-800/[0.04] transform -rotate-45"
          viewBox="0 0 200 300" 
          fill="currentColor"
        >
          <path d="M50 0 C120 40 180 120 160 200 C140 280 60 260 20 220 C-20 180 0 80 50 0 Z" />
        </svg>

        <svg 
          className="absolute -bottom-10 -left-10 w-[140%] h-[40%] text-emerald-700/10" 
          viewBox="0 0 500 300" 
          fill="none"
        >
          <path 
            d="M 0 220 C 180 140, 320 280, 500 180 L 500 300 L 0 300 Z" 
            fill="currentColor" 
          />
        </svg>
      </div>

      {/* Mobile Web Header Info */}
      <div className="w-full pt-6 px-6 flex justify-between items-center z-10">
        <div className="text-[12px] font-bold text-[#215a3e] tracking-wider uppercase">
          Hasaki Skin Journey
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-900/10 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-medium text-emerald-900">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
          <span>Tự chuyển sau 1s</span>
        </div>
      </div>

      {/* Center Hasaki Logo */}
      <div className="flex flex-col items-center justify-center z-10 my-auto">
        <div 
          className="animate-fade-in relative cursor-pointer active:scale-95 transition-transform" 
          onClick={onFinish}
          title="Nhấn để chuyển tiếp ngay"
        >
          <HasakiLogo size={100} className="shadow-2xl shadow-emerald-900/25" />
          <div className="absolute -inset-2 rounded-[28px] border border-emerald-600/20 animate-pulse pointer-events-none" />
        </div>
      </div>

      {/* Bottom Slogan */}
      <div className="w-full pb-10 px-8 flex flex-col items-center text-center z-10">
        <h2 className="text-[#215a3e] font-extrabold text-[20px] tracking-tight leading-snug">
          Your Skin Journey will be took care!
        </h2>

        {/* 1-second Countdown Progress Bar */}
        <div className="w-48 h-1 bg-emerald-950/10 rounded-full mt-4 overflow-hidden">
          <div 
            className="h-full bg-[#215a3e] rounded-full transition-all duration-75 ease-linear"
            style={{ width: `${((1 - timeLeft) * 100).toFixed(0)}%` }}
          />
        </div>

        <button
          onClick={onFinish}
          className="mt-3 text-[12px] font-medium text-emerald-800/70 hover:text-emerald-950 underline underline-offset-2 transition-colors cursor-pointer"
        >
          Nhấn để qua hình 2 ngay &rarr;
        </button>
      </div>
    </div>
  );
}
