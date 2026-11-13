import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  User, 
  Sparkles, 
  Stethoscope, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Search, 
  Check, 
  Calendar, 
  Clock, 
  Info,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';
import { knowledgeHubProducts, knowledgeHubServices } from '../../data/employeeData';

export default function EmployeeStandardConsultation({
  employeeUser,
  customerProfiles = [],
  preselectedCustomer = null,
  preselectedAppointment = null,
  onSaveConsultationRecord,
  onCancel
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCustomerId, setSelectedCustomerId] = useState(
    preselectedCustomer?.id || customerProfiles[0]?.id || 'HSK-221005'
  );

  // Active customer object
  const currentCustomer = customerProfiles.find((c) => c.id === selectedCustomerId) || customerProfiles[0];

  // FORM STATE
  // Step 2: Assessment
  const [skinConditionSummary, setSkinConditionSummary] = useState(
    'Nền da hỗn hợp thiên dầu, nhân mụn ẩn vùng trán đã khô cồi sau buổi peel BHA trước. Vết thâm đỏ PIE vùng hai bên má bắt đầu mờ nhẹ 25%. Không xuất hiện viêm mủ mới.'
  );
  const [hydrationScore, setHydrationScore] = useState(currentCustomer?.skinMetrics?.hydration || 62);
  const [oilLevelScore, setOilLevelScore] = useState(currentCustomer?.skinMetrics?.oilLevel || 70);
  const [sensitivityLevel, setSensitivityLevel] = useState(currentCustomer?.sensitivityLevel || 'Nhẹ');
  const [recentChanges, setRecentChanges] = useState(
    'Khách hàng có cảm giác da mềm hơn, giảm đổ dầu vùng chữ T nhưng hơi căng nhẹ sau khi rửa mặt vào buổi tối.'
  );

  // Step 3: Needs & Goals
  const [selectedGoals, setSelectedGoals] = useState([
    'Phục hồi màng ẩm & làm dịu da',
    'Làm mờ vết thâm mụn đỏ (PIE/PIH)',
    'Ngăn ngừa mụn ẩn tái phát'
  ]);
  const [customGoalText, setCustomGoalText] = useState('');
  const [budgetRange, setBudgetRange] = useState('1.000.000₫ - 2.500.000₫');
  const [timeCommitment, setTimeCommitment] = useState('15 phút / ngày');
  const [lifestyleNote, setLifestyleNote] = useState('Thường xuyên làm việc máy tính khuya, uống khoảng 1.5L nước/ngày.');

  // Step 4: Recommendations
  const [recommendations, setRecommendations] = useState([
    {
      id: 'REC-1',
      type: 'product',
      name: 'Kem Dưỡng Bioderma Sébium Hydra Cấp Ẩm Phục Hồi (40ml)',
      purpose: 'Phục hồi hàng rào ẩm tự nhiên của da, giảm khô rát sau lấy mụn',
      clinicalReason: 'Công thức chứa Glycerin & Ceramide tương thích sinh học, không gây bít tắc lỗ chân lông cho da dầu mụn.',
      instructions: 'Thoa 2 lần/ngày sáng và tối sau bước serum dưỡng ẩm. Dùng liên tục tối thiểu 4 tuần.'
    },
    {
      id: 'REC-2',
      type: 'product',
      name: 'Serum Skin1004 Madagascar Centella Ampoule Rau Má (100ml)',
      purpose: 'Làm dịu ửng đỏ, giảm sưng và kích thích tăng sinh biểu bì da',
      clinicalReason: '100% chiết xuất rau má Madagascar siêu tinh khiết, kháng khuẩn lành tính cho da nhạy cảm.',
      instructions: 'Nhỏ 3-4 giọt thoa đều mặt, vỗ nhẹ trước kem dưỡng.'
    },
    {
      id: 'REC-3',
      type: 'service',
      name: 'Điện di tinh chất Hyaluronic Acid + Chiếu đèn sinh học phục hồi màng ẩm',
      purpose: 'Đẩy sâu dưỡng chất vào trung bì nông, cấp nước tức thì cho tầng sừng',
      clinicalReason: 'Cải thiện tình trạng khô căng vùng má sau lấy mụn, rút ngắn thời gian hồi phục 50%.',
      instructions: 'Thực hiện 1 buổi/tuần trong 3 tuần liên tiếp tại Clinic Hasaki.'
    }
  ]);

  // Step 5: Save & Doctor summary
  const [doctorConclusion, setDoctorConclusion] = useState(
    'Khách hàng đáp ứng điều trị rất tốt. Tiếp tục duy trì routine phục hồi, hạn chế tẩy tế bào chết hóa học mạnh trong 7 ngày tới. Hẹn tái khám sau 14 ngày để đánh giá chuyển sang giai đoạn mờ thâm chuyên sâu.'
  );
  const [nextAppointmentDate, setNextAppointmentDate] = useState('24/11/2026');
  const [handoverStaff, setHandoverStaff] = useState('BS. CKI Lê Thị Mai Chi');
  const [handoverNote, setHandoverNote] = useState('Bàn giao buổi 4: Đánh giá độ ẩm và lên lịch liệu trình Laser Fractional CO2 trị thâm sẹo.');

  // Quick goal presets
  const goalPresets = [
    'Trị sạch mụn viêm & mụn ẩn',
    'Làm mờ vết thâm mụn đỏ (PIE/PIH)',
    'Phục hồi màng ẩm & làm dịu da',
    'Thu nhỏ lỗ chân lông & kiềm dầu',
    'Tái tạo cấu trúc & sẹo rỗ',
    'Dưỡng trắng & đều màu da'
  ];

  const handleToggleGoal = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleAddCustomGoal = () => {
    if (customGoalText.trim() && !selectedGoals.includes(customGoalText.trim())) {
      setSelectedGoals([...selectedGoals, customGoalText.trim()]);
      setCustomGoalText('');
    }
  };

  const handleAddKnowledgeItem = (item, type = 'product') => {
    const newRec = {
      id: `REC-${Date.now()}`,
      type: type,
      name: item.name,
      purpose: item.category || (type === 'product' ? 'Dưỡng da chuyên sâu' : 'Liệu trình chuyên khoa'),
      clinicalReason: item.activeIngredients ? `Thành phần chính: ${item.activeIngredients}. Phù hợp cho tình trạng da hiện tại.` : (item.targetSkin || 'Phù hợp phác đồ điều trị'),
      instructions: item.usage || 'Sử dụng theo chỉ định chi tiết của bác sĩ.'
    };
    setRecommendations([...recommendations, newRec]);
  };

  const handleRemoveRec = (recId) => {
    setRecommendations(recommendations.filter((r) => r.id !== recId));
  };

  const handleCompleteConsultation = () => {
    const newRecord = {
      id: `CNS-${Date.now()}`,
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerPhone: currentCustomer.phone,
      date: new Date().toLocaleDateString('vi-VN'),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      sessionNumber: 4, // 4th consultation session
      channel: employeeUser?.role === 'retail_consultant' ? 'retail' : 'clinic',
      location: employeeUser?.department || 'Hasaki Clinic Quận 7',
      staffName: employeeUser?.name || 'BS. CKI Vũ Hoài Nam',
      staffRole: employeeUser?.title || 'Bác sĩ Da liễu',
      service: preselectedAppointment?.serviceName || 'Tư vấn phác đồ điều trị phục hồi chuyên sâu',
      skinCondition: skinConditionSummary,
      diagnosis: skinConditionSummary,
      metricsSnapshot: {
        hydration: hydrationScore,
        oil: oilLevelScore,
        sensitivity: sensitivityLevel
      },
      customerGoals: selectedGoals,
      budgetRange: budgetRange,
      lifestyle: lifestyleNote,
      recommendations: doctorConclusion,
      recommendedItems: recommendations,
      nextAppointment: nextAppointmentDate,
      handoverTo: handoverStaff,
      handoverNote: handoverNote,
      createdAt: new Date().toISOString()
    };

    if (onSaveConsultationRecord) {
      onSaveConsultationRecord(newRecord);
    }
  };

  const steps = [
    { num: 1, label: 'Xem hồ sơ', sub: 'Review Profile' },
    { num: 2, label: 'Khám & Đánh giá', sub: 'Skin Assessment' },
    { num: 3, label: 'Xác định nhu cầu', sub: 'Identify Needs' },
    { num: 4, label: 'Phác đồ & Đề xuất', sub: 'Recommendations' },
    { num: 5, label: 'Lưu & Đồng bộ', sub: 'Save Record' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Wizard Progress Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-[#105e3f] text-xs font-black">
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Quy Trình Tư Vấn Chuẩn Hóa Hasaki</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {steps[currentStep - 1].label}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400">Bước {currentStep}/5:</span>
            <span className="text-xs font-extrabold text-[#105e3f] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
              {steps[currentStep - 1].sub}
            </span>
          </div>
        </div>

        {/* Step Track */}
        <div className="grid grid-cols-5 gap-2 pt-2">
          {steps.map((st) => {
            const isCompleted = st.num < currentStep;
            const isCurrent = st.num === currentStep;

            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setCurrentStep(st.num)}
                className={`p-2 sm:p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                  isCurrent
                    ? 'bg-[#105e3f] text-white border-[#105e3f] shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-[#105e3f] border-emerald-200'
                    : 'bg-slate-50 text-slate-400 border-gray-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-black mb-1">
                  <span>BƯỚC {st.num}</span>
                  {isCompleted && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <div className="font-extrabold text-xs sm:text-[13px] line-clamp-1">{st.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: REVIEW CUSTOMER PROFILE */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-7 space-y-6 shadow-2xs">
          {/* Customer Selection if multiple */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              1. Khách hàng đang tiếp nhận tư vấn:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {customerProfiles.map((cust) => (
                <button
                  key={cust.id}
                  type="button"
                  onClick={() => setSelectedCustomerId(cust.id)}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-3 ${
                    selectedCustomerId === cust.id
                      ? 'border-[#105e3f] bg-emerald-50/70 ring-2 ring-[#105e3f]/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <img
                    src={cust.avatar || '/images/customer_default_avatar.png'}
                    alt={cust.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/customer_default_avatar.png';
                    }}
                    className="w-10 h-10 rounded-xl object-cover border border-emerald-200"
                  />
                  <div className="overflow-hidden">
                    <div className="font-extrabold text-xs text-slate-900 truncate">{cust.name}</div>
                    <div className="text-[11px] text-slate-500">{cust.phone}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Snapshot of Active Customer */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={currentCustomer?.avatar || '/images/customer_default_avatar.png'}
                  alt={currentCustomer?.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/customer_default_avatar.png';
                  }}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400 bg-white"
                />
                <div>
                  <h3 className="font-black text-base text-slate-900">{currentCustomer?.name}</h3>
                  <p className="text-xs text-slate-500">
                    {currentCustomer?.phone} • {currentCustomer?.gender || 'Nữ'}, {currentCustomer?.age || '21'} tuổi • Mã: <strong>{currentCustomer?.id}</strong>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#105e3f]">
                  {currentCustomer?.tier || 'VIP Gold'}
                </span>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {currentCustomer?.skinType || 'Da hỗn hợp thiên dầu'}
                </div>
              </div>
            </div>

            {/* Quick overview grids */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <span className="text-gray-500 font-semibold block">Vấn đề da chính:</span>
                <div className="font-bold text-slate-800 mt-1">
                  {(currentCustomer?.primaryConcerns || []).join(', ') || 'Mụn ẩn, thâm đỏ sau mụn'}
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <span className="text-gray-500 font-semibold block">Dị ứng &amp; Lưu ý:</span>
                <div className="font-bold text-rose-600 mt-1">
                  {currentCustomer?.allergies || 'Tránh cồn khô, BHA nồng độ cao'}
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <span className="text-gray-500 font-semibold block">Liệu trình hiện tại:</span>
                <div className="font-bold text-blue-700 mt-1">
                  {currentCustomer?.activePackage?.name || 'Phục hồi màng ẩm'} (Buổi 3/5)
                </div>
              </div>
            </div>

            {/* Previous Session Doctor Notes */}
            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/80 text-xs">
              <strong className="text-[#105e3f] block mb-1">
                Lịch sử tư vấn buổi trước (Buổi 3 - BS. CKI Vũ Hoài Nam):
              </strong>
              <p className="text-slate-700 leading-relaxed">
                "Khách hàng đã làm sạch 40 cồi mụn ẩn. Nền da còn ửng đỏ nhẹ. Chỉ định điện di HA + Ceramide phục hồi và tạm ngừng các sản phẩm treatment mạnh. Khách tuân thủ tốt."
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 rounded-2xl bg-[#105e3f] hover:bg-[#167850] text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span>Tiếp tục: Bước 2 - Khám &amp; Đánh giá da</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CURRENT SKIN ASSESSMENT */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-7 space-y-6 shadow-2xs">
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              Bước 2: Ghi nhận tình trạng da lâm sàng hiện tại
            </h3>
            <p className="text-xs text-slate-500">
              Đánh giá tổn thương, đo lường các chỉ số Visia thực tế và ghi nhận thay đổi so với lần trước.
            </p>
          </div>

          {/* Metric Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Hydration Slider */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Độ ẩm tầng sừng:</span>
                <strong className="text-blue-600 font-extrabold text-sm">{hydrationScore}%</strong>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                value={hydrationScore}
                onChange={(e) => setHydrationScore(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Khô rát (20%)</span>
                <span>Tiêu chuẩn (60%)</span>
                <span>Mọng nước (95%)</span>
              </div>
            </div>

            {/* Oil Level Slider */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Mức độ bài tiết dầu nhờn:</span>
                <strong className="text-amber-600 font-extrabold text-sm">{oilLevelScore}%</strong>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={oilLevelScore}
                onChange={(e) => setOilLevelScore(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Thiếu dầu (10%)</span>
                <span>Cân bằng (50%)</span>
                <span>Bóng nhờn (100%)</span>
              </div>
            </div>
          </div>

          {/* Sensitivity Select */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Mức độ nhạy cảm &amp; phản ứng mạch máu:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Bình thường / Ổn định', 'Nhẹ (Ửng đỏ thoáng qua)', 'Cao (Dễ kích ứng / Giãn mao mạch)'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSensitivityLevel(level)}
                  className={`p-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                    sensitivityLevel === level
                      ? 'bg-rose-50 border-rose-300 text-rose-700 ring-2 ring-rose-200'
                      : 'bg-white border-gray-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Clinical Assessment Text */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Mô tả chi tiết tình trạng tổn thương da hiện tại:
            </label>
            <textarea
              rows={3}
              value={skinConditionSummary}
              onChange={(e) => setSkinConditionSummary(e.target.value)}
              placeholder="Ghi rõ tình trạng mụn, thâm, sắc tố hoặc phản ứng da..."
              className="w-full p-3 rounded-xl border border-gray-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#105e3f]/20 focus:border-[#105e3f]"
            />
          </div>

          {/* Changes Since Last Visit */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Những thay đổi ghi nhận so với lần khám trước:
            </label>
            <textarea
              rows={2}
              value={recentChanges}
              onChange={(e) => setRecentChanges(e.target.value)}
              placeholder="VD: Da mềm hơn, vết thâm giảm đỏ 20%, không còn kích ứng..."
              className="w-full p-3 rounded-xl border border-gray-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#105e3f]/20 focus:border-[#105e3f]"
            />
          </div>

          <div className="flex justify-between pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Bước 1</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-2xl bg-[#105e3f] hover:bg-[#167850] text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span>Tiếp tục: Bước 3 - Xác định nhu cầu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: IDENTIFY CUSTOMER NEEDS */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-7 space-y-6 shadow-2xs">
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              Bước 3: Xác định mục tiêu chăm sóc da &amp; Mong muốn của khách hàng
            </h3>
            <p className="text-xs text-slate-500">
              Hiểu rõ kỳ vọng, ngân sách và thói quen sinh hoạt để xây dựng phác đồ khả thi nhất.
            </p>
          </div>

          {/* Goals Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Mục tiêu chăm sóc da khách hàng ưu tiên (Chọn nhiều):
            </label>
            <div className="flex flex-wrap gap-2">
              {goalPresets.map((goal) => {
                const isSelected = selectedGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleToggleGoal(goal)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#105e3f] text-white border-[#105e3f] shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border-gray-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {goal}
                  </button>
                );
              })}
            </div>

            {/* Custom Goal Input */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={customGoalText}
                onChange={(e) => setCustomGoalText(e.target.value)}
                placeholder="Thêm mục tiêu đặc biệt khác..."
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
              <button
                type="button"
                onClick={handleAddCustomGoal}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Thêm
              </button>
            </div>
          </div>

          {/* Budget & Time Commitment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Ngân sách dự kiến của khách hàng:
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-slate-800 bg-white"
              >
                <option value="Dưới 1.000.000₫">Dưới 1.000.000₫ (Tiết kiệm)</option>
                <option value="1.000.000₫ - 2.500.000₫">1.000.000₫ - 2.500.000₫ (Tiêu chuẩn)</option>
                <option value="2.500.000₫ - 5.000.000₫">2.500.000₫ - 5.000.000₫ (Nâng cao/Liệu trình)</option>
                <option value="Trên 5.000.000₫">Trên 5.000.000₫ (Chuyên sâu/Công nghệ cao)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Thời gian có thể dành cho skincare mỗi ngày:
              </label>
              <select
                value={timeCommitment}
                onChange={(e) => setTimeCommitment(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-slate-800 bg-white"
              >
                <option value="5-10 phút / ngày (Tối giản)">5-10 phút / ngày (Tối giản 3 bước)</option>
                <option value="15 phút / ngày">15 phút / ngày (Tiêu chuẩn 4-5 bước)</option>
                <option value="20-30 phút / ngày">20-30 phút / ngày (Chuyên sâu đầy đủ)</option>
              </select>
            </div>
          </div>

          {/* Lifestyle Notes */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Yếu tố lối sống &amp; Môi trường ảnh hưởng da:
            </label>
            <input
              type="text"
              value={lifestyleNote}
              onChange={(e) => setLifestyleNote(e.target.value)}
              placeholder="VD: Thức khuya, tiếp xúc điều hòa liên tục, hay make up đậm..."
              className="w-full p-2.5 rounded-xl border border-gray-200 text-xs text-slate-800"
            />
          </div>

          <div className="flex justify-between pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Bước 2</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 rounded-2xl bg-[#105e3f] hover:bg-[#167850] text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span>Tiếp tục: Bước 4 - Đề xuất Phác đồ &amp; Sản phẩm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PRODUCT / SERVICE RECOMMENDATIONS */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-7 space-y-6 shadow-2xs">
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              Bước 4: Đề xuất Sản Phẩm &amp; Dịch Vụ Phù Hợp
            </h3>
            <p className="text-xs text-slate-500">
              Mỗi mục đề xuất bắt buộc phải có: <strong>Tên</strong>, <strong>Công dụng</strong>, <strong>Lý do lâm sàng</strong>, và <strong>Hướng dẫn sử dụng</strong>.
            </p>
          </div>

          {/* Quick Add from Knowledge Hub */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-[#105e3f] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Tra cứu &amp; Thêm nhanh từ Hasaki Knowledge Hub:
              </span>
              <span className="text-[11px] text-gray-500">Bấm nút (+) để thêm vào phác đồ</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {knowledgeHubProducts.slice(0, 3).map((prod) => (
                <div key={prod.id} className="p-2.5 rounded-xl bg-white border border-emerald-100 text-xs flex items-center justify-between gap-2">
                  <div className="truncate">
                    <strong className="text-slate-900 block truncate">{prod.name}</strong>
                    <span className="text-[10.5px] text-emerald-700">{prod.brand} • {prod.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddKnowledgeItem(prod, 'product')}
                    className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#105e3f] cursor-pointer"
                    title="Thêm vào danh sách đề xuất"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {knowledgeHubServices.slice(0, 3).map((srv) => (
                <div key={srv.id} className="p-2.5 rounded-xl bg-white border border-blue-100 text-xs flex items-center justify-between gap-2">
                  <div className="truncate">
                    <strong className="text-slate-900 block truncate">{srv.name}</strong>
                    <span className="text-[10.5px] text-blue-700">{srv.category} • {srv.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddKnowledgeItem(srv, 'service')}
                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 cursor-pointer"
                    title="Thêm dịch vụ clinic"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Current Recommendations List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 block">
                Danh sách đề xuất cho khách hàng ({recommendations.length} mục):
              </label>
            </div>

            {recommendations.map((rec, idx) => (
              <div
                key={rec.id || idx}
                className="p-4 rounded-2xl border border-gray-200 bg-white space-y-3 shadow-2xs hover:border-emerald-300 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold ${
                      rec.type === 'product' ? 'bg-emerald-100 text-[#105e3f]' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {rec.type === 'product' ? 'Sản phẩm Skincare' : 'Dịch vụ Clinic'}
                    </span>
                    <strong className="text-sm text-slate-900 font-extrabold">{rec.name}</strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveRec(rec.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Xóa đề xuất này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <strong className="text-slate-700 block mb-0.5">1. Công dụng / Mục đích:</strong>
                    <span className="text-slate-600">{rec.purpose}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <strong className="text-[#105e3f] block mb-0.5">2. Lý do đề xuất:</strong>
                    <span className="text-slate-700">{rec.clinicalReason}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50/50 p-2.5 rounded-xl border border-slate-200/60">
                  <strong className="text-slate-800">3. Cách sử dụng / Lưu ý cần thiết: </strong>
                  {rec.instructions}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Bước 3</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="px-6 py-2.5 rounded-2xl bg-[#105e3f] hover:bg-[#167850] text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span>Tiếp tục: Bước 5 - Lưu &amp; Đồng bộ hồ sơ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SAVE CONSULTATION RECORD */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-7 space-y-6 shadow-2xs">
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              Bước 5: Xác Nhận &amp; Lưu Phiên Tư Vấn Vào Hồ Sơ Khách Hàng
            </h3>
            <p className="text-xs text-slate-500">
              Bản ghi sẽ được lưu độc lập, không ghi đè dữ liệu cũ và tự động đồng bộ sang màn hình Khách hàng.
            </p>
          </div>

          {/* Summary Snapshot Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
              <span className="font-black text-[#105e3f] text-sm">
                TỔNG KẾT PHIÊN TƯ VẤN #{4}
              </span>
              <span className="text-emerald-800 font-bold">
                {currentCustomer.name} ({currentCustomer.phone})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-gray-500 block">Địa điểm:</span>
                <strong className="text-slate-800">{employeeUser?.department || 'Hasaki Clinic Quận 7'}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Người phụ trách:</span>
                <strong className="text-slate-800">{employeeUser?.name || 'BS. CKI Vũ Hoài Nam'}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Số mục đề xuất:</span>
                <strong className="text-slate-800">{recommendations.length} sản phẩm / dịch vụ</strong>
              </div>
            </div>
          </div>

          {/* Doctor Conclusion */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Kết luận chuyên môn &amp; Lời dặn dò khách hàng:
            </label>
            <textarea
              rows={3}
              value={doctorConclusion}
              onChange={(e) => setDoctorConclusion(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-xs text-slate-800 focus:ring-2 focus:ring-[#105e3f]/20 focus:outline-hidden"
            />
          </div>

          {/* Handover & Next Follow-up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Ngày hẹn tái khám / Chăm sóc tiếp theo:
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={nextAppointmentDate}
                  onChange={(e) => setNextAppointmentDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Người nhận bàn giao ca tiếp theo (nếu có):
              </label>
              <input
                type="text"
                value={handoverStaff}
                onChange={(e) => setHandoverStaff(e.target.value)}
                placeholder="VD: BS. CKI Lê Thị Mai Chi"
                className="w-full p-2 rounded-xl border border-gray-200 text-xs font-bold text-slate-800"
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Ghi chú bàn giao chuyên môn cho nhân sự tiếp theo:
              </label>
              <input
                type="text"
                value={handoverNote}
                onChange={(e) => setHandoverNote(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs text-slate-800"
              />
            </div>
          </div>

          {/* Live Sync Confirmation Note */}
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Sau khi bấm <strong>"Lưu &amp; Đồng bộ hồ sơ"</strong>, bản ghi tư vấn này sẽ lập tức xuất hiện trong mục <em>"Lịch sử tư vấn/điều trị"</em> trên màn hình của khách hàng <strong>{currentCustomer.name}</strong> và được cập nhật vào lịch sử chung.
            </p>
          </div>

          <div className="flex justify-between pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Bước 4</span>
            </button>

            <button
              type="button"
              onClick={handleCompleteConsultation}
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#105e3f] via-[#167850] to-[#0d4f34] hover:opacity-95 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-300" />
              <span>LƯU &amp; ĐỒNG BỘ VÀO HỒ SƠ KHÁCH HÀNG</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
