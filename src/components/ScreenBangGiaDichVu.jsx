import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Phone, 
  ExternalLink, 
  Calendar, 
  Stethoscope, 
  Zap, 
  Sun, 
  CheckCircle2, 
  X, 
  Search, 
  Award, 
  Info, 
  Tag,
  Flame,
  Check,
  ChevronDown,
  Layers
} from 'lucide-react';

export default function ScreenBangGiaDichVu({ 
  user = { name: 'Nguyễn Văn A' }, 
  onBackToHome,
  onNavigateBooking 
}) {
  // 'main' = Hình 1 (2 thanh: Tư vấn tại cửa hàng & Điều trị tại Hasaki Clinic)
  // 'clinic_detail' = Hình 2 biến đổi cho app (Bảng giá chi tiết dịch vụ Clinic)
  const [view, setView] = useState('main');

  // Filter & Search state in clinic detail view
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Modals
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);
  const [showStoreConsultModal, setShowStoreConsultModal] = useState(false);

  // Clinic Price List data structured directly from Hình 2
  const clinicCategories = [
    {
      id: 'phuc-hoi',
      name: 'Phục hồi da',
      icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
      badgeColor: 'bg-emerald-50 text-[#105e3f] border-emerald-200',
      services: [
        {
          id: 'ph-01',
          name: 'Điện di lạnh phục hồi Matrix Repair Concentrate',
          categoryName: 'Phục hồi da',
          tag: 'Làm dịu cấp tốc',
          priceType: 'single',
          priceDisplay: '500.000đ',
          priceNote: '/ lần',
          description: 'Điện di lạnh đưa tinh chất Matrix cô đặc làm dịu da tức thì, phục hồi màng bảo vệ da nhạy cảm sau laser, peel hoặc kích ứng.',
          steps: [
            'Tẩy trang & rửa mặt dịu nhẹ chuẩn y khoa',
            'Xông hơi làm sạch sâu bề mặt da',
            'Thoa tinh chất Matrix Repair Concentrate cô đặc',
            'Điện di lạnh Cryo-Stamp đưa tinh chất sâu vào trung bì',
            'Đắp mặt nạ phục hồi sinh học và thoa kem chống nắng'
          ]
        }
      ]
    },
    {
      id: 'mun',
      name: 'Mụn',
      icon: <Zap className="w-4 h-4 text-amber-600" />,
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      services: [
        {
          id: 'm-01',
          name: 'Combo Lấy mụn + mặt nạ + nằm đèn',
          categoryName: 'Điều trị mụn',
          tag: 'Ưu đãi Hot',
          isHot: true,
          priceType: 'discount',
          originalPrice: '300.000đ',
          priceDisplay: '249.000đ',
          priceNote: '/ lần',
          savings: 'Tiết kiệm 51.000đ',
          description: 'Quy trình 14 bước chuẩn y khoa vô khuẩn, lấy sạch nhân mụn bằng tăm bông y tế độc quyền, đắp mặt nạ bạc hà kháng khuẩn và chiếu đèn Biolight.',
          steps: [
            'Bác sĩ da liễu khám & soi da chẩn đoán loại mụn',
            'Tẩy trang và rửa mặt chuyên dụng cho da mụn',
            'Xông nóng và hút dầu thừa, bã nhờn',
            'Sát khuẩn da đa tầng trước khi xử lý mụn',
            'Lấy nhân mụn bằng tăm bông y tế vô khuẩn 100%',
            'Điện tím sát khuẩn, se khít đầu mụn',
            'Đắp mặt nạ thảo dược làm dịu, giảm đỏ rát',
            'Chiếu ánh sáng sinh học Biolight kháng viêm'
          ]
        },
        {
          id: 'm-02',
          name: 'Combo Meso Mụn + Lấy mụn + mặt nạ + nằm đèn',
          categoryName: 'Điều trị mụn',
          tag: 'Bác sĩ khuyên dùng',
          isHot: true,
          priceType: 'discount',
          originalPrice: '650.000đ',
          priceDisplay: '550.000đ',
          priceNote: '/ lần',
          savings: 'Tiết kiệm 100.000đ',
          description: 'Kết hợp tiêm vi điểm Meso trị mụn giúp gom cồi nhanh chóng, tiêu diệt vi khuẩn P.acnes và ngăn ngừa mụn tái phát.',
          steps: [
            'Khám & lên phác đồ cá nhân hóa cùng Bác sĩ da liễu',
            'Lấy sạch nhân mụn chuẩn y khoa bằng tăm bông',
            'Sát khuẩn toàn diện',
            'Đưa tinh chất Meso đặc trị mụn đa tầng',
            'Đắp mặt nạ kháng viêm y khoa và chiếu đèn sinh học'
          ]
        },
        {
          id: 'm-03',
          name: 'Peel BHA 20%',
          categoryName: 'Điều trị mụn',
          tag: 'Thay da sinh học',
          priceType: 'tiered',
          firstPrice: '350.000đ',
          nextPrice: '400.000đ',
          firstNote: 'Lần 1 (Trải nghiệm)',
          nextNote: 'Lần sau',
          description: 'Tẩy tế bào chết hóa học Salicylic Acid nồng độ cao giúp làm sạch sâu lỗ chân lông, gom khô cồi mụn ẩn và kiểm soát dầu nhờn.',
          steps: [
            'Bác sĩ kiểm tra độ nhạy cảm của da trước khi peel',
            'Làm sạch sâu và bảo vệ các vùng da nhạy cảm quanh mắt, khóe môi',
            'Thoa dung dịch BHA 20% với thời gian chuẩn xác',
            'Trung hòa acid và làm dịu cấp tốc',
            'Đắp mặt nạ cấp ẩm phục hồi da'
          ]
        },
        {
          id: 'm-04',
          name: 'Điều Trị Mụn Công Nghệ Aqua Mesoderm',
          categoryName: 'Điều trị mụn',
          tag: 'Không xâm lấn',
          priceType: 'single',
          priceDisplay: '350.000đ',
          priceNote: '/ lần',
          description: 'Công nghệ dẫn truyền dưỡng chất qua màng tế bào da không dùng kim, không đau rát, đưa hoạt chất trị mụn thẩm thấu sâu gấp 20 lần.',
          steps: [
            'Làm sạch và tẩy tế bào chết nhẹ nhàng',
            'Điện di Aqua Mesoderm mở kênh vận chuyển tế bào',
            'Dẫn truyền serum trị mụn kháng viêm chuyên sâu',
            'Khóa ẩm và làm dịu da bằng ánh sáng sinh học'
          ]
        }
      ]
    },
    {
      id: 'nam',
      name: 'Nám, tàn nhang',
      icon: <Sun className="w-4 h-4 text-rose-600" />,
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      services: [
        {
          id: 'n-01',
          name: 'Laser Revlite trị nám mặt',
          categoryName: 'Nám, tàn nhang',
          tag: 'Laser Hoa Kỳ FDA',
          isHot: true,
          priceType: 'tiered',
          firstPrice: '500.000đ',
          nextPrice: '2.500.000đ',
          firstNote: 'Lần 1 (Trải nghiệm)',
          nextNote: 'Lần sau',
          description: 'Công nghệ Laser Revlite Q-Switched Nd:YAG chính hãng Hoa Kỳ, phát xung cực ngắn phá tan hắc sắc tố Melanin thành các hạt siêu nhỏ đào thải tự nhiên.',
          steps: [
            'Bác sĩ da liễu soi da & đo lường mức độ nám chân sâu',
            'Làm sạch da và ủ tê chuyên dụng 20 phút',
            'Bác sĩ trực tiếp điều chỉnh bước sóng và bắn Laser Revlite',
            'Chườm lạnh và đắp mặt nạ làm dịu cấp tốc',
            'Thoa kem tái tạo da và kem chống nắng vật lý'
          ]
        },
        {
          id: 'n-02',
          name: 'Laser Revlite trị nám mặt + Tiêm Nám',
          categoryName: 'Nám, tàn nhang',
          tag: 'Phác đồ kép độc quyền',
          isHot: true,
          priceType: 'tiered',
          firstPrice: '999.000đ',
          nextPrice: '3.000.000đ',
          firstNote: 'Lần 1 (Trải nghiệm)',
          nextNote: 'Lần sau',
          description: 'Phác đồ tác động kép: Bắn Laser Revlite phá vỡ melanin tầng nông kết hợp tiêm vi điểm ức chế nám sâu tại lớp trung bì.',
          steps: [
            'Bác sĩ thăm khám, xác định phân vùng sắc tố',
            'Bắn Laser Revlite toàn mặt và vùng nám đậm',
            'Tiêm vi điểm tinh chất ức chế sắc tố Tranexamic Acid & Glutathione',
            'Điện di lạnh phục hồi và chiếu ánh sáng vàng làm dịu da'
          ]
        },
        {
          id: 'n-03',
          name: 'Laser Revlite trị tàn nhang mặt',
          categoryName: 'Nám, tàn nhang',
          tag: 'Hiệu quả rõ rệt',
          priceType: 'single',
          priceDisplay: '1.800.000đ',
          priceNote: '/ lần',
          description: 'Tác động chọn lọc vào các đốm tàn nhang trên bề mặt da, làm mờ rõ rệt ngay từ 1 - 2 lần bắn, không để lại sẹo hay mất sắc tố.',
          steps: [
            'Làm sạch da chuẩn y khoa',
            'Ủ tê vùng da có tàn nhang',
            'Bác sĩ bắn Laser Revlite chọn lọc điểm tàn nhang',
            'Điện di lạnh tinh chất phục hồi và hướng dẫn chăm sóc sau laser'
          ]
        },
        {
          id: 'n-04',
          name: 'Lăn kim điều trị nám',
          categoryName: 'Nám, tàn nhang',
          tag: 'Tái tạo vi điểm',
          priceType: 'single',
          priceDisplay: '1.000.000đ',
          priceNote: '/ lần',
          description: 'Tạo hàng ngàn vi tổn thương siêu nhỏ kích thích thay mới làn da và đưa tinh chất ức chế nám thẩm thấu trực tiếp vào đáy thượng bì.',
          steps: [
            'Làm sạch sâu và ủ tê 30 phút',
            'Bác sĩ thực hiện lăn kim với đầu kim chuyên biệt',
            'Thoa phức hợp tinh chất trị nám phục hồi',
            'Đắp mặt nạ làm dịu giảm đỏ tức thì'
          ]
        }
      ]
    },
    {
      id: 'seo-ro',
      name: 'Sẹo rỗ',
      icon: <Layers className="w-4 h-4 text-blue-600" />,
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      services: [
        {
          id: 'sr-01',
          name: 'Lăn kim trị sẹo rỗ với serum',
          categoryName: 'Sẹo rỗ',
          tag: 'Tăng sinh Collagen',
          priceType: 'single',
          priceDisplay: '1.400.000đ',
          priceNote: '/ lần',
          description: 'Kích hoạt cơ chế tự lành thương của cơ thể, thúc đẩy tăng sinh sợi collagen và elastin kết hợp serum tế bào gốc làm đầy đáy sẹo.',
          steps: [
            'Làm sạch sâu và ủ tê vùng điều trị',
            'Bác sĩ trực tiếp lăn kim điều trị sẹo',
            'Thoa tế bào gốc / serum đặc trị sẹo rỗ',
            'Điện di lạnh và đắp mặt nạ sinh học phục hồi'
          ]
        },
        {
          id: 'sr-02',
          name: 'Laser CO2 Fractional trị sẹo rỗ với serum',
          categoryName: 'Sẹo rỗ',
          tag: 'Tiêu chuẩn vàng trị sẹo',
          isHot: true,
          priceType: 'single',
          priceDisplay: '1.900.000đ',
          priceNote: '/ lần',
          description: 'Tia Laser vi phân bước sóng 10.600nm xuyên sâu bóc tách mô xơ sẹo chai lì, kích thích tái tạo collagen mạnh mẽ giúp bề mặt da phẳng mịn.',
          steps: [
            'Bác sĩ soi da và phân loại hình thái sẹo rỗ (đáy nhọn, đáy vuông, đáy tròn)',
            'Ủ tê chuyên dụng 40 phút',
            'Bác sĩ trực tiếp điều chỉnh thông số và bắn Laser Fractional CO2',
            'Thoa serum tăng trưởng tế bào biểu bì',
            'Chiếu ánh sáng sinh học và chườm lạnh giảm nhiệt'
          ]
        },
        {
          id: 'sr-03',
          name: 'Điều trị sẹo rỗ 5in1',
          categoryName: 'Sẹo rỗ',
          tag: 'Phác đồ 5in1 Độc quyền',
          isHot: true,
          priceType: 'tiered',
          firstPrice: '1.800.000đ',
          nextPrice: '3.000.000đ',
          firstNote: 'Lần 1 (Trải nghiệm)',
          nextNote: 'Lần sau',
          description: 'Phác đồ chuyên sâu độc quyền kết hợp 5 kỹ thuật y khoa: Bóc tách đáy sẹo + Laser CO2 Fractional + PRP huyết tương + Lăn kim vi điểm + Serum tái tạo.',
          steps: [
            'Bác sĩ trực tiếp khám và đánh dấu phân vùng sẹo sâu',
            'Bóc tách đáy sẹo xơ cứng bằng kim chuyên dụng',
            'Bắn Laser CO2 Fractional tái tạo bề mặt',
            'Lăn kim vi điểm đưa huyết tương giàu tiểu cầu PRP / tế bào gốc',
            'Đắp mặt nạ sinh học làm dịu và hướng dẫn chăm sóc phục hồi'
          ]
        }
      ]
    }
  ];

  // Flattened services for search & filtering
  const allServices = clinicCategories.flatMap(cat => cat.services);

  const filteredServices = allServices.filter(srv => {
    const matchCategory = selectedCategory === 'all' || 
      (selectedCategory === 'phuc-hoi' && srv.categoryName === 'Phục hồi da') ||
      (selectedCategory === 'mun' && srv.categoryName === 'Điều trị mụn') ||
      (selectedCategory === 'nam' && srv.categoryName === 'Nám, tàn nhang') ||
      (selectedCategory === 'seo-ro' && srv.categoryName === 'Sẹo rỗ');

    const matchSearch = srv.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        srv.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        srv.categoryName.toLowerCase().includes(searchKeyword.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col bg-[#eff4ef] select-none text-slate-800 overflow-hidden font-sans">
      
      {/* ============================================================== */}
      {/* GIAO DIỆN HÌNH 1: BẢNG GIÁ DỊCH VỤ (CHỌN CỬA HÀNG HOẶC CLINIC) */}
      {/* ============================================================== */}
      {view === 'main' && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onBackToHome}
                className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                <span>Bảng giá dịch vụ</span>
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

          {/* Main Content */}
          <div className="flex-1 p-4 space-y-3.5">
            {/* Thanh 1: Tư vấn tại cửa hàng */}
            <div
              onClick={() => setShowStoreConsultModal(true)}
              className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-all active:scale-[0.99]"
            >
              <h3 className="font-extrabold text-[#105e3f] text-[16.5px]">
                Tư vấn tại cửa hàng
              </h3>
              <span className="text-[13px] text-slate-800 font-medium">
                Miễn phí
              </span>
            </div>

            {/* Thanh 2: Điều trị tại Hasaki Clinic */}
            <div
              onClick={() => setView('clinic_detail')}
              className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex items-center justify-between cursor-pointer hover:border-emerald-400 hover:shadow-sm transition-all active:scale-[0.99]"
            >
              <h3 className="font-extrabold text-[#105e3f] text-[16.5px]">
                Điều trị tại Hasaki Clinic
              </h3>

              <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-slate-700">
                  Chỉ từ
                </span>
                <span className="font-bold text-[#ea580c] text-[15px] underline underline-offset-2">
                  250.000đ
                </span>
                <ChevronRight className="w-5 h-5 text-slate-600 stroke-[2.2] ml-0.5" />
              </div>
            </div>

            {/* Hasaki Clinic Guarantee Banner */}
            <div className="mt-6 bg-white/70 backdrop-blur-xs rounded-3xl p-4 border border-emerald-900/10 space-y-2.5">
              <div className="flex items-center gap-2 text-[#105e3f] font-extrabold text-[13px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cam kết Hasaki Clinic & Spa</span>
              </div>
              <ul className="text-[12px] text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>100% Bác sĩ da liễu trực tiếp thăm khám và điều trị.</li>
                <li>Máy móc, trang thiết bị nhập khẩu chính hãng đạt chuẩn FDA Hoa Kỳ.</li>
                <li>Dụng cụ y tế vô khuẩn, tiêu chuẩn an toàn y khoa nghiêm ngặt.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* GIAO DIỆN HÌNH 2: BẢNG GIÁ ĐIỀU TRỊ HASAKI CLINIC               */}
      {/* ============================================================== */}
      {view === 'clinic_detail' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header Bar */}
          <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
            <div className="flex items-center justify-between mb-2.5">
              <button
                type="button"
                onClick={() => setView('main')}
                className="flex items-center gap-2 text-slate-900 font-extrabold text-[17px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
                <span>Điều trị tại Hasaki Clinic</span>
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
            <div className="relative flex items-center bg-[#f4f6f4] rounded-full border border-gray-300 px-3.5 py-1.5 shadow-2xs focus-within:border-[#105e3f] focus-within:bg-white">
              <Search className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm dịch vụ: Lấy mụn, Laser Revlite, Peel..."
                className="w-full text-[12.5px] bg-transparent outline-none text-slate-800 placeholder-gray-400 font-medium"
              />
              {searchKeyword && (
                <button
                  type="button"
                  onClick={() => setSearchKeyword('')}
                  className="p-0.5 text-gray-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-2.5 pb-0.5">
              {[
                { id: 'all', label: `Tất cả (${allServices.length})` },
                { id: 'phuc-hoi', label: 'Phục hồi da' },
                { id: 'mun', label: 'Mụn' },
                { id: 'nam', label: 'Nám, tàn nhang' },
                { id: 'seo-ro', label: 'Sẹo rỗ' }
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#105e3f] text-white shadow-xs'
                      : 'bg-[#d2d6d3] text-slate-800 hover:bg-[#c5cbc6]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Price List Content */}
          <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 space-y-4 scroll-smooth">
            
            {/* Banner matching Hình 2 title theme */}
            <div className="bg-gradient-to-r from-[#105e3f] via-[#166534] to-[#15803d] text-white rounded-3xl p-4 shadow-xs relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center font-extrabold text-[12px] text-white">
                      H
                    </div>
                    <span className="text-[11.5px] font-extrabold uppercase tracking-wider text-emerald-200">
                      Hasaki Clinic & Spa
                    </span>
                  </div>

                  <h3 className="font-extrabold text-[16px] text-white mt-1.5 leading-snug">
                    BÁC SĨ DA LIỄU KHÁM & CHỈ ĐỊNH ĐIỀU TRỊ
                  </h3>
                  <p className="text-[11px] text-emerald-100 mt-1">
                    Bảng giá dịch vụ y khoa niêm yết công khai (đơn vị: VNĐ / lần)
                  </p>
                </div>
              </div>
            </div>

            {/* List of services grouped or filtered */}
            {filteredServices.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-gray-100">
                <p className="text-[13px] text-gray-500 font-medium">
                  Không tìm thấy dịch vụ phù hợp với từ khóa "{searchKeyword}"
                </p>
              </div>
            ) : (
              clinicCategories
                .filter(cat => {
                  if (selectedCategory === 'all') return true;
                  return cat.id === selectedCategory;
                })
                .map(cat => {
                  const itemsInCat = cat.services.filter(s =>
                    filteredServices.some(f => f.id === s.id)
                  );
                  if (itemsInCat.length === 0) return null;

                  return (
                    <div key={cat.id} className="space-y-2.5">
                      {/* Category Header */}
                      <div className="flex items-center justify-between px-1 pt-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#105e3f]"></span>
                          <h4 className="font-extrabold text-[14.5px] text-[#105e3f] uppercase tracking-wide">
                            {cat.name}
                          </h4>
                        </div>
                        <span className="text-[11px] text-gray-500 font-semibold">
                          {itemsInCat.length} dịch vụ
                        </span>
                      </div>

                      {/* Service Cards */}
                      <div className="space-y-2.5">
                        {itemsInCat.map(service => (
                          <div
                            key={service.id}
                            className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 hover:border-emerald-300 transition-all flex flex-col justify-between gap-2.5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h5 className="font-extrabold text-[14px] text-slate-900 leading-snug">
                                    {service.name}
                                  </h5>
                                  {service.tag && (
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                      service.isHot 
                                        ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                                        : 'bg-emerald-50 text-[#105e3f] border border-emerald-200'
                                    }`}>
                                      {service.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11.5px] text-slate-500 leading-snug">
                                  {service.description}
                                </p>
                              </div>
                            </div>

                            {/* Price Presentation based on type */}
                            <div className="bg-[#f8faf8] rounded-xl p-3 border border-emerald-50/60 flex items-center justify-between flex-wrap gap-2">
                              {/* Type 1: Single price */}
                              {service.priceType === 'single' && (
                                <div className="flex items-baseline gap-1">
                                  <span className="font-extrabold text-[16px] text-[#105e3f]">
                                    {service.priceDisplay}
                                  </span>
                                  <span className="text-[11px] text-gray-500">
                                    {service.priceNote}
                                  </span>
                                </div>
                              )}

                              {/* Type 2: Discount price (e.g. 300K -> 249K) */}
                              {service.priceType === 'discount' && (
                                <div className="flex items-center gap-2">
                                  <span className="text-[12.5px] text-gray-400 line-through">
                                    {service.originalPrice}
                                  </span>
                                  <span className="text-gray-400 font-bold">→</span>
                                  <span className="font-extrabold text-[16.5px] text-[#ea580c]">
                                    {service.priceDisplay}
                                  </span>
                                  <span className="text-[10px] text-emerald-700 bg-emerald-100 font-extrabold px-1.5 py-0.5 rounded">
                                    {service.savings}
                                  </span>
                                </div>
                              )}

                              {/* Type 3: Tiered (Lần 1 & Lần sau) */}
                              {service.priceType === 'tiered' && (
                                <div className="flex items-center gap-4 text-[12px]">
                                  <div>
                                    <span className="text-[10.5px] text-gray-500 block">Lần 1 (Trải nghiệm)</span>
                                    <span className="font-extrabold text-[15px] text-[#ea580c]">
                                      {service.firstPrice}
                                    </span>
                                  </div>
                                  <div className="w-px h-6 bg-gray-200"></div>
                                  <div>
                                    <span className="text-[10.5px] text-gray-500 block">Lần sau</span>
                                    <span className="font-bold text-[14px] text-slate-800">
                                      {service.nextPrice}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* Action buttons */}
                              <div className="flex items-center gap-2 ml-auto">
                                <button
                                  type="button"
                                  onClick={() => setSelectedServiceDetail(service)}
                                  className="py-1.5 px-2.5 rounded-lg text-[11px] font-bold text-[#105e3f] bg-white border border-emerald-200 hover:bg-emerald-50 transition-colors cursor-pointer"
                                >
                                  Quy trình
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onNavigateBooking) onNavigateBooking();
                                  }}
                                  className="py-1.5 px-3 rounded-lg text-[11.5px] font-bold text-white bg-[#105e3f] hover:bg-[#0c4a31] active:scale-95 shadow-2xs transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <span>Đặt lịch</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
            )}

            {/* Bottom Support Banner matching Hình 2 footer */}
            <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 flex items-center justify-between gap-3 text-[12px]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-[#105e3f] flex-shrink-0">
                  <Phone className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">Hotline Clinic & Spa</div>
                  <div className="text-[#105e3f] font-bold text-[13px]">1800 6324 (Nhấn phím 2)</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-gray-500">Website chính thức</div>
                <div className="font-bold text-slate-800">hasaki.vn/spa</div>
              </div>
            </div>

            {/* Book appointment button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  if (onNavigateBooking) onNavigateBooking();
                }}
                className="w-full py-3.5 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[14px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Đặt lịch khám Bác sĩ Da liễu ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: CHI TIẾT TƯ VẤN TẠI CỬA HÀNG (Khi bấm Thanh 1 ở Hình 1) */}
      {/* ============================================================== */}
      {showStoreConsultModal && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[1px] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 shadow-2xl w-full max-w-[340px] space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h4 className="font-extrabold text-[15.5px] text-[#105e3f]">
                Tư vấn tại cửa hàng Hasaki
              </h4>
              <button
                type="button"
                onClick={() => setShowStoreConsultModal(false)}
                className="p-1 text-gray-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-emerald-800 font-medium">Chi phí dịch vụ</span>
                <div className="font-extrabold text-[16px] text-[#105e3f]">0đ (Hoàn toàn miễn phí)</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white text-[#105e3f] text-[11px] font-extrabold shadow-2xs">
                Miễn phí 100%
              </span>
            </div>

            <div className="space-y-2 text-[12px] text-slate-700">
              <div className="font-bold text-slate-900">Quyền lợi dịch vụ:</div>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                <li>Soi da chuyên sâu bằng thiết bị soi da đa tầng.</li>
                <li>Xác định chính xác loại da và tình trạng da hiện tại.</li>
                <li>Được chuyên viên da liễu tư vấn Routine Skincare khoa học.</li>
                <li>Trải nghiệm mẫu thử dược mỹ phẩm chính hãng phù hợp.</li>
              </ul>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowStoreConsultModal(false);
                  if (onNavigateBooking) onNavigateBooking();
                }}
                className="w-full py-3 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[13.5px] shadow-sm transition-all cursor-pointer text-center"
              >
                Đặt lịch khám & soi da tại Clinic
              </button>
              <button
                type="button"
                onClick={() => setShowStoreConsultModal(false)}
                className="w-full py-2 rounded-full text-slate-500 font-semibold text-[12.5px] hover:bg-gray-100 transition-colors cursor-pointer text-center"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: QUY TRÌNH DỊCH VỤ CLINIC                                */}
      {/* ============================================================== */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[1px] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 shadow-2xl w-full max-w-[350px] max-h-[85vh] overflow-y-auto space-y-3.5">
            <div className="flex items-start justify-between pb-2 border-b border-gray-100">
              <div>
                <span className="text-[10.5px] text-[#105e3f] font-extrabold uppercase">
                  {selectedServiceDetail.categoryName}
                </span>
                <h4 className="font-extrabold text-[14.5px] text-slate-900 leading-snug">
                  {selectedServiceDetail.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedServiceDetail(null)}
                className="p-1 text-gray-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[12px] text-slate-600 leading-relaxed bg-[#f8faf8] p-3 rounded-xl border border-emerald-50">
              {selectedServiceDetail.description}
            </p>

            <div className="space-y-2">
              <h5 className="font-extrabold text-[13px] text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Các bước thực hiện chuẩn y khoa:</span>
              </h5>
              <div className="space-y-1.5 pl-1">
                {selectedServiceDetail.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px] text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#105e3f] text-[10.5px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedServiceDetail(null);
                  if (onNavigateBooking) onNavigateBooking();
                }}
                className="w-full py-3 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[13px] shadow-sm transition-all cursor-pointer"
              >
                Đặt lịch liệu trình này
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
