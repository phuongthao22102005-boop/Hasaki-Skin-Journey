import React, { useState } from 'react';
import {
  ArrowLeft,
  Home,
  Search,
  X,
  Calendar,
  Clock,
  CalendarCheck,
  FileText,
  History,
  UserCheck,
  Sparkles,
  Bell,
  HelpCircle,
  MessageSquareHeart,
  Headphones,
  BookOpen,
  Receipt,
  Package,
  Phone,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function ScreenTatCaTienIch({
  onBack,
  onBackToHome,
  onNavigateFeature
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'main' | 'other'

  // 11 Main Features (excluding 'tat-ca')
  const mainFeatures = [
    {
      id: 'dat-lich',
      title: 'Đặt lịch tư vấn',
      category: 'main',
      categoryLabel: 'Dịch vụ & Đặt lịch',
      icon: (
        <div className="relative">
          <Calendar className="w-6 h-6 text-[#215a3e]" />
          <Clock className="w-3.5 h-3.5 text-emerald-700 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
        </div>
      ),
      description: 'Đặt lịch thăm khám, soi da miễn phí tại Cửa hàng hoặc Hasaki Clinic & Spa.',
      badge: 'Phổ biến'
    },
    {
      id: 'lich-su-dat-lich',
      title: 'Lịch sử đặt lịch',
      category: 'main',
      categoryLabel: 'Dịch vụ & Đặt lịch',
      icon: (
        <div className="relative">
          <CalendarCheck className="w-6 h-6 text-[#215a3e]" />
          <Clock className="w-3.5 h-3.5 text-emerald-700 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
        </div>
      ),
      description: 'Theo dõi các phiếu đặt lịch thăm khám, trạng thái tiếp nhận và lịch sử hẹn.',
      badge: null
    },
    {
      id: 'hoa-don',
      title: 'Hóa đơn',
      category: 'main',
      categoryLabel: 'Dịch vụ & Đặt lịch',
      icon: (
        <div className="relative">
          <FileText className="w-6 h-6 text-[#215a3e]" />
          <span className="text-[10px] font-bold text-white bg-emerald-700 w-3.5 h-3.5 rounded-full flex items-center justify-center absolute -bottom-1 -right-1">
            $
          </span>
        </div>
      ),
      description: 'Quản lý hóa đơn dịch vụ, chi phí liệu trình và hóa đơn điện tử Hasaki.',
      badge: null
    },
    {
      id: 'lich-su-tu-van',
      title: 'Lịch sử tư vấn',
      category: 'main',
      categoryLabel: 'Chăm sóc da & Lộ trình',
      icon: (
        <div className="relative">
          <History className="w-6 h-6 text-[#215a3e]" />
        </div>
      ),
      description: 'Xem lại kết luận soi da, phác đồ điều trị và tư vấn từ Bác sĩ da liễu.',
      badge: null
    },
    {
      id: 'ho-so-da',
      title: 'Hồ sơ da của tôi',
      category: 'main',
      categoryLabel: 'Chăm sóc da & Lộ trình',
      icon: (
        <div className="relative">
          <UserCheck className="w-6 h-6 text-[#215a3e]" />
        </div>
      ),
      description: 'Quản lý hồ sơ phân tích da chuyên sâu: độ ẩm, sắc tố, lỗ chân lông và dầu nhờn.',
      badge: 'Cá nhân hóa'
    },
    {
      id: 'danh-gia-da',
      title: 'Đánh giá tình trạng da',
      category: 'main',
      categoryLabel: 'Chăm sóc da & Lộ trình',
      icon: (
        <div className="relative">
          <Sparkles className="w-6 h-6 text-[#215a3e]" />
          <span className="text-[8px] font-extrabold text-white bg-emerald-600 px-1 py-0.2 rounded-full absolute -top-1.5 -right-2">
            AI
          </span>
        </div>
      ),
      description: 'Khảo sát và phân tích tình trạng da chi tiết để Hasaki xây dựng lộ trình chăm sóc da.',
      badge: 'AI Smart'
    },
    {
      id: 'chu-trinh-cham-da',
      title: 'Chu trình chăm da',
      category: 'main',
      categoryLabel: 'Chăm sóc da & Lộ trình',
      icon: (
        <div className="relative">
          <div className="w-6 h-6 rounded-lg border-2 border-[#215a3e] flex items-center justify-center">
            <span className="text-xs font-bold text-[#215a3e]">🧴</span>
          </div>
        </div>
      ),
      description: 'Lộ trình Skincare buổi sáng và tối được cá nhân hóa theo từng tình trạng da.',
      badge: null
    },
    {
      id: 'nhac-lich',
      title: 'Nhắc lịch chăm da',
      category: 'main',
      categoryLabel: 'Chăm sóc da & Lộ trình',
      icon: (
        <div className="relative">
          <Bell className="w-6 h-6 text-[#215a3e]" />
          <Clock className="w-3.5 h-3.5 text-emerald-700 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
        </div>
      ),
      description: 'Nhắc nhở thời gian skincare, uống nước và các bước trong hành trình chăm sóc da.',
      badge: null
    },
    {
      id: 'hoi-dap',
      title: 'Hỏi đáp chuyên gia',
      category: 'main',
      categoryLabel: 'Tư vấn & Hỗ trợ',
      icon: (
        <div className="relative">
          <HelpCircle className="w-6 h-6 text-[#215a3e]" />
        </div>
      ),
      description: 'Tham vấn online 1:1 qua Video Call trực tiếp cùng Bác sĩ Chuyên khoa Da liễu.',
      badge: 'Bác sĩ 1:1'
    },
    {
      id: 'lang-nghe',
      title: 'Lắng nghe khách hàng',
      category: 'main',
      categoryLabel: 'Tư vấn & Hỗ trợ',
      icon: (
        <div className="relative">
          <MessageSquareHeart className="w-6 h-6 text-[#215a3e]" />
        </div>
      ),
      description: 'Đánh giá dịch vụ và đóng góp ý kiến để Hasaki nâng cao chất lượng phục vụ.',
      badge: null
    },
    {
      id: 'ho-tro',
      title: 'Hỗ trợ',
      category: 'main',
      categoryLabel: 'Tư vấn & Hỗ trợ',
      icon: (
        <div className="relative">
          <Headphones className="w-6 h-6 text-[#215a3e]" />
        </div>
      ),
      description: 'Tổng đài miễn cước 1800 6324 sẵn sàng hỗ trợ 24/7 mọi thắc mắc của bạn.',
      badge: '24/7'
    }
  ];

  // 4 Other Features (Chức năng khác)
  const otherFeatures = [
    {
      id: 'huong-dan',
      title: 'Hướng dẫn sử dụng',
      category: 'other',
      categoryLabel: 'Chức năng khác',
      icon: (
        <div className="relative">
          <BookOpen className="w-6 h-6 text-[#1c4d36]" />
        </div>
      ),
      description: 'Xem cẩm nang hướng dẫn đặt lịch, thanh toán hóa đơn và đánh giá dịch vụ trên app.',
      badge: null
    },
    {
      id: 'bang-gia',
      title: 'Bảng giá dịch vụ',
      category: 'other',
      categoryLabel: 'Chức năng khác',
      icon: (
        <div className="relative">
          <Receipt className="w-6 h-6 text-[#1c4d36]" />
          <span className="text-[9px] font-bold text-white bg-emerald-700 w-3 h-3 rounded-full flex items-center justify-center absolute -bottom-1 -right-1">
            $
          </span>
        </div>
      ),
      description: 'Bảng giá chi tiết dịch vụ tư vấn tại Cửa hàng và điều trị da liễu tại Hasaki Clinic.',
      badge: 'Minh bạch'
    },
    {
      id: 'san-pham',
      title: 'Sản phẩm phù hợp',
      category: 'other',
      categoryLabel: 'Chức năng khác',
      icon: (
        <div className="relative">
          <Package className="w-6 h-6 text-[#1c4d36]" />
        </div>
      ),
      description: 'Gợi ý các dòng dược mỹ phẩm chính hãng phù hợp cho routine buổi sáng và buổi tối.',
      badge: 'Gợi ý'
    },
    {
      id: 'lien-he',
      title: 'Liên hệ',
      category: 'other',
      categoryLabel: 'Chức năng khác',
      icon: (
        <div className="relative">
          <Phone className="w-6 h-6 text-[#1c4d36]" />
        </div>
      ),
      description: 'Thông tin liên hệ hotline miễn phí 1800 6324, mạng lưới chi nhánh và phòng khám Hasaki.',
      badge: null
    }
  ];

  // All 15 functions combined (excluding 'tat-ca')
  const allUtilities = [...mainFeatures, ...otherFeatures];

  // Filter by category and search term
  const filteredList = allUtilities.filter((item) => {
    const matchCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchSearch =
      searchTerm.trim() === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleItemClick = (item) => {
    if (onNavigateFeature) {
      onNavigateFeature(item.id);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col bg-[#eff4ef] select-none text-slate-800 overflow-hidden font-sans">
      
      {/* Top Header Bar */}
      <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack || onBackToHome}
            className="flex items-center gap-2.5 text-[#105e3f] font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
            <span>Tất cả tiện ích</span>
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
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        
        {/* Search Bar Section */}
        <div className="p-4 pb-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-emerald-800 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm tiện ích, dịch vụ..."
              className="w-full h-10 pl-10 pr-9 rounded-2xl bg-white text-slate-800 placeholder-gray-400 text-[13px] font-medium border border-gray-200/80 focus:outline-none focus:ring-2 focus:ring-[#105e3f]/20 focus:border-[#105e3f] shadow-2xs transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: `Tất cả (${allUtilities.length})` },
            { id: 'main', label: `Chức năng chính (${mainFeatures.length})` },
            { id: 'other', label: `Chức năng khác (${otherFeatures.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#105e3f] text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-gray-200/70 hover:border-emerald-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Result Summary when searching */}
        {searchTerm.trim() !== '' && (
          <div className="px-5 pb-2 text-[12px] text-gray-500 font-medium">
            Tìm thấy <strong className="text-[#105e3f]">{filteredList.length}</strong> tiện ích phù hợp:
          </div>
        )}

        {/* SECTION 1: Chức năng chính (Nếu không tìm kiếm và đang ở tab all hoặc main) */}
        {searchTerm.trim() === '' && (activeCategory === 'all' || activeCategory === 'main') && (
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between mb-2 px-1">
              <h3 className="font-extrabold text-[14.5px] text-[#105e3f] tracking-tight">
                Chức năng chính
              </h3>
              <span className="text-[11px] font-bold text-gray-500">
                11 tiện ích
              </span>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100">
              <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                {mainFeatures.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                  >
                    <div className="relative w-[52px] h-[52px] rounded-2xl bg-[#f4f7f4] flex items-center justify-center transition-all group-hover:scale-105 group-active:scale-95 border border-emerald-900/[0.08] shadow-2xs group-hover:border-[#105e3f] group-hover:bg-emerald-50">
                      {item.icon}
                    </div>
                    <span className="text-[11px] leading-[13.5px] font-bold text-[#1c4d36] mt-1.5 px-0.5 line-clamp-2 h-7 flex items-center justify-center">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: Các chức năng khác (Nếu không tìm kiếm và đang ở tab all hoặc other) */}
        {searchTerm.trim() === '' && (activeCategory === 'all' || activeCategory === 'other') && (
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between mb-2 px-1">
              <h3 className="font-extrabold text-[14.5px] text-[#105e3f] tracking-tight">
                Các chức năng khác
              </h3>
              <span className="text-[11px] font-bold text-gray-500">
                4 chức năng
              </span>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100">
              <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                {otherFeatures.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                  >
                    <div className="relative w-[52px] h-[52px] rounded-2xl bg-[#f4f7f4] flex items-center justify-center transition-all group-hover:scale-105 group-active:scale-95 border border-emerald-900/[0.08] shadow-2xs group-hover:border-[#105e3f] group-hover:bg-emerald-50">
                      {item.icon}
                    </div>
                    <span className="text-[11px] leading-[13.5px] font-bold text-[#1c4d36] mt-1.5 px-0.5 line-clamp-2 h-7 flex items-center justify-center">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEARCH RESULTS VIEW (Khi người dùng nhập từ khóa tìm kiếm) */}
        {searchTerm.trim() !== '' && (
          <div className="px-4">
            <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100">
              {filteredList.length > 0 ? (
                <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                  {filteredList.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleItemClick(item)}
                      className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                    >
                      <div className="relative w-[52px] h-[52px] rounded-2xl bg-[#f4f7f4] flex items-center justify-center transition-all group-hover:scale-105 group-active:scale-95 border border-emerald-900/[0.08] shadow-2xs group-hover:border-[#105e3f] group-hover:bg-emerald-50">
                        {item.icon}
                      </div>
                      <span className="text-[11px] leading-[13.5px] font-bold text-[#1c4d36] mt-1.5 px-0.5 line-clamp-2 h-7 flex items-center justify-center">
                        {item.title}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs">
                  Không tìm thấy tiện ích phù hợp với "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* Informative List Cards of All Utilities for detailed browsing */}
        <div className="px-4 mt-2">
          <div className="flex items-center gap-1.5 px-1 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h4 className="font-extrabold text-[13.5px] text-slate-900">
              Danh mục chi tiết ({filteredList.length})
            </h4>
          </div>

          <div className="space-y-2.5">
            {filteredList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="bg-white rounded-2xl p-3.5 shadow-xs border border-gray-100 hover:border-emerald-300 hover:shadow-sm transition-all flex items-center justify-between gap-3 cursor-pointer group active:scale-[0.99]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f4f7f4] flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-50 border border-emerald-900/[0.06] transition-colors">
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-extrabold text-[13.5px] text-slate-900 group-hover:text-[#105e3f] transition-colors leading-snug truncate">
                      {item.title}
                    </h5>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9.5px] font-bold bg-emerald-100 text-[#105e3f] flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11.5px] text-gray-500 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>

                <div className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-emerald-50 flex items-center justify-center flex-shrink-0 text-gray-400 group-hover:text-[#105e3f] transition-colors">
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
