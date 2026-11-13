import React from 'react';
import { RotateCcw, Sparkles, User, Stethoscope, ArrowLeftRight } from 'lucide-react';

export default function MobileWebLayout({ 
  children, 
  currentScreen, 
  onResetFlow,
  onJumpToScreen,
  interfaceMode = 'customer',
  onToggleInterfaceMode
}) {
  const isEmployee = interfaceMode === 'employee';

  return (
    <div className="min-h-screen w-full bg-[#e2e8f0] flex flex-col items-center justify-start sm:py-4 px-2 sm:px-4">
      
      {/* Top Universal Mode Switcher & Development Bar */}
      <div className={`w-full ${isEmployee ? 'max-w-7xl' : 'max-w-[430px]'} mb-2.5 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700 bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 transition-all duration-300`}>
        
        {/* Left: Mode Switcher Button */}
        <div className="flex items-center gap-2">
          {onToggleInterfaceMode && (
            <button
              type="button"
              onClick={onToggleInterfaceMode}
              className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isEmployee
                  ? 'bg-[#105e3f] text-white hover:bg-[#167850]'
                  : 'bg-emerald-100 text-[#105e3f] hover:bg-emerald-200'
              }`}
              title="Chuyển đổi tức thì giữa Giao diện Khách hàng & Cổng Nhân viên"
            >
              {isEmployee ? (
                <>
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Cổng Nhân viên Hasaki</span>
                  <ArrowLeftRight className="w-3 h-3 text-emerald-200 ml-1" />
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-[#105e3f]" />
                  <span>Giao diện Khách hàng</span>
                  <ArrowLeftRight className="w-3 h-3 text-emerald-600 ml-1" />
                </>
              )}
            </button>
          )}

          <span className="hidden sm:inline-block text-[11px] text-gray-400 font-medium">
            {isEmployee ? '• Portal Bác sĩ & Tư vấn viên' : '• Ứng dụng Khách hàng'}
          </span>
        </div>

        {/* Right: Quick Page Nav & Reset */}
        <div className="flex items-center gap-2">
          {!isEmployee && (
            <div className="hidden md:flex items-center gap-1 font-medium overflow-x-auto no-scrollbar">
              <span className="text-emerald-700 font-bold flex items-center gap-1 pr-1 text-[11px]">
                <Sparkles className="w-3 h-3 text-emerald-600" />
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
                Login
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
                Home
              </button>
              <span>&rarr;</span>
              <button
                onClick={() => onJumpToScreen('screen_hosoda')}
                className={`px-1.5 py-0.5 rounded text-[11px] transition-colors whitespace-nowrap ${
                  currentScreen === 'screen_hosoda' 
                    ? 'bg-emerald-600 text-white font-semibold' 
                    : 'hover:text-emerald-700'
                }`}
              >
                Hồ sơ da
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
            </div>
          )}

          <button
            onClick={onResetFlow}
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-xl transition-colors flex-shrink-0 cursor-pointer border border-emerald-200"
            title="Chạy lại flow từ Splash 1s"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Flow</span>
          </button>
        </div>
      </div>

      {/* Main Container: Adapts dynamically based on interface mode */}
      <main className={`w-full ${
        isEmployee 
          ? 'max-w-7xl min-h-[850px] max-h-[92vh] bg-[#f8faf8] rounded-3xl shadow-2xl border border-slate-300/80 overflow-hidden' 
          : 'sm:max-w-[430px] min-h-screen sm:min-h-[880px] sm:max-h-[92vh] bg-[#f4f8f5] sm:rounded-2xl sm:shadow-2xl sm:border sm:border-slate-300/60 overflow-hidden'
      } relative flex flex-col transition-all duration-300`}>
        {children}
      </main>

    </div>
  );
}
