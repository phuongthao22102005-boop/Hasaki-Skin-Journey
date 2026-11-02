import React from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';

export default function MobileWebLayout({ 
  children, 
  currentScreen, 
  onResetFlow,
  onJumpToScreen
}) {
  return (
    <div className="min-h-screen w-full bg-[#e2e8f0] flex flex-col items-center justify-start sm:py-5">
      
      {/* Discreet Development / Testing Navigation Bar */}
      <div className="w-full max-w-[430px] mb-2 px-3 py-1.5 flex items-center justify-between text-xs text-slate-600 bg-white/90 backdrop-blur-md rounded-xl shadow-xs border border-slate-200">
        <div className="flex items-center gap-1 font-medium overflow-x-auto no-scrollbar">
          <span className="text-emerald-700 font-bold flex items-center gap-1 pr-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Trang:
          </span>
          <button
            onClick={() => onJumpToScreen('screen1')}
            className={`px-1.5 py-0.5 rounded text-[11px] transition-colors whitespace-nowrap ${
              currentScreen === 'screen1' 
                ? 'bg-emerald-600 text-white font-semibold' 
                : 'hover:text-emerald-700'
            }`}
          >
            Splash
          </button>
          <span>&rarr;</span>
          <button
            onClick={() => onJumpToScreen('screen2')}
            className={`px-1.5 py-0.5 rounded text-[11px] transition-colors whitespace-nowrap ${
              currentScreen === 'screen2' 
                ? 'bg-emerald-600 text-white font-semibold' 
                : 'hover:text-emerald-700'
            }`}
          >
            Đăng nhập
          </button>
          <span>&rarr;</span>
          <button
            onClick={() => onJumpToScreen('screen3')}
            className={`px-1.5 py-0.5 rounded text-[11px] transition-colors whitespace-nowrap ${
              currentScreen === 'screen3' 
                ? 'bg-emerald-600 text-white font-semibold' 
                : 'hover:text-emerald-700'
            }`}
          >
            Trang chủ
          </button>
          <span>&rarr;</span>
          <button
            onClick={() => onJumpToScreen('screen_chutrinh')}
            className={`px-1.5 py-0.5 rounded text-[11px] transition-colors whitespace-nowrap ${
              currentScreen === 'screen_chutrinh' 
                ? 'bg-emerald-600 text-white font-semibold' 
                : 'hover:text-emerald-700'
            }`}
          >
            Chu trình da
          </button>
          <span>&rarr;</span>
          <button
            onClick={() => onJumpToScreen('screen_taikhoan')}
            className={`px-1.5 py-0.5 rounded text-[11px] transition-colors whitespace-nowrap ${
              currentScreen === 'screen_taikhoan' 
                ? 'bg-emerald-600 text-white font-semibold' 
                : 'hover:text-emerald-700'
            }`}
          >
            Tài khoản
          </button>
          <span>&rarr;</span>
          <button
            onClick={() => onJumpToScreen('screen_datlich')}
            className={`px-1.5 py-0.5 rounded text-[11px] transition-colors whitespace-nowrap ${
              currentScreen === 'screen_datlich' 
                ? 'bg-emerald-600 text-white font-semibold' 
                : 'hover:text-emerald-700'
            }`}
          >
            Đặt lịch
          </button>
          <span>&rarr;</span>
          <button
            onClick={() => onJumpToScreen('screen_tatcatienich')}
            className={`px-1.5 py-0.5 rounded text-[11px] transition-colors whitespace-nowrap ${
              currentScreen === 'screen_tatcatienich' 
                ? 'bg-emerald-600 text-white font-semibold' 
                : 'hover:text-emerald-700'
            }`}
          >
            Tất cả tiện ích
          </button>
        </div>

        <button
          onClick={onResetFlow}
          className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md transition-colors flex-shrink-0 ml-1 cursor-pointer"
          title="Chạy lại flow từ đầu"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Mobile Web Container (Exact mobile web screen, NO phone shell/frame) */}
      <main className="w-full sm:max-w-[430px] min-h-screen sm:min-h-[880px] sm:max-h-[92vh] bg-[#f4f8f5] sm:rounded-2xl sm:shadow-2xl sm:border sm:border-slate-300/60 overflow-hidden relative flex flex-col">
        {children}
      </main>

    </div>
  );
}
