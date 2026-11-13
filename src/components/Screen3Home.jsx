import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  FileText, 
  History, 
  UserCheck, 
  Sparkles, 
  Bell, 
  HelpCircle, 
  MessageSquareHeart, 
  Headphones, 
  Grid, 
  Home, 
  User, 
  ChevronRight, 
  X, 
  CalendarCheck, 
  LogOut, 
  BookOpen, 
  Receipt, 
  Package, 
  Phone 
} from 'lucide-react';
import HasakiLogo from './HasakiLogo';
import HasakiAIBotIcon from './HasakiAIBotIcon';

export default function Screen3Home({ 
  user = { name: 'Nguyễn Văn A', gender: 'Nam' }, 
  onLogout, 
  onBackToSplash,
  onNavigateFeature 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [activePromoIndex, setActivePromoIndex] = useState(0);

  // 12 Functional Grid Items matching screen3.png
  const features = [
    {
      id: 'dat-lich',
      title: 'Đặt lịch tư vấn',
      icon: (
        <div className="relative">
          <Calendar className="w-6 h-6 text-[#215a3e]" />
          <Clock className="w-3.5 h-3.5 text-emerald-700 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
        </div>
      ),
      description: 'Chọn thời gian và chuyên viên soi da miễn phí tại Hasaki Clinic & Spa gần nhất.'
    },
    {
      id: 'lich-su-dat-lich',
      title: 'Lịch sử đặt lịch',
      icon: (
        <div className="relative">
          <CalendarCheck className="w-6 h-6 text-[#215a3e]" />
          <Clock className="w-3.5 h-3.5 text-emerald-700 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
        </div>
      ),
      description: 'Xem các buổi hẹn sắp tới và lịch sử liệu trình đã hoàn thành.'
    },
    {
      id: 'hoa-don',
      title: 'Hóa đơn',
      icon: (
        <div className="relative">
          <FileText className="w-6 h-6 text-[#215a3e]" />
          <span className="text-[10px] font-bold text-white bg-emerald-700 w-3.5 h-3.5 rounded-full flex items-center justify-center absolute -bottom-1 -right-1">
            $
          </span>
        </div>
      ),
      description: 'Quản lý hóa đơn dịch vụ, mỹ phẩm và tích lũy điểm Hasaki Rewards.'
    },
    {
      id: 'lich-su-tu-van',
      title: 'Lịch sử tư vấn',
      icon: (
        <div className="relative">
          <History className="w-6 h-6 text-[#215a3e]" />
        </div>
      ),
      description: 'Xem lại kết luận soi da và phác đồ điều trị của Bác sĩ da liễu.'
    },
    {
      id: 'ho-so-da',
      title: 'Hồ sơ da của tôi',
      icon: (
        <div className="relative">
          <UserCheck className="w-6 h-6 text-[#215a3e]" />
        </div>
      ),
      description: 'Quản lý hồ sơ phân tích da chuyên sâu: độ ẩm, sắc tố, lỗ chân lông và dầu nhờn.'
    },
    {
      id: 'danh-gia-da',
      title: 'Đánh giá tình trạng da',
      icon: (
        <div className="relative">
          <Sparkles className="w-6 h-6 text-[#215a3e]" />
          <span className="text-[8px] font-extrabold text-white bg-emerald-600 px-1 py-0.2 rounded-full absolute -top-1.5 -right-2">
            AI
          </span>
        </div>
      ),
      description: 'Khảo sát và phân tích tình trạng da chi tiết để Hasaki xây dựng lộ trình chăm sóc da cá nhân hóa.'
    },
    {
      id: 'chu-trinh-cham-da',
      title: 'Chu trình chăm da',
      icon: (
        <div className="relative">
          <div className="w-6 h-6 rounded-lg border-2 border-[#215a3e] flex items-center justify-center">
            <span className="text-xs font-bold text-[#215a3e]">🧴</span>
          </div>
        </div>
      ),
      description: 'Lộ trình Skincare buổi sáng và tối được cá nhân hóa theo từng tình trạng da.'
    },
    {
      id: 'nhac-lich',
      title: 'Nhắc lịch chăm da',
      icon: (
        <div className="relative">
          <Bell className="w-6 h-6 text-[#215a3e]" />
          <Clock className="w-3.5 h-3.5 text-emerald-700 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
        </div>
      ),
      description: 'Quản lý lịch hẹn và các bước tiếp theo trong hành trình chăm sóc da.'
    },
    {
      id: 'hoi-dap',
      title: 'Hỏi đáp chuyên gia',
      icon: (
        <div className="relative">
          <HelpCircle className="w-6 h-6 text-[#215a3e]" />
        </div>
      ),
      description: 'Gửi câu hỏi trực tiếp đến đội ngũ Bác sĩ và Dược sĩ chuyên môn của Hasaki.'
    },
    {
      id: 'lang-nghe',
      title: 'Lắng nghe khách hàng',
      icon: (
        <div className="relative">
          <MessageSquareHeart className="w-6 h-6 text-[#215a3e]" />
        </div>
      ),
      description: 'Đánh giá dịch vụ và đóng góp ý kiến để Hasaki nâng cao chất lượng phục vụ.'
    },
    {
      id: 'ho-tro',
      title: 'Hỗ trợ',
      icon: (
        <div className="relative">
          <Headphones className="w-6 h-6 text-[#215a3e]" />
        </div>
      ),
      description: 'Tổng đài miễn cước 1800 6324 sẵn sàng hỗ trợ 24/7 mọi thắc mắc của bạn.'
    },
    {
      id: 'tat-ca',
      title: 'Tất cả tiện ích',
      icon: (
        <div className="relative">
          <Grid className="w-6 h-6 text-[#215a3e]" />
        </div>
      ),
      description: 'Khám phá toàn bộ danh mục dịch vụ làm đẹp, spa và mua sắm Hasaki.'
    }
  ];

  // "Các chức năng khác" matching reference screenshot
  const otherFeatures = [
    {
      id: 'huong-dan',
      title: 'Hướng dẫn sử dụng',
      icon: <BookOpen className="w-6 h-6 text-[#1c4d36]" />,
      description: 'Xem cẩm nang hướng dẫn sử dụng tính năng soi da, tích điểm và theo dõi chu trình skincare trên ứng dụng Hasaki Skin Journey.'
    },
    {
      id: 'bang-gia',
      title: 'Bảng giá dịch vụ',
      icon: (
        <div className="relative">
          <Receipt className="w-6 h-6 text-[#1c4d36]" />
          <span className="text-[9px] font-bold text-white bg-emerald-700 w-3 h-3 rounded-full flex items-center justify-center absolute -bottom-1 -right-1">
            $
          </span>
        </div>
      ),
      description: 'Bảng giá chi tiết các liệu trình chăm sóc da chuẩn y khoa, triệt lông Diode Laser, peel da sinh học tại Hasaki Clinic & Spa.'
    },
    {
      id: 'san-pham',
      title: 'Sản phẩm phù hợp',
      icon: <Package className="w-6 h-6 text-[#1c4d36]" />,
      description: 'Gợi ý các dòng dược mỹ phẩm chính hãng phù hợp với tình trạng da của bạn (La Roche-Posay, Bioderma, Paula’s Choice, Eucerin...).'
    },
    {
      id: 'lien-he',
      title: 'Liên hệ',
      icon: <Phone className="w-6 h-6 text-[#1c4d36]" />,
      description: 'Thông tin liên hệ hotline miễn phí 1800 6324, hệ thống 150+ chi nhánh cửa hàng & phòng khám Hasaki trên toàn quốc.'
    }
  ];

  const filteredFeatures = searchTerm.trim() === '' 
    ? features 
    : features.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleFeatureClick = (item) => {
    // Tất cả tiện ích -> ScreenTatCaTienIch
    if (item.id === 'tat-ca') {
      if (onNavigateFeature) onNavigateFeature('tat-ca');
      return;
    }
    // 1. Đánh giá tình trạng da -> ScreenDanhGiaDa
    if (item.id === 'danh-gia-da') {
      if (onNavigateFeature) onNavigateFeature('danh-gia-da');
      return;
    }
    // 2. Đặt lịch tư vấn -> ScreenDatLich
    if (item.id === 'dat-lich') {
      if (onNavigateFeature) onNavigateFeature('dat-lich');
      return;
    }
    // Lịch sử đặt lịch -> ScreenLichSuDatLich
    if (item.id === 'lich-su-dat-lich') {
      if (onNavigateFeature) onNavigateFeature('lich-su-dat-lich');
      return;
    }
    // Lịch sử tư vấn -> ScreenHoSoDa (chức năng Lịch sử tư vấn/điều trị)
    if (item.id === 'lich-su-tu-van') {
      if (onNavigateFeature) onNavigateFeature('lich-su-tu-van');
      return;
    }
    // Hóa đơn điện tử -> ScreenHoaDon
    if (item.id === 'hoa-don') {
      if (onNavigateFeature) onNavigateFeature('hoa-don');
      return;
    }
    // Sản phẩm phù hợp -> ScreenSanPhamPhuHop
    if (item.id === 'san-pham') {
      if (onNavigateFeature) onNavigateFeature('san-pham');
      return;
    }
    // Bảng giá dịch vụ -> ScreenBangGiaDichVu
    if (item.id === 'bang-gia') {
      if (onNavigateFeature) onNavigateFeature('bang-gia');
      return;
    }
    // Hướng dẫn sử dụng -> ScreenHuongDanSuDung
    if (item.id === 'huong-dan') {
      if (onNavigateFeature) onNavigateFeature('huong-dan');
      return;
    }
    // Hỏi đáp chuyên gia (Đặt lịch tư vấn online) -> ScreenHoiDapChuyenGia
    if (item.id === 'hoi-dap') {
      if (onNavigateFeature) onNavigateFeature('hoi-dap');
      return;
    }
    // 3. Chu trình chăm da -> ScreenChuTrinhChamDa
    if (item.id === 'chu-trinh-cham-da') {
      if (onNavigateFeature) onNavigateFeature('chu-trinh-cham-da');
      return;
    }
    // 3. Hồ sơ da -> ScreenHoSoDa
    if (item.id === 'ho-so-da') {
      if (onNavigateFeature) onNavigateFeature('ho-so-da');
      return;
    }
    // 3. Nhắc lịch chăm da -> ScreenNhacLich
    if (item.id === 'nhac-lich') {
      if (onNavigateFeature) onNavigateFeature('nhac-lich');
      return;
    }
    // 4. Hỗ trợ -> ScreenHoTro
    if (item.id === 'ho-tro' || item.id === 'lien-he') {
      if (onNavigateFeature) onNavigateFeature('ho-tro');
      return;
    }
    // 5. Lắng nghe khách hàng -> ScreenLangNghe
    if (item.id === 'lang-nghe') {
      if (onNavigateFeature) onNavigateFeature('lang-nghe');
      return;
    }

    setSelectedFeature(item);
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between overflow-hidden bg-[#f4f8f5] select-none text-slate-800">
      
      {/* Scrollable Mobile Web Content */}
      <div className="w-full flex-1 overflow-y-auto no-scrollbar pb-28">
        
        {/* Top Header Banner matching screen3.png */}
        <div 
          className="w-full pt-4 pb-5 px-5 bg-gradient-to-b from-[#b7d5c5]/80 via-[#cce3d7]/60 to-[#f4f8f5]"
        >
          {/* Top row with Logo + Slogan + Logout action */}
          <div className="flex items-center justify-between mb-2.5 relative z-10">
            <div className="flex items-center gap-2.5">
              <HasakiLogo size={40} className="rounded-xl shadow-xs" />
              <div className="text-[13.5px] font-semibold text-[#1c4d36] tracking-tight">
                Nơi đánh thức vẻ đẹp toàn diện
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900 bg-white/80 hover:bg-white px-2.5 py-1 rounded-full shadow-xs border border-emerald-900/10 transition-all cursor-pointer flex-shrink-0"
              title="Đăng xuất"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>

          {/* Main Title & Subtitle: Exactly "Ứng dụng dành cho khách hàng" */}
          <div>
            <h1 className="text-[#1c4d36] font-extrabold text-[26px] tracking-tight leading-none">
              HASAKI Skin Journey
            </h1>
            <p className="text-[#235d42]/90 font-medium text-[13.5px] mt-1">
              Ứng dụng dành cho khách hàng
            </p>
          </div>
        </div>

        {/* Section: Chức năng & Search */}
        <div className="px-5 mt-2">
          <h2 className="text-[#1c4d36] font-bold text-[18px] mb-2">
            Chức năng
          </h2>

          {/* Search Box */}
          <div className="relative w-full">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#215a3e] absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm tại đây"
                className="w-full h-[45px] pl-11 pr-10 rounded-full border-[1.5px] border-[#215a3e] bg-white text-slate-800 placeholder-[#215a3e]/60 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[#215a3e]/30 shadow-xs transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid of 12 Services (4 columns x 3 rows) */}
        <div className="px-5 mt-4">
          <div className="bg-[#f0f5f2] rounded-[24px] p-3.5 shadow-xs border border-emerald-900/[0.04]">
            <div className="grid grid-cols-4 gap-y-3.5 gap-x-2">
              {filteredFeatures.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleFeatureClick(item)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  {/* Circular icon container */}
                  <div className="w-[50px] h-[50px] rounded-full bg-white shadow-xs flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95 border border-emerald-900/[0.06]">
                    {item.icon}
                  </div>
                  {/* Label */}
                  <span className="text-[11px] leading-[13px] font-medium text-[#1c4d36] mt-1.5 px-0.5 line-clamp-2 h-7 flex items-center justify-center">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            {filteredFeatures.length === 0 && (
              <div className="py-6 text-center text-slate-500 text-xs">
                Không tìm thấy tiện ích phù hợp với "{searchTerm}"
              </div>
            )}
          </div>
        </div>

        {/* Storefront Banner matching screen3.png */}
        <div className="px-5 mt-4">
          <div className="relative rounded-[16px] overflow-hidden shadow-xs border border-emerald-900/10 group cursor-pointer">
            <img
              src="/images/store_banner.png"
              alt="HASAKI Clinic & Store"
              className="w-full h-[105px] object-cover transition-transform duration-500 group-hover:scale-102"
            />
            <div className="absolute top-2 left-3 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white font-medium">
              Hasaki Clinic & Spa
            </div>
          </div>
        </div>

        {/* Promoted Section: Khuyến mãi nổi bật */}
        <div className="px-5 mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[#1c4d36] font-bold text-[17px]">
              Khuyến mãi nổi bật
            </h2>
            <button 
              onClick={() => alert('Xem toàn bộ chương trình khuyến mãi tháng này!')}
              className="text-[#215a3e] text-[13px] font-medium hover:underline cursor-pointer"
            >
              Xem thêm
            </button>
          </div>

          {/* Promo List Cards */}
          <div className="flex flex-col gap-2.5">
            {/* Promo Card 1 */}
            <div 
              onClick={() => alert('Chi tiết Ưu đãi Mỹ phẩm chính hãng Hasaki Beauty & Clinic')}
              className="bg-[#f0f5f2] rounded-2xl p-2.5 flex items-center gap-3 shadow-xs border border-emerald-900/[0.04] cursor-pointer hover:bg-[#e9f2ec] transition-colors"
            >
              <div className="w-[108px] h-[50px] rounded-xl overflow-hidden flex-shrink-0 bg-emerald-100">
                <img
                  src="/images/promo1.png"
                  alt="Ưu đãi đẹp làn da khỏe"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <p className="text-[11.5px] leading-[15px] font-medium text-slate-700 line-clamp-2">
                  Khám phá loạt ưu đãi hấp dẫn từ các thương hiệu mỹ phẩm, chăm sóc da yêu thích. Làm đẹp tiết kiệm, tự tin tỏa sáng mỗi ngày!
                </p>
                <div className="text-[10px] text-slate-400 mt-1">30/10/2026</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            </div>

            {/* Promo Card 2 */}
            <div 
              onClick={() => alert('Chi tiết Liệu trình Clinic & Spa chuẩn y khoa')}
              className="bg-[#f0f5f2] rounded-2xl p-2.5 flex items-center gap-3 shadow-xs border border-emerald-900/[0.04] cursor-pointer hover:bg-[#e9f2ec] transition-colors"
            >
              <div className="w-[108px] h-[50px] rounded-xl overflow-hidden flex-shrink-0 bg-emerald-100">
                <img
                  src="/images/promo2.png"
                  alt="Trải nghiệm dịch vụ chăm sóc da"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <p className="text-[11.5px] leading-[15px] font-medium text-slate-700 line-clamp-2">
                  Trải nghiệm dịch vụ chăm sóc da chuyên nghiệp tại Hasaki Clinic & Spa. Đặt lịch ngay để tận hưởng liệu trình phù hợp với nhu cầu làn da của bạn!
                </p>
                <div className="text-[10px] text-slate-400 mt-1">31/10/2026</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            </div>
          </div>

          {/* Dots Pagination Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[0, 1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                onClick={() => setActivePromoIndex(dot)}
                className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                  dot === activePromoIndex ? 'bg-[#215a3e] w-3' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* SECTION: CÁC CHỨC NĂNG KHÁC (Hiển thị ngay dưới Khuyến mãi) */}
        <div className="px-5 mt-5">
          <h2 className="text-[#1c4d36] font-bold text-[18px] mb-2.5">
            Các chức năng khác
          </h2>

          <div className="bg-[#f0f5f2] rounded-[24px] p-3.5 shadow-xs border border-emerald-900/[0.04]">
            <div className="grid grid-cols-4 gap-2">
              {otherFeatures.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleFeatureClick(item)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  {/* Circular icon container */}
                  <div className="w-[50px] h-[50px] rounded-full bg-white shadow-xs flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95 border border-emerald-900/[0.06]">
                    {item.icon}
                  </div>
                  {/* Label */}
                  <span className="text-[11px] leading-[13px] font-medium text-[#1c4d36] mt-1.5 px-0.5 line-clamp-2 h-7 flex items-center justify-center">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Floating AI Assistant Robot Button matching Hình 2: Khi nhấn vào -> mở ScreenAIChat */}
      <div 
        className="absolute right-4 bottom-[76px] z-30"
        style={{ bottom: '76px' }}
      >
        <button
          type="button"
          onClick={() => {
            if (onNavigateFeature) {
              onNavigateFeature('ai-chat');
            }
          }}
          className="relative group transition-transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
          aria-label="Hasaki AI Chatbot"
        >
          <HasakiAIBotIcon size={56} />
        </button>
      </div>

      {/* Bottom Navigation Bar (Home Bar) */}
      <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-slate-100 flex items-center justify-around px-2 z-20 shadow-[0_-3px_10px_rgba(0,0,0,0.03)]">
        {/* Trang chủ */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center w-16 transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-[#215a3e]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold mt-1">Trang chủ</span>
        </button>

        {/* Hồ sơ da -> Điều hướng đến ScreenHoSoDa */}
        <button
          onClick={() => {
            setActiveTab('profile');
            if (onNavigateFeature) {
              onNavigateFeature('ho-so-da');
            }
          }}
          className={`flex flex-col items-center justify-center w-16 transition-colors cursor-pointer ${
            activeTab === 'profile' ? 'text-[#215a3e]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <UserCheck className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium mt-1">Hồ sơ da</span>
        </button>

        {/* Elevated Center Action: Đặt lịch */}
        <div className="relative -top-3.5 flex flex-col items-center">
          <button
            onClick={() => {
              setActiveTab('booking');
              if (onNavigateFeature) onNavigateFeature('dat-lich');
            }}
            className="w-12 h-12 rounded-full bg-[#b8ddcb] p-0.5 shadow-md hover:bg-[#a6d4bf] active:scale-95 transition-all flex items-center justify-center border-4 border-white cursor-pointer"
            aria-label="Đặt lịch"
          >
            <div className="w-full h-full rounded-full bg-[#215a3e] flex items-center justify-center text-white">
              <Calendar className="w-5 h-5 stroke-[2.2]" />
            </div>
          </button>
          <span className="text-[10px] font-bold text-[#215a3e] mt-0.5">Đặt lịch</span>
        </div>

        {/* Thông báo */}
        <button
          onClick={() => {
            setActiveTab('notifications');
            if (onNavigateFeature) onNavigateFeature('thong-bao');
          }}
          className={`flex flex-col items-center justify-center w-16 relative transition-colors cursor-pointer ${
            activeTab === 'notifications' ? 'text-[#215a3e]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <Bell className="w-5 h-5 stroke-[2]" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute -top-0.5 -right-0.5" />
          </div>
          <span className="text-[10px] font-medium mt-1">Thông báo</span>
        </button>

        {/* Tài khoản */}
        <button
          onClick={() => {
            setActiveTab('account');
            if (onNavigateFeature) onNavigateFeature('tai-khoan');
          }}
          className={`flex flex-col items-center justify-center w-16 transition-colors cursor-pointer ${
            activeTab === 'account' ? 'text-[#215a3e]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium mt-1">Tài khoản</span>
        </button>
      </div>

      {/* Feature Detail Modal Sheet */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full max-w-[430px] bg-white rounded-t-[24px] p-6 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#eaf4ee] flex items-center justify-center text-[#215a3e]">
                  {selectedFeature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-[16px]">
                    {selectedFeature.title}
                  </h3>
                  <span className="text-xs text-emerald-700 font-medium">Hasaki Skin Journey</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-600 text-sm mb-5 leading-relaxed">
              {selectedFeature.description}
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  alert(`Đã kích hoạt: "${selectedFeature.title}" thành công!`);
                  setSelectedFeature(null);
                }}
                className="w-full h-11 rounded-xl bg-[#215a3e] text-white font-bold text-sm shadow-md shadow-emerald-950/20 hover:bg-[#1a4a32] transition-colors cursor-pointer"
              >
                Tiếp tục thực hiện
              </button>
              <button
                onClick={() => setSelectedFeature(null)}
                className="w-full h-10 rounded-xl bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
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
