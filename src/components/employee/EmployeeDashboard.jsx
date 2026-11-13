import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  ClipboardCheck, 
  ArrowRight, 
  Filter, 
  Sparkles, 
  Check, 
  X, 
  Eye, 
  BookOpen, 
  UserCheck, 
  TrendingUp,
  Search,
  BellRing
} from 'lucide-react';
import CustomerDetailModal from './CustomerDetailModal';

export default function EmployeeDashboard({
  employeeUser,
  bookingSlips = [],
  customerProfiles = [],
  onNavigateAppointments,
  onNavigateCustomers,
  onNavigateKnowledge,
  onStartConsultation,
  onUpdateBookingSlip,
  showToast
}) {
  const [dateFilter, setDateFilter] = useState('today'); // 'today', 'tomorrow', 'all'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'da_thanh_toan', 'da_tiep_nhan', 'da_kham'
  const [selectedCustomerModal, setSelectedCustomerModal] = useState(null);

  // Statistics calculation
  const totalAppointments = bookingSlips.length;
  const pendingAppointments = bookingSlips.filter((b) => b.status === 'da_thanh_toan').length;
  const confirmedAppointments = bookingSlips.filter((b) => b.status === 'da_tiep_nhan').length;
  const completedAppointments = bookingSlips.filter((b) => b.status === 'da_kham').length;

  // Filtered upcoming list
  const filteredBookings = bookingSlips.filter((item) => {
    // Status filter
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    return true;
  });

  const handleQuickConfirm = (bookingId) => {
    if (onUpdateBookingSlip) {
      onUpdateBookingSlip(bookingId, { 
        status: 'da_tiep_nhan',
        confirmedBy: employeeUser?.name || 'Nhân viên Hasaki',
        confirmedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      });
      if (showToast) showToast('Đã xác nhận lịch hẹn thành công! Đã gửi thông báo đến khách hàng.');
    }
  };

  const handleQuickReject = (bookingId) => {
    if (onUpdateBookingSlip) {
      onUpdateBookingSlip(bookingId, { 
        status: 'da_huy',
        cancelledReason: 'Bác sĩ bận ca phẫu thuật đột xuất, hẹn dời lịch',
        cancelledBy: employeeUser?.name || 'Nhân viên Hasaki'
      });
      if (showToast) showToast('Đã hủy lịch hẹn. Hệ thống đã cập nhật trạng thái hủy.');
    }
  };

  const handleOpenCustomerDetailByName = (customerName) => {
    const found = customerProfiles.find((p) => p.name === customerName) || customerProfiles[0];
    setSelectedCustomerModal(found);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#105e3f] via-[#167850] to-[#0d4f34] rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Cổng Điều Hành Chuyên Môn Hasaki</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
            Xin chào, {employeeUser?.name || 'BS. CKI Vũ Hoài Nam'}!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Hôm nay bạn có <strong className="text-white underline">{pendingAppointments} lịch hẹn</strong> đang chờ xác nhận và <strong className="text-white underline">{confirmedAppointments} ca tư vấn</strong> đã xếp lịch tại {employeeUser?.department || 'Hasaki Clinic'}.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onStartConsultation(customerProfiles[0])}
              className="px-4 py-2 rounded-xl bg-white text-[#105e3f] font-extrabold text-xs flex items-center gap-2 shadow-xs hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4 text-[#105e3f]" />
              <span>Bắt đầu phiên tư vấn mới</span>
            </button>
            <button
              type="button"
              onClick={onNavigateKnowledge}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-200" />
              <span>Tra cứu Knowledge Hub</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute -right-8 -bottom-10 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute right-32 -top-12 w-40 h-40 rounded-full bg-emerald-400/10 pointer-events-none" />
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Lịch hẹn hôm nay</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-[#105e3f]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalAppointments}</div>
          <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 100% đồng bộ từ Khách hàng
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Đang chờ xác nhận</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">{pendingAppointments}</div>
          <div className="text-[11px] font-medium text-amber-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Cần duyệt trước giờ hẹn
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Đã xác nhận tiếp nhận</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600">{confirmedAppointments}</div>
          <div className="text-[11px] font-medium text-blue-600">Sẵn sàng tiếp đón tại chi nhánh</div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Đã khám / Hoàn tất</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-700">{completedAppointments}</div>
          <div className="text-[11px] font-medium text-purple-600">Đã lưu hồ sơ lâm sàng</div>
        </div>
      </div>

      {/* Filter Bar & Section Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#105e3f]" />
          <h2 className="text-sm font-black text-slate-900">Danh Sách Lịch Hẹn Sắp Tới</h2>
          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-slate-100 text-slate-700">
            {filteredBookings.length} lịch
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#105e3f] text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('da_thanh_toan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'da_thanh_toan'
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            Chờ duyệt ({pendingAppointments})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('da_tiep_nhan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'da_tiep_nhan'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Đã tiếp nhận ({confirmedAppointments})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('da_kham')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'da_kham'
                ? 'bg-purple-600 text-white shadow-2xs'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            Đã khám ({completedAppointments})
          </button>
        </div>
      </div>

      {/* Upcoming Appointments Table / Cards */}
      <div className="space-y-3">
        {filteredBookings.map((item) => {
          const isPending = item.status === 'da_thanh_toan';
          const isConfirmed = item.status === 'da_tiep_nhan';
          const isCompleted = item.status === 'da_kham';
          const isCancelled = item.status === 'da_huy';

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-2xs hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Column: Customer & Service Info */}
              <div className="flex items-start gap-3 sm:gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#105e3f] font-black text-lg flex-shrink-0">
                  {item.customerName ? item.customerName.charAt(0) : 'H'}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{item.customerName}</h3>
                    <span className="text-xs text-slate-500 font-medium">({item.customerPhone || '0987 221 005'})</span>
                    
                    {/* Status Badge */}
                    {isPending && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800">
                        Chờ xác nhận
                      </span>
                    )}
                    {isConfirmed && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-800">
                        Đã xác nhận
                      </span>
                    )}
                    {isCompleted && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-100 text-purple-800">
                        Đã hoàn tất
                      </span>
                    )}
                    {isCancelled && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-100 text-rose-800">
                        Đã hủy
                      </span>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-[#105e3f] flex items-center gap-1.5">
                    <span>{item.serviceName}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <strong>{item.date}</strong> lúc <strong>{item.time}</strong>
                    </span>
                    <span>•</span>
                    <span className="text-slate-600">{item.branchName || 'Hasaki Clinic Quận 7'}</span>
                  </div>

                  {item.doctorNotes && (
                    <div className="text-[11.5px] text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200 mt-1">
                      <strong>Lưu ý:</strong> {item.doctorNotes}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                {/* View Customer Profile */}
                <button
                  type="button"
                  onClick={() => handleOpenCustomerDetailByName(item.customerName)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Xem hồ sơ da khách hàng"
                >
                  <Eye className="w-3.5 h-3.5 text-[#105e3f]" />
                  <span>Hồ sơ da</span>
                </button>

                {/* If Pending: Confirm or Reject */}
                {isPending && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleQuickConfirm(item.id)}
                      className="px-3.5 py-2 rounded-xl bg-[#105e3f] hover:bg-[#167850] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Xác nhận</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickReject(item.id)}
                      className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer border border-rose-200"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Từ chối</span>
                    </button>
                  </>
                )}

                {/* If Confirmed: Start Consultation */}
                {isConfirmed && (
                  <button
                    type="button"
                    onClick={() => {
                      const cust = customerProfiles.find((c) => c.name === item.customerName) || customerProfiles[0];
                      onStartConsultation(cust, item);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#105e3f] to-[#167850] hover:opacity-95 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Bắt đầu tư vấn</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                {/* If Completed: View Notes */}
                {isCompleted && (
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-2 rounded-xl border border-purple-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã lưu bệnh án
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 text-gray-500 text-xs">
            Không có lịch hẹn nào phù hợp với bộ lọc hiện tại.
          </div>
        )}
      </div>

      {/* Customer Detail Modal if opened */}
      {selectedCustomerModal && (
        <CustomerDetailModal
          customer={selectedCustomerModal}
          employeeUser={employeeUser}
          onClose={() => setSelectedCustomerModal(null)}
          onStartConsultation={(cust) => {
            setSelectedCustomerModal(null);
            onStartConsultation(cust);
          }}
          onUpdateCustomer={(updated) => {
            if (showToast) showToast('Đã lưu thông tin hồ sơ da và đồng bộ đến khách hàng!');
          }}
        />
      )}

    </div>
  );
}
