import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Droplets, 
  ShieldCheck, 
  Sun, 
  Moon,
  Info
} from 'lucide-react';

export default function ScreenChuTrinhChamDa({ onBack, onBackToHome }) {
  const [activeTab, setActiveTab] = useState('co-ban'); // 'co-ban' | 'nang-cao'
  const [selectedRoutine, setSelectedRoutine] = useState(null); // 'morning' | 'night' | null

  // Detailed steps data for Morning (5 steps) and Night (7 steps)
  const routineDetails = {
    morning: {
      title: 'Chu trình chăm sóc da sáng',
      time: '07:00, Mỗi ngày',
      stepsCount: 5,
      themeColor: '#faecc0',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'Làm sạch dịu nhẹ sau một đêm, cấp ẩm tầng sâu và tạo lớp khiên bảo vệ da tối ưu trước tác hại của tia UV và khói bụi.',
      steps: [
        {
          num: 1,
          name: 'Làm sạch dịu nhẹ',
          detail: 'Rửa mặt với nước ấm hoặc sữa rửa mặt dịu nhẹ dạng gel có độ pH chuẩn 5.5, không làm mất màng ẩm tự nhiên.',
          recommend: 'Sữa Rửa Mặt CeraVe Foaming Cleanser 236ml'
        },
        {
          num: 2,
          name: 'Cân bằng & Cấp ẩm tức thì',
          detail: 'Vỗ nhẹ 3-4 giọt toner Hyaluronic Acid đa phân tử để mở đường dẫn ẩm sâu cho các bước tiếp theo.',
          recommend: 'Toner Torriden DIVE-IN Low Molecular Hyaluronic Acid 300ml'
        },
        {
          num: 3,
          name: 'Tinh chất chống oxy hóa / Dưỡng sáng',
          detail: 'Thoa đều 2-3 giọt serum Vitamin C 10% hoặc Niacinamide để ngăn ngừa tăng sắc tố và gốc tự do ban ngày.',
          recommend: 'Serum Klairs Freshly Juiced Vitamin Drop 35ml'
        },
        {
          num: 4,
          name: 'Kem dưỡng ẩm khóa nước',
          detail: 'Sử dụng một lượng mỏng kem dưỡng ẩm dạng kem gel mỏng nhẹ để củng cố hàng rào ceramide bảo vệ da.',
          recommend: 'Kem Dưỡng Klairs Midnight Blue Calming Cream 60g'
        },
        {
          num: 5,
          name: 'Kem chống nắng bảo vệ quang phổ rộng',
          detail: 'Thoa đủ lượng 2 đốt ngón tay kem chống nắng SPF 50+ PA++++ trước khi ra ngoài 20 phút. Thoa lại sau 3-4 giờ.',
          recommend: 'Kem Chống Nắng La Roche-Posay Anthelios UVMune 400 Oil Control'
        }
      ]
    },
    night: {
      title: 'Chu trình chăm sóc da tối',
      time: '21:00, Mỗi ngày',
      stepsCount: 7,
      themeColor: '#bfe0cb',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      description: 'Quy trình phục hồi chuyên sâu sau một ngày dài: loại bỏ triệt để cặn trang điểm, bụi mịn, phục hồi tế bào và tái tạo collagen trong giấc ngủ.',
      steps: [
        {
          num: 1,
          name: 'Tẩy trang làm sạch sâu (Double Cleansing 1)',
          detail: 'Dùng nước/dầu tẩy trang Micellar dịu nhẹ loại bỏ sạch lớp kem chống nắng, bụi bẩn và bã nhờn sâu trong lỗ chân lông.',
          recommend: 'Nước Tẩy Trang Bioderma Sensibio H2O Nắp Hồng 500ml'
        },
        {
          num: 2,
          name: 'Sữa rửa mặt tạo bọt mịn (Double Cleansing 2)',
          detail: 'Massage nhẹ nhàng với sữa rửa mặt tạo bọt mềm mịn trong 60 giây, tập trung vùng chữ T để làm sạch hoàn toàn.',
          recommend: 'Gel Rửa Mặt La Roche-Posay Effaclar Purifying 400ml'
        },
        {
          num: 3,
          name: 'Tẩy da chết hóa học định kỳ (2-3 lần/tuần)',
          detail: 'Sử dụng Salicylic Acid (BHA 2%) làm tan sợi bã nhờn, thông thoáng cổ nang lông và ngăn mụn ẩn hình thành.',
          recommend: 'Dung Dịch Tẩy Tế Bào Chết Paula’s Choice Skin Perfecting 2% BHA'
        },
        {
          num: 4,
          name: 'Nước hoa hồng phục hồi cân bằng da',
          detail: 'Cân bằng độ pH và làm dịu nhanh chóng các vùng da kích ứng hoặc ửng đỏ sau bước làm sạch sâu.',
          recommend: 'Toner Torriden DIVE-IN Low Molecular Hyaluronic Acid 300ml'
        },
        {
          num: 5,
          name: 'Serum phục hồi màng bảo vệ da',
          detail: 'Bổ sung tinh chất Rau má Centella Asiatica & Vitamin B5 để kích thích tăng sinh biểu bì và phục hồi da nhạy cảm.',
          recommend: 'Tinh Chất Skin1004 Madagascar Centella Ampoule 100ml'
        },
        {
          num: 6,
          name: 'Kem dưỡng ẩm chuyên sâu ban đêm',
          detail: 'Khóa chặt toàn bộ dưỡng chất với kem dưỡng chứa Guaiazulene và Ceramide, làm dịu da và kích thích tái tạo da khi ngủ.',
          recommend: 'Kem Dưỡng Ẩm Klairs Midnight Blue Calming Cream 60g'
        },
        {
          num: 7,
          name: 'Kem dưỡng vùng mắt & Chấm mụn',
          detail: 'Chăm sóc quầng thâm bọng mắt với Peptide và chấm tinh chất trị mụn chuyên biệt lên các đốm viêm đỏ.',
          recommend: 'Kem Mắt AHC Luminous Glow Real Eye Cream 30ml'
        }
      ]
    }
  };

  const activeRoutineData = selectedRoutine ? routineDetails[selectedRoutine] : null;

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between bg-[#f1f4ef] select-none text-slate-800">
      
      {/* Top Header matching all Hasaki Skin Journey screens */}
      <div className="px-5 pt-3 pb-2 flex-shrink-0 bg-[#f1f4ef] z-20">
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2.5 text-[#105e3f] font-bold text-[17px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.6]" />
            <span>Chu trình chăm da</span>
          </button>

          <button
            onClick={onBackToHome}
            className="text-[#105e3f] hover:opacity-80 transition-opacity p-1 cursor-pointer"
            aria-label="Trang chủ"
          >
            <Home className="w-6 h-6 stroke-[2.4]" />
          </button>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="w-full flex-1 overflow-y-auto no-scrollbar px-5 pb-8 flex flex-col">
        
        {/* Banner: Hasaki Clinic Chăm sóc da cá nhân hóa matching Hình 1 */}
        <div className="w-full rounded-[22px] overflow-hidden shadow-xs border border-emerald-900/[0.06] mb-4 bg-white">
          <img
            src="/images/clinic_routine_banner.png"
            alt="Chăm sóc da cá nhân hóa tại Hasaki Clinic"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Tab Pills: Chu trình cơ bản & Chu trình nâng cao matching Hình 1 */}
        <div className="flex items-center gap-3 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('co-ban')}
            className={`px-5 py-2 rounded-full text-[13.5px] font-semibold transition-all cursor-pointer shadow-xs ${
              activeTab === 'co-ban'
                ? 'bg-[#8faea0] text-[#105e3f] font-bold'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            Chu trình cơ bản
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('nang-cao')}
            className={`px-5 py-2 rounded-full text-[13.5px] font-semibold transition-all cursor-pointer shadow-xs ${
              activeTab === 'nang-cao'
                ? 'bg-[#8faea0] text-[#105e3f] font-bold'
                : 'bg-white text-[#105e3f] border-[1.5px] border-[#52826a] hover:bg-emerald-50/50'
            }`}
          >
            Chu trình nâng cao
          </button>
        </div>

        {/* Section Heading matching Hình 1 */}
        <h2 className="text-[#105e3f] font-extrabold text-[19px] tracking-tight mb-3">
          Chu trình hàng ngày
        </h2>

        {/* Main Card: matching Hình 1 */}
        <div className="bg-white rounded-[22px] overflow-hidden border border-emerald-900/[0.08] shadow-xs">
          
          {/* Top White Section */}
          <div className="p-4 bg-white">
            <h3 className="font-extrabold text-[15.5px] text-[#105e3f]">
              {activeTab === 'co-ban' ? 'Chăm sóc da cơ bản' : 'Chăm sóc da nâng cao (Treatment)'}
            </h3>
            
            <p className="text-[13px] text-slate-600 mt-1 leading-relaxed font-medium">
              {activeTab === 'co-ban' 
                ? 'Chu trình chăm sóc da nền tảng giúp làm sạch sâu, cân bằng độ ẩm và bảo vệ da hàng ngày.'
                : 'Lộ trình chăm sóc da kết hợp hoạt chất điều trị chuyên sâu, phục hồi màng bảo vệ và chống lão hóa.'
              }
            </p>

            <div className="font-bold text-slate-900 text-[13.5px] mt-2.5">
              Đã tạo 02:26 - 30/10/2026
            </div>
          </div>

          {/* Morning Row (Warm Cream / Yellow bg matching Hình 1) */}
          <div
            onClick={() => setSelectedRoutine('morning')}
            className="bg-[#faecc0] hover:bg-[#f6e6b4] active:opacity-95 p-4 flex items-center justify-between cursor-pointer transition-colors border-t border-amber-200/50"
          >
            <div className="flex items-center gap-3.5">
              {/* Sun outline icon */}
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <svg 
                  className="w-9 h-9 text-[#d97706]" 
                  viewBox="0 0 48 48" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="24" cy="24" r="10" />
                  <path d="M24 6v4M24 38v4M6 24h4M38 24h4M11.3 11.3l2.8 2.8M33.9 33.9l2.8 2.8M11.3 36.7l2.8-2.8M33.9 14.1l2.8-2.8" />
                </svg>
              </div>

              <div>
                <h4 className="font-bold text-[14.5px] text-slate-900 leading-tight">
                  Chu trình chăm sóc da sáng
                </h4>
                <p className="text-[12px] text-slate-700 mt-0.5 font-medium">
                  7:00, Mỗi ngày
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[12.5px]">
              <span>{activeTab === 'co-ban' ? '5 Bước' : '6 Bước'}</span>
              <ChevronRight className="w-4 h-4 text-slate-700 stroke-[2.4]" />
            </div>
          </div>

          {/* Night Row (Soft Mint / Green bg matching Hình 1) */}
          <div
            onClick={() => setSelectedRoutine('night')}
            className="bg-[#bfe0cb] hover:bg-[#b5d8c1] active:opacity-95 p-4 flex items-center justify-between cursor-pointer transition-colors border-t border-emerald-200/50"
          >
            <div className="flex items-center gap-3.5">
              {/* Moon outline icon */}
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <svg 
                  className="w-8 h-8 text-[#105e3f]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </div>

              <div>
                <h4 className="font-bold text-[14.5px] text-slate-900 leading-tight">
                  Chu trình chăm sóc da tối
                </h4>
                <p className="text-[12px] text-slate-700 mt-0.5 font-medium">
                  21:00, Mỗi ngày
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[12.5px]">
              <span>{activeTab === 'co-ban' ? '7 Bước' : '8 Bước'}</span>
              <ChevronRight className="w-4 h-4 text-slate-700 stroke-[2.4]" />
            </div>
          </div>

        </div>

        {/* Extra Helpful Tip Box */}
        <div className="mt-5 bg-white rounded-[20px] p-4 border border-emerald-900/[0.06] shadow-xs flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-[#105e3f] flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-[13px] text-[#105e3f]">
              Lời khuyên từ Dược sĩ Hasaki
            </h5>
            <p className="text-[12px] text-slate-600 mt-0.5 leading-relaxed font-medium">
              Bạn có thể nhấn vào từng chu trình buổi sáng hoặc buổi tối ở trên để xem chi tiết hướng dẫn từng bước và danh mục sản phẩm khuyên dùng.
            </p>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* MODAL / BOTTOM SHEET: CHI TIẾT CÁC BƯỚC SKINCARE              */}
      {/* ============================================================== */}
      {activeRoutineData && (
        <div className="absolute inset-0 z-50 bg-black/55 backdrop-blur-xs flex flex-col justify-end animate-fade-in">
          <div className="w-full max-h-[88vh] bg-white rounded-t-[28px] overflow-hidden shadow-2xl flex flex-col animate-slide-up">
            
            {/* Sheet Header */}
            <div 
              style={{ backgroundColor: activeRoutineData.themeColor }}
              className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-black/[0.06]"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                  {activeRoutineData.time}
                </span>
                <h3 className="text-[16px] font-extrabold text-slate-900 leading-tight">
                  {activeRoutineData.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedRoutine(null)}
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Description */}
            <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100">
              <p className="text-[12px] text-slate-600 font-medium leading-relaxed">
                {activeRoutineData.description}
              </p>
            </div>

            {/* Steps List */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-3.5">
              {activeRoutineData.steps.map((step) => (
                <div 
                  key={step.num}
                  className="bg-white rounded-[18px] p-3.5 border border-emerald-900/[0.08] shadow-xs flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-[#105e3f] text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {step.num}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-[13.5px] text-[#105e3f] leading-snug">
                      {step.name}
                    </h4>
                    
                    <p className="text-[12px] text-slate-700 mt-1 leading-relaxed font-medium">
                      {step.detail}
                    </p>

                    <div className="mt-2 bg-emerald-50/80 rounded-xl px-2.5 py-1.5 border border-emerald-200/60 flex items-center gap-1.5 text-[11px] text-[#105e3f] font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span className="line-clamp-1">Gợi ý: {step.recommend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sheet Footer */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <button
                type="button"
                onClick={() => setSelectedRoutine(null)}
                className="w-full h-[46px] rounded-[18px] bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[14px] shadow-sm transition-all cursor-pointer"
              >
                Đã hiểu chu trình
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
