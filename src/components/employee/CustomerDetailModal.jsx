import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Clock, 
  Stethoscope, 
  ShoppingBag, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Save, 
  Edit3, 
  Tag,
  Activity,
  HeartPulse
} from 'lucide-react';

export default function CustomerDetailModal({
  customer,
  consultationRecords = [],
  employeeUser,
  onClose,
  onStartConsultation,
  onUpdateCustomer
}) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, skin_profile, consultation_history, service_history, product_recommendations
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState(customer?.specialNotes || customer?.doctorNotes || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!customer) return null;

  // Filter consultations for this customer
  const customerConsultations = consultationRecords.filter(
    (c) => c.customerId === customer.id || c.customerName === customer.name
  );

  const handleSaveNotes = () => {
    if (onUpdateCustomer) {
      onUpdateCustomer({
        ...customer,
        doctorNotes: editedNotes,
        specialNotes: editedNotes,
        lastUpdatedBy: employeeUser?.name || 'Nhân viên Hasaki',
        lastUpdatedAt: new Date().toISOString()
      });
      setIsEditingNotes(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const tabs = [
    { id: 'overview', label: '1. Overview (Tổng quan)', icon: User },
    { id: 'skin_profile', label: '2. Skin Profile (Chi tiết da)', icon: Sparkles },
    { id: 'consultation_history', label: '3. Consultation History (Tư vấn)', icon: Clock },
    { id: 'service_history', label: '4. Service History (Dịch vụ)', icon: Stethoscope },
    { id: 'product_recommendations', label: '5. Product Recommendations (Sản phẩm)', icon: ShoppingBag },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#105e3f] to-[#174e37] text-white p-5 sm:p-6 flex items-start justify-between relative">
          <div className="flex items-center gap-4">
            <img
              src={customer.avatar || '/images/customer_default_avatar.png'}
              alt={customer.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/customer_default_avatar.png';
              }}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-300/80 shadow-md bg-white"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">{customer.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs">
                  {customer.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-400 text-slate-900">
                  {customer.tier || 'VIP Gold'}
                </span>
              </div>
              <p className="text-emerald-100 text-xs sm:text-sm flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {customer.phone}
                </span>
                <span>•</span>
                <span>{customer.gender || 'Nữ'}, {customer.age || '21 tuổi'}</span>
                <span>•</span>
                <span className="font-semibold text-emerald-200">{customer.skinType || 'Da hỗn hợp thiên dầu'}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-gray-200 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#105e3f] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#105e3f] hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-slate-800 text-[13px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Top Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <div className="text-[11px] font-semibold text-emerald-700">Điểm sức khỏe da</div>
                  <div className="text-2xl font-black text-[#105e3f] mt-1">{customer.skinHealthScore || 78}/100</div>
                  <div className="text-[10px] text-emerald-600 mt-0.5">Tăng +12đ sau 3 buổi</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                  <div className="text-[11px] font-semibold text-blue-700">Liệu trình đang làm</div>
                  <div className="text-sm font-extrabold text-blue-900 mt-1 line-clamp-1">
                    {customer.activePackage?.name || 'Phục hồi màng ẩm'}
                  </div>
                  <div className="text-[10.5px] text-blue-600 mt-0.5">
                    Buổi {customer.activePackage?.currentSession || 3}/{customer.activePackage?.totalSessions || 5} (Đạt 60%)
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
                  <div className="text-[11px] font-semibold text-amber-700">Tình trạng viêm/kích ứng</div>
                  <div className="text-sm font-extrabold text-amber-900 mt-1">
                    {customer.sensitivityLevel || 'Nhạy cảm nhẹ'}
                  </div>
                  <div className="text-[10.5px] text-amber-600 mt-0.5">Đã ngưng dị ứng BHA</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <div className="text-[11px] font-semibold text-purple-700">Bác sĩ phụ trách</div>
                  <div className="text-sm font-extrabold text-purple-900 mt-1">
                    {customer.assignedDoctor || 'BS. CKI Vũ Hoài Nam'}
                  </div>
                  <div className="text-[10.5px] text-purple-600 mt-0.5">Clinic Chi nhánh Q7</div>
                </div>
              </div>

              {/* Personal Info & Contact */}
              <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-3">
                <h3 className="font-extrabold text-[14px] text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#105e3f]" />
                  Thông tin hành chính &amp; Cá nhân
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 block">Họ và tên:</span>
                    <strong className="text-slate-800 text-[13px]">{customer.name}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Số điện thoại:</span>
                    <strong className="text-slate-800 text-[13px]">{customer.phone}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Email:</span>
                    <span className="text-slate-800">{customer.email || 'thao.trinh@gmail.com'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Ngày sinh / Tuổi:</span>
                    <span className="text-slate-800">{customer.dob || '22/10/2005'} ({customer.age || '21'} tuổi)</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Số CCCD:</span>
                    <span className="text-slate-800">{customer.cccd || '079205012345'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Nghề nghiệp:</span>
                    <span className="text-slate-800">{customer.occupation || 'Sinh viên / Content Creator'}</span>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <span className="text-gray-500 block">Địa chỉ liên hệ:</span>
                    <span className="text-slate-800">{customer.address || '468 Nguyễn Thị Thập, P. Tân Quy, Quận 7, TP.HCM'}</span>
                  </div>
                </div>
              </div>

              {/* Clinical Notes & Sync Section */}
              <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-[14px] text-slate-900 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#105e3f]" />
                    Ghi chú chuyên môn &amp; Lưu ý lâm sàng
                  </h3>
                  <div className="flex items-center gap-2">
                    {saveSuccess && (
                      <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã đồng bộ!
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (isEditingNotes) {
                          handleSaveNotes();
                        } else {
                          setIsEditingNotes(true);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 text-[#105e3f] hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
                    >
                      {isEditingNotes ? (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>Lưu ghi chú</span>
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Chỉnh sửa</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {isEditingNotes ? (
                  <div className="space-y-2">
                    <textarea
                      rows={4}
                      value={editedNotes}
                      onChange={(e) => setEditedNotes(e.target.value)}
                      className="w-full p-3 rounded-xl border border-emerald-300 focus:outline-hidden focus:ring-2 focus:ring-[#105e3f]/20 text-xs text-slate-800"
                      placeholder="Ghi chú lâm sàng của bác sĩ hoặc lưu ý nhân viên tư vấn..."
                    />
                    <div className="text-[11px] text-gray-500 italic">
                      * Dữ liệu ghi chú sẽ tự động đồng bộ hai chiều đến màn hình Hồ sơ da của khách hàng trên Customer Interface.
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-2">
                    <p className="leading-relaxed">
                      {customer.doctorNotes || customer.specialNotes || 'Da đang phục hồi tốt sau peel BHA buổi 2. Tiếp tục duy trì dưỡng ẩm với Ceramide và chống nắng phổ rộng SPF50+ PA++++. Tránh dùng AHA/Retinoid nồng độ cao trong 7 ngày tới.'}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-slate-200">
                      <span>Cập nhật bởi: <strong>{customer.lastUpdatedBy || 'BS. CKI Vũ Hoài Nam'}</strong></span>
                      <span>Lần cuối: {customer.lastUpdatedAt ? new Date(customer.lastUpdatedAt).toLocaleDateString('vi-VN') : '10/11/2026'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SKIN PROFILE */}
          {activeTab === 'skin_profile' && (
            <div className="space-y-5">
              {/* Detailed Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-gray-200 bg-white space-y-3">
                  <h4 className="font-extrabold text-[13px] text-slate-900 flex items-center justify-between">
                    <span>Chỉ số da thực tế (Soi da Visia)</span>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Máy Visia Hasaki</span>
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="text-slate-600">Độ ẩm tầng sừng:</span>
                        <span className="text-blue-600 font-bold">{customer.skinMetrics?.hydration || 62}% (Đủ ẩm)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${customer.skinMetrics?.hydration || 62}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="text-slate-600">Tuyến dầu bài tiết:</span>
                        <span className="text-amber-600 font-bold">{customer.skinMetrics?.oilLevel || 78}% (Tăng tiết nhẹ)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${customer.skinMetrics?.oilLevel || 78}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="text-slate-600">Sắc tố &amp; Thâm mụn (PIH):</span>
                        <span className="text-purple-600 font-bold">{customer.skinMetrics?.pigmentation || 45}% (Mức độ vừa)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${customer.skinMetrics?.pigmentation || 45}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="text-slate-600">Độ nhạy cảm mao mạch:</span>
                        <span className="text-rose-600 font-bold">{customer.skinMetrics?.sensitivity || 35}% (Ổn định)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: `${customer.skinMetrics?.sensitivity || 35}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-gray-200 bg-white space-y-3">
                  <h4 className="font-extrabold text-[13px] text-slate-900">Vấn đề da &amp; Mục tiêu điều trị</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[11px] text-gray-500 font-semibold block">Vấn đề chính:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {(customer.primaryConcerns || ['Mụn ẩn vùng trán & má', 'Thâm sau mụn đỏ PIE/PIH', 'Lỗ chân lông to vùng T-zone']).map((concern, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs border border-rose-100">
                            {concern}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[11px] text-gray-500 font-semibold block">Mục tiêu của khách hàng:</span>
                      <p className="text-slate-700 mt-1 font-medium bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 text-xs">
                        "{customer.goals || 'Làm sạch mụn ẩn trước Tết, làm mờ vết thâm đỏ và phục hồi hàng rào ẩm để da khỏe mạnh, bóng mịn tự nhiên.'}"
                      </p>
                    </div>

                    <div className="pt-1">
                      <span className="text-[11px] text-rose-600 font-bold block flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Thành phần dị ứng / Cần tránh:
                      </span>
                      <p className="text-rose-700 font-semibold text-xs mt-0.5">
                        {customer.allergies || 'Dị ứng cồn khô nồng độ cao (Alcohol Denat), kích ứng với BHA > 2% nếu không cấp ẩm đủ.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Skincare Routine */}
              <div className="p-4 rounded-2xl border border-gray-200 bg-white space-y-3">
                <h4 className="font-extrabold text-[13px] text-slate-900">Chu trình Skincare tại nhà hiện tại</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                    <span className="font-bold text-amber-700 flex items-center gap-1">☀️ Buổi sáng:</span>
                    <ol className="list-decimal list-inside text-slate-700 space-y-1 pl-1">
                      <li>Sữa rửa mặt Cetaphil Gentle Cleanser</li>
                      <li>Nước hoa hồng Klairs Supple Preparation Toner</li>
                      <li>Serum Skin1004 Madagascar Centella Ampoule (Rau má)</li>
                      <li>Kem chống nắng La Roche-Posay Anthelios UVMune 400 Oil Control</li>
                    </ol>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                    <span className="font-bold text-indigo-700 flex items-center gap-1">🌙 Buổi tối:</span>
                    <ol className="list-decimal list-inside text-slate-700 space-y-1 pl-1">
                      <li>Nước tẩy trang Bioderma Sensibio H2O</li>
                      <li>Sữa rửa mặt CeraVe Foaming Cleanser</li>
                      <li>Serum The Ordinary Niacinamide 10% + Zinc 1% (2-3 lần/tuần)</li>
                      <li>Kem dưỡng Bioderma Sébium Hydra / Phục hồi B5 La Roche-Posay</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONSULTATION HISTORY */}
          {activeTab === 'consultation_history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-[14px] text-slate-900">
                  Lịch sử tư vấn ({customerConsultations.length} phiên ghi nhận)
                </h4>
                <span className="text-xs text-gray-500">Được đồng bộ tự động từ Clinic &amp; Cửa hàng</span>
              </div>

              {customerConsultations.length === 0 ? (
                <div className="text-center py-8 text-gray-400 bg-slate-50 rounded-2xl">
                  Chưa có lịch sử tư vấn nào được lưu.
                </div>
              ) : (
                <div className="space-y-3">
                  {customerConsultations.map((record, idx) => (
                    <div
                      key={record.id || idx}
                      className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-emerald-300 transition-all space-y-2.5 shadow-2xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-[#105e3f] text-sm">
                            Phiên #{record.sessionNumber || idx + 1}: {record.service || 'Khám &amp; Tư vấn da'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                            record.channel === 'clinic' 
                              ? 'bg-emerald-100 text-[#105e3f]' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {record.channel === 'clinic' ? 'Hasaki Clinic' : 'Hasaki Retail Store'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          {record.date} • {record.time || '10:00'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Bác sĩ / Nhân viên:</span>{' '}
                          <strong className="text-slate-800">{record.staffName || record.doctorName}</strong>
                          {record.staffRole && <span className="text-gray-400 text-[11px]"> ({record.staffRole})</span>}
                        </div>
                        <div>
                          <span className="text-gray-500">Địa điểm chi nhánh:</span>{' '}
                          <span className="text-slate-800">{record.location || 'Hasaki Clinic Quận 7'}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 text-xs space-y-1.5">
                        <div>
                          <strong className="text-slate-700">Tình trạng da ghi nhận:</strong>
                          <p className="text-slate-600 mt-0.5">{record.skinCondition || record.diagnosis}</p>
                        </div>
                        {record.recommendations && (
                          <div className="pt-1">
                            <strong className="text-[#105e3f]">Chỉ định / Khuyến nghị:</strong>
                            <p className="text-slate-700 mt-0.5">{record.recommendations}</p>
                          </div>
                        )}
                        {record.handoverNote && (
                          <div className="pt-1 text-amber-700 bg-amber-50/70 p-2 rounded-lg border border-amber-100 text-[11.5px]">
                            <strong>Ghi chú bàn giao:</strong> {record.handoverNote}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SERVICE HISTORY */}
          {activeTab === 'service_history' && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-[14px] text-slate-900">
                Lịch sử dịch vụ tại Hasaki Clinic
              </h4>

              <div className="space-y-3">
                {(customer.serviceHistory || [
                  {
                    id: 'SRV-01',
                    serviceName: 'Lấy nhân mụn chuẩn Y khoa + Chiếu ánh sáng sinh học Blue Light',
                    date: '15/10/2026',
                    branch: 'Clinic Quận 7 - 468 Nguyễn Thị Thập',
                    technician: 'KTV Trịnh Phương Linh',
                    doctorCheck: 'BS. CKI Vũ Hoài Nam',
                    status: 'Hoàn thành',
                    outcome: 'Lấy sạch 45 cồi mụn ẩn trán & má, da ửng đỏ nhẹ 2 giờ sau giảm hẳn'
                  },
                  {
                    id: 'SRV-02',
                    serviceName: 'Peel Da BHA Salicylic 20% giảm viêm & gom cồi',
                    date: '28/10/2026',
                    branch: 'Clinic Quận 7 - 468 Nguyễn Thị Thập',
                    technician: 'KTV Nguyễn Thùy Trang',
                    doctorCheck: 'BS. CKI Vũ Hoài Nam',
                    status: 'Hoàn thành',
                    outcome: 'Gom cồi mụn viêm nhanh chóng, bong tróc mỏng nhẹ ngày thứ 3, không tăng sắc tố'
                  },
                  {
                    id: 'SRV-03',
                    serviceName: 'Điện di tinh chất Hyaluronic Acid & Ceramide phục hồi màng ẩm',
                    date: '10/11/2026',
                    branch: 'Clinic Quận 7 - 468 Nguyễn Thị Thập',
                    technician: 'KTV Trần Minh Tâm',
                    doctorCheck: 'BS. CKI Lê Thị Mai Chi',
                    status: 'Hoàn thành',
                    outcome: 'Độ ẩm da tăng vọt từ 48% lên 62%, nền da căng bóng, giảm hiện tượng khô căng'
                  }
                ]).map((srv, idx) => (
                  <div key={srv.id || idx} className="p-4 rounded-2xl border border-gray-200 bg-white space-y-2.5 shadow-2xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <strong className="text-slate-900 text-sm font-bold">{srv.serviceName}</strong>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#105e3f]">
                        {srv.status || 'Đã hoàn thành'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500">
                      <div>Thời gian: <strong className="text-slate-700">{srv.date}</strong></div>
                      <div>Kỹ thuật viên: <strong className="text-slate-700">{srv.technician}</strong></div>
                      <div>Bác sĩ giám sát: <strong className="text-slate-700">{srv.doctorCheck}</strong></div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-slate-700">
                      <strong>Kết quả sau buổi:</strong> {srv.outcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRODUCT RECOMMENDATIONS */}
          {activeTab === 'product_recommendations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-[14px] text-slate-900">
                  Các sản phẩm đã được đề xuất &amp; Lý do lâm sàng
                </h4>
                <span className="text-xs text-gray-500">Dữ liệu chia sẻ giữa Clinic &amp; Retail</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {(customer.recommendedProducts || [
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
                    recommendedBy: 'BS. CKI Vũ Hoài Nam (Clinic Q7)'
                  }
                ]).map((prod, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-gray-200 bg-white space-y-2 shadow-2xs">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">{prod.brand}</div>
                        <h5 className="font-extrabold text-slate-900 text-sm">{prod.name}</h5>
                      </div>
                      <span className="font-black text-[#105e3f] text-sm">{prod.price}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                        <strong className="text-slate-700 block mb-0.5">Mục đích sử dụng:</strong>
                        <span className="text-slate-600">{prod.purpose}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                        <strong className="text-[#105e3f] block mb-0.5">Lý do đề xuất chuyên môn:</strong>
                        <span className="text-slate-700">{prod.clinicalReason}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 pt-1">
                      <strong>Hướng dẫn &amp; Lưu ý:</strong> {prod.instructions}
                    </div>

                    <div className="text-[11px] text-gray-400 pt-1 border-t border-gray-100 flex items-center justify-between">
                      <span>Người đề xuất: <strong>{prod.recommendedBy}</strong></span>
                      <span className="text-emerald-600 font-semibold">Có sẵn tại kệ Hasaki</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Đóng hồ sơ
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onStartConsultation) {
                onStartConsultation(customer);
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#105e3f] to-[#167850] text-white font-extrabold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Bắt đầu phiên tư vấn chuẩn hóa (5 bước)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
