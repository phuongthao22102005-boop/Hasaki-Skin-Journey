import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  SlidersHorizontal, 
  FileText, 
  Minus, 
  X, 
  User, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ChevronsUpDown, 
  Download,
  CheckCircle2,
  CalendarCheck,
  Receipt
} from 'lucide-react';
import { initialBookingSlips } from '../data/bookingHistoryData';

// Custom realistic QR Code SVG
function QRCodeBox({ value = 'HASAKI_BOOKING', size = 68 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="w-full h-full select-none">
      {/* 3 Corner Finder Patterns */}
      <rect x="5" y="5" width="28" height="28" rx="4" fill="none" stroke="#111827" strokeWidth="4" />
      <rect x="11" y="11" width="16" height="16" rx="2" fill="#111827" />

      <rect x="67" y="5" width="28" height="28" rx="4" fill="none" stroke="#111827" strokeWidth="4" />
      <rect x="73" y="11" width="16" height="16" rx="2" fill="#111827" />

      <rect x="5" y="67" width="28" height="28" rx="4" fill="none" stroke="#111827" strokeWidth="4" />
      <rect x="11" y="73" width="16" height="16" rx="2" fill="#111827" />

      {/* Data Dots & Patterns */}
      <rect x="42" y="8" width="8" height="8" fill="#111827" />
      <rect x="52" y="14" width="8" height="8" fill="#111827" />
      <rect x="42" y="24" width="8" height="8" fill="#111827" />
      <rect x="10" y="42" width="8" height="8" fill="#111827" />
      <rect x="22" y="48" width="8" height="8" fill="#111827" />
      <rect x="38" y="40" width="8" height="8" fill="#111827" />
      <rect x="50" y="46" width="10" height="10" fill="#111827" />
      <rect x="42" y="58" width="8" height="8" fill="#111827" />
      <rect x="66" y="42" width="8" height="8" fill="#111827" />
      <rect x="78" y="50" width="8" height="8" fill="#111827" />
      <rect x="86" y="42" width="8" height="8" fill="#111827" />
      <rect x="42" y="72" width="8" height="8" fill="#111827" />
      <rect x="54" y="68" width="8" height="8" fill="#111827" />
      <rect x="46" y="84" width="8" height="8" fill="#111827" />
      <rect x="66" y="74" width="8" height="8" fill="#111827" />
      <rect x="76" y="84" width="10" height="10" fill="#111827" />
      <rect x="86" y="68" width="8" height="8" fill="#111827" />
    </svg>
  );
}

