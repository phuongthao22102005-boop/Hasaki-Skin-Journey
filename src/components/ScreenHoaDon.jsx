import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  Search, 
  FileText, 
  Download, 
  CheckCircle2, 
  X, 
  Receipt, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Award,
  Sparkles,
  Printer,
  User
} from 'lucide-react';

export default function ScreenHoaDon({ 
  user = { name: 'Nguyễn Văn A' }, 
  invoices = [], 
  onBackToHome 
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'clinic' | 'store'
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedVatInvoice, setSelectedVatInvoice] = useState(null);
  const [downloadToast, setDownloadToast] = useState(null);

  const filteredInvoices = invoices.filter(inv => {
    const matchSearch = inv.invoiceCode.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        inv.serviceTitle.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        inv.branch.toLowerCase().includes(searchKeyword.toLowerCase());
    
    if (!matchSearch) return false;
    if (activeFilter === 'clinic') return (inv.serviceType || '').toLowerCase().includes('clinic') || (inv.serviceTitle || '').toLowerCase().includes('khám');
    if (activeFilter === 'store') return (inv.serviceType || '').toLowerCase().includes('cửa hàng') || (inv.serviceTitle || '').toLowerCase().includes('tư vấn');
    return true;
  });

  const handleDownloadInvoice = (invCode) => {
    setDownloadToast(`Đã tải hóa đơn điện tử ${invCode} thành công!`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col bg-[#eff4ef] select-none text-slate-800 overflow-hidden">
      
      {/* Toast Notification */}
      {downloadToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-[12.5px] font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
            <span>Hóa đơn điện tử</span>
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

        {/* Search Bar */}
        <div className="relative flex items-center bg-[#f4f6f4] rounded-full border border-gray-300 px-4 py-2 shadow-xs focus-within:border-[#105e3f] focus-within:bg-white">
          <Search className="w-4 h-4 text-gray-500 mr-2.5 flex-shrink-0" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Tìm theo mã hóa đơn, tên dịch vụ..."
            className="w-full text-[13px] bg-transparent outline-none text-slate-800 placeholder-gray-400 font-medium"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2.5">
          {[
            { id: 'all', label: `Tất cả (${invoices.length})` },
            { id: 'clinic', label: 'Khám Clinic' },
            { id: 'store', label: 'Tư vấn Cửa hàng' }
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-[#105e3f] text-white shadow-xs'
                  : 'bg-[#d2d6d3] text-slate-800 hover:bg-[#c6cbc7]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-24 scroll-smooth">
        
        {/* Hasaki Rewards & Invoices Stats Banner */}
        <div className="bg-gradient-to-r from-[#105e3f] to-[#1e7e57] text-white rounded-3xl p-4 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-200 text-[11px] font-bold uppercase tracking-wider">
                <Receipt className="w-3.5 h-3.5" />
                <span>Quản lý chi tiêu & Hóa đơn</span>
              </div>
              <h3 className="font-extrabold text-[16px] text-white mt-1 leading-snug">
                {user?.name || 'Nguyễn Văn A'}
              </h3>
              <p className="text-[11px] text-emerald-100 mt-0.5">
                Mã thành viên: <strong className="text-white">N18-000001</strong>
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block bg-white/20 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                {invoices.length} Hóa đơn
              </span>
              <div className="text-[10px] text-emerald-100 mt-1 font-medium flex items-center justify-end gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Tích lũy Hasaki Xu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        {filteredInvoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6 bg-white rounded-3xl border border-gray-100">
            <div className="w-20 h-20 rounded-full bg-[#f1f4f1] flex items-center justify-center mb-3">
              <FileText className="w-10 h-10 text-slate-400 stroke-[1.5]" />
            </div>
            <h4 className="font-extrabold text-[15px] text-slate-800">Không tìm thấy hóa đơn</h4>
            <p className="text-[12px] text-slate-500 mt-1 max-w-[260px]">
              Chưa có hóa đơn nào phù hợp với bộ lọc tìm kiếm của bạn.
            </p>
          </div>
        ) : (
          filteredInvoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 hover:border-[#105e3f]/40 transition-all space-y-3"
            >
              {/* Header row: Code & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#105e3f] flex items-center justify-center font-extrabold text-[12px]">
                    H
                  </div>
                  <div>
                    <span className="font-extrabold text-[13px] text-slate-900 tracking-tight">
                      {inv.invoiceCode}
                    </span>
                    <div className="text-[10.5px] text-gray-500">
                      {inv.createdAt}
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold bg-emerald-50 text-[#105e3f] border border-emerald-200">
                  {inv.status}
                </span>
              </div>

              <div className="border-b border-dashed border-gray-200 my-1" />

              {/* Service details */}
              <div>
                <h4 className="font-extrabold text-[14.5px] text-slate-900 leading-snug">
                  {inv.serviceTitle}
                </h4>
                <div className="text-[11.5px] text-gray-600 space-y-0.5 mt-1">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>Phụ trách: <strong>{inv.consultant}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>Lịch hẹn: <strong>{inv.date}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{inv.branch}</span>
                  </div>
                </div>
              </div>

              {/* Price & Payment Method */}
              <div className="bg-[#f7faf8] rounded-xl p-2.5 flex items-center justify-between text-[12px] border border-emerald-50">
                <div>
                  <div className="text-[10px] text-gray-500">Phương thức thanh toán</div>
                  <div className="font-bold text-slate-800">{inv.paymentMethod}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-500">Tổng thanh toán</div>
                  <div className="font-extrabold text-[15px] text-[#105e3f]">{inv.total}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedVatInvoice(inv)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#eaf2ee] hover:bg-[#d8e8de] text-[#105e3f] font-bold text-[12px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Chi tiết VAT</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadInvoice(inv.invoiceCode)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải PDF</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ============================================================== */}
      {/* MODAL: CHI TIẾT HÓA ĐƠN ĐIỆN TỬ GIÁ TRỊ GIA TĂNG (VAT)         */}
      {/* ============================================================== */}
      {selectedVatInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 shadow-2xl w-full max-w-[360px] max-h-[90vh] overflow-y-auto no-scrollbar space-y-3.5">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-2 border-b border-gray-200">
              <div>
                <h4 className="font-extrabold text-[12px] text-[#105e3f] uppercase leading-tight">
                  CÔNG TY CỔ PHẦN HASAKI BEAUTY & CLINIC
                </h4>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  MST: 0313612878 • Hotline: 1800 6324
                </p>
                <p className="text-[9.5px] text-gray-400">
                  71 Hoàng Hoa Thám, P.13, Q. Tân Bình, TP.HCM
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVatInvoice(null)}
                className="p-1 text-gray-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Invoice Title */}
            <div className="text-center py-1">
              <h3 className="font-extrabold text-[15px] text-slate-900 uppercase tracking-wide">
                HÓA ĐƠN GIÁ TRỊ GIA TĂNG
              </h3>
              <p className="text-[10.5px] text-gray-500">
                (Bản thể hiện của hóa đơn điện tử)
              </p>
              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-700 mt-1 font-semibold">
                <span>Ký hiệu: <strong>1C26THS</strong></span>
                <span>•</span>
                <span>Số: <strong className="text-[#105e3f]">{selectedVatInvoice.invoiceCode}</strong></span>
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                Ngày xuất hóa đơn: {selectedVatInvoice.createdAt}
              </div>
            </div>

            {/* Customer Box */}
            <div className="bg-[#f7faf8] rounded-xl p-3 border border-emerald-100 text-[11.5px] space-y-1">
              <div><span className="text-gray-500">Tên người mua:</span> <strong>{selectedVatInvoice.customerName}</strong></div>
              <div><span className="text-gray-500">Mã khách hàng:</span> <strong>{selectedVatInvoice.customerCode}</strong></div>
              <div><span className="text-gray-500">Số điện thoại:</span> <strong>{selectedVatInvoice.customerPhone}</strong></div>
              <div><span className="text-gray-500">Hình thức thanh toán:</span> <strong>{selectedVatInvoice.paymentMethod}</strong></div>
            </div>

            {/* Line items table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden text-[11px]">
              <div className="bg-gray-100 font-extrabold text-slate-800 p-2 grid grid-cols-6 text-center">
                <span className="col-span-3 text-left">Nội dung dịch vụ</span>
                <span className="col-span-1">ĐVT</span>
                <span className="col-span-2 text-right">Thành tiền</span>
              </div>
              <div className="p-2.5 grid grid-cols-6 border-t border-gray-200 items-center">
                <div className="col-span-3 text-left">
                  <div className="font-bold text-slate-900 leading-snug">{selectedVatInvoice.serviceTitle}</div>
                  <div className="text-[9.5px] text-gray-500">{selectedVatInvoice.consultant}</div>
                </div>
                <div className="col-span-1 text-center text-gray-600">Lần</div>
                <div className="col-span-2 text-right font-extrabold text-slate-900">{selectedVatInvoice.total}</div>
              </div>
            </div>

            {/* Tax and Total Breakdown */}
            <div className="space-y-1 text-[11.5px] border-t border-dashed border-gray-300 pt-2 px-1">
              <div className="flex justify-between text-gray-600">
                <span>Cộng tiền dịch vụ:</span>
                <span className="font-bold text-slate-900">{selectedVatInvoice.amount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Thuế suất GTGT (0% / Miễn thuế):</span>
                <span className="font-bold text-slate-900">0đ</span>
              </div>
              <div className="flex justify-between text-[13px] font-extrabold text-[#105e3f] pt-1 border-t border-gray-200">
                <span>TỔNG CỘNG THANH TOÁN:</span>
                <span>{selectedVatInvoice.total}</span>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="bg-[#f0f7f3] border border-emerald-200 rounded-xl p-2.5 flex items-center gap-2.5">
              <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
              <div className="text-[10px] leading-snug text-slate-700">
                <div className="font-bold text-[#105e3f]">HÓA ĐƠN ĐÃ ĐƯỢC KÝ ĐIỆN TỬ</div>
                <div>Ký bởi: Công ty Cổ phần Hasaki Beauty & Clinic</div>
                <div className="text-gray-500">Thời gian ký: {selectedVatInvoice.createdAt}</div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedVatInvoice(null)}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-slate-800 text-[12px] transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadInvoice(selectedVatInvoice.invoiceCode);
                  setSelectedVatInvoice(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#105e3f] hover:bg-[#0c4a31] font-bold text-white text-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Tải PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
