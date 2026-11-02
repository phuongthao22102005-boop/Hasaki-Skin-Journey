import React, { useState } from 'react';
import { ArrowLeft, Home, Star, Send, CheckCircle2, MessageSquare, Clock, X } from 'lucide-react';

export default function ScreenLangNghe({ onBackToHome }) {
  // Tabs: 'feedback' (Chia sẻ phản hồi - Hình 4) or 'history' (Lịch sử)
  const [activeTab, setActiveTab] = useState('feedback');

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('Dịch vụ Clinic & Spa');
  const [content, setContent] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  // Feedbacks history
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      category: 'Tư vấn soi da',
      rating: 5,
      content: 'Bác sĩ và chuyên viên tư vấn rất tận tâm, phác đồ rõ ràng!',
      date: '28/10/2026'
    }
  ]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSubmitFeedback = (e) => {
    if (e) e.preventDefault();
    if (!content.trim()) {
      alert('Vui lòng nhập nội dung ý kiến đóng góp của bạn');
      return;
    }

    const newFeedback = {
      id: Date.now(),
      category,
      rating,
      content: content.trim(),
      date: new Date().toLocaleDateString('vi-VN')
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setContent('');
    setIsFormOpen(false);
    showToast('Cảm ơn bạn! Hasaki đã tiếp nhận ý kiến đóng góp của bạn.');
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between bg-[#f2f6f3] select-none text-slate-800">
      
      {/* Toast */}
      {toastMsg && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-[#0c6543] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg animate-fade-in flex items-center gap-1.5 whitespace-nowrap">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full flex-1 flex flex-col p-5 pb-10">
        
        {/* Top Navigation Bar matching Hình 4 */}
        <div className="flex items-center justify-between pt-2 pb-4">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-[#155238] font-bold text-[17px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.6]" />
            <span>Lắng nghe khách hàng</span>
          </button>

          <button
            onClick={onBackToHome}
            className="text-[#155238] hover:opacity-80 transition-opacity p-1 cursor-pointer"
            aria-label="Trang chủ"
          >
            <Home className="w-6 h-6 stroke-[2.4]" />
          </button>
        </div>

        {/* Sub-bar Tabs matching Hình 4 */}
        <div className="w-full bg-white rounded-2xl p-1.5 flex items-center shadow-xs border border-emerald-900/[0.04]">
          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 py-2 rounded-xl text-center font-bold text-[13.5px] transition-all cursor-pointer ${
              activeTab === 'feedback'
                ? 'bg-[#0c6543] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chia sẻ phản hồi
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 rounded-xl text-center font-bold text-[13.5px] transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#0c6543] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lịch sử ({feedbacks.length})
          </button>
        </div>

        {/* TAB 1: Chia sẻ phản hồi (Hình 4) */}
        {activeTab === 'feedback' && (
          <div className="my-auto flex flex-col items-center justify-center w-full px-2">
            {/* Center Button matching Hình 4 */}
            <button
              onClick={() => setIsFormOpen(true)}
              className="w-full max-w-[320px] h-[54px] bg-[#0c6543] hover:bg-[#095236] active:scale-98 rounded-[20px] text-white font-bold text-[16px] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              + Thêm chia sẻ phản hồi
            </button>

            <p className="text-xs text-slate-500 mt-4 text-center max-w-[280px] leading-relaxed">
              Mỗi ý kiến đóng góp của bạn là động lực để Hasaki không ngừng nâng cao chất lượng dịch vụ.
            </p>
          </div>
        )}

        {/* TAB 2: Lịch sử phản hồi */}
        {activeTab === 'history' && (
          <div className="mt-5 space-y-3 flex-1 overflow-y-auto no-scrollbar">
            {feedbacks.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-xs border border-emerald-900/[0.04]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#0c6543] bg-emerald-50 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <div className="flex items-center text-amber-400 text-xs gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-slate-800 text-[13px] leading-relaxed mt-1">
                  {item.content}
                </p>

                <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.date} • Đã ghi nhận</span>
                </div>
              </div>
            ))}

            <button
              onClick={() => { setActiveTab('feedback'); setIsFormOpen(true); }}
              className="w-full py-3 rounded-xl border border-dashed border-emerald-600 text-[#0c6543] font-semibold text-xs hover:bg-emerald-50 transition-colors mt-2"
            >
              + Gửi thêm phản hồi mới
            </button>
          </div>
        )}

      </div>

      {/* MODAL: ĐIỀN Ý KIẾN PHẢN HỒI */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full max-w-[430px] bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-slate-900 text-[17px]">
                Chia sẻ phản hồi của bạn
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              
              {/* Rating */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Đánh giá mức độ hài lòng
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-emerald-800 ml-2">
                    {rating === 5 ? 'Rất hài lòng ★★★★★' : rating >= 4 ? 'Hài lòng ★★★★' : 'Bình thường'}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Chuyên mục phản hồi
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Dịch vụ Clinic & Spa">Dịch vụ Clinic & Spa</option>
                  <option value="Tư vấn soi da">Tư vấn soi da & Bác sĩ</option>
                  <option value="Chất lượng mỹ phẩm">Chất lượng mỹ phẩm</option>
                  <option value="Thái độ nhân viên">Thái độ phục vụ</option>
                  <option value="Ứng dụng & Trải nghiệm">Ứng dụng Hasaki Skin Journey</option>
                  <option value="Khác">Góp ý khác</option>
                </select>
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Nội dung đóng góp ý kiến
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  placeholder="Hãy chia sẻ chi tiết trải nghiệm hoặc mong muốn của bạn để Hasaki hoàn thiện hơn..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
                  autoFocus
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-600 font-semibold text-xs hover:bg-slate-200 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-2 h-11 rounded-xl bg-[#0c6543] hover:bg-[#095236] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi ý kiến phản hồi</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
