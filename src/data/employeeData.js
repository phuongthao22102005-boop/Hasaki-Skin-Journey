// Comprehensive Data Store for Employee Interface & Customer Data Synchronisation

export const employeeAccounts = [
  {
    id: 'emp_bs_nam',
    username: 'bs.hoainam',
    name: 'BS. CKI Vũ Hoài Nam',
    role: 'clinic_specialist', // 'clinic_specialist' | 'retail_consultant'
    roleTitle: 'Bác sĩ Chuyên khoa I Da liễu & Laser Thẩm mỹ',
    roleBadge: 'Bác sĩ Clinic',
    department: 'Hasaki Clinic & Spa - Chi nhánh Quận 7',
    avatar: '/images/doctor_nam.png',
    employeeCode: 'HSK-DOC-01',
    permissions: {
      canAccessClinicalRecords: true,
      canDiagnose: true,
      canPrescribeMedical: true,
      canAccessRetailNotes: true,
      canUpdateClinicalConclusion: true
    }
  },
  {
    id: 'emp_bs_chi',
    username: 'bs.maichi',
    name: 'BS. CKI Lê Thị Mai Chi',
    role: 'clinic_specialist',
    roleTitle: 'Bác sĩ Chuyên khoa I Da liễu & Laser Thẩm mỹ',
    roleBadge: 'Bác sĩ Clinic',
    department: 'Hasaki Clinic & Spa - Chi nhánh Tân Bình & Quận 7',
    avatar: '/images/doctor_chi.png',
    employeeCode: 'HSK-DOC-02',
    permissions: {
      canAccessClinicalRecords: true,
      canDiagnose: true,
      canPrescribeMedical: true,
      canAccessRetailNotes: true,
      canUpdateClinicalConclusion: true
    }
  },
  {
    id: 'emp_ktv_linh',
    username: 'thuylinh.retail',
    name: 'Nguyễn Thùy Linh',
    role: 'retail_consultant',
    roleTitle: 'Chuyên viên Tư vấn Da liễu Cửa hàng (Retail Skincare Consultant)',
    roleBadge: 'Tư vấn viên Retail',
    department: 'Hasaki Beauty & Store - 555 Đường 3 Tháng 2, Quận 10',
    avatar: '/images/doctor_linh.png',
    employeeCode: 'HSK-RET-08',
    permissions: {
      canAccessClinicalRecords: false, // Protected medical data
      canDiagnose: false,
      canPrescribeMedical: false,
      canAccessRetailNotes: true,
      canUpdateClinicalConclusion: false,
      canRecommendProducts: true,
      canReferToClinic: true
    }
  },
  {
    id: 'emp_ktv_tam',
    username: 'minhtam.retail',
    name: 'Trần Minh Tâm',
    role: 'retail_consultant',
    roleTitle: 'Chuyên viên Tư vấn Chăm sóc Da & Dược Mỹ phẩm',
    roleBadge: 'Tư vấn viên Retail',
    department: 'Hasaki Beauty & Store - 468A Nguyễn Thị Thập, Quận 7',
    avatar: '/images/doctor_minh.png',
    employeeCode: 'HSK-RET-12',
    permissions: {
      canAccessClinicalRecords: false,
      canDiagnose: false,
      canPrescribeMedical: false,
      canAccessRetailNotes: true,
      canUpdateClinicalConclusion: false,
      canRecommendProducts: true,
      canReferToClinic: true
    }
  }
];

