import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  ShoppingCart, 
  CheckCircle2, 
  Star, 
  Zap, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  Plus, 
  Minus,
  Sparkles,
  ShoppingBag,
  Filter
} from 'lucide-react';
import { 
  morningSteps, 
  eveningSteps, 
  morningProducts, 
  eveningProducts 
} from '../data/phuHopProductsData';

// Realistic vector product illustrations matching the reference bottles & tubes
function ProductGraphic({ type, name = '' }) {
  switch (type) {
    case 'effaclar_gel': // La Roche-Posay Effaclar Gel (Tall Cyan-Blue Pump Bottle)
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          {/* Pump Nozzle */}
          <path d="M40 8 L40 18" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 10 L26 12 C24 12 24 15 26 15 L40 15" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          {/* Pump Collar */}
          <rect x="34" y="18" width="12" height="7" rx="1.5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          {/* Bottle Neck */}
          <rect x="36" y="25" width="8" height="5" fill="#0284c7" />
          {/* Bottle Shoulder */}
          <path d="M36 30 C30 32 23 37 23 44 L23 125 C23 130 27 134 32 134 L48 134 C53 134 57 130 57 125 L57 44 C57 37 50 32 44 30 Z" 
                fill="url(#blueGelGrad)" stroke="#0369a1" strokeWidth="1.2" />
          {/* Liquid highlight */}
          <path d="M26 44 L26 122 C26 125 28 128 31 128" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
          {/* Label White Box */}
          <rect x="27" y="55" width="26" height="50" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
          {/* Label Texts */}
          <rect x="29" y="59" width="10" height="2.5" fill="#0284c7" />
          <rect x="29" y="64" width="22" height="2" fill="#0f172a" />
          <rect x="29" y="68" width="18" height="1.8" fill="#334155" />
          <rect x="29" y="73" width="20" height="10" fill="#f1f5f9" />
          <rect x="31" y="76" width="16" height="1.5" fill="#0284c7" />
          <rect x="29" y="87" width="14" height="1.5" fill="#64748b" />
          <rect x="29" y="91" width="18" height="1.5" fill="#64748b" />
          <rect x="29" y="97" width="22" height="3" rx="1" fill="#0284c7" />
          {/* Gradients */}
          <defs>
            <linearGradient id="blueGelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#009fe3" />
              <stop offset="40%" stopColor="#0284c7" />
              <stop offset="80%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'effaclar_duo': // La Roche-Posay Effaclar Duo+ (Slender White Tube with pointed nozzle)
      return (
        <svg viewBox="0 0 80 140" className="w-13 h-24 drop-shadow-sm select-none">
          {/* Cap Base */}
          <rect x="33" y="112" width="14" height="20" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          {/* Slender Tube Body */}
          <path d="M26 16 L54 16 L49 112 L31 112 Z" fill="url(#whiteTubeGrad)" stroke="#cbd5e1" strokeWidth="1.2" />
          {/* Crimped top */}
          <rect x="25" y="12" width="30" height="5" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
          {/* Labeling */}
          <rect x="32" y="30" width="8" height="2" fill="#0284c7" />
          <rect x="32" y="35" width="16" height="2" fill="#0f172a" />
          <rect x="32" y="40" width="14" height="1.5" fill="#475569" />
          <rect x="32" y="45" width="16" height="15" fill="#f1f5f9" />
          <rect x="34" y="49" width="12" height="2" fill="#0284c7" />
          <rect x="34" y="54" width="10" height="1.5" fill="#0284c7" />
          <text x="40" y="78" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#0f172a">DUO(+)</text>
          <rect x="34" y="85" width="12" height="1.2" fill="#64748b" />
          <rect x="35" y="89" width="10" height="1.2" fill="#64748b" />
          <defs>
            <linearGradient id="whiteTubeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'anthelios_sun': // La Roche-Posay Anthelios Sunscreen (Pocket bottle with orange banner)
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          {/* Cap */}
          <rect x="34" y="14" width="12" height="16" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          {/* Bottle body */}
          <rect x="24" y="30" width="32" height="92" rx="7" fill="url(#whiteTubeGrad)" stroke="#cbd5e1" strokeWidth="1.2" />
          {/* Distinctive Orange Banner */}
          <rect x="25" y="48" width="30" height="16" fill="#ea580c" />
          <text x="40" y="56" textAnchor="middle" fontSize="4.8" fontWeight="bold" fill="#ffffff">ANTHELIOS</text>
          <text x="40" y="61" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#ffedd5">UVMUNE 400</text>
          {/* SPF Badge */}
          <circle cx="34" cy="74" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
          <text x="34" y="76" textAnchor="middle" fontSize="4" fontWeight="extrabold" fill="#854d0e">50+</text>
          <rect x="42" y="71" width="10" height="1.5" fill="#0f172a" />
          <rect x="42" y="74" width="8" height="1.2" fill="#64748b" />
          <rect x="29" y="86" width="22" height="1.5" fill="#475569" />
          <rect x="31" y="90" width="18" height="1.5" fill="#475569" />
          <rect x="33" y="102" width="14" height="2" rx="1" fill="#0284c7" />
        </svg>
      );

    case 'hyalu_b5': // La Roche-Posay Hyalu B5 Serum (Dropper Blue Bottle)
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          {/* Dropper bulb */}
          <path d="M37 6 C37 3 43 3 43 6 L43 14 L37 14 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          {/* Dropper Cap */}
          <rect x="33" y="14" width="14" height="14" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          {/* Bottle Neck */}
          <rect x="36" y="28" width="8" height="6" fill="#0284c7" />
          {/* Glass Bottle Body */}
          <rect x="26" y="34" width="28" height="88" rx="6" fill="url(#deepBlueGrad)" stroke="#0369a1" strokeWidth="1.2" />
          {/* Glass reflection */}
          <path d="M29 38 L29 116" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          {/* White Label */}
          <rect x="29" y="52" width="22" height="48" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
          <rect x="31" y="56" width="6" height="2" fill="#0284c7" />
          <rect x="31" y="61" width="18" height="2" fill="#0f172a" />
          <text x="40" y="72" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#0284c7">HYALU</text>
          <text x="40" y="80" textAnchor="middle" fontSize="7" fontWeight="extrabold" fill="#0369a1">B5</text>
          <rect x="32" y="87" width="16" height="1.5" fill="#475569" />
          <rect x="34" y="91" width="12" height="1.5" fill="#64748b" />
          <defs>
            <linearGradient id="deepBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'cicaplast_b5': // La Roche-Posay Cicaplast Baume B5 (White Balm Tube)
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          {/* Wide Cap */}
          <rect x="30" y="108" width="20" height="22" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          {/* Tube Body */}
          <path d="M24 16 L56 16 L50 108 L30 108 Z" fill="url(#whiteTubeGrad)" stroke="#cbd5e1" strokeWidth="1.2" />
          {/* Top Crimp */}
          <rect x="23" y="12" width="34" height="5" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
          {/* Label Details */}
          <rect x="30" y="28" width="8" height="2" fill="#0284c7" />
          <rect x="30" y="33" width="16" height="2" fill="#0f172a" />
          <text x="40" y="47" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#0f172a">CICAPLAST</text>
          <text x="40" y="55" textAnchor="middle" fontSize="6.5" fontWeight="extrabold" fill="#0284c7">BAUME B5+</text>
          <rect x="28" y="62" width="24" height="2" fill="#0284c7" />
          <rect x="31" y="69" width="18" height="1.5" fill="#475569" />
          <rect x="33" y="73" width="14" height="1.5" fill="#64748b" />
          <rect x="32" y="82" width="16" height="1.5" fill="#64748b" />
        </svg>
      );

    case 'bioderma_sebium': // Bioderma Sébium H2O (Round bottle with green cap)
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          {/* Green Cap */}
          <rect x="34" y="12" width="12" height="12" rx="3" fill="#16a34a" stroke="#15803d" strokeWidth="1" />
          {/* Clear Bottle */}
          <rect x="23" y="24" width="34" height="102" rx="10" fill="url(#clearBottleGrad)" stroke="#cbd5e1" strokeWidth="1.2" />
          {/* Label */}
          <rect x="26" y="46" width="28" height="56" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
          <text x="40" y="56" textAnchor="middle" fontSize="5.5" fontWeight="extrabold" fill="#0f172a">BIODERMA</text>
          <rect x="30" y="61" width="20" height="2.5" fill="#16a34a" />
          <text x="40" y="71" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#15803d">Sébium H2O</text>
          <rect x="32" y="77" width="16" height="1.5" fill="#475569" />
          <rect x="34" y="81" width="12" height="1.5" fill="#64748b" />
          <rect x="30" y="89" width="20" height="3" rx="1" fill="#16a34a" />
          <defs>
            <linearGradient id="clearBottleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="40%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'cerave_cleanser': // CeraVe Foaming Cleanser (Teal-White pump bottle)
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          <path d="M40 8 L40 18" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 10 L26 12 C24 12 24 15 26 15 L40 15" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
          <rect x="34" y="18" width="12" height="7" rx="1.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="24" y="26" width="32" height="98" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
          {/* Teal left banner */}
          <rect x="25" y="27" width="6" height="96" fill="#0d9488" />
          {/* Logo & details */}
          <text x="43" y="44" textAnchor="middle" fontSize="7" fontWeight="extrabold" fill="#0d9488">CeraVe</text>
          <text x="43" y="52" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#0f172a">Foaming</text>
          <text x="43" y="57" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#0f172a">Cleanser</text>
          <rect x="34" y="65" width="18" height="1.5" fill="#64748b" />
          <rect x="34" y="69" width="16" height="1.5" fill="#64748b" />
          <rect x="34" y="73" width="14" height="1.5" fill="#0d9488" />
        </svg>
      );

    case 'torriden_toner': // Torriden Toner (Ice blue cylindrical bottle)
    case 'torriden_serum':
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          <rect x="35" y="14" width="10" height="12" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="26" y="26" width="28" height="98" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.2" />
          <rect x="28" y="45" width="24" height="50" rx="2" fill="#ffffff" stroke="#bae6fd" strokeWidth="0.8" />
          <text x="40" y="58" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#0284c7">Torriden</text>
          <text x="40" y="66" textAnchor="middle" fontSize="4.5" fontWeight="semibold" fill="#0369a1">DIVE-IN</text>
          <rect x="33" y="74" width="14" height="1.5" fill="#38bdf8" />
          <rect x="35" y="78" width="10" height="1.5" fill="#94a3b8" />
        </svg>
      );

    case 'klairs_toner': // Klairs Supple Preparation Toner (Amber bottle)
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          <rect x="34" y="14" width="12" height="14" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="25" y="28" width="30" height="98" rx="6" fill="#78350f" stroke="#451a03" strokeWidth="1.2" />
          <rect x="28" y="46" width="24" height="56" rx="2" fill="#fef3c7" stroke="#fde68a" strokeWidth="0.8" />
          <text x="40" y="58" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#78350f">klairs</text>
          <text x="40" y="66" textAnchor="middle" fontSize="4" fontWeight="semibold" fill="#92400e">Supple Prep</text>
          <rect x="32" y="74" width="16" height="1.5" fill="#b45309" />
          <rect x="34" y="79" width="12" height="1.5" fill="#92400e" />
        </svg>
      );

    case 'somebymi_toner': // Some By Mi AHA BHA PHA (Green bottle)
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          <rect x="34" y="14" width="12" height="12" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="26" y="26" width="28" height="98" rx="6" fill="#14532d" stroke="#052e16" strokeWidth="1.2" />
          <rect x="28" y="45" width="24" height="54" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
          <text x="40" y="56" textAnchor="middle" fontSize="4.8" fontWeight="bold" fill="#15803d">SOME BY MI</text>
          <text x="40" y="63" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#0f172a">AHA•BHA•PHA</text>
          <rect x="32" y="71" width="16" height="2" fill="#15803d" />
          <text x="40" y="80" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#b91c1c">30 DAYS</text>
        </svg>
      );

    case 'skin1004_ampoule': // Skin1004 Centella (Golden amber bottle)
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          <path d="M37 6 C37 3 43 3 43 6 L43 14 L37 14 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="34" y="14" width="12" height="12" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="25" y="26" width="30" height="96" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
          <rect x="28" y="46" width="24" height="50" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
          <text x="40" y="58" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#854d0e">SKIN1004</text>
          <text x="40" y="66" textAnchor="middle" fontSize="5" fontWeight="semibold" fill="#0f172a">CENTELLA</text>
          <rect x="33" y="74" width="14" height="1.5" fill="#ca8a04" />
        </svg>
      );

    case 'anessa_milk': // Anessa Gold Sunscreen Bottle
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          <rect x="34" y="14" width="12" height="14" rx="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          <rect x="25" y="28" width="30" height="92" rx="8" fill="#fde68a" stroke="#d97706" strokeWidth="1.2" />
          <circle cx="40" cy="50" r="8" fill="#f59e0b" />
          <text x="40" y="70" textAnchor="middle" fontSize="6.5" fontWeight="extrabold" fill="#78350f">ANESSA</text>
          <text x="40" y="78" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#92400e">Perfect UV</text>
          <rect x="32" y="86" width="16" height="2" fill="#d97706" />
        </svg>
      );

    default: // Generic elegant Hasaki product cosmetic bottle
      return (
        <svg viewBox="0 0 80 140" className="w-14 h-24 drop-shadow-sm select-none">
          <rect x="35" y="14" width="10" height="12" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="26" y="26" width="28" height="96" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.2" />
          <rect x="29" y="44" width="22" height="52" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
          <rect x="32" y="54" width="16" height="2" fill="#105e3f" />
          <rect x="34" y="60" width="12" height="1.5" fill="#64748b" />
          <rect x="33" y="66" width="14" height="1.5" fill="#0f172a" />
        </svg>
      );
  }
}

