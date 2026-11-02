import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  Calendar, 
  Clock, 
  Video, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  X, 
  ChevronRight,
  MessageSquare,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function ScreenHoiDapChuyenGia({ 
  user = { name: 'Nguyễn Văn A' }, 
  onBackToHome,
  onBookingConfirmed,
  onNavigateHistory
}) {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState('31/10/2026');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:30 - 09:50');
  const [bookingSuccessModal, setBookingSuccessModal] = useState(null);

  // List of 2 experts matching user specifications:
  // - Round portrait avatar
  // - Full expert name
  // - Price: 150.000đ / buổi tư vấn
  // - Displayed cleanly on 1 row without clipping, overlapping, or truncation
  const experts = [
    {
      id: 'exp-1',
      name: 'BS. CKI Lê Thị Mai Chi',
      title: 'Bác sĩ Da liễu & Thẩm mỹ',
      experience: '8+ năm kinh nghiệm',
      rating: 4.9,
      reviews: 620,
      avatar: '/images/doctor_chi.png',
      price: '150.000đ',
      priceUnit: '/ buổi tư vấn',
      hospital: 'Hasaki Clinic Quận 7',
      availableSlots: ['09:30 - 09:50', '10:30 - 10:50', '14:00 - 14:20', '16:00 - 16:20']
    },
    {
      id: 'exp-2',
      name: 'BS. CKI Vũ Hoài Nam',
      title: 'Bác sĩ Da liễu Y khoa',
      experience: '10+ năm kinh nghiệm',
      rating: 4.9,
      reviews: 840,
      avatar: '/images/doctor_nam.png',
      price: '150.000đ',
      priceUnit: '/ buổi tư vấn',
      hospital: 'Hasaki Clinic Tân Bình',
      availableSlots: ['09:00 - 09:20', '11:00 - 11:20', '14:30 - 14:50', '15:30 - 15:50']
    }
  ];

  const handleConfirmBooking = () => {
    if (!selectedExpert) return;

    const bookingData = {
      consultant: selectedExpert.name,
      time: selectedTimeSlot,
      date: selectedDate,
      branch: 'Tư vấn Video Call Trực tuyến (Hasaki Online)',
      address: 'Phòng khám Da liễu Trực tuyến Hasaki',
      serviceType: 'TƯ VẤN DA LIỄU ONLINE 1:1',
      price: 150000,
      gender: user?.gender || 'Nam',
      customerName: user?.name || 'Nguyễn Văn A',
      voucher: 'Không'
    };

    if (onBookingConfirmed) {
      onBookingConfirmed(bookingData);
    }

    setBookingSuccessModal({
      ...bookingData,
      expert: selectedExpert
    });
    setSelectedExpert(null);
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col bg-[#eff4ef] select-none text-slate-800 overflow-hidden font-sans">
      
      {/* Top Header Bar matching Hình 1 */}
      <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-[#105e3f] font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
            <span>Đặt lịch tư vấn online</span>
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className="text-[#105e3f] hover:opacity-80 transition-opacity p-1 cursor-pointer"
            aria-label="Trang chủ"
          >
            <Home className="w-6 h-6 stroke-[2.4]" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        
        {/* Banner Section matching Hình 1 */}
        <div className="w-full bg-[#cce3d5] overflow-hidden shadow-xs border-b border-gray-200/60">
          <img
            src="/images/banner_tuvan_hd.png"
            alt="Tham vấn chuyên gia 20 phút - Không giới hạn câu hỏi"
            className="w-full h-auto object-cover block select-none"
            style={{ imageRendering: 'auto' }}
          />
        </div>

        {/* Section Title & Description */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-[15px] text-slate-900 tracking-tight">
              Danh sách Bác sĩ / Chuyên gia
            </h3>
            <span className="text-[11.5px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              2 chuyên gia
            </span>
          </div>

          {/* List of 2 experts: 
              Mỗi người hiển thị trên 1 hàng (Row layout), 
              khung tròn ảnh chân dung, tên, số tiền 150.000đ/buổi tư vấn 
          */}
          <div className="space-y-3">
            {experts.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-2xl p-3.5 shadow-xs border border-gray-100 hover:border-emerald-300 transition-all flex items-center justify-between gap-3"
              >
                {/* 1. Ảnh chân dung khung tròn */}
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#105e3f]/25 bg-emerald-50 flex-shrink-0 shadow-2xs">
                  <img
                    src={exp.avatar}
                    alt={exp.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* 2. Tên chuyên gia & Chuyên môn */}
                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="font-extrabold text-[14px] text-slate-900 leading-snug truncate">
                    {exp.name}
                  </h4>
                  <p className="text-[11.5px] text-slate-500 font-medium leading-tight mt-0.5 truncate">
                    {exp.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[10.5px]">
                    <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {exp.rating}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-emerald-700 font-semibold truncate">
                      {exp.experience}
                    </span>
                  </div>
                </div>

                {/* 3. Số tiền 150.000đ/buổi tư vấn & Nút đặt lịch */}
                <div className="flex flex-col items-end flex-shrink-0">
                  <div className="font-extrabold text-[14.5px] text-[#105e3f] leading-tight">
                    {exp.price}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight">
                    {exp.priceUnit}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedExpert(exp)}
                    className="mt-1.5 px-3 py-1.5 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white font-bold text-[11.5px] shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    Đặt lịch
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits summary box */}
          <div className="mt-4 bg-white/80 rounded-2xl p-4 border border-emerald-900/10 space-y-2">
            <div className="flex items-center gap-1.5 text-[#105e3f] font-extrabold text-[12.5px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Quyền lợi khi tham vấn online 1:1</span>
            </div>
            <ul className="text-[11.5px] text-slate-600 space-y-1 pl-4 list-disc leading-relaxed">
              <li>Thời lượng 20 phút trao đổi trực tiếp qua Video Call chuẩn bảo mật.</li>
              <li>Bác sĩ chuyên khoa Da liễu trực tiếp thăm khám và phân tích tình trạng da.</li>
              <li>Không giới hạn số lượng câu hỏi và hướng dẫn phác đồ chăm da khoa học.</li>
              <li>Được lưu trữ hồ sơ tư vấn và hỗ trợ theo dõi sau buổi hẹn.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* MODAL: CHỌN NGÀY & KHUNG GIỜ TƯ VẤN ONLINE 1:1                 */}
      {/* ============================================================== */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[1px] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl w-full max-w-[360px] space-y-4 animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-emerald-200 flex-shrink-0">
                  <img src={selectedExpert.avatar} alt={selectedExpert.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[14px] text-slate-900 leading-snug">
                    {selectedExpert.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">{selectedExpert.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExpert(null)}
                className="p-1 text-gray-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fee Banner */}
            <div className="bg-[#f7faf8] rounded-xl p-3 border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-[10.5px] text-gray-500 block">Thời lượng tham vấn</span>
                <span className="font-extrabold text-[13px] text-slate-900 flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-emerald-600" /> 20 phút Video Call
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10.5px] text-gray-500 block">Phí tư vấn</span>
                <span className="font-extrabold text-[15.5px] text-[#105e3f]">150.000đ</span>
              </div>
            </div>

            {/* Chọn ngày tư vấn */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chọn ngày tư vấn:</span>
                </label>
                <span className="text-[11.5px] font-extrabold text-[#105e3f] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {selectedDate}
                </span>
              </div>

              {/* Quick Date Chips (including November 2026) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { label: 'Hôm nay', date: '31/10/2026', short: '31/10' },
                  { label: 'CN', date: '01/11/2026', short: '01/11' },
                  { label: 'Thứ 6', date: '06/11/2026', short: '06/11' },
                  { label: 'Thứ 6', date: '13/11/2026', short: '13/11' },
                  { label: 'Thứ 6', date: '20/11/2026', short: '20/11' },
                  { label: 'Thứ 6', date: '27/11/2026', short: '27/11' }
                ].map((d) => (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => setSelectedDate(d.date)}
                    className={`flex-shrink-0 w-[58px] py-2 rounded-xl text-center border transition-all cursor-pointer ${
                      selectedDate === d.date
                        ? 'border-[#105e3f] bg-[#105e3f] text-white font-extrabold shadow-2xs'
                        : 'border-gray-200 bg-white text-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className={`text-[9.5px] ${selectedDate === d.date ? 'text-emerald-100' : 'text-gray-500'}`}>{d.label}</div>
                    <div className="text-[12px] font-extrabold mt-0.5">{d.short}</div>
                  </button>
                ))}
              </div>

              {/* Tùy chọn ngày khác qua Calendar Picker */}
              <div className="bg-[#f4f7f4] rounded-xl p-2.5 border border-emerald-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  Hoặc chọn ngày tùy ý:
                </span>
                <input
                  type="date"
                  min="2026-10-31"
                  value={(() => {
                    if (!selectedDate) return '2026-10-31';
                    const parts = selectedDate.split('/');
                    if (parts.length === 3) return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                    return '2026-10-31';
                  })()}
                  onChange={(e) => {
                    if (e.target.value) {
                      const [y, m, d] = e.target.value.split('-');
                      setSelectedDate(`${d}/${m}/${y}`);
                    }
                  }}
                  className="text-[11.5px] font-extrabold text-[#105e3f] bg-white border border-emerald-300 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-2xs"
                />
              </div>
            </div>

            {/* Chọn khung giờ */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-extrabold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chọn khung giờ khả dụng:</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {selectedExpert.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-2.5 rounded-xl text-center border text-[12px] transition-all cursor-pointer ${
                      selectedTimeSlot === slot
                        ? 'border-[#105e3f] bg-[#105e3f] text-white font-extrabold shadow-2xs'
                        : 'border-gray-200 bg-white text-slate-800 hover:border-emerald-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="w-full py-3 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[13.5px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Xác nhận đặt lịch (150.000đ)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ĐẶT LỊCH ONLINE THÀNH CÔNG                               */}
      {/* ============================================================== */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[1px] flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-[340px] rounded-3xl p-6 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#105e3f] flex items-center justify-center mx-auto mb-3 shadow-xs">
              <CheckCircle2 className="w-9 h-9 stroke-[2.4]" />
            </div>

            <h3 className="font-extrabold text-[17px] text-[#105e3f] mb-1">
              Đặt lịch tư vấn online thành công!
            </h3>
            <p className="text-[12px] text-gray-500 mb-4">
              Hasaki sẽ gửi đường dẫn tham gia phòng Video Call qua tin nhắn và thông báo.
            </p>

            <div className="bg-[#eff4ef] rounded-2xl p-4 text-left text-[12px] space-y-1.5 mb-5 border border-emerald-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Khách hàng:</span>
                <strong className="text-slate-900">{user?.name || 'Nguyễn Văn A'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bác sĩ tư vấn:</span>
                <strong className="text-[#105e3f]">{bookingSuccessModal.consultant}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Thời gian hẹn:</span>
                <strong className="text-slate-900">{bookingSuccessModal.time} ({bookingSuccessModal.date})</strong>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1">
                <span className="text-gray-500">Phí dịch vụ:</span>
                <strong className="text-[#105e3f] font-extrabold">150.000đ</strong>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setBookingSuccessModal(null);
                  if (onNavigateHistory) onNavigateHistory();
                }}
                className="w-full py-2.5 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[13px] shadow-sm transition-all cursor-pointer"
              >
                Xem phiếu hẹn trong Lịch sử
              </button>

              <button
                type="button"
                onClick={() => {
                  setBookingSuccessModal(null);
                  onBackToHome();
                }}
                className="w-full py-2 rounded-full text-slate-500 font-semibold text-[12.5px] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Về trang chủ Hasaki
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
