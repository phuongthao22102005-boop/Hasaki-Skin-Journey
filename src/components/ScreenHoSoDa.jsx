import React, { useState, useEffect } from 'react';
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
  BadgeCheck,
  Plus,
  PlusCircle,
  FolderPlus,
  UserPlus,
  ShieldAlert,
  Info
} from 'lucide-react';
import { initialBookingSlips } from '../data/bookingHistoryData';

export default function ScreenHoSoDa({ 
  user, 
  bookingSlips = [], 
  consultationRecords = [],
  onUpdateUser, 
  onBackToHome, 
  onNavigateBooking,
  onNavigateHistory,
  onNavigateInvoice,
  initialView = 'profile_list'
}) {
  // Navigation / View modes:
  // 'profile_list'     : Danh sách hồ sơ với bản demo có sẵn của TRỊNH PHƯƠNG THẢO
  // 'function_hub'     : Trang "Chọn chức năng" (5 mục)
  // 'treatment_history': Chức năng 1 - Lịch sử tư vấn/điều trị (Liên kết trực tiếp với mục Lịch sử tư vấn ở Homepage)
  // 'treatment_results': Chức năng 2 - Kết quả tư vấn/điều trị
  // 'progress_photos'  : Chức năng 3 - Hình ảnh chụp
  // 'booking_history'  : Chức năng 4 - Lịch sử đặt lịch
  // 'profile_info'     : Chức năng 5 - Thông tin hồ sơ
  const [viewMode, setViewMode] = useState(initialView || 'profile_list');

  // Synchronize viewMode when initialView changes (e.g. from Homepage 'Lịch sử tư vấn')
  useEffect(() => {
    if (initialView) {
      setViewMode(initialView);
    }
  }, [initialView]);

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

  // Selection Modal state ("Bạn đã từng sử dụng dịch vụ tư vấn/chăm sóc da tại Hasaki?")
  const [showModalSelection, setShowModalSelection] = useState(false);

  // New user registration inputs (Dành cho người chưa có hồ sơ da)
  const [newFormData, setNewFormData] = useState({
    fullName: user?.name || '',
    gender: user?.gender || 'Nữ',
    birthDate: user?.birthDate || '2004-05-15',
    phone: user?.phone || '',
    email: user?.email || '',
    cccd: user?.cccd || '',
    address: user?.address || '',
    skinType: 'Da hỗn hợp thiên dầu',
    sensitivity: 'Nhạy cảm nhẹ (dễ đỏ khi thời tiết thay đổi)',
    primaryConcern: 'Mụn ẩn & lỗ chân lông to',
    careGoal: 'Kiềm dầu, phục hồi màng ẩm và sáng da',
    currentProducts: 'Sữa rửa mặt dịu nhẹ, Serum B5, Kem chống nắng phổ rộng',
    allergies: 'Cồn khô, hương liệu nồng'
  });

  const [newProfileError, setNewProfileError] = useState('');
  const [newlyCreatedProfile, setNewlyCreatedProfile] = useState(null);
  const [newProfileSaveSuccess, setNewProfileSaveSuccess] = useState(false);

  const handleOpenCreationModal = () => {
    setShowModalSelection(true);
  };

  const handleSelectExistingUser = () => {
    setShowModalSelection(false);
    setViewMode('function_hub');
  };

  const handleSelectNewUser = () => {
    setShowModalSelection(false);
    setNewProfileError('');
    setViewMode('new_step1');
  };

  const handleContinueNewStep1 = (e) => {
    if (e) e.preventDefault();
    setNewProfileError('');

    if (!newFormData.fullName.trim()) {
      setNewProfileError('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!newFormData.phone.trim()) {
      setNewProfileError('Vui lòng nhập số điện thoại liên hệ.');
      return;
    }

    setViewMode('new_step2');
  };

  const handleSaveNewProfile = (e) => {
    if (e) e.preventDefault();

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const newCustomerCode = `HSK-${randomSuffix}`;

    const completedProfile = {
      fullName: newFormData.fullName.trim(),
      gender: newFormData.gender,
      birthDate: newFormData.birthDate || 'Chưa cập nhật',
      phone: newFormData.phone.trim(),
      email: newFormData.email.trim() || 'Chưa cập nhật',
      cccd: newFormData.cccd.trim() || 'Chưa cập nhật',
      address: newFormData.address.trim() || 'Chưa cập nhật',
      customerCode: newCustomerCode,
      skinType: newFormData.skinType,
      sensitivity: newFormData.sensitivity,
      primaryConcern: newFormData.primaryConcern,
      careGoal: newFormData.careGoal,
      currentProducts: newFormData.currentProducts || 'Chưa ghi nhận',
      allergies: newFormData.allergies || 'Không có dị ứng đặc biệt',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      status: 'Hồ sơ mới tạo - Đang chờ thăm khám',
      avatar: '/images/customer_default_avatar.png'
    };

    setNewlyCreatedProfile(completedProfile);
    setNewProfileSaveSuccess(true);
    setTimeout(() => setNewProfileSaveSuccess(false), 4000);

    if (onUpdateUser) {
      onUpdateUser({
        name: newFormData.fullName.trim(),
        gender: newFormData.gender,
        birthDate: newFormData.birthDate,
        phone: newFormData.phone.trim(),
        email: newFormData.email.trim(),
        address: newFormData.address.trim()
      });
    }

    setViewMode('new_profile_view');
  };

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

  // Combine treatment sessions with live employee consultations
  const customConsultations = (consultationRecords || [])
    .filter(c => c.customerId === 'HSK-221005' || c.customerName?.includes('PHƯƠNG THẢO'))
    .filter(c => c.sessionNumber >= 4)
    .map(c => ({
      sessionNumber: c.sessionNumber || 4,
      date: c.date,
      status: 'completed',
      statusText: 'Đã hoàn thành',
      serviceName: c.service || 'Khám & Tư vấn da liễu chuyên sâu',
      staffRole: c.staffRole || 'Bác sĩ phụ trách',
      staffName: c.staffName || 'BS. CKI Vũ Hoài Nam',
      staffPhone: '0903 112 334',
      initialSkinCondition: c.skinCondition || 'Nền da phục hồi tốt, độ ẩm cân bằng.',
      afterSkinCondition: c.diagnosis || 'Được tư vấn phác đồ và chỉ định sản phẩm phục hồi.',
      sessionNote: `Ghi chú Bác sĩ: ${c.recommendations || 'Tiếp tục theo dõi phác đồ.'}`,
      customerFeedback: 'Khách hàng hài lòng và tuân thủ hướng dẫn điều trị.',
      handoverNote: c.handoverNote ? `Đã bàn giao cho ${c.handoverTo || 'bác sĩ phụ trách'}` : null
    }));

  const allTreatmentSessions = [
    ...treatmentSessions.filter(ts => !customConsultations.some(cc => cc.sessionNumber === ts.sessionNumber)),
    ...customConsultations
  ].sort((a, b) => a.sessionNumber - b.sessionNumber);

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
              } else if (viewMode === 'new_step1') {
                setViewMode('profile_list');
              } else if (viewMode === 'new_step2') {
                setViewMode('new_step1');
              } else if (viewMode === 'new_profile_view') {
                setViewMode('profile_list');
              } else if (viewMode === 'treatment_history' && initialView === 'treatment_history') {
                onBackToHome();
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
              {viewMode === 'new_step1' && 'Tạo hồ sơ da (Bước 1/2)'}
              {viewMode === 'new_step2' && 'Khảo sát tình trạng da (Bước 2/2)'}
              {viewMode === 'new_profile_view' && 'Hồ sơ da của tôi'}
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
              Hồ sơ khách hàng Hasaki Clinic
            </span>
            <button
              type="button"
              onClick={handleOpenCreationModal}
              className="text-[11.5px] text-[#105e3f] font-bold hover:underline flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tạo hồ sơ mới</span>
            </button>
          </div>

          {/* MAIN DEMO PROFILE CARD: TRỊNH PHƯƠNG THẢO */}
          <div
            onClick={() => setViewMode('function_hub')}
            className="bg-white rounded-3xl p-5 shadow-xs border-2 border-emerald-600/30 hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer group active:scale-[0.99] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[#105e3f] text-white text-[10px] font-black px-3.5 py-1 rounded-bl-2xl uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <Award className="w-3 h-3 text-amber-300" />
              <span>Khách hàng VIP Clinic</span>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt={profileData.fullName}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/customer_default_avatar.png';
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
                Bấm vào để chọn chức năng quản lý da (5 mục)
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-[#105e3f] flex items-center justify-center group-hover:bg-[#105e3f] group-hover:text-white transition-all">
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* IF NEWLY CREATED PROFILE EXISTS: DISPLAY IT HERE */}
          {newlyCreatedProfile && (
            <div className="space-y-2 pt-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between px-1">
                <span className="font-extrabold text-[15px] text-slate-900">
                  Hồ sơ da của bạn (Mới tạo)
                </span>
                <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Đang chờ khám
                </span>
              </div>

              <div 
                onClick={() => setViewMode('new_profile_view')}
                className="bg-white rounded-3xl p-5 shadow-xs border-2 border-emerald-400/50 hover:border-emerald-600 transition-all cursor-pointer group active:scale-[0.99]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <User className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-[16px] text-slate-900 group-hover:text-[#105e3f] transition-colors truncate">
                        {newlyCreatedProfile.fullName}
                      </h4>
                      <span className="text-[10px] font-bold bg-emerald-100 text-[#105e3f] px-2 py-0.5 rounded-md">
                        {newlyCreatedProfile.customerCode}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-600 mt-1">
                      Loại da: <strong className="text-[#105e3f]">{newlyCreatedProfile.skinType}</strong>
                    </p>
                    <p className="text-[11.5px] text-slate-500 truncate mt-0.5">
                      Quan tâm: {newlyCreatedProfile.primaryConcern}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[12px] font-bold text-[#105e3f]">
                  <span>Xem chi tiết hồ sơ vừa tạo</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>
          )}

          {/* SECTION DÀNH CHO NGƯỜI CHƯA CÓ HỒ SƠ DA */}
          <div className="pt-2">
            <div className="bg-gradient-to-br from-white to-[#f4f9f6] rounded-3xl p-5 border border-emerald-800/15 shadow-xs space-y-3.5">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#105e3f] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <UserPlus className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[15.5px] text-slate-900 leading-snug">
                    Bạn chưa có hồ sơ da?
                  </h4>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed mt-1 font-medium">
                    Dành cho khách hàng chưa từng sử dụng dịch vụ tại Hasaki. Tạo hồ sơ da để làm khảo sát nhanh tình trạng da, lưu mục tiêu chăm sóc và sẵn sàng thăm khám chuyên sâu.
                  </p>
                </div>
              </div>

              <div className="pt-1 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleOpenCreationModal}
                  className="w-full h-[50px] rounded-[16px] bg-white border-2 border-[#105e3f] text-[#105e3f] hover:bg-emerald-50 active:scale-98 font-extrabold text-[14.5px] tracking-wide shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
                  <span>TẠO HỒ SƠ DA MỚI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('function_hub')}
                  className="w-full h-[46px] rounded-[16px] bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[14px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Mở hồ sơ TRỊNH PHƯƠNG THẢO</span>
                </button>
              </div>
            </div>
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
          
          {/* Breadcrumb banner linking to Homepage & Skin Profile hub */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-3.5 py-2.5 flex items-center justify-between text-[12px] shadow-2xs">
            <div className="flex items-center gap-1.5 text-[#105e3f] font-bold">
              <Clock className="w-4 h-4 text-[#105e3f]" />
              <span>Lịch sử tư vấn &amp; điều trị</span>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('function_hub')}
              className="text-[#105e3f] font-extrabold hover:underline flex items-center gap-1 text-[11.5px] cursor-pointer"
            >
              <span>Xem 5 mục hồ sơ da</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

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

          {/* List of Treatment Sessions (Dynamically synchronized with Employee consultations) */}
          <div className="space-y-4">
            {allTreatmentSessions.map((sess) => (
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

          {/* Quick navigation to other skin profile modules or return home */}
          <div className="pt-2 pb-6 space-y-2.5">
            <button
              type="button"
              onClick={() => setViewMode('function_hub')}
              className="w-full py-3.5 rounded-full bg-white border border-gray-300 hover:bg-gray-50 active:scale-98 text-slate-800 font-bold text-[13.5px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Xem toàn bộ chức năng Hồ sơ da (5 mục)</span>
              <ChevronRight className="w-4 h-4 text-[#105e3f]" />
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="w-full py-2 text-center text-[13px] text-gray-500 hover:text-[#105e3f] font-semibold cursor-pointer"
            >
              ← Về trang chủ Hasaki
            </button>
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
      {/* TẠO HỒ SƠ DA - BƯỚC 1/2: THÔNG TIN CÁ NHÂN (new_step1)         */}
      {/* ============================================================== */}
      {viewMode === 'new_step1' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
          
          {/* Progress Header */}
          <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-extrabold text-[#105e3f] uppercase tracking-wider">
                Bước 1 / 2
              </span>
              <span className="font-bold text-slate-500">
                50% Hoàn thành
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-[#105e3f] rounded-full transition-all duration-300" />
            </div>
            <h3 className="font-extrabold text-[17px] text-slate-900 mt-3">
              Thông tin cá nhân khách hàng
            </h3>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Vui lòng điền thông tin để Hasaki tạo mã định danh hồ sơ da liễu cho bạn.
            </p>
          </div>

          {/* Form Fields Card */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 space-y-4">
            
            {/* Họ và tên */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-1.5">
                Họ và tên <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={newFormData.fullName}
                onChange={(e) => {
                  setNewFormData({ ...newFormData, fullName: e.target.value });
                  setNewProfileError('');
                }}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full h-12 px-4 rounded-2xl border-2 border-emerald-700/40 text-[14.5px] text-slate-900 font-medium focus:outline-none focus:border-[#105e3f] focus:ring-2 focus:ring-[#105e3f]/20 bg-emerald-50/20"
              />
            </div>

            {/* Giới tính */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-1.5">
                Giới tính <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Nữ', 'Nam'].map((g) => {
                  const isSelected = newFormData.gender === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setNewFormData({ ...newFormData, gender: g })}
                      className={`h-11 rounded-2xl border-2 font-extrabold text-[14px] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isSelected 
                          ? 'border-[#105e3f] bg-emerald-50 text-[#105e3f]' 
                          : 'border-gray-200 bg-white text-slate-600 hover:border-gray-300'
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
              <label className="block text-[13.5px] font-bold text-slate-700 mb-1.5">
                Ngày sinh
              </label>
              <input
                type="date"
                value={newFormData.birthDate}
                onChange={(e) => setNewFormData({ ...newFormData, birthDate: e.target.value })}
                className="w-full h-12 px-4 rounded-2xl border-2 border-emerald-700/40 text-[14px] text-slate-900 font-medium focus:outline-none focus:border-[#105e3f] focus:ring-2 focus:ring-[#105e3f]/20 bg-emerald-50/20"
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-1.5">
                Số điện thoại liên hệ <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={newFormData.phone}
                onChange={(e) => {
                  setNewFormData({ ...newFormData, phone: e.target.value });
                  setNewProfileError('');
                }}
                placeholder="Ví dụ: 0912 345 678"
                className="w-full h-12 px-4 rounded-2xl border-2 border-emerald-700/40 text-[14.5px] text-slate-900 font-medium focus:outline-none focus:border-[#105e3f] focus:ring-2 focus:ring-[#105e3f]/20 bg-emerald-50/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={newFormData.email}
                onChange={(e) => setNewFormData({ ...newFormData, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full h-12 px-4 rounded-2xl border-2 border-emerald-700/40 text-[14px] text-slate-900 font-medium focus:outline-none focus:border-[#105e3f] focus:ring-2 focus:ring-[#105e3f]/20 bg-emerald-50/20"
              />
            </div>

            {/* CCCD / Định danh */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-1.5">
                Số CCCD / Định danh (để lưu hồ sơ bệnh án)
              </label>
              <input
                type="text"
                value={newFormData.cccd}
                onChange={(e) => setNewFormData({ ...newFormData, cccd: e.target.value })}
                placeholder="Ví dụ: 079305012899"
                className="w-full h-12 px-4 rounded-2xl border-2 border-emerald-700/40 text-[14px] text-slate-900 font-medium focus:outline-none focus:border-[#105e3f] focus:ring-2 focus:ring-[#105e3f]/20 bg-emerald-50/20"
              />
            </div>

            {/* Địa chỉ liên hệ */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-1.5">
                Địa chỉ hiện tại
              </label>
              <input
                type="text"
                value={newFormData.address}
                onChange={(e) => setNewFormData({ ...newFormData, address: e.target.value })}
                placeholder="Quận/Huyện, Tỉnh/TP..."
                className="w-full h-12 px-4 rounded-2xl border-2 border-emerald-700/40 text-[14px] text-slate-900 font-medium focus:outline-none focus:border-[#105e3f] focus:ring-2 focus:ring-[#105e3f]/20 bg-emerald-50/20"
              />
            </div>

            {/* Error Message */}
            {newProfileError && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{newProfileError}</span>
              </div>
            )}

          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setViewMode('profile_list')}
              className="w-1/3 h-12 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[14px] transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleContinueNewStep1}
              className="w-2/3 h-12 rounded-2xl bg-[#105e3f] hover:bg-[#0c4a31] text-white font-extrabold text-[14.5px] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Tiếp tục (Bước 2/2)</span>
              <ChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
            </button>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* TẠO HỒ SƠ DA - BƯỚC 2/2: KHẢO SÁT TÌNH TRẠNG DA (new_step2)    */}
      {/* ============================================================== */}
      {viewMode === 'new_step2' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
          
          {/* Progress Header */}
          <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-extrabold text-[#105e3f] uppercase tracking-wider">
                Bước 2 / 2
              </span>
              <span className="font-bold text-emerald-700">
                100% Sẵn sàng
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-full h-full bg-[#105e3f] rounded-full transition-all duration-300" />
            </div>
            <h3 className="font-extrabold text-[17px] text-slate-900 mt-3">
              Khảo sát tình trạng da & Nhu cầu
            </h3>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Cung cấp đặc điểm nền da của bạn để chuẩn bị phác đồ chuẩn xác nhất.
            </p>
          </div>

          {/* Skin Survey Form */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 space-y-4">
            
            {/* 1. Loại da */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-2">
                1. Loại da hiện tại của bạn:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Da hỗn hợp thiên dầu',
                  'Da dầu / Nhờn',
                  'Da khô',
                  'Da hỗn hợp thiên khô',
                  'Da thường',
                  'Da nhạy cảm'
                ].map((type) => {
                  const isSel = newFormData.skinType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewFormData({ ...newFormData, skinType: type })}
                      className={`p-2.5 rounded-2xl text-[12.5px] font-bold border-2 transition-all cursor-pointer text-left flex items-center justify-between ${
                        isSel 
                          ? 'border-[#105e3f] bg-emerald-50 text-[#105e3f]' 
                          : 'border-gray-200 text-slate-700 hover:border-gray-300'
                      }`}
                    >
                      <span>{type}</span>
                      {isSel && <Check className="w-4 h-4 stroke-[3] text-[#105e3f]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Mức độ nhạy cảm */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-2">
                2. Mức độ nhạy cảm của da:
              </label>
              <div className="space-y-2">
                {[
                  'Khỏe mạnh, ít kích ứng',
                  'Nhạy cảm nhẹ (dễ đỏ khi thời tiết thay đổi hoặc dùng acid mạnh)',
                  'Rất nhạy cảm (dễ châm chích, ngứa rát với mỹ phẩm lạ)'
                ].map((sen) => {
                  const isSel = newFormData.sensitivity === sen;
                  return (
                    <button
                      key={sen}
                      type="button"
                      onClick={() => setNewFormData({ ...newFormData, sensitivity: sen })}
                      className={`w-full p-3 rounded-2xl text-[12.5px] font-bold border-2 transition-all cursor-pointer text-left flex items-center justify-between ${
                        isSel 
                          ? 'border-[#105e3f] bg-emerald-50 text-[#105e3f]' 
                          : 'border-gray-200 text-slate-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="pr-2">{sen}</span>
                      {isSel && <Check className="w-4 h-4 stroke-[3] text-[#105e3f] flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Mối quan tâm chính */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-1.5">
                3. Vấn đề da bạn lo lắng nhất hiện tại:
              </label>
              <input
                type="text"
                value={newFormData.primaryConcern}
                onChange={(e) => setNewFormData({ ...newFormData, primaryConcern: e.target.value })}
                placeholder="Ví dụ: Mụn ẩn, thâm mụn, lỗ chân lông to..."
                className="w-full h-12 px-4 rounded-2xl border-2 border-emerald-700/40 text-[14px] text-slate-900 font-medium focus:outline-none focus:border-[#105e3f] focus:ring-2 focus:ring-[#105e3f]/20 bg-emerald-50/20"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['Mụn ẩn & viêm', 'Thâm đỏ PIE', 'Lỗ chân lông to', 'Nám & Tàn nhang', 'Sẹo rỗ'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      if (!newFormData.primaryConcern.includes(tag)) {
                        setNewFormData({
                          ...newFormData,
                          primaryConcern: newFormData.primaryConcern ? `${newFormData.primaryConcern}, ${tag}` : tag
                        });
                      }
                    }}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#105e3f] transition-colors cursor-pointer"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Mục tiêu chăm sóc */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-1.5">
                4. Mục tiêu chăm sóc da mong muốn:
              </label>
              <input
                type="text"
                value={newFormData.careGoal}
                onChange={(e) => setNewFormData({ ...newFormData, careGoal: e.target.value })}
                placeholder="Ví dụ: Sạch mụn, kiềm dầu, phục hồi màng ẩm..."
                className="w-full h-12 px-4 rounded-2xl border-2 border-emerald-700/40 text-[14px] text-slate-900 font-medium focus:outline-none focus:border-[#105e3f] focus:ring-2 focus:ring-[#105e3f]/20 bg-emerald-50/20"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['Hết mụn', 'Kiềm dầu', 'Mờ thâm sáng da', 'Phục hồi màng ẩm', 'Căng bóng'].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => {
                      if (!newFormData.careGoal.includes(goal)) {
                        setNewFormData({
                          ...newFormData,
                          careGoal: newFormData.careGoal ? `${newFormData.careGoal}, ${goal}` : goal
                        });
                      }
                    }}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#105e3f] transition-colors cursor-pointer"
                  >
                    + {goal}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Sản phẩm đang sử dụng */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-1.5">
                5. Sản phẩm skincare bạn đang dùng hàng ngày:
              </label>
              <textarea
                rows={2}
                value={newFormData.currentProducts}
                onChange={(e) => setNewFormData({ ...newFormData, currentProducts: e.target.value })}
                placeholder="Sữa rửa mặt, Serum phục hồi B5, Kem chống nắng, Tẩy trang..."
                className="w-full p-3 rounded-2xl border-2 border-emerald-700/40 text-[13.5px] text-slate-900 font-medium focus:outline-none focus:border-[#105e3f] focus:ring-2 focus:ring-[#105e3f]/20 bg-emerald-50/20"
              />
            </div>

            {/* 6. Thành phần dị ứng */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 mb-1.5">
                6. Thành phần dị ứng / Kích ứng (nếu có):
              </label>
              <input
                type="text"
                value={newFormData.allergies}
                onChange={(e) => setNewFormData({ ...newFormData, allergies: e.target.value })}
                placeholder="Ví dụ: Cồn khô, hương liệu, tinh dầu tràm trà..."
                className="w-full h-12 px-4 rounded-2xl border-2 border-rose-300 text-[14px] text-slate-900 font-medium focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 bg-rose-50/20"
              />
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setViewMode('new_step1')}
              className="w-1/3 h-12 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[14px] transition-colors cursor-pointer"
            >
              Quay lại
            </button>
            <button
              type="button"
              onClick={handleSaveNewProfile}
              className="w-2/3 h-12 rounded-2xl bg-[#105e3f] hover:bg-[#0c4a31] text-white font-extrabold text-[14.5px] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Hoàn tất tạo hồ sơ da</span>
            </button>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* CHI TIẾT HỒ SƠ DA MỚI TẠO (new_profile_view)                   */}
      {/* ============================================================== */}
      {viewMode === 'new_profile_view' && newlyCreatedProfile && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
          
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-[#105e3f] to-[#1e7e57] text-white rounded-3xl p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-400 text-[#105e3f] flex items-center justify-center font-bold">
                ✓
              </span>
              <span className="text-[12px] font-extrabold uppercase tracking-wide text-emerald-200">
                Tạo hồ sơ thành công
              </span>
            </div>
            <h2 className="text-[20px] font-extrabold leading-tight">
              {newlyCreatedProfile.fullName}
            </h2>
            <div className="flex items-center gap-2 text-xs text-emerald-100 font-mono">
              <span>Mã ID: {newlyCreatedProfile.customerCode}</span>
              <span>•</span>
              <span>Ngày tạo: {newlyCreatedProfile.createdAt}</span>
            </div>
          </div>

          {/* Personal Info Summary */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 space-y-3">
            <h3 className="font-extrabold text-[15px] text-slate-900 flex items-center gap-2">
              <User className="w-4.5 h-4.5 text-[#105e3f]" />
              <span>Thông tin cá nhân</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 text-[12.5px]">
              <div className="bg-slate-50 p-2.5 rounded-2xl">
                <span className="text-slate-500 font-bold block text-[11px]">Giới tính:</span>
                <span className="font-extrabold text-slate-900">{newlyCreatedProfile.gender}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-2xl">
                <span className="text-slate-500 font-bold block text-[11px]">Ngày sinh:</span>
                <span className="font-extrabold text-slate-900">{newlyCreatedProfile.birthDate}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-2xl col-span-2">
                <span className="text-slate-500 font-bold block text-[11px]">Số điện thoại:</span>
                <span className="font-extrabold text-slate-900">📞 {newlyCreatedProfile.phone}</span>
              </div>
              {newlyCreatedProfile.email && (
                <div className="bg-slate-50 p-2.5 rounded-2xl col-span-2">
                  <span className="text-slate-500 font-bold block text-[11px]">Email:</span>
                  <span className="font-extrabold text-slate-900">{newlyCreatedProfile.email}</span>
                </div>
              )}
              {newlyCreatedProfile.address && (
                <div className="bg-slate-50 p-2.5 rounded-2xl col-span-2">
                  <span className="text-slate-500 font-bold block text-[11px]">Địa chỉ:</span>
                  <span className="font-extrabold text-slate-900">{newlyCreatedProfile.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skin Survey Results */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 space-y-3">
            <h3 className="font-extrabold text-[15px] text-slate-900 flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-[#105e3f]" />
              <span>Đặc điểm & Khảo sát tình trạng da</span>
            </h3>

            <div className="space-y-2.5 text-[12.5px]">
              <div className="bg-emerald-50/70 p-3 rounded-2xl">
                <span className="text-emerald-900 font-bold block text-[11px] mb-0.5">Loại da:</span>
                <span className="font-extrabold text-emerald-950 text-[13.5px]">{newlyCreatedProfile.skinType}</span>
              </div>

              <div className="bg-emerald-50/70 p-3 rounded-2xl">
                <span className="text-emerald-900 font-bold block text-[11px] mb-0.5">Mức độ nhạy cảm:</span>
                <span className="font-extrabold text-emerald-950">{newlyCreatedProfile.sensitivity}</span>
              </div>

              <div className="bg-emerald-50/70 p-3 rounded-2xl">
                <span className="text-emerald-900 font-bold block text-[11px] mb-0.5">Mối quan tâm chính:</span>
                <span className="font-extrabold text-emerald-950">{newlyCreatedProfile.primaryConcern}</span>
              </div>

              <div className="bg-emerald-50/70 p-3 rounded-2xl">
                <span className="text-emerald-900 font-bold block text-[11px] mb-0.5">Mục tiêu chăm sóc:</span>
                <span className="font-extrabold text-emerald-950">{newlyCreatedProfile.careGoal}</span>
              </div>

              <div className="bg-emerald-50/70 p-3 rounded-2xl">
                <span className="text-emerald-900 font-bold block text-[11px] mb-0.5">Sản phẩm đang dùng:</span>
                <span className="font-extrabold text-emerald-950">{newlyCreatedProfile.currentProducts}</span>
              </div>

              <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200">
                <span className="text-rose-800 font-bold block text-[11px] mb-0.5">Thành phần dị ứng / Cần tránh:</span>
                <span className="font-extrabold text-rose-950">{newlyCreatedProfile.allergies}</span>
              </div>
            </div>
          </div>

          {/* Action Booking Card */}
          <div className="bg-gradient-to-br from-[#f4f9f6] to-white rounded-3xl p-5 border border-emerald-600/30 shadow-xs space-y-3">
            <h4 className="font-extrabold text-[15px] text-[#105e3f] flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              <span>Khám chuyên sâu tại Hasaki Clinic</span>
            </h4>
            <p className="text-[12.5px] text-slate-600 leading-relaxed font-medium">
              Hồ sơ da của bạn đã được lưu! Hãy đặt lịch ngay để bác sĩ da liễu tại Hasaki Clinic soi da đa tầng và lên phác đồ điều trị cá nhân hóa cho bạn.
            </p>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (onNavigateBooking) onNavigateBooking();
                }}
                className="w-full h-12 rounded-2xl bg-[#105e3f] hover:bg-[#0c4a31] text-white font-extrabold text-[14px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Đặt lịch khám tại Clinic ngay</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('function_hub')}
                className="w-full h-11 rounded-2xl bg-[#105e3f]/10 text-[#105e3f] hover:bg-[#105e3f]/20 font-bold text-[13px] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Xem hồ sơ & Chức năng mẫu Clinic (TRỊNH PHƯƠNG THẢO)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('profile_list')}
                className="w-full h-11 rounded-2xl bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 font-bold text-[13px] transition-all cursor-pointer"
              >
                Về danh sách hồ sơ
              </button>
            </div>
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

      {/* ======================================================== */}
      {/* MODAL LỰA CHỌN: ĐÃ TỪNG / CHƯA TỪNG SỬ DỤNG DỊCH VỤ       */}
      {/* ======================================================== */}
      {showModalSelection && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-[430px] bg-white rounded-t-[28px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-200 relative">
            
            {/* Close Button X */}
            <button
              onClick={() => setShowModalSelection(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Question matching Hình 2 */}
            <div className="text-center mt-2 mb-6 px-4">
              <h3 className="text-[17px] font-extrabold text-slate-900 leading-snug">
                Bạn đã từng sử dụng dịch vụ tư vấn/chăm sóc da tại <span className="text-[#105e3f]">Hasaki</span>?
              </h3>
              <p className="text-[12px] text-slate-500 mt-1.5 font-medium">
                Chọn trạng thái phù hợp để tiếp tục trải nghiệm hồ sơ da
              </p>
            </div>

            {/* 2 Buttons matching Hình 2 */}
            <div className="flex flex-col gap-3 pb-2">
              {/* Button 1: ĐÃ TỪNG SỬ DỤNG */}
              <button
                type="button"
                onClick={handleSelectExistingUser}
                className="w-full h-[52px] rounded-[16px] bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-extrabold text-[15px] tracking-wide shadow-sm transition-all cursor-pointer flex items-center justify-center uppercase gap-2"
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>ĐÃ TỪNG SỬ DỤNG (HỒ SƠ CLINIC)</span>
              </button>

              {/* Button 2: CHƯA TỪNG SỬ DỤNG */}
              <button
                type="button"
                onClick={handleSelectNewUser}
                className="w-full h-[52px] rounded-[16px] bg-white border-2 border-[#105e3f] text-[#105e3f] hover:bg-emerald-50 active:scale-98 font-extrabold text-[15px] tracking-wide shadow-xs transition-all cursor-pointer flex items-center justify-center uppercase gap-2"
              >
                <UserPlus className="w-5 h-5 stroke-[2.2]" />
                <span>CHƯA TỪNG SỬ DỤNG (TẠO MỚI)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