export default function ScreenSanPhamPhuHop({ 
  user = { name: 'Nguyễn Văn A' }, 
  onBackToHome 
}) {
  // Routine tab: 'morning' (Buổi sáng - Hình 1) | 'evening' (Buổi tối - Hình 2)
  const [activeRoutine, setActiveRoutine] = useState('morning');
  
  // Optional filter by specific step (null = show all steps)
  const [selectedStepFilter, setSelectedStepFilter] = useState(null);

  // Shopping cart & buy modal
  const [selectedProductForBuy, setSelectedProductForBuy] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [actionToast, setActionToast] = useState(null);

  const showToast = (message) => {
    setActionToast(message);
    setTimeout(() => {
      setActionToast(null);
    }, 3200);
  };

  const currentSteps = activeRoutine === 'morning' ? morningSteps : eveningSteps;
  const rawProducts = activeRoutine === 'morning' ? morningProducts : eveningProducts;

  const currentProducts = selectedStepFilter 
    ? rawProducts.filter(p => p.stepId === selectedStepFilter)
    : rawProducts;

  const handleOpenBuy = (prod) => {
    setSelectedProductForBuy(prod);
    setBuyQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selectedProductForBuy) return;
    setCartCount(prev => prev + buyQuantity);
    showToast(`Đã thêm ${buyQuantity}x "${selectedProductForBuy.name}" vào giỏ hàng Hasaki!`);
    setSelectedProductForBuy(null);
  };

  const handleOpenHasakiShoppingApp = () => {
    if (!selectedProductForBuy) return;
    showToast(`Đang mở sản phẩm trên ứng dụng Hasaki Shopping...`);
    setSelectedProductForBuy(null);
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col bg-[#eff4ef] select-none text-slate-800 overflow-hidden font-sans">
      
      {/* Toast Notification */}
      {actionToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-[12.5px] font-bold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* Top Header Bar matching Hình 1 & 2 */}
      <div className="px-5 pt-3 pb-2.5 flex-shrink-0 bg-white shadow-xs z-10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-slate-900 font-extrabold text-[18px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
            <span>Sản phẩm phù hợp</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Shopping Cart Shortcut */}
            {cartCount > 0 && (
              <div className="relative px-2 py-1 rounded-full bg-emerald-50 text-[#105e3f] text-[11px] font-bold flex items-center gap-1">
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{cartCount}</span>
              </div>
            )}
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
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 scroll-smooth">
        
        {/* Subtitle text */}
        <p className="text-center text-[13.5px] text-slate-700 font-medium mb-3.5">
          Sản phẩm dựa trên hồ sơ da của bạn.
        </p>

        {/* Toggle Buttons: Buổi sáng / Buổi tối */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={() => {
              setActiveRoutine('morning');
              setSelectedStepFilter(null);
            }}
            className={`py-2.5 px-4 rounded-full font-bold text-[13.5px] transition-all cursor-pointer text-center ${
              activeRoutine === 'morning'
                ? 'bg-[#105e3f] text-white shadow-xs'
                : 'bg-[#d2d6d3] text-slate-800 hover:bg-[#c5cbc6]'
            }`}
          >
            Buổi sáng
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRoutine('evening');
              setSelectedStepFilter(null);
            }}
            className={`py-2.5 px-4 rounded-full font-bold text-[13.5px] transition-all cursor-pointer text-center ${
              activeRoutine === 'evening'
                ? 'bg-[#105e3f] text-white shadow-xs'
                : 'bg-[#d2d6d3] text-slate-800 hover:bg-[#c5cbc6]'
            }`}
          >
            Buổi tối
          </button>
        </div>

        {/* Routine Steps Pills List */}
        <div className="space-y-2 mb-4">
          {currentSteps.map((st) => {
            const isSelected = selectedStepFilter === st.id;
            return (
              <div
                key={st.id}
                onClick={() => {
                  // Toggle filter on/off
                  setSelectedStepFilter(prev => prev === st.id ? null : st.id);
                }}
                className={`bg-white rounded-full px-4 py-2.5 shadow-2xs border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected 
                    ? 'border-[#105e3f] ring-2 ring-emerald-500/20 bg-emerald-50/30' 
                    : 'border-gray-100 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-[14px] text-slate-900 w-6">
                    {st.number}
                  </span>
                  <span className="font-semibold text-[13.5px] text-slate-800 group-hover:text-[#105e3f] transition-colors">
                    {st.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] text-gray-400 group-hover:text-emerald-700 transition-colors">
                    {st.category === 'cleanser' ? 'Sữa rửa mặt' :
                     st.category === 'toner' ? 'Toner' :
                     st.category === 'serum' ? 'Serum' :
                     st.category === 'moisturizer' ? 'Kem dưỡng' :
                     st.category === 'sunscreen' ? 'Kem chống nắng' :
                     st.category === 'remover' ? 'Nước tẩy trang' :
                     st.category === 'peeling' ? 'Tẩy da chết' :
                     st.category === 'recovery' ? 'Phục hồi' : 'Trị mụn'}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#105e3f]"></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Title & Filter Chip */}
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-extrabold text-[15.5px] text-slate-900">
            Sản phẩm được đề xuất
          </h3>

          {selectedStepFilter && (
            <button
              type="button"
              onClick={() => setSelectedStepFilter(null)}
              className="text-[11.5px] text-[#105e3f] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Xem tất cả ({rawProducts.length})</span>
            </button>
          )}
        </div>

        {/* Product Cards List */}
        <div className="space-y-3">
          {currentProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl p-3.5 shadow-xs border border-gray-100 hover:border-emerald-300/80 transition-all flex flex-col gap-2.5"
            >
              <div className="flex items-start gap-3.5">
                {/* Product Image / Vector Illustration */}
                <div className="w-[72px] h-[105px] bg-[#f8faf8] rounded-2xl p-1.5 flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <ProductGraphic type={prod.svgType} name={prod.name} />
                </div>

                {/* Product Information */}
                <div className="flex-1 min-w-0">
                  {/* Step Badge */}
                  <div className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-[#105e3f] text-[10.5px] font-bold mb-1">
                    Bước {prod.stepNumber} • {prod.stepName}
                  </div>

                  {/* Title */}
                  <h4 className="font-extrabold text-[13.5px] text-slate-900 leading-snug">
                    {prod.name}
                  </h4>

                  {/* Subtitle */}
                  <p className="text-[11.5px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                    {prod.subtitle}
                  </p>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="font-extrabold text-[14.5px] text-[#105e3f]">
                      {prod.price}
                    </span>
                    <span className="text-[11px] text-gray-400 line-through">
                      {prod.originalPrice}
                    </span>
                    <span className="text-[10px] text-rose-600 bg-rose-50 font-bold px-1.5 py-0.2 rounded">
                      {prod.discount}
                    </span>
                  </div>

                  {/* Rating & Delivery Badge */}
                  <div className="flex items-center gap-3 mt-1 text-[10.5px] text-gray-500">
                    <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {prod.rating}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-emerald-700 font-medium">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      {prod.delivery}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shopping Action Row: liên kết với Hasaki Shopping */}
              <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenBuy(prod)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#105e3f] hover:bg-[#0c4a31] active:scale-98 text-white font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Mua trên Hasaki</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCartCount(prev => prev + 1);
                    showToast(`Đã thêm nhanh "${prod.name}" vào giỏ hàng!`);
                  }}
                  className="p-2 rounded-xl bg-[#f0f5f2] hover:bg-[#e4ede7] text-[#105e3f] transition-colors cursor-pointer"
                  title="Thêm nhanh vào giỏ"
                  aria-label="Thêm nhanh vào giỏ"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ============================================================== */}
      {/* SHOPPING POPUP MODAL (Liên kết với Hasaki Shopping App)         */}
      {/* ============================================================== */}
      {selectedProductForBuy && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[1px] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl w-full max-w-[360px] space-y-4 animate-in slide-in-from-bottom duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#105e3f] text-white flex items-center justify-center font-extrabold text-[12px]">
                  H
                </div>
                <div>
                  <h4 className="font-extrabold text-[13.5px] text-slate-900 leading-tight">
                    Hasaki Shopping
                  </h4>
                  <p className="text-[10px] text-emerald-700 font-semibold">
                    100% Chính Hãng • Freeship 2H
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProductForBuy(null)}
                className="p-1 text-gray-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Summary */}
            <div className="flex items-center gap-3 bg-[#f7faf8] p-3 rounded-2xl border border-emerald-50">
              <div className="w-14 h-20 bg-white rounded-xl p-1 flex items-center justify-center flex-shrink-0 border border-gray-100">
                <ProductGraphic type={selectedProductForBuy.svgType} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wide">
                  {selectedProductForBuy.brand} • {selectedProductForBuy.volume}
                </span>
                <h5 className="font-extrabold text-[13px] text-slate-900 leading-snug line-clamp-2 mt-0.5">
                  {selectedProductForBuy.name}
                </h5>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-extrabold text-[15px] text-[#105e3f]">
                    {selectedProductForBuy.price}
                  </span>
                  <span className="text-[11px] text-gray-400 line-through">
                    {selectedProductForBuy.originalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Hasaki Advantages */}
            <div className="space-y-1.5 text-[11px] text-slate-600 bg-gray-50 p-2.5 rounded-xl">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>NowFree 2H: Giao nhanh miễn phí trong 2 giờ tại TP.HCM & Hà Nội</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>Tích lũy Hasaki Xu: <strong>+{selectedProductForBuy.hasakiPoints} xu</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Cam kết đền bù 200% nếu phát hiện hàng giả</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[12.5px] font-semibold text-slate-700">
                Số lượng:
              </span>
              <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                <button
                  type="button"
                  onClick={() => setBuyQuantity(q => Math.max(1, q - 1))}
                  className="text-gray-600 hover:text-slate-900 p-0.5 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-extrabold text-[13px] text-slate-900 min-w-4 text-center">
                  {buyQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => setBuyQuantity(q => q + 1)}
                  className="text-gray-600 hover:text-slate-900 p-0.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3 rounded-full bg-[#105e3f] hover:bg-[#0c4a31] text-white font-bold text-[13.5px] flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm vào giỏ hàng Hasaki</span>
              </button>

              <button
                type="button"
                onClick={handleOpenHasakiShoppingApp}
                className="w-full py-2.5 rounded-full bg-[#eaf2ee] hover:bg-[#d8e8de] text-[#105e3f] font-bold text-[12.5px] flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Mở trên App Hasaki Shopping</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
