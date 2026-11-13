import React, { useState } from 'react';
import { 
  History, 
  GitCompare, 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  Store, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  FileText, 
  Plus
} from 'lucide-react';

export default function EmployeeConsultationHistory({
  employeeUser,
  consultationRecords = [],
  customerProfiles = [],
  onStartNewConsultation
}) {
  const [selectedCustomerId, setSelectedCustomerId] = useState('HSK-221005'); // Default: Trịnh Phương Thảo
  const [activeMode, setActiveMode] = useState('timeline'); // 'timeline' or 'compare'
  
  // Records for chosen customer
  const customerRecords = consultationRecords.filter(
    (c) => c.customerId === selectedCustomerId || (!c.customerId && selectedCustomerId === 'HSK-221005')
  );

  // Comparison State
  const [compareSessionAId, setCompareSessionAId] = useState(
    customerRecords[0]?.id || 'CNS-001'
  );
  const [compareSessionBId, setCompareSessionBId] = useState(
    customerRecords[customerRecords.length - 1]?.id || 'CNS-004'
  );

  const sessionA = consultationRecords.find((c) => c.id === compareSessionAId) || customerRecords[0];
  const sessionB = consultationRecords.find((c) => c.id === compareSessionBId) || customerRecords[customerRecords.length - 1];

  const activeCustomer = customerProfiles.find((c) => c.id === selectedCustomerId) || customerProfiles[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#105e3f] font-bold text-xs">
            <History className="w-4 h-4" />
            <span>Lịch Sử Tư Vấn &amp; Nhật Ký Tiến Trình Da</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Lịch Sử &amp; So Sánh Các Lần Khám
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Mỗi phiên tư vấn được bảo lưu độc lập, cho phép so sánh tiến triển lâm sàng và giải thích lý do điều chỉnh phác đồ.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveMode('timeline')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'timeline'
                ? 'bg-[#105e3f] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Dòng thời gian (Timeline)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('compare')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'compare'
                ? 'bg-[#105e3f] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>So sánh 2 phiên khám</span>
          </button>
        </div>
      </div>

      {/* Customer Quick Selector */}
      <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Khách hàng:</span>
          <select
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            className="p-2 rounded-xl border border-gray-200 text-xs font-extrabold text-[#105e3f] bg-white cursor-pointer focus:outline-hidden"
          >
            {customerProfiles.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} - {c.phone} ({c.id})
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={onStartNewConsultation}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#105e3f] font-bold text-xs flex items-center gap-1.5 border border-emerald-200 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tạo phiên tư vấn mới cho khách này</span>
        </button>
      </div>

      {/* MODE 1: TIMELINE LIST */}
      {activeMode === 'timeline' && (
        <div className="space-y-4">
          <div className="text-xs font-bold text-gray-500">
            Tổng cộng: {customerRecords.length} phiên tư vấn được ghi nhận cho {activeCustomer?.name}
          </div>

          <div className="space-y-3.5 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-emerald-100">
            {customerRecords.map((record, idx) => {
              const isClinic = record.channel === 'clinic';
              return (
                <div
                  key={record.id || idx}
                  className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-2xs hover:border-emerald-300 transition-all ml-12 relative"
                >
                  {/* Timeline bullet icon */}
                  <div className={`absolute -left-12 top-6 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-black shadow-xs ${
                    isClinic ? 'bg-[#105e3f] text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {idx + 1}
                  </div>

                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black text-slate-900 text-sm sm:text-base">
                        Phiên #{record.sessionNumber || idx + 1}: {record.service}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                        isClinic ? 'bg-emerald-100 text-[#105e3f]' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {isClinic ? '🏥 Hasaki Clinic' : '🏬 Hasaki Retail Store'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{record.date}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{record.time || '10:00'}</span>
                    </div>
                  </div>

                  {/* Staff & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3 text-slate-600">
                    <div>
                      <span className="text-gray-400">Người phụ trách:</span>{' '}
                      <strong className="text-slate-800">{record.staffName || record.doctorName}</strong>
                      <span className="text-gray-400"> ({record.staffRole || 'Chuyên viên'})</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Địa điểm:</span>{' '}
                      <strong className="text-slate-800">{record.location}</strong>
                    </div>
                  </div>

                  {/* Skin Condition & Assessment */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-2 mb-3">
                    <div>
                      <strong className="text-slate-800 block mb-0.5">Tình trạng da lâm sàng ghi nhận:</strong>
                      <p className="text-slate-600 leading-relaxed">{record.skinCondition || record.diagnosis}</p>
                    </div>

                    {record.metricsSnapshot && (
                      <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-slate-200 text-[11.5px]">
                        <span>Độ ẩm: <strong className="text-blue-600">{record.metricsSnapshot.hydration}%</strong></span>
                        <span>•</span>
                        <span>Độ dầu: <strong className="text-amber-600">{record.metricsSnapshot.oil}%</strong></span>
                        <span>•</span>
                        <span>Nhạy cảm: <strong className="text-rose-600">{record.metricsSnapshot.sensitivity}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Recommended Products or Treatments */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-xs space-y-2">
                    <strong className="text-[#105e3f] block mb-0.5">
                      Chỉ định phác đồ &amp; Sản phẩm khuyên dùng:
                    </strong>
                    <p className="text-slate-700 leading-relaxed">{record.recommendations}</p>

                    {record.recommendedItems && record.recommendedItems.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {record.recommendedItems.map((item, itemIdx) => (
                          <div key={itemIdx} className="p-2.5 rounded-xl bg-white border border-emerald-100 text-xs space-y-1">
                            <strong className="text-slate-900 block truncate">{item.name}</strong>
                            <p className="text-[11px] text-gray-500 line-clamp-1">{item.clinicalReason}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Handover note if present */}
                  {record.handoverNote && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                      <Layers className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Bàn giao ca:</strong> Đã bàn giao cho <strong>{record.handoverTo || 'Bác sĩ phụ trách kế tiếp'}</strong>.
                        <p className="text-amber-800 text-[11.5px] mt-0.5">{record.handoverNote}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: SIDE-BY-SIDE COMPARISON */}
      {activeMode === 'compare' && (
        <div className="space-y-5">
          {/* Selectors for Session A and Session B */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Chọn Phiên Khám 1 (Trước):
              </label>
              <select
                value={compareSessionAId}
                onChange={(e) => setCompareSessionAId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold text-slate-800 bg-white"
              >
                {customerRecords.map((r) => (
                  <option key={r.id} value={r.id}>
                    Phiên #{r.sessionNumber}: {r.date} - {r.service} ({r.staffName})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Chọn Phiên Khám 2 (Sau):
              </label>
              <select
                value={compareSessionBId}
                onChange={(e) => setCompareSessionBId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#105e3f] bg-white"
              >
                {customerRecords.map((r) => (
                  <option key={r.id} value={r.id}>
                    Phiên #{r.sessionNumber}: {r.date} - {r.service} ({r.staffName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Session A Column */}
            <div className="bg-white rounded-3xl border border-gray-200 p-5 space-y-4 shadow-2xs">
              <div className="border-b border-gray-100 pb-3">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                  Phiên ban đầu (#{sessionA?.sessionNumber || 1})
                </span>
                <h3 className="font-black text-slate-900 text-base mt-2">{sessionA?.service}</h3>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <span>{sessionA?.date}</span>
                  <span>•</span>
                  <span>{sessionA?.staffName}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <strong className="text-slate-800 block">Chỉ số da thời điểm này:</strong>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Độ ẩm:</span>
                    <strong className="text-slate-800">{sessionA?.metricsSnapshot?.hydration || 38}% (Thiếu nước nghiêm trọng)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tuyến dầu:</span>
                    <strong className="text-slate-800">{sessionA?.metricsSnapshot?.oil || 88}% (Tăng tiết dầu quá mức)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nhạy cảm:</span>
                    <strong className="text-rose-600">{sessionA?.metricsSnapshot?.sensitivity || 'Cao (Dễ châm chích)'}</strong>
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="text-xs space-y-1">
                <strong className="text-slate-800 block">Chẩn đoán tình trạng:</strong>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {sessionA?.skinCondition || sessionA?.diagnosis}
                </p>
              </div>

              {/* Recommendations */}
              <div className="text-xs space-y-1">
                <strong className="text-slate-800 block">Phác đồ áp dụng:</strong>
                <p className="text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                  {sessionA?.recommendations}
                </p>
              </div>
            </div>

            {/* Session B Column */}
            <div className="bg-white rounded-3xl border-2 border-emerald-400 p-5 space-y-4 shadow-2xs">
              <div className="border-b border-emerald-100 pb-3">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-emerald-100 text-[#105e3f]">
                  Phiên hiện tại (#{sessionB?.sessionNumber || 4})
                </span>
                <h3 className="font-black text-slate-900 text-base mt-2">{sessionB?.service}</h3>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <span>{sessionB?.date}</span>
                  <span>•</span>
                  <span>{sessionB?.staffName}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2 text-xs">
                <strong className="text-[#105e3f] block">Chỉ số da thời điểm này:</strong>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Độ ẩm:</span>
                    <strong className="text-emerald-700">{sessionB?.metricsSnapshot?.hydration || 62}% (Tăng +24% đạt chuẩn)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tuyến dầu:</span>
                    <strong className="text-emerald-700">{sessionB?.metricsSnapshot?.oil || 70}% (Giảm tiết nhờn 18%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nhạy cảm:</span>
                    <strong className="text-emerald-700">{sessionB?.metricsSnapshot?.sensitivity || 'Nhẹ / Ổn định'}</strong>
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="text-xs space-y-1">
                <strong className="text-slate-800 block">Chẩn đoán tình trạng:</strong>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {sessionB?.skinCondition || sessionB?.diagnosis}
                </p>
              </div>

              {/* Recommendations */}
              <div className="text-xs space-y-1">
                <strong className="text-[#105e3f] block">Phác đồ cập nhật mới:</strong>
                <p className="text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                  {sessionB?.recommendations}
                </p>
              </div>
            </div>
          </div>

          {/* Clinical Difference Analysis Box (Section 6 Requirement) */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#105e3f]" />
              <h4 className="font-black text-sm sm:text-base text-slate-900">
                Phân Tích Chuyên Môn: Vì sao Phác đồ có sự thay đổi giữa 2 buổi?
              </h4>
            </div>

            <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <p>
                <strong>1. Chuyển dịch giai đoạn điều trị:</strong> Ở Phiên #{sessionA?.sessionNumber || 1}, da đang bùng phát mụn ẩn và tổn thương hàng rào bảo vệ, do đó ưu tiên hàng đầu là <em>làm sạch cồi mụn, giảm viêm cục bộ và ngưng hoàn toàn treatment kích ứng</em>.
              </p>
              <p>
                <strong>2. Đáp ứng phục hồi tốt ở Phiên #{sessionB?.sessionNumber || 4}:</strong> Độ ẩm tầng sừng đã tăng từ 38% lên 62%, hàng rào lipid đã ổn định. Bác sĩ chỉ định chuyển hướng sang <em>điện di phục hồi Ceramide kết hợp chống nắng Mexoryl 400</em> để ngăn ngừa tăng sắc tố sau viêm (PIH) và chuẩn bị da cho liệu trình trẻ hóa tiếp theo.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
