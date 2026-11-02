import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, Headphones, PhoneCall, PhoneOff, Mic, Volume2 } from 'lucide-react';

export default function ScreenHoTro({ onBackToHome }) {
  const [isCalling, setIsCalling] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (isCalling) {
      timer = setInterval(() => {
        setCallSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setCallSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isCalling]);

  const handleStartCall = () => {
    setIsCalling(true);
    // On actual mobile device, this also prompts phone dialer
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      window.location.href = 'tel:18006324';
    }
  };

  const formatTimer = (totalSec) => {
    const mins = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between bg-[#f2f6f3] select-none text-slate-800">
      
      {/* Main Content */}
      <div className="w-full flex-1 flex flex-col justify-between p-5 pb-12">
        
        {/* Top Navigation Bar matching Hình 3 */}
        <div className="flex items-center justify-between pt-2 pb-5">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-[#155238] font-bold text-[17px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.6]" />
            <span>Hỗ trợ khách hàng</span>
          </button>

          <button
            onClick={onBackToHome}
            className="text-[#155238] hover:opacity-80 transition-opacity p-1 cursor-pointer"
            aria-label="Trang chủ"
          >
            <Home className="w-6 h-6 stroke-[2.4]" />
          </button>
        </div>

        {/* Center / Middle Area */}
        <div className="my-auto flex flex-col items-center justify-center w-full px-2">
          
          {/* Main Action Button matching Hình 3 */}
          <button
            onClick={handleStartCall}
            className="w-full max-w-[340px] h-[72px] bg-[#0c6543] hover:bg-[#095236] active:scale-98 rounded-[18px] text-white flex items-center justify-center gap-4 shadow-md transition-all cursor-pointer"
          >
            {/* Headset Icon */}
            <Headphones className="w-10 h-10 stroke-[2] flex-shrink-0" />
            
            {/* Text info */}
            <div className="text-left">
              <div className="text-[14px] font-medium leading-tight opacity-95">
                Tổng đài CSKH
              </div>
              <div className="text-[24px] font-extrabold tracking-wide leading-none mt-1">
                1800 6324
              </div>
            </div>
          </button>

          <p className="text-xs text-slate-500 mt-3 text-center">
            Miễn phí 100% cước gọi • Hoạt động 8:00 - 22:00 hàng ngày
          </p>
        </div>

        {/* Bottom info spacer */}
        <div className="text-center text-xs text-slate-400">
          Hasaki Beauty & Clinic • Hỗ trợ tận tâm
        </div>

      </div>

      {/* ACTIVE CALLING MODAL (HIỆN "ĐANG GỌI" KHI BẤM) */}
      {isCalling && (
        <div className="absolute inset-0 z-50 bg-[#0a3a27]/95 backdrop-blur-md flex flex-col items-center justify-between p-8 text-white animate-fade-in">
          
          {/* Header */}
          <div className="text-center pt-8">
            <span className="inline-block px-3 py-1 bg-emerald-700/60 rounded-full text-xs font-semibold text-emerald-200 animate-pulse">
              Đang gọi...
            </span>
            <h2 className="text-2xl font-black mt-3">Tổng đài CSKH Hasaki</h2>
            <p className="text-emerald-100/80 text-lg font-mono mt-1">1800 6324</p>
            <p className="text-xs text-emerald-300/70 mt-1">Miễn phí cước cuộc gọi</p>
          </div>

          {/* Center Call Visual Avatar */}
          <div className="relative flex items-center justify-center my-auto">
            {/* Expanding pulse rings */}
            <div className="absolute w-36 h-36 rounded-full bg-emerald-500/20 animate-ping" />
            <div className="absolute w-48 h-48 rounded-full border border-emerald-400/20" />
            
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-xl">
              <Headphones className="w-12 h-12 text-emerald-300 animate-bounce" />
            </div>
          </div>

          {/* Call Timer & Controls */}
          <div className="w-full flex flex-col items-center pb-6">
            <div className="text-emerald-200 text-sm font-mono mb-8 font-semibold">
              Thời gian: {formatTimer(callSeconds)}
            </div>

            <div className="flex items-center gap-6 mb-8">
              <button 
                onClick={() => alert('Đã bật chế độ im lặng')}
                className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button 
                onClick={() => alert('Đã bật loa ngoài')}
                className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* End Call Button */}
            <button
              onClick={() => setIsCalling(false)}
              className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 shadow-xl flex items-center justify-center text-white transition-all cursor-pointer"
              title="Kết thúc cuộc gọi"
            >
              <PhoneOff className="w-7 h-7" />
            </button>
            <span className="text-xs text-rose-200 font-medium mt-2">Kết thúc</span>
          </div>

        </div>
      )}

    </div>
  );
}