// Initial shared customer profiles (Bi-directional sync with Customer Interface)
export const initialCustomerProfiles = [
  {
    id: 'HSK-221005',
    customerCode: 'HSK-221005',
    fullName: 'TRỊNH PHƯƠNG THẢO',
    gender: 'Nữ',
    birthDate: '22/10/2005',
    age: 21,
    phone: '0987 221 005',
    email: 'phuongthao.boop@gmail.com',
    cccd: '079305012899',
    country: 'Việt Nam',
    job: 'Sinh viên / Thiết kế đồ họa & Sáng tạo nội dung',
    address: 'Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. HCM',
    avatar: '/images/thao_avatar.jpg',
    membershipTier: 'VIP Platinum',
    rewardPoints: 2450,
    createdDate: '10/09/2026',
    lastVisitDate: '30/10/2026',
    primaryDoctor: 'BS. CKI Lê Thị Mai Chi',
    primaryBranch: 'Hasaki Clinic Quận 7',
    
    // Core Skin Profile (Tình trạng da)
    skinType: 'Hỗn hợp thiên dầu nhạy cảm',
    skinTypeCode: 'OILY_COMBINATION_SENSITIVE',
    fitzpatrickType: 'Type III (Da vàng châu Á)',
    skinBarrierScore: 68, // Thang 100
    moistureLevel: 42, // %
    sebumLevel: 78, // %
    pigmentationLevel: 35, // %
    sensitivityLevel: 'Mức độ 3/5 (Dễ ửng đỏ khi thay đổi thời tiết hoặc dùng acid nồng độ cao)',
    
    primaryConcerns: [
      'Mụn ẩn bít tắc vùng trán và cằm',
      'Mụn viêm đỏ khu trú 2 bên má',
      'Vết thâm đỏ sau mụn (PIE)',
      'Lỗ chân lông to vùng chữ T'
    ],
    
    currentRoutine: {
      morning: [
        'Sữa rửa mặt Cerave Foaming Facial Cleanser',
        'Nước cân bằng Klairs Supple Preparation Unscented Toner',
        'Serum La Roche-Posay Hyalu B5',
        'Kem chống nắng Anessa Perfect UV Sunscreen Mild Milk SPF 50+'
      ],
      evening: [
        'Nước tẩy trang Bioderma Sensibio H2O (nắp hồng)',
        'Sữa rửa mặt Cerave Foaming Facial Cleanser',
        'Dung dịch BHA Obagi 2% (dùng 2 lần/tuần vào thứ 3 và thứ 6)',
        'Kem dưỡng phục hồi La Roche-Posay Cicaplast Baume B5+'
      ]
    },

    activeTreatmentPackage: {
      name: 'Liệu trình Điều trị mụn Y khoa đa tầng & Phục hồi hàng rào da Skin Barrier',
      totalSessions: 5,
      completedSessions: 3,
      progressPercentage: 60,
      nextSessionDate: '15/11/2026',
      clinic: 'Hasaki Clinic Quận 7'
    },

    lifestyleFactors: {
      sleepHours: '6 - 7 tiếng / ngày (thường thức khuya sau 12h đêm)',
      waterIntake: '1.8L / ngày',
      stressLevel: 'Trung bình - Cao (đồ án đại học)',
      sunExposure: 'Thấp - làm việc trong phòng máy lạnh 8h/ngày',
      makeupFrequency: 'Trang điểm nhẹ 2-3 lần/tuần'
    },

    allergiesAndPrecautions: [
      'Kích ứng nhẹ với hương liệu nhân tạo (fragrance) nồng độ cao',
      'Không dùng cồn khô (Alcohol denat) nồng độ cao',
      'Tiền sử đỏ da sau khi peel AHA nồng độ > 30%'
    ]
  },

  {
    id: 'HSK-109283',
    customerCode: 'HSK-109283',
    fullName: 'NGUYỄN VĂN AN',
    gender: 'Nam',
    birthDate: '15/06/1998',
    age: 28,
    phone: '0912 345 678',
    email: 'vanan.nguyen98@gmail.com',
    cccd: '079198009214',
    country: 'Việt Nam',
    job: 'Kỹ sư phần mềm IT',
    address: '555 Đường 3 Tháng 2, Phường Diên Hồng, Quận 10, TP. HCM',
    avatar: '/images/doctor_nam.png',
    membershipTier: 'Gold Member',
    rewardPoints: 1200,
    createdDate: '01/10/2026',
    lastVisitDate: '28/10/2026',
    primaryDoctor: 'BS. CKI Vũ Hoài Nam',
    primaryBranch: 'Hasaki Clinic Quận 10',
    
    skinType: 'Da dầu mụn bã nhờn',
    skinTypeCode: 'OILY_ACNE_PRONE',
    fitzpatrickType: 'Type IV',
    skinBarrierScore: 54,
    moistureLevel: 31,
    sebumLevel: 88,
    pigmentationLevel: 45,
    sensitivityLevel: 'Mức độ 2/5 (Da khỏe nhưng nhiều dầu nhờn)',
    
    primaryConcerns: [
      'Mụn bọc sưng viêm quai hàm',
      'Mụn đầu đen cánh mũi',
      'Lỗ chân lông rất to',
      'Đổ dầu bóng nhờn sau 2 giờ rửa mặt'
    ],
    
    currentRoutine: {
      morning: ['Sữa rửa mặt La Roche-Posay Effaclar', 'Gel dưỡng kiềm dầu', 'KCN kiềm dầu Eucerin'],
      evening: ['Tẩy trang nước La Roche-Posay', 'Sữa rửa mặt Effaclar', 'Gel chấm mụn Klenzit C']
    },

    activeTreatmentPackage: {
      name: 'Liệu trình Lấy nhân mụn Y khoa chuẩn vô khuẩn + Chiếu ánh sáng sinh học Blue Light (3 buổi)',
      totalSessions: 3,
      completedSessions: 1,
      progressPercentage: 33,
      nextSessionDate: '05/11/2026',
      clinic: 'Hasaki Clinic Quận 10'
    },

    lifestyleFactors: {
      sleepHours: '5 - 6 tiếng / ngày',
      waterIntake: '1.2L / ngày (uống ít nước)',
      stressLevel: 'Cao (áp lực deadline dự án)',
      sunExposure: 'Thấp',
      makeupFrequency: 'Không trang điểm'
    },

    allergiesAndPrecautions: ['Chưa ghi nhận tiền sử dị ứng thuốc bôi']
  },

  {
    id: 'HSK-204918',
    customerCode: 'HSK-204918',
    fullName: 'TRẦN THU HÀ',
    gender: 'Nữ',
    birthDate: '12/03/1988',
    age: 38,
    phone: '0903 888 999',
    email: 'thuha.tran88@yahoo.com',
    cccd: '079188004123',
    country: 'Việt Nam',
    job: 'Quản lý kinh doanh bất động sản',
    address: '189 Hai Bà Trưng, Phường Võ Thị Sáu, Quận 3, TP. HCM',
    avatar: '/images/doctor_chi.png',
    membershipTier: 'VIP Diamond',
    rewardPoints: 4800,
    createdDate: '15/08/2026',
    lastVisitDate: '25/10/2026',
    primaryDoctor: 'BS. CKI Lê Thị Mai Chi',
    primaryBranch: 'Hasaki Clinic Quận 3',
    
    skinType: 'Da khô lão hóa & Nám sắc tố',
    skinTypeCode: 'DRY_PIGMENTED_AGING',
    fitzpatrickType: 'Type III',
    skinBarrierScore: 72,
    moistureLevel: 36,
    sebumLevel: 25,
    pigmentationLevel: 75,
    sensitivityLevel: 'Mức độ 2/5',
    
    primaryConcerns: [
      'Nám mảng 2 bên gò má',
      'Đốm tàn nhang lan rộng do đi nắng',
      'Nếp nhăn li ti khóe mắt và rãnh cười',
      'Da khô sần, kém đều màu'
    ],
    
    currentRoutine: {
      morning: ['Sữa rửa mặt dịu nhẹ Cetaphil', 'Serum Vitamin C Obagi 10%', 'Kem chống nắng MartiDerm The Originals'],
      evening: ['Dầu tẩy trang Shu Uemura', 'Serum Tranexamic Acid mờ nám', 'Kem chống lão hóa Retinol 0.5% Skinceuticals']
    },

    activeTreatmentPackage: {
      name: 'Liệu trình Laser Toning sắc tố + Điện di tinh chất Tranexamic Acid mờ nám (6 buổi)',
      totalSessions: 6,
      completedSessions: 4,
      progressPercentage: 66,
      nextSessionDate: '10/11/2026',
      clinic: 'Hasaki Clinic Quận 3'
    },

    lifestyleFactors: {
      sleepHours: '7 tiếng / ngày',
      waterIntake: '2.0L / ngày',
      stressLevel: 'Trung bình',
      sunExposure: 'Cao (thường xuyên di chuyển khảo sát dự án)',
      makeupFrequency: 'Hàng ngày'
    },

    allergiesAndPrecautions: ['Dị ứng với Hydroquinone nồng độ > 4%']
  },

  {
    id: 'HSK-301928',
    customerCode: 'HSK-301928',
    fullName: 'LÊ MINH KHÔI',
    gender: 'Nam',
    birthDate: '04/11/2001',
    age: 25,
    phone: '0977 112 233',
    email: 'minhkhoi.le@gmail.com',
    cccd: '079201007812',
    country: 'Việt Nam',
    job: 'Kiến trúc sư',
    address: '71 Hoàng Hoa Thám, Phường 13, Quận Tân Bình, TP. HCM',
    avatar: '/images/doctor_nam.png',
    membershipTier: 'Silver Member',
    rewardPoints: 850,
    createdDate: '05/10/2026',
    lastVisitDate: '22/10/2026',
    primaryDoctor: 'BS. CKI Vũ Hoài Nam',
    primaryBranch: 'Hasaki Clinic Tân Bình',
    
    skinType: 'Da hỗn hợp có sẹo rỗ sau mụn',
    skinTypeCode: 'COMBINATION_SCARRED',
    fitzpatrickType: 'Type IV',
    skinBarrierScore: 60,
    moistureLevel: 45,
    sebumLevel: 65,
    pigmentationLevel: 40,
    sensitivityLevel: 'Mức độ 2/5',
    
    primaryConcerns: [
      'Sẹo rỗ đáy vuông (Boxcar) và đáy nhọn (Icepick) vùng 2 má',
      'Bề mặt da gồ ghề, xơ cứng đáy sẹo',
      'Vài nốt mụn viêm rải rác'
    ],
    
    currentRoutine: {
      morning: ['Sữa rửa mặt Cosrx Low pH', 'Kem chống nắng La Roche-Posay Anthelios'],
      evening: ['Nước tẩy trang L\'Oreal', 'Sữa rửa mặt Cosrx', 'Gel phục hồi da Avene Cicalfate+']
    },

    activeTreatmentPackage: {
      name: 'Liệu trình Bóc tách đáy sẹo + Laser vi điểm Fractional CO2 tái tạo da tầng sâu (4 buổi)',
      totalSessions: 4,
      completedSessions: 1,
      progressPercentage: 25,
      nextSessionDate: '20/11/2026',
      clinic: 'Hasaki Clinic Tân Bình'
    },

    lifestyleFactors: {
      sleepHours: '6 tiếng / ngày',
      waterIntake: '1.5L / ngày',
      stressLevel: 'Cao',
      sunExposure: 'Trung bình',
      makeupFrequency: 'Không trang điểm'
    },

    allergiesAndPrecautions: ['Chưa ghi nhận dị ứng']
  }
];

