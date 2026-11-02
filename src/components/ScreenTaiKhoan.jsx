import React, { useState } from 'react';
import { 
  User, 
  KeyRound, 
  Lock, 
  Bell, 
  FileText, 
  ShieldCheck, 
  ClipboardCheck, 
  Smartphone, 
  Globe, 
  LogOut, 
  ChevronRight, 
  X, 
  Check, 
  Home, 
  Calendar, 
  Bot, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import HasakiLogo from './HasakiLogo';
import HasakiAIBotIcon from './HasakiAIBotIcon';

export default function ScreenTaiKhoan({ 
  user = { name: 'Nguyễn Văn A', gender: 'Nam' }, 
  onUpdateUser,
  onLogout, 
  onNavigateHome, 
  onNavigateHoSoDa,
  onNavigateAIChat,
  onNavigateDatLich,
  onNavigateThongBao
}) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'info' | 'password' | 'passcode' | 'terms' | 'privacy' | 'rules' | 'version' | 'language' | 'logoutConfirm'
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('vi');

  // Edit personal info state
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [infoForm, setInfoForm] = useState({
    name: user?.name || 'Nguyễn Văn A',
    gender: user?.gender || 'Nam',
    phone: user?.phone || '0876543299',
    email: user?.email || 'khachhang@hasaki.vn',
    birthDate: user?.birthDate || '15/08/1998'
  });
  const [infoSuccess, setInfoSuccess] = useState(false);

  // Sync form when user changes or modal opens
  React.useEffect(() => {
    if (user) {
      setInfoForm({
        name: user.name || 'Nguyễn Văn A',
        gender: user.gender || 'Nam',
        phone: user.phone || '0876543299',
        email: user.email || 'khachhang@hasaki.vn',
        birthDate: user.birthDate || '15/08/1998'
      });
    }
  }, [user, activeModal]);

  const handleSaveInfo = (e) => {
    if (e) e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({
        name: infoForm.name,
        gender: infoForm.gender,
        phone: infoForm.phone,
        email: infoForm.email,
        birthDate: infoForm.birthDate
      });
    }
    setInfoSuccess(true);
    setTimeout(() => {
      setInfoSuccess(false);
      setIsEditingInfo(false);
    }, 900);
  };

  // Format display name: Default to "Nguyễn Văn A" if empty, uppercase matching Hình 1
  const displayName = (user && user.name ? user.name : 'Nguyễn Văn A').toUpperCase();
  const displayPhone = user && user.phone ? user.phone : '087*******99';

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between overflow-hidden bg-[#eff4ef] select-none text-slate-800">
      
      {/* Scrollable Content */}
      <div className="w-full flex-1 overflow-y-auto no-scrollbar pb-28">

        {/* ============================================================== */}
        {/* TOP HEADER SECTION (Curved Wave Background + Avatar + Name)    */}
        {/* ============================================================== */}
        <div className="relative w-full pt-8 pb-7 px-5 bg-gradient-to-b from-[#a9d0bb] via-[#bfdecd] to-[#d6ebd9] rounded-b-[40px] shadow-xs flex flex-col items-center text-center overflow-hidden">
          
          {/* Subtle curved background accents matching Hình 1 */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/20 pointer-events-none blur-xl" />
          <div className="absolute top-0 -right-10 w-56 h-56 rounded-full bg-emerald-700/10 pointer-events-none blur-2xl" />

          {/* Hasaki Logo with rounded corners (bo góc) matching request */}
          <div className="relative z-10 w-[82px] h-[82px] rounded-[22px] bg-white shadow-lg border-[3px] border-white flex items-center justify-center mb-3 overflow-hidden">
            <img 
              src="/images/hasaki_account_logo.png" 
              alt="Hasaki Logo"
              className="w-full h-full object-cover rounded-[19px]"
            />
          </div>

          {/* User Name in Bold Green UpperCase matching Hình 1 */}
          <h1 className="relative z-10 text-[#105e3f] font-extrabold text-[21px] tracking-tight leading-snug mb-0.5">
            {displayName}
          </h1>

          {/* Masked Phone Number matching Hình 1 */}
          <p className="relative z-10 text-[#1c553d] font-semibold text-[15px] tracking-wide">
            {displayPhone}
          </p>
        </div>

        {/* ============================================================== */}
        {/* SETTINGS SECTIONS LIST                                         */}
        {/* ============================================================== */}
        <div className="px-5 pt-5 space-y-4">
          
          {/* GROUP 1: TÀI KHOẢN */}
          <div>
            <h2 className="text-slate-600 font-bold text-[13.5px] px-1 mb-2">
              Tài khoản
            </h2>

            <div className="bg-white rounded-[20px] shadow-xs divide-y divide-slate-100 overflow-hidden border border-emerald-900/[0.04]">
              {/* Thông tin cá nhân */}
              <button
                type="button"
                onClick={() => setActiveModal('info')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border-[1.5px] border-[#105e3f]/70 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <User className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[14px] font-semibold text-slate-800">
                    Thông tin cá nhân
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
              </button>

              {/* Thay đổi mật khẩu */}
              <button
                type="button"
                onClick={() => setActiveModal('password')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border-[1.5px] border-[#105e3f]/70 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <KeyRound className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <span className="text-[14px] font-semibold text-slate-800">
                    Thay đổi mật khẩu
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
              </button>

              {/* Passcode */}
              <button
                type="button"
                onClick={() => setActiveModal('passcode')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border-[1.5px] border-[#105e3f]/70 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <Lock className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <span className="text-[14px] font-semibold text-slate-800">
                    Passcode
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* GROUP 2: CÀI ĐẶT */}
          <div>
            <h2 className="text-slate-600 font-bold text-[13.5px] px-1 mb-2">
              Cài đặt
            </h2>

            <div className="bg-white rounded-[20px] shadow-xs p-4 flex items-center justify-between border border-emerald-900/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full border-[1.5px] border-[#105e3f]/70 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                  <Bell className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[14px] font-semibold text-slate-800">
                  Nhận thông báo
                </span>
              </div>

              {/* Toggle switch matching Hình 1 */}
              <button
                type="button"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${
                  notificationsEnabled ? 'bg-[#105e3f]' : 'bg-[#d2ded6]'
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* GROUP 3: THÔNG TIN PHÁP LÝ */}
          <div>
            <h2 className="text-slate-600 font-bold text-[13.5px] px-1 mb-2">
              Thông tin pháp lý
            </h2>

            <div className="bg-white rounded-[20px] shadow-xs divide-y divide-slate-100 overflow-hidden border border-emerald-900/[0.04]">
              {/* Điều khoản dịch vụ */}
              <button
                type="button"
                onClick={() => setActiveModal('terms')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border-[1.5px] border-[#105e3f]/70 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <FileText className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <span className="text-[14px] font-semibold text-slate-800">
                    Điều khoản dịch vụ
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
              </button>

              {/* Chính sách bảo mật */}
              <button
                type="button"
                onClick={() => setActiveModal('privacy')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border-[1.5px] border-[#105e3f]/70 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[14px] font-semibold text-slate-800">
                    Chính sách bảo mật
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
              </button>

              {/* Quy định sử dụng */}
              <button
                type="button"
                onClick={() => setActiveModal('rules')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border-[1.5px] border-[#105e3f]/70 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <ClipboardCheck className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <span className="text-[14px] font-semibold text-slate-800">
                    Quy định sử dụng
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* GROUP 4: ỨNG DỤNG */}
          <div>
            <h2 className="text-slate-600 font-bold text-[13.5px] px-1 mb-2">
              Ứng dụng
            </h2>

            <div className="bg-white rounded-[20px] shadow-xs divide-y divide-slate-100 overflow-hidden border border-emerald-900/[0.04]">
              {/* Phiên bản */}
              <button
                type="button"
                onClick={() => setActiveModal('version')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border-[1.5px] border-[#105e3f]/70 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <Smartphone className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <span className="text-[14px] font-semibold text-slate-800">
                    Phiên bản
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
              </button>

              {/* Ngôn ngữ */}
              <button
                type="button"
                onClick={() => setActiveModal('language')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border-[1.5px] border-[#105e3f]/70 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <Globe className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[14px] font-semibold text-slate-800">
                    Ngôn ngữ
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* LOG OUT BUTTON CARD matching Hình 1 (Red outline) */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setActiveModal('logoutConfirm')}
              className="w-full h-[52px] bg-white rounded-[20px] border border-rose-300 hover:bg-rose-50/50 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
            >
              <div className="w-7 h-7 rounded-full border border-rose-400 flex items-center justify-center text-rose-500">
                <LogOut className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="text-[14.5px] font-bold text-slate-800">
                Đăng xuất
              </span>
            </button>
          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* FLOATING AI CHATBOT BUTTON matching Hình 2                     */}
      {/* ============================================================== */}
      <button
        type="button"
        onClick={onNavigateAIChat}
        style={{ bottom: '76px' }}
        className="fixed sm:absolute right-4 z-40 cursor-pointer hover:scale-105 active:scale-95 transition-transform focus:outline-none"
        aria-label="Hasaki AI Chatbot"
      >
        <HasakiAIBotIcon size={56} />
      </button>

      {/* ============================================================== */}
      {/* BOTTOM NAVIGATION BAR matching Homescreen & Hình 1            */}
      {/* ============================================================== */}
      <div className="w-full h-16 bg-white border-t border-slate-200/80 px-3 flex items-center justify-around z-30 shadow-lg flex-shrink-0">
        
        {/* Trang chủ */}
        <button
          onClick={onNavigateHome}
          className="flex flex-col items-center justify-center w-16 transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium mt-1">Trang chủ</span>
        </button>

        {/* Hồ sơ da */}
        <button
          onClick={onNavigateHoSoDa}
          className="flex flex-col items-center justify-center w-16 transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium mt-1">Hồ sơ da</span>
        </button>

        {/* Đặt lịch Center Button */}
        <button
          onClick={() => {
            if (onNavigateDatLich) onNavigateDatLich();
          }}
          className="flex flex-col items-center justify-center relative -top-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-[#8faea0] group-hover:bg-[#7fa090] text-white flex items-center justify-center shadow-md transition-transform group-active:scale-95">
            <Calendar className="w-6 h-6 stroke-[2.2] text-[#105e3f]" />
          </div>
          <span className="text-[10px] font-medium text-slate-500 mt-0.5">Đặt lịch</span>
        </button>

        {/* Thông báo */}
        <button
          onClick={() => {
            if (onNavigateThongBao) onNavigateThongBao();
          }}
          className="flex flex-col items-center justify-center w-16 relative transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
        >
          <div className="relative">
            <Bell className="w-5 h-5 stroke-[2]" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute -top-0.5 -right-0.5" />
          </div>
          <span className="text-[10px] font-medium mt-1">Thông báo</span>
        </button>

        {/* Tài khoản (Active tab matching Hình 1) */}
        <button
          className="flex flex-col items-center justify-center w-16 transition-colors cursor-pointer text-[#105e3f]"
        >
          <div className="w-6 h-6 rounded-full border-2 border-[#105e3f] flex items-center justify-center">
            <User className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-bold mt-1 text-[#105e3f]">Tài khoản</span>
        </button>

      </div>

      {/* ============================================================== */}
      {/* MODALS / BOTTOM SHEETS                                         */}
      {/* ============================================================== */}

      {/* 1. Modal Thông tin cá nhân */}
      {activeModal === 'info' && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full max-h-[92%] overflow-y-auto no-scrollbar bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-[16px] text-[#105e3f]">
                {isEditingInfo ? 'Chỉnh sửa thông tin cá nhân' : 'Thông tin cá nhân'}
              </h3>
              <button 
                onClick={() => { setActiveModal(null); setIsEditingInfo(false); setInfoSuccess(false); }}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {infoSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#105e3f] rounded-xl text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Cập nhật thông tin thành công!</span>
              </div>
            )}

            {!isEditingInfo ? (
              <div className="space-y-2.5 text-[13px]">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Họ và tên:</span>
                  <span className="font-bold text-slate-800">{user?.name || 'Nguyễn Văn A'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 items-center">
                  <span className="text-slate-500">Giới tính:</span>
                  <span className="font-bold text-[#105e3f] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-xs">
                    {user?.gender || 'Nam'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Ngày sinh:</span>
                  <span className="font-semibold text-slate-800">{user?.birthDate || '15/08/1998'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Số điện thoại:</span>
                  <span className="font-semibold text-slate-800">{user?.phone || '087*******99'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-semibold text-slate-800">{user?.email || 'khachhang@hasaki.vn'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Hạng thành viên:</span>
                  <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-xs">
                    Hasaki VIP Gold
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Điểm tích lũy:</span>
                  <span className="font-bold text-[#105e3f]">1,450 điểm</span>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingInfo(true)}
                    className="flex-1 h-[46px] rounded-[18px] bg-[#105e3f] hover:bg-[#0c4b32] text-white font-bold text-[14px] cursor-pointer transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Chỉnh sửa thông tin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="w-24 h-[46px] rounded-[18px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[14px] cursor-pointer transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveInfo} className="space-y-3 text-[13px]">
                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">Họ và tên</label>
                  <input
                    type="text"
                    value={infoForm.name}
                    onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-slate-800 text-xs font-semibold focus:border-[#105e3f] focus:outline-none"
                    required
                  />
                </div>

                {/* Giới tính */}
                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">Giới tính</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Nam', 'Nữ'].map((g) => {
                      const isSel = infoForm.gender === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setInfoForm(prev => ({ ...prev, gender: g }))}
                          className={`h-10 rounded-xl border-[1.5px] flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer ${
                            isSel 
                              ? 'border-[#105e3f] bg-emerald-50 text-[#105e3f] shadow-xs' 
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border-2 border-[#105e3f] flex items-center justify-center ${isSel ? 'bg-[#105e3f]' : 'bg-transparent'}`}>
                            {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{g}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={infoForm.phone}
                    onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-slate-800 text-xs font-semibold focus:border-[#105e3f] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">Email</label>
                  <input
                    type="email"
                    value={infoForm.email}
                    onChange={(e) => setInfoForm({ ...infoForm, email: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-slate-800 text-xs font-semibold focus:border-[#105e3f] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">Ngày sinh</label>
                  <input
                    type="text"
                    value={infoForm.birthDate}
                    onChange={(e) => setInfoForm({ ...infoForm, birthDate: e.target.value })}
                    placeholder="DD/MM/YYYY"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-slate-800 text-xs font-semibold focus:border-[#105e3f] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingInfo(false)}
                    className="w-1/3 h-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 h-[44px] rounded-xl bg-[#105e3f] hover:bg-[#0c4b32] text-white font-bold text-xs cursor-pointer shadow-sm transition-all"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. Modal Thay đổi mật khẩu */}
      {activeModal === 'password' && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-[16px] text-[#105e3f]">Thay đổi mật khẩu</h3>
              <button 
                onClick={() => { setActiveModal(null); setPasswordSuccess(false); }}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {passwordSuccess ? (
              <div className="py-4 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#105e3f] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Đổi mật khẩu thành công!</h4>
                <p className="text-xs text-slate-500">Mật khẩu mới đã được cập nhật cho tài khoản của bạn.</p>
                <button
                  onClick={() => { setActiveModal(null); setPasswordSuccess(false); }}
                  className="mt-3 w-full h-[44px] rounded-[16px] bg-[#105e3f] text-white font-bold text-sm cursor-pointer"
                >
                  Hoàn tất
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setPasswordSuccess(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu hiện tại"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:border-[#105e3f] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Mật khẩu mới</label>
                  <input
                    type="password"
                    placeholder="Ít nhất 8 ký tự"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:border-[#105e3f] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:border-[#105e3f] outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-[46px] rounded-[18px] bg-[#105e3f] text-white font-bold text-[14px] cursor-pointer mt-2"
                >
                  Lưu mật khẩu mới
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. Modal Passcode */}
      {activeModal === 'passcode' && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-[16px] text-[#105e3f]">Cài đặt Passcode / Mã PIN</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Kích hoạt mã bảo vệ 6 số hoặc sinh trắc học (FaceID / Vân tay) để đăng nhập nhanh chóng và bảo vệ hồ sơ da của bạn.
            </p>

            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80 flex items-center justify-between">
              <div>
                <span className="font-bold text-[13.5px] text-[#105e3f] block">Mở khóa sinh trắc học</span>
                <span className="text-[11.5px] text-slate-500">FaceID / TouchID khi mở ứng dụng</span>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#105e3f] cursor-pointer" />
            </div>

            <button
              onClick={() => {
                alert("Đã cập nhật cài đặt Passcode an toàn!");
                setActiveModal(null);
              }}
              className="w-full h-[46px] rounded-[18px] bg-[#105e3f] text-white font-bold text-[14px] cursor-pointer"
            >
              Thiết lập mã PIN 6 số
            </button>
          </div>
        </div>
      )}

      {/* 4. Modal Pháp lý & Điều khoản */}
      {(activeModal === 'terms' || activeModal === 'privacy' || activeModal === 'rules') && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full max-h-[80vh] bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up flex flex-col space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-[16px] text-[#105e3f]">
                {activeModal === 'terms' ? 'Điều khoản dịch vụ' : activeModal === 'privacy' ? 'Chính sách bảo mật' : 'Quy định sử dụng'}
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar text-[12.5px] text-slate-600 leading-relaxed space-y-2 pr-1">
              <p>Chào mừng bạn đến với ứng dụng <strong>HASAKI Skin Journey</strong> thuộc hệ sinh thái Hasaki Beauty & Clinic.</p>
              <p>1. Tất cả dữ liệu hồ sơ da, lịch sử thăm khám và hình ảnh soi da được lưu trữ và mã hóa an toàn theo tiêu chuẩn bảo mật y tế.</p>
              <p>2. Người dùng có quyền tra cứu, cập nhật thông tin cá nhân và quản lý các lịch hẹn tư vấn tại hệ thống Hasaki Clinic toàn quốc.</p>
              <p>3. Hasaki cam kết không chia sẻ dữ liệu nhận diện khuôn mặt và tình trạng da của khách hàng cho bất kỳ bên thứ ba nào nếu không có sự đồng ý của bạn.</p>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full h-[44px] rounded-[16px] bg-[#105e3f] text-white font-bold text-sm cursor-pointer"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}

      {/* 5. Modal Phiên bản */}
      {activeModal === 'version' && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#105e3f] flex items-center justify-center mx-auto mb-1">
              <Smartphone className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="font-extrabold text-[16px] text-[#105e3f]">HASAKI Skin Journey</h3>
            <p className="text-xs text-slate-500">Phiên bản hiện tại: <strong>v2.4.0 (Build 2026)</strong></p>
            <div className="bg-emerald-50 text-[#105e3f] text-xs font-semibold py-2 px-3 rounded-xl border border-emerald-200">
              ✓ Bạn đang sử dụng phiên bản mới nhất
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full h-[44px] rounded-[16px] bg-[#105e3f] text-white font-bold text-sm cursor-pointer mt-2"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* 6. Modal Ngôn ngữ */}
      {activeModal === 'language' && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-[16px] text-[#105e3f]">Chọn ngôn ngữ</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="space-y-2">
              <div 
                onClick={() => setSelectedLanguage('vi')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer ${
                  selectedLanguage === 'vi' ? 'border-[#105e3f] bg-emerald-50/60 font-bold text-[#105e3f]' : 'border-slate-200'
                }`}
              >
                <span>Tiếng Việt (Mặc định)</span>
                {selectedLanguage === 'vi' && <Check className="w-4 h-4" />}
              </div>

              <div 
                onClick={() => setSelectedLanguage('en')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer ${
                  selectedLanguage === 'en' ? 'border-[#105e3f] bg-emerald-50/60 font-bold text-[#105e3f]' : 'border-slate-200'
                }`}
              >
                <span>English (International)</span>
                {selectedLanguage === 'en' && <Check className="w-4 h-4" />}
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full h-[44px] rounded-[16px] bg-[#105e3f] text-white font-bold text-sm cursor-pointer"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      )}

      {/* 7. Modal Xác nhận đăng xuất */}
      {activeModal === 'logoutConfirm' && (
        <div className="absolute inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full bg-white rounded-t-[28px] p-6 shadow-2xl animate-slide-up text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-1">
              <LogOut className="w-6 h-6 stroke-[2.2]" />
            </div>

            <h3 className="font-extrabold text-[17px] text-slate-900">
              Đăng xuất khỏi ứng dụng?
            </h3>

            <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
              Bạn có chắc chắn muốn đăng xuất khỏi tài khoản <strong>{displayName}</strong> không?
            </p>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="flex-1 h-[46px] rounded-[18px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[14px] cursor-pointer"
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  if (onLogout) onLogout();
                }}
                className="flex-1 h-[46px] rounded-[18px] bg-rose-600 hover:bg-rose-700 text-white font-bold text-[14px] cursor-pointer shadow-md"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
