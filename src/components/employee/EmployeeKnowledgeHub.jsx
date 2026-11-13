import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ShoppingBag, 
  Stethoscope, 
  HelpCircle, 
  Sparkles, 
  Tag, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { 
  knowledgeHubProducts, 
  knowledgeHubServices, 
  consultationGuidelines 
} from '../../data/employeeData';

export default function EmployeeKnowledgeHub({ employeeUser }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'services', 'guidelines'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter products
  const filteredProducts = knowledgeHubProducts.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = 
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.activeIngredients?.toLowerCase().includes(q) ||
      p.targetSkin?.toLowerCase().includes(q);

    if (!matchQuery) return false;
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  // Filter services
  const filteredServices = knowledgeHubServices.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = 
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q) ||
      s.technology?.toLowerCase().includes(q) ||
      s.indication?.toLowerCase().includes(q);

    return matchQuery;
  });

  // Filter guidelines
  const filteredGuidelines = consultationGuidelines.filter((g) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = 
      !q ||
      g.concern.toLowerCase().includes(q) ||
      g.assessmentCriteria?.some((c) => c.toLowerCase().includes(q)) ||
      g.recommendedRoutine?.morning?.some((m) => m.toLowerCase().includes(q));

    return matchQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#105e3f] font-bold text-xs">
            <BookOpen className="w-4 h-4" />
            <span>Kho Tri Thức &amp; Tiêu Chuẩn Hasaki (Internal Hub)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Knowledge Hub Cho Bác Sĩ &amp; Tư Vấn Viên
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tra cứu nhanh thành phần mỹ phẩm, chỉ định dịch vụ Clinic và cẩm nang phác đồ chuẩn y khoa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Người tra cứu:</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#105e3f]">
            {employeeUser?.name || 'BS. CKI Vũ Hoài Nam'}
          </span>
        </div>
      </div>

      {/* Navigation Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tra cứu thành phần (B5, Niacinamide, BHA), tên sản phẩm hoặc dịch vụ..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#105e3f]/20 focus:border-[#105e3f] text-xs text-slate-800"
            />
          </div>

          {/* Tab Selectors */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-[#105e3f] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Sản phẩm Skincare ({filteredProducts.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'services'
                  ? 'bg-[#105e3f] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Dịch vụ Clinic ({filteredServices.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('guidelines')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'guidelines'
                  ? 'bg-[#105e3f] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Phác đồ theo vấn đề da ({filteredGuidelines.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: SKINCARE PRODUCTS */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-gray-200 p-5 shadow-2xs hover:border-emerald-300 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <span className="text-[11px] font-black text-emerald-700 tracking-wider uppercase">
                    {prod.brand} • {prod.category}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mt-0.5">
                    {prod.name}
                  </h3>
                </div>
                <span className="text-sm font-black text-[#105e3f] bg-emerald-50 px-2.5 py-1 rounded-xl">
                  {prod.price}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <strong className="text-slate-800 block mb-0.5">Thành phần hoạt chất chính:</strong>
                  <span className="text-slate-600">{prod.activeIngredients}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <strong className="text-[#105e3f] block mb-0.5">Công dụng &amp; Đối tượng da:</strong>
                  <span className="text-slate-700">{prod.keyBenefits}</span>
                  <div className="text-[11px] text-emerald-800 font-semibold mt-1">
                    🎯 Phù hợp: {prod.targetSkin}
                  </div>
                </div>

                <div className="text-slate-700 space-y-1 pt-1">
                  <div>
                    <strong>Hướng dẫn sử dụng:</strong> {prod.usage}
                  </div>
                  <div className="text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 text-[11px]">
                    <strong>Lưu ý chuyên môn:</strong> {prod.precautions}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: CLINIC SERVICES */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 gap-4">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-2xs hover:border-emerald-300 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-blue-100 text-blue-700">
                      {srv.category}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">Thời gian: {srv.duration}</span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base sm:text-lg mt-1">
                    {srv.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-[#105e3f]">{srv.price}</span>
                  <div className="text-[11px] text-gray-400">Giá niêm yết tại Clinic</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <strong className="text-slate-800 block">Công nghệ áp dụng:</strong>
                  <p className="text-slate-600">{srv.technology}</p>
                  <strong className="text-slate-800 block pt-1">Chỉ định lâm sàng:</strong>
                  <p className="text-slate-600">{srv.indication}</p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                  <strong className="text-[#105e3f] block">Quy trình thực hiện:</strong>
                  <p className="text-slate-700">{srv.protocol}</p>
                  <div className="pt-1 text-[11.5px]">
                    <span className="text-rose-700 font-bold block">Thời gian nghỉ dưỡng (Downtime):</span>
                    <span className="text-slate-700">{srv.downtime}</span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
                <strong>Chăm sóc sau điều trị (Bắt buộc dặn khách):</strong> {srv.postCare}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: GUIDELINES BY SKIN CONCERN */}
      {activeTab === 'guidelines' && (
        <div className="space-y-4">
          {filteredGuidelines.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-[#105e3f]" />
                  <span>{guide.concern}</span>
                </h3>
                <span className="text-xs font-bold text-gray-400">Tiêu chuẩn Hasaki Clinic</span>
              </div>

              {/* Assessment criteria */}
              <div className="space-y-2 text-xs">
                <strong className="text-slate-800 block">Tiêu chí nhận diện &amp; Khám lâm sàng:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  {guide.assessmentCriteria?.map((crit, idx) => (
                    <li key={idx}>{crit}</li>
                  ))}
                </ul>
              </div>

              {/* Routine recommendation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1.5">
                  <strong className="text-amber-900 block font-bold">☀️ Routine Sáng khuyên dùng:</strong>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700">
                    {guide.recommendedRoutine?.morning?.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ol>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
                  <strong className="text-indigo-900 block font-bold">🌙 Routine Tối khuyên dùng:</strong>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700">
                    {guide.recommendedRoutine?.night?.map((n, idx) => (
                      <li key={idx}>{n}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Key Notes */}
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
                <strong className="block font-bold">Lưu ý chống chỉ định cho nhân viên tư vấn:</strong>
                <p>{guide.keyNotes}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
