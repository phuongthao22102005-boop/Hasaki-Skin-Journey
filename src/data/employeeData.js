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

// 4 SIMULATED CUSTOMER PROFILES (HỒ SƠ KHÁCH HÀNG MÔ PHỎNG ĐẦY ĐỦ TRONG EMPLOYEE INTERFACE)
export const initialCustomerProfiles = [
  // =========================================================================
  // 1. HỒ SƠ CHÍNH: TRỊNH PHƯƠNG THẢO - Mụn ẩn, thâm đỏ PIE & Hỗn hợp nhạy cảm
  // =========================================================================
  {
    id: 'HSK-221005',
    customerCode: 'HSK-221005',
    name: 'TRỊNH PHƯƠNG THẢO',
    fullName: 'TRỊNH PHƯƠNG THẢO',
    gender: 'Nữ',
    dob: '22/10/2005',
    birthDate: '22/10/2005',
    age: 21,
    phone: '0987 221 005',
    email: 'phuongthao.boop@gmail.com',
    cccd: '079305012899',
    country: 'Việt Nam',
    job: 'Sinh viên / Thiết kế đồ họa & Sáng tạo nội dung',
    occupation: 'Sinh viên / Thiết kế đồ họa & Sáng tạo nội dung',
    address: 'Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. HCM',
    avatar: '/images/customer_default_avatar.png',
    tier: 'VIP Platinum',
    membershipTier: 'VIP Platinum',
    rewardPoints: 2450,
    createdDate: '10/09/2026',
    lastVisitDate: '30/10/2026',
    assignedDoctor: 'BS. CKI Lê Thị Mai Chi',
    primaryDoctor: 'BS. CKI Lê Thị Mai Chi',
    primaryBranch: 'Hasaki Clinic Quận 7',
    
    // Chỉ số da chuyên sâu Visia
    skinType: 'Da hỗn hợp thiên dầu nhạy cảm',
    skinTypeCode: 'OILY_COMBINATION_SENSITIVE',
    fitzpatrickType: 'Type III (Da vàng châu Á)',
    skinHealthScore: 78,
    skinMetrics: {
      hydration: 62,
      oilLevel: 78,
      pigmentation: 45,
      sensitivity: 35
    },
    sensitivityLevel: 'Nhẹ (Mức độ 2/5 - Dễ ửng đỏ khi thời tiết thay đổi)',
    
    primaryConcerns: [
      'Mụn ẩn bít tắc vùng trán và cằm',
      'Mụn viêm đỏ khu trú 2 bên má',
      'Vết thâm đỏ sau mụn (PIE)',
      'Lỗ chân lông to vùng T-zone'
    ],
    goals: 'Làm sạch mụn ẩn, mờ thâm đỏ và phục hồi hàng rào màng ẩm để da căng khỏe, sáng mịn tự nhiên trước Tết.',
    allergies: 'Kích ứng cồn khô nồng độ cao (Alcohol Denat), nhạy cảm với BHA > 2% nếu không cấp ẩm đủ.',
    doctorNotes: 'Da đang phục hồi rất tốt sau peel BHA buổi 2 và điện di HA. Nền da ẩm mượt, các nốt viêm khô cồi 90%. Tiếp tục duy trì dưỡng ẩm với Ceramide và chống nắng Mexoryl 400. Tránh dùng AHA/Retinoid nồng độ cao trong 7 ngày tới.',
    specialNotes: 'Khách hàng chuẩn bị bảo vệ đồ án tốt nghiệp, khuyên duy trì uống đủ nước và ngủ trước 23h.',
    lastUpdatedBy: 'BS. CKI Lê Thị Mai Chi',
    lastUpdatedAt: '30/10/2026',

    activePackage: {
      name: 'Liệu trình Điều trị mụn Y khoa đa tầng & Phục hồi hàng rào da Skin Barrier',
      totalSessions: 5,
      currentSession: 3,
      progressPercentage: 60,
      nextSessionDate: '15/11/2026',
      clinic: 'Hasaki Clinic Quận 7'
    },
    activeTreatmentPackage: {
      name: 'Liệu trình Điều trị mụn Y khoa đa tầng & Phục hồi hàng rào da Skin Barrier',
      totalSessions: 5,
      completedSessions: 3,
      currentSession: 3,
      progressPercentage: 60,
      nextSessionDate: '15/11/2026',
      clinic: 'Hasaki Clinic Quận 7'
    },

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
        'Serum Skin1004 Madagascar Centella Ampoule',
        'Kem dưỡng phục hồi La Roche-Posay Cicaplast Baume B5+'
      ]
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
    ],

    serviceHistory: [
      {
        id: 'SRV-01',
        serviceName: 'Lấy nhân mụn chuẩn Y khoa + Chiếu ánh sáng sinh học Blue Light',
        date: '15/09/2026',
        branch: 'Hasaki Clinic Quận 7',
        technician: 'KTV Trịnh Phương Linh',
        doctorCheck: 'BS. CKI Vũ Hoài Nam',
        status: 'Hoàn thành',
        outcome: 'Lấy sạch 45 cồi mụn ẩn trán & má, da ửng đỏ nhẹ 2 giờ sau giảm hẳn'
      },
      {
        id: 'SRV-02',
        serviceName: 'Peel Da BHA Salicylic 20% giảm viêm & gom cồi',
        date: '29/09/2026',
        branch: 'Hasaki Clinic Quận 7',
        technician: 'KTV Nguyễn Thùy Linh',
        doctorCheck: 'BS. CKI Vũ Hoài Nam',
        status: 'Hoàn thành',
        outcome: 'Gom cồi mụn viêm nhanh chóng, bong tróc mỏng nhẹ ngày thứ 3, không tăng sắc tố'
      },
      {
        id: 'SRV-03',
        serviceName: 'Điện di tinh chất Hyaluronic Acid & Ceramide phục hồi màng ẩm',
        date: '15/10/2026',
        branch: 'Hasaki Clinic Quận 7',
        technician: 'KTV Trần Minh Tâm',
        doctorCheck: 'BS. CKI Lê Thị Mai Chi',
        status: 'Hoàn thành',
        outcome: 'Độ ẩm da tăng vọt từ 42% lên 62%, nền da căng bóng, giảm hiện tượng khô căng'
      }
    ],

    recommendedProducts: [
      {
        name: 'Kem Dưỡng Bioderma Sébium Hydra Dành Cho Da Mụn Thiếu Nước (40ml)',
        brand: 'Bioderma',
        price: '345.000₫',
        purpose: 'Cấp ẩm sâu & phục hồi màng ẩm bị tổn thương sau lấy mụn và peel',
        clinicalReason: 'Khách hàng có hiện tượng khô tróc vùng cánh mũi sau peel BHA; công thức Fluidactiv ngăn ngừa bít tắc lỗ chân lông.',
        instructions: 'Thoa 2 lần/ngày sáng & tối sau bước serum, massage nhẹ nhàng cho thấm đều.',
        recommendedBy: 'BS. CKI Vũ Hoài Nam (Clinic Q7)'
      },
      {
        name: 'Serum Phục Hồi Skin1004 Madagascar Centella Ampoule (100ml)',
        brand: 'Skin1004',
        price: '350.000₫',
        purpose: 'Làm dịu ửng đỏ, kháng viêm và kích thích tái tạo biểu bì da',
        clinicalReason: 'Chiết xuất 100% Centella Asiatica độ tinh khiết cao, an toàn tuyệt đối cho da nhạy cảm sau thủ thuật.',
        instructions: 'Nhỏ 3-4 giọt thoa đều toàn mặt, vỗ nhẹ trước khi dùng kem dưỡng ẩm.',
        recommendedBy: 'Nguyễn Thùy Linh (Tư vấn viên Retail Q10)'
      },
      {
        name: 'Kem Chống Nắng La Roche-Posay Anthelios UVMune 400 Oil Control (50ml)',
        brand: 'La Roche-Posay',
        price: '460.000₫',
        purpose: 'Bảo vệ da chống tia UVA cực dài, ngăn ngừa thâm mụn sạm màu',
        clinicalReason: 'Bộ lọc Mexoryl 400 tiên tiến, kiềm dầu 12h, bảo vệ tuyệt đối vùng da non sau điều trị.',
        instructions: 'Bôi đủ lượng 2 ngón tay trước khi ra nắng 20 phút. Thoa lại sau mỗi 3-4 tiếng nếu ở ngoài trời.',
        recommendedBy: 'BS. CKI Lê Thị Mai Chi (Clinic Q7)'
      }
    ]
  },

  // =========================================================================
  // 2. HỒ SƠ 2: NGUYỄN VĂN AN - Mụn bọc viêm sưng quai hàm & Tuyến dầu phì đại
  // =========================================================================
  {
    id: 'HSK-109283',
    customerCode: 'HSK-109283',
    name: 'NGUYỄN VĂN AN',
    fullName: 'NGUYỄN VĂN AN',
    gender: 'Nam',
    dob: '15/06/1998',
    birthDate: '15/06/1998',
    age: 28,
    phone: '0912 345 678',
    email: 'vanan.nguyen98@gmail.com',
    cccd: '079198009214',
    country: 'Việt Nam',
    job: 'Kỹ sư phần mềm IT (Full-stack Developer)',
    occupation: 'Kỹ sư phần mềm IT (Full-stack Developer)',
    address: '555 Đường 3 Tháng 2, Phường 8, Quận 10, TP. HCM',
    avatar: '/images/customer_default_avatar.png',
    tier: 'Gold Member',
    membershipTier: 'Gold Member',
    rewardPoints: 1200,
    createdDate: '01/10/2026',
    lastVisitDate: '28/10/2026',
    assignedDoctor: 'BS. CKI Vũ Hoài Nam',
    primaryDoctor: 'BS. CKI Vũ Hoài Nam',
    primaryBranch: 'Hasaki Clinic Quận 10',
    
    skinType: 'Da dầu mụn bã nhờn nặng',
    skinTypeCode: 'OILY_ACNE_PRONE',
    fitzpatrickType: 'Type IV',
    skinHealthScore: 52,
    skinMetrics: {
      hydration: 32,
      oilLevel: 92,
      pigmentation: 50,
      sensitivity: 40
    },
    sensitivityLevel: 'Trung bình (Mụn bọc sưng đỏ nóng rát)',
    
    primaryConcerns: [
      'Mụn bọc sưng viêm góc hàm',
      'Mụn đầu đen cánh mũi',
      'Tăng tiết bã nhờn nghiêm trọng',
      'Lỗ chân lông thô to bít tắc'
    ],
    goals: 'Xẹp nhanh các ổ mụn bọc viêm đau nhức vùng quai hàm, kiềm dầu thừa cả ngày và thu nhỏ lỗ chân lông.',
    allergies: 'Chưa ghi nhận tiền sử dị ứng thuốc bôi; da dày sừng nhưng tuyến bã nhờn phì đại.',
    doctorNotes: 'Nhiều ổ viêm nang lông sâu quai hàm do cạo râu sai cách và thức khuya liên tục 2h sáng. Đã chích rạch dẫn lưu mủ ổ viêm lớn. Chỉ định bôi Klenzit C buổi tối, rửa mặt BHA 2% sáng tối và bổ sung kẽm Zinc 15mg.',
    specialNotes: 'Bệnh nhân uống rất ít nước (1.2L/ngày). Dặn dò uống tối thiểu 2.2L nước/ngày và thay vỏ gối 2 lần/tuần.',
    lastUpdatedBy: 'BS. CKI Vũ Hoài Nam',
    lastUpdatedAt: '28/10/2026',

    activePackage: {
      name: 'Liệu trình Lấy nhân mụn Y khoa Vô khuẩn + Chiếu ánh sáng sinh học Blue Light tiêu viêm',
      totalSessions: 3,
      currentSession: 1,
      progressPercentage: 33,
      nextSessionDate: '05/11/2026',
      clinic: 'Hasaki Clinic Quận 10'
    },
    activeTreatmentPackage: {
      name: 'Liệu trình Lấy nhân mụn Y khoa Vô khuẩn + Chiếu ánh sáng sinh học Blue Light tiêu viêm',
      totalSessions: 3,
      completedSessions: 1,
      currentSession: 1,
      progressPercentage: 33,
      nextSessionDate: '05/11/2026',
      clinic: 'Hasaki Clinic Quận 10'
    },

    currentRoutine: {
      morning: [
        'Sữa rửa mặt La Roche-Posay Effaclar Purifying Foaming Gel',
        'Gel dưỡng kiềm dầu SVR Sebiaclear Mat + Pores',
        'Kem chống nắng Eucerin Sun Dry Touch Oil Control SPF 50+'
      ],
      evening: [
        'Nước tẩy trang La Roche-Posay Effaclar Micellar Water Ultra',
        'Sữa rửa mặt La Roche-Posay Effaclar',
        'Gel chấm mụn kháng khuẩn Klenzit C (vùng quai hàm)',
        'Kem dưỡng ẩm kiềm dầu I\'m from Vitamin Tree Water-gel'
      ]
    },

    lifestyleFactors: {
      sleepHours: '5 - 6 tiếng / ngày (thường xuyên thức khuya fix bug)',
      waterIntake: '1.2L / ngày (uống ít nước)',
      stressLevel: 'Cao (áp lực deadline dự án)',
      sunExposure: 'Thấp (làm việc văn phòng)',
      makeupFrequency: 'Không trang điểm'
    },

    allergiesAndPrecautions: ['Chưa ghi nhận tiền sử dị ứng thuốc bôi'],

    serviceHistory: [
      {
        id: 'SRV-AN-01',
        serviceName: 'Lấy nhân mụn Y khoa vô khuẩn + Chiếu ánh sáng sinh học Blue Light',
        date: '28/10/2026',
        branch: 'Hasaki Clinic Quận 10',
        technician: 'KTV Trần Minh Tâm',
        doctorCheck: 'BS. CKI Vũ Hoài Nam',
        status: 'Hoàn thành',
        outcome: 'Lấy sạch 38 nhân mụn bọc và cồi đen, chiếu đèn Blue Light 415nm giảm viêm tức thì 60%'
      }
    ],

    recommendedProducts: [
      {
        name: 'Sữa Rửa Mặt La Roche-Posay Effaclar Purifying Foaming Gel (400ml)',
        brand: 'La Roche-Posay',
        price: '435.000₫',
        purpose: 'Làm sạch bã nhờn sâu trong lỗ chân lông, ngăn chặn vi khuẩn sinh sôi',
        clinicalReason: 'Kẽm PCA giúp kiểm soát bài tiết bã nhờn, nước khoáng La Roche-Posay làm dịu kích ứng.',
        instructions: 'Tạo bọt kỹ trên tay, massage vùng quai hàm và chữ T trong 60 giây, rửa sạch với nước mát.',
        recommendedBy: 'BS. CKI Vũ Hoài Nam (Clinic Q10)'
      },
      {
        name: 'Kem Chống Nắng Eucerin Sun Dry Touch Oil Control SPF 50+ (50ml)',
        brand: 'Eucerin',
        price: '465.000₫',
        purpose: 'Bảo vệ da chống tia cực tím, kiềm dầu ráo mịn suốt 8 giờ',
        clinicalReason: 'Công nghệ kiểm soát dầu L-Carnitine và các hạt hấp thụ lipid giúp da không bị bết rít.',
        instructions: 'Thoa 1 lượng vừa đủ trước khi ra ngoài vào mỗi buổi sáng.',
        recommendedBy: 'BS. CKI Vũ Hoài Nam (Clinic Q10)'
      }
    ]
  },

  // =========================================================================
  // 3. HỒ SƠ 3: TRẦN THU HÀ - Nám mảng đối xứng & Lão hóa sạm nám
  // =========================================================================
  {
    id: 'HSK-204918',
    customerCode: 'HSK-204918',
    name: 'TRẦN THU HÀ',
    fullName: 'TRẦN THU HÀ',
    gender: 'Nữ',
    dob: '12/03/1988',
    birthDate: '12/03/1988',
    age: 38,
    phone: '0903 888 999',
    email: 'thuha.tran88@yahoo.com',
    cccd: '079188004123',
    country: 'Việt Nam',
    job: 'Quản lý kinh doanh Bất động sản',
    occupation: 'Quản lý kinh doanh Bất động sản',
    address: '189 Hai Bà Trưng, Phường Võ Thị Sáu, Quận 3, TP. HCM',
    avatar: '/images/customer_default_avatar.png',
    tier: 'VIP Diamond',
    membershipTier: 'VIP Diamond',
    rewardPoints: 4800,
    createdDate: '15/08/2026',
    lastVisitDate: '25/10/2026',
    assignedDoctor: 'BS. CKI Lê Thị Mai Chi',
    primaryDoctor: 'BS. CKI Lê Thị Mai Chi',
    primaryBranch: 'Hasaki Clinic Quận 3',
    
    skinType: 'Da khô lão hóa & Nám sắc tố sâu',
    skinTypeCode: 'DRY_PIGMENTED_AGING',
    fitzpatrickType: 'Type III',
    skinHealthScore: 74,
    skinMetrics: {
      hydration: 38,
      oilLevel: 25,
      pigmentation: 76,
      sensitivity: 28
    },
    sensitivityLevel: 'Thấp (Da khỏe nhưng mỏng sừng và dễ sạm khi tiếp xúc nắng)',
    
    primaryConcerns: [
      'Nám mảng 2 bên gò má',
      'Đốm tàn nhang lan rộng do đi nắng',
      'Nếp nhăn li ti khóe mắt và rãnh cười',
      'Da khô sần, kém đều màu'
    ],
    goals: 'Làm mờ mảng nám chân sâu ít nhất 60-70%, xóa mờ rãnh nhăn nông và dưỡng da căng bóng tươi sáng.',
    allergies: 'Dị ứng với Hydroquinone nồng độ > 4% (từng đỏ da). Cần ưu tiên hoạt chất Tranexamic Acid & Arbutin.',
    doctorNotes: 'Vết nám mảng mờ rõ rệt khoảng 40% sau 4 buổi Laser Toning Pico kết hợp điện di Tranexamic Acid. Nền da ẩm mịn hơn. Tiếp tục duy trì chống nắng phổ rộng Mexoryl 400 và bổ sung viên uống chống oxy hóa.',
    specialNotes: 'Khách hàng thường xuyên dẫn khách xem dự án ngoài trời. Dặn mang mũ rộng vành và thoa lại KCN sau mỗi 2.5 tiếng.',
    lastUpdatedBy: 'BS. CKI Lê Thị Mai Chi',
    lastUpdatedAt: '25/10/2026',

    activePackage: {
      name: 'Liệu trình Laser Toning Sắc tố Pico + Điện di Tinh chất Tranexamic Acid mờ nám',
      totalSessions: 6,
      currentSession: 4,
      progressPercentage: 66,
      nextSessionDate: '10/11/2026',
      clinic: 'Hasaki Clinic Quận 3'
    },
    activeTreatmentPackage: {
      name: 'Liệu trình Laser Toning Sắc tố Pico + Điện di Tinh chất Tranexamic Acid mờ nám',
      totalSessions: 6,
      completedSessions: 4,
      currentSession: 4,
      progressPercentage: 66,
      nextSessionDate: '10/11/2026',
      clinic: 'Hasaki Clinic Quận 3'
    },

    currentRoutine: {
      morning: [
        'Sữa rửa mặt dịu nhẹ Cetaphil Gentle Skin Cleanser',
        'Serum Vitamin C Obagi Professional-C 10%',
        'Kem dưỡng ẩm chống lão hóa Olay Regenerist Collagen Peptide 24',
        'Kem chống nắng MartiDerm The Originals Proteos Screen SPF 50+'
      ],
      evening: [
        'Dầu tẩy trang Shu Uemura Ultime8 Sublime Beauty Cleansing Oil',
        'Sữa rửa mặt Cetaphil',
        'Serum Tranexamic Acid 5% MartiDerm Pigment Zero',
        'Kem dưỡng Retinol 0.5% Skinceuticals (2 lần/tuần)'
      ]
    },

    lifestyleFactors: {
      sleepHours: '7 tiếng / ngày',
      waterIntake: '2.0L / ngày',
      stressLevel: 'Trung bình',
      sunExposure: 'Cao (thường xuyên di chuyển khảo sát dự án)',
      makeupFrequency: 'Hàng ngày'
    },

    allergiesAndPrecautions: ['Dị ứng với Hydroquinone nồng độ > 4%'],

    serviceHistory: [
      {
        id: 'SRV-HA-01',
        serviceName: 'Laser Toning Pico xung cực ngắn phân rã sắc tố Melanin (Buổi 1)',
        date: '15/08/2026',
        branch: 'Hasaki Clinic Quận 3',
        technician: 'KTV Trịnh Phương Linh',
        doctorCheck: 'BS. CKI Lê Thị Mai Chi',
        status: 'Hoàn thành',
        outcome: 'Bắn laser phân giải hắc sắc tố, da hơi ửng hồng 30 phút sau dịu hoàn toàn'
      },
      {
        id: 'SRV-HA-02',
        serviceName: 'Điện di lạnh tinh chất Tranexamic Acid 5% + Mặt nạ mờ nám (Buổi 2)',
        date: '01/09/2026',
        branch: 'Hasaki Clinic Quận 3',
        technician: 'KTV Nguyễn Thùy Trang',
        doctorCheck: 'BS. CKI Lê Thị Mai Chi',
        status: 'Hoàn thành',
        outcome: 'Mảng nám bắt đầu nhạt màu 15%, da mềm ẩm mượt'
      },
      {
        id: 'SRV-HA-03',
        serviceName: 'Laser Toning Pico + Điện di Tế bào gốc thực vật (Buổi 3)',
        date: '20/09/2026',
        branch: 'Hasaki Clinic Quận 3',
        technician: 'KTV Nguyễn Thùy Trang',
        doctorCheck: 'BS. CKI Lê Thị Mai Chi',
        status: 'Hoàn thành',
        outcome: 'Mờ thêm 15% viền nám mảng, da đều màu hơn'
      },
      {
        id: 'SRV-HA-04',
        serviceName: 'Laser Toning Pico + Điện di Tinh chất Tranexamic Acid (Buổi 4)',
        date: '25/10/2026',
        branch: 'Hasaki Clinic Quận 3',
        technician: 'KTV Trần Minh Tâm',
        doctorCheck: 'BS. CKI Lê Thị Mai Chi',
        status: 'Hoàn thành',
        outcome: 'Đạt mờ 40% diện tích mảng nám, đốm tàn nhang mờ 60%'
      }
    ],

    recommendedProducts: [
      {
        name: 'Serum Chống Oxy Hóa SkinCeuticals C E Ferulic (30ml)',
        brand: 'SkinCeuticals',
        price: '3.600.000₫',
        purpose: 'Chống oxy hóa vượt trội, bảo vệ tế bào da chống lại tia cực tím và ô nhiễm',
        clinicalReason: 'Công thức vàng 15% Pure Vitamin C + 1% Vitamin E + 0.5% Ferulic Acid tăng cường khả năng chống nắng gấp 8 lần.',
        instructions: 'Thoa 4-5 giọt vào mỗi buổi sáng sau khi làm sạch và trước kem chống nắng.',
        recommendedBy: 'BS. CKI Lê Thị Mai Chi (Clinic Q3)'
      },
      {
        name: 'Kem Chống Nắng MartiDerm The Originals Proteos Screen SPF 50+ (50ml)',
        brand: 'MartiDerm',
        price: '520.000₫',
        purpose: 'Ngăn ngừa nám sạm, bảo vệ da toàn diện trước tia UVA, UVB, ánh sáng xanh HEV',
        clinicalReason: 'Phức hợp Spectrum Complex và Proteoglycans giữ ẩm sâu cho da khô lão hóa.',
        instructions: 'Thoa đều toàn mặt và cổ trước khi ra nắng 20 phút. Dặm lại sau mỗi 2-3 tiếng.',
        recommendedBy: 'BS. CKI Lê Thị Mai Chi (Clinic Q3)'
      }
    ]
  },

  // =========================================================================
  // 4. HỒ SƠ 4: LÊ MINH KHÔI - Sẹo rỗ đáy nhọn & Bóc tách đáy xơ tái tạo biểu bì
  // =========================================================================
  {
    id: 'HSK-301928',
    customerCode: 'HSK-301928',
    name: 'LÊ MINH KHÔI',
    fullName: 'LÊ MINH KHÔI',
    gender: 'Nam',
    dob: '04/11/2001',
    birthDate: '04/11/2001',
    age: 25,
    phone: '0977 112 233',
    email: 'minhkhoi.le@gmail.com',
    cccd: '079201007812',
    country: 'Việt Nam',
    job: 'Kiến trúc sư thiết kế công trình',
    occupation: 'Kiến trúc sư thiết kế công trình',
    address: '71 Hoàng Hoa Thám, Phường 13, Quận Tân Bình, TP. HCM',
    avatar: '/images/customer_default_avatar.png',
    tier: 'Silver Member',
    membershipTier: 'Silver Member',
    rewardPoints: 850,
    createdDate: '05/10/2026',
    lastVisitDate: '22/10/2026',
    assignedDoctor: 'BS. CKI Vũ Hoài Nam',
    primaryDoctor: 'BS. CKI Vũ Hoài Nam',
    primaryBranch: 'Hasaki Clinic Tân Bình',
    
    skinType: 'Da hỗn hợp thiên khô có sẹo rỗ sau mụn',
    skinTypeCode: 'COMBINATION_SCARRED',
    fitzpatrickType: 'Type IV',
    skinHealthScore: 58,
    skinMetrics: {
      hydration: 44,
      oilLevel: 62,
      pigmentation: 42,
      sensitivity: 48
    },
    sensitivityLevel: 'Trung bình (Đang trong giai đoạn nhạy cảm sau xâm lấn bóc tách sẹo)',
    
    primaryConcerns: [
      'Sẹo rỗ đáy nhọn (Icepick) & đáy vuông (Boxcar) vùng 2 bên má',
      'Bề mặt da thô ráp xơ cứng mô sẹo',
      'Vài nốt mụn viêm li ti rải rác'
    ],
    goals: 'Làm đầy đáy sẹo rỗ 50-70%, làm phẳng mịn bề mặt da và thu nhỏ lỗ chân lông thô.',
    allergies: 'Chưa ghi nhận tiền sử dị ứng thuốc; da nhạy cảm sau can thiệp thủ thuật vi điểm.',
    doctorNotes: 'Vừa thực hiện bóc tách đáy sẹo (Subcision) buổi 1 kết hợp Laser vi điểm Fractional CO2. Vùng điều trị đang đóng mày vi điểm, đỏ nhẹ bình thường. Bắt buộc thoa kem tái tạo phục hồi EGF và kiêng nước lã trong 24h đầu.',
    specialNotes: 'Không tự ý cạy mày mài vi điểm để tránh tăng sắc tố sau viêm (PIH). Bôi kem phục hồi tái tạo 3 lần/ngày.',
    lastUpdatedBy: 'BS. CKI Vũ Hoài Nam',
    lastUpdatedAt: '22/10/2026',

    activePackage: {
      name: 'Liệu trình Bóc tách đáy sẹo Subcision + Laser vi điểm Fractional CO2 Tái tạo da tầng sâu',
      totalSessions: 4,
      currentSession: 1,
      progressPercentage: 25,
      nextSessionDate: '20/11/2026',
      clinic: 'Hasaki Clinic Tân Bình'
    },
    activeTreatmentPackage: {
      name: 'Liệu trình Bóc tách đáy sẹo Subcision + Laser vi điểm Fractional CO2 Tái tạo da tầng sâu',
      totalSessions: 4,
      completedSessions: 1,
      currentSession: 1,
      progressPercentage: 25,
      nextSessionDate: '20/11/2026',
      clinic: 'Hasaki Clinic Tân Bình'
    },

    currentRoutine: {
      morning: [
        'Nước muối sinh lý 0.9% vệ sinh da nhẹ nhàng',
        'Kem tái tạo da phục hồi Avene Cicalfate+ Restorative Protective Cream',
        'Kem chống nắng vật lý Bioderma Photoderm Nude Touch SPF 50+'
      ],
      evening: [
        'Nước tẩy trang dịu nhẹ Bioderma Sensibio H2O',
        'Sữa rửa mặt tạo bọt dịu nhẹ Cosrx Low pH Good Morning Gel Cleanser',
        'Serum Klairs Midnight Blue Youth Activating Drop',
        'Kem dưỡng Avene Cicalfate+'
      ]
    },

    lifestyleFactors: {
      sleepHours: '6 tiếng / ngày',
      waterIntake: '1.5L / ngày',
      stressLevel: 'Cao (vẽ đồ án kiến trúc)',
      sunExposure: 'Trung bình',
      makeupFrequency: 'Không trang điểm'
    },

    allergiesAndPrecautions: ['Chưa ghi nhận dị ứng'],

    serviceHistory: [
      {
        id: 'SRV-KHOI-01',
        serviceName: 'Bóc tách đáy sẹo xơ cứng Subcision + Laser Fractional CO2 vi điểm',
        date: '22/10/2026',
        branch: 'Hasaki Clinic Tân Bình',
        technician: 'KTV Trịnh Phương Linh',
        doctorCheck: 'BS. CKI Vũ Hoài Nam',
        status: 'Hoàn thành',
        outcome: 'Giải phóng 25 nốt xơ sẹo co kéo đáy má, tạo vi tổn thương kích thích collagen tầng sâu, da hơi rát nhẹ được chườm lạnh ngay'
      }
    ],

    recommendedProducts: [
      {
        name: 'Kem Dưỡng Tái Tạo Da Avene Cicalfate+ Restorative Protective Cream (40ml)',
        brand: 'Avene',
        price: '380.000₫',
        purpose: 'Kích thích biểu mô hóa, kháng khuẩn và làm lành nhanh vết thương sau can thiệp sẹo',
        clinicalReason: 'Hoạt chất sáng chế [C+-Restore] từ nước khoáng Avene kết hợp Đồng-Kẽm Sulfate bảo vệ da khỏi nhiễm trùng.',
        instructions: 'Bôi 2-3 lần/ngày lên vùng da vừa điều trị sau khi đã rửa sạch bằng nước muối sinh lý.',
        recommendedBy: 'BS. CKI Vũ Hoài Nam (Clinic Tân Bình)'
      },
      {
        name: 'Serum Tế Bào Gốc Klairs Midnight Blue Youth Activating Drop (20ml)',
        brand: 'Klairs',
        price: '465.000₫',
        purpose: 'Tăng sinh collagen và elastin, đẩy nhanh tốc độ đầy sẹo rỗ',
        clinicalReason: 'Chứa EGF (yếu tố tăng trưởng biểu bì) và bFGF (yếu tố tăng trưởng nguyên bào sợi).',
        instructions: 'Dùng 3-4 giọt thoa nhẹ khắp mặt vào mỗi tối trước kem tái tạo.',
        recommendedBy: 'BS. CKI Vũ Hoài Nam (Clinic Tân Bình)'
      }
    ]
  }
];

