import React, { useState } from 'react';
import { Eye, EyeOff, MoreHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';
import HasakiLogo from './HasakiLogo';

export default function Screen2Login({ onLoginSuccess, onBackToSplash }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    let finalName = name.trim();
    let finalPass = password.trim();

    if (!finalName && !finalPass) {
      // Auto-populate for quick testing if user clicks Log In directly
      finalName = "Nguyễn Văn A";
      finalPass = "hasaki2026";
      setName(finalName);
      setPassword(finalPass);
    } else if (!finalName) {
      setErrorMsg('Vui lòng nhập tên đăng nhập');
      return;
    } else if (!finalPass) {
      setErrorMsg('Vui lòng nhập mật khẩu');
      return;
    }

    setIsLoading(true);

    // Smooth transition to screen 3
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ name: finalName });
    }, 350);
  };

  const fillQuickDemo = () => {
    setName('Nguyễn Văn A');
    setPassword('Hasaki@2026');
    setShowMenu(false);
  };

  return (
    <div 
      className="relative w-full h-full min-h-[680px] flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#f4f8f5] select-none text-slate-800"
      style={{
        backgroundImage: `
          radial-gradient(circle at 15% 15%, rgba(200, 230, 214, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 85% 85%, rgba(180, 220, 200, 0.35) 0%, transparent 45%),
          radial-gradient(circle at 50% 50%, #ffffff 0%, #f0f7f3 100%)
        `
      }}
    >
      {/* Background organic curves and leaf silhouettes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg 
          className="absolute -top-12 -left-10 w-[140%] h-[45%] text-emerald-700/10" 
          viewBox="0 0 500 300" 
          fill="none"
        >
          <path 
            d="M 0 80 C 140 180, 290 30, 500 130 L 500 0 L 0 0 Z" 
            fill="currentColor" 
          />
          <path 
            d="M -50 170 C 130 220, 290 80, 550 180" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            fill="none" 
          />
        </svg>

        {/* Botanical leaf silhouettes */}
        <svg 
          className="absolute right-0 top-1/3 w-44 h-60 text-emerald-800/[0.04] transform translate-x-12 -rotate-12"
          viewBox="0 0 200 300" 
          fill="currentColor"
        >
          <path d="M50 0 C120 40 180 120 160 200 C140 280 60 260 20 220 C-20 180 0 80 50 0 Z" />
        </svg>

        <svg 
          className="absolute -left-12 bottom-28 w-52 h-68 text-emerald-800/[0.04] transform -rotate-45"
          viewBox="0 0 200 300" 
          fill="currentColor"
        >
          <path d="M50 0 C120 40 180 120 160 200 C140 280 60 260 20 220 C-20 180 0 80 50 0 Z" />
        </svg>
      </div>

      {/* Top Mobile Web Bar with Three Dots Menu */}
      <div className="relative w-full pt-5 px-5 flex justify-between items-center z-20">
        <button
          onClick={onBackToSplash}
          className="text-xs font-semibold text-emerald-800/70 hover:text-emerald-950 flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-emerald-800/10"
          title="Xem lại hình 1 (Splash 1s)"
        >
          &larr; Xem lại hình 1
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[#215a3e] hover:bg-emerald-900/10 transition-colors"
            aria-label="Menu"
          >
            <MoreHorizontal className="w-7 h-7 stroke-[2.5]" />
          </button>

          {/* Quick Menu Dropdown */}
          {showMenu && (
            <div className="absolute right-0 top-10 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100 py-2 z-50 text-xs font-medium text-slate-700 animate-fade-in">
              <button 
                onClick={fillQuickDemo}
                className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-800 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Điền mẫu nhanh
              </button>
              <button 
                onClick={() => { setShowMenu(false); alert('Vui lòng liên hệ hotline 1800 6324 hoặc truy cập www.hasaki.vn'); }}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Quên mật khẩu?
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full px-7 flex flex-col items-center z-10 my-auto py-4">
        {/* Hasaki Logo + Brand Name */}
        <div className="flex flex-col items-center mb-8">
          <HasakiLogo size={84} className="shadow-lg shadow-emerald-900/20" />
          <span className="mt-2 text-[#215a3e] font-bold text-[18px] tracking-tight">
            Hasaki.vn
          </span>
        </div>

        {/* Login Titles */}
        <div className="text-center mb-8">
          <h1 className="text-[#215a3e] font-extrabold text-[32px] tracking-tight leading-none mb-1.5">
            Login
          </h1>
          <p className="text-[#215a3e]/85 font-medium text-[16px]">
            Sign in to continue
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="w-full max-w-[320px] flex flex-col gap-4">
          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrorMsg(''); }}
              placeholder="Name"
              className="w-full h-[52px] px-6 rounded-[14px] bg-[#8ea79a] text-slate-900 placeholder-white/85 text-[16px] font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-[#215a3e] transition-all shadow-inner"
            />
            {name && (
              <button
                type="button"
                onClick={() => setName('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-xs bg-black/20 w-5 h-5 rounded-full flex items-center justify-center"
              >
                &times;
              </button>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
              placeholder="Password"
              className="w-full h-[52px] pl-6 pr-12 rounded-[14px] bg-[#8ea79a] text-slate-900 placeholder-white/85 text-[16px] font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-[#215a3e] transition-all shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Validation or Error Message */}
          {errorMsg && (
            <p className="text-rose-600 text-xs font-semibold px-2 animate-fade-in flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {errorMsg}
            </p>
          )}

          {/* Log In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[52px] mt-1 rounded-[14px] bg-[#215a3e] hover:bg-[#1b4b33] active:scale-[0.98] text-white font-bold text-[18px] tracking-wide shadow-md shadow-emerald-950/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Đang đăng nhập...</span>
              </>
            ) : (
              <span>Log In</span>
            )}
          </button>
        </form>
      </div>

      {/* Bottom Links */}
      <div className="relative w-full pb-8 px-8 flex flex-col items-center text-center z-10 gap-1">
        <button
          onClick={() => alert('Chức năng Quên Mật Khẩu: Bạn có thể nhập mã OTP được gửi về số điện thoại đã đăng ký Hasaki.')}
          className="text-[#215a3e] font-bold text-[14px] hover:underline underline-offset-2 transition-colors cursor-pointer"
        >
          Forgot Password
        </button>
        <a
          href="https://hasaki.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#215a3e] text-[13px] hover:underline underline-offset-2 opacity-90 transition-opacity"
        >
          www.hasaki.vn
        </a>
      </div>
    </div>
  );
}
