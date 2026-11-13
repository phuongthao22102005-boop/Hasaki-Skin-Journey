import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  MoreHorizontal, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Stethoscope, 
  Store, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import HasakiLogo from './HasakiLogo';
import { employeeAccounts } from '../data/employeeData';

export default function Screen2Login({ onLoginSuccess, onBackToSplash }) {
  const [accountType, setAccountType] = useState('customer'); // 'customer' | 'employee'
  
  // Customer Form State
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  // Employee Form State
  const [selectedEmployeePreset, setSelectedEmployeePreset] = useState(employeeAccounts[0].id);
  const [employeePassword, setEmployeePassword] = useState('hasaki@clinic2026');

  // Customer Login Handler
  const handleCustomerLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    let finalName = name.trim();
    let finalPass = password.trim();

    if (!finalName && !finalPass) {
      // Auto-populate for quick testing if user clicks Log In directly
      finalName = "TRỊNH PHƯƠNG THẢO";
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

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ 
        name: finalName,
        interfaceMode: 'customer'
      });
    }, 350);
  };

  // Employee Login Handler
  const handleEmployeeLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const targetEmployee = employeeAccounts.find((acc) => acc.id === selectedEmployeePreset) || employeeAccounts[0];

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: targetEmployee.name,
        interfaceMode: 'employee',
        employeeUser: targetEmployee
      });
    }, 350);
  };

  const fillQuickDemo = () => {
    setName('TRỊNH PHƯƠNG THẢO');
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

        <svg 
          className="absolute right-0 top-1/3 w-44 h-60 text-emerald-800/[0.04] transform translate-x-12 -rotate-12"
          viewBox="0 0 200 300" 
          fill="currentColor"
        >
          <path d="M50 0 C120 40 180 120 160 200 C140 280 60 260 20 220 C-20 180 0 80 50 0 Z" />
        </svg>
      </div>

      {/* Top Mobile Web Bar with Three Dots Menu */}
      <div className="relative w-full pt-4 px-5 flex justify-between items-center z-20">
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
            className="w-9 h-9 flex items-center justify-center rounded-full text-[#215a3e] hover:bg-emerald-900/10 transition-colors cursor-pointer"
            aria-label="Menu"
          >
            <MoreHorizontal className="w-7 h-7 stroke-[2.5]" />
          </button>

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
      <div className="relative w-full px-6 flex flex-col items-center z-10 my-auto py-3">
        {/* Hasaki Logo + Brand Name */}
        <div className="flex flex-col items-center mb-4">
          <HasakiLogo size={72} className="shadow-lg shadow-emerald-900/20" />
          <span className="mt-1.5 text-[#215a3e] font-bold text-[17px] tracking-tight">
            Hasaki.vn
          </span>
        </div>

        {/* Account Type Selector (Customer vs Employee) */}
        <div className="w-full max-w-[340px] mb-5 p-1 bg-emerald-950/10 backdrop-blur-md rounded-2xl flex items-center gap-1 border border-emerald-800/10">
          <button
            type="button"
            onClick={() => { setAccountType('customer'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              accountType === 'customer'
                ? 'bg-[#215a3e] text-white shadow-xs'
                : 'text-[#215a3e] hover:bg-white/50'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer Account</span>
          </button>

          <button
            type="button"
            onClick={() => { setAccountType('employee'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              accountType === 'employee'
                ? 'bg-[#215a3e] text-white shadow-xs'
                : 'text-[#215a3e] hover:bg-white/50'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Employee Portal</span>
          </button>
        </div>

        {/* CUSTOMER LOGIN FORM */}
        {accountType === 'customer' && (
          <div className="w-full max-w-[330px] flex flex-col items-center animate-in fade-in duration-200">
            <div className="text-center mb-5">
              <h1 className="text-[#215a3e] font-extrabold text-[28px] tracking-tight leading-none mb-1">
                Customer Login
              </h1>
              <p className="text-[#215a3e]/85 font-medium text-[14px]">
                Đăng nhập hành trình làn da của bạn
              </p>
            </div>

            <form onSubmit={handleCustomerLogin} className="w-full flex flex-col gap-3.5">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrorMsg(''); }}
                  placeholder="Họ và tên (VD: TRỊNH PHƯƠNG THẢO)"
                  className="w-full h-[50px] px-5 rounded-[14px] bg-[#8ea79a] text-slate-900 placeholder-white/85 text-[15px] font-medium tracking-wide focus:outline-hidden focus:ring-2 focus:ring-[#215a3e] transition-all shadow-inner"
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
                  placeholder="Mật khẩu"
                  className="w-full h-[50px] pl-5 pr-12 rounded-[14px] bg-[#8ea79a] text-slate-900 placeholder-white/85 text-[15px] font-medium tracking-wide focus:outline-hidden focus:ring-2 focus:ring-[#215a3e] transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

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
                className="w-full h-[50px] mt-1 rounded-[14px] bg-[#215a3e] hover:bg-[#1b4b33] active:scale-[0.98] text-white font-bold text-[17px] tracking-wide shadow-md shadow-emerald-950/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
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
                  <span>Log In (Khách hàng)</span>
                )}
              </button>
            </form>
          </div>
        )}

        {/* EMPLOYEE PORTAL LOGIN FORM */}
        {accountType === 'employee' && (
          <div className="w-full max-w-[340px] flex flex-col items-center animate-in fade-in duration-200">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#105e3f] text-[11px] font-black mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Nội Bộ Hasaki</span>
              </div>
              <h1 className="text-[#215a3e] font-extrabold text-[24px] tracking-tight leading-none">
                Employee Login
              </h1>
              <p className="text-[#215a3e]/85 font-medium text-[13px] mt-1">
                Dành cho Bác sĩ Clinic &amp; Nhân viên Retail
              </p>
            </div>

            {/* Quick Role Presets Selection */}
            <div className="w-full space-y-2 mb-4">
              <label className="text-[11.5px] font-bold text-slate-700 block">
                Chọn tài khoản nhân viên trực ca:
              </label>

              {/* Clinic Doctor Preset */}
              <button
                type="button"
                onClick={() => setSelectedEmployeePreset('HSK-DOC-01')}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  selectedEmployeePreset === 'HSK-DOC-01'
                    ? 'border-[#215a3e] bg-white ring-2 ring-[#215a3e]/20 shadow-xs'
                    : 'border-emerald-200/80 bg-white/70 hover:bg-white'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#105e3f] flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="flex-1 truncate">
                  <div className="font-extrabold text-xs text-slate-900 truncate">BS. CKI Vũ Hoài Nam</div>
                  <div className="text-[10.5px] text-emerald-700 font-semibold truncate">
                    Clinic Specialist / Doctor • Q7
                  </div>
                </div>
                {selectedEmployeePreset === 'HSK-DOC-01' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                )}
              </button>

              {/* Retail Consultant Preset */}
              <button
                type="button"
                onClick={() => setSelectedEmployeePreset('HSK-RET-08')}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  selectedEmployeePreset === 'HSK-RET-08'
                    ? 'border-[#215a3e] bg-white ring-2 ring-[#215a3e]/20 shadow-xs'
                    : 'border-emerald-200/80 bg-white/70 hover:bg-white'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div className="flex-1 truncate">
                  <div className="font-extrabold text-xs text-slate-900 truncate">Nguyễn Thùy Linh</div>
                  <div className="text-[10.5px] text-blue-700 font-semibold truncate">
                    Retail Skincare Consultant • Q10
                  </div>
                </div>
                {selectedEmployeePreset === 'HSK-RET-08' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                )}
              </button>
            </div>

            {/* Password Field for staff */}
            <div className="w-full relative mb-3">
              <input
                type="password"
                value={employeePassword}
                onChange={(e) => setEmployeePassword(e.target.value)}
                placeholder="Mật khẩu nhân viên"
                className="w-full h-[46px] px-4 rounded-[12px] bg-white border border-emerald-300 text-slate-900 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#215a3e]"
              />
            </div>

            {/* Employee Login Button */}
            <button
              type="button"
              onClick={handleEmployeeLogin}
              disabled={isLoading}
              className="w-full h-[48px] rounded-[14px] bg-[#105e3f] hover:bg-[#167850] active:scale-[0.98] text-white font-black text-sm tracking-wide shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isLoading ? (
                <span>Đang xác thực quyền nhân viên...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>VÀO EMPLOYEE INTERFACE</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Bottom Links */}
      <div className="relative w-full pb-6 px-8 flex flex-col items-center text-center z-10 gap-1 text-xs">
        <button
          onClick={() => alert('Vui lòng liên hệ IT Helpdesk hoặc hotline 1800 6324.')}
          className="text-[#215a3e] font-bold text-[13px] hover:underline underline-offset-2 transition-colors cursor-pointer"
        >
          Hỗ trợ tài khoản Hasaki
        </button>
        <a
          href="https://hasaki.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#215a3e] text-[12px] hover:underline underline-offset-2 opacity-90 transition-opacity"
        >
          www.hasaki.vn
        </a>
      </div>
    </div>
  );
}