// Initial shared consultation records (Treatment history across Clinic & Retail)
export const initialConsultationRecords = [
  {
    id: 'consult-rec-04',
    customerId: 'HSK-221005',
    customerName: 'TRỊNH PHƯƠNG THẢO',
    sessionNumber: 4,
    date: '30/10/2026',
    time: '09:30 - 10:45',
    type: 'clinic', // 'clinic' | 'retail'
    location: 'Hasaki Clinic & Spa Quận 7',
    room: 'Phòng Laser & Điều trị 1 - Lầu 1',
    staffId: 'emp_bs_chi',
    staffName: 'BS. CKI Lê Thị Mai Chi',
    staffRole: 'Bác sĩ Chuyên khoa I Da liễu',
    handoverFrom: 'KTV Da liễu Nguyễn Thùy Linh',
    handoverNote: 'Đã bàn giao hồ sơ buổi 3 và theo dõi phục hồi hàng rào da cho BS. CKI Lê Thị Mai Chi tiếp nhận buổi 4.',
    
    initialCondition: 'Da sau 3 buổi đã giảm 92% mụn viêm, nền da sáng đều màu hơn rõ rệt. Vùng má còn lại một số vết thâm đỏ mờ (PIE) li ti, độ ẩm biểu bì đo đạt 65%.',
    procedureDone: 'Tái khám định kỳ, vệ sinh sát khuẩn da Y khoa, điện di lạnh tinh chất Arbutin 2% mờ thâm và tiêm vi điểm Meso Cocktail HA đa tầng + B5 căng bóng phục hồi.',
    afterCondition: 'Da hơi ửng hồng nhẹ sau vi điểm Meso, các nốt sẩn đỏ dịu nhanh sau khi đắp mặt nạ lạnh tế bào gốc thực vật 15 phút. Không có phản ứng kích ứng bất thường.',
    doctorConclusions: 'Phác đồ đáp ứng xuất sắc (92% mục tiêu). Hàng rào bảo vệ da được củng cố vững chắc. Chỉ định duy trì chống nắng phổ rộng và dưỡng ẩm phục hồi ban đêm.',
    
    recommendedProducts: [
      {
        name: 'Kem dưỡng La Roche-Posay Cicaplast Baume B5+ (40ml)',
        category: 'Phục hồi da',
        reason: 'Chứa Madecassoside & Panthenol 5% giúp làm dịu tức thì các vết tiêm meso, củng cố màng lipid da.',
        usage: 'Thoa sáng và tối sau bước serum, bôi lớp mỏng đều khắp mặt.'
      },
      {
        name: 'Kem chống nắng La Roche-Posay Anthelios UVMune 400 Oil Control',
        category: 'Bảo vệ da',
        reason: 'Màng lọc Mexoryl 400 bảo vệ da tuyệt đối khỏi tia UVA bước sóng dài sau thủ thuật xâm lấn nhẹ.',
        usage: 'Thoa trước khi ra ngoài 20 phút, dặm lại sau mỗi 3-4 tiếng.'
      }
    ],

    recommendedServices: [
      {
        name: 'Buổi 5 (Tổng kết): Tái khám kiểm tra độ ẩm & Điện di tinh chất Collagen trẻ hóa da',
        date: '15/11/2026',
        clinic: 'Hasaki Clinic Quận 7'
      }
    ],

    clientFeedback: {
      submittedAt: '30/10/2026 15:45',
      symptoms: 'Da sau tiêm meso có nốt nhỏ li ti nhưng đã lặn sau 4 tiếng, da cảm giác ẩm mượt và căng bóng rất ưng ý. Không ngứa hay châm chích.',
      rating: 5,
      doctorResponse: 'BS. Chi đã phản hồi: Tình trạng hoàn toàn bình thường em nhé, tiếp tục bôi B5 và chống nắng kỹ giúp bác sĩ.'
    },

    status: 'completed'
  },

  {
    id: 'consult-rec-03',
    customerId: 'HSK-221005',
    customerName: 'TRỊNH PHƯƠNG THẢO',
    sessionNumber: 3,
    date: '15/10/2026',
    time: '14:30 - 15:45',
    type: 'clinic',
    location: 'Hasaki Clinic & Spa Quận 7',
    room: 'Phòng Chăm sóc Công nghệ cao - Lầu 1',
    staffId: 'emp_ktv_linh',
    staffName: 'KTV Da liễu Nguyễn Thùy Linh',
    staffRole: 'Kỹ thuật viên Da liễu Chuyên sâu',
    handoverFrom: 'BS. CKI Vũ Hoài Nam',
    handoverNote: 'BS. CKI Vũ Hoài Nam chỉ định thực hiện điện di lạnh phục hồi màng ẩm và Laser Toning bước sóng 1064nm mờ thâm.',
    
    initialCondition: 'Tình trạng mụn viêm đã giảm 80%, cồi mụn ẩn gom khô. Vùng má còn thâm đỏ sau mụn (PIE), da hơi khô căng sau bước peel buổi trước.',
    procedureDone: 'Xông hơi nano, lấy sạch nhân mụn vô khuẩn còn sót lại, bắn Laser Toning Q-Switched bước sóng 1064nm phân rã melanin và điện di lạnh tế bào gốc Skin Barrier.',
    afterCondition: 'Bề mặt da mịn màng, các nốt thâm mờ đi thấy rõ, da ngậm nước căng bóng tự nhiên.',
    doctorConclusions: 'Tiến độ phục hồi đạt 85%. Không xuất hiện mụn bùng phát. Bàn giao theo dõi buổi 4 với Bác sĩ Chi.',
    
    recommendedProducts: [
      {
        name: 'Serum Phục hồi Klairs Midnight Blue Youth Activating Drop',
        category: 'Serum tế bào gốc',
        reason: 'Chứa EGF và bFGF kích thích tái sinh tế bào mới, tăng sinh collagen sau laser.',
        usage: 'Dùng 3-4 giọt mỗi tối trước bước kem dưỡng.'
      }
    ],

    clientFeedback: {
      submittedAt: '16/10/2026 09:20',
      symptoms: 'Sau khi bắn laser toning về da êm dịu, không đỏ rát. Các vết thâm mờ nhanh hơn mong đợi.',
      rating: 5,
      doctorResponse: 'KTV Thùy Linh đã ghi nhận: Em duy trì routine hiện tại, tránh tẩy tế bào chết hạt trong 5 ngày tới.'
    },

    status: 'completed'
  },

  {
    id: 'consult-rec-02',
    customerId: 'HSK-221005',
    customerName: 'TRỊNH PHƯƠNG THẢO',
    sessionNumber: 2,
    date: '29/09/2026',
    time: '10:00 - 11:30',
    type: 'clinic',
    location: 'Hasaki Clinic & Spa Quận 7',
    room: 'Phòng Điều trị Da 2 - Lầu 1',
    staffId: 'emp_bs_nam',
    staffName: 'BS. CKI Vũ Hoài Nam',
    staffRole: 'Bác sĩ Chuyên khoa I Da liễu',
    handoverFrom: null,
    handoverNote: 'Bác sĩ tiếp tục điều trị liệu trình buổi 2.',
    
    initialCondition: 'Mụn viêm đã khô mài 60%, còn nhiều sợi bã nhờn cánh mũi và mụn ẩn dưới da vùng cằm.',
    procedureDone: 'Peel da sinh học BHA 20% gom cồi mụn và thông thoáng nang lông, chiếu ánh sáng sinh học Blue Light 415nm diệt khuẩn P.Acnes.',
    afterCondition: 'Da châm chích nhẹ trong 3 phút đầu peel, sau đó được trung hòa và làm mát dịu ngay bằng mặt nạ tràm trà sinh học.',
    doctorConclusions: 'Peel thành công, cồi mụn gom tốt. Bắt buộc kiêng nắng kỹ 72h đầu.',
    
    recommendedProducts: [
      {
        name: 'Dung dịch tẩy da chết hóa học Paula\'s Choice BHA 2% Liquid (30ml)',
        category: 'Tẩy tế bào chết',
        reason: 'Làm sạch sâu cổ nang lông, ngăn mụn ẩn tái phát sau liệu trình.',
        usage: 'Dùng cách ngày sau bước toner vào buổi tối.'
      }
    ],

    clientFeedback: {
      submittedAt: '30/09/2026 14:10',
      symptoms: 'Da hơi khô căng nhẹ ở khóe miệng ngày thứ 2, bôi dưỡng ẩm B5 thấy êm ngay.',
      rating: 5,
      doctorResponse: 'BS. Nam đã phản hồi: Tình trạng bong tế bào sừng chết nhẹ là bình thường em nhé.'
    },

    status: 'completed'
  },

  {
    id: 'consult-rec-01',
    customerId: 'HSK-221005',
    customerName: 'TRỊNH PHƯƠNG THẢO',
    sessionNumber: 1,
    date: '15/09/2026',
    time: '09:00 - 10:30',
    type: 'clinic',
    location: 'Hasaki Clinic & Spa Quận 7',
    room: 'Phòng Khám Bác sĩ Da liễu 1 - Lầu 1',
    staffId: 'emp_bs_nam',
    staffName: 'BS. CKI Vũ Hoài Nam',
    staffRole: 'Bác sĩ Chuyên khoa I Da liễu',
    handoverFrom: null,
    handoverNote: 'Khởi động liệu trình khám da chuyên sâu buổi đầu tiên.',
    
    initialCondition: 'Khám da ban đầu: Da dầu nhạy cảm, mụn viêm đỏ 2 bên má, mụn ẩn li ti trán và cằm, lỗ chân lông to, hàng rào bảo vệ da yếu do từng tự nặn mụn tại nhà sai cách.',
    procedureDone: 'Soi da đa tầng máy VISIA, khám chẩn đoán bệnh lý da, lấy nhân mụn vô khuẩn chuẩn Y khoa 100%, sát khuẩn điện tím ozone, đắp mặt nạ bạc hà kháng khuẩn.',
    afterCondition: 'Nền da thông thoáng, các ổ viêm được dẫn lưu mủ an toàn, không để lại vết thâm bầm.',
    doctorConclusions: 'Chỉ định phác đồ 5 buổi kết hợp: Lấy nhân mụn -> Peel sinh học -> Laser Toning mờ thâm -> Meso HA căng bóng.',
    
    recommendedProducts: [
      {
        name: 'Sữa rửa mặt Cerave Foaming Facial Cleanser (473ml)',
        category: 'Làm sạch dịu nhẹ',
        reason: 'Chứa 3 Ceramides thiết yếu và Niacinamide giúp làm sạch dầu thừa mà không phá vỡ màng ẩm.',
        usage: 'Dùng sáng và tối hàng ngày.'
      }
    ],

    clientFeedback: {
      submittedAt: '16/09/2026 08:00',
      symptoms: 'Da nhẹ và sạch sâu, các nốt mụn viêm bớt nhức đỏ hẳn.',
      rating: 5,
      doctorResponse: 'BS. Nam: Tiếp tục giữ vệ sinh da mặt và uống đủ 2L nước mỗi ngày.'
    },

    status: 'completed'
  },

  // Consultation at Retail Store (Cửa hàng bán lẻ)
  {
    id: 'consult-rec-retail-01',
    customerId: 'HSK-221005',
    customerName: 'TRỊNH PHƯƠNG THẢO',
    sessionNumber: 0,
    date: '05/09/2026',
    time: '16:00 - 16:30',
    type: 'retail', // Retail store consultation
    location: 'Hasaki Beauty & Store - 555 Đường 3 Tháng 2, Quận 10',
    room: 'Quầy Tư vấn Chăm sóc Da & Dược Mỹ phẩm',
    staffId: 'emp_ktv_linh',
    staffName: 'Nguyễn Thùy Linh',
    staffRole: 'Chuyên viên Tư vấn Da liễu Cửa hàng',
    handoverFrom: null,
    handoverNote: 'Khách hàng ghé mua mỹ phẩm và được đo độ ẩm da miễn phí tại máy soi da cầm tay của cửa hàng.',
    
    initialCondition: 'Khách hàng cảm thấy da hay bị đổ dầu vùng chữ T nhưng 2 bên má lại căng rát khó chịu sau khi rửa mặt. Khách đang dùng kem trộn không rõ nguồn gốc và có nhiều mụn ẩn sần sùi.',
    procedureDone: 'Đo độ ẩm và bã nhờn bằng máy đo da cầm tay. Tư vấn dừng ngay kem trộn, hướng dẫn chu trình phục hồi da cơ bản 3 bước (Làm sạch - Phục hồi B5 - Chống nắng).',
    afterCondition: 'Khách hiểu rõ tình trạng da, đồng ý ngưng kem trôi nổi và đăng ký lịch khám chuyên khoa với Bác sĩ Da liễu tại Hasaki Clinic Quận 7.',
    doctorConclusions: 'Tư vấn viên Retail đề xuất chuyển tuyến sang Hasaki Clinic để Bác sĩ Da liễu thăm khám trực tiếp do tình trạng mụn viêm có dấu hiệu bội nhiễm nhẹ.',
    
    recommendedProducts: [
      {
        name: 'Nước tẩy trang Bioderma Sensibio H2O (500ml)',
        category: 'Tẩy trang da nhạy cảm',
        reason: 'Công nghệ hạt micelle nhẹ nhàng hút sạch bụi bẩn không cần rửa lại với nước, cực kỳ an toàn cho da mụn.',
        usage: 'Thấm ra bông tẩy trang lau sạch mặt vào mỗi buổi tối.'
      },
      {
        name: 'Kem dưỡng phục hồi da La Roche-Posay Cicaplast Baume B5+',
        category: 'Phục hồi màng ẩm',
        reason: 'Hỗ trợ tái tạo tế bào sau khi ngưng kem trộn gây mỏng yếu.',
        usage: 'Bôi lớp mỏng 2 lần/ngày.'
      }
    ],

    clientFeedback: {
      submittedAt: '05/09/2026 19:30',
      symptoms: 'Tư vấn viên rất nhiệt tình và chu đáo, không chèo kéo mua sắm, giải thích cặn kẽ vì sao da bị kích ứng.',
      rating: 5,
      doctorResponse: 'Chuyên viên Linh: Cảm ơn bạn Thảo đã tin tưởng Hasaki!'
    },

    status: 'completed'
  }
];