// Initial shared consultation records (Treatment history across Clinic & Retail for all 4 customers)
export const initialConsultationRecords = [
  // --- TRỊNH PHƯƠNG THẢO ---
  {
    id: 'consult-rec-04',
    customerId: 'HSK-221005',
    customerName: 'TRỊNH PHƯƠNG THẢO',
    sessionNumber: 4,
    date: '30/10/2026',
    time: '09:30 - 10:45',
    channel: 'clinic',
    type: 'clinic',
    service: 'Điện di tinh chất Arbutin mờ thâm & Tiêm vi điểm Meso HA đa tầng',
    location: 'Hasaki Clinic Quận 7',
    room: 'Phòng Laser & Điều trị 1 - Lầu 1',
    staffId: 'emp_bs_chi',
    staffName: 'BS. CKI Lê Thị Mai Chi',
    staffRole: 'Bác sĩ Chuyên khoa I Da liễu',
    handoverFrom: 'KTV Da liễu Nguyễn Thùy Linh',
    handoverNote: 'Đã bàn giao hồ sơ buổi 3 và theo dõi phục hồi hàng rào da cho BS. CKI Lê Thị Mai Chi tiếp nhận buổi 4.',
    skinCondition: 'Da sau 3 buổi đã giảm 92% mụn viêm, nền da sáng đều màu hơn rõ rệt. Vùng má còn lại một số vết thâm đỏ mờ (PIE) li ti, độ ẩm biểu bì đo đạt 65%.',
    diagnosis: 'Phục hồi màng lipid tốt, sạch mụn viêm, chuyển sang giai đoạn căng bóng và mờ thâm đỏ.',
    recommendations: 'Phác đồ đáp ứng xuất sắc (92% mục tiêu). Hàng rào bảo vệ da được củng cố vững chắc. Chỉ định duy trì chống nắng Mexoryl 400 và kem dưỡng ẩm phục hồi ban đêm.',
    metricsSnapshot: {
      hydration: 62,
      oil: 70,
      sensitivity: 'Nhẹ / Ổn định'
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
    channel: 'clinic',
    type: 'clinic',
    service: 'Điện di lạnh Tế bào gốc phục hồi màng ẩm & Laser Toning 1064nm',
    location: 'Hasaki Clinic Quận 7',
    room: 'Phòng Chăm sóc Công nghệ cao - Lầu 1',
    staffId: 'emp_ktv_linh',
    staffName: 'KTV Da liễu Nguyễn Thùy Linh',
    staffRole: 'Kỹ thuật viên Da liễu Chuyên sâu',
    handoverFrom: 'BS. CKI Vũ Hoài Nam',
    handoverNote: 'BS. CKI Vũ Hoài Nam chỉ định thực hiện điện di lạnh phục hồi màng ẩm và Laser Toning bước sóng 1064nm mờ thâm.',
    skinCondition: 'Tình trạng mụn viêm đã giảm 80%, cồi mụn ẩn gom khô. Vùng má còn thâm đỏ sau mụn (PIE), da hơi khô căng sau bước peel buổi trước.',
    diagnosis: 'Mụn viêm xẹp hoàn toàn, da thiếu nước tầng sừng nhẹ.',
    recommendations: 'Tiến độ phục hồi đạt 85%. Không xuất hiện mụn bùng phát. Bàn giao theo dõi buổi 4 với Bác sĩ Chi.',
    metricsSnapshot: {
      hydration: 55,
      oil: 74,
      sensitivity: 'Nhẹ'
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
    channel: 'clinic',
    type: 'clinic',
    service: 'Peel da sinh học BHA 20% giảm nhờn + Chiếu ánh sáng sinh học Blue Light',
    location: 'Hasaki Clinic Quận 7',
    room: 'Phòng Điều trị Da 2 - Lầu 1',
    staffId: 'emp_bs_nam',
    staffName: 'BS. CKI Vũ Hoài Nam',
    staffRole: 'Bác sĩ Chuyên khoa I Da liễu',
    skinCondition: 'Mụn viêm đã khô mài 60%, còn nhiều sợi bã nhờn cánh mũi và mụn ẩn dưới da vùng cằm.',
    diagnosis: 'Bít tắc bã nhờn nang lông, vi khuẩn P.Acnes khu trú.',
    recommendations: 'Peel thành công, cồi mụn gom tốt. Bắt buộc kiêng nắng kỹ 72h đầu.',
    metricsSnapshot: {
      hydration: 46,
      oil: 80,
      sensitivity: 'Trung bình'
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
    channel: 'clinic',
    type: 'clinic',
    service: 'Khám soi da VISIA đa tầng + Lấy nhân mụn Y khoa vô khuẩn',
    location: 'Hasaki Clinic Quận 7',
    room: 'Phòng Khám Bác sĩ Da liễu 1 - Lầu 1',
    staffId: 'emp_bs_nam',
    staffName: 'BS. CKI Vũ Hoài Nam',
    staffRole: 'Bác sĩ Chuyên khoa I Da liễu',
    skinCondition: 'Khám da ban đầu: Da dầu nhạy cảm, mụn viêm đỏ 2 bên má, mụn ẩn li ti trán và cằm, lỗ chân lông to, hàng rào bảo vệ da yếu do từng tự nặn mụn tại nhà sai cách.',
    diagnosis: 'Mụn trứng cá sẩn viêm mức độ trung bình, tổn thương màng lipid.',
    recommendations: 'Chỉ định phác đồ 5 buổi kết hợp: Lấy nhân mụn -> Peel sinh học -> Laser Toning mờ thâm -> Meso HA căng bóng.',
    metricsSnapshot: {
      hydration: 38,
      oil: 88,
      sensitivity: 'Cao (Dễ châm chích)'
    },
    status: 'completed'
  },
  {
    id: 'consult-rec-retail-01',
    customerId: 'HSK-221005',
    customerName: 'TRỊNH PHƯƠNG THẢO',
    sessionNumber: 0,
    date: '05/09/2026',
    time: '16:00 - 16:30',
    channel: 'retail',
    type: 'retail',
    service: 'Tư vấn Chăm sóc Da & Soi da bã nhờn tại quầy',
    location: 'Hasaki Beauty & Store - 555 Đường 3 Tháng 2, Quận 10',
    staffName: 'Nguyễn Thùy Linh',
    staffRole: 'Chuyên viên Tư vấn Da liễu Cửa hàng',
    skinCondition: 'Khách hàng cảm thấy da hay bị đổ dầu vùng chữ T nhưng 2 bên má lại căng rát khó chịu sau khi rửa mặt.',
    diagnosis: 'Da thiếu nước bù dầu nghiêm trọng, nghi ngờ tổn thương màng lipid.',
    recommendations: 'Tư vấn viên Retail đề xuất chuyển tuyến sang Hasaki Clinic để Bác sĩ Da liễu thăm khám trực tiếp.',
    status: 'completed'
  },

  // --- NGUYỄN VĂN AN ---
  {
    id: 'consult-rec-an-01',
    customerId: 'HSK-109283',
    customerName: 'NGUYỄN VĂN AN',
    sessionNumber: 1,
    date: '28/10/2026',
    time: '14:00 - 15:15',
    channel: 'clinic',
    type: 'clinic',
    service: 'Lấy nhân mụn Y khoa vô khuẩn + Chiếu ánh sáng Blue Light diệt khuẩn',
    location: 'Hasaki Clinic Quận 10',
    room: 'Phòng Điều trị Mụn Vô khuẩn 2',
    staffId: 'emp_bs_nam',
    staffName: 'BS. CKI Vũ Hoài Nam',
    staffRole: 'Bác sĩ Chuyên khoa I Da liễu',
    skinCondition: 'Tuyến bã nhờn hoạt động quá mức, nhiều mụn bọc sưng đỏ nóng rát vùng quai hàm, mụn đầu đen dày đặc cánh mũi.',
    diagnosis: 'Mụn bọc nang (Cystic acne) mức độ trung bình-nặng do tăng tiết bã nhờn và nhiễm khuẩn.',
    recommendations: 'Dẫn lưu an toàn 38 cồi mụn bọc. Kê toa bôi gel kháng khuẩn Klenzit C tối, rửa mặt La Roche-Posay Effaclar sáng tối. Hẹn tái khám sau 7 ngày.',
    metricsSnapshot: {
      hydration: 32,
      oil: 92,
      sensitivity: 'Trung bình'
    },
    status: 'completed'
  },

  // --- TRẦN THU HÀ ---
  {
    id: 'consult-rec-ha-04',
    customerId: 'HSK-204918',
    customerName: 'TRẦN THU HÀ',
    sessionNumber: 4,
    date: '25/10/2026',
    time: '10:30 - 11:45',
    channel: 'clinic',
    type: 'clinic',
    service: 'Laser Toning Pico xung cực ngắn + Điện di tinh chất Tranexamic Acid mờ nám',
    location: 'Hasaki Clinic Quận 3',
    room: 'Phòng Laser Công nghệ cao 1',
    staffId: 'emp_bs_chi',
    staffName: 'BS. CKI Lê Thị Mai Chi',
    staffRole: 'Bác sĩ Chuyên khoa I Da liễu',
    skinCondition: 'Mảng nám 2 bên gò má đã mờ 40%, các đốm tàn nhang nhạt màu rõ. Nền da sáng mịn hơn, không xuất hiện hiện tượng tăng sắc tố sau viêm (PIH).',
    diagnosis: 'Nám mảng nông đáp ứng laser pico rất khả quan, cấu trúc da cải thiện.',
    recommendations: 'Tiếp tục duy trì điện di Tranexamic Acid nồng độ 5%. Dặn khách duy trì thoa kem chống nắng MartiDerm Proteos Screen sau mỗi 3 giờ.',
    metricsSnapshot: {
      hydration: 52,
      oil: 28,
      sensitivity: 'Ổn định'
    },
    status: 'completed'
  },
  {
    id: 'consult-rec-ha-01',
    customerId: 'HSK-204918',
    customerName: 'TRẦN THU HÀ',
    sessionNumber: 1,
    date: '15/08/2026',
    time: '09:30 - 10:45',
    channel: 'clinic',
    type: 'clinic',
    service: 'Thăm khám soi da VISIA sắc tố + Laser Toning Pico buổi đầu tiên',
    location: 'Hasaki Clinic Quận 3',
    room: 'Phòng Laser Công nghệ cao 1',
    staffId: 'emp_bs_chi',
    staffName: 'BS. CKI Lê Thị Mai Chi',
    staffRole: 'Bác sĩ Chuyên khoa I Da liễu',
    skinCondition: 'Nám mảng đối xứng 2 bên gò má, tàn nhang rải rác vùng sống mũi, nếp nhăn li ti khóe mắt và da khô sần.',
    diagnosis: 'Nám hỗn hợp (Melasma) kết hợp lão hóa da do ánh sáng mặt trời.',
    recommendations: 'Lên phác đồ 6 buổi Laser Toning Pico + Điện di tinh chất chống nám Tranexamic Acid. Khuyến cáo không dùng kem lột tẩy Hydroquinone nồng độ cao.',
    metricsSnapshot: {
      hydration: 38,
      oil: 25,
      sensitivity: 'Thấp'
    },
    status: 'completed'
  },

  // --- LÊ MINH KHÔI ---
  {
    id: 'consult-rec-khoi-01',
    customerId: 'HSK-301928',
    customerName: 'LÊ MINH KHÔI',
    sessionNumber: 1,
    date: '22/10/2026',
    time: '15:00 - 16:30',
    channel: 'clinic',
    type: 'clinic',
    service: 'Bóc tách đáy sẹo Subcision + Laser vi điểm Fractional CO2 tái tạo da',
    location: 'Hasaki Clinic Tân Bình',
    room: 'Phòng Thủ thuật Vô trùng 1',
    staffId: 'emp_bs_nam',
    staffName: 'BS. CKI Vũ Hoài Nam',
    staffRole: 'Bác sĩ Chuyên khoa I Da liễu',
    skinCondition: 'Sẹo rỗ hỗn hợp (Icepick và Boxcar) vùng 2 bên má, đáy sẹo có mô xơ co kéo làm bề mặt gồ ghề.',
    diagnosis: 'Sẹo rỗ sau mụn trứng cá mức độ 3, đáy sẹo xơ cứng cần bóc tách cơ học.',
    recommendations: 'Bóc tách cắt đứt 25 điểm xơ sẹo, bắn laser Fractional CO2 vi điểm kích thích tăng sinh collagen. Bắt buộc kiêng nước 24h, bôi kem tái tạo Avene Cicalfate+ liên tục 5 ngày.',
    metricsSnapshot: {
      hydration: 44,
      oil: 62,
      sensitivity: 'Trung bình (Đang đỏ vi điểm sau laser)'
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
