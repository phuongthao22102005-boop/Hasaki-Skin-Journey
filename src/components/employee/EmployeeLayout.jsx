import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  ClipboardCheck, 
  History, 
  BookOpen, 
  LogOut, 
  UserCheck, 
  Stethoscope, 
  Store, 
  Bell, 
  ChevronDown, 
  Eye, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import HasakiLogo from '../HasakiLogo';
import EmployeeDashboard from './EmployeeDashboard';
import EmployeeAppointments from './EmployeeAppointments';
import EmployeeCustomerProfiles from './EmployeeCustomerProfiles';
import EmployeeStandardConsultation from './EmployeeStandardConsultation';
import EmployeeConsultationHistory from './EmployeeConsultationHistory';
import EmployeeKnowledgeHub from './EmployeeKnowledgeHub';

export default function EmployeeLayout({
  employeeUser,
  onSwitchEmployeeRole,
  onSwitchToCustomerInterface,
  onLogout,
  customerProfiles,
  onUpdateCustomerProfile,
  bookingSlips,
  onUpdateBookingSlip,
  consultationRecords,
  onSaveConsultationRecord,
  notifications = []
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [selectedCustomerForConsultation, setSelectedCustomerForConsultation] = useState(null);
  const [consultationPreselectedAppointment, setConsultationPreselectedAppointment] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Launch standard consultation directly from customer profile or appointment
  const handleLaunchConsultation = (customer, appointment = null) => {
    setSelectedCustomerForConsultation(customer);
    setConsultationPreselectedAppointment(appointment);
    setActiveTab('consultation');
    setMobileSidebarOpen(false);
  };

  // Pending appointments count for badge
  const pendingCount = (bookingSlips || []).filter(
    b => b.status === 'da_tiep_nhan' || b.status === 'pending' || b.isNewlyBooked
  ).length;

  const isClinic = employeeUser?.role === 'clinic_specialist';

  return (
    <div className="w-full min-h-screen bg-[#edf3ef] text-slate-800 flex flex-col font-sans select-none">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900/95 text-white text-[13px] font-bold px-4 py-3 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-2xs px-4 sm:px-6 py-2.5 flex items-center justify-between">
        
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-gray-100 cursor-pointer"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <HasakiLogo size={36} className="shadow-xs" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[16px] text-[#105e3f] tracking-tight">Hasaki</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#105e3f] text-white">
                  WORKSPACE
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-semibold leading-none">
                Cổng Chuyên viên &amp; Bác sĩ
              </p>
            </div>
          </div>
        </div>

        {/* Center/Right: Role indicator, Switch buttons, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Switch to Customer View */}
          <button
            type="button"
            onClick={onSwitchToCustomerInterface}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#105e3f] font-bold text-[12px] border border-emerald-300 transition-all cursor-pointer shadow-2xs"
            title="Chuyển sang Giao diện Khách hàng để kiểm tra đồng bộ dữ liệu"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Giao diện Khách hàng</span>
          </button>

          {/* Role Badge & Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold cursor-pointer transition-all border ${
                isClinic 
                  ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100' 
                  : 'bg-emerald-50 text-[#105e3f] border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isClinic ? <Stethoscope className="w-3.5 h-3.5" /> : <Store className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{employeeUser?.roleBadge || 'Bác sĩ Clinic'}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-50 animate-in fade-in zoom-in-95 text-[12px]">
                <div className="px-3 py-1.5 text-[10.5px] font-extrabold text-gray-400 uppercase tracking-wider">
                  Chuyển phân quyền vai trò:
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    onSwitchEmployeeRole('clinic_specialist');
                    setShowRoleMenu(false);
                    showToast('Đã chuyển sang vai trò: BS. CKI Da liễu Hasaki Clinic');
                  }}
                  className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition-colors cursor-pointer ${
                    isClinic ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-gray-50 text-slate-700'
                  }`}
                >
                  <Stethoscope className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Clinic Specialist / Doctor</div>
                    <div className="text-[10.5px] text-gray-500 font-normal">Toàn quyền bệnh lý da, kết luận Y khoa &amp; phác đồ Clinic</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSwitchEmployeeRole('retail_consultant');
                    setShowRoleMenu(false);
                    showToast('Đã chuyển sang vai trò: Chuyên viên Tư vấn Retail');
                  }}
                  className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition-colors cursor-pointer ${
                    !isClinic ? 'bg-emerald-50 text-[#105e3f] font-bold' : 'hover:bg-gray-50 text-slate-700'
                  }`}
                >
                  <Store className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Retail Skincare Consultant</div>
                    <div className="text-[10.5px] text-gray-500 font-normal">Tư vấn mỹ phẩm cửa hàng, phân tích da cơ bản &amp; chuyển tuyến</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full text-slate-600 hover:bg-gray-100 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Thông báo"
            >
              <Bell className="w-5 h-5" />
              {pendingCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-1.5 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-50 animate-in fade-in zoom-in-95 text-[12px]">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                  <span className="font-extrabold text-[13px] text-slate-900">Thông báo ca trực</span>
                  <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#105e3f]">
                    {pendingCount} lịch chờ duyệt
                  </span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#105e3f]">Lịch hẹn mới từ App</span>
                      <span className="text-[10px] text-gray-400">Vừa xong</span>
                    </div>
                    <p className="text-[11.5px] text-slate-700">
                      Khách hàng <strong>TRỊNH PHƯƠNG THẢO</strong> đã đặt lịch khám da liễu tại Hasaki Clinic Quận 7.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-700">Cập nhật hồ sơ da</span>
                      <span className="text-[10px] text-gray-400">10 phút trước</span>
                    </div>
                    <p className="text-[11.5px] text-slate-700">
                      Khách hàng vừa hoàn thành khảo sát Routine ban đêm, điểm phục hồi đạt <strong>68/100</strong>.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">Bàn giao ca buổi 4</span>
                      <span className="text-[10px] text-gray-400">Hôm nay</span>
                    </div>
                    <p className="text-[11.5px] text-slate-600">
                      KTV Thùy Linh đã bàn giao hồ sơ điều trị sẹo và phục hồi cho BS. CKI Lê Thị Mai Chi.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    setActiveTab('appointments');
                  }}
                  className="w-full mt-2.5 py-2 text-center text-[#105e3f] font-bold text-[11.5px] bg-[#eff4ef] hover:bg-[#e4ede6] rounded-xl transition-colors cursor-pointer"
                >
                  Xem danh sách lịch hẹn chờ duyệt &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Employee Avatar & Name */}
          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <img
              src={employeeUser?.avatar || '/images/doctor_nam.png'}
              alt={employeeUser?.name || 'Nhân viên'}
              className="w-8 h-8 rounded-full object-cover border border-emerald-300 shadow-2xs"
            />
            <div className="hidden lg:block text-left">
              <div className="font-extrabold text-[12.5px] text-slate-900 leading-tight">
                {employeeUser?.name || 'BS. CKI Vũ Hoài Nam'}
              </div>
              <div className="text-[10px] text-gray-500 font-medium">
                {employeeUser?.department?.split('-')[0]?.trim() || 'Hasaki Clinic'}
              </div>
            </div>
            
            <button
              type="button"
              onClick={onLogout}
              className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer ml-1"
              title="Đăng xuất khỏi Employee Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden max-w-7xl w-full mx-auto">
        
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4 space-y-6 flex-shrink-0">
          
          {/* Navigation Menu */}
          <div className="space-y-1.5">
            <div className="px-3 pb-1 text-[10px] font-black text-gray-400 uppercase tracking-wider">
              Nghiệp vụ nhân viên
            </div>

            {/* 1. Dashboard */}
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-[13px] transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#105e3f] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-[#eff4ef] hover:text-[#105e3f]'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4.5 h-4.5" />
                <span>Dashboard tổng quan</span>
              </div>
            </button>

            {/* 2. Appointments */}
            <button
              type="button"
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-[13px] transition-all cursor-pointer ${
                activeTab === 'appointments'
                  ? 'bg-[#105e3f] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-[#eff4ef] hover:text-[#105e3f]'
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarDays className="w-4.5 h-4.5" />
                <span>Quản lý lịch hẹn</span>
              </div>
              {pendingCount > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-extrabold ${
                  activeTab === 'appointments' ? 'bg-white text-[#105e3f]' : 'bg-emerald-100 text-[#105e3f]'
                }`}>
                  {pendingCount}
                </span>
              )}
            </button>

            {/* 3. Customer Profiles */}
            <button
              type="button"
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-[13px] transition-all cursor-pointer ${
                activeTab === 'customers'
                  ? 'bg-[#105e3f] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-[#eff4ef] hover:text-[#105e3f]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4.5 h-4.5" />
                <span>Hồ sơ khách hàng</span>
              </div>
              <span className={`text-[11px] font-medium opacity-80`}>
                {(customerProfiles || []).length} hồ sơ
              </span>
            </button>

            {/* 4. Standardised Consultation */}
            <button
              type="button"
              onClick={() => setActiveTab('consultation')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-[13px] transition-all cursor-pointer relative overflow-hidden ${
                activeTab === 'consultation'
                  ? 'bg-[#105e3f] text-white shadow-xs'
                  : 'bg-emerald-50/60 text-[#105e3f] hover:bg-emerald-100 border border-emerald-200/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <ClipboardCheck className="w-4.5 h-4.5 text-emerald-600" />
                <span>Tư vấn chuẩn hóa</span>
              </div>
              <span className="text-[10px] uppercase font-black px-1.5 py-0.2 rounded bg-amber-500 text-white">
                5 bước
              </span>
            </button>

            {/* 5. Consultation History */}
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-[13px] transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-[#105e3f] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-[#eff4ef] hover:text-[#105e3f]'
              }`}
            >
              <div className="flex items-center gap-3">
                <History className="w-4.5 h-4.5" />
                <span>Lịch sử &amp; So sánh</span>
              </div>
            </button>

            {/* 6. Knowledge Hub */}
            <button
              type="button"
              onClick={() => setActiveTab('knowledge')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-[13px] transition-all cursor-pointer ${
                activeTab === 'knowledge'
                  ? 'bg-[#105e3f] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-[#eff4ef] hover:text-[#105e3f]'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4.5 h-4.5" />
                <span>Knowledge Hub</span>
              </div>
            </button>
          </div>

          {/* Quick Customer Switcher Banner in Sidebar */}
          <div className="mt-auto bg-gradient-to-br from-[#eff7f2] to-[#e4ede6] rounded-2xl p-3.5 border border-emerald-200/70 text-[11.5px] space-y-2">
            <div className="flex items-center gap-1.5 text-[#105e3f] font-extrabold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Đồng bộ 2 chiều</span>
            </div>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              Mọi cập nhật tư vấn hay xác nhận lịch hẹn tại đây sẽ tự động hiển thị ngay trên tài khoản khách hàng.
            </p>
            <button
              type="button"
              onClick={onSwitchToCustomerInterface}
              className="w-full py-2 px-3 rounded-xl bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[11px] shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3 h-3" />
              <span>Mở giao diện Khách hàng</span>
            </button>
          </div>

        </aside>

        {/* Mobile Slide-over Sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex md:hidden">
            <div className="w-72 bg-white h-full p-4 flex flex-col space-y-4 animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <HasakiLogo size={28} />
                  <span className="font-extrabold text-[15px] text-[#105e3f]">Employee Menu</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => { setActiveTab('dashboard'); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold text-[13px] ${
                    activeTab === 'dashboard' ? 'bg-[#105e3f] text-white' : 'text-slate-700 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard tổng quan</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('appointments'); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl font-bold text-[13px] ${
                    activeTab === 'appointments' ? 'bg-[#105e3f] text-white' : 'text-slate-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-4 h-4" />
                    <span>Quản lý lịch hẹn</span>
                  </div>
                  {pendingCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white">
                      {pendingCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('customers'); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold text-[13px] ${
                    activeTab === 'customers' ? 'bg-[#105e3f] text-white' : 'text-slate-700 hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Hồ sơ khách hàng</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('consultation'); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold text-[13px] ${
                    activeTab === 'consultation' ? 'bg-[#105e3f] text-white' : 'bg-emerald-50 text-[#105e3f]'
                  }`}
                >
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Tư vấn chuẩn hóa (5 bước)</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('history'); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold text-[13px] ${
                    activeTab === 'history' ? 'bg-[#105e3f] text-white' : 'text-slate-700 hover:bg-gray-100'
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span>Lịch sử &amp; So sánh</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('knowledge'); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold text-[13px] ${
                    activeTab === 'knowledge' ? 'bg-[#105e3f] text-white' : 'text-slate-700 hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Knowledge Hub</span>
                </button>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-auto space-y-2">
                <button
                  type="button"
                  onClick={() => { onSwitchToCustomerInterface(); setMobileSidebarOpen(false); }}
                  className="w-full py-2.5 rounded-xl bg-emerald-50 text-[#105e3f] font-bold text-[12px] flex items-center justify-center gap-2 border border-emerald-200"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem giao diện Khách hàng</span>
                </button>

                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-[12px] flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <EmployeeDashboard
              employeeUser={employeeUser}
              bookingSlips={bookingSlips}
              customerProfiles={customerProfiles}
              onNavigateAppointments={() => setActiveTab('appointments')}
              onNavigateCustomers={() => setActiveTab('customers')}
              onNavigateKnowledge={() => setActiveTab('knowledge')}
              onStartConsultation={(customer, appt) => handleLaunchConsultation(customer, appt)}
              onUpdateBookingSlip={onUpdateBookingSlip}
              showToast={showToast}
            />
          )}

          {activeTab === 'appointments' && (
            <EmployeeAppointments
              employeeUser={employeeUser}
              bookingSlips={bookingSlips}
              customerProfiles={customerProfiles}
              onUpdateBookingSlip={onUpdateBookingSlip}
              onStartConsultation={(customer, appt) => handleLaunchConsultation(customer, appt)}
              showToast={showToast}
            />
          )}

          {activeTab === 'customers' && (
            <EmployeeCustomerProfiles
              employeeUser={employeeUser}
              customerProfiles={customerProfiles}
              consultationRecords={consultationRecords}
              onUpdateCustomerProfile={onUpdateCustomerProfile}
              onStartConsultation={(customer) => handleLaunchConsultation(customer)}
              showToast={showToast}
            />
          )}

          {activeTab === 'consultation' && (
            <EmployeeStandardConsultation
              employeeUser={employeeUser}
              customerProfiles={customerProfiles}
              preselectedCustomer={selectedCustomerForConsultation}
              preselectedAppointment={consultationPreselectedAppointment}
              onSaveConsultationRecord={(record) => {
                onSaveConsultationRecord(record);
                showToast(`Đã lưu phiên tư vấn #${record.sessionNumber} và đồng bộ vào hồ sơ khách hàng thành công!`);
                setActiveTab('history');
              }}
              onCancel={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'history' && (
            <EmployeeConsultationHistory
              employeeUser={employeeUser}
              consultationRecords={consultationRecords}
              customerProfiles={customerProfiles}
              onStartNewConsultation={() => setActiveTab('consultation')}
            />
          )}

          {activeTab === 'knowledge' && (
            <EmployeeKnowledgeHub
              employeeUser={employeeUser}
            />
          )}
        </main>

      </div>

    </div>
  );
}