// Product & Service Knowledge Hub Data
export const knowledgeHubProducts = [
  {
    id: 'prod_b5_lrp',
    name: 'Kem Dưỡng La Roche-Posay Cicaplast Baume B5+ (40ml/100ml)',
    brand: 'La Roche-Posay (Pháp)',
    category: 'Kem dưỡng & Phục hồi da',
    targetSkin: 'Da nhạy cảm, da sau nặn mụn, sau peel, sau laser, da tổn thương do kem trộn',
    activeIngredients: [
      'Madecassoside (Chiết xuất rau má đậm đặc): Kháng viêm, làm dịu và phục hồi mô da tổn thương',
      'Panthenol 5% (Vitamin B5): Cấp ẩm sâu, giảm ngứa rát, tăng tốc độ lành thương',
      'Tribioma: Phức hợp tiền lợi khuẩn độc quyền giúp tái cân bằng hệ vi sinh trên da',
      'Kẽm & Mangan: Kháng khuẩn tự nhiên, giảm nguy cơ nhiễm trùng'
    ],
    usageGuide: 'Thoa 2 lần/ngày sau bước serum trên nền da đã làm sạch. Có thể bôi dày làm mặt nạ phục hồi khẩn cấp.',
    precautions: 'Chất kem hơi đặc, da quá nhiều dầu nên lấy lượng vừa đủ (cỡ hạt đậu) tán mỏng tránh bí tắc.',
    price: '345.000đ',
    inStock: true
  },
  {
    id: 'prod_bha_obagi',
    name: 'Dung Dịch Giảm Mụn Obagi Clenziderm MD Pore Therapy 2% BHA (148ml)',
    brand: 'Obagi Medical (Mỹ)',
    category: 'Tẩy tế bào chết hóa học',
    targetSkin: 'Da dầu mụn, mụn ẩn, mụn đầu đen, bít tắc lỗ chân lông nặng',
    activeIngredients: [
      'Salicylic Acid 2% (BHA): Thấm sâu vào lỗ chân lông hòa tan bã nhờn, làm thông thoáng nang lông',
      'Tinh chất Bạc hà (Menthol): Kháng khuẩn, làm dịu sưng tấy và tạo cảm giác the mát sảng khoái',
      'Glycerin: Giúp giảm thiểu tình trạng khô da do BHA'
    ],
    usageGuide: 'Sau khi rửa mặt, nhấn 1-2 pump ra bông tẩy trang và lau nhẹ khắp mặt, tập trung vùng chữ T. Bắt đầu với 2 lần/tuần rồi tăng dần.',
    precautions: 'Bắt buộc dùng kem chống nắng phổ rộng SPF 50+ vào ban ngày. Tránh dùng cùng lúc với Retinol nồng độ cao trong cùng một buổi tối.',
    price: '960.000đ',
    inStock: true
  },
  {
    id: 'prod_cerave_foaming',
    name: 'Sữa Rửa Mặt Cerave Foaming Facial Cleanser (473ml)',
    brand: 'Cerave (Mỹ)',
    category: 'Sữa rửa mặt tạo bọt',
    targetSkin: 'Da thường đến da dầu, da mụn nhạy cảm',
    activeIngredients: [
      '3 Ceramides thiết yếu (1, 3, 6-II): Khôi phục và duy trì hàng rào bảo vệ tự nhiên của da',
      'Hyaluronic Acid: Duy trì độ ẩm tự nhiên, không gây cảm giác khô căng kin kít',
      'Niacinamide: Làm dịu da kích ứng, kiểm soát bã nhờn'
    ],
    usageGuide: 'Lấy lượng vừa đủ, tạo bọt với nước ấm và massage nhẹ nhàng trong 60 giây, rửa sạch với nước.',
    precautions: 'Độ pH 5.5 chuẩn sinh lý, an toàn cho cả mẹ bầu và đang cho con bú.',
    price: '420.000đ',
    inStock: true
  },
  {
    id: 'prod_bioderma_pink',
    name: 'Nước Tẩy Trang Bioderma Sensibio H2O (500ml)',
    brand: 'Bioderma (Pháp)',
    category: 'Nước tẩy trang dịu nhẹ',
    targetSkin: 'Mọi loại da, đặc biệt là da siêu nhạy cảm, da đang điều trị mụn, sau thủ thuật thẩm mỹ',
    activeIngredients: [
      'Hạt Micellar Water: Hút sạch bụi mịn PM2.5, dầu thừa và cặn makeup mà không phá vỡ lớp màng lipid',
      'Chiết xuất dưa leo: Giàu vitamin làm dịu và giảm sưng đỏ da',
      'Nước tinh khiết đạt chuẩn dược phẩm'
    ],
    usageGuide: 'Thấm đẫm bông tẩy trang, lau nhẹ nhàng từ trong ra ngoài đến khi bông trắng sạch.',
    precautions: 'Không chứa cồn, không paraben, không hương liệu nhân tạo.',
    price: '485.000đ',
    inStock: true
  },
  {
    id: 'prod_lrp_uvmune',
    name: 'Kem Chống Nắng La Roche-Posay Anthelios UVMune 400 Oil Control (50ml)',
    brand: 'La Roche-Posay (Pháp)',
    category: 'Kem chống nắng kiểm soát dầu',
    targetSkin: 'Da dầu mụn, da hỗn hợp, da sau laser/peel',
    activeIngredients: [
      'Màng lọc Mexoryl 400: Bảo vệ da khỏi tia UVA dài nguy hiểm nhất (380-400nm)',
      'Công nghệ Airlicium: Kiểm soát bã nhờn và mồ hôi suốt 12 giờ',
      'Nước khoáng La Roche-Posay: Chống oxy hóa và làm dịu da'
    ],
    usageGuide: 'Thoa 2 đốt ngón tay trước khi ra nắng 20 phút. Dặm lại sau mỗi 3 tiếng nếu hoạt động ngoài trời.',
    precautions: 'Chất sữa lỏng nhẹ thấm nhanh, lắc đều trước khi sử dụng.',
    price: '495.000đ',
    inStock: true
  }
];

