import React, { useState } from 'react';
import { ArrowLeft, Home, Clock, Check, Plus, Bell, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';

export default function ScreenNhacLich({ onBackToHome }) {
  // Mode: 'list' (Hình 1) or 'add' (Hình 2)
  const [viewMode, setViewMode] = useState('list');

  // Initial reminders matching Hình 1
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Theo dõi phản hồi routine',
      date: '2026-10-30',
      completed: false
    },
    {
      id: 2,
      title: 'Xem lại lịch tư vấn',
      date: '2026-10-28',
      completed: false
    }
  ]);

  // Form states for Hình 2
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2026-11-05');
  const [errorMsg, setErrorMsg] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleToggleComplete = (id) => {
    setReminders(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleSaveReminder = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!newTitle.trim()) {
      setErrorMsg('Vui lòng nhập nội dung nhắc nhở');
      return;
    }

    if (!newDate.trim()) {
      setErrorMsg('Vui lòng chọn ngày nhắc');
      return;
    }

    const newReminder = {
      id: Date.now(),
      title: newTitle.trim(),
      date: newDate.trim(),
      completed: false
    };

    // Prepend new reminder to list
    setReminders(prev => [newReminder, ...prev]);
    
    // Reset inputs
    setNewTitle('');
    setNewDate('2026-11-05');
    
    // Switch back to list view (Hình 1) showing the new reminder!
    setViewMode('list');
    showToast('Đã thêm lời nhắc mới thành công!');
  };

  const handleRequestNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          setNotificationEnabled(true);
          showToast('Đã bật thông báo nhắc lịch trên trình duyệt!');
        } else {
          setNotificationEnabled(true);
          showToast('Đã bật tính năng nhắc nhở thông báo Hasaki!');
        }
      });
    } else {
      setNotificationEnabled(true);
      showToast('Đã bật thông báo trình duyệt!');
    }
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between bg-[#f2f6f3] select-none text-slate-800">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-[#105e3f] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg animate-fade-in flex items-center gap-1.5 whitespace-nowrap">
          <Check className="w-3.5 h-3.5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Scrollable Area */}
      <div className="w-full flex-1 overflow-y-auto no-scrollbar p-5 pb-16">
        
        {/* Top Navigation Bar matching Hình 1 & Hình 2 */}
        <div className="flex items-center justify-between pt-2 pb-5">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-[#155238] font-bold text-[17px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.6]" />
            <span>Nhắc lịch chăm da</span>
          </button>

          <button
            onClick={onBackToHome}
            className="text-[#155238] hover:opacity-80 transition-opacity p-1 cursor-pointer"
            aria-label="Trang chủ"
          >
            <Home className="w-6 h-6 stroke-[2.4]" />
          </button>
        </div>

        {/* Section Header: Nhắc nhở của tôi */}
        <div className="mt-1">
          <h1 className="text-[#155238] font-extrabold text-[26px] tracking-tight leading-tight">
            Nhắc nhở của tôi
          </h1>
          <p className="text-slate-600 text-[13.5px] mt-2 leading-relaxed">
            Quản lý lịch hẹn và các bước tiếp theo trong hành trình chăm sóc da
          </p>
        </div>

        {/* Action Buttons Row matching Hình 1 */}
        <div className="flex items-center gap-2.5 mt-5">
          <button
            onClick={() => setViewMode(viewMode === 'add' ? 'list' : 'add')}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer shadow-xs ${
              viewMode === 'add'
                ? 'bg-[#0b482f] text-white'
                : 'bg-[#105e3f] hover:bg-[#0c4d33] text-white'
            }`}
          >
            + Thêm nhắc nhở
          </button>

          <button
            onClick={handleRequestNotification}
            className={`px-3.5 py-2 rounded-full text-[13px] font-semibold border-[1.5px] border-[#105e3f] transition-all cursor-pointer ${
              notificationEnabled
                ? 'bg-emerald-100/60 text-[#105e3f]'
                : 'bg-white text-[#105e3f] hover:bg-emerald-50'
            }`}
          >
            {notificationEnabled ? '✓ Đã bật thông báo' : 'Bật thông báo trình duyệt'}
          </button>
        </div>

        {/* VIEW 2: HÌNH 2 - Form Thêm Lời Nhắc Mới */}
        {viewMode === 'add' && (
          <div className="mt-5 animate-slide-up">
            {/* White Form Card matching Hình 2 */}
            <form onSubmit={handleSaveReminder} className="bg-white rounded-[22px] p-5 shadow-xs border border-emerald-900/[0.05]">
              {/* Field 1: Nội dung nhắc nhở */}
              <div>
                <label className="block text-slate-900 font-semibold text-[14.5px] mb-2.5">
                  Nội dung nhắc nhở
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => { setNewTitle(e.target.value); setErrorMsg(''); }}
                  placeholder="Ví dụ: kiểm tra lại da sau 2 tuần"
                  className="w-full h-[48px] px-4 rounded-[14px] border-[1.5px] border-[#105e3f] text-slate-800 placeholder-slate-400 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#105e3f]/30"
                  autoFocus
                />
              </div>

              {/* Field 2: Ngày nhắc */}
              <div className="mt-4">
                <label className="block text-slate-900 font-semibold text-[14.5px] mb-2.5">
                  Ngày nhắc
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => { setNewDate(e.target.value); setErrorMsg(''); }}
                    className="w-full h-[48px] px-4 rounded-[14px] border-[1.5px] border-[#105e3f] text-slate-800 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#105e3f]/30 bg-white"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-rose-600 text-xs font-semibold mt-2.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errorMsg}
                </p>
              )}
            </form>

            {/* Lưu lời nhắc button underneath the card */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleSaveReminder}
                className="px-5 py-2.5 rounded-[12px] bg-[#105e3f] hover:bg-[#0c4d33] active:scale-98 text-white font-bold text-[14.5px] shadow-sm transition-all cursor-pointer"
              >
                Lưu lời nhắc
              </button>
            </div>
          </div>
        )}

        {/* VIEW 1: HÌNH 1 - Danh sách lời nhắc */}
        <div className="mt-5 space-y-3">
          {reminders.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleComplete(item.id)}
              className="bg-white rounded-[20px] p-4 flex items-center justify-between shadow-xs border border-emerald-900/[0.04] cursor-pointer hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-8 h-8 flex items-center justify-center text-slate-800 flex-shrink-0">
                  <Clock className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className={`font-bold text-[15px] leading-snug ${
                    item.completed ? 'line-through text-slate-400' : 'text-slate-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5 font-medium">
                    {item.date}
                  </p>
                </div>
              </div>

              {/* Radio / Check Circle */}
              <div 
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  item.completed 
                    ? 'border-[#105e3f] bg-[#105e3f] text-white' 
                    : 'border-[#105e3f] hover:bg-emerald-50'
                }`}
              >
                {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          ))}

          {reminders.length === 0 && (
            <div className="bg-white rounded-[20px] p-8 text-center text-slate-500 text-sm">
              Chưa có lời nhắc nào. Hãy nhấn "+ Thêm nhắc nhở" để tạo lời nhắc đầu tiên!
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
