import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HeartPulse, 
  Eye, 
  UserPlus, 
  Activity,
  ChevronRight,
  Stethoscope,
  MapPin,
  Clock,
  Sparkle
} from 'lucide-react';
import CustomerDetailModal from './CustomerDetailModal';

export default function EmployeeCustomerProfiles({
  employeeUser,
  customerProfiles = [],
  consultationRecords = [],
  onUpdateCustomerProfile,
  onStartConsultation,
  showToast
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [skinFilter, setSkinFilter] = useState('all'); // all, acne, pigmentation, sensitive
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Filter profiles based on search query (name, phone, id, concern) and skin concern
  const filteredProfiles = customerProfiles.filter((customer) => {
    const q = searchQuery.toLowerCase().trim();
    const customerName = (customer.name || customer.fullName || '').toLowerCase();
    const customerPhone = customer.phone || '';
    const customerId = (customer.id || customer.customerCode || '').toLowerCase();
    const concernsStr = (customer.primaryConcerns || []).join(' ').toLowerCase();

    const matchQuery = 
      !q ||
      customerName.includes(q) ||
      customerPhone.includes(q) ||
      customerId.includes(q) ||
      concernsStr.includes(q);

    if (!matchQuery) return false;

    if (skinFilter === 'acne') {
      return customer.primaryConcerns?.some((c) => 
        c.toLowerCase().includes('mụn') || c.toLowerCase().includes('sẹo')
      );
    }
    if (skinFilter === 'pigmentation') {
      return customer.primaryConcerns?.some((c) => 
        c.toLowerCase().includes('nám') || c.toLowerCase().includes('sắc tố') || c.toLowerCase().includes('thâm') || c.toLowerCase().includes('tàn nhang')
      );
    }
    if (skinFilter === 'sensitive') {
      return (
        customer.sensitivityLevel?.toLowerCase().includes('nhạy cảm') ||
        customer.skinType?.toLowerCase().includes('nhạy cảm')
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header & Stats Banner */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#105e3f] font-bold text-xs">
            <Users className="w-4 h-4" />
            <span>Hồ Sơ Khách Hàng Đồng Bộ (4 Hồ Sơ Mô Phỏng)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Quản Lý Hồ Sơ Da Khách Hàng
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi chỉ số Visia, phác đồ điều trị Clinic và đồng bộ dữ liệu hai chiều với ứng dụng khách hàng.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
            <span className="text-gray-500 font-medium">Tổng hồ sơ: </span>
            <strong className="text-[#105e3f] font-black">{customerProfiles.length}</strong>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-xs">
            <span className="text-gray-500 font-medium">Hồ sơ VIP: </span>
            <strong className="text-blue-700 font-black">
              {customerProfiles.filter((c) => (c.tier || c.membershipTier)?.includes('VIP')).length}
            </strong>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo Tên khách hàng, Số điện thoại hoặc Mã hồ sơ (VD: Trịnh Phương Thảo, Nguyễn Văn An, 0987...)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-[#105e3f]/20 focus:border-[#105e3f] text-xs text-slate-800"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Quick Concern Filters */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            <button
              type="button"
              onClick={() => setSkinFilter('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                skinFilter === 'all'
                  ? 'bg-[#105e3f] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả (4)
            </button>
            <button
              type="button"
              onClick={() => setSkinFilter('acne')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                skinFilter === 'acne'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              Mụn &amp; Sẹo
            </button>
            <button
              type="button"
              onClick={() => setSkinFilter('pigmentation')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                skinFilter === 'pigmentation'
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              Nám &amp; Sắc tố
            </button>
            <button
              type="button"
              onClick={() => setSkinFilter('sensitive')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                skinFilter === 'sensitive'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              Da nhạy cảm
            </button>
          </div>
        </div>
      </div>

      {/* Customer Profiles Grid (4 Distinct Simulated Profiles) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProfiles.map((customer) => {
          const isThao = customer.id === 'HSK-221005' || customer.name?.includes('PHƯƠNG THẢO');
          const isAn = customer.id === 'HSK-109283' || customer.name?.includes('VĂN AN');
          const isHa = customer.id === 'HSK-204918' || customer.name?.includes('THU HÀ');
          const isKhoi = customer.id === 'HSK-301928' || customer.name?.includes('MINH KHÔI');

          const currentSession = customer.activePackage?.currentSession || 1;
          const totalSessions = customer.activePackage?.totalSessions || 5;
          const progressPercent = customer.activePackage?.progressPercentage || Math.round((currentSession / totalSessions) * 100);

          return (
            <div
              key={customer.id}
              className={`bg-white rounded-3xl border p-5 transition-all shadow-2xs flex flex-col justify-between gap-4 ${
                isThao
                  ? 'border-emerald-300 ring-2 ring-emerald-500/20 bg-emerald-50/15'
                  : 'border-gray-200 hover:border-emerald-200'
              }`}
            >
              {/* Top Row: Avatar & Primary Info */}
              <div className="flex items-start gap-4">
                <img
                  src={customer.avatar || '/images/thao_avatar.jpg'}
                  alt={customer.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/scanned_face.png';
                  }}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-200 shadow-2xs bg-white flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-black text-slate-900 text-base">{customer.name}</h3>
                      {isThao && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#105e3f] text-white">
                          Hồ sơ chính
                        </span>
                      )}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-[#105e3f]">
                      {customer.tier || customer.membershipTier || 'VIP'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Phone className="w-3 h-3 text-emerald-600" />
                      {customer.phone}
                    </span>
                    <span>•</span>
                    <span>Mã: <strong className="text-slate-800">{customer.id}</strong></span>
                    <span>•</span>
                    <span>{customer.gender || 'Nữ'}, {customer.age || '21'}t</span>
                  </div>

                  <div className="text-xs font-semibold text-[#105e3f] truncate">
                    {customer.skinType}
                  </div>

                  {/* Progress Bar of Treatment Package */}
                  <div className="pt-1.5">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500 font-medium truncate max-w-[200px]">
                        {customer.activePackage?.name || 'Gói điều trị da'}
                      </span>
                      <strong className="text-[#105e3f] flex-shrink-0">
                        {currentSession}/{totalSessions} buổi ({progressPercent}%)
                      </strong>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-[#105e3f] rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Row: Skin Metrics & Clinical Highlights */}
              <div className="space-y-2 pt-1 text-xs">
                {/* 4 Mini Metrics Pills */}
                <div className="grid grid-cols-4 gap-1.5 text-center text-[10.5px]">
                  <div className="p-1.5 rounded-xl bg-blue-50/70 border border-blue-100">
                    <span className="text-blue-600 font-medium block">Độ ẩm</span>
                    <strong className="text-blue-900 font-black text-xs">{customer.skinMetrics?.hydration || 50}%</strong>
                  </div>
                  <div className="p-1.5 rounded-xl bg-amber-50/70 border border-amber-100">
                    <span className="text-amber-600 font-medium block">Tuyến dầu</span>
                    <strong className="text-amber-900 font-black text-xs">{customer.skinMetrics?.oilLevel || 70}%</strong>
                  </div>
                  <div className="p-1.5 rounded-xl bg-purple-50/70 border border-purple-100">
                    <span className="text-purple-600 font-medium block">Sắc tố</span>
                    <strong className="text-purple-900 font-black text-xs">{customer.skinMetrics?.pigmentation || 40}%</strong>
                  </div>
                  <div className="p-1.5 rounded-xl bg-rose-50/70 border border-rose-100">
                    <span className="text-rose-600 font-medium block">Nhạy cảm</span>
                    <strong className="text-rose-900 font-black text-xs">{customer.skinMetrics?.sensitivity || 30}%</strong>
                  </div>
                </div>

                {/* Primary Concerns Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {(customer.primaryConcerns || []).map((concern, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60"
                    >
                      {concern}
                    </span>
                  ))}
                </div>

                {/* Doctor Note Snippet */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-[11.5px] text-slate-700 line-clamp-2">
                  <strong className="text-slate-900">Bác sĩ phụ trách: </strong>
                  <span className="text-[#105e3f] font-bold">{customer.assignedDoctor || customer.primaryDoctor}</span>
                  <span className="text-slate-500"> • {customer.primaryBranch}</span>
                  <div className="text-slate-600 mt-1 line-clamp-1 italic">
                    "{customer.doctorNotes || 'Đang duy trì liệu trình chăm sóc da chuẩn y khoa.'}"
                  </div>
                </div>
              </div>

              {/* Bottom Row: Actions */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(customer)}
                  className="px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#105e3f]" />
                  <span>Chi tiết hồ sơ (5 Tabs)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onStartConsultation(customer)}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#105e3f] to-[#167850] hover:opacity-95 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Tư vấn chuẩn hóa</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredProfiles.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-gray-200 text-gray-500 text-xs">
            Không tìm thấy hồ sơ khách hàng nào khớp với từ khóa "{searchQuery}".
          </div>
        )}
      </div>

      {/* 5-Tab Customer Detail Modal */}
      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          consultationRecords={consultationRecords}
          employeeUser={employeeUser}
          onClose={() => setSelectedCustomer(null)}
          onStartConsultation={(cust) => {
            setSelectedCustomer(null);
            onStartConsultation(cust);
          }}
          onUpdateCustomer={(updated) => {
            if (onUpdateCustomerProfile) {
              onUpdateCustomerProfile(updated);
            }
            setSelectedCustomer(updated);
            if (showToast) showToast('Đã cập nhật hồ sơ khách hàng và đồng bộ hai chiều!');
          }}
        />
      )}

    </div>
  );
}