export const knowledgeHubServices = [
  {
    id: 'srv_mun',
    name: 'Điều trị mụn và các vấn đề da chuẩn Y khoa',
    duration: '60 - 90 phút',
    downtime: 'Không có downtime (chỉ đỏ nhẹ 1-2 giờ sau lấy nhân)',
    steps: [
      'Bước 1: Soi da phân tích đa tầng bằng máy VISIA thế hệ mới',
      'Bước 2: Tẩy trang, rửa mặt vô khuẩn bằng dược mỹ phẩm chuẩn Y khoa',
      'Bước 3: Xông hơi thảo dược nano & hút bã nhờn chân không',
      'Bước 4: Sát khuẩn da bằng cồn đỏ Povidine loãng',
      'Bước 5: Lấy nhân mụn chuẩn vô khuẩn bằng tăm bông và kim y tế chuyên dụng (1 khách 1 bộ dụng cụ)',
      'Bước 6: Sát khuẩn điện tím Ozone diệt khuẩn triệt để',
      'Bước 7: Chiếu ánh sáng sinh học Blue Light 415nm tiêu diệt vi khuẩn P.Acnes',
      'Bước 8: Đắp mặt nạ tràm trà kháng viêm & thoa kem phục hồi da'
    ],
    targetProblems: 'Mụn viêm, mụn mủ, mụn ẩn, mụn đầu đen, bít tắc nang lông',
    contraindications: 'Da đang nhiễm herpes rộp nước, vết thương hở lớn, viêm da tiếp xúc cấp tính',
    postCare: 'Không rửa mặt nước nóng trong 24h, bôi kem phục hồi B5, chống nắng kỹ, không sờ tay lên mặt.'
  },
  {
    id: 'srv_seo',
    name: 'Điều trị sẹo và tái tạo da (Laser Fractional CO2 & Bóc tách)',
    duration: '75 - 90 phút (bao gồm ủ tê 30-40 phút)',
    downtime: '3 - 5 ngày (đóng mài li ti màu nâu nhạt, bong tự nhiên)',
    steps: [
      'Bước 1: Khám và đánh giá phân loại đáy sẹo (Icepick, Boxcar, Rolling scar)',
      'Bước 2: Ủ tê tại chỗ 40 phút với kem tê nồng độ cao',
      'Bước 3: Sát khuẩn vô trùng tuyệt đối',
      'Bước 4: Bóc tách cắt đứt đáy sẹo xơ cứng bằng kim y khoa chuyên dụng Subcision',
      'Bước 5: Bắn Laser vi điểm Fractional CO2 bước sóng 10.600nm tạo vi tổn thương kích thích collagen',
      'Bước 6: Điện di lạnh hoặc thoa tinh chất tế bào gốc tăng sinh biểu bì EGF',
      'Bước 7: Đắp mặt nạ hạ nhiệt chuyên sâu sinh học'
    ],
    targetProblems: 'Sẹo rỗ lâu năm, sẹo lõm sau mụn trứng cá, lỗ chân lông to thô ráp',
    contraindications: 'Người có cơ địa sẹo lồi, phụ nữ có thai, người đang dùng Isotretinoin trong vòng 6 tháng gần nhất',
    postCare: '72 giờ đầu chỉ rửa mặt bằng nước muối sinh lý, bôi kem phục hồi dạng mỡ/gel tế bào gốc liên tục, tránh tuyệt đối ánh nắng trực tiếp.'
  },
  {
    id: 'srv_sacto',
    name: 'Điều trị sắc tố da (Laser Toning & Điện di Tranexamic Acid)',
    duration: '60 phút',
    downtime: 'Không có downtime (da chỉ hồng nhẹ 15-30 phút)',
    steps: [
      'Bước 1: Soi da đo chỉ số melanin tầng biểu bì và trung bì',
      'Bước 2: Làm sạch sâu và tẩy da chết enzym sinh học',
      'Bước 3: Bắn Laser Q-Switched Nd:YAG bước sóng 1064nm công nghệ Toning phá vỡ hắc sắc tố',
      'Bước 4: Điện di lạnh tinh chất Tranexamic Acid 3% và Arbutin ức chế enzym Tyrosinase',
      'Bước 5: Chiếu ánh sáng vàng Yellow Light làm dịu mạch máu và đều màu da',
      'Bước 6: Khóa ẩm bằng kem phục hồi & chống nắng'
    ],
    targetProblems: 'Nám mảng, nám chân sâu, tàn nhang, đốm nâu đồi mồi, thâm mụn PIE / PIH',
    contraindications: 'Da đang cháy nắng cấp tính, phụ nữ có thai (với hoạt chất ức chế mạnh)',
    postCare: 'Bắt buộc bôi kem chống nắng SPF 50+ PA++++ mỗi ngày, thoa serum chống oxy hóa ban ngày.'
  },
  {
    id: 'srv_trehoa',
    name: 'Trẻ hóa và dưỡng sáng da (Meso Cocktail HA + B5 căng bóng)',
    duration: '60 - 75 phút (bao gồm ủ tê 30 phút)',
    downtime: '24 - 48 giờ (nốt sẩn meso nhỏ sẽ lặn hoàn toàn sau 1-2 ngày)',
    steps: [
      'Bước 1: Làm sạch da và ủ tê chuyên dụng 30 phút',
      'Bước 2: Sát trùng da chuẩn phòng mổ Y khoa',
      'Bước 3: Tiêm vi điểm Meso Cocktail HA đa tầng liên kết chéo nhẹ + Panthenol B5 + Peptides',
      'Bước 4: Điện di lạnh tinh chất tế bào gốc làm dịu và khuếch tán dưỡng chất sâu',
      'Bước 5: Chiếu ánh sáng đỏ Red Light kích thích nguyên bào sợi sản sinh elastin',
      'Bước 6: Đắp mặt nạ sinh học cấp ẩm sâu Bio-Cellulose'
    ],
    targetProblems: 'Da khô mất nước, da chùng nhão chảy xệ nhẹ, nếp nhăn li ti, da xỉn màu thiếu sức sống',
    contraindications: 'Rối loạn đông máu, nhiễm trùng da tại vị trí tiêm',
    postCare: 'Không rửa mặt trong 6 giờ đầu sau tiêm, chỉ rửa nước sạch trong 24h, bôi serum phục hồi được kê đơn.'
  }
];

