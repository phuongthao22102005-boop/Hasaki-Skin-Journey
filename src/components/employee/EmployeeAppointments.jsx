import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  Search, 
  Filter, 
  Check, 
  X, 
  Eye, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare,
  Building,
  User,
  ArrowRight,
  Edit2
} from 'lucide-react';
import CustomerDetailModal from './CustomerDetailModal';

export default function EmployeeAppointments({
  employeeUser,
  bookingSlips = [],
  customerProfiles = [],
  onUpdateBookingSlip,
  onStartConsultation,
  showToast
}) {
  const [statusFilter, setStatusFilter] = useState('all'); // all, da_thanh_toan (pending), da_tiep_nhan (confirmed), da_kham (completed), da_huy (cancelled)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointmentDetail, setSelectedAppointmentDetail] = useState(null);
  const [selectedCustomerModal, setSelectedCustomerModal] = useState(null);
  const [prepNoteText, setPrepNoteText] = useState('');
  const [isEditingPrepNote, setIsEditingPrepNote] = useState(false);

  // Filter bookings
  const filteredList = bookingSlips.filter((appt) => {
    // Status filter
    if (statusFilter !== 'all' && appt.status !== statusFilter) return false;

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const matchCustomer = appt.customerName?.toLowerCase().includes(q);
      const matchService = appt.serviceName?.toLowerCase().includes(q);
      const matchPhone = appt.customerPhone?.includes(q);
      if (!matchCustomer && !matchService && !matchPhone) return false;
    }

    return true;
  });

  const handleConfirm = (id) => {
    if (onUpdateBookingSlip) {
      onUpdateBookingSlip(id, {
        status: 'da_tiep_nhan',
        confirmedBy: employeeUser?.name || 'Nhân viên Hasaki',
        confirmedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      });
      if (showToast) showToast('Đã xác nhận lịch hẹn! Khách hàng sẽ thấy trạng thái "ĐÃ TIẾP NHẬN" trên ứng dụng.');
    }
  };

  const handleReject = (id, reason = 'Bác sĩ bận lịch phẫu thuật đột xuất') => {
    if (onUpdateBookingSlip) {
      onUpdateBookingSlip(id, {
        status: 'da_huy',
        cancelledReason: reason,
        cancelledBy: employeeUser?.name || 'Nhân viên Hasaki'
      });
      if (showToast) showToast('Đã cập nhật trạng thái "ĐÃ HỦY". Đã đồng bộ với ứng dụng khách hàng.');
    }
  };

  const handleSavePrepNote = (id) => {
    if (onUpdateBookingSlip) {
      onUpdateBookingSlip(id, {
        prepNotes: prepNoteText,
        lastPrepNoteBy: employeeUser?.name || 'Nhân viên Hasaki'
      });
      setIsEditingPrepNote(false);
      if (selectedAppointmentDetail) {
        setSelectedAppointmentDetail({
          ...selectedAppointmentDetail,
          prepNotes: prepNoteText
        });
      }
      if (showToast) showToast('Đã lưu ghi chú chuẩn bị trước buổi tư vấn!');
    }
  };

  const handleOpenCustomerDetail = (name) => {
    const cust = customerProfiles.find((c) => c.name === name) || customerProfiles[0];
    setSelectedCustomerModal(cust);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#105e3f] font-bold text-xs">
            <CalendarDays className="w-4 h-4" />
            <span>Quản Lý Ca Hẹn &amp; Tiếp Nhận Khách Hàng</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Lịch Hẹn Khách Hàng
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Xác nhận, hủy hoặc chuẩn bị hồ sơ đón tiếp khách hàng tại các phòng khám &amp; quầy tư vấn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Đồng bộ hai chiều:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#105e3f]">
            <CheckCircle2 className="w-3.5 h-3.5" /> Live Sync
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo Tên khách hàng, Dịch vụ hoặc Số điện thoại..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-[#105e3f]/20 focus:border-[#105e3f] text-xs text-slate-800"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-[#105e3f] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả ({bookingSlips.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('da_thanh_toan')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'da_thanh_toan'
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              Chờ xác nhận ({bookingSlips.filter((b) => b.status === 'da_thanh_toan').length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('da_tiep_nhan')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'da_tiep_nhan'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              Đã xác nhận ({bookingSlips.filter((b) => b.status === 'da_tiep_nhan').length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('da_kham')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'da_kham'
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              Đã khám ({bookingSlips.filter((b) => b.status === 'da_kham').length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('da_huy')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'da_huy'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              Đã hủy ({bookingSlips.filter((b) => b.status === 'da_huy').length})
            </button>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredList.map((item) => {
          const isPending = item.status === 'da_thanh_toan';
          const isConfirmed = item.status === 'da_tiep_nhan';
          const isCompleted = item.status === 'da_kham';
          const isCancelled = item.status === 'da_huy';

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-2xs hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Column */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#105e3f] font-black text-lg flex-shrink-0">
                  {item.customerName ? item.customerName.charAt(0) : 'H'}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{item.customerName}</h3>
                    <span className="text-xs text-slate-500 font-semibold">{item.customerPhone || '0987 221 005'}</span>

                    {/* Status Badges */}
                    {isPending && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800">
                        Chờ xác nhận
                      </span>
                    )}
                    {isConfirmed && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-800">
                        Đã tiếp nhận
                      </span>
                    )}
                    {isCompleted && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-100 text-purple-800">
                        Đã khám xong
                      </span>
                    )}
                    {isCancelled && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-100 text-rose-800">
                        Đã hủy
                      </span>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-[#105e3f]">
                    {item.serviceName}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {item.date} • {item.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-gray-400" />
                      {item.branchName || 'Hasaki Clinic Quận 7'}
                    </span>
                    {item.doctorNotes && (
                      <>
                        <span>•</span>
                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-medium">
                          {item.doctorNotes}
                        </span>
                      </>
                    )}
                  </div>

                  {item.prepNotes && (
                    <div className="text-[11.5px] text-blue-800 bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-200 mt-1">
                      <strong>Ghi chú chuẩn bị:</strong> {item.prepNotes}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                {/* View Details */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAppointmentDetail(item);
                    setPrepNoteText(item.prepNotes || '');
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Chi tiết ca hẹn</span>
                </button>

                {/* View Customer Profile */}
                <button
                  type="button"
                  onClick={() => handleOpenCustomerDetail(item.customerName)}
                  className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#105e3f] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem hồ sơ da</span>
                </button>

                {/* Action buttons based on status */}
                {isPending && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleConfirm(item.id)}
                      className="px-3.5 py-2 rounded-xl bg-[#105e3f] hover:bg-[#167850] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Xác nhận</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReject(item.id)}
                      className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer border border-rose-200"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Từ chối</span>
                    </button>
                  </>
                )}

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
              </div>
            </div>
          );
        })}

        {filteredList.length === 0 && (
          <div className="py-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500 text-xs">
            Không tìm thấy ca hẹn nào phù hợp.
          </div>
        )}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointmentDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4 border border-gray-100">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase">Chi tiết ca hẹn #{selectedAppointmentDetail.id}</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{selectedAppointmentDetail.customerName}</h3>
                <p className="text-xs text-gray-500">{selectedAppointmentDetail.customerPhone} • {selectedAppointmentDetail.serviceName}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppointmentDetail(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div>
                  <span className="text-gray-500 block">Thời gian hẹn:</span>
                  <strong className="text-slate-800">{selectedAppointmentDetail.date} lúc {selectedAppointmentDetail.time}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Chi nhánh tiếp nhận:</span>
                  <strong className="text-slate-800">{selectedAppointmentDetail.branchName || 'Hasaki Clinic Quận 7'}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Trạng thái:</span>
                  <strong className="text-emerald-700 capitalize">{selectedAppointmentDetail.status}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Nhân viên phụ trách:</span>
                  <strong className="text-slate-800">{selectedAppointmentDetail.confirmedBy || employeeUser?.name || 'BS. CKI Vũ Hoài Nam'}</strong>
                </div>
              </div>

              {/* Pre-consultation Preparation Notes */}
              <div className="p-3.5 rounded-2xl border border-gray-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 text-[12.5px] flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#105e3f]" />
                    Ghi chú chuẩn bị trước buổi tư vấn
                  </strong>
                  {!isEditingPrepNote ? (
                    <button
                      type="button"
                      onClick={() => setIsEditingPrepNote(true)}
                      className="text-xs text-[#105e3f] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" /> Chỉnh sửa
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSavePrepNote(selectedAppointmentDetail.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#105e3f] text-white text-xs font-bold hover:bg-[#167850] cursor-pointer"
                    >
                      Lưu ghi chú
                    </button>
                  )}
                </div>

                {isEditingPrepNote ? (
                  <textarea
                    rows={3}
                    value={prepNoteText}
                    onChange={(e) => setPrepNoteText(e.target.value)}
                    placeholder="Ghi chú thiết bị cần chuẩn bị, soi da Visia, hoặc dị ứng cần test trước..."
                    className="w-full p-2.5 rounded-xl border border-emerald-300 text-xs focus:ring-2 focus:ring-[#105e3f]/20 focus:outline-hidden"
                  />
                ) : (
                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                    {selectedAppointmentDetail.prepNotes || 'Chuẩn bị đầu soi Visia chuyên sâu và bộ dụng cụ tiệt trùng lấy mụn y khoa.'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  const custName = selectedAppointmentDetail.customerName;
                  setSelectedAppointmentDetail(null);
                  handleOpenCustomerDetail(custName);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Mở đầy đủ Hồ sơ da</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAppointmentDetail(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
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
            if (showToast) showToast('Đã cập nhật hồ sơ khách hàng thành công!');
          }}
        />
      )}

    </div>
  );
}
