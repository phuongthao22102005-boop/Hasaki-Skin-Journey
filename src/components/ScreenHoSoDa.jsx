import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  Calendar as CalendarIcon, 
  X, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  FileText, 
  Edit3,
  CalendarDays,
  CreditCard
} from 'lucide-react';

export default function ScreenHoSoDa({ onBackToHome, user, onUpdateUser }) {
  // Modes: 'empty' (Hình 1), 'existing_login' (Hình 3), 'new_step1' (Hình 4), 'new_step2', 'profile_view'
  const [viewMode, setViewMode] = useState('empty');
  const [showModalSelection, setShowModalSelection] = useState(false); // Hình 2

  // Existing user lookup inputs (Hình 3)
  const [existingName, setExistingName] = useState('Minh Thanh');
  const [existingCode, setExistingCode] = useState('HSK-889966');
  const [errorMsg, setErrorMsg] = useState('');

  // New user registration inputs (Hình 4)
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    gender: user?.gender || 'Nam',
    birthDate: user?.birthDate || '',
    phone: user?.phone || '',
    email: user?.email || '',
    cccd: '',
    address: user?.address || '',
    skinType: 'Da hỗn hợp thiên dầu',
    sensitivity: 'Nhạy cảm nhẹ',
    primaryConcern: 'Mụn ẩn & lỗ chân lông to',
    careGoal: 'Kiềm dầu, phục hồi màng ẩm và sáng da',
    currentProducts: 'Sữa rửa mặt dịu nhẹ, Serum B5, Kem chống nắng',
    allergies: 'Cồn khô, hương liệu nồng'
  });

  // Demo profile for "Minh Thanh" as requested by user
  const demoMinhThanhProfile = {
    fullName: 'Nguyễn Minh Thanh',
    gender: user?.gender || 'Nam',
    customerCode: 'HSK-889966',
    birthDate: '15/08/1998',
    phone: '0987 654 321',
    email: 'minhthanh.nguyen@gmail.com',
    cccd: '079198006789',
    address: '71 Hoàng Hoa Thám, Phường 13, Quận Tân Bình, TP. HCM',
    skinType: 'Da hỗn hợp thiên dầu (vùng chữ T nhiều dầu, 2 bên má khô)',
    sensitivity: 'Nhạy cảm nhẹ (dễ ửng đỏ khi thời tiết thay đổi hoặc dùng acid mạnh)',
    primaryConcern: 'Mụn ẩn vùng cằm, lỗ chân lông to ở cánh mũi, vết thâm mụn',
    careGoal: 'Phục hồi hàng rào ẩm, kiềm dầu, mờ thâm sáng đều màu da',
    currentProducts: 'CeraVe Foaming Cleanser, The Ordinary Niacinamide 10%, La Roche-Posay B5+, Anessa UV Milk',
    allergies: 'Cồn khô (Alcohol Denat), Hương liệu nồng độ cao (Fragrance)',
    lastConsultation: '24/10/2026 tại Hasaki Clinic & Spa (Bác sĩ: Da đang phục hồi tốt)'
  };

  // Active profile currently loaded
  const [activeProfile, setActiveProfile] = useState(null);

  // Triggered when user clicks "TẠO HỒ SƠ DA" in Hình 1
  const handleOpenCreationModal = () => {
    setShowModalSelection(true); // Shows Hình 2
  };

  // When user clicks "ĐÃ TỪNG SỬ DỤNG" in Hình 2
  const handleSelectExistingUser = () => {
    setShowModalSelection(false);
    setViewMode('existing_login'); // Shows Hình 3
  };

  // When user clicks "CHƯA TỪNG SỬ DỤNG" in Hình 2
  const handleSelectNewUser = () => {
    setShowModalSelection(false);
    setViewMode('new_step1'); // Shows Hình 4
  };

  // When user clicks "Xác nhận" in Hình 3 (Đã từng sử dụng)
  const handleConfirmExistingUser = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!existingName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên');
      return;
    }
    if (!existingCode.trim()) {
      setErrorMsg('Vui lòng nhập mã khách hàng');
      return;
    }

    // Load Minh Thanh demo profile (or tailored to entered name)
    const profileToLoad = {
      ...demoMinhThanhProfile,
      fullName: existingName.trim(),
      customerCode: existingCode.trim().toUpperCase()
    };

    setActiveProfile(profileToLoad);
    setViewMode('profile_view');
  };

  // When user clicks "Tiếp tục" in Hình 4 (Chưa từng sử dụng)
  const handleContinueNewStep1 = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Vui lòng nhập số điện thoại');
      return;
    }

    // Proceed to Step 2: Skin Profile questions
    setViewMode('new_step2');
  };

  // Save new user profile after Step 2
  const handleSaveNewProfile = (e) => {
    if (e) e.preventDefault();

    const newProfile = {
      fullName: formData.fullName,
      gender: formData.gender,
      customerCode: 'HSK-' + Math.floor(100000 + Math.random() * 900000),
      birthDate: formData.birthDate || 'Chưa cập nhật',
      phone: formData.phone,
      email: formData.email || 'Chưa cập nhật',
      cccd: formData.cccd || 'Chưa cập nhật',
      address: formData.address || 'Chưa cập nhật',
      skinType: formData.skinType,
      sensitivity: formData.sensitivity,
      primaryConcern: formData.primaryConcern,
      careGoal: formData.careGoal,
      currentProducts: formData.currentProducts,
      allergies: formData.allergies || 'Không có dị ứng ghi nhận',
      lastConsultation: 'Mới tạo qua Hasaki Skin Journey'
    };

    setActiveProfile(newProfile);
    if (onUpdateUser) {
      onUpdateUser({
        name: formData.fullName,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        birthDate: formData.birthDate
      });
    }
    setViewMode('profile_view');
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between bg-[#f2f6f3] select-none text-slate-800">
      
      {/* Top Navigation Bar */}
      <div className="px-5 pt-3 pb-2 flex-shrink-0 bg-[#f2f6f3] z-10">
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-[#155238] font-bold text-[17px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.6]" />
            <span>Hồ sơ da của tôi</span>
          </button>

          <button
            onClick={onBackToHome}
            className="text-[#155238] hover:opacity-80 transition-opacity p-1 cursor-pointer"
            aria-label="Trang chủ"
          >
            <Home className="w-6 h-6 stroke-[2.4]" />
          </button>
        </div>
      </div>

      {/* Main Container Content */}
      <div className="w-full flex-1 overflow-y-auto no-scrollbar px-5 pb-8 flex flex-col">
        
        {/* ======================================================== */}
        {/* 1. HÌNH 1: MÀN HÌNH CHƯA CÓ HỒ SƠ (viewMode === 'empty')  */}
        {/* ======================================================== */}
        {viewMode === 'empty' && (
          <div className="my-auto flex flex-col items-center justify-center text-center animate-fade-in py-6">
            
            {/* Circular Calendar / Folder Graphic matching Hình 1 */}
            <div className="w-36 h-36 rounded-full bg-[#e3ede6] flex items-center justify-center mb-6 border-[3px] border-[#cbe0d3]">
              <svg 
                viewBox="0 0 100 100" 
                className="w-20 h-20 text-[#8ea798] fill-none stroke-current"
                style={{ strokeWidth: 5, strokeLinecap: 'round', strokeLinejoin: 'round' }}
              >
                {/* Calendar box */}
                <rect x="20" y="25" width="60" height="55" rx="8" />
                {/* Calendar top hooks */}
                <line x1="32" y1="18" x2="32" y2="28" strokeWidth="6" />
                <line x1="68" y1="18" x2="68" y2="28" strokeWidth="6" />
                {/* Horizontal line */}
                <line x1="20" y1="40" x2="80" y2="40" strokeWidth="4" />
                {/* Grid dots / squares */}
                <rect x="30" y="48" width="8" height="8" rx="2" fill="currentColor" stroke="none" />
                <rect x="46" y="48" width="8" height="8" rx="2" fill="currentColor" stroke="none" />
                <rect x="62" y="48" width="8" height="8" rx="2" fill="currentColor" stroke="none" />
                <rect x="30" y="62" width="8" height="8" rx="2" fill="currentColor" stroke="none" />
                <rect x="46" y="62" width="8" height="8" rx="2" fill="currentColor" stroke="none" />
                <rect x="62" y="62" width="8" height="8" rx="2" fill="currentColor" stroke="none" />
              </svg>
            </div>

            {/* Title: Chưa có hồ sơ */}
            <h2 className="text-[22px] font-extrabold text-black tracking-tight mb-2">
              Chưa có hồ sơ
            </h2>

            {/* Subtitle */}
            <p className="text-[14px] leading-[20px] text-slate-700 max-w-[280px] mb-8 font-medium">
              Hiện tại hồ sơ da của bạn chưa có thông tin chi tiết nào được ghi nhận trên hệ thống
            </p>

            {/* Button: TẠO HỒ SƠ DA matching Hình 1 */}
            <button
              onClick={handleOpenCreationModal}
              className="w-full max-w-[320px] h-[56px] rounded-[16px] bg-white border-[2.5px] border-[#135d3e] text-[#135d3e] hover:bg-emerald-50 active:scale-98 font-extrabold text-[18px] tracking-wide shadow-sm transition-all cursor-pointer flex items-center justify-center"
            >
              TẠO HỒ SƠ DA
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. HÌNH 3: NHẬP MÃ KHÁCH HÀNG (viewMode === 'existing_login') */}
        {/* ======================================================== */}
        {viewMode === 'existing_login' && (
          <div className="flex-1 flex flex-col justify-between pt-2 pb-6 animate-slide-up">
            <div>
              {/* Heading: Nhập mã khách hàng */}
              <h1 className="text-[#105e3f] font-extrabold text-[27px] tracking-tight leading-tight mb-6">
                Nhập mã khách hàng
              </h1>

              {/* Form Card matching Hình 3 */}
              <div className="bg-white rounded-[20px] p-5 border border-emerald-900/[0.1] shadow-xs">
                {/* Field 1: Họ và tên */}
                <div className="mb-4">
                  <label className="block text-slate-700 font-bold text-[14px] mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={existingName}
                    onChange={(e) => { setExistingName(e.target.value); setErrorMsg(''); }}
                    placeholder="Nhập họ và tên..."
                    className="w-full h-[48px] px-4 rounded-[14px] border-[1.5px] border-[#105e3f] text-slate-800 text-[14.5px] font-medium focus:outline-none focus:ring-2 focus:ring-[#105e3f]/30"
                  />
                </div>

                {/* Field 2: Mã khách hàng */}
                <div>
                  <label className="block text-slate-700 font-bold text-[14px] mb-2">
                    Mã khách hàng
                  </label>
                  <input
                    type="text"
                    value={existingCode}
                    onChange={(e) => { setExistingCode(e.target.value); setErrorMsg(''); }}
                    placeholder="Ví dụ: HSK-889966"
                    className="w-full h-[48px] px-4 rounded-[14px] border-[1.5px] border-[#105e3f] text-slate-800 text-[14.5px] font-medium focus:outline-none focus:ring-2 focus:ring-[#105e3f]/30 uppercase"
                  />
                </div>

                {errorMsg && (
                  <p className="text-rose-600 text-xs font-semibold mt-3">
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Quick tip demo button */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Khách hàng có sẵn trong hệ thống:</span>
                <button
                  type="button"
                  onClick={() => { setExistingName('Minh Thanh'); setExistingCode('HSK-889966'); }}
                  className="text-[#105e3f] font-bold underline cursor-pointer"
                >
                  Dùng mẫu Minh Thanh
                </button>
              </div>
            </div>

            {/* Button: Xác nhận matching Hình 3 */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleConfirmExistingUser}
                className="w-full h-[52px] rounded-[16px] bg-[#0a6442] hover:bg-[#084e34] active:scale-98 text-white font-bold text-[17px] shadow-md transition-all cursor-pointer flex items-center justify-center"
              >
                Xác nhận
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. HÌNH 4: THÔNG TIN CÁ NHÂN (viewMode === 'new_step1')   */}
        {/* ======================================================== */}
        {viewMode === 'new_step1' && (
          <div className="flex-1 flex flex-col justify-between pt-2 pb-6 animate-slide-up">
            <div>
              {/* Heading matching Hình 4 */}
              <h1 className="text-[#105e3f] font-extrabold text-[27px] tracking-tight leading-tight mb-5">
                Hồ sơ da của tôi
              </h1>

              {/* White Form Card matching Hình 4 */}
              <div className="bg-white rounded-[22px] p-5 border border-emerald-900/[0.1] shadow-xs space-y-4">
                <h3 className="text-black font-extrabold text-[17px] mb-2">
                  Thông tin cá nhân
                </h3>

                {/* Họ và tên */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13.5px] mb-1.5">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full h-[46px] px-4 rounded-[14px] border-[1.5px] border-[#105e3f] text-slate-800 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#105e3f]/30"
                  />
                </div>

                {/* Giới tính */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13.5px] mb-1.5">
                    Giới tính
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Nam', 'Nữ'].map((g) => {
                      const isSelected = formData.gender === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, gender: g }))}
                          className={`h-[44px] rounded-[14px] border-[1.5px] flex items-center justify-center gap-2 font-bold text-[14px] transition-all cursor-pointer ${
                            isSelected 
                              ? 'border-[#105e3f] bg-emerald-50 text-[#105e3f] shadow-xs' 
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 border-[#105e3f] flex items-center justify-center ${isSelected ? 'bg-[#105e3f]' : 'bg-transparent'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{g}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ngày sinh */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13.5px] mb-1.5">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full h-[46px] px-4 rounded-[14px] border-[1.5px] border-[#105e3f] text-slate-800 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#105e3f]/30 bg-white"
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13.5px] mb-1.5">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ví dụ: 0912 345 678"
                    className="w-full h-[46px] px-4 rounded-[14px] border-[1.5px] border-[#105e3f] text-slate-800 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#105e3f]/30"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13.5px] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full h-[46px] px-4 rounded-[14px] border-[1.5px] border-[#105e3f] text-slate-800 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#105e3f]/30"
                  />
                </div>

                {/* Địa chỉ */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13.5px] mb-1.5">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Số nhà, đường, quận/huyện, tỉnh/thành"
                    className="w-full h-[46px] px-4 rounded-[14px] border-[1.5px] border-[#105e3f] text-slate-800 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#105e3f]/30"
                  />
                </div>

                {errorMsg && (
                  <p className="text-rose-600 text-xs font-semibold pt-1">
                    {errorMsg}
                  </p>
                )}
              </div>
            </div>

            {/* Button: Tiếp tục matching Hình 4 */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleContinueNewStep1}
                className="w-full h-[52px] rounded-[16px] bg-[#0a6442] hover:bg-[#084e34] active:scale-98 text-white font-bold text-[17px] shadow-md transition-all cursor-pointer flex items-center justify-center"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. BƯỚC 2 CHO KHÁCH HÀNG MỚI: BẢNG HỒ SƠ DA              */}
        {/* ======================================================== */}
        {viewMode === 'new_step2' && (
          <div className="flex-1 flex flex-col justify-between pt-2 pb-6 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-[#105e3f] font-extrabold text-[24px] tracking-tight leading-tight">
                Thiết lập hồ sơ da
              </h1>
              <p className="text-xs text-slate-600">
                Hãy cho Hasaki biết thêm về tình trạng da của bạn để nhận phác đồ chăm sóc phù hợp nhất.
              </p>

              <div className="bg-white rounded-[22px] p-5 border border-emerald-900/[0.1] shadow-xs space-y-4">
                {/* Loại da */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13px] mb-1">
                    Loại da
                  </label>
                  <select
                    value={formData.skinType}
                    onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-[#105e3f] bg-white text-xs font-medium"
                  >
                    <option value="Da dầu">Da dầu</option>
                    <option value="Da hỗn hợp thiên dầu">Da hỗn hợp thiên dầu</option>
                    <option value="Da khô / thiếu ẩm">Da khô / thiếu ẩm</option>
                    <option value="Da thường">Da thường</option>
                    <option value="Chưa xác định">Chưa xác định (Cần soi da)</option>
                  </select>
                </div>

                {/* Mức độ nhạy cảm */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13px] mb-1">
                    Mức độ nhạy cảm
                  </label>
                  <select
                    value={formData.sensitivity}
                    onChange={(e) => setFormData({ ...formData, sensitivity: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-[#105e3f] bg-white text-xs font-medium"
                  >
                    <option value="Bình thường (Ít kích ứng)">Bình thường (Ít kích ứng)</option>
                    <option value="Nhạy cảm nhẹ (Dễ đỏ khi thay đổi thời tiết)">Nhạy cảm nhẹ</option>
                    <option value="Rất nhạy cảm (Dễ châm chích, nổi mụn dị ứng)">Rất nhạy cảm</option>
                  </select>
                </div>

                {/* Mối quan tâm chính */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13px] mb-1">
                    Mối quan tâm chính
                  </label>
                  <input
                    type="text"
                    value={formData.primaryConcern}
                    onChange={(e) => setFormData({ ...formData, primaryConcern: e.target.value })}
                    placeholder="Ví dụ: Mụn ẩn, thâm sạm, lỗ chân lông to..."
                    className="w-full h-11 px-3 rounded-xl border border-[#105e3f] text-xs font-medium"
                  />
                </div>

                {/* Mục tiêu chăm sóc */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13px] mb-1">
                    Mục tiêu chăm sóc
                  </label>
                  <input
                    type="text"
                    value={formData.careGoal}
                    onChange={(e) => setFormData({ ...formData, careGoal: e.target.value })}
                    placeholder="Ví dụ: Phục hồi da, kiềm dầu, làm sáng đều màu..."
                    className="w-full h-11 px-3 rounded-xl border border-[#105e3f] text-xs font-medium"
                  />
                </div>

                {/* Sản phẩm đang sử dụng */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13px] mb-1">
                    Sản phẩm đang sử dụng
                  </label>
                  <input
                    type="text"
                    value={formData.currentProducts}
                    onChange={(e) => setFormData({ ...formData, currentProducts: e.target.value })}
                    placeholder="Tên sữa rửa mặt, serum, kem dưỡng, KCN..."
                    className="w-full h-11 px-3 rounded-xl border border-[#105e3f] text-xs font-medium"
                  />
                </div>

                {/* Thành phần dị ứng */}
                <div>
                  <label className="block text-slate-700 font-bold text-[13px] mb-1">
                    Thành phần dị ứng (nếu có)
                  </label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    placeholder="Ví dụ: Cồn khô, hương liệu, Paraben..."
                    className="w-full h-11 px-3 rounded-xl border border-[#105e3f] text-xs font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 flex gap-2.5">
              <button
                type="button"
                onClick={() => setViewMode('new_step1')}
                className="w-1/3 h-[50px] rounded-[14px] bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
              >
                Quay lại
              </button>
              <button
                type="button"
                onClick={handleSaveNewProfile}
                className="w-2/3 h-[50px] rounded-[14px] bg-[#0a6442] hover:bg-[#084e34] text-white font-bold text-sm shadow-md cursor-pointer"
              >
                Hoàn tất tạo hồ sơ
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. HIỂN THỊ ĐẦY ĐỦ THÔNG TIN HỒ SƠ DA ĐÃ LƯU (profile_view) */}
        {/* ======================================================== */}
        {viewMode === 'profile_view' && activeProfile && (
          <div className="flex-1 flex flex-col space-y-4 pt-1 pb-6 animate-fade-in">
            
            {/* Header info card */}
            <div className="bg-gradient-to-r from-[#105e3f] to-[#1d7350] rounded-[22px] p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-800/80 px-2 py-0.5 rounded-full text-emerald-200">
                    Hasaki Skin ID
                  </span>
                  <h2 className="text-[20px] font-black mt-1 leading-tight">
                    {activeProfile.fullName}
                  </h2>
                  <p className="text-emerald-200 text-xs font-mono mt-0.5">
                    Mã KH: {activeProfile.customerCode}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center border-2 border-white/30">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* BẢNG 1: THÔNG TIN CÁ NHÂN */}
            <div className="bg-white rounded-[20px] p-4 border border-emerald-900/[0.08] shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                <User className="w-4 h-4 text-[#105e3f]" />
                <h3 className="font-extrabold text-[15px] text-[#105e3f]">
                  Thông tin cá nhân
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Họ và tên:</span>
                  <span className="font-bold text-slate-800">{activeProfile.fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Giới tính:</span>
                  <span className="font-bold text-[#105e3f]">{activeProfile.gender || user?.gender || 'Nam'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Ngày sinh:</span>
                  <span className="font-bold text-slate-800">{activeProfile.birthDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Số điện thoại:</span>
                  <span className="font-bold text-slate-800">{activeProfile.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Email:</span>
                  <span className="font-bold text-slate-800">{activeProfile.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">CCCD:</span>
                  <span className="font-bold text-slate-800">{activeProfile.cccd}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium flex-shrink-0">Địa chỉ:</span>
                  <span className="font-bold text-slate-800 text-right pl-3">{activeProfile.address}</span>
                </div>
              </div>
            </div>

            {/* BẢNG 2: HỒ SƠ DA CHUYÊN SÂU */}
            <div className="bg-white rounded-[20px] p-4 border border-emerald-900/[0.08] shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                <Sparkles className="w-4 h-4 text-[#105e3f]" />
                <h3 className="font-extrabold text-[15px] text-[#105e3f]">
                  Hồ sơ da chuyên sâu
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="bg-emerald-50/70 p-2.5 rounded-xl">
                  <span className="text-emerald-900/80 font-bold block mb-0.5">Loại da:</span>
                  <span className="font-semibold text-emerald-950">{activeProfile.skinType}</span>
                </div>

                <div className="bg-emerald-50/70 p-2.5 rounded-xl">
                  <span className="text-emerald-900/80 font-bold block mb-0.5">Mức độ nhạy cảm:</span>
                  <span className="font-semibold text-emerald-950">{activeProfile.sensitivity}</span>
                </div>

                <div className="bg-emerald-50/70 p-2.5 rounded-xl">
                  <span className="text-emerald-900/80 font-bold block mb-0.5">Mối quan tâm chính:</span>
                  <span className="font-semibold text-emerald-950">{activeProfile.primaryConcern}</span>
                </div>

                <div className="bg-emerald-50/70 p-2.5 rounded-xl">
                  <span className="text-emerald-900/80 font-bold block mb-0.5">Mục tiêu chăm sóc:</span>
                  <span className="font-semibold text-emerald-950">{activeProfile.careGoal}</span>
                </div>

                <div className="bg-emerald-50/70 p-2.5 rounded-xl">
                  <span className="text-emerald-900/80 font-bold block mb-0.5">Sản phẩm đang sử dụng:</span>
                  <span className="font-semibold text-emerald-950">{activeProfile.currentProducts}</span>
                </div>

                <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                  <span className="text-rose-800 font-bold block mb-0.5">Thành phần dị ứng:</span>
                  <span className="font-semibold text-rose-950">{activeProfile.allergies}</span>
                </div>

                <div className="text-[11px] text-slate-500 pt-1 italic">
                  * Lần ghi nhận gần nhất: {activeProfile.lastConsultation}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setViewMode('empty')}
                className="flex-1 h-11 rounded-xl bg-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-300 transition-colors cursor-pointer"
              >
                Đổi hồ sơ khác
              </button>
              <button
                type="button"
                onClick={onBackToHome}
                className="flex-1 h-11 rounded-xl bg-[#0a6442] hover:bg-[#084e34] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Về Trang chủ
              </button>
            </div>

          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* HÌNH 2: MODAL LỰA CHỌN (showModalSelection === true)      */}
      {/* ======================================================== */}
      {showModalSelection && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full max-w-[430px] bg-white rounded-t-[28px] p-6 shadow-2xl animate-slide-up relative">
            
            {/* Close Button X matching Hình 2 */}
            <button
              onClick={() => setShowModalSelection(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Question matching Hình 2 */}
            <div className="text-center mt-2 mb-6 px-4">
              <h3 className="text-[16.5px] font-extrabold text-slate-900 leading-snug">
                Bạn đã từng sử dụng dịch vụ tư vấn/chăm sóc da tại <span className="text-[#0a6442]">Hasaki</span>?
              </h3>
            </div>

            {/* 2 Buttons matching Hình 2 */}
            <div className="flex flex-col gap-3 pb-2">
              {/* Button 1: ĐÃ TỪNG SỬ DỤNG (Solid Green) */}
              <button
                type="button"
                onClick={handleSelectExistingUser}
                className="w-full h-[52px] rounded-[16px] bg-[#0a6442] hover:bg-[#084e34] active:scale-98 text-white font-extrabold text-[15.5px] tracking-wide shadow-sm transition-all cursor-pointer flex items-center justify-center uppercase"
              >
                ĐÃ TỪNG SỬ DỤNG
              </button>

              {/* Button 2: CHƯA TỪNG SỬ DỤNG (Outline Green) */}
              <button
                type="button"
                onClick={handleSelectNewUser}
                className="w-full h-[52px] rounded-[16px] bg-white border-[1.5px] border-[#0a6442] text-[#0a6442] hover:bg-emerald-50 active:scale-98 font-extrabold text-[15.5px] tracking-wide shadow-xs transition-all cursor-pointer flex items-center justify-center uppercase"
              >
                CHƯA TỪNG SỬ DỤNG
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