export const consultationGuidelines = [
  {
    id: 'guide_acne',
    concern: 'Mụn viêm sưng & Bã nhờn quá mức',
    color: 'emerald',
    assessmentPoints: [
      'Xác định loại mụn: Mụn không viêm (đầu đen, đầu trắng) hay mụn viêm (sẩn đỏ, mụn mủ, mụn bọc nang)',
      'Hỏi kỹ thói quen làm sạch: Tẩy trang có sạch không? Rửa mặt bao nhiêu lần/ngày?',
      'Kiểm tra tình trạng hàng rào bảo vệ da: Có bị khô rát, bong tróc sau khi dùng BHA/Retinol không?'
    ],
    clinicProtocol: 'Chỉ định gói Lấy nhân mụn Y khoa + Chiếu ánh sáng Blue Light (1-2 tuần/lần). Nếu có nhiều mụn ẩn kết hợp Peel BHA 20%.',
    homecareRecommendation: 'Sữa rửa mặt Cerave Foaming + BHA Obagi 2% (2 lần/tuần) + Kem dưỡng phục hồi B5+ + Kem chấm mụn viêm + KCN kiềm dầu.',
    keyExplanation: 'Giải thích với khách hàng: Lấy nhân mụn giúp dẫn lưu ổ viêm ngăn hình thành sẹo lõm, BHA giúp giữ cổ nang lông luôn thông thoáng để mụn không tái phát.'
  },
  {
    id: 'guide_pigment',
    concern: 'Nám da, Tàn nhang & Thâm sau mụn',
    color: 'purple',
    assessmentPoints: [
      'Phân biệt thâm đỏ (PIE - giãn mao mạch) vs thâm nâu/đen (PIH - melanin tăng sinh)',
      'Xác định nám nông (thượng bì) hay nám chân sâu (trung bì)',
      'Kiểm tra thói quen bôi kem chống nắng: Đã bôi đủ lượng 2 đốt ngón tay chưa? Có dặm lại trong ngày không?'
    ],
    clinicProtocol: 'Laser Toning xung dài/ngắn kết hợp điện di lạnh Tranexamic Acid / Vitamin C. Khoảng cách giữa các buổi: 2 tuần/lần.',
    homecareRecommendation: 'Serum Niacinamide 10% + Tranexamic Acid + Kem chống nắng La Roche-Posay UVMune 400 + Serum Vitamin C ban ngày.',
    keyExplanation: 'Giải thích với khách hàng: Sắc tố melanin nằm sâu dưới da cần laser phân rã thành vi hạt để đại thực bào đào thải tự nhiên, đồng thời ức chế tế bào melanocyte không tạo thêm nám mới.'
  },
  {
    id: 'guide_sensitive',
    concern: 'Da nhiễm corticoid / Kích ứng sau kem trộn / Da mỏng yếu',
    color: 'rose',
    assessmentPoints: [
      'Hỏi tiền sử dùng kem trộn, kem bôi chứa corticoid: Dùng trong bao lâu? Có hiện tượng giãn mao mạch, ngứa râm ran không?',
      'Kiểm tra phản xạ đỏ da: Da có nóng bừng khi ra nắng hoặc rửa mặt không?',
      'Tuyệt đối KHÔNG peel hoặc dùng acid mạnh khi hàng rào da chưa phục hồi!'
    ],
    clinicProtocol: 'Liệu trình Điện di lạnh tế bào gốc phục hồi Skin Barrier + Chiếu ánh sáng sinh học làm dịu mạch máu. Không xâm lấn.',
    homecareRecommendation: 'Nước tẩy trang Bioderma hồng + Sữa rửa mặt Cetaphil + Serum B5 + Kem dưỡng phục hồi La Roche-Posay B5+ bôi dày 2-3 lần/ngày.',
    keyExplanation: 'Khuyên khách hàng kiên nhẫn phục hồi màng ẩm 4-8 tuần trước khi can thiệp bất kỳ liệu trình điều trị mụn hay nám nào khác.'
  }
];
