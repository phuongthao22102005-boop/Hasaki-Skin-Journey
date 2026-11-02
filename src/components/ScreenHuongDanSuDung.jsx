import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  ChevronRight, 
  AlertCircle, 
  Sparkles, 
  X,
  Info,
  Clock
} from 'lucide-react';

export default function ScreenHuongDanSuDung({ 
  onBackToHome 
}) {
  const [toastMessage, setToastMessage] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const guideItems = [
    {
      id: 'dat-lich',
      title: 'Hướng dẫn đặt lịch'
    },
    {
      id: 'thanh-toan',
      title: 'Hướng dẫn thanh toán'
    },
    {
      id: 'danh-gia',
      title: 'Hướng dẫn đánh giá'
    }
  ];

  const handleItemClick = (item) => {
    setActiveItem(item);
    setToastMessage('Chức năng đang được phát triển');
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col bg-[#eff4ef] select-none text-slate-800 overflow-hidden font-sans">
      
      {/* Toast Notification: "Chức năng đang được phát triển" */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-[13px] font-bold px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-white/10">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar matching Hình 1 */}
      <div className="px-5 pt-3 pb-3 flex-shrink-0 bg-white shadow-xs z-10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
            <span>Hướng dẫn sử dụng</span>
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

      {/* Main Content: 3 Cards matching Hình 1 */}
      <div className="flex-1 p-4 space-y-3.5">
        {guideItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex items-center justify-between cursor-pointer hover:border-emerald-300 hover:shadow-sm transition-all active:scale-[0.99] group"
          >
            <h3 className="font-extrabold text-[#105e3f] text-[16.5px] group-hover:text-[#0c4a31] transition-colors">
              {item.title}
            </h3>

            <ChevronRight className="w-5 h-5 text-slate-600 stroke-[2.4] group-hover:translate-x-0.5 transition-transform" />
          </div>
        ))}

        {/* Small in-page notice when clicked */}
        {activeItem && (
          <div className="mt-4 p-4 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs text-center animate-in fade-in slide-in-from-bottom-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11.5px] font-bold mb-1.5 border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Chức năng đang được phát triển</span>
            </div>
            <p className="text-[12px] text-slate-600 mt-1">
              Mục <strong className="text-slate-900 font-extrabold">"{activeItem.title}"</strong> đang được đội ngũ Hasaki hoàn thiện và sẽ sớm ra mắt.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
