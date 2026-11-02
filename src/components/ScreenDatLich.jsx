import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  UserPlus, 
  User, 
  CreditCard, 
  Phone, 
  X, 
  Calendar, 
  Store, 
  CalendarDays, 
  UserCheck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Search,
  Mic,
  ChevronLeft,
  Check,
  Stethoscope,
  Trash2,
  Star,
  Award,
  ShieldCheck,
  Filter,
  ChevronDown,
  CalendarCheck,
  FileText,
  Receipt
} from 'lucide-react';

export default function ScreenDatLich({ 
  user = { name: 'Nguyễn Văn A' }, 
  onBack, 
  onBackToHome, 
  onNavigateHoSoDa,
  onBookingConfirmed,
  onNavigateHistory,
  onNavigateInvoice
}) {
  // Navigation states:
  // 'initial_1'      : Hình 1 ban đầu (Chọn hồ sơ)
  // 'initial_3'      : Hình 3 ban đầu (Theo lịch hẹn)
  // 'store_flow_1'   : Chọn thông tin khám: Cửa hàng / Clinic/Spa
  // 'store_flow_2'   : Chọn chi nhánh cửa hàng
  // 'store_flow_3'   : Chọn ngày tư vấn (Cửa hàng)
  // 'store_flow_4'   : Chọn khung giờ tư vấn (Cửa hàng)
  // 'store_flow_5'   : Thông tin chuyên viên (Cửa hàng)
  // 'clinic_flow_2'  : Chọn chi nhánh Hasaki Clinic & Spa
  // 'clinic_flow_3'  : Chọn ngày khám Clinic
  // 'clinic_flow_4'  : Chọn Bác sĩ & Khung giờ Clinic
  // 'by_date_1'      : Đặt lịch theo ngày (Lịch chọn ngày + Khung giờ khả dụng)
  // 'by_doctor_1'    : Danh sách Bác sĩ / KTV Hasaki
  // 'by_doctor_2'    : Chọn ngày & giờ khám với Bác sĩ / KTV đã chọn
  // 'doctor_profile' : Hồ sơ chi tiết Bác sĩ / KTV
  // 'confirm_step_1' : Chọn thông tin tư vấn (Hình 1)
  // 'confirm_step_2' : Thông tin đặt tư vấn (Hình 2 - Miễn phí 0đ)
  const [step, setStep] = useState('initial_1');
  const [showOptionModal, setShowOptionModal] = useState(false);

  // Selected branch & search
  const [selectedBranch, setSelectedBranch] = useState({
    id: 'q7',
    name: 'Chi nhánh Quận 7',
    address: '468A Nguyễn Thị Thập, Phường Tân Quy',
    type: 'store'
  });
  const [branchSearch, setBranchSearch] = useState('');

  // Selected date parameters
  const [selectedDate, setSelectedDate] = useState('31/10/2026');
  const [selectedDateTab1, setSelectedDateTab1] = useState('30/10');
  const [selectedDateTab2, setSelectedDateTab2] = useState('30/10');

  // Calendar month/year navigation state
  const [calendarMonth, setCalendarMonth] = useState(10);
  const [calendarYear, setCalendarYear] = useState(2026);

  const handlePrevMonth = () => {
    if (calendarYear === 2026 && calendarMonth <= 10) return;
    if (calendarMonth === 1) {
      setCalendarMonth(12);
      setCalendarYear(y => y - 1);
    } else {
      setCalendarMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 12) {
      setCalendarMonth(1);
      setCalendarYear(y => y + 1);
    } else {
      setCalendarMonth(m => m + 1);
    }
  };

  const getVietnameseDayOfWeek = (dateStr) => {
    if (!dateStr) return 'Thứ 6';
    const parts = dateStr.split('/');
    if (parts.length >= 3) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const y = parseInt(parts[2], 10);
      const dateObj = new Date(y, m, d);
      const day = dateObj.getDay();
      if (day === 0) return 'Chủ nhật';
      return `Thứ ${day + 1}`;
    }
    return 'Thứ 6';
  };

  const isDaySelectable = (day, month, year) => {
    if (year === 2026 && month === 10) {
      return day >= 30;
    }
    if (year > 2026 || (year === 2026 && month > 10)) {
      return true;
    }
    return false;
  };

  // Selected consultant / doctor for details view
  const [selectedConsultantKey, setSelectedConsultantKey] = useState('thuy_anh');
  const [selectedDoctorKey, setSelectedDoctorKey] = useState('minh');
  const [selectedSession, setSelectedSession] = useState('Sáng thứ 6');
  const [doctorProfileReturnStep, setDoctorProfileReturnStep] = useState('by_doctor_1');
  const [doctorFilter, setDoctorFilter] = useState('all'); // 'all' | 'doctor' | 'specialist'
  const [doctorSearch, setDoctorSearch] = useState('');

  // Confirmation flow state (Hình 1 & Hình 2)
  const [currentBooking, setCurrentBooking] = useState({
    branch: 'Cửa hàng quận 7',
    date: '31/10/2026',
    time: '09:30 - 10:00',
    consultant: 'Trần Thùy Anh',
    serviceType: 'TƯ VẤN TẠI CỬA HÀNG',
    hasVoucher: false,
    voucherCode: '',
    price: 0
  });

  const [bookingSuccessModal, setBookingSuccessModal] = useState(null);

  // Expand / collapse state for info cards ("Xem thêm / Thu gọn")
  const [cardExpanded, setCardExpanded] = useState({
    lich: true,
    daoTao: true,
    congTac: true,
    chuyenMon: true
  });

  const toggleCard = (cardKey) => {
    setCardExpanded(prev => ({ ...prev, [cardKey]: !prev[cardKey] }));
  };

  const toggleAllCards = (expand) => {
    setCardExpanded({
      lich: expand,
      daoTao: expand,
      congTac: expand,
      chuyenMon: expand
    });
  };

  // User profile details
  const profileName = user?.name || 'Nguyễn Văn A';
  const shortName = profileName.split(' ').slice(-2).join(' ') || 'Văn A';
  const customerCode = 'N18-000001';
  const phoneNumber = user?.phone || '087*******99';

  // Store branches (Cửa hàng)
  const storeBranches = [
    { id: 'q10', name: 'Chi nhánh Quận 10', address: '555 Đường 3 Tháng 2, Phường Diên Hồng', type: 'store' },
    { id: 'tanbinh', name: 'Chi nhánh Quận Tân Bình', address: '71 Hoàng Hoa Thám, Phường 13', type: 'store' },
    { id: 'phunhuan', name: 'Chi nhánh Quận Phú Nhuận', address: '176 Phan Đăng Lưu, Phường Đức Nhuận', type: 'store' },
    { id: 'binhthanh', name: 'Chi nhánh Quận Bình Thạnh', address: '119-121 Nguyễn Gia Trí, Phường Thạnh Mỹ Tây', type: 'store' },
    { id: 'q3', name: 'Chi nhánh Quận 3', address: '189A-189B Hai Bà Trưng, Phường Võ Thị Sáu', type: 'store' },
    { id: 'q7', name: 'Chi nhánh Quận 7', address: '468A Nguyễn Thị Thập, Phường Tân Quy', type: 'store' }
  ];

  // Clinic branches (Clinic/Spa)
  const clinicBranches = [
    { id: 'clinic_q10', name: 'Hasaki Clinic Quận 10', address: '555 Đường 3 Tháng 2, Phường Diên Hồng', type: 'clinic' },
    { id: 'clinic_q7', name: 'Hasaki Clinic Quận 7', address: '468A Nguyễn Thị Thập, Phường Tân Quy', type: 'clinic' },
    { id: 'clinic_tanbinh', name: 'Hasaki Clinic Tân Bình', address: '71 Hoàng Hoa Thám, Phường 13', type: 'clinic' },
    { id: 'clinic_binhthanh', name: 'Hasaki Clinic Bình Thạnh', address: '119-121 Nguyễn Gia Trí, Phường Thạnh Mỹ Tây', type: 'clinic' },
    { id: 'clinic_q3', name: 'Hasaki Clinic Quận 3', address: '189A-189B Hai Bà Trưng, Phường Võ Thị Sáu', type: 'clinic' }
  ];

  // Comprehensive Doctor & Specialist Data
  const doctorsData = {
    bs_nam: {
      id: 'bs_nam',
      name: 'BS. CKI Vũ Hoài Nam',
      type: 'doctor',
      roleText: 'Bác sĩ Da liễu Hasaki Clinic',
      title: 'Bác sĩ Chuyên khoa I Da liễu',
      subtitle: 'Chuyên gia Da liễu & Điều trị Thẩm mỹ Y khoa',
      gender: 'Nam',
      avatar: '/images/doctor_nam.png',
      experience: '10 năm kinh nghiệm',
      rating: '5.0',
      reviews: '350+ lượt khám',
      branch: 'Hasaki Clinic Quận 7 & Quận 10',
      specialty: 'Khám & điều trị mụn trứng cá, sẹo rỗ, nám da, viêm da tiếp xúc',
      field: 'Da liễu bệnh lý, laser thẩm mỹ, phục hồi da tổn thương sau corticoid',
      schedule: 'Thứ 2, Thứ 4, Thứ 6 (08:30 - 17:30)',
      serviceType: 'TƯ VẤN & KHÁM DA TẠI CLINIC',
      education: [
        '2014: Tốt nghiệp Bác sĩ Đa khoa - Đại học Y Dược TP.HCM.',
        '2018: Tốt nghiệp Bác sĩ Chuyên khoa I Da liễu - ĐH Y Dược TP.HCM.',
        '2020: Chứng chỉ Ứng dụng Laser và Ánh sáng trong Da liễu & Thẩm mỹ Da.'
      ],
      career: [
        '2021 – nay: Bác sĩ trưởng ê-kíp Da liễu tại Hasaki Clinic & Spa.',
        '2018 – 2021: Bác sĩ điều trị tại Bệnh viện Da liễu TP.HCM.',
        'Đã điều trị thành công hơn 3,500+ ca mụn viêm nặng, sẹo rỗ và nám kháng trị.'
      ],
      skills: [
        'Chẩn đoán và xây dựng phác đồ điều trị da liễu chuẩn Y khoa.',
        'Thực hiện thủ thuật tiêm meso, vi điểm sẹo rỗ, laser Fractional CO2.',
        'Kê đơn hoạt chất đặc trị và hướng dẫn chăm sóc da tại nhà.'
      ],
      morningSlots: [
        { time: '08:30 - 09:30', status: 'full' },
        { time: '09:30 - 10:30', status: 'available' },
        { time: '10:30 - 12:00', status: 'available' }
      ],
      afternoonSlots: [
        { time: '13:30 - 14:30', status: 'full' },
        { time: '14:30 - 16:00', status: 'available' }
      ]
    },
    bs_chi: {
      id: 'bs_chi',
      name: 'BS. CKI Lê Thị Mai Chi',
      type: 'doctor',
      roleText: 'Bác sĩ Da liễu Thẩm mỹ Hasaki Clinic',
      title: 'Bác sĩ Da liễu & Laser Thẩm mỹ',
      subtitle: 'Chuyên khoa Da liễu Thẩm mỹ Hasaki Clinic',
      gender: 'Nữ',
      avatar: '/images/doctor_chi.png',
      experience: '8 năm kinh nghiệm',
      rating: '4.9',
      reviews: '280+ lượt khám',
      branch: 'Hasaki Clinic Quận 7 & Tân Bình',
      specialty: 'Trị liệu sắc tố, trẻ hóa da, căng bóng phục hồi hàng rào da',
      field: 'Tư vấn phác đồ chống lão hóa, trị thâm mụn, nám mảng, peel da sinh học',
      schedule: 'Thứ 3, Thứ 5, Thứ 7 (09:00 - 18:00)',
      serviceType: 'TƯ VẤN & KHÁM DA TẠI CLINIC',
      education: [
        '2016: Tốt nghiệp Bác sĩ Y khoa - ĐH Y Dược TP.HCM.',
        '2019: Tốt nghiệp Bác sĩ Chuyên khoa I Da liễu.',
        '2021: Chứng chỉ Chuyên sâu Kỹ thuật Peel Da và Trẻ hóa sinh học da liễu.'
      ],
      career: [
        '2022 – nay: Bác sĩ chuyên khoa Da liễu Thẩm mỹ tại Hasaki Clinic.',
        '2019 – 2022: Bác sĩ Da liễu Thẩm mỹ tại Phòng khám Da liễu Quốc tế.',
        'Chuyên gia tư vấn các dòng dược mỹ phẩm chuẩn Pháp, Mỹ, Hàn.'
      ],
      skills: [
        'Khám và soi da phân tích đa tầng bằng máy phân tích chuyên sâu.',
        'Thiết kế phác đồ cá nhân hóa kết hợp Clinic và Homecare.',
        'Điều trị phục hồi da nhạy cảm, giãn mao mạch và thâm đỏ sau mụn.'
      ],
      morningSlots: [
        { time: '09:00 - 10:30', status: 'full' },
        { time: '10:30 - 12:00', status: 'full' }
      ],
      afternoonSlots: [
        { time: '14:00 - 15:30', status: 'available' },
        { time: '15:30 - 17:00', status: 'available' }
      ]
    },
    thuy_anh: {
      id: 'thuy_anh',
      name: 'Chuyên viên tư vấn Trần Thùy Anh',
      shortName: 'Trần Thùy Anh',
      type: 'specialist',
      roleText: 'Chuyên viên tư vấn chăm sóc da',
      gender: 'Nữ',
      avatar: '/images/consultant_thuy_anh.png',
      specialty: 'TƯ VẤN CHĂM SÓC DA',
      price: 'MIỄN PHÍ',
      branch: 'Chi nhánh Quận 7',
      sessions: [
        { label: 'Sáng thứ 4', day: '28/10/2026', time: '10:00 - 11:30' },
        { label: 'Sáng thứ 6', day: '30/10/2026', time: '11:30 - 12:30' }
      ],
      education: [
        '2023: Hoàn thành khóa học chăm sóc da cơ bản và phân loại da.',
        '2024: Hoàn thành khóa đào tạo tư vấn mỹ phẩm và xây dựng quy trình skincare.',
        '2025: Hoàn thành chương trình đào tạo chuyên sâu về thành phần mỹ phẩm.'
      ],
      career: [
        '2024 – nay: Chuyên viên tư vấn chăm sóc da tại Hasaki Store.',
        'Tư vấn sản phẩm phù hợp với loại da và nhu cầu của khách hàng.',
        'Hỗ trợ khách hàng lựa chọn sản phẩm skincare và xây dựng routine.'
      ],
      skills: [
        'Phân tích nhu cầu chăm sóc da.',
        'Tư vấn sản phẩm skincare.',
        'Xây dựng routine chăm sóc da.',
        'Tư vấn thành phần mỹ phẩm.'
      ]
    },
    ngoc_anh: {
      id: 'ngoc_anh',
      name: 'Chuyên viên tư vấn Nguyễn Ngọc Ánh',
      shortName: 'Nguyễn Ngọc Ánh',
      type: 'specialist',
      roleText: 'Chuyên viên tư vấn mỹ phẩm & chăm sóc da',
      gender: 'Nữ',
      avatar: '/images/consultant_ngoc_anh.png',
      specialty: 'TƯ VẤN CHĂM SÓC DA',
      price: 'MIỄN PHÍ',
      branch: 'Chi nhánh Quận 7',
      sessions: [
        { label: 'Chiều thứ 5', day: '29/10/2026', time: '14:30 - 15:30' },
        { label: 'Chiều thứ 7', day: '31/10/2026', time: '16:00 - 17:30' }
      ],
      education: [
        '2022: Hoàn thành khóa học kiến thức cơ bản về da và mỹ phẩm.',
        '2023: Hoàn thành chương trình đào tạo tư vấn chăm sóc da dầu và da mụn.',
        '2024: Hoàn thành khóa học về thành phần mỹ phẩm và sản phẩm phục hồi da.'
      ],
      career: [
        '2023 – nay: Chuyên viên tư vấn mỹ phẩm tại Hasaki Store.',
        'Tư vấn sản phẩm phù hợp với tình trạng da và nhu cầu của khách hàng.',
        'Hỗ trợ khách hàng lựa chọn sản phẩm chăm sóc da dầu, da mụn.'
      ],
      skills: [
        'Tư vấn chăm sóc da dầu và da mụn.',
        'Tư vấn sản phẩm phục hồi da.',
        'Phân tích thành phần mỹ phẩm.',
        'Xây dựng routine skincare cá nhân hóa.'
      ]
    },
    linh: {
      id: 'linh',
      name: 'BS. Trần Khánh Linh',
      shortName: 'BS. Trần Khánh Linh',
      type: 'doctor',
      roleText: 'Bác sĩ Da liễu Hasaki Clinic',
      gender: 'Nữ',
      avatar: '/images/doctor_linh.png',
      specialty: 'DA LIỄU',
      price: '50.000đ',
      branch: 'Chi nhánh Quận 7',
      sessions: [
        { label: 'Chiều thứ 5', day: '29/10/2026', time: '14:00 - 15:30' },
        { label: 'Chiều thứ 7', day: '31/10/2026', time: '15:30 - 17:00' }
      ],
      education: [
        '2017: Tốt nghiệp Bác sĩ Y khoa - ĐH Y Dược TP.HCM.',
        '2020: Tốt nghiệp Bác sĩ Chuyên khoa Da liễu.',
        '2022: Chứng chỉ Chuyên sâu Kỹ thuật Peel Da và Phục hồi tầng sâu.'
      ],
      career: [
        '2022 – nay: Bác sĩ Da liễu tại Hasaki Clinic Chi nhánh Quận 7.',
        '2020 – 2022: Bác sĩ Da liễu tại Phòng khám Đa khoa Quốc tế.'
      ],
      skills: [
        'Khám da liễu tổng quát và phân tích tầng sâu.',
        'Điều trị mụn viêm, da kích ứng sau kem trộn/corticoid.',
        'Phác đồ điều trị sắc tố, tàn nhang và chống lão hóa.'
      ]
    },
    minh: {
      id: 'minh',
      name: 'ThS. BS. Nguyễn Thu Minh',
      shortName: 'ThS. BS. Nguyễn Thu Minh',
      type: 'doctor',
      roleText: 'Thạc sĩ - Bác sĩ Da liễu Hasaki Clinic',
      gender: 'Nữ',
      avatar: '/images/doctor_minh.png',
      specialty: 'DA LIỄU',
      price: '50.000đ',
      branch: 'Chi nhánh Quận 7',
      sessions: [
        { label: 'Sáng thứ 6', day: '30/10/2026', time: '11:30 - 12:30' },
        { label: 'Sáng chủ nhật', day: '25/10/2026', time: '09:30 - 11:00' }
      ],
      education: [
        '2014: Tốt nghiệp Bác sĩ Đa khoa - ĐH Y Dược TP.HCM.',
        '2017: Tốt nghiệp Thạc sĩ Da liễu - ĐH Y Dược TP.HCM.',
        '2019: Chứng chỉ Ứng dụng Laser và Ánh sáng trong Da liễu & Thẩm mỹ.'
      ],
      career: [
        '2021 – nay: Bác sĩ chuyên khoa Da liễu tại Hasaki Clinic Chi nhánh Quận 7.',
        '2017 – 2021: Bác sĩ điều trị tại Bệnh viện Da liễu TP.HCM.',
        'Kinh nghiệm điều trị hơn 5,000 ca mụn trứng cá, sẹo rỗ, nám da và phục hồi da nhạy cảm.'
      ],
      skills: [
        'Khám và chẩn đoán các bệnh lý về da chuẩn Y khoa.',
        'Thực hiện phác đồ laser vi điểm, tiêm meso căng bóng trẻ hóa.',
        'Tư vấn chế độ chăm sóc da và phác đồ dược mỹ phẩm cá nhân hóa.'
      ]
    }
  };

  const filteredStoreBranches = storeBranches.filter(b => 
    b.name.toLowerCase().includes(branchSearch.toLowerCase()) || 
    b.address.toLowerCase().includes(branchSearch.toLowerCase())
  );

  const filteredClinicBranches = clinicBranches.filter(b => 
    b.name.toLowerCase().includes(branchSearch.toLowerCase()) || 
    b.address.toLowerCase().includes(branchSearch.toLowerCase())
  );

  // Four doctors/consultants in Hình 1 in exact specified order
  const doctorKeysOrdered = ['thuy_anh', 'ngoc_anh', 'linh', 'minh'];
  const doctorsList = doctorKeysOrdered.map(k => doctorsData[k]).filter(d => {
    if (!d) return false;
    const matchSearch = d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
                        d.specialty.toLowerCase().includes(doctorSearch.toLowerCase());
    return matchSearch;
  });

  // Handle slot booking selection -> Transitions to Hình 1 (confirm_step_1)
  const handleSelectSlot = (
    consultantName, 
    timeSlot, 
    date = selectedDate || '31/10/2026', 
    branchOverride = null,
    serviceTypeOverride = null
  ) => {
    const activeBranchName = branchOverride || selectedBranch?.name || 'Chi nhánh Quận 7';
    const branchNameClean = activeBranchName.toLowerCase().includes('cửa hàng') || activeBranchName.toLowerCase().includes('clinic')
      ? activeBranchName
      : (activeBranchName.toLowerCase().includes('chi nhánh') 
          ? 'Cửa hàng ' + activeBranchName.toLowerCase().replace('chi nhánh ', '')
          : activeBranchName);

    setCurrentBooking({
      branch: branchNameClean,
      date: date || '31/10/2026',
      time: timeSlot || '09:30 - 10:00',
      consultant: consultantName || 'Trần Thùy Anh',
      serviceType: serviceTypeOverride || (activeBranchName.toLowerCase().includes('clinic') ? 'TƯ VẤN & KHÁM DA TẠI CLINIC' : 'TƯ VẤN TẠI CỬA HÀNG'),
      hasVoucher: false,
      voucherCode: '',
      price: 0
    });
    setStep('confirm_step_1');
  };

  // Random consultant assignment for "Đặt lịch theo ngày"
  const handleSelectDateRandomSlot = (slotTime) => {
    const randomPool = [
      {
        doctor: 'BS. CKI Vũ Hoài Nam',
        branch: 'Hasaki Clinic Quận 7',
        serviceType: 'TƯ VẤN & KHÁM DA TẠI CLINIC'
      },
      {
        doctor: 'BS. CKI Lê Thị Mai Chi',
        branch: 'Hasaki Clinic Tân Bình',
        serviceType: 'TƯ VẤN & KHÁM DA TẠI CLINIC'
      },
      {
        doctor: 'Chuyên viên Trần Thùy Anh',
        branch: 'Hasaki Store Chi nhánh Quận 7',
        serviceType: 'TƯ VẤN TẠI CỬA HÀNG'
      },
      {
        doctor: 'Chuyên viên Nguyễn Ngọc Ánh',
        branch: 'Hasaki Store Chi nhánh Quận 7',
        serviceType: 'TƯ VẤN TẠI CỬA HÀNG'
      }
    ];
    const assigned = randomPool[Math.floor(Math.random() * randomPool.length)];
    handleSelectSlot(assigned.doctor, slotTime, selectedDate, assigned.branch, assigned.serviceType);
  };

  // Choose doctor session from Hình 1 -> goes to Hình 2 (by_doctor_2: Chọn ngày thăm khám)
  const handleChooseDoctorSession = (docKey, session) => {
    setSelectedDoctorKey(docKey);
    setSelectedSession(session.label);
    if (session.day) {
      setSelectedDate(session.day);
    }
    setStep('by_doctor_2');
  };

  // Choose final slot from Hình 3 -> goes to confirm_step_1 -> confirm_step_2 -> success
  const handleSelectDoctorFinalSlot = (slotTime) => {
    const currentDoc = doctorsData[selectedDoctorKey] || doctorsData.minh;
    setCurrentBooking({
      branch: currentDoc.branch || 'Chi nhánh Quận 7',
      date: selectedDate || '30/10/2026',
      time: slotTime || '11:30 - 12:30',
      consultant: currentDoc.name,
      serviceType: currentDoc.type === 'doctor' ? 'KHÁM & TƯ VẤN DA LIỄU' : 'TƯ VẤN CHĂM SÓC DA',
      hasVoucher: false,
      voucherCode: '',
      price: currentDoc.price === 'MIỄN PHÍ' ? '0đ (Miễn phí)' : currentDoc.price
    });
    setStep('confirm_step_1');
  };

  // View doctor profile
  const handleViewDoctorProfile = (docKey, returnStep = 'by_doctor_1') => {
    setSelectedDoctorKey(docKey);
    setDoctorProfileReturnStep(returnStep);
    setStep('doctor_profile');
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col bg-[#eff4ef] select-none text-slate-800 overflow-hidden">
      
      {/* ============================================================== */}
      {/* 1. INITIAL_1: MÀN HÌNH CHỌN HỒ SƠ                               */}
      {/* ============================================================== */}
      {step === 'initial_1' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="px-5 pt-3 pb-2 flex-shrink-0 bg-white shadow-xs z-10">
            <div className="flex items-center justify-between pb-2">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2.5 text-[#105e3f] font-bold text-[17px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.6]" />
                <span>Đặt lịch</span>
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

            <div className="pt-2 pb-3 flex items-center justify-between">
              <span className="font-extrabold text-[16px] text-slate-900">
                Chọn hồ sơ
              </span>

              <button
                type="button"
                onClick={onNavigateHoSoDa}
                className="h-[36px] px-3.5 rounded-full bg-[#286248] hover:bg-[#1e4e38] active:scale-95 text-white font-bold text-[12.5px] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UserPlus className="w-4 h-4 stroke-[2.4]" />
                <span>Thêm hồ sơ mới</span>
              </button>
            </div>

            <div className="pb-4 flex items-center gap-6">
              <div 
                onClick={() => setShowOptionModal(true)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-[52px] h-[52px] rounded-full border-2 border-[#105e3f] bg-white flex items-center justify-center text-[#105e3f] shadow-xs group-hover:scale-105 transition-transform">
                  <User className="w-7 h-7 stroke-[2.2]" />
                </div>
                <span className="mt-1.5 font-bold text-[13px] text-[#105e3f] leading-tight">
                  {shortName}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  {customerCode}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-20 scroll-smooth">
            <div 
              onClick={() => setShowOptionModal(true)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-[#105e3f]/40 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#105e3f] flex items-center justify-center text-[#105e3f]">
                  <span className="text-[10px] font-black">H</span>
                </div>
                <h3 className="font-bold text-[16px] text-slate-900 group-hover:text-[#105e3f] transition-colors">
                  {profileName}
                </h3>
              </div>

              <div className="bg-[#f7faf8] rounded-xl px-3 py-2.5 flex items-center justify-between text-[13px] text-slate-700">
                <div className="flex items-center gap-2 font-medium">
                  <CreditCard className="w-4 h-4 text-[#105e3f]" />
                  <span>{customerCode}</span>
                </div>

                <span className="text-gray-300 font-light">|</span>

                <div className="flex items-center gap-2 font-medium">
                  <Phone className="w-4 h-4 text-[#105e3f]" />
                  <span>{phoneNumber}</span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-[#e4ede6] text-[#105e3f] font-bold text-[11px] flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Tôi
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. INITIAL_3: THEO LỊCH HẸN (Hình 3 ban đầu)                     */}
      {/* ============================================================== */}
      {step === 'initial_3' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('initial_1')}
                className="flex items-center gap-2.5 text-[#105e3f] font-bold text-[17px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.6]" />
                <span>Lịch hẹn tư vấn</span>
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

          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center pb-20">
            <div className="w-24 h-24 rounded-full bg-emerald-50 border-2 border-dashed border-[#105e3f]/40 flex items-center justify-center text-[#105e3f] mb-4">
              <Calendar className="w-12 h-12 stroke-[1.8]" />
            </div>
            <h3 className="font-bold text-[17px] text-slate-900 mb-1.5">
              Chưa có lịch hẹn tư vấn
            </h3>
            <p className="text-[13px] text-gray-500 max-w-xs leading-relaxed mb-6">
              Bạn chưa có lịch hẹn tư vấn nào sắp tới. Hãy bấm đặt lịch mới để được chuyên viên Hasaki chăm sóc làn da tốt nhất!
            </p>
            <button
              type="button"
              onClick={() => setStep('store_flow_1')}
              className="px-6 py-3 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[14px] shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              Đặt lịch tư vấn ngay
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. STORE_FLOW_1: CHỌN THÔNG TIN KHÁM (Cửa hàng / Clinic)        */}
      {/* ============================================================== */}
      {step === 'store_flow_1' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('initial_1')}
                className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                <span>Chọn thông tin khám</span>
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

          <div className="p-4 pt-6 space-y-3.5 flex-1 overflow-y-auto">
            {/* Option 1: Cửa hàng */}
            <div
              onClick={() => setStep('store_flow_2')}
              className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex items-center justify-between cursor-pointer hover:border-[#105e3f] hover:shadow-md active:scale-[0.99] transition-all group"
            >
              <div>
                <span className="font-extrabold text-[18px] text-[#105e3f] tracking-tight block">
                  Cửa hàng
                </span>
                <span className="text-[12px] text-gray-500 font-medium">
                  Tư vấn skincare & lựa chọn mỹ phẩm trực tiếp
                </span>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-[#105e3f] group-hover:translate-x-1 transition-all" />
            </div>

            {/* Option 2: Clinic/Spa */}
            <div
              onClick={() => setStep('clinic_flow_2')}
              className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex items-center justify-between cursor-pointer hover:border-[#105e3f] hover:shadow-md active:scale-[0.99] transition-all group"
            >
              <div>
                <span className="font-extrabold text-[18px] text-[#105e3f] tracking-tight block">
                  Clinic/Spa
                </span>
                <span className="text-[12px] text-gray-500 font-medium">
                  Khám da liễu chuyên sâu cùng Bác sĩ Da liễu & KTV
                </span>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-[#105e3f] group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. STORE_FLOW_2: CHỌN CHI NHÁNH CỬA HÀNG                        */}
      {/* ============================================================== */}
      {step === 'store_flow_2' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-shrink-0 bg-white shadow-xs z-10">
            <div className="px-5 pt-3 pb-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('store_flow_1')}
                  className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                  <span>Chọn chi nhánh cửa hàng</span>
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

            <div className="p-4 pt-1 pb-3 bg-[#eff4ef]">
              <div className="relative flex items-center bg-white rounded-full border border-gray-300 px-4 py-2.5 shadow-xs focus-within:border-[#105e3f]">
                <Search className="w-4 h-4 text-gray-500 mr-2.5" />
                <input
                  type="text"
                  value={branchSearch}
                  onChange={(e) => setBranchSearch(e.target.value)}
                  placeholder="Tìm nhanh chi nhánh"
                  className="w-full text-[14px] bg-transparent outline-none text-slate-800 placeholder-gray-400 font-medium"
                />
                <Mic className="w-4 h-4 text-gray-500 ml-2 cursor-pointer hover:text-[#105e3f]" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pt-2 space-y-3 pb-24 scroll-smooth">
            {filteredStoreBranches.map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  setSelectedBranch(b);
                  setStep('store_flow_3');
                }}
                className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex items-center justify-between cursor-pointer hover:border-[#105e3f] hover:shadow-md active:scale-[0.99] transition-all group"
              >
                <div className="pr-3">
                  <h4 className="font-extrabold text-[16px] text-slate-900 group-hover:text-[#105e3f] transition-colors leading-tight mb-1">
                    {b.name}
                  </h4>
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">
                    {b.address}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 group-hover:border-[#105e3f] group-hover:bg-emerald-50 transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-[#105e3f]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. STORE_FLOW_3: CHỌN NGÀY TƯ VẤN (Cửa hàng)                    */}
      {/* ============================================================== */}
      {step === 'store_flow_3' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('store_flow_2')}
                className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                <span>Chọn ngày tư vấn</span>
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

          <div className="flex-1 overflow-y-auto p-4 pt-4 pb-24 scroll-smooth">
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100">
              <div className="flex items-center justify-between mb-6 px-4">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={calendarYear === 2026 && calendarMonth <= 10}
                  className={`w-10 h-10 rounded-full bg-[#105e3f] text-white flex items-center justify-center transition-all ${
                    calendarYear === 2026 && calendarMonth <= 10 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#0c4a31] cursor-pointer shadow-xs'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.8]" />
                </button>
                <h3 className="font-extrabold text-[18px] text-[#105e3f]">
                  Tháng {calendarMonth} - {calendarYear}
                </h3>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="w-10 h-10 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white flex items-center justify-center cursor-pointer shadow-xs transition-all"
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.8]" />
                </button>
              </div>

              <div className="grid grid-cols-7 text-center font-bold text-[16px] mb-3">
                <span className="text-[#ea580c]">Su</span>
                <span className="text-[#0284c7]">Mo</span>
                <span className="text-[#0284c7]">Tu</span>
                <span className="text-[#0284c7]">We</span>
                <span className="text-[#0284c7]">Th</span>
                <span className="text-[#0284c7]">Fr</span>
                <span className="text-[#0284c7]">Sa</span>
              </div>

              <div className="grid grid-cols-7 text-center gap-y-3 font-medium text-[16px]">
                {(() => {
                  const firstDayIndex = new Date(calendarYear, calendarMonth - 1, 1).getDay();
                  const daysInMonth = new Date(calendarYear, calendarMonth, 0).getDate();
                  const blanks = Array.from({ length: firstDayIndex }, (_, i) => (
                    <span key={`blank-${i}`} />
                  ));
                  const dayCells = Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const dayStr = `${String(day).padStart(2, '0')}/${String(calendarMonth).padStart(2, '0')}/${calendarYear}`;
                    const dayOfWeek = (firstDayIndex + day - 1) % 7;
                    const isSunday = dayOfWeek === 0;
                    const selectable = isDaySelectable(day, calendarMonth, calendarYear);
                    if (selectable) {
                      return (
                        <div
                          key={day}
                          onClick={() => {
                            setSelectedDate(dayStr);
                            setSelectedDateTab1(`${String(day).padStart(2, '0')}/${String(calendarMonth).padStart(2, '0')}`);
                            setSelectedDateTab2(`${String(day).padStart(2, '0')}/${String(calendarMonth).padStart(2, '0')}`);
                            setStep('store_flow_4');
                          }}
                          className="py-1 cursor-pointer flex items-center justify-center"
                        >
                          <span className="w-8 h-8 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold flex items-center justify-center shadow-xs active:scale-95 transition-all">
                            {day}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div key={day} className="py-1 flex items-center justify-center">
                        <span className={`w-8 h-8 flex items-center justify-center font-medium opacity-60 ${isSunday ? 'text-[#ea580c]' : 'text-[#0284c7]'}`}>
                          {day}
                        </span>
                      </div>
                    );
                  });
                  return [...blanks, ...dayCells];
                })()}
              </div>
            </div>

            <div className="mt-4 bg-[#e5e9e5] rounded-xl px-4 py-3 border-l-4 border-[#105e3f] text-[13px] text-slate-800 font-medium">
              Chọn ngày có <span className="text-[#105e3f] font-bold">màu xanh lá</span> để đặt khám.
            </div>

            <div className="mt-4 space-y-2 text-[13px] text-slate-700 pl-2">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#105e3f] flex-shrink-0" />
                <span>Ngày có thể chọn</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-gray-400 flex-shrink-0" />
                <span>Ngày không chọn</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] flex-shrink-0" />
                <span>Ngày Lễ, Tết</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. STORE_FLOW_4: CHỌN KHUNG GIỜ TƯ VẤN (Cửa hàng)               */}
      {/* ============================================================== */}
      {step === 'store_flow_4' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-shrink-0 bg-white shadow-xs z-10">
            <div className="px-5 pt-3 pb-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('store_flow_3')}
                  className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                  <span>Chọn khung giờ tư vấn</span>
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

            <div className="px-5 py-2.5 bg-white border-t border-gray-100 shadow-2xs">
              <h3 className="font-extrabold text-[13px] text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                <span className="w-1 h-3.5 bg-slate-900 inline-block rounded-xs" />
                CHỌN KHUNG GIỜ TƯ VẤN
              </h3>
              <p className="text-[11.5px] italic text-gray-500 mt-0.5 font-medium">
                Vui lòng bấm chọn khung giờ màu xanh lá để đặt lịch tư vấn
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
            {/* Consultant 1: Trần Thùy Anh */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
              <div className="flex items-start gap-3">
                <img
                  src="/images/consultant_thuy_anh.png"
                  alt="Trần Thùy Anh"
                  className="w-16 h-16 rounded-xl object-cover border border-emerald-100 flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-extrabold text-[15px] text-[#105e3f] leading-snug">
                    Chuyên viên tư vấn Trần Thùy Anh
                  </h4>
                  <p className="text-[12px] italic text-gray-500 font-medium my-0.5">
                    {selectedBranch.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedConsultantKey('thuy_anh');
                      setStep('store_flow_5');
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dbe5dd] text-slate-700 text-[11px] font-semibold hover:bg-[#ccd9cf] transition-colors cursor-pointer"
                  >
                    <span>Thông tin chuyên viên</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="border-b border-dashed border-gray-200 my-3.5" />

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {(() => {
                  const defaultDates = ['30/10', '06/11', '13/11', '20/11', '27/11', '29/11'];
                  let dates = [...defaultDates];
                  if (selectedDateTab1 && !dates.includes(selectedDateTab1)) {
                    dates = [selectedDateTab1, ...dates];
                  }
                  return dates.map((dStr, idx) => {
                    const isSelected = selectedDateTab1 === dStr;
                    const yearStr = selectedDate?.split('/')[2] || `${calendarYear}`;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedDateTab1(dStr);
                          setSelectedDate(`${dStr}/${yearStr}`);
                        }}
                        className={`relative flex-shrink-0 w-[54px] py-1.5 rounded-xl text-center cursor-pointer transition-all ${
                          isSelected ? 'bg-[#105e3f] text-white shadow-xs' : 'bg-[#e5e9e5] text-slate-800'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white text-[#105e3f] flex items-center justify-center shadow-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 fill-[#105e3f] text-white" />
                          </div>
                        )}
                        <div className="font-extrabold text-[12px] leading-tight">{dStr}</div>
                        <div className="text-[10px] opacity-80 leading-tight">{yearStr}</div>
                      </div>
                    );
                  });
                })()}
              </div>

              <h5 className="font-extrabold text-[14px] text-[#105e3f] mt-2.5 mb-2.5">
                {selectedDateTab1 ? `${selectedDateTab1}/${selectedDate?.split('/')[2] || calendarYear}` : (selectedDate || '30/10/2026')} - Buổi sáng ({getVietnameseDayOfWeek(selectedDateTab1 ? `${selectedDateTab1}/${selectedDate?.split('/')[2] || calendarYear}` : selectedDate)})
              </h5>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#e5e9e5] rounded-xl py-2 px-3 text-center opacity-70">
                  <div className="font-bold text-[13px] text-slate-800 leading-tight">08:30 - 09:00</div>
                  <div className="text-[10px] text-gray-500 font-medium">Hết số</div>
                </div>
                <div className="bg-[#e5e9e5] rounded-xl py-2 px-3 text-center opacity-70">
                  <div className="font-bold text-[13px] text-slate-800 leading-tight">09:00 - 09:30</div>
                  <div className="text-[10px] text-gray-500 font-medium">Hết số</div>
                </div>
                <div className="bg-[#e5e9e5] rounded-xl py-2 px-3 text-center opacity-70">
                  <div className="font-bold text-[13px] text-slate-800 leading-tight">09:30 - 10:00</div>
                  <div className="text-[10px] text-gray-500 font-medium">Hết số</div>
                </div>
                <div
                  onClick={() => handleSelectSlot('Trần Thùy Anh', '10:00 - 11:30')}
                  className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex items-center justify-center font-extrabold text-[13px]"
                >
                  10:00 - 11:30
                </div>
                <div
                  onClick={() => handleSelectSlot('Trần Thùy Anh', '11:30 - 12:00')}
                  className="col-span-1 bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex items-center justify-center font-extrabold text-[13px]"
                >
                  11:30 - 12:00
                </div>
              </div>
            </div>

            {/* Consultant 2: Nguyễn Ngọc Ánh */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
              <div className="flex items-start gap-3">
                <img
                  src="/images/consultant_ngoc_anh.png"
                  alt="Nguyễn Ngọc Ánh"
                  className="w-16 h-16 rounded-xl object-cover border border-emerald-100 flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-extrabold text-[15px] text-[#105e3f] leading-snug">
                    Chuyên viên tư vấn Nguyễn Ngọc Ánh
                  </h4>
                  <p className="text-[12px] italic text-gray-500 font-medium my-0.5">
                    {selectedBranch.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedConsultantKey('ngoc_anh');
                      setStep('store_flow_5');
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dbe5dd] text-slate-700 text-[11px] font-semibold hover:bg-[#ccd9cf] transition-colors cursor-pointer"
                  >
                    <span>Thông tin chuyên viên</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="border-b border-dashed border-gray-200 my-3.5" />

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {(() => {
                  const defaultDates = ['30/10', '06/11', '13/11', '20/11', '27/11', '29/11'];
                  let dates = [...defaultDates];
                  if (selectedDateTab2 && !dates.includes(selectedDateTab2)) {
                    dates = [selectedDateTab2, ...dates];
                  }
                  return dates.map((dStr, idx) => {
                    const isSelected = selectedDateTab2 === dStr;
                    const yearStr = selectedDate?.split('/')[2] || `${calendarYear}`;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedDateTab2(dStr);
                          setSelectedDate(`${dStr}/${yearStr}`);
                        }}
                        className={`relative flex-shrink-0 w-[54px] py-1.5 rounded-xl text-center cursor-pointer transition-all ${
                          isSelected ? 'bg-[#105e3f] text-white shadow-xs' : 'bg-[#e5e9e5] text-slate-800'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white text-[#105e3f] flex items-center justify-center shadow-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 fill-[#105e3f] text-white" />
                          </div>
                        )}
                        <div className="font-extrabold text-[12px] leading-tight">{dStr}</div>
                        <div className="text-[10px] opacity-80 leading-tight">{yearStr}</div>
                      </div>
                    );
                  });
                })()}
              </div>

              <h5 className="font-extrabold text-[14px] text-[#105e3f] mt-2.5 mb-2.5">
                {selectedDateTab2 ? `${selectedDateTab2}/${selectedDate?.split('/')[2] || calendarYear}` : (selectedDate || '30/10/2026')} - Buổi chiều ({getVietnameseDayOfWeek(selectedDateTab2 ? `${selectedDateTab2}/${selectedDate?.split('/')[2] || calendarYear}` : selectedDate)})
              </h5>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#e5e9e5] rounded-xl py-2 px-3 text-center opacity-70">
                  <div className="font-bold text-[13px] text-slate-800 leading-tight">13:30 - 14:00</div>
                  <div className="text-[10px] text-gray-500 font-medium">Hết số</div>
                </div>
                <div className="bg-[#e5e9e5] rounded-xl py-2 px-3 text-center opacity-70">
                  <div className="font-bold text-[13px] text-slate-800 leading-tight">14:00 - 15:30</div>
                  <div className="text-[10px] text-gray-500 font-medium">Hết số</div>
                </div>
                <div className="bg-[#e5e9e5] rounded-xl py-2 px-3 text-center opacity-70">
                  <div className="font-bold text-[13px] text-slate-800 leading-tight">15:30 - 16:00</div>
                  <div className="text-[10px] text-gray-500 font-medium">Hết số</div>
                </div>
                <div
                  onClick={() => handleSelectSlot('Nguyễn Ngọc Ánh', '16:00 - 17:30')}
                  className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex items-center justify-center font-extrabold text-[13px]"
                >
                  16:00 - 17:30
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. STORE_FLOW_5: THÔNG TIN CHUYÊN VIÊN (Hình 5)                 */}
      {/* ============================================================== */}
      {step === 'store_flow_5' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-[#105e3f] text-white shadow-xs z-10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('store_flow_4')}
                className="flex items-center gap-2.5 text-white font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                <span>
                  {selectedConsultantKey === 'thuy_anh' ? 'Thông tin chuyên viên' : 'Thông tin nhân viên'}
                </span>
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="text-white hover:opacity-80 transition-opacity p-1 cursor-pointer"
                aria-label="Trang chủ"
              >
                <Home className="w-6 h-6 stroke-[2.4]" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-28 scroll-smooth">
            <div className="flex items-center justify-between px-1 text-[11.5px] text-gray-500 font-medium">
              <span>Vuốt xuống để xem chi tiết</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => toggleAllCards(false)} className="text-slate-600 hover:text-[#105e3f] hover:underline cursor-pointer">
                  Thu gọn hết
                </button>
                <span>•</span>
                <button type="button" onClick={() => toggleAllCards(true)} className="text-[#105e3f] font-bold hover:underline cursor-pointer">
                  Xem thêm hết
                </button>
              </div>
            </div>

            {selectedConsultantKey === 'thuy_anh' && (
              <>
                <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex items-start gap-3.5">
                  <img
                    src="/images/consultant_thuy_anh.png"
                    alt="Trần Thùy Anh"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-[#105e3f]/20 flex-shrink-0 shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#e8ede8] text-[#105e3f] font-extrabold text-[13px] mb-1 leading-snug">
                      Chuyên viên tư vấn Trần Thùy Anh
                    </div>
                    <p className="text-[11.5px] italic text-gray-500 font-medium mb-1.5">
                      Chuyên viên tư vấn chăm sóc da
                    </p>
                    <div className="text-[11px] text-slate-700 space-y-0.5 leading-snug">
                      <div><span className="font-semibold text-slate-900">Giới tính:</span> Nữ</div>
                      <div><span className="font-semibold text-slate-900">Chuyên môn:</span> Tư vấn skincare - Mỹ phẩm</div>
                      <div><span className="font-semibold text-slate-900">Lĩnh vực:</span> Chăm sóc da, tư vấn sản phẩm, xây dựng routine skincare</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                  <div onClick={() => toggleCard('lich')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                    <span>Lịch tư vấn</span>
                    <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.lich ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                  </div>
                  {cardExpanded.lich && (
                    <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1">
                      <div>• Sáng Thứ 6</div>
                      <div>• Địa điểm: Hasaki Store chi nhánh Quận 7</div>
                      <div>• Hình thức: Tư vấn trực tiếp tại cửa hàng</div>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                  <div onClick={() => toggleCard('daoTao')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                    <span>Quá trình đào tạo</span>
                    <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.daoTao ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                  </div>
                  {cardExpanded.daoTao && (
                    <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1.5">
                      <div>• 2023: Hoàn thành khóa học chăm sóc da cơ bản và phân loại da.</div>
                      <div>• 2024: Hoàn thành khóa đào tạo tư vấn mỹ phẩm và xây dựng quy trình skincare.</div>
                      <div>• 2025: Hoàn thành chương trình đào tạo chuyên sâu về thành phần mỹ phẩm và chăm sóc da cá nhân hóa.</div>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                  <div onClick={() => toggleCard('congTac')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                    <span>Quá trình công tác</span>
                    <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.congTac ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                  </div>
                  {cardExpanded.congTac && (
                    <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1">
                      <div className="font-bold text-slate-900 underline mb-1">Kinh nghiệm tư vấn khách hàng</div>
                      <div>• 2024 – nay: Chuyên viên tư vấn chăm sóc da tại Hasaki.</div>
                      <div>• Tư vấn sản phẩm phù hợp với loại da và nhu cầu của khách hàng.</div>
                      <div>• Hỗ trợ khách hàng lựa chọn sản phẩm skincare và xây dựng routine chăm sóc da.</div>
                      <div>• Theo dõi phản hồi của khách hàng về sản phẩm đã sử dụng.</div>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                  <div onClick={() => toggleCard('chuyenMon')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                    <span>Chuyên môn</span>
                    <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.chuyenMon ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                  </div>
                  {cardExpanded.chuyenMon && (
                    <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1">
                      <div>• Phân tích nhu cầu chăm sóc da.</div>
                      <div>• Tư vấn sản phẩm skincare.</div>
                      <div>• Xây dựng routine chăm sóc da.</div>
                      <div>• Tư vấn thành phần mỹ phẩm.</div>
                      <div>• Hỗ trợ khách hàng lựa chọn sản phẩm phù hợp.</div>
                    </div>
                  )}
                </div>
              </>
            )}

            {selectedConsultantKey === 'ngoc_anh' && (
              <>
                <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex items-start gap-3.5">
                  <img
                    src="/images/consultant_ngoc_anh.png"
                    alt="Nguyễn Ngọc Ánh"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-[#105e3f]/20 flex-shrink-0 shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#e8ede8] text-[#105e3f] font-extrabold text-[13px] mb-1 leading-snug">
                      Chuyên viên tư vấn Nguyễn Ngọc Ánh
                    </div>
                    <p className="text-[11.5px] italic text-gray-500 font-medium mb-1.5">
                      Chuyên viên tư vấn mỹ phẩm & chăm sóc da
                    </p>
                    <div className="text-[11px] text-slate-700 space-y-0.5 leading-snug">
                      <div><span className="font-semibold text-slate-900">Giới tính:</span> Nữ</div>
                      <div><span className="font-semibold text-slate-900">Chuyên môn:</span> Tư vấn mỹ phẩm – Chăm sóc da</div>
                      <div><span className="font-semibold text-slate-900">Lĩnh vực:</span> Da dầu, da mụn, phục hồi da và lựa chọn sản phẩm skincare</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                  <div onClick={() => toggleCard('lich')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                    <span>Lịch tư vấn</span>
                    <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.lich ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                  </div>
                  {cardExpanded.lich && (
                    <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1">
                      <div>• Chiều Thứ 6</div>
                      <div>• Địa điểm: Hasaki Store chi nhánh Quận 7</div>
                      <div>• Hình thức: Tư vấn trực tiếp tại cửa hàng</div>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                  <div onClick={() => toggleCard('daoTao')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                    <span>Quá trình đào tạo</span>
                    <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.daoTao ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                  </div>
                  {cardExpanded.daoTao && (
                    <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1.5">
                      <div>• 2022: Hoàn thành khóa học kiến thức cơ bản về da và mỹ phẩm.</div>
                      <div>• 2023: Hoàn thành chương trình đào tạo tư vấn chăm sóc da dầu và da mụn.</div>
                      <div>• 2024: Hoàn thành khóa học về thành phần mỹ phẩm và sản phẩm phục hồi da.</div>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                  <div onClick={() => toggleCard('congTac')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                    <span>Quá trình công tác</span>
                    <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.congTac ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                  </div>
                  {cardExpanded.congTac && (
                    <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1">
                      <div className="font-bold text-slate-900 underline mb-1">Kinh nghiệm tư vấn khách hàng</div>
                      <div>• 2023 – nay: Chuyên viên tư vấn mỹ phẩm tại Hasaki.</div>
                      <div>• Tư vấn sản phẩm phù hợp với tình trạng da và nhu cầu của khách hàng.</div>
                      <div>• Hỗ trợ khách hàng lựa chọn sản phẩm chăm sóc da dầu, da mụn và da nhạy cảm.</div>
                      <div>• Hướng dẫn khách hàng sử dụng sản phẩm theo routine skincare.</div>
                      <div>• Theo dõi phản hồi và hỗ trợ khách hàng sau khi mua sản phẩm.</div>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                  <div onClick={() => toggleCard('chuyenMon')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                    <span>Chuyên môn</span>
                    <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.chuyenMon ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                  </div>
                  {cardExpanded.chuyenMon && (
                    <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1">
                      <div>• Tư vấn chăm sóc da dầu và da mụn.</div>
                      <div>• Tư vấn sản phẩm phục hồi da.</div>
                      <div>• Phân tích thành phần mỹ phẩm.</div>
                      <div>• Xây dựng routine skincare cá nhân hóa.</div>
                      <div>• Hỗ trợ khách hàng lựa chọn sản phẩm phù hợp.</div>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="pt-2 pb-6">
              <button
                type="button"
                onClick={() => setStep('store_flow_4')}
                className="w-full py-3.5 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[14px] shadow-sm transition-all cursor-pointer text-center"
              >
                Đặt lịch theo khung giờ chuyên viên
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 8. CLINIC_FLOW_2: CHỌN CHI NHÁNH HASAKI CLINIC & SPA            */}
      {/* ============================================================== */}
      {step === 'clinic_flow_2' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-shrink-0 bg-white shadow-xs z-10">
            <div className="px-5 pt-3 pb-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('store_flow_1')}
                  className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                  <span>Chọn chi nhánh Clinic/Spa</span>
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

            <div className="p-4 pt-1 pb-3 bg-[#eff4ef]">
              <div className="relative flex items-center bg-white rounded-full border border-gray-300 px-4 py-2.5 shadow-xs focus-within:border-[#105e3f]">
                <Search className="w-4 h-4 text-gray-500 mr-2.5" />
                <input
                  type="text"
                  value={branchSearch}
                  onChange={(e) => setBranchSearch(e.target.value)}
                  placeholder="Tìm phòng khám Clinic Hasaki"
                  className="w-full text-[14px] bg-transparent outline-none text-slate-800 placeholder-gray-400 font-medium"
                />
                <Mic className="w-4 h-4 text-gray-500 ml-2 cursor-pointer hover:text-[#105e3f]" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pt-2 space-y-3 pb-24 scroll-smooth">
            {filteredClinicBranches.map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  setSelectedBranch(b);
                  setStep('clinic_flow_3');
                }}
                className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex items-center justify-between cursor-pointer hover:border-[#105e3f] hover:shadow-md active:scale-[0.99] transition-all group"
              >
                <div className="pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-[#105e3f] text-[11px] font-extrabold">CLINIC</span>
                    <h4 className="font-extrabold text-[16px] text-slate-900 group-hover:text-[#105e3f] transition-colors leading-tight">
                      {b.name}
                    </h4>
                  </div>
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">
                    {b.address}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 group-hover:border-[#105e3f] group-hover:bg-emerald-50 transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-[#105e3f]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 9. CLINIC_FLOW_3: CHỌN NGÀY KHÁM CLINIC                        */}
      {/* ============================================================== */}
      {step === 'clinic_flow_3' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('clinic_flow_2')}
                className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                <span>Chọn ngày khám Clinic</span>
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

          <div className="flex-1 overflow-y-auto p-4 pt-4 pb-24 scroll-smooth">
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100">
              <div className="flex items-center justify-between mb-6 px-4">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={calendarYear === 2026 && calendarMonth <= 10}
                  className={`w-10 h-10 rounded-full bg-[#105e3f] text-white flex items-center justify-center transition-all ${
                    calendarYear === 2026 && calendarMonth <= 10 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#0c4a31] cursor-pointer shadow-xs'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.8]" />
                </button>
                <h3 className="font-extrabold text-[18px] text-[#105e3f]">
                  Tháng {calendarMonth} - {calendarYear}
                </h3>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="w-10 h-10 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white flex items-center justify-center cursor-pointer shadow-xs transition-all"
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.8]" />
                </button>
              </div>

              <div className="grid grid-cols-7 text-center font-bold text-[16px] mb-3">
                <span className="text-[#ea580c]">Su</span>
                <span className="text-[#0284c7]">Mo</span>
                <span className="text-[#0284c7]">Tu</span>
                <span className="text-[#0284c7]">We</span>
                <span className="text-[#0284c7]">Th</span>
                <span className="text-[#0284c7]">Fr</span>
                <span className="text-[#0284c7]">Sa</span>
              </div>

              <div className="grid grid-cols-7 text-center gap-y-3 font-medium text-[16px]">
                {(() => {
                  const firstDayIndex = new Date(calendarYear, calendarMonth - 1, 1).getDay();
                  const daysInMonth = new Date(calendarYear, calendarMonth, 0).getDate();
                  const blanks = Array.from({ length: firstDayIndex }, (_, i) => (
                    <span key={`blank-clinic-${i}`} />
                  ));
                  const dayCells = Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const dayStr = `${String(day).padStart(2, '0')}/${String(calendarMonth).padStart(2, '0')}/${calendarYear}`;
                    const dayOfWeek = (firstDayIndex + day - 1) % 7;
                    const isSunday = dayOfWeek === 0;
                    const selectable = isDaySelectable(day, calendarMonth, calendarYear);
                    if (selectable) {
                      return (
                        <div
                          key={day}
                          onClick={() => {
                            setSelectedDate(dayStr);
                            setStep('clinic_flow_4');
                          }}
                          className="py-1 cursor-pointer flex items-center justify-center"
                        >
                          <span className="w-8 h-8 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold flex items-center justify-center shadow-xs active:scale-95 transition-all">
                            {day}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div key={day} className="py-1 flex items-center justify-center">
                        <span className={`w-8 h-8 flex items-center justify-center font-medium opacity-60 ${isSunday ? 'text-[#ea580c]' : 'text-[#0284c7]'}`}>
                          {day}
                        </span>
                      </div>
                    );
                  });
                  return [...blanks, ...dayCells];
                })()}
              </div>
            </div>

            <div className="mt-4 bg-[#e5e9e5] rounded-xl px-4 py-3 border-l-4 border-[#105e3f] text-[13px] text-slate-800 font-medium">
              Chọn ngày có <span className="text-[#105e3f] font-bold">màu xanh lá</span> để đặt lịch khám Clinic.
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 10. CLINIC_FLOW_4: CHỌN BÁC SĨ & KHUNG GIỜ CLINIC              */}
      {/* ============================================================== */}
      {step === 'clinic_flow_4' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-shrink-0 bg-white shadow-xs z-10">
            <div className="px-5 pt-3 pb-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('clinic_flow_3')}
                  className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                  <span>Chọn Bác sĩ & Giờ khám Clinic</span>
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

            <div className="px-5 py-2.5 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-[12px] font-bold text-[#105e3f]">{selectedBranch.name}</span>
                <span className="text-[11px] text-gray-500 block">Ngày khám: {selectedDate}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[11px]">
                Miễn phí khám da
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
            {/* Doctor 1: BS. CKI Vũ Hoài Nam */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
              <div className="flex items-start gap-3">
                <img
                  src="/images/doctor_nam.png"
                  alt="BS. CKI Vũ Hoài Nam"
                  className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-200 flex-shrink-0 shadow-xs"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#105e3f] font-extrabold text-[10px]">
                      BÁC SĨ CHUYÊN KHOA I
                    </span>
                    <span className="text-[11px] text-amber-500 font-bold flex items-center">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> 5.0
                    </span>
                  </div>
                  <h4 className="font-extrabold text-[15px] text-[#105e3f] leading-snug">
                    BS. CKI Vũ Hoài Nam
                  </h4>
                  <p className="text-[11.5px] text-gray-600 font-medium">
                    10 năm kinh nghiệm - ĐH Y Dược TP.HCM
                  </p>
                  <button
                    type="button"
                    onClick={() => handleViewDoctorProfile('bs_nam')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 mt-1 rounded-full bg-[#dbe5dd] text-slate-700 text-[11px] font-semibold hover:bg-[#ccd9cf] transition-colors cursor-pointer"
                  >
                    <span>Thông tin bác sĩ</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="border-b border-dashed border-gray-200 my-3.5" />

              <h5 className="font-extrabold text-[13.5px] text-[#105e3f] mb-2">
                Khung giờ khám tại Clinic (31/10/2026):
              </h5>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#e5e9e5] rounded-xl py-2 px-3 text-center opacity-70">
                  <div className="font-bold text-[13px] text-slate-800">08:30 - 09:30</div>
                  <div className="text-[10px] text-gray-500">Hết số</div>
                </div>
                <div
                  onClick={() => handleSelectSlot('BS. CKI Vũ Hoài Nam', '09:30 - 10:30', selectedDate, selectedBranch.name, 'TƯ VẤN & KHÁM DA TẠI CLINIC')}
                  className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex items-center justify-center font-extrabold text-[13px]"
                >
                  09:30 - 10:30
                </div>
                <div
                  onClick={() => handleSelectSlot('BS. CKI Vũ Hoài Nam', '10:30 - 12:00', selectedDate, selectedBranch.name, 'TƯ VẤN & KHÁM DA TẠI CLINIC')}
                  className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex items-center justify-center font-extrabold text-[13px]"
                >
                  10:30 - 12:00
                </div>
                <div
                  onClick={() => handleSelectSlot('BS. CKI Vũ Hoài Nam', '14:30 - 16:00', selectedDate, selectedBranch.name, 'TƯ VẤN & KHÁM DA TẠI CLINIC')}
                  className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex items-center justify-center font-extrabold text-[13px]"
                >
                  14:30 - 16:00
                </div>
              </div>
            </div>

            {/* Doctor 2: BS. CKI Lê Thị Mai Chi */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
              <div className="flex items-start gap-3">
                <img
                  src="/images/doctor_chi.png"
                  alt="BS. CKI Lê Thị Mai Chi"
                  className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-200 flex-shrink-0 shadow-xs"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#105e3f] font-extrabold text-[10px]">
                      BÁC SĨ DA LIỄU & LASER
                    </span>
                    <span className="text-[11px] text-amber-500 font-bold flex items-center">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> 4.9
                    </span>
                  </div>
                  <h4 className="font-extrabold text-[15px] text-[#105e3f] leading-snug">
                    BS. CKI Lê Thị Mai Chi
                  </h4>
                  <p className="text-[11.5px] text-gray-600 font-medium">
                    8 năm kinh nghiệm - Chuyên khoa Laser & Peel
                  </p>
                  <button
                    type="button"
                    onClick={() => handleViewDoctorProfile('bs_chi')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 mt-1 rounded-full bg-[#dbe5dd] text-slate-700 text-[11px] font-semibold hover:bg-[#ccd9cf] transition-colors cursor-pointer"
                  >
                    <span>Thông tin bác sĩ</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="border-b border-dashed border-gray-200 my-3.5" />

              <h5 className="font-extrabold text-[13.5px] text-[#105e3f] mb-2">
                Khung giờ khám tại Clinic (31/10/2026):
              </h5>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#e5e9e5] rounded-xl py-2 px-3 text-center opacity-70">
                  <div className="font-bold text-[13px] text-slate-800">09:00 - 10:30</div>
                  <div className="text-[10px] text-gray-500">Hết số</div>
                </div>
                <div className="bg-[#e5e9e5] rounded-xl py-2 px-3 text-center opacity-70">
                  <div className="font-bold text-[13px] text-slate-800">10:30 - 12:00</div>
                  <div className="text-[10px] text-gray-500">Hết số</div>
                </div>
                <div
                  onClick={() => handleSelectSlot('BS. CKI Lê Thị Mai Chi', '14:00 - 15:30', selectedDate, selectedBranch.name, 'TƯ VẤN & KHÁM DA TẠI CLINIC')}
                  className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex items-center justify-center font-extrabold text-[13px]"
                >
                  14:00 - 15:30
                </div>
                <div
                  onClick={() => handleSelectSlot('BS. CKI Lê Thị Mai Chi', '15:30 - 17:00', selectedDate, selectedBranch.name, 'TƯ VẤN & KHÁM DA TẠI CLINIC')}
                  className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex items-center justify-center font-extrabold text-[13px]"
                >
                  15:30 - 17:00
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 11. BY_DATE_1: ĐẶT LỊCH THEO NGÀY                               */}
      {/* ============================================================== */}
      {step === 'by_date_1' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('initial_1')}
                className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                <span>Đặt lịch theo ngày</span>
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

          <div className="flex-1 overflow-y-auto p-4 pt-4 pb-24 scroll-smooth space-y-4">
            {/* Calendar */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100">
              <div className="flex items-center justify-between mb-5 px-3">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={calendarYear === 2026 && calendarMonth <= 10}
                  className={`w-9 h-9 rounded-full bg-[#105e3f] text-white flex items-center justify-center transition-all ${
                    calendarYear === 2026 && calendarMonth <= 10 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#0c4a31] cursor-pointer shadow-xs'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.8]" />
                </button>
                <h3 className="font-extrabold text-[17px] text-[#105e3f]">
                  Tháng {calendarMonth} - {calendarYear}
                </h3>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="w-9 h-9 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white flex items-center justify-center cursor-pointer shadow-xs transition-all"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.8]" />
                </button>
              </div>

              <div className="grid grid-cols-7 text-center font-bold text-[15px] mb-2.5">
                <span className="text-[#ea580c]">Su</span>
                <span className="text-[#0284c7]">Mo</span>
                <span className="text-[#0284c7]">Tu</span>
                <span className="text-[#0284c7]">We</span>
                <span className="text-[#0284c7]">Th</span>
                <span className="text-[#0284c7]">Fr</span>
                <span className="text-[#0284c7]">Sa</span>
              </div>

              <div className="grid grid-cols-7 text-center gap-y-2.5 font-medium text-[15px]">
                {(() => {
                  const firstDayIndex = new Date(calendarYear, calendarMonth - 1, 1).getDay();
                  const daysInMonth = new Date(calendarYear, calendarMonth, 0).getDate();
                  const blanks = Array.from({ length: firstDayIndex }, (_, i) => (
                    <span key={`blank-date-${i}`} />
                  ));
                  const dayCells = Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const dayStr = `${String(day).padStart(2, '0')}/${String(calendarMonth).padStart(2, '0')}/${calendarYear}`;
                    const isSelected = selectedDate === dayStr;
                    const dayOfWeek = (firstDayIndex + day - 1) % 7;
                    const isSun = dayOfWeek === 0;
                    const selectable = isDaySelectable(day, calendarMonth, calendarYear);
                    return (
                      <div
                        key={day}
                        onClick={() => {
                          if (selectable) setSelectedDate(dayStr);
                        }}
                        className={`py-1 flex items-center justify-center ${selectable ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <span className={`w-8 h-8 rounded-full font-bold flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'bg-[#105e3f] text-white scale-105 shadow-xs' 
                            : (selectable 
                                ? 'bg-emerald-100 text-[#105e3f] hover:bg-emerald-200' 
                                : (isSun ? 'text-[#ea580c] opacity-50' : 'text-[#0284c7] opacity-50'))
                        }`}>
                          {day}
                        </span>
                      </div>
                    );
                  });
                  return [...blanks, ...dayCells];
                })()}
              </div>
            </div>

            {/* Banner: Tự động sắp xếp chuyên viên / bác sĩ */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#105e3f] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-extrabold text-[13.5px] text-[#105e3f]">
                      Tự động chỉ định người tư vấn
                    </h5>
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      0đ Miễn phí
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-700 mt-1 leading-snug">
                    Hệ thống sẽ tự động chỉ định ngẫu nhiên Bác sĩ Da liễu hoặc Chuyên viên tư vấn Hasaki có lịch trực phù hợp vào ngày <strong className="text-[#105e3f]">{selectedDate}</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Khung giờ khám theo ngày (Không chọn bác sĩ, bấm giờ sẽ tự động gán ngẫu nhiên) */}
            <div className="space-y-3.5">
              {/* Buổi sáng */}
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-extrabold text-[14px] text-[#105e3f] flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Buổi sáng ({selectedDate})</span>
                  </h5>
                  <span className="text-[11px] text-gray-500 font-medium">Bấm giờ để đặt</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#e5e9e5] rounded-xl py-2.5 px-3 text-center opacity-70">
                    <div className="font-bold text-[13px] text-slate-800 leading-tight">08:30 - 09:30</div>
                    <div className="text-[10px] text-gray-500 font-medium">Hết số</div>
                  </div>
                  
                  <div
                    onClick={() => handleSelectDateRandomSlot('09:30 - 10:30')}
                    className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex flex-col items-center justify-center font-extrabold text-[13px]"
                  >
                    <span>09:30 - 10:30</span>
                    <span className="text-[10px] font-normal text-emerald-100">Còn chỗ • 0đ</span>
                  </div>

                  <div
                    onClick={() => handleSelectDateRandomSlot('10:30 - 11:30')}
                    className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex flex-col items-center justify-center font-extrabold text-[13px]"
                  >
                    <span>10:30 - 11:30</span>
                    <span className="text-[10px] font-normal text-emerald-100">Còn chỗ • 0đ</span>
                  </div>

                  <div
                    onClick={() => handleSelectDateRandomSlot('11:30 - 12:00')}
                    className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex flex-col items-center justify-center font-extrabold text-[13px]"
                  >
                    <span>11:30 - 12:00</span>
                    <span className="text-[10px] font-normal text-emerald-100">Còn chỗ • 0đ</span>
                  </div>
                </div>
              </div>

              {/* Buổi chiều */}
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-extrabold text-[14px] text-[#105e3f] flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Buổi chiều ({selectedDate})</span>
                  </h5>
                  <span className="text-[11px] text-gray-500 font-medium">Bấm giờ để đặt</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#e5e9e5] rounded-xl py-2.5 px-3 text-center opacity-70">
                    <div className="font-bold text-[13px] text-slate-800 leading-tight">13:30 - 14:30</div>
                    <div className="text-[10px] text-gray-500 font-medium">Hết số</div>
                  </div>
                  
                  <div
                    onClick={() => handleSelectDateRandomSlot('14:30 - 15:30')}
                    className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex flex-col items-center justify-center font-extrabold text-[13px]"
                  >
                    <span>14:30 - 15:30</span>
                    <span className="text-[10px] font-normal text-emerald-100">Còn chỗ • 0đ</span>
                  </div>

                  <div
                    onClick={() => handleSelectDateRandomSlot('15:30 - 16:30')}
                    className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex flex-col items-center justify-center font-extrabold text-[13px]"
                  >
                    <span>15:30 - 16:30</span>
                    <span className="text-[10px] font-normal text-emerald-100">Còn chỗ • 0đ</span>
                  </div>

                  <div
                    onClick={() => handleSelectDateRandomSlot('16:30 - 17:30')}
                    className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-2.5 px-3 text-center cursor-pointer shadow-xs transition-all flex flex-col items-center justify-center font-extrabold text-[13px]"
                  >
                    <span>16:30 - 17:30</span>
                    <span className="text-[10px] font-normal text-emerald-100">Còn chỗ • 0đ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 12. BY_DOCTOR_1: CHỌN CHUYÊN VIÊN / BÁC SĨ (Hình 1)            */}
      {/* ============================================================== */}
      {step === 'by_doctor_1' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#eff4ef]">
          <div className="flex-shrink-0 bg-white shadow-xs z-10">
            <div className="px-5 pt-3 pb-2.5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('initial_1')}
                  className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                  <span>Chọn chuyên viên/bác sĩ</span>
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

            {/* Search Bar */}
            <div className="px-4 pb-2">
              <div className="relative flex items-center bg-[#f4f6f4] rounded-full border border-gray-300 px-4 py-2 shadow-xs focus-within:border-[#105e3f] focus-within:bg-white">
                <Search className="w-4 h-4 text-gray-500 mr-2.5 flex-shrink-0" />
                <input
                  type="text"
                  value={doctorSearch}
                  onChange={(e) => setDoctorSearch(e.target.value)}
                  placeholder="Tìm kiếm chuyên viên/bác sĩ"
                  className="w-full text-[13px] bg-transparent outline-none text-slate-800 placeholder-gray-400 font-medium"
                />
                <Mic className="w-4 h-4 text-gray-500 ml-2 cursor-pointer flex-shrink-0" />
              </div>
            </div>

            {/* Filter Pills with Dropdown Chevrons */}
            <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto scrollbar-none">
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-300 text-[11.5px] font-medium text-slate-700 shadow-2xs hover:border-[#105e3f] cursor-pointer whitespace-nowrap"
              >
                <span>Chi nhánh</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-300 text-[11.5px] font-medium text-slate-700 shadow-2xs hover:border-[#105e3f] cursor-pointer whitespace-nowrap"
              >
                <span>Thứ trong tuần</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-300 text-[11.5px] font-medium text-slate-700 shadow-2xs hover:border-[#105e3f] cursor-pointer whitespace-nowrap"
              >
                <span>Buổi khám</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-24 scroll-smooth">
            {doctorsList.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-[15px] text-[#105e3f] leading-snug">
                      {doc.name}
                    </h4>
                    <div className="mt-1">
                      <span className="inline-block bg-[#e5e5e5] text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-full">
                        {doc.gender}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleViewDoctorProfile(doc.id, 'by_doctor_1')}
                      className="inline-flex items-center gap-1 bg-[#b6c7bf] hover:bg-[#a5b8af] text-slate-900 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1.5 transition-colors cursor-pointer"
                    >
                      <span>{doc.type === 'doctor' ? 'Thông tin bác sĩ' : 'Thông tin chuyên viên'}</span>
                      <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                <div className="border-b border-dashed border-gray-300 my-2.5" />

                <div className="space-y-1.5 text-[11.5px]">
                  <div className="flex items-start justify-between">
                    <span className="text-slate-600 font-medium">
                      {doc.type === 'doctor' ? 'Chuyên khoa:' : 'Chuyên môn:'}
                    </span>
                    <div className="text-right">
                      <div className="font-extrabold text-slate-900 tracking-wide">
                        {doc.specialty}
                      </div>
                      <div
                        onClick={() => handleViewDoctorProfile(doc.id, 'by_doctor_1')}
                        className="text-[10px] text-gray-500 italic hover:underline cursor-pointer"
                      >
                        Xem thông tin dịch vụ &gt;
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">
                      {doc.type === 'doctor' ? 'Giá khám:' : 'Giá tư vấn:'}
                    </span>
                    <span className="font-extrabold text-slate-900">
                      {doc.price}
                    </span>
                  </div>

                  <div className="flex items-start justify-between pt-1">
                    <span className="text-slate-600 font-medium pt-1">
                      {doc.type === 'doctor' ? 'Buổi khám:' : 'Buổi tư vấn:'}
                    </span>
                    <div className="space-y-1.5">
                      {doc.sessions.map((sess, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-3 justify-end">
                          <span className="text-slate-800 font-medium">{sess.label}</span>
                          <button
                            type="button"
                            onClick={() => handleChooseDoctorSession(doc.id, sess)}
                            className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white px-3.5 py-0.5 rounded-full text-[11px] font-bold shadow-2xs transition-all cursor-pointer"
                          >
                            Chọn
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 13. BY_DOCTOR_2: CHỌN NGÀY THĂM KHÁM (Hình 2)                   */}
      {/* ============================================================== */}
      {step === 'by_doctor_2' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#eff4ef]">
          {(() => {
            const currentDoc = doctorsData[selectedDoctorKey] || doctorsData.minh;
            return (
              <>
                <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('by_doctor_1')}
                      className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                      <span>Chọn ngày thăm khám</span>
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

                <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scroll-smooth">
                  {/* Doctor Banner Card */}
                  <div className="bg-[#789382] rounded-2xl p-3 flex items-center gap-3.5 shadow-xs">
                    <div className="w-14 h-14 bg-white rounded-xl overflow-hidden p-0.5 flex items-center justify-center shadow-xs flex-shrink-0">
                      <img
                        src={currentDoc.avatar}
                        alt={currentDoc.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-slate-900">
                      <h4 className="font-extrabold text-[15px] leading-snug text-slate-900">
                        {currentDoc.name}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-900 tracking-wide uppercase mt-0.5">
                        {currentDoc.type === 'doctor' ? 'CHUYÊN KHOA DA LIỄU' : 'CHUYÊN VIÊN TƯ VẤN DA'} • {selectedSession || 'Sáng Thứ 6'}
                      </p>
                    </div>
                  </div>

                  {/* Calendar Container */}
                  <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100">
                    <div className="flex items-center justify-between mb-4 px-3">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={calendarYear === 2026 && calendarMonth <= 10}
                        className={`w-9 h-9 rounded-full bg-[#105e3f] text-white flex items-center justify-center transition-all shadow-xs ${
                          calendarYear === 2026 && calendarMonth <= 10 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#0c4a31] cursor-pointer'
                        }`}
                      >
                        <ChevronLeft className="w-5 h-5 stroke-[2.8]" />
                      </button>
                      <h3 className="font-extrabold text-[18px] text-[#105e3f]">
                        Tháng {calendarMonth} - {calendarYear}
                      </h3>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-9 h-9 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white flex items-center justify-center cursor-pointer shadow-xs transition-all"
                      >
                        <ChevronRight className="w-5 h-5 stroke-[2.8]" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 text-center font-bold text-[18px] mb-3">
                      <span className="text-[#ea580c]">Su</span>
                      <span className="text-[#0284c7]">Mo</span>
                      <span className="text-[#0284c7]">Tu</span>
                      <span className="text-[#0284c7]">We</span>
                      <span className="text-[#0284c7]">Th</span>
                      <span className="text-[#0284c7]">Fr</span>
                      <span className="text-[#0284c7]">Sa</span>
                    </div>

                    <div className="grid grid-cols-7 text-center gap-y-3 font-medium text-[16px]">
                      {(() => {
                        const firstDayIndex = new Date(calendarYear, calendarMonth - 1, 1).getDay();
                        const daysInMonth = new Date(calendarYear, calendarMonth, 0).getDate();
                        const blanks = Array.from({ length: firstDayIndex }, (_, i) => (
                          <span key={`blank-doc-${i}`} />
                        ));
                        const dayCells = Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                          const dayStr = `${String(day).padStart(2, '0')}/${String(calendarMonth).padStart(2, '0')}/${calendarYear}`;
                          const isSunday = (firstDayIndex + day - 1) % 7 === 0;
                          const selectable = isDaySelectable(day, calendarMonth, calendarYear);

                          if (selectable) {
                            return (
                              <div
                                key={day}
                                onClick={() => {
                                  setSelectedDate(dayStr);
                                  setStep('by_doctor_3');
                                }}
                                className="py-1 cursor-pointer flex items-center justify-center"
                              >
                                <span className="w-8 h-8 rounded-full font-bold flex items-center justify-center transition-all bg-[#105e3f] hover:bg-[#0c4a31] text-white shadow-xs active:scale-95">
                                  {day}
                                </span>
                              </div>
                            );
                          }

                          return (
                            <div key={day} className="py-1 flex items-center justify-center">
                              <span className={`w-8 h-8 flex items-center justify-center font-medium opacity-50 ${isSunday ? 'text-[#ea580c]' : 'text-[#0284c7]'}`}>
                                {day}
                              </span>
                            </div>
                          );
                        });
                        return [...blanks, ...dayCells];
                      })()}
                    </div>

                    {/* Instruction Box */}
                    <div className="bg-[#e9eee9] rounded-xl p-3 border-l-4 border-[#105e3f] mt-5">
                      <p className="text-[12.5px] text-slate-800 font-medium">
                        Chọn ngày có <span className="text-[#105e3f] font-bold">màu xanh lá</span> để đặt khám.
                      </p>
                    </div>

                    {/* Legend */}
                    <div className="space-y-2 mt-4 px-1">
                      <div className="flex items-center gap-2.5 text-[12px] text-slate-700 font-medium">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#105e3f] inline-block flex-shrink-0" />
                        <span>Ngày có thể chọn</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[12px] text-slate-700 font-medium">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#8e9093] inline-block flex-shrink-0" />
                        <span>Ngày không chọn</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[12px] text-slate-700 font-medium">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] inline-block flex-shrink-0" />
                        <span>Ngày Lễ, Tết</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ============================================================== */}
      {/* 13b. BY_DOCTOR_3: CHỌN KHUNG GIỜ THĂM KHÁM (Hình 3)             */}
      {/* ============================================================== */}
      {step === 'by_doctor_3' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#eff4ef]">
          {(() => {
            const currentDoc = doctorsData[selectedDoctorKey] || doctorsData.minh;
            return (
              <>
                <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('by_doctor_2')}
                      className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                      <span>Chọn khung giờ thăm khám</span>
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

                <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24 scroll-smooth">
                  {/* Subheader */}
                  <div className="px-1 pt-1 pb-1">
                    <div className="font-extrabold text-[13.5px] text-slate-900 border-l-2 border-slate-900 pl-2 uppercase tracking-wide">
                      CHỌN KHUNG GIỜ THĂM KHÁM
                    </div>
                    <p className="text-[11px] text-gray-600 italic pl-2.5 mt-0.5">
                      Vui lòng bấm chọn khung giờ màu xanh lá để đặt lịch thăm khám
                    </p>
                  </div>

                  {/* Main Card */}
                  <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100">
                    {/* Doctor Top Row */}
                    <div className="flex items-start gap-3.5">
                      <img
                        src={currentDoc.avatar}
                        alt={currentDoc.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-[15.5px] text-[#105e3f] leading-snug">
                          {currentDoc.name}
                        </h4>
                        <p className="text-[11.5px] text-gray-500 italic mt-0.5">
                          {currentDoc.branch || 'Chi nhánh Quận 7'}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleViewDoctorProfile(currentDoc.id, 'by_doctor_3')}
                          className="inline-flex items-center gap-1 bg-[#b6c7bf] hover:bg-[#a5b8af] text-slate-900 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1.5 transition-colors cursor-pointer"
                        >
                          <span>{currentDoc.type === 'doctor' ? 'Thông tin bác sĩ' : 'Thông tin chuyên viên'}</span>
                          <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>

                    <div className="border-b border-dashed border-gray-300 my-3.5" />

                    {/* Horizontal Date Slider */}
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                      {(() => {
                        const defaultDates = [
                          '30/10/2026',
                          '06/11/2026',
                          '13/11/2026',
                          '20/11/2026',
                          '27/11/2026',
                          '29/11/2026'
                        ];
                        let dates = [...defaultDates];
                        if (selectedDate && !dates.includes(selectedDate)) {
                          dates.push(selectedDate);
                          dates.sort((a, b) => {
                            const [d1, m1, y1] = a.split('/').map(Number);
                            const [d2, m2, y2] = b.split('/').map(Number);
                            return new Date(y1, m1 - 1, d1) - new Date(y2, m2 - 1, d2);
                          });
                        }
                        return dates.map((dStr, idx) => {
                          const [day, month, year] = dStr.split('/');
                          const isSelected = selectedDate === dStr;
                          return (
                            <div
                              key={idx}
                              onClick={() => setSelectedDate(dStr)}
                              className={`relative flex-shrink-0 w-[58px] py-2.5 rounded-2xl text-center cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-[#105e3f] text-white shadow-xs'
                                  : 'bg-[#e5ebe5] text-slate-800 hover:bg-[#dce3dc]'
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white text-[#105e3f] flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 stroke-[4]" />
                                </div>
                              )}
                              <div className="font-extrabold text-[12.5px] leading-tight">{`${day}/${month}`}</div>
                              <div className="text-[10px] font-medium leading-tight mt-0.5 opacity-90">{year}</div>
                            </div>
                          );
                        });
                      })()}
                    </div>

                    {/* Time Slots Section */}
                    <h5 className="font-extrabold text-[14px] text-[#105e3f] mt-5 mb-3">
                      {selectedDate || '30/10/2026'} - Buổi sáng ({getVietnameseDayOfWeek(selectedDate || '30/10/2026')})
                    </h5>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-[#e5ebe5] rounded-xl py-2 px-3 text-center opacity-75">
                        <div className="font-bold text-[13px] text-slate-800 leading-tight">08:30 - 09:30</div>
                        <div className="text-[10px] text-gray-500 font-medium">Hết số</div>
                      </div>

                      <div className="bg-[#e5ebe5] rounded-xl py-2 px-3 text-center opacity-75">
                        <div className="font-bold text-[13px] text-slate-800 leading-tight">09:30 - 10:30</div>
                        <div className="text-[10px] text-gray-500 font-medium">Hết số</div>
                      </div>

                      <div className="bg-[#e5ebe5] rounded-xl py-2 px-3 text-center opacity-75">
                        <div className="font-bold text-[13px] text-slate-800 leading-tight">10:30 - 11:30</div>
                        <div className="text-[10px] text-gray-500 font-medium">Hết số</div>
                      </div>

                      <div
                        onClick={() => handleSelectDoctorFinalSlot('11:30 - 12:30')}
                        className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-3 px-3 text-center cursor-pointer shadow-xs transition-all flex items-center justify-center font-extrabold text-[13px]"
                      >
                        11:30 - 12:30
                      </div>

                      <div
                        onClick={() => handleSelectDoctorFinalSlot('12:30 - 13:30')}
                        className="bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 text-white rounded-xl py-3 px-3 text-center cursor-pointer shadow-xs transition-all flex items-center justify-center font-extrabold text-[13px]"
                      >
                        12:30 - 13:30
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ============================================================== */}
      {/* 14. DOCTOR_PROFILE: HỒ SƠ CHI TIẾT BÁC SĨ                      */}
      {/* ============================================================== */}
      {step === 'doctor_profile' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {(() => {
            const doc = doctorsData[selectedDoctorKey] || doctorsData.minh;
            return (
              <>
                <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-[#105e3f] text-white shadow-xs z-10">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(doctorProfileReturnStep || 'by_doctor_1')}
                      className="flex items-center gap-2.5 text-white font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                      <span>Hồ sơ Bác sĩ Hasaki</span>
                    </button>

                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="text-white hover:opacity-80 transition-opacity p-1 cursor-pointer"
                      aria-label="Trang chủ"
                    >
                      <Home className="w-6 h-6 stroke-[2.4]" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-28 scroll-smooth">
                  {/* Doctor Profile Top Card */}
                  <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex items-start gap-3.5">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#105e3f]/20 flex-shrink-0 shadow-xs"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#e8ede8] text-[#105e3f] font-extrabold text-[13px] mb-1 leading-snug">
                        {doc.name}
                      </div>
                      <p className="text-[11.5px] italic text-gray-600 font-medium mb-1.5">
                        {doc.subtitle}
                      </p>
                      <div className="text-[11px] text-slate-700 space-y-0.5 leading-snug">
                        <div><span className="font-semibold text-slate-900">Giới tính:</span> {doc.gender}</div>
                        <div><span className="font-semibold text-slate-900">Kinh nghiệm:</span> {doc.experience}</div>
                        <div><span className="font-semibold text-slate-900">Cơ sở:</span> {doc.branch}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 1: Lịch khám */}
                  <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                    <div onClick={() => toggleCard('lich')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                      <span>Lịch khám & tư vấn</span>
                      <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.lich ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                    </div>
                    {cardExpanded.lich && (
                      <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1">
                        <div>• Lịch trực: {doc.schedule}</div>
                        <div>• Địa điểm: {doc.branch}</div>
                        <div>• Chi phí khám: <span className="text-[#105e3f] font-bold">Miễn phí 0đ</span></div>
                      </div>
                    )}
                  </div>

                  {/* Card 2: Quá trình đào tạo */}
                  <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                    <div onClick={() => toggleCard('daoTao')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                      <span>Quá trình đào tạo</span>
                      <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.daoTao ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                    </div>
                    {cardExpanded.daoTao && (
                      <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1.5">
                        {doc.education.map((edu, idx) => (
                          <div key={idx}>• {edu}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card 3: Quá trình công tác */}
                  <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                    <div onClick={() => toggleCard('congTac')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                      <span>Quá trình công tác</span>
                      <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.congTac ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                    </div>
                    {cardExpanded.congTac && (
                      <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1">
                        <div className="font-bold text-slate-900 underline mb-1">Kinh nghiệm chuyên môn</div>
                        {doc.career.map((car, idx) => (
                          <div key={idx}>• {car}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card 4: Chuyên môn */}
                  <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                    <div onClick={() => toggleCard('chuyenMon')} className="bg-[#105e3f] text-white font-bold text-[14px] px-4 py-2.5 flex items-center justify-between cursor-pointer">
                      <span>Chuyên môn & Kỹ thuật</span>
                      <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{cardExpanded.chuyenMon ? 'Thu gọn ▲' : 'Xem thêm ▼'}</span>
                    </div>
                    {cardExpanded.chuyenMon && (
                      <div className="bg-white p-3.5 px-4 text-[12.5px] text-slate-700 space-y-1">
                        {doc.skills.map((sk, idx) => (
                          <div key={idx}>• {sk}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 pb-6">
                    <button
                      type="button"
                      onClick={() => setStep('by_doctor_2')}
                      className="w-full py-3.5 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[14px] shadow-sm transition-all cursor-pointer text-center"
                    >
                      Chọn ngày & khung giờ khám với {doc.name}
                    </button>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ============================================================== */}
      {/* 15. CONFIRM_STEP_1: CHỌN THÔNG TIN TƯ VẤN (Hình 1)             */}
      {/* ============================================================== */}
      {step === 'confirm_step_1' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#eff4ef]">
          <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('store_flow_4')}
                className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                <span>Chọn thông tin tư vấn</span>
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

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-6 scroll-smooth">
            {/* Card 1: Selected Information with Green Checkmarks */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 divide-y divide-dashed divide-gray-300">
              {/* Row 1: Chi nhánh */}
              <div className="pb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <MapPin className="w-5 h-5 stroke-[2.4]" />
                  </div>
                  <div>
                    <div className="text-[12px] text-slate-600 font-medium">Chi nhánh</div>
                    <div className="font-extrabold text-[15px] text-[#105e3f] leading-snug">
                      {currentBooking.branch}
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#16a34a] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <Check className="w-4 h-4 stroke-[3.5]" />
                </div>
              </div>

              {/* Row 2: Ngày tư vấn */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <Calendar className="w-5 h-5 stroke-[2.4]" />
                  </div>
                  <div>
                    <div className="text-[12px] text-slate-600 font-medium">Ngày tư vấn</div>
                    <div className="font-extrabold text-[15px] text-[#105e3f] leading-snug">
                      {currentBooking.date}
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#16a34a] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <Check className="w-4 h-4 stroke-[3.5]" />
                </div>
              </div>

              {/* Row 3: Giờ tư vấn */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <Clock className="w-5 h-5 stroke-[2.4]" />
                  </div>
                  <div>
                    <div className="text-[12px] text-slate-600 font-medium">Giờ tư vấn</div>
                    <div className="font-extrabold text-[15px] text-[#105e3f] leading-snug">
                      {currentBooking.time}
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#16a34a] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <Check className="w-4 h-4 stroke-[3.5]" />
                </div>
              </div>

              {/* Row 4: Chuyên viên tư vấn / Bác sĩ */}
              <div className="pt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                    <Stethoscope className="w-5 h-5 stroke-[2.4]" />
                  </div>
                  <div>
                    <div className="text-[12px] text-slate-600 font-medium">
                      {currentBooking.consultant.includes('BS.') ? 'Bác sĩ phụ trách' : 'Chuyên viên tư vấn'}
                    </div>
                    <div className="font-extrabold text-[15px] text-[#105e3f] leading-snug">
                      {currentBooking.consultant}
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#16a34a] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <Check className="w-4 h-4 stroke-[3.5]" />
                </div>
              </div>
            </div>

            {/* Card 2: Voucher / Mã giảm giá toggle */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex items-center justify-between">
              <span className="font-extrabold text-[14px] text-[#105e3f]">
                Voucher/Mã giảm giá
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentBooking(prev => ({ ...prev, hasVoucher: true }))}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    currentBooking.hasVoucher ? 'bg-[#105e3f] text-white' : 'bg-[#bcbec0] text-slate-800'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full border border-slate-700 flex items-center justify-center ${currentBooking.hasVoucher ? 'border-white bg-white' : ''}`}>
                    {currentBooking.hasVoucher && <span className="w-1.5 h-1.5 rounded-full bg-[#105e3f]" />}
                  </span>
                  <span>Có</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentBooking(prev => ({ ...prev, hasVoucher: false }))}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    !currentBooking.hasVoucher ? 'bg-[#bcbec0] text-slate-900' : 'bg-[#bcbec0] text-slate-800'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full border border-slate-700 flex items-center justify-center ${!currentBooking.hasVoucher ? 'bg-slate-800 border-slate-800' : ''}`}>
                    {!currentBooking.hasVoucher && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span>Không</span>
                </button>
              </div>
            </div>

            {/* Input field below Card 2 */}
            <div className="relative flex items-center bg-white rounded-full border border-gray-800 px-4 py-2.5 shadow-xs">
              <Search className="w-4.5 h-4.5 text-slate-900 mr-2.5 flex-shrink-0" />
              <input
                type="text"
                value={currentBooking.voucherCode}
                onChange={(e) => setCurrentBooking(prev => ({ ...prev, voucherCode: e.target.value }))}
                placeholder="Nhập mã giảm"
                className="w-full text-[13.5px] bg-transparent outline-none text-slate-800 placeholder-gray-500 font-medium"
              />
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="bg-white p-4 shadow-lg rounded-t-3xl border-t border-gray-100 flex-shrink-0 z-20 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep('store_flow_2')}
              className="flex-1 py-3.5 px-4 rounded-full bg-[#bcbec0] hover:bg-[#abaeaf] active:scale-98 text-slate-900 font-bold text-[14px] transition-all cursor-pointer text-center"
            >
              Thêm dịch vụ
            </button>
            <button
              type="button"
              onClick={() => setStep('confirm_step_2')}
              className="flex-1 py-3.5 px-4 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[14px] shadow-sm transition-all cursor-pointer text-center"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 16. CONFIRM_STEP_2: THÔNG TIN ĐẶT TƯ VẤN (Hình 2 - Miễn phí)    */}
      {/* ============================================================== */}
      {step === 'confirm_step_2' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#eff4ef]">
          <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('confirm_step_1')}
                className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                <span>Thông tin đặt tư vấn</span>
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

          <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-6 scroll-smooth">
            <p className="text-center text-[12.5px] text-slate-700 font-medium leading-relaxed px-2">
              Vui lòng kiểm tra thông tin đặt tư vấn bên dưới.<br />
              Hoặc “Thêm dịch vụ" mới.
            </p>

            {/* Card 1: Hồ sơ đặt tư vấn */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
              <h4 className="font-extrabold text-[15px] text-slate-900 text-center">
                Hồ sơ đặt tư vấn
              </h4>
              <div className="border-b border-dashed border-gray-300 my-2.5" />
              <div className="space-y-2 text-[13px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Họ tên</span>
                  <span className="font-extrabold text-[#105e3f] uppercase">
                    {profileName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Giới tính</span>
                  <span className="font-semibold text-slate-800">{user?.gender || 'Nam'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Điện thoại</span>
                  <span className="font-semibold text-slate-800">{user?.phone || '087654329'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Địa chỉ</span>
                  <span className="font-semibold text-slate-800">{user?.address || '123 ABC'}</span>
                </div>
              </div>
            </div>

            {/* Section: Dịch vụ đã chọn */}
            <div>
              <h4 className="font-extrabold text-[14.5px] text-[#105e3f] px-1 mb-2">
                Dịch vụ đã chọn (1)
              </h4>

              <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[15px] text-[#105e3f] tracking-tight uppercase">
                    {currentBooking.serviceType}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep('confirm_step_1')}
                    className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center p-1 hover:bg-red-600 transition-colors cursor-pointer"
                    title="Xóa dịch vụ"
                  >
                    <Trash2 className="w-3.5 h-3.5 stroke-[2.4]" />
                  </button>
                </div>

                <div className="border-b border-dashed border-gray-300 my-2.5" />

                <div className="bg-[#dfe3df] rounded-xl p-3 flex divide-x divide-gray-400 text-slate-800">
                  <div className="flex-1 pr-3">
                    <div className="text-[11px] text-slate-600 flex items-center gap-1 mb-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-700" />
                      <span>Ngày tư vấn</span>
                    </div>
                    <div className="font-extrabold text-[13px] text-slate-900">
                      {currentBooking.date}
                    </div>
                  </div>
                  <div className="flex-1 pl-3">
                    <div className="text-[11px] text-slate-600 flex items-center gap-1 mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-700" />
                      <span>Chi nhánh - Giờ tư vấn</span>
                    </div>
                    <div className="font-extrabold text-[12px] text-slate-900 leading-snug">
                      {currentBooking.time}, {currentBooking.branch}
                    </div>
                  </div>
                </div>

                <div className="bg-[#dfe3df] rounded-xl p-3 mt-2.5 text-[12.5px] space-y-1 text-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Tiền tư vấn</span>
                    <span className="font-extrabold text-emerald-700">0đ (Miễn phí)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Voucher/Mã giảm</span>
                    <span className="font-bold text-slate-900">
                      {currentBooking.hasVoucher ? (currentBooking.voucherCode || 'Đã áp dụng') : 'Không'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="bg-white p-4 shadow-lg rounded-t-3xl border-t border-gray-100 flex-shrink-0 z-20 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[13px] text-slate-700 font-medium">Tổng tiền dịch vụ</span>
              <span className="font-extrabold text-[16px] text-emerald-700">0đ (Miễn phí)</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('store_flow_2')}
                className="flex-1 py-3.5 px-4 rounded-full bg-[#bcbec0] hover:bg-[#abaeaf] active:scale-98 text-slate-900 font-bold text-[14px] transition-all cursor-pointer text-center"
              >
                Thêm dịch vụ
              </button>
              <button
                type="button"
                onClick={() => {
                  const bookingData = {
                    consultant: currentBooking.consultant,
                    time: currentBooking.time,
                    date: currentBooking.date,
                    branch: currentBooking.branch,
                    address: selectedBranch?.address || '468A Nguyễn Thị Thập, Phường Tân Quy',
                    serviceType: currentBooking.serviceType,
                    price: currentBooking.price,
                    gender: user?.gender || 'Nam',
                    customerName: profileName,
                    voucher: currentBooking.hasVoucher ? (currentBooking.voucherCode || 'Đã áp dụng voucher') : 'Không'
                  };
                  if (onBookingConfirmed) {
                    onBookingConfirmed(bookingData);
                  }
                  setBookingSuccessModal(bookingData);
                }}
                className="flex-1 py-3.5 px-4 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[14px] shadow-sm transition-all cursor-pointer text-center"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL HÌNH 2: CHỌN HÌNH THỨC ĐẶT LỊCH (Popup 4 tùy chọn)        */}
      {/* ============================================================== */}
      {showOptionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[340px] rounded-3xl p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setShowOptionModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-slate-800 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-[17px] text-[#105e3f] text-center mb-5 mt-1">
              Chọn hình thức đặt lịch
            </h3>

            <div className="space-y-3">
              {/* Option 1: Theo lịch hẹn */}
              <button
                type="button"
                onClick={() => {
                  setShowOptionModal(false);
                  setStep('initial_3');
                }}
                className="w-full py-3.5 px-4 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 stroke-[2.4]" />
                <span>Theo lịch hẹn</span>
              </button>

              {/* Option 2: Theo Cửa hàng / Clinic */}
              <button
                type="button"
                onClick={() => {
                  setShowOptionModal(false);
                  setStep('store_flow_1');
                }}
                className="w-full py-3.5 px-4 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
              >
                <Store className="w-4 h-4 stroke-[2.4]" />
                <span>Theo Cửa hàng / Clinic</span>
              </button>

              {/* Option 3: Theo ngày */}
              <button
                type="button"
                onClick={() => {
                  setShowOptionModal(false);
                  setStep('by_date_1');
                }}
                className="w-full py-3.5 px-4 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
              >
                <CalendarDays className="w-4 h-4 stroke-[2.4]" />
                <span>Theo ngày</span>
              </button>

              {/* Option 4: Theo Bác sĩ / KTV */}
              <button
                type="button"
                onClick={() => {
                  setShowOptionModal(false);
                  setStep('by_doctor_1');
                }}
                className="w-full py-3.5 px-4 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4 stroke-[2.4]" />
                <span>Theo Bác sĩ / KTV</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ĐẶT LỊCH THÀNH CÔNG                                      */}
      {/* ============================================================== */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[340px] rounded-3xl p-6 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#105e3f] flex items-center justify-center mx-auto mb-3.5 shadow-xs">
              <CheckCircle2 className="w-9 h-9 stroke-[2.4]" />
            </div>

            <h3 className="font-extrabold text-[18px] text-[#105e3f] mb-1">
              Đặt lịch tư vấn thành công!
            </h3>
            <p className="text-[12px] text-gray-500 mb-4">
              Cảm ơn quý khách đã tin tưởng Hasaki Beauty & Clinic
            </p>

            <div className="bg-[#eff4ef] rounded-2xl p-4 text-left text-[12.5px] space-y-2 mb-5">
              <div className="flex justify-between">
                <span className="text-gray-500">Khách hàng:</span>
                <span className="font-bold text-slate-900">{profileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Chuyên gia:</span>
                <span className="font-bold text-[#105e3f]">{bookingSuccessModal.consultant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Thời gian:</span>
                <span className="font-bold text-slate-900">{bookingSuccessModal.time} ({bookingSuccessModal.date})</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1">
                <span className="text-gray-500">Chi phí:</span>
                <span className="font-extrabold text-emerald-700">0đ (Miễn phí)</span>
              </div>
              <div className="flex flex-col pt-1 border-t border-gray-200">
                <span className="text-gray-500">Địa điểm:</span>
                <span className="font-bold text-slate-900">{bookingSuccessModal.branch}</span>
                <span className="text-[11px] text-gray-500">{bookingSuccessModal.address}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setBookingSuccessModal(null);
                  if (onNavigateHistory) onNavigateHistory();
                }}
                className="w-full py-3 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[13.5px] shadow-sm active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Xem lịch sử đặt lịch</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setBookingSuccessModal(null);
                  if (onNavigateInvoice) onNavigateInvoice();
                }}
                className="w-full py-3 rounded-full bg-[#eaf2ee] hover:bg-[#d8e8de] text-[#105e3f] font-bold text-[13.5px] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Receipt className="w-4 h-4" />
                <span>Xem hóa đơn dịch vụ</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setBookingSuccessModal(null);
                  onBackToHome();
                }}
                className="w-full py-2.5 rounded-full bg-transparent hover:bg-gray-100 text-gray-600 font-semibold text-[13px] active:scale-98 transition-all cursor-pointer"
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
