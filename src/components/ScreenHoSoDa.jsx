import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  Calendar, 
  CalendarCheck, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  Check, 
  FileText, 
  Edit3, 
  Camera, 
  Activity, 
  ChevronRight, 
  X, 
  ShieldCheck, 
  AlertCircle, 
  MessageSquare, 
  Send, 
  Eye, 
  Download, 
  Award, 
  Stethoscope, 
  Briefcase, 
  Globe, 
  BadgeCheck
} from 'lucide-react';
import { initialBookingSlips } from '../data/bookingHistoryData';

export default function ScreenHoSoDa({ 
  user, 
  bookingSlips = [], 
  onUpdateUser, 
  onBackToHome, 
  onNavigateBooking,
  onNavigateHistory,
  onNavigateInvoice
}) {
  // Navigation / View modes:
  // 'profile_list'     : Danh sách hồ sơ với bản demo có sẵn của TRỊNH PHƯƠNG THẢO
  // 'function_hub'     : Trang "Chọn chức năng" (5 mục)
  // 'treatment_history': Chức năng 1 - Lịch sử tư vấn/điều trị
  // 'treatment_results': Chức năng 2 - Kết quả tư vấn/điều trị
  // 'progress_photos'  : Chức năng 3 - Hình ảnh chụp
  // 'booking_history'  : Chức năng 4 - Lịch sử đặt lịch
  // 'profile_info'     : Chức năng 5 - Thông tin hồ sơ
  const [viewMode, setViewMode] = useState('profile_list');

  // Customer Profile: TRỊNH PHƯƠNG THẢO (Demo profile with persistent edit support)
  const [profileData, setProfileData] = useState(() => {
    return {
      fullName: user?.name || 'TRỊNH PHƯƠNG THẢO',
      birthDate: user?.birthDate || '22/10/2005',
      gender: user?.gender || 'Nữ',
      cccd: user?.cccd || '079305012899',
      country: user?.country || 'Việt Nam',
      job: user?.job || 'Sinh viên / Thiết kế & Sáng tạo nội dung',
      phone: user?.phone || '0987 221 005',
      email: user?.email || 'phuongthao.boop@gmail.com',
      address: user?.address || 'Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
      customerCode: 'HSK-221005',
      currentService: 'Liệu trình Điều trị Mụn & Phục hồi Hàng rào Da Chuyên sâu Chuẩn Y Khoa',
      serviceProgress: 'Đã hoàn thành 3/5 buổi (Tiến độ 60%)',
      primaryDoctor: 'BS. CKI Lê Thị Mai Chi',
      branch: 'Hasaki Clinic Quận 7 (468A Nguyễn Thị Thập)',
      avatar: '/images/thao_avatar.jpg'
    };
  });

  // Edit Mode state in "Thông tin hồ sơ"
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ ...profileData });
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Contact Doctor Modal State (Modal liên hệ người phụ trách)
  const [contactModal, setContactModal] = useState(null);

  // New Client Feedback Form State (Form gửi phản hồi sau điều trị)
  const [feedbackSymptoms, setFeedbackSymptoms] = useState('');
  const [selectedSymptomChip, setSelectedSymptomChip] = useState('Da êm dịu, phục hồi tốt');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Progress Photo Lightbox (Xem ảnh phóng to)
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [compareMode, setCompareMode] = useState('before_after'); // 'before_after' | 'side_by_side'

  // Booking history filter tab in Chức năng 4
  const [bookingFilterTab, setBookingFilterTab] = useState('da_tiep_nhan'); // 'da_thanh_toan' | 'da_tiep_nhan' | 'da_kham' | 'da_huy'
  const [downloadSlipToast, setDownloadSlipToast] = useState(null);

  // Combine slips: live bookingSlips passed from App with initial slips
  const allSlips = (bookingSlips && bookingSlips.length > 0) ? bookingSlips : initialBookingSlips;

  // Filtered slips based on active tab
  const getFilteredSlips = () => {
    return allSlips.filter(s => {
      if (bookingFilterTab === 'da_tiep_nhan') return s.status === 'da_tiep_nhan' || s.isNewlyBooked;
      if (bookingFilterTab === 'da_kham') return s.status === 'da_kham';
      if (bookingFilterTab === 'da_thanh_toan') return s.status === 'da_thanh_toan';
      if (bookingFilterTab === 'da_huy') return s.status === 'da_huy';
      return true;
    });
  };

  // Treatment sessions data for TRỊNH PHƯƠNG THẢO
  const treatmentSessions = [
    {
      sessionNumber: 1,
      date: '15/09/2026',
      status: 'completed',
      statusText: 'Đã hoàn thành',
      serviceName: 'Thăm khám da liễu tổng quát + Soi da đa tầng & Lấy nhân mụn vô khuẩn chuẩn Y khoa + Đắp mặt nạ kháng viêm thảo dược',
      staffRole: 'Bác sĩ phụ trách',
      staffName: 'BS. CKI Vũ Hoài Nam',
      staffPhone: '0903 112 334',
      initialSkinCondition: 'Tăng tiết bã nhờn mạnh vùng chữ T, nhiều mụn viêm đỏ sưng tấy 2 bên má, mụn ẩn li ti rải rác trán và cằm, nền da nhạy cảm mỏng yếu do từng lạm dụng acid treatment nồng độ cao không có bảo vệ.',
      afterSkinCondition: 'Được làm sạch chuyên sâu Y khoa, lấy sạch nhân mụn vô khuẩn chuẩn y tế, sát khuẩn tia điện tím, đắp mặt nạ kháng viêm thảo dược làm dịu tức thì. Giảm sưng đỏ 70%, thông thoáng toàn bộ lỗ chân lông, da nhẹ dịu dễ chịu.',
      sessionNote: 'Ghi chú Bác sĩ: Bệnh nhân đáp ứng làm sạch tốt. Chỉ định uống tối thiểu 2 lít nước/ngày, cấp ẩm phục hồi bằng Serum B5 ngày 2 lần. Không tự ý sờ tay hay nặn mụn tại nhà. Hẹn tái khám sau 14 ngày để peel sinh học.',
      customerFeedback: 'Sau buổi đầu tiên da dịu hẳn không bị đỏ rát như mình từng lo lắng. Nhân mụn chín được gắp sạch, tối về da hơi căng nhẹ nhưng đắp toner cấp ẩm thì êm lại ngay.',
      handoverNote: 'Đã bàn giao cho KTV Da liễu Nguyễn Thùy Linh phụ trách buổi 2'
    },
    {
      sessionNumber: 2,
      date: '29/09/2026',
      status: 'completed',
      statusText: 'Đã hoàn thành',
      serviceName: 'Peel da sinh học BHA 20% giảm bã nhờn gom cồi mụn + Chiếu ánh sáng sinh học Blue Light tiêu diệt vi khuẩn P.acnes',
      staffRole: 'Kỹ thuật viên phụ trách',
      staffName: 'KTV Da liễu Nguyễn Thùy Linh',
      staffPhone: '0908 556 778',
      handoverReceived: 'Nhận bàn giao bệnh án từ BS. CKI Vũ Hoài Nam',
      initialSkinCondition: 'Mụn viêm buổi 1 đã khô mày và xẹp 90%, còn lại các vết thâm đỏ sau viêm (PIE), vùng chữ T giảm tiết dầu khoảng 40%, mụn ẩn vùng trán bắt đầu gom cồi đẩy lên bề mặt.',
      afterSkinCondition: 'Peel dung dịch BHA y khoa thanh tẩy tế bào sừng tắc nghẽn, kiểm soát bã nhờn nang lông; chiếu ánh sáng sinh học Blue Light phổ 415nm tiêu diệt vi khuẩn P.acnes kỵ khí. Da sáng mịn hơn, nhân mụn khô cồi nhanh chóng.',
      sessionNote: 'Ghi chú KTV: Da hơi ửng hồng nhẹ sau peel khoảng 20 phút rồi dịu. Dặn khách bôi kem phục hồi làm dịu Ceramide, thoa kem chống nắng phổ rộng SPF 50+ kỹ lưỡng mỗi ngày.',
      customerFeedback: 'Ngày thứ 2 có bong nhẹ quanh cánh mũi, hơi châm chích nhẹ 15 phút đầu rồi hết, da láng mịn và ít đổ dầu hơn hẳn.',
      handoverNote: 'Đã bàn giao cho BS. CKI Lê Thị Mai Chi phụ trách buổi 3'
    },
    {
      sessionNumber: 3,
      date: '15/10/2026',
      status: 'completed',
      statusText: 'Đã hoàn thành',
      serviceName: 'Điện di lạnh Tế bào gốc Phục hồi Skin Barrier + Laser Toning mờ thâm sáng da',
      staffRole: 'Bác sĩ phụ trách',
      staffName: 'BS. CKI Lê Thị Mai Chi',
      staffPhone: '0902 445 667',
      handoverReceived: 'Nhận bàn giao từ KTV Nguyễn Thùy Linh',
      initialSkinCondition: 'Không còn mụn viêm mới, thâm mụn cũ giảm 50%, da khỏe hơn, hàng rào ẩm phục hồi 80%, lỗ chân lông se khít rõ rệt.',
      afterSkinCondition: 'Điện di lạnh âm -10°C với tinh chất Tế bào gốc thực vật và Hyaluronic Acid đa tầng, khóa ẩm màng lipid; phối hợp Laser Toning bước sóng thấp phá vỡ hắc sắc tố thâm mà không gây đau hay tổn thương.',
      sessionNote: 'Ghi chú Bác sĩ: Hàng rào bảo vệ da đã ổn định tốt, da hấp thu dưỡng chất nhanh. Tiếp tục routine chống nắng và dưỡng ẩm. Lên lịch buổi 4 cấy meso HA căng bóng.',
      customerFeedback: 'Da căng bóng mướt mịn cực kỳ thích, vết thâm đỏ mờ đi trông thấy, trang điểm không bị mốc nền nữa, bạn bè ai cũng khen!',
      handoverNote: 'Đã bàn giao cho BS. CKI Lê Thị Mai Chi tiếp tục theo dõi buổi 4 sắp tới'
    },
    {
      sessionNumber: 4,
      date: '30/10/2026',
      status: 'upcoming',
      statusText: 'Lịch hẹn sắp diễn ra',
      serviceName: 'Tái khám định kỳ & Liệu pháp Căng bóng vi điểm Meso Cocktail HA + B5',
      staffRole: 'Bác sĩ phụ trách',
      staffName: 'BS. CKI Lê Thị Mai Chi',
      staffPhone: '0902 445 667',
      handoverReceived: 'Tiếp tục theo dõi từ buổi 3',
      initialSkinCondition: 'Đang duy trì ổn định, nền da phục hồi 92%, chuẩn bị bước căng bóng chuyên sâu.',
      afterSkinCondition: 'Dự kiến: Tiêm vi điểm Meso cocktail đưa HA trọng lượng phân tử cao và Vitamin B5 trực tiếp vào trung bì, giúp da ngậm nước tối đa, thu nhỏ lỗ chân lông và sáng mịn lâu dài.',
      sessionNote: 'Khách hàng đã có phiếu tiếp nhận khám (N20269095), dự kiến lúc 09:30 - 10:30 ngày 30/10/2026.',
      customerFeedback: 'Chưa thực hiện',
      handoverNote: null
    }
  ];

  // Save profile changes
  const handleSaveProfile = () => {
    setProfileData(editForm);
    setIsEditingProfile(false);
    setProfileSaveSuccess(true);
    if (onUpdateUser) {
      onUpdateUser({
        name: editForm.fullName,
        birthDate: editForm.birthDate,
        gender: editForm.gender,
        cccd: editForm.cccd,
        country: editForm.country,
        job: editForm.job,
        phone: editForm.phone,
        email: editForm.email,
        address: editForm.address
      });
    }
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  // Submit client symptom feedback
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!feedbackSymptoms.trim() && !selectedSymptomChip) return;
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackSymptoms('');
    }, 4000);
  };

  // Toast for downloading slip
  const handleDownloadSlip = (slipCode) => {
    setDownloadSlipToast(`Đã tải phiếu ${slipCode} thành công!`);
    setTimeout(() => setDownloadSlipToast(null), 3000);
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col bg-[#eff4ef] select-none text-slate-800 overflow-hidden font-sans">
      
      {/* Toast Download Slip */}
      {downloadSlipToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-[12.5px] font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{downloadSlipToast}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* HEADER CHUNG                                                   */}
      {/* ============================================================== */}
      <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-20 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (viewMode === 'profile_list') {
                onBackToHome();
              } else if (viewMode === 'function_hub') {
                setViewMode('profile_list');
              } else {
                setViewMode('function_hub');
              }
            }}
            className="flex items-center gap-2 text-slate-900 font-extrabold text-[17.5px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.8] text-[#105e3f]" />
            <span>
              {viewMode === 'profile_list' && 'Hồ sơ da của tôi'}
              {viewMode === 'function_hub' && 'Chọn chức năng'}
              {viewMode === 'treatment_history' && 'Lịch sử tư vấn/điều trị'}
              {viewMode === 'treatment_results' && 'Kết quả tư vấn/điều trị'}
              {viewMode === 'progress_photos' && 'Hình ảnh chụp tiến trình'}
              {viewMode === 'booking_history' && 'Lịch sử đặt lịch'}
              {viewMode === 'profile_info' && 'Thông tin hồ sơ'}
            </span>
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

      {/* ============================================================== */}
      {/* 1. MÀN HÌNH DANH SÁCH HỒ SƠ CÓ SẴN (profile_list)               */}
      {/* ============================================================== */}
      {viewMode === 'profile_list' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#105e3f] to-[#1e7e57] text-white rounded-3xl p-5 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-[11px] font-extrabold tracking-wide uppercase">
                Hasaki Clinic & Spa ID
              </span>
              <h2 className="text-[20px] font-extrabold mt-2 leading-tight">
                Hồ sơ da khách hàng
              </h2>
              <p className="text-[12.5px] text-emerald-100 mt-1 max-w-[280px] leading-relaxed">
                Theo dõi toàn diện phác đồ điều trị da liễu Y khoa, lịch sử khám và tiến trình phục hồi.
              </p>
            </div>
            <Sparkles className="w-24 h-24 text-white/10 absolute -right-4 -bottom-4 pointer-events-none" />
          </div>

          <div className="flex items-center justify-between px-1 pt-1">
            <span className="font-extrabold text-[15px] text-slate-900">
              Hồ sơ da đang hoạt động (1)
            </span>
            <span className="text-[11.5px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Đang trong phác đồ
            </span>
          </div>

          {/* MAIN DEMO PROFILE CARD: TRỊNH PHƯƠNG THẢO */}
          <div
            onClick={() => setViewMode('function_hub')}
            className="bg-white rounded-3xl p-5 shadow-xs border-2 border-emerald-600/30 hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer group active:scale-[0.99] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[#105e3f] text-white text-[10px] font-black px-3.5 py-1 rounded-bl-2xl uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <Award className="w-3 h-3 text-amber-300" />
              <span>Khách hàng VIP</span>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt={profileData.fullName}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/scanned_face.png';
                  }}
                  className="w-18 h-18 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xs flex-shrink-0"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                  <Check className="w-3 h-3 text-white stroke-[3.5]" />
                </span>
              </div>

              <div className="flex-1 min-w-0 pr-12">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-[18px] text-slate-900 group-hover:text-[#105e3f] transition-colors leading-tight">
                    {profileData.fullName}
                  </h3>
                  <BadgeCheck className="w-4.5 h-4.5 text-[#105e3f] flex-shrink-0" />
                </div>

                <div className="flex items-center gap-2 mt-1 text-[12px] text-slate-600">
                  <span className="font-bold text-[#105e3f] bg-emerald-50 px-2 py-0.5 rounded-md">
                    {profileData.customerCode}
                  </span>
                  <span>•</span>
                  <span>{profileData.gender}</span>
                  <span>•</span>
                  <span>{profileData.birthDate}</span>
                </div>

                <p className="text-[12px] text-slate-500 font-medium mt-1 truncate">
                  📞 {profileData.phone}
                </p>
              </div>
            </div>

            <div className="border-b border-dashed border-gray-200 my-3.5" />

            {/* Current Treatment Service Info */}
            <div className="bg-[#f4f8f5] rounded-2xl p-3.5 text-[12.5px] space-y-1.5 border border-emerald-900/5">
              <div className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dịch vụ đang sử dụng:</span>
              </div>
              <div className="font-extrabold text-[13.5px] text-[#105e3f] leading-snug">
                {profileData.currentService}
              </div>
              <div className="flex items-center justify-between text-[11.5px] text-slate-600 pt-1">
                <span>Tiến trình: <strong className="text-slate-900">{profileData.serviceProgress}</strong></span>
                <span className="text-emerald-700 font-semibold">{profileData.branch.split(' (')[0]}</span>
              </div>
            </div>

            {/* Click to choose functions button */}
            <div className="mt-4 pt-1 flex items-center justify-between">
              <span className="text-[12px] font-extrabold text-[#105e3f] flex items-center gap-1 group-hover:underline">
                Bấm vào để chọn chức năng quản lý da
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-[#105e3f] flex items-center justify-center group-hover:bg-[#105e3f] group-hover:text-white transition-all">
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Option to add new profile / help banner */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setViewMode('function_hub')}
              className="w-full py-3.5 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[14px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mở hồ sơ TRỊNH PHƯƠNG THẢO</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. MÀN HÌNH "CHỌN CHỨC NĂNG" (function_hub)                      */}
      {/* ============================================================== */}
      {viewMode === 'function_hub' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
          
          {/* Top Profile Summary Card */}
          <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 flex items-center gap-3.5">
            <img
              src={profileData.avatar}
              alt={profileData.fullName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/scanned_face.png';
              }}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-2xs flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-[16px] text-slate-900 leading-tight">
                  {profileData.fullName}
                </h3>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-[#105e3f] px-2 py-0.5 rounded-full">
                  {profileData.customerCode}
                </span>
              </div>
              <p className="text-[11.5px] text-[#105e3f] font-semibold mt-0.5 truncate">
                {profileData.currentService}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Tiến độ: {profileData.serviceProgress}
              </p>
            </div>
          </div>

          {/* Section Heading */}
          <div className="px-1 pt-1 pb-1">
            <h3 className="font-extrabold text-[15px] text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#105e3f] rounded-full inline-block" />
              CHỌN CHỨC NĂNG HỒ SƠ DA
            </h3>
            <p className="text-[12px] text-gray-500 mt-0.5 font-medium">
              Vui lòng chọn mục chức năng bạn muốn theo dõi hoặc quản lý
            </p>
          </div>

          {/* 5 CORE FUNCTION CARDS */}
          <div className="space-y-3">
            
            {/* 1. Lịch sử tư vấn/điều trị */}
            <div
              onClick={() => setViewMode('treatment_history')}
              className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 hover:border-[#105e3f] hover:shadow-md transition-all cursor-pointer group active:scale-[0.99] flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#105e3f] flex items-center justify-center flex-shrink-0 group-hover:bg-[#105e3f] group-hover:text-white transition-colors shadow-2xs">
                  <Activity className="w-6 h-6 stroke-[2.4]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-[15px] text-slate-900 group-hover:text-[#105e3f] transition-colors">
                      Lịch sử tư vấn/điều trị
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#105e3f] text-[10px] font-extrabold">
                      4 buổi
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                    Ghi chú từng buổi, tình trạng da, bàn giao nhân viên & feedback
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#105e3f] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
            </div>

            {/* 2. Kết quả tư vấn/điều trị */}
            <div
              onClick={() => setViewMode('treatment_results')}
              className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 hover:border-[#105e3f] hover:shadow-md transition-all cursor-pointer group active:scale-[0.99] flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#105e3f] flex items-center justify-center flex-shrink-0 group-hover:bg-[#105e3f] group-hover:text-white transition-colors shadow-2xs">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.4]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-[15px] text-slate-900 group-hover:text-[#105e3f] transition-colors">
                      Kết quả tư vấn/điều trị
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#105e3f] text-[10px] font-extrabold">
                      Cải thiện 92%
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                    Chỉ số phục hồi, kết luận lâm sàng & 5 lưu ý y khoa quan trọng
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#105e3f] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
            </div>

            {/* 3. Hình ảnh chụp */}
            <div
              onClick={() => setViewMode('progress_photos')}
              className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 hover:border-[#105e3f] hover:shadow-md transition-all cursor-pointer group active:scale-[0.99] flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#105e3f] flex items-center justify-center flex-shrink-0 group-hover:bg-[#105e3f] group-hover:text-white transition-colors shadow-2xs">
                  <Camera className="w-6 h-6 stroke-[2.4]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-[15px] text-slate-900 group-hover:text-[#105e3f] transition-colors">
                      Hình ảnh chụp
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#105e3f] text-[10px] font-extrabold">
                      3 ảnh lâm sàng
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                    Ảnh soi da thay đổi qua các buổi & ghi chú chi tiết của bác sĩ
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#105e3f] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
            </div>

            {/* 4. Lịch sử đặt lịch */}
            <div
              onClick={() => setViewMode('booking_history')}
              className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 hover:border-[#105e3f] hover:shadow-md transition-all cursor-pointer group active:scale-[0.99] flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#105e3f] flex items-center justify-center flex-shrink-0 group-hover:bg-[#105e3f] group-hover:text-white transition-colors shadow-2xs">
                  <CalendarCheck className="w-6 h-6 stroke-[2.4]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-[15px] text-slate-900 group-hover:text-[#105e3f] transition-colors">
                      Lịch sử đặt lịch
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold">
                      Liên kết đặt lịch
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                    Phiếu khám: Đã tiếp nhận, Đã thanh toán, Đã khám, Đã hủy
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#105e3f] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
            </div>

            {/* 5. Thông tin hồ sơ */}
            <div
              onClick={() => setViewMode('profile_info')}
              className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 hover:border-[#105e3f] hover:shadow-md transition-all cursor-pointer group active:scale-[0.99] flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#105e3f] flex items-center justify-center flex-shrink-0 group-hover:bg-[#105e3f] group-hover:text-white transition-colors shadow-2xs">
                  <User className="w-6 h-6 stroke-[2.4]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-[15px] text-slate-900 group-hover:text-[#105e3f] transition-colors">
                      Thông tin hồ sơ
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#105e3f] text-[10px] font-extrabold">
                      Hồ sơ cá nhân
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                    Họ tên, ngày sinh, giới tính, CCCD, Quốc gia, Nghề nghiệp, SĐT...
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#105e3f] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
            </div>

          </div>

          {/* Quick Back to Profile List */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setViewMode('profile_list')}
              className="text-[12.5px] text-slate-500 hover:text-[#105e3f] font-semibold underline cursor-pointer"
            >
              ← Quay lại danh sách hồ sơ
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* CHỨC NĂNG 1: LỊCH SỬ TƯ VẤN/ĐIỀU TRỊ (treatment_history)         */}
      {/* ============================================================== */}
      {viewMode === 'treatment_history' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
          
          {/* Header Banner: Tên khách hàng & Dịch vụ đang sử dụng */}
          <div className="bg-gradient-to-r from-[#105e3f] to-[#1e7e57] text-white rounded-3xl p-4.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full uppercase">
                HASAKI CLINIC & SPA
              </span>
              <span className="text-[11.5px] font-bold text-emerald-200">
                Mã KH: {profileData.customerCode}
              </span>
            </div>
            
            <h2 className="text-[19px] font-extrabold mt-2 leading-tight">
              {profileData.fullName}
            </h2>

            <div className="mt-2 bg-black/20 rounded-2xl p-3 border border-white/10 text-[12.5px] space-y-1">
              <div className="text-[11px] text-emerald-200 font-bold uppercase">
                Dịch vụ đang sử dụng:
              </div>
              <div className="font-extrabold text-white text-[13.5px] leading-snug">
                {profileData.currentService}
              </div>
              <div className="flex items-center justify-between text-[11.5px] text-emerald-100 pt-1 border-t border-white/10 mt-1.5">
                <span>Tiến trình: <strong className="text-white">{profileData.serviceProgress}</strong></span>
                <span>Bác sĩ chỉ đạo: <strong className="text-white">{profileData.primaryDoctor}</strong></span>
              </div>
            </div>
          </div>

          <div className="px-1 flex items-center justify-between">
            <h3 className="font-extrabold text-[15px] text-slate-900">
              Chi tiết các buổi điều trị (3/5)
            </h3>
            <span className="text-[11.5px] text-gray-500 font-medium">
              Ghi chú chuẩn Y khoa
            </span>
          </div>

          {/* List of 4 Treatment Sessions */}
          <div className="space-y-4">
            {treatmentSessions.map((sess) => (
              <div
                key={sess.sessionNumber}
                className="bg-white rounded-3xl p-4.5 shadow-xs border border-gray-100 space-y-3"
              >
                {/* Session Header */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#105e3f] text-white font-extrabold text-[13px] flex items-center justify-center shadow-2xs">
                      #{sess.sessionNumber}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-[14.5px] text-slate-900 leading-tight">
                        Buổi {sess.sessionNumber} ({sess.date})
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        {sess.staffRole}: <strong className="text-[#105e3f]">{sess.staffName}</strong>
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                    sess.status === 'completed' 
                      ? 'bg-emerald-100 text-[#105e3f]' 
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {sess.statusText}
                  </span>
                </div>

                {/* Handover Received Note if applicable */}
                {sess.handoverReceived && (
                  <div className="bg-sky-50 border border-sky-200 text-sky-900 rounded-xl px-3 py-1.5 text-[11.5px] font-medium flex items-center gap-1.5">
                    <span className="text-sky-600 font-bold">ℹ️</span>
                    <span>{sess.handoverReceived}</span>
                  </div>
                )}

                {/* Dịch vụ thực hiện */}
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase block mb-0.5">
                    Dịch vụ thực hiện:
                  </span>
                  <div className="font-bold text-[13px] text-[#105e3f] leading-snug">
                    {sess.serviceName}
                  </div>
                </div>

                {/* Tình trạng da ban đầu & sau điều trị */}
                <div className="grid grid-cols-1 gap-2.5 text-[12px]">
                  <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-3">
                    <span className="font-extrabold text-amber-900 block mb-1">
                      ⚠️ Tình trạng da ban đầu trước buổi khám:
                    </span>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {sess.initialSkinCondition}
                    </p>
                  </div>

                  <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3">
                    <span className="font-extrabold text-[#105e3f] block mb-1">
                      ✨ Tình trạng sau khi tư vấn/điều trị tại Hasaki Clinic:
                    </span>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {sess.afterSkinCondition}
                    </p>
                  </div>
                </div>

                {/* Ghi chú theo từng buổi */}
                <div className="bg-[#f7faf8] rounded-2xl p-3 text-[12px] border border-gray-100">
                  <div className="font-extrabold text-slate-900 mb-0.5">
                    📝 Ghi chú theo dõi của Bác sĩ / KTV:
                  </div>
                  <p className="text-slate-600 italic leading-relaxed">
                    {sess.sessionNote}
                  </p>
                </div>

                {/* Feedback của khách hàng sau điều trị */}
                {sess.customerFeedback !== 'Chưa thực hiện' && (
                  <div className="bg-purple-50/80 border border-purple-200/80 rounded-2xl p-3 text-[12px]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-purple-950 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-purple-700" />
                        <span>Phản hồi của khách hàng (Trịnh Phương Thảo):</span>
                      </span>
                      <span className="text-[10.5px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                        Đã xác nhận
                      </span>
                    </div>
                    <p className="text-slate-700 italic leading-relaxed">
                      "{sess.customerFeedback}"
                    </p>
                  </div>
                )}

                {/* Nút liên hệ người phụ trách */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setContactModal({
                      name: sess.staffName,
                      role: sess.staffRole,
                      phone: sess.staffPhone,
                      session: sess.sessionNumber
                    })}
                    className="w-full py-2.5 rounded-2xl bg-white border border-[#105e3f] text-[#105e3f] hover:bg-emerald-50 active:scale-98 font-bold text-[12.5px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Liên hệ người phụ trách ({sess.staffName})</span>
                  </button>
                </div>

                {/* BÀN GIAO CHO NGƯỜI TIẾP THEO */}
                {sess.handoverNote && (
                  <div className="mt-1 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-2xl px-3.5 py-2 text-[12px] font-bold text-amber-900 flex items-center gap-2">
                    <span className="text-[15px]">🔄</span>
                    <span>{sess.handoverNote}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MỤC GỬI PHẢN HỒI / TRIỆU CHỨNG SAU ĐIỀU TRỊ CỦA KHÁCH HÀNG */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 space-y-3.5">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-[15px] text-[#105e3f] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#105e3f]" />
                <span>Gửi phản hồi / Ghi nhận triệu chứng</span>
              </h4>
              <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Bác sĩ hỗ trợ 15p
              </span>
            </div>

            <p className="text-[12px] text-gray-500 leading-relaxed font-medium">
              Nếu bạn gặp bất kỳ cảm giác châm chích, bong da hoặc triệu chứng nào sau buổi điều trị, hãy chọn và mô tả bên dưới:
            </p>

            {/* Quick Symptom Chips */}
            <div className="flex flex-wrap gap-2">
              {[
                'Da êm dịu, phục hồi tốt',
                'Hơi khô căng nhẹ',
                'Hơi đỏ quanh cánh mũi',
                'Bong mài nhẹ bình thường',
                'Hơi ngứa châm chích nhẹ'
              ].map(chip => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setSelectedSymptomChip(chip)}
                  className={`px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                    selectedSymptomChip === chip
                      ? 'bg-[#105e3f] text-white shadow-2xs'
                      : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-3">
              <textarea
                value={feedbackSymptoms}
                onChange={(e) => setFeedbackSymptoms(e.target.value)}
                placeholder="Mô tả chi tiết triệu chứng của bạn (ví dụ: ngày thứ 2 da hơi căng sau rửa mặt...)"
                rows={3}
                className="w-full p-3 rounded-2xl border border-gray-300 text-[13px] bg-slate-50 focus:bg-white focus:border-[#105e3f] outline-none font-medium text-slate-800"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[13.5px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Gửi triệu chứng cho Bác sĩ phụ trách</span>
              </button>
            </form>

            {feedbackSubmitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-[12.5px] text-[#105e3f] font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Đã gửi phản hồi thành công! BS. CKI Lê Thị Mai Chi sẽ liên hệ lại với bạn trong ít phút.</span>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* CHỨC NĂNG 2: KẾT QUẢ TƯ VẤN/ĐIỀU TRỊ (treatment_results)         */}
      {/* ============================================================== */}
      {viewMode === 'treatment_results' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#105e3f] to-[#1e7e57] text-white rounded-3xl p-5 shadow-sm">
            <span className="text-[11px] font-extrabold tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full uppercase">
              BÁO CÁO KẾT QUẢ Y KHOA
            </span>
            <h2 className="text-[20px] font-extrabold mt-2 leading-tight">
              Kết quả điều trị da liễu
            </h2>
            <p className="text-[12.5px] text-emerald-100 mt-1">
              Khách hàng: <strong className="text-white">{profileData.fullName}</strong> • {profileData.customerCode}
            </p>
          </div>

          {/* Clinical Progress Scores */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 space-y-3.5">
            <div className="flex items-center justify-between pb-1 border-b border-gray-100">
              <h4 className="font-extrabold text-[15px] text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#105e3f]" />
                <span>Chỉ số cải thiện lâm sàng sau 3 buổi</span>
              </h4>
              <span className="text-[12.5px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                92% Tổng thể
              </span>
            </div>

            <div className="space-y-3 text-[12.5px]">
              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Giảm mụn viêm đỏ & mụn ẩn</span>
                  <span className="text-emerald-700">95%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Phục hồi hàng rào màng ẩm (Skin Barrier)</span>
                  <span className="text-emerald-700">88%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Mờ thâm mụn sau viêm (PIE/PIH)</span>
                  <span className="text-emerald-700">78%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Kiểm soát dầu nhờn vùng chữ T</span>
                  <span className="text-emerald-700">85%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Độ đàn hồi & Căng bóng da</span>
                  <span className="text-emerald-700">88%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Official Assessment */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#105e3f] flex-shrink-0 font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-[15px] text-slate-900">
                  Kết luận của Bác sĩ Da liễu
                </h4>
                <p className="text-[11.5px] text-gray-500">
                  Phụ trách: <strong>BS. CKI Lê Thị Mai Chi</strong> (ĐH Y Dược TP.HCM)
                </p>
              </div>
            </div>

            <div className="bg-[#f4f8f5] rounded-2xl p-4 border border-emerald-900/10 text-[13px] text-slate-700 leading-relaxed font-medium">
              "Khách hàng Trịnh Phương Thảo đáp ứng phác đồ điều trị mụn và phục hồi rất tốt. Ổ viêm đã dứt điểm 100%, hàng rào lipid được tái thiết lập vững chắc, hiện chỉ còn một số vết thâm nông đang trong quá trình đào thải melanin tự nhiên. Tiên lượng phục hồi hoàn toàn sau buổi 4 và 5 đạt trên 95%."
            </div>
          </div>

          {/* CÁC CHÚ Ý + LƯU Ý CỦA BÁC SĨ / CHUYÊN VIÊN */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 space-y-3.5">
            <h4 className="font-extrabold text-[15px] text-[#105e3f] flex items-center gap-2">
              <AlertCircle className="w-4.5 h-4.5 text-[#105e3f]" />
              <span>Các chú ý & Lưu ý quan trọng của Bác sĩ</span>
            </h4>

            <div className="space-y-3 text-[12.5px]">
              
              {/* Note 1: Làm sạch */}
              <div className="bg-[#eff4ef] rounded-2xl p-3.5 border-l-4 border-[#105e3f]">
                <div className="font-extrabold text-[#105e3f] text-[13px] mb-1 flex items-center gap-1.5">
                  <span>🧼 1. Vệ sinh & Làm sạch da chuẩn Y khoa:</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Rửa mặt nhẹ nhàng 2 lần/ngày bằng nước ấm hoặc nước mát, dùng gel rửa mặt pH chuẩn 5.5 dịu nhẹ. Tuyệt đối không dùng máy rửa mặt hay tẩy tế bào chết dạng hạt (scrub) trong giai đoạn này tránh xước da.
                </p>
              </div>

              {/* Note 2: Chống nắng */}
              <div className="bg-[#eff4ef] rounded-2xl p-3.5 border-l-4 border-amber-600">
                <div className="font-extrabold text-amber-800 text-[13px] mb-1 flex items-center gap-1.5">
                  <span>☀️ 2. Chống nắng & Bảo vệ toàn diện:</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Bắt buộc thoa kem chống nắng phổ rộng Broad Spectrum SPF 50+ PA++++ trước khi ra ngoài 20 phút. Thoa lại sau mỗi 3-4 giờ nếu tiếp xúc ánh sáng; che chắn khẩu trang tối màu chống tia UV.
                </p>
              </div>

              {/* Note 3: Phục hồi */}
              <div className="bg-[#eff4ef] rounded-2xl p-3.5 border-l-4 border-sky-600">
                <div className="font-extrabold text-sky-800 text-[13px] mb-1 flex items-center gap-1.5">
                  <span>💧 3. Dưỡng ẩm & Phục hồi tại nhà:</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Sử dụng Serum B5 và Kem dưỡng Ceramide đều đặn sáng và tối để khóa ẩm tầng sâu. Tuyệt đối không dùng tay cạy vảy, nặn mụn non hoặc thử hoạt chất treatment nồng độ cao chưa qua tư vấn.
                </p>
              </div>

              {/* Note 4: Sinh hoạt */}
              <div className="bg-[#eff4ef] rounded-2xl p-3.5 border-l-4 border-emerald-600">
                <div className="font-extrabold text-emerald-800 text-[13px] mb-1 flex items-center gap-1.5">
                  <span>🥗 4. Chế độ ăn uống & Giấc ngủ:</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Uống đủ 2 - 2.5 lít nước lọc mỗi ngày. Hạn chế đồ ngọt, trà sữa, sữa bò tươi và thức ăn chiên xào nhiều dầu mỡ. Ngủ trước 23h00 để da có thời gian tái tạo collagen vào ban đêm.
                </p>
              </div>

              {/* Note 5: Cảnh báo khẩn cấp */}
              <div className="bg-rose-50 rounded-2xl p-3.5 border-l-4 border-rose-600 border border-rose-200">
                <div className="font-extrabold text-rose-800 text-[13px] mb-1 flex items-center gap-1.5">
                  <span>🚨 5. Dấu hiệu cần liên hệ khẩn cấp:</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Nếu da có dấu hiệu ngứa rát kéo dài trên 24 giờ, nổi mụn nước bất thường hoặc nóng bừng, bấm nút "Liên hệ Bác sĩ" trên app ngay để được hướng dẫn xử lý kịp thời.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* CHỨC NĂNG 3: HÌNH ẢNH CHỤP (progress_photos)                     */}
      {/* ============================================================== */}
      {viewMode === 'progress_photos' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#105e3f] to-[#1e7e57] text-white rounded-3xl p-5 shadow-sm">
            <span className="text-[11px] font-extrabold tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full uppercase">
              HỒ SƠ HÌNH ẢNH LÂM SÀNG
            </span>
            <h2 className="text-[20px] font-extrabold mt-2 leading-tight">
              Hình ảnh chụp tiến trình da
            </h2>
            <p className="text-[12.5px] text-emerald-100 mt-1">
              Ghi lại sự thay đổi rõ rệt qua từng buổi điều trị tại Hasaki Clinic
            </p>
          </div>

          {/* Interactive Before & After Comparison */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 space-y-3.5">
            <div className="flex items-center justify-between pb-1 border-b border-gray-100">
              <h4 className="font-extrabold text-[15px] text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#105e3f]" />
                <span>So sánh Trước & Sau điều trị</span>
              </h4>
              <span className="text-[11.5px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Sau 3 buổi
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Before Card */}
              <div 
                onClick={() => setLightboxPhoto({
                  url: '/images/skin_progress_1.jpg',
                  title: 'Trước điều trị (15/09/2026)',
                  note: 'Nhiều ổ mụn viêm đỏ sưng tấy 2 bên má, mụn ẩn dày đặc vùng trán, nền da tăng tiết bã nhờn quá mức.'
                })}
                className="cursor-pointer group flex flex-col items-center"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-rose-300 relative shadow-2xs group-hover:scale-102 transition-transform">
                  <img
                    src="/images/skin_progress_1.jpg"
                    alt="Trước điều trị"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/scanned_face.png';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md">
                    TRƯỚC ĐIỀU TRỊ
                  </span>
                </div>
                <span className="text-[12px] font-extrabold text-rose-700 mt-2 text-center">
                  15/09/2026 (Buổi 1)
                </span>
                <span className="text-[10.5px] text-gray-500 text-center">
                  Mụn viêm, da mỏng yếu
                </span>
              </div>

              {/* After Card */}
              <div 
                onClick={() => setLightboxPhoto({
                  url: '/images/skin_progress_3.jpg',
                  title: 'Hiện tại - Sau buổi 3 (15/10/2026)',
                  note: 'Nền da phục hồi dày khỏe, sắc tố thâm mờ 75%, bề mặt da căng bóng, độ ẩm đồng đều, cấu trúc collagen cải thiện tốt.'
                })}
                className="cursor-pointer group flex flex-col items-center"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-emerald-500 relative shadow-2xs group-hover:scale-102 transition-transform">
                  <img
                    src="/images/skin_progress_3.jpg"
                    alt="Hiện tại (Sau buổi 3)"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/skin_model.png';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-[#105e3f] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md">
                    HIỆN TẠI (BUỔI 3)
                  </span>
                </div>
                <span className="text-[12px] font-extrabold text-[#105e3f] mt-2 text-center">
                  15/10/2026 (Buổi 3)
                </span>
                <span className="text-[10.5px] text-emerald-700 text-center font-bold">
                  Sạch mụn, căng bóng 92%
                </span>
              </div>
            </div>

            <p className="text-[11.5px] text-gray-500 text-center italic pt-1">
              * Nhấp vào ảnh để phóng to và xem phân tích da chi tiết
            </p>
          </div>

          {/* 3 Detailed Progress Photo Cards */}
          <div className="space-y-4">
            
            {/* Ảnh 1: Buổi 1 */}
            <div className="bg-white rounded-3xl p-4.5 shadow-xs border border-gray-100 space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 font-extrabold text-[11px] flex items-center justify-center">
                    01
                  </span>
                  <h4 className="font-extrabold text-[14.5px] text-slate-900">
                    Ảnh 1: Trước điều trị (15/09/2026)
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-gray-500">Khám ban đầu</span>
              </div>

              <div 
                onClick={() => setLightboxPhoto({
                  url: '/images/skin_progress_1.jpg',
                  title: 'Ảnh 1: Trước điều trị (15/09/2026)',
                  note: 'Nhiều ổ mụn viêm đỏ sưng tấy 2 bên má, mụn ẩn dày đặc vùng trán, nền da tăng tiết bã nhờn quá mức, hàng rào bảo vệ da bị mỏng yếu.'
                })}
                className="w-full h-52 rounded-2xl overflow-hidden border border-gray-200 relative cursor-pointer group shadow-2xs"
              >
                <img
                  src="/images/skin_progress_1.jpg"
                  alt="Ảnh 1 trước điều trị"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/scanned_face.png';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 text-slate-900 font-bold text-[12px] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5" /> Bấm xem ảnh lớn
                  </span>
                </div>
                <span className="absolute bottom-2.5 left-2.5 bg-black/75 text-white font-mono text-[10.5px] px-2.5 py-1 rounded-md">
                  HASAKI CLINIC • 15/09/2026 09:15
                </span>
              </div>

              <div className="bg-[#eff4ef] rounded-2xl p-3 text-[12px] text-slate-700 leading-relaxed font-medium">
                <strong className="text-[#105e3f] block mb-0.5">Ghi chú của Bác sĩ (BS. CKI Vũ Hoài Nam):</strong>
                "Nhiều ổ mụn viêm đỏ sưng tấy 2 bên má, mụn ẩn dày đặc vùng trán, nền da tăng tiết bã nhờn quá mức, hàng rào bảo vệ da bị mỏng yếu do dùng mỹ phẩm không phù hợp."
              </div>
            </div>

            {/* Ảnh 2: Buổi 2 */}
            <div className="bg-white rounded-3xl p-4.5 shadow-xs border border-gray-100 space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-extrabold text-[11px] flex items-center justify-center">
                    02
                  </span>
                  <h4 className="font-extrabold text-[14.5px] text-slate-900">
                    Ảnh 2: Sau buổi 2 (29/09/2026)
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-sky-700">Sau Peel BHA</span>
              </div>

              <div 
                onClick={() => setLightboxPhoto({
                  url: '/images/skin_progress_2.jpg',
                  title: 'Ảnh 2: Sau buổi 2 (29/09/2026)',
                  note: 'Các ổ viêm đã khô mày và xẹp 80%, mụn ẩn gom cồi tốt, bề mặt da giảm bóng nhờn rõ rệt, còn đốm thâm đỏ sau viêm (PIE).'
                })}
                className="w-full h-52 rounded-2xl overflow-hidden border border-gray-200 relative cursor-pointer group shadow-2xs"
              >
                <img
                  src="/images/skin_progress_2.jpg"
                  alt="Ảnh 2 sau buổi 2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/skin_model.png';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 text-slate-900 font-bold text-[12px] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5" /> Bấm xem ảnh lớn
                  </span>
                </div>
                <span className="absolute bottom-2.5 left-2.5 bg-black/75 text-white font-mono text-[10.5px] px-2.5 py-1 rounded-md">
                  HASAKI CLINIC • 29/09/2026 10:45
                </span>
              </div>

              <div className="bg-[#eff4ef] rounded-2xl p-3 text-[12px] text-slate-700 leading-relaxed font-medium">
                <strong className="text-[#105e3f] block mb-0.5">Ghi chú của Chuyên viên (KTV Nguyễn Thùy Linh):</strong>
                "Các ổ viêm đã khô mày và xẹp 80%, mụn ẩn gom cồi tốt, bề mặt da giảm bóng nhờn rõ rệt, còn đốm thâm đỏ sau viêm (PIE). Da đang tái tạo lớp sừng mới rất êm."
              </div>
            </div>

            {/* Ảnh 3: Buổi 3 */}
            <div className="bg-white rounded-3xl p-4.5 shadow-xs border border-gray-100 space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-[#105e3f] font-extrabold text-[11px] flex items-center justify-center">
                    03
                  </span>
                  <h4 className="font-extrabold text-[14.5px] text-slate-900">
                    Ảnh 3: Sau buổi 3 (15/10/2026)
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-emerald-700">Điện di & Laser</span>
              </div>

              <div 
                onClick={() => setLightboxPhoto({
                  url: '/images/skin_progress_3.jpg',
                  title: 'Ảnh 3: Sau buổi 3 (15/10/2026)',
                  note: 'Nền da phục hồi dày khỏe, sắc tố thâm mờ 75%, bề mặt da căng bóng, độ ẩm đồng đều, cấu trúc collagen dưới da có dấu hiệu cải thiện tốt.'
                })}
                className="w-full h-52 rounded-2xl overflow-hidden border border-gray-200 relative cursor-pointer group shadow-2xs"
              >
                <img
                  src="/images/skin_progress_3.jpg"
                  alt="Ảnh 3 sau buổi 3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/skin_model.png';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 text-slate-900 font-bold text-[12px] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5" /> Bấm xem ảnh lớn
                  </span>
                </div>
                <span className="absolute bottom-2.5 left-2.5 bg-[#105e3f] text-white font-mono text-[10.5px] px-2.5 py-1 rounded-md">
                  HASAKI CLINIC • 15/10/2026 15:20
                </span>
              </div>

              <div className="bg-[#eff4ef] rounded-2xl p-3 text-[12px] text-slate-700 leading-relaxed font-medium">
                <strong className="text-[#105e3f] block mb-0.5">Ghi chú của Bác sĩ (BS. CKI Lê Thị Mai Chi):</strong>
                "Nền da phục hồi dày khỏe, sắc tố thâm mờ 75%, bề mặt da căng bóng, độ ẩm đồng đều, cấu trúc collagen dưới da có dấu hiệu cải thiện tốt. Chuẩn bị tiêm Meso trẻ hóa."
              </div>
            </div>

          </div>

          {/* Upload Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => alert('Chức năng tải ảnh theo dõi da tại nhà: Đang mở camera/thư viện ảnh...')}
              className="w-full py-3.5 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[14px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Chụp / Tải ảnh theo dõi da tại nhà</span>
            </button>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* CHỨC NĂNG 4: LỊCH SỬ ĐẶT LỊCH (booking_history)                   */}
      {/* ============================================================== */}
      {viewMode === 'booking_history' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#105e3f] to-[#1e7e57] text-white rounded-3xl p-5 shadow-sm">
            <span className="text-[11px] font-extrabold tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full uppercase">
              LỊCH HẸN & PHIẾU KHÁM
            </span>
            <h2 className="text-[20px] font-extrabold mt-2 leading-tight">
              Lịch sử đặt lịch Hasaki Clinic
            </h2>
            <p className="text-[12.5px] text-emerald-100 mt-1">
              Liên kết trực tiếp với chức năng đặt lịch trên ứng dụng
            </p>
          </div>

          {/* 4 Status Tabs: Đã tiếp nhận, Đã thanh toán, Đã khám, Đã hủy */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {[
              { id: 'da_tiep_nhan', label: 'Đã tiếp nhận' },
              { id: 'da_thanh_toan', label: 'Đã thanh toán' },
              { id: 'da_kham', label: 'Đã khám' },
              { id: 'da_huy', label: 'Đã hủy' }
            ].map(tab => {
              const count = allSlips.filter(s => {
                if (tab.id === 'da_tiep_nhan') return s.status === 'da_tiep_nhan' || s.isNewlyBooked;
                if (tab.id === 'da_kham') return s.status === 'da_kham';
                if (tab.id === 'da_thanh_toan') return s.status === 'da_thanh_toan';
                if (tab.id === 'da_huy') return s.status === 'da_huy';
                return false;
              }).length;

              const isSelected = bookingFilterTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setBookingFilterTab(tab.id)}
                  className={`px-3.5 py-2 rounded-full text-[12px] font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#105e3f] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Slips List */}
          <div className="space-y-3.5">
            {getFilteredSlips().length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 space-y-2">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto stroke-[1.6]" />
                <h4 className="font-extrabold text-[15px] text-slate-800">
                  Không có phiếu nào trong mục này
                </h4>
                <p className="text-[12px] text-gray-500 max-w-xs mx-auto">
                  Các lịch hẹn mới của bạn tại Hasaki Clinic sẽ tự động cập nhật ngay khi đặt lịch.
                </p>
              </div>
            ) : (
              getFilteredSlips().map((slip) => (
                <div
                  key={slip.id}
                  className={`bg-white rounded-3xl p-5 shadow-xs border transition-all ${
                    slip.isNewlyBooked ? 'border-2 border-emerald-500 shadow-sm' : 'border-gray-100'
                  }`}
                >
                  {slip.isNewlyBooked && (
                    <div className="inline-block bg-emerald-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2.5 animate-pulse">
                      ★ Lịch vừa đặt mới nhất
                    </div>
                  )}

                  <div className="flex items-start justify-between pb-3 border-b border-dashed border-gray-200">
                    <div>
                      <span className="text-[11px] font-extrabold text-[#105e3f] uppercase tracking-wider">
                        {slip.slipType}
                      </span>
                      <h4 className="font-extrabold text-[15px] text-slate-900 leading-snug mt-0.5">
                        {slip.serviceTitle}
                      </h4>
                      <p className="text-[12px] text-gray-600 mt-0.5 font-medium">
                        Bác sĩ/KTV: <strong className="text-slate-900">{slip.consultant}</strong>
                      </p>
                    </div>

                    <span className="font-mono font-extrabold text-[13px] text-[#105e3f] bg-emerald-50 px-2 py-1 rounded-lg">
                      {slip.slipCode}
                    </span>
                  </div>

                  <div className="py-3 text-[12.5px] space-y-1.5 text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-600" /> Ngày khám:
                      </span>
                      <strong className="text-slate-900">{slip.date}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-600" /> Giờ khám:
                      </span>
                      <strong className="text-slate-900">{slip.time}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-600" /> Cơ sở:
                      </span>
                      <strong className="text-slate-900 text-right truncate max-w-[200px]">
                        {slip.clinicAddress.split(',')[0]}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                      <span className="text-gray-500">Khách hàng:</span>
                      <strong className="text-[#105e3f]">{slip.patientName}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Chi phí:</span>
                      <strong className="text-emerald-700 font-extrabold">{slip.fee}</strong>
                    </div>
                  </div>

                  {slip.note && (
                    <div className="bg-[#f7faf8] rounded-xl p-2.5 text-[11px] text-gray-500 italic mt-1">
                      {slip.note}
                    </div>
                  )}

                  <div className="pt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadSlip(slip.slipCode)}
                      className="flex-1 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[12px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải phiếu hẹn</span>
                    </button>

                    {onNavigateInvoice && (
                      <button
                        type="button"
                        onClick={onNavigateInvoice}
                        className="flex-1 py-2.5 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Xem hóa đơn</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick CTA to book a new appointment */}
          {onNavigateBooking && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateBooking}
                className="w-full py-3.5 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[14px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>+ Đặt lịch khám mới tại Hasaki Clinic</span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* CHỨC NĂNG 5: THÔNG TIN HỒ SƠ (profile_info)                      */}
      {/* ============================================================== */}
      {viewMode === 'profile_info' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
          
          {/* Header Card */}
          <div className="bg-gradient-to-r from-[#105e3f] to-[#1e7e57] text-white rounded-3xl p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <img
                src={profileData.avatar}
                alt={profileData.fullName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/scanned_face.png';
                }}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-xs flex-shrink-0"
              />
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-white/20 px-2 py-0.5 rounded-full text-emerald-100">
                  {profileData.customerCode}
                </span>
                <h2 className="text-[19px] font-black mt-1 leading-tight">
                  {profileData.fullName}
                </h2>
                <p className="text-emerald-100 text-xs mt-0.5">
                  Khách hàng thành viên VIP Hasaki Clinic
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditForm({ ...profileData });
                setIsEditingProfile(!isEditingProfile);
              }}
              className="px-3 py-1.5 rounded-full bg-white text-[#105e3f] font-bold text-[12px] shadow-xs hover:bg-emerald-50 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingProfile ? 'Hủy sửa' : 'Chỉnh sửa'}</span>
            </button>
          </div>

          {profileSaveSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-[12.5px] text-[#105e3f] font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Đã cập nhật thông tin hồ sơ khách hàng thành công!</span>
            </div>
          )}

          {/* Personal Information View or Edit Form */}
          {!isEditingProfile ? (
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="font-extrabold text-[15px] text-[#105e3f] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#105e3f]" />
                  <span>Thông tin cá nhân khách hàng</span>
                </h3>
                <span className="text-[11px] font-bold text-gray-500">Hasaki E-Record</span>
              </div>

              <div className="grid grid-cols-1 gap-3 text-[13px]">
                {/* 1. Họ và tên */}
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Họ và tên:</span>
                  <strong className="text-slate-900 font-extrabold uppercase">{profileData.fullName}</strong>
                </div>

                {/* 2. Ngày sinh */}
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Ngày sinh:</span>
                  <strong className="text-slate-900 font-bold">{profileData.birthDate}</strong>
                </div>

                {/* 3. Giới tính */}
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Giới tính:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#105e3f] font-extrabold text-[11.5px]">
                    {profileData.gender}
                  </span>
                </div>

                {/* 4. CCCD */}
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Số CCCD / Định danh:</span>
                  <strong className="text-slate-900 font-mono font-bold">{profileData.cccd}</strong>
                </div>

                {/* 5. Quốc gia */}
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-gray-400" /> Quốc gia:
                  </span>
                  <strong className="text-slate-900 font-bold">{profileData.country}</strong>
                </div>

                {/* 6. Nghề nghiệp */}
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-gray-400" /> Nghề nghiệp:
                  </span>
                  <strong className="text-slate-900 font-bold text-right">{profileData.job}</strong>
                </div>

                {/* 7. Số điện thoại */}
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gray-400" /> Số điện thoại:
                  </span>
                  <strong className="text-[#105e3f] font-bold">{profileData.phone}</strong>
                </div>

                {/* 8. Email */}
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400" /> Email:
                  </span>
                  <strong className="text-slate-900 font-bold">{profileData.email}</strong>
                </div>

                {/* 9. Địa chỉ */}
                <div className="flex flex-col py-1 space-y-1">
                  <span className="text-gray-500 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> Địa chỉ liên lạc:
                  </span>
                  <span className="text-slate-900 font-semibold bg-gray-50 p-2.5 rounded-xl border border-gray-100 leading-relaxed">
                    {profileData.address}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Inline Edit Form */
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 space-y-3.5">
              <h3 className="font-extrabold text-[15px] text-[#105e3f]">
                Chỉnh sửa thông tin hồ sơ
              </h3>

              <div className="space-y-3 text-[12.5px]">
                {/* Họ tên */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Họ và tên</label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 text-slate-800 font-semibold focus:border-[#105e3f] outline-none"
                  />
                </div>

                {/* Ngày sinh */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Ngày sinh</label>
                  <input
                    type="text"
                    value={editForm.birthDate}
                    onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })}
                    placeholder="DD/MM/YYYY"
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 text-slate-800 font-semibold focus:border-[#105e3f] outline-none"
                  />
                </div>

                {/* Giới tính */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Giới tính</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Nữ', 'Nam'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setEditForm({ ...editForm, gender: g })}
                        className={`h-10 rounded-xl font-bold transition-colors cursor-pointer ${
                          editForm.gender === g ? 'bg-[#105e3f] text-white' : 'bg-gray-100 text-slate-700'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CCCD */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Số CCCD</label>
                  <input
                    type="text"
                    value={editForm.cccd}
                    onChange={(e) => setEditForm({ ...editForm, cccd: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 text-slate-800 font-semibold focus:border-[#105e3f] outline-none"
                  />
                </div>

                {/* Quốc gia */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Quốc gia</label>
                  <input
                    type="text"
                    value={editForm.country}
                    onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 text-slate-800 font-semibold focus:border-[#105e3f] outline-none"
                  />
                </div>

                {/* Nghề nghiệp */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nghề nghiệp</label>
                  <input
                    type="text"
                    value={editForm.job}
                    onChange={(e) => setEditForm({ ...editForm, job: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 text-slate-800 font-semibold focus:border-[#105e3f] outline-none"
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 text-slate-800 font-semibold focus:border-[#105e3f] outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 text-slate-800 font-semibold focus:border-[#105e3f] outline-none"
                  />
                </div>

                {/* Địa chỉ */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Địa chỉ</label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 text-slate-800 font-semibold focus:border-[#105e3f] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 py-3 rounded-full bg-gray-200 text-slate-800 font-bold text-[13px] cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="flex-1 py-3 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[13px] shadow-sm cursor-pointer"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          )}

          {/* Back button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setViewMode('function_hub')}
              className="w-full py-3.5 rounded-full bg-white border border-gray-300 hover:bg-gray-50 text-slate-800 font-bold text-[13.5px] transition-all cursor-pointer text-center"
            >
              ← Quay lại mục Chọn chức năng
            </button>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: LIÊN HỆ NGƯỜI PHỤ TRÁCH                                 */}
      {/* ============================================================== */}
      {contactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-[340px] rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h4 className="font-extrabold text-[16px] text-[#105e3f]">
                Liên hệ người phụ trách
              </h4>
              <button
                type="button"
                onClick={() => setContactModal(null)}
                className="text-gray-400 hover:text-slate-800 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-[#105e3f] text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="font-extrabold text-[16px] text-slate-900">
                {contactModal.name}
              </div>
              <div className="text-[12px] text-emerald-800 font-semibold">
                {contactModal.role} (Buổi #{contactModal.session})
              </div>
              <div className="text-[11.5px] text-gray-500">
                Hasaki Clinic & Spa Chi nhánh Quận 7
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={`tel:${contactModal.phone.replace(/\s+/g, '')}`}
                className="w-full py-3 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[13.5px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm no-underline"
              >
                <Phone className="w-4 h-4" />
                <span>Gọi trực tiếp ({contactModal.phone})</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  alert(`Đang kết nối tin nhắn tư vấn trực tiếp với ${contactModal.name}...`);
                  setContactModal(null);
                }}
                className="w-full py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[13.5px] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Nhắn tin tư vấn Y khoa</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: LIGHTBOX XEM ẢNH PHÓNG TO                               */}
      {/* ============================================================== */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white pb-3 pt-2">
            <h4 className="font-extrabold text-[15px] truncate max-w-[280px]">
              {lightboxPhoto.title}
            </h4>
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center my-auto">
            <img
              src={lightboxPhoto.url}
              alt={lightboxPhoto.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/scanned_face.png';
              }}
              className="max-h-[65vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
            />
          </div>

          <div className="bg-white/15 backdrop-blur-md text-white rounded-2xl p-3.5 text-[12px] leading-relaxed">
            <strong className="text-emerald-300 block mb-0.5">Phân tích chuyên môn:</strong>
            {lightboxPhoto.note}
          </div>
        </div>
      )}

    </div>
  );
}
