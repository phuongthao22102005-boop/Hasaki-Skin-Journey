import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  CheckCheck, 
  CheckCircle2, 
  Home, 
  User, 
  UserCheck, 
  Calendar, 
  Sparkles, 
  Gift, 
  Clock, 
  X, 
  ChevronRight,
  ExternalLink,
  Tag,
  CalendarCheck
} from 'lucide-react';
import HasakiAIBotIcon from './HasakiAIBotIcon';

export default function ScreenThongBao({ 
  user = { name: 'Nguyễn Văn A' }, 
  onBackToHome,
  onNavigateHome,
  onNavigateHoSoDa,
  onNavigateDatLich,
  onNavigateTaiKhoan,
  onNavigateAIChat,
  onNavigateRoutine,
  onNavigateHistory,
  onNavigateProducts
}) {
  // Tabs: 'all' (Tất cả) | 'unread' (Chưa đọc)
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // 4 notifications matching the exact titles & context of Hình 1 with concise descriptions
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'HASAKI BEAUTY DAY',
      subtitle: 'Ưu đãi chăm sóc da dành cho khách hàng',
      content: 'Giảm đến 50% các dòng dược mỹ phẩm và liệu trình chăm sóc da. Nhận ngay quà tặng độc quyền khi mua sắm tại Hasaki!',
      date: '21/10/2026',
      isRead: false,
      tag: 'Ưu đãi hot',
      type: 'promo',
      actionLabel: 'Khám phá sản phẩm',
      onAction: onNavigateProducts
    },
    {
      id: 'notif-2',
      title: 'HASAKI MEMBER',
      subtitle: 'Chương trình khách hàng thân thiết',
      content: 'Bạn vừa tích lũy thêm 2.500 Hasaki Xu từ lịch khám gần nhất. Theo dõi cấp độ thành viên và đổi quà ngay nhé!',
      date: '23/10/2026',
      isRead: false,
      tag: 'Thành viên',
      type: 'member',
      actionLabel: 'Xem điểm thưởng',
      onAction: onNavigateTaiKhoan
    },
    {
      id: 'notif-3',
      title: 'Routine skincare mới',
      subtitle: 'Cập nhật chu trình chăm sóc da',
      content: 'Routine chăm sóc da của bạn đã được cập nhật phù hợp với hồ sơ da đã lưu. Khám phá các bước sáng & tối tối ưu!',
      date: '24/10/2026',
      isRead: false,
      tag: 'Routine da',
      type: 'routine',
      actionLabel: 'Xem chu trình',
      onAction: onNavigateRoutine
    },
    {
      id: 'notif-4',
      title: 'Nhắc lịch tư vấn',
      subtitle: 'Lịch hẹn sắp tới tại Hasaki Clinic',
      content: 'Bạn có lịch tư vấn chăm sóc da sắp tới lúc 09:30. Hãy kiểm tra thông tin lịch hẹn và chuẩn bị trao đổi cùng chuyên viên!',
      date: '27/10/2026',
      isRead: false,
      tag: 'Nhắc lịch',
      type: 'booking',
      actionLabel: 'Xem phiếu hẹn',
      onAction: onNavigateHistory
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Mark all notifications as read
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('Đã đánh dấu đọc tất cả thông báo!');
  };

  // Click on a notification
  const handleNotificationClick = (notif) => {
    // Mark this specific notification as read
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
    setSelectedNotification(notif);
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between bg-[#eff4ef] select-none text-slate-800 overflow-hidden font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-[12.5px] font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar matching Hình 1 */}
      <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
            <span>Thông báo</span>
          </button>

          {/* Nút "Đọc tất cả" matching Hình 1 */}
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eaf4ee] hover:bg-[#d8ecdf] active:scale-95 text-[#105e3f] text-[12px] font-bold border border-emerald-200 shadow-2xs transition-all cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 stroke-[2.4]" />
            <span>Đọc tất cả</span>
          </button>
        </div>

        {/* 2 Tabs: "Tất cả" & "Chưa đọc" matching Hình 1 */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer text-center ${
              activeTab === 'all'
                ? 'bg-[#105e3f] text-white shadow-xs'
                : 'bg-[#d2d6d3] text-slate-800 hover:bg-[#c5cbc6]'
            }`}
          >
            Tất cả {notifications.length > 0 && `(${notifications.length})`}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('unread')}
            className={`flex-1 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer text-center relative ${
              activeTab === 'unread'
                ? 'bg-[#105e3f] text-white shadow-xs'
                : 'bg-[#d2d6d3] text-slate-800 hover:bg-[#c5cbc6]'
            }`}
          >
            Chưa đọc {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </div>

      {/* Main Notification Cards List matching Hình 1 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24 scroll-smooth">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[360px] text-center p-6 bg-white rounded-3xl border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-3 text-[#105e3f]">
              <Bell className="w-8 h-8 stroke-[1.8]" />
            </div>
            <h4 className="font-extrabold text-[15px] text-slate-800">
              Không có thông báo chưa đọc
            </h4>
            <p className="text-[12px] text-slate-500 mt-1 max-w-[240px]">
              Bạn đã xem hết tất cả các thông báo mới từ Hasaki Beauty & Clinic.
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className={`bg-white rounded-2xl p-4 shadow-xs border transition-all cursor-pointer hover:border-emerald-300 active:scale-[0.99] flex items-start gap-3.5 relative ${
                !item.isRead ? 'border-emerald-200/90 ring-1 ring-emerald-500/10' : 'border-gray-100 opacity-90'
              }`}
            >
              {/* Unread indicator dot */}
              {!item.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute top-3.5 right-3.5 shadow-xs animate-pulse" />
              )}

              {/* Green Circular Icon Container matching Hình 1 */}
              <div className="w-11 h-11 rounded-full border border-emerald-600 bg-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                <Bell className="w-5 h-5 text-[#105e3f] fill-[#105e3f]/15 stroke-[2.2]" />
              </div>

              {/* Text Information matching Hình 1 layout */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="font-extrabold text-[13.5px] text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                </div>

                {/* Subtitle */}
                {item.subtitle && (
                  <p className="text-[11.5px] font-semibold text-[#105e3f] mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                )}

                {/* Short content */}
                <p className="text-[11.5px] text-slate-600 mt-1 leading-relaxed line-clamp-2">
                  {item.content}
                </p>

                {/* Date stamp */}
                <div className="text-[10.5px] text-gray-400 mt-1.5 font-medium">
                  {item.date}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating AI Assistant Robot Button matching Hình 2 */}
      <div 
        className="absolute right-4 bottom-[76px] z-30"
        style={{ bottom: '76px' }}
      >
        <button
          type="button"
          onClick={() => {
            if (onNavigateAIChat) onNavigateAIChat();
          }}
          className="relative group transition-transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
          aria-label="Chat với AI Hasaki"
        >
          <HasakiAIBotIcon size={56} />
        </button>
      </div>

      {/* Bottom Navigation Bar matching Hình 1 */}
      <div className="h-[64px] bg-white border-t border-slate-200/80 px-4 flex items-center justify-between shadow-lg z-20 flex-shrink-0">
        {/* Trang chủ */}
        <button
          onClick={onNavigateHome}
          className="flex flex-col items-center justify-center w-16 transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium mt-1">Trang chủ</span>
        </button>

        {/* Hồ sơ da */}
        <button
          onClick={onNavigateHoSoDa}
          className="flex flex-col items-center justify-center w-16 transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
        >
          <UserCheck className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium mt-1">Hồ sơ da</span>
        </button>

        {/* Đặt lịch (Center Elevated Action) */}
        <div className="relative -top-3.5 flex flex-col items-center">
          <button
            onClick={onNavigateDatLich}
            className="w-12 h-12 rounded-full bg-[#b8ddcb] p-0.5 shadow-md hover:bg-[#a6d4bf] active:scale-95 transition-all flex items-center justify-center border-4 border-white cursor-pointer"
            aria-label="Đặt lịch"
          >
            <div className="w-full h-full rounded-full bg-[#215a3e] flex items-center justify-center text-white">
              <Calendar className="w-5 h-5 stroke-[2.2]" />
            </div>
          </button>
          <span className="text-[10px] font-bold text-[#215a3e] mt-0.5">Đặt lịch</span>
        </div>

        {/* Thông báo (Active tab matching Hình 1) */}
        <button
          className="flex flex-col items-center justify-center w-16 relative transition-colors cursor-pointer text-[#105e3f]"
        >
          <div className="relative">
            <Bell className="w-5 h-5 stroke-[2.4]" />
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute -top-0.5 -right-0.5" />
            )}
          </div>
          <span className="text-[10px] font-extrabold mt-1">Thông báo</span>
        </button>

        {/* Tài khoản */}
        <button
          onClick={onNavigateTaiKhoan}
          className="flex flex-col items-center justify-center w-16 transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium mt-1">Tài khoản</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* MODAL CHI TIẾT THÔNG BÁO                                       */}
      {/* ============================================================== */}
      {selectedNotification && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[1px] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 shadow-2xl w-full max-w-[340px] space-y-4 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-start justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-[#105e3f]">
                  <Bell className="w-5 h-5 stroke-[2.4]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[14.5px] text-slate-900 leading-snug">
                    {selectedNotification.title}
                  </h4>
                  <span className="text-[10.5px] text-gray-400">{selectedNotification.date}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNotification(null)}
                className="p-1 text-gray-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subtitle & Full Content */}
            <div className="space-y-1.5">
              <div className="text-[12.5px] font-bold text-[#105e3f]">
                {selectedNotification.subtitle}
              </div>
              <p className="text-[12.5px] text-slate-600 leading-relaxed bg-[#f8faf8] p-3 rounded-2xl border border-emerald-50">
                {selectedNotification.content}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              {selectedNotification.onAction && (
                <button
                  type="button"
                  onClick={() => {
                    const action = selectedNotification.onAction;
                    setSelectedNotification(null);
                    if (action) action();
                  }}
                  className="w-full py-2.5 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
                >
                  <span>{selectedNotification.actionLabel}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedNotification(null)}
                className="w-full py-2 rounded-full text-slate-500 font-semibold text-[12.5px] hover:bg-gray-100 transition-colors cursor-pointer text-center"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