export default function ScreenLichSuDatLich({ 
  user = { name: 'TRỊNH PHƯƠNG THẢO', gender: 'Nữ' }, 
  slips = [],
  onBackToHome,
  onNavigateInvoice
}) {
  // Tabs: 'da_thanh_toan' (Hình 1) | 'da_tiep_nhan' | 'da_kham' (Hình 3) | 'da_huy'
  const [activeTab, setActiveTab] = useState('da_thanh_toan');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [downloadToast, setDownloadToast] = useState(null);

  // Filter Form State (Hình 2)
  const [filterProfile, setFilterProfile] = useState('Tất cả hồ sơ');
  const [filterFromDate, setFilterFromDate] = useState('30/09/2026');
  const [filterToDate, setFilterToDate] = useState('30/01/2027');
  const [filterSort, setFilterSort] = useState('Mới nhất');

  // Effective slips list
  const allSlips = slips && slips.length > 0 ? slips : initialBookingSlips;

  // When user applies filter: transitions to Hình 3 (Hiển thị lịch sử các lần đặt lịch)
  const handleApplyFilter = () => {
    setShowFilterModal(false);
    setActiveTab('da_kham');
  };

  const handleDownloadSlip = (slipCode) => {
    setDownloadToast(`Đã tải phiếu ${slipCode} thành công!`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3000);
  };

  // Determine which slips to show
  let displayedSlips = [];
  if (activeTab === 'da_tiep_nhan') {
    displayedSlips = allSlips.filter(s => s.status === 'da_tiep_nhan' || s.isNewlyBooked);
  } else if (activeTab === 'da_kham') {
    displayedSlips = allSlips.filter(s => s.status === 'da_kham' || !s.status);
  } else if (activeTab === 'da_thanh_toan') {
    displayedSlips = allSlips.filter(s => s.status === 'da_thanh_toan');
  } else if (activeTab === 'da_huy') {
    displayedSlips = allSlips.filter(s => s.status === 'da_huy');
  }

  const tabs = [
    { id: 'da_thanh_toan', label: 'Đã thanh toán' },
    { 
      id: 'da_tiep_nhan', 
      label: allSlips.filter(s => s.status === 'da_tiep_nhan' || s.isNewlyBooked).length > 0 
        ? `Đã tiếp nhận (${allSlips.filter(s => s.status === 'da_tiep_nhan' || s.isNewlyBooked).length})`
        : 'Đã tiếp nhận'
    },
    { id: 'da_kham', label: 'Đã khám' },
    { id: 'da_huy', label: 'Đã hủy' }
  ];

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col bg-[#eff4ef] select-none text-slate-800 overflow-hidden">
      
      {/* Toast Notification */}
      {downloadToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-[12.5px] font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
            <span>Lịch sử đặt lịch</span>
          </button>

          {/* Nút Lọc (Hình 1 & 3) */}
          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e3e8e3] hover:bg-[#d5ded5] active:scale-95 text-slate-800 text-[12px] font-bold shadow-2xs transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-700 stroke-[2.5]" />
            <span>Lọc</span>
          </button>
        </div>

        {/* 4 Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#105e3f] text-white shadow-xs'
                    : 'bg-[#d2d6d3] text-slate-800 hover:bg-[#c6cbc7]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
        
        {/* CASE 1: Khi danh sách rỗng (Hình 1 - "Không có dữ liệu") */}
        {displayedSlips.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[460px] text-center px-4">
            {/* Circular container with document and minus icon */}
            <div className="w-28 h-28 rounded-full bg-[#f1f4f1] border border-gray-100 flex items-center justify-center mb-4 shadow-2xs">
              <div className="relative">
                <FileText className="w-14 h-14 text-slate-500 stroke-[1.4]" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#f1f4f1] border-2 border-slate-500 flex items-center justify-center">
                  <Minus className="w-3.5 h-3.5 text-slate-600 stroke-[3]" />
                </div>
              </div>
            </div>

            <h3 className="font-extrabold text-[16px] text-slate-900 mb-1.5">
              Không có dữ liệu
            </h3>
            <p className="text-[12.5px] text-slate-600 leading-relaxed max-w-[280px]">
              {activeTab === 'da_thanh_toan' 
                ? 'Các phiếu tham khám hoặc tư vấn sẽ xuất hiện ở đây, bạn quay lại sau nhé.'
                : 'Không có phiếu hẹn nào trong trạng thái này.'}
            </p>

            {/* Quick button to open Filter or switch to completed history */}
            <button
              type="button"
              onClick={() => setShowFilterModal(true)}
              className="mt-5 px-4 py-2 rounded-full bg-[#105e3f] text-white text-[12.5px] font-bold shadow-xs hover:bg-[#0c4a31] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Mở bộ lọc tìm kiếm</span>
            </button>
          </div>
        )}

        {/* CASE 2: Hiển thị các phiếu hẹn đặt lịch (Hình 3) */}
        {displayedSlips.length > 0 && (
          <div className="space-y-4">
            {displayedSlips.map((slip) => {
              const isNewlyBooked = slip.isNewlyBooked || slip.status === 'da_tiep_nhan';
              const isConsultation = (slip.slipType || '').toLowerCase().includes('tư vấn');
              const feeLabel = isConsultation ? 'Tiền tư vấn:' : 'Tiền thăm khám:';
              const dateLabel = isConsultation ? 'Ngày tư vấn' : 'Ngày khám';

              return (
                <div 
                  key={slip.id || slip.slipCode} 
                  className={`bg-white rounded-3xl p-5 shadow-xs border transition-all ${
                    isNewlyBooked ? 'border-[#105e3f]/40 ring-2 ring-emerald-500/10' : 'border-gray-100'
                  }`}
                >
                  {/* Status Badge if newly booked or accepted */}
                  {isNewlyBooked && (
                    <div className="mb-2.5 flex justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-[#105e3f] border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        ĐÃ TIẾP NHẬN - CHỜ PHỤC VỤ
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center">
                    <h4 className="font-extrabold text-[13.5px] text-slate-900">
                      {slip.clinicName || 'Hasaki Vietnam'}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {slip.clinicAddress}
                    </p>
                  </div>

                  <div className="border-b border-dashed border-gray-300 my-2.5" />

                  {/* Title */}
                  <div className="text-center">
                    <div className="font-extrabold text-[15.5px] text-[#105e3f] uppercase tracking-wide">
                      {slip.slipType || (isConsultation ? 'PHIẾU TƯ VẤN' : 'PHIẾU THĂM KHÁM')}
                    </div>
                    <div className="font-extrabold text-[13.5px] text-slate-900 uppercase mt-0.5">
                      {slip.category || (isConsultation ? 'CHĂM SÓC DA' : 'DA LIỄU')}
                    </div>
                    <div className="font-extrabold text-[14px] text-[#105e3f] mt-0.5">
                      {slip.room || (isConsultation ? 'Tầng trệt' : 'Phòng 2 - Lầu 1')}
                    </div>
                  </div>

                  {/* Số thứ tự tròn */}
                  <div className="flex justify-center my-3">
                    <div className="w-18 h-18 rounded-full border-4 border-[#105e3f] bg-white flex flex-col items-center justify-center shadow-xs">
                      <span className="text-[9.5px] font-bold text-slate-600 leading-tight">Số thứ tự</span>
                      <span className="text-[26px] font-extrabold text-slate-900 leading-none">
                        {slip.queueNumber || 1}
                      </span>
                    </div>
                  </div>

                  {/* Ngày & Giờ dự kiến */}
                  <div className="grid grid-cols-2 gap-2.5 my-3">
                    <div className="bg-[#d2d6d3] rounded-2xl py-2 px-3 text-center">
                      <div className="text-[10px] text-slate-600 font-medium">{dateLabel}</div>
                      <div className="font-extrabold text-[14px] text-slate-900">{slip.date}</div>
                    </div>
                    <div className="bg-[#d2d6d3] rounded-2xl py-2 px-3 text-center">
                      <div className="text-[10px] text-slate-600 font-medium">Giờ dự kiến</div>
                      <div className="font-extrabold text-[14px] text-slate-900">{slip.time}</div>
                    </div>
                  </div>

                  {/* Khung thông tin khách hàng & QR */}
                  <div className="rounded-2xl border border-gray-400 p-3.5 space-y-2 text-[12px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-700">Họ tên:</span>{' '}
                        <strong className="text-slate-900 font-extrabold uppercase">
                          {slip.patientName || user?.name || 'TRỊNH PHƯƠNG THẢO'}
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-700">Giới tính:</span>{' '}
                        <strong className="text-slate-900 font-bold">{slip.gender || user?.gender || 'Nữ'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-700">Ngày sinh:</span>{' '}
                        <strong className="text-slate-900 font-bold">{slip.dob || '22/10/2005'}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-700">Tỉnh/TP:</span>{' '}
                      <strong className="text-slate-900 font-bold">{slip.city || 'Hồ Chí Minh'}</strong>
                    </div>

                    {slip.consultant && (
                      <div>
                        <span className="text-slate-700">Phụ trách:</span>{' '}
                        <strong className="text-[#105e3f] font-bold">{slip.consultant}</strong>
                      </div>
                    )}

                    <div className="border-b border-dashed border-gray-300 my-2" />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div>
                          <span className="text-slate-700">Mã KH:</span>{' '}
                          <strong className="text-slate-900 font-bold">
                            {slip.customerCode || 'N18-000001'}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-700">Mã phiếu:</span>{' '}
                          <strong className="text-slate-900 font-bold">{slip.slipCode}</strong>
                        </div>
                        <div className="border-b border-dotted border-gray-300 my-1 w-36" />
                        <div>
                          <span className="text-slate-700">{feeLabel}</span>{' '}
                          <strong className="text-slate-900 font-extrabold">{slip.fee}</strong>
                        </div>
                        <div>
                          <span className="text-slate-700">Voucher:</span>{' '}
                          <strong className="text-slate-900 font-bold">{slip.voucher || 'Không'}</strong>
                        </div>
                      </div>

                      {/* QR Code */}
                      <div className="p-1.5 bg-white border border-gray-200 rounded-xl shadow-2xs flex-shrink-0">
                        <QRCodeBox value={`${slip.slipCode}_HASAKI`} size={68} />
                      </div>
                    </div>

                    {/* Hướng dẫn màu đỏ */}
                    <p className="text-[10px] text-[#dc2626] text-center font-medium leading-tight pt-1">
                      Vui lòng đến quầy thu ngân tầng trệt để được xác nhận trước khi vào phòng khám.
                    </p>

                    {/* Ghi chú */}
                    <div className="bg-[#e4e8e4] rounded-xl py-1.5 px-3 text-[10.5px] italic text-slate-700 text-center">
                      {slip.note || 'Ghi chú: Số thứ tự chỉ có giá trị trong ngày khám.'}
                    </div>

                    {/* Mã giao dịch */}
                    <div className="bg-[#e4e8e4] rounded-xl py-1.5 px-3 text-[10.5px] font-semibold text-slate-900 text-center">
                      Mã giao dịch: {slip.transactionCode || 'HASAKI_TRANSACTION'}
                    </div>
                  </div>

                  {/* Nút Tải phiếu & Xem hóa đơn */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => handleDownloadSlip(slip.slipCode)}
                      className="py-2.5 rounded-xl bg-[#c5d5cb] hover:bg-[#b5c7bc] text-slate-900 font-bold text-[12px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Download className="w-4 h-4 stroke-[2.5]" />
                      <span>Tải phiếu</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigateInvoice) {
                          onNavigateInvoice();
                        }
                      }}
                      className="py-2.5 rounded-xl bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                    >
                      <Receipt className="w-4 h-4" />
                      <span>Xem hóa đơn</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* HÌNH 2: MODAL BỘ LỌC TÌM KIẾM                                  */}
      {/* ============================================================== */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 shadow-2xl w-full max-w-[340px] mx-auto space-y-4">
            
            {/* Modal Header */}
            <div className="relative flex items-center justify-center">
              <h3 className="font-extrabold text-[16px] text-slate-900 text-center">
                Bộ lọc tìm kiếm
              </h3>
              <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-slate-800 hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5 stroke-[2.8]" />
              </button>
            </div>

            <div className="border-b border-dashed border-gray-300 my-1" />

            {/* Field 1: Hồ sơ khách hàng */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-800 mb-1.5">
                Hồ sơ khách hàng
              </label>
              <div
                onClick={() => setFilterProfile(prev => prev === 'Tất cả hồ sơ' ? (user?.name || 'Nguyễn Văn A') : 'Tất cả hồ sơ')}
                className="bg-[#e8ece8] hover:bg-[#dfe4df] rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <User className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="font-bold text-[13px] text-slate-800 truncate">
                    {filterProfile}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
              </div>
            </div>

            {/* Field 2: Khoảng thời gian */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-800 mb-1.5">
                Khoảng thời gian
              </label>
              <div className="bg-[#e8ece8] rounded-2xl p-2.5 flex items-center divide-x divide-gray-400">
                <div className="flex-1 pr-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">Từ ngày</div>
                    <div className="font-extrabold text-[12px] text-slate-900">{filterFromDate}</div>
                  </div>
                  <Calendar className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                </div>

                <div className="flex-1 pl-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">Đến ngày</div>
                    <div className="font-extrabold text-[12px] text-slate-900">{filterToDate}</div>
                  </div>
                  <Calendar className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                </div>
              </div>
            </div>

            {/* Field 3: Sắp xếp */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-800 mb-1.5">
                Sắp xếp
              </label>
              <div
                onClick={() => setFilterSort(prev => prev === 'Mới nhất' ? 'Cũ nhất' : 'Mới nhất')}
                className="bg-[#e8ece8] hover:bg-[#dfe4df] rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-700 stroke-[2.5] flex-shrink-0" />
                  <span className="font-extrabold text-[13px] text-[#105e3f]">
                    {filterSort}
                  </span>
                </div>
                <ChevronsUpDown className="w-4 h-4 text-slate-600 flex-shrink-0" />
              </div>
            </div>

            {/* Nút ÁP DỤNG */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleApplyFilter}
                className="w-full py-3.5 rounded-2xl bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-extrabold text-[14px] uppercase tracking-wider shadow-sm transition-all cursor-pointer text-center"
              >
                ÁP DỤNG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
