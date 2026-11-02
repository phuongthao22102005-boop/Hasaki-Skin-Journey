import React, { useState, useRef, useEffect } from 'react';
import { ALL_PRODUCTS_CATALOG } from '../data/productsData';
import { 
  ArrowLeft, 
  Home, 
  Check, 
  Sparkles, 
  RefreshCcw, 
  Camera, 
  Sun, 
  Smile, 
  Maximize, 
  ChevronRight, 
  ThumbsUp, 
  ThumbsDown, 
  Plus, 
  X, 
  Search, 
  AlertTriangle,
  Calendar,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export default function ScreenDanhGiaDa({ onBackToHome, onNavigateBooking, onNavigateRoutine, user, onUpdateUser }) {
  // Steps:
  // 1: Bìa (danhgia_screen_1.png)
  // 2: Tuổi (danhgia_screen_2.png)
  // 3: Giới tính (danhgia_screen_3.png)
  // 4: Tình trạng da (danhgia_screen_4.png)
  // 5: Số bước skincare (danhgia_screen_5.png)
  // 6: Các vấn đề da gặp phải (danhgia_flow_1.png - Multi-select)
  // 7: Sản phẩm bạn đang dùng (danhgia_flow_2.png - Search & Custom Add)
  // 8: Cùng tìm hiểu làn da - Chụp ảnh (danhgia_flow_3.png - Camera Live Capture)
  // 9: Kết quả phân tích (danhgia_flow_4.png & danhgia_flow_5.png trong cùng 1 page)
  const [step, setStep] = useState(1);

  // Question answers
  const [selectedAge, setSelectedAge] = useState('20-34');
  const [selectedGender, setSelectedGender] = useState(user?.gender || 'Nam');
  const [selectedCondition, setSelectedCondition] = useState('Vùng chữ T tiết nhiều dầu, 2 má khô');
  const [selectedRoutineSteps, setSelectedRoutineSteps] = useState('4-5 bước');

  // Step 6: Multi-select skin problems (danhgia_flow_1.png)
  const allProblems = [
    'Da khô/ bong tróc',
    'Da đổ dầu',
    'Nếp nhăn',
    'Quầng thâm mắt',
    'Da sần sùi',
    'Mụn/ mụn trứng cá',
    'Lỗ chân lông to',
    'Da không đều màu'
  ];
  const [selectedProblems, setSelectedProblems] = useState([
    'Mụn/ mụn trứng cá',
    'Lỗ chân lông to',
    'Da đổ dầu'
  ]);

  const toggleProblem = (item) => {
    setSelectedProblems(prev => 
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    );
  };

  // Step 7: Products used (danhgia_flow_2.png) - 50+ Sản phẩm Hasaki Catalog
  const [searchProductText, setSearchProductText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [customProducts, setCustomProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([101, 102]); // Default: Torriden & Klairs matching original screen

  const categoriesList = [
    'Tất cả',
    'Đã chọn',
    'Làm sạch da',
    'Toner',
    'Serum',
    'Kem dưỡng ẩm',
    'Kem chống nắng',
    'Chăm sóc chuyên sâu'
  ];

  const allAvailableProducts = [...customProducts, ...ALL_PRODUCTS_CATALOG];

  const handleAddCustomProduct = (e) => {
    if (e) e.preventDefault();
    const text = searchProductText.trim();
    if (!text) return;

    // Check if product already exists
    const existing = allAvailableProducts.find(
      p => p.name.toLowerCase() === text.toLowerCase()
    );

    if (existing) {
      if (!selectedProductIds.includes(existing.id)) {
        setSelectedProductIds(prev => [...prev, existing.id]);
      }
    } else {
      const newProd = {
        id: Date.now(),
        name: text,
        subtitle: 'Sản phẩm người dùng đã tự thêm',
        category: 'Tự thêm',
        brand: 'Cá nhân',
        image: '/images/prod_klairs.png'
      };
      setCustomProducts(prev => [newProd, ...prev]);
      setSelectedProductIds(prev => [newProd.id, ...prev]);
    }
    setSearchProductText('');
  };

  const toggleProductSelect = (id) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredProducts = allAvailableProducts.filter(p => {
    const term = searchProductText.toLowerCase().trim();
    const matchesSearch = !term || 
      p.name.toLowerCase().includes(term) || 
      p.subtitle.toLowerCase().includes(term) || 
      (p.brand && p.brand.toLowerCase().includes(term)) ||
      (p.category && p.category.toLowerCase().includes(term));
    
    if (!matchesSearch) return false;
    if (selectedCategory === 'Tất cả') return true;
    if (selectedCategory === 'Đã chọn') return selectedProductIds.includes(p.id);
    return p.category === selectedCategory;
  });

  // Step 8: Camera connection & Capture
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [cameraErrorMessage, setCameraErrorMessage] = useState('');
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureCountdown, setCaptureCountdown] = useState(null);

  const stopCameraStream = () => {
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach(track => track.stop());
      } catch (e) {
        console.warn('Error stopping tracks:', e);
      }
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsCameraLoading(false);
  };

  const startCameraStream = async () => {
    stopCameraStream();
    setCameraError(false);
    setCameraErrorMessage('');
    setIsCameraLoading(true);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('getUserMedia not supported in this browser');
      setCameraError(true);
      setCameraErrorMessage('Trình duyệt không hỗ trợ WebRTC camera trực tiếp.');
      setIsCameraLoading(false);
      return;
    }

    let stream = null;
    // 1. Try front camera with ideal dimensions
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
    } catch (err1) {
      console.warn('Front camera ideal size failed, trying facingMode only:', err1);
      // 2. Try facingMode only
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false
        });
      } catch (err2) {
        console.warn('Front camera failed, trying any video camera:', err2);
        // 3. Fallback to any video device
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
        } catch (err3) {
          console.warn('All camera attempts failed:', err3);
          setCameraError(true);
          setCameraErrorMessage('Không thể mở camera. Vui lòng cấp quyền hoặc dùng máy ảnh điện thoại.');
          setIsCameraLoading(false);
          return;
        }
      }
    }

    if (stream) {
      streamRef.current = stream;
      if (videoRef.current) {
        const vid = videoRef.current;
        vid.srcObject = stream;
        vid.setAttribute('playsinline', 'true');
        vid.setAttribute('webkit-playsinline', 'true');
        vid.setAttribute('autoplay', 'true');
        vid.setAttribute('muted', 'true');
        vid.muted = true;

        const playVideo = async () => {
          try {
            await vid.play();
            setIsCameraActive(true);
            setIsCameraLoading(false);
          } catch (e) {
            console.warn('vid.play failed:', e);
            setIsCameraActive(true);
            setIsCameraLoading(false);
          }
        };

        if (vid.readyState >= 2) {
          playVideo();
        } else {
          vid.onloadedmetadata = playVideo;
        }
      }
    }
  };

  // Auto-start camera when entering Step 8
  useEffect(() => {
    if (step === 8) {
      startCameraStream();
    } else {
      stopCameraStream();
    }
    return () => {
      stopCameraStream();
    };
  }, [step]);

  // Capture from live video stream to canvas
  const captureFromVideo = () => {
    if (!videoRef.current) return false;
    const vid = videoRef.current;
    const w = vid.videoWidth || vid.clientWidth || 640;
    const h = vid.videoHeight || vid.clientHeight || 640;

    if (!w || !h) {
      console.warn('Video dimensions not available');
      return false;
    }

    try {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;

      // Horizontal flip so selfie matches viewfinder
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(vid, 0, 0, w, h);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setCapturedPhotoUrl(dataUrl);
      stopCameraStream();
      setStep(9);
      return true;
    } catch (err) {
      console.error('Error drawing video to canvas:', err);
      return false;
    }
  };

  // Trigger capture button
  const handleTriggerCapture = () => {
    if (isCapturing) {
      // Instant snap if user clicks during countdown
      const ok = captureFromVideo();
      if (!ok) fileInputRef.current?.click();
      return;
    }

    // If live camera is actively streaming
    if (isCameraActive && videoRef.current) {
      setIsCapturing(true);
      let count = 3;
      setCaptureCountdown(count);

      const timer = setInterval(() => {
        count -= 1;
        if (count > 0) {
          setCaptureCountdown(count);
        } else {
          clearInterval(timer);
          setCaptureCountdown('📸');

          setTimeout(() => {
            const success = captureFromVideo();
            setIsCapturing(false);
            setCaptureCountdown(null);
            if (!success) {
              // Fallback to phone camera if canvas capture failed
              fileInputRef.current?.click();
            }
          }, 350);
        }
      }, 700);
      return;
    }

    // If live camera is not ready, open native phone camera directly
    fileInputRef.current?.click();
  };

  // Handle file selected from native phone camera or gallery
  const handleFileSelected = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setCapturedPhotoUrl(dataUrl);
      stopCameraStream();
      setStep(9);
    };
    reader.readAsDataURL(file);
    // Reset file input value to allow selecting same file again if needed
    e.target.value = '';
  };

  // Step 9: Modals for Detailed Score & Incompatible Products
  const [selectedScoreCard, setSelectedScoreCard] = useState(null);
  const [showIncompatibleDetail, setShowIncompatibleDetail] = useState(false);
  const [showRoutineDetail, setShowRoutineDetail] = useState(null);
  const [feedbackVote, setFeedbackVote] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // 6 Score criteria details
  const scoreDetailsData = {
    'Mụn viêm': {
      score: '6/10',
      status: 'Mức độ cảnh báo trung bình cao',
      analysis: 'Phát hiện các ổ viêm đỏ tại vùng trán và má trái. Nguyên nhân do vi khuẩn C. acnes kết hợp bít tắc cổ nang lông.',
      advice: 'Tránh tự ý nặn mụn tại nhà gây sẹo lõm. Nên sử dụng phác đồ lấy nhân mụn chuẩn y khoa kết hợp chiếu ánh sáng sinh học Blue Light tại Hasaki Clinic.'
    },
    'Mụn không viêm': {
      score: '6/10',
      status: 'Mức độ cảnh báo trung bình',
      analysis: 'Mật độ mụn đầu đen và mụn ẩn li ti rải rác ở cánh mũi và cằm. Tuyến bã nhờn hoạt động quá mức làm ứ đọng keratin.',
      advice: 'Sử dụng Salicylic Acid (BHA 2%) 2-3 lần/tuần để làm sạch sâu cổ nang lông và tẩy da chết hóa học định kỳ.'
    },
    'Sợi bã nhờn': {
      score: '7/10',
      status: 'Mức độ bình thường có kiểm soát',
      analysis: 'Sợi bã nhờn xuất hiện tập trung ở vùng mũi và khóe cằm. Đây là hiện tượng tự nhiên nhưng có thể cải thiện độ mịn.',
      advice: 'Làm sạch kép với dầu/nước tẩy trang dịu nhẹ và xông hơi hút bã nhờn chân không Aqua Peel.'
    },
    'Sẹo': {
      score: '7/10',
      status: 'Nguy cơ sẹo thâm sau viêm',
      analysis: 'Các vết tăng sắc tố sau viêm (PIH/PIE) mới hình thành, chưa xuất hiện sẹo lõm xơ cứng sâu.',
      advice: 'Bổ sung Tranexamic Acid 3% hoặc Niacinamide 10% kết hợp điện di Vitamin C để phục hồi cấu trúc collagen.'
    },
    'Sắc tố da': {
      score: '5/10',
      status: 'Cần lưu ý đặc biệt',
      analysis: 'Vùng trán và gò má có sắc tố không đồng đều, thâm mụn sẫm màu dưới tác động của tia UV.',
      advice: 'Bắt buộc thoa kem chống nắng quang phổ rộng SPF 50+ PA++++ mỗi ngày và thoa lại sau 3-4 tiếng.'
    },
    'Lỗ chân lông': {
      score: '5/10',
      status: 'Cần lưu ý đặc biệt',
      analysis: 'Lỗ chân lông giãn nở rõ rệt ở vùng chữ T và hai bên cánh mũi do dầu nhờn bài tiết nhiều và thiếu độ ẩm tầng sâu.',
      advice: 'Cân bằng ẩm tầng sâu, kết hợp liệu trình Meso vi điểm HA kiềm dầu hoặc Laser Toning thu nhỏ lỗ chân lông.'
    }
  };

  const handlePrev = () => {
    stopCameraStream();
    if (step === 9) {
      setStep(8);
    } else if (step > 1) {
      setStep(step - 1);
    } else {
      onBackToHome();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between bg-[#f2f6f3] select-none text-slate-800">
      
      {/* Top Navigation Bar matching all screens */}
      <div className="px-5 pt-3 pb-2 flex-shrink-0 bg-[#f2f6f3] z-20">
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={handlePrev}
            className="flex items-center gap-2.5 text-[#105e3f] font-bold text-[17px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.6]" />
            <span>Đánh giá tình trạng da</span>
          </button>

          <button
            onClick={() => { stopCameraStream(); onBackToHome(); }}
            className="text-[#105e3f] hover:opacity-80 transition-opacity p-1 cursor-pointer"
            aria-label="Trang chủ"
          >
            <Home className="w-6 h-6 stroke-[2.4]" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-1 overflow-y-auto no-scrollbar px-5 pb-8 flex flex-col">

        {/* ------------------------------------------------------------- */}
        {/* STEP 1: BÌA ĐÁNH GIÁ (danhgia_screen_1.png)                   */}
        {/* ------------------------------------------------------------- */}
        {step === 1 && (
          <div className="flex-1 flex flex-col justify-between items-center text-center animate-fade-in pt-1 pb-4">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[340px] h-[280px] rounded-[24px] overflow-hidden mb-6 shadow-sm border border-emerald-900/[0.06]">
                <img
                  src="/images/skin_model.png"
                  alt="Chăm sóc da Hasaki"
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-[#105e3f] font-extrabold text-[24px] tracking-tight leading-snug mb-3.5">
                Bạn đã thực sự hiểu làn<br />da của mình chưa?
              </h1>

              <p className="text-[13.5px] leading-[20px] text-slate-700 max-w-[320px] font-medium">
                Hãy trả lời chính xác các câu hỏi, những vấn đề bạn đang gặp phải để Hasaki cùng bạn tìm ra lộ trình cá nhân hóa! Việc trả lời sai có thể khiến bạn mất đi cơ hội này.
              </p>
            </div>

            <div className="w-full pt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full h-[54px] rounded-[22px] bg-[#0a6442] hover:bg-[#084e34] active:scale-98 text-white font-bold text-[17px] shadow-md transition-all cursor-pointer flex items-center justify-center"
              >
                Nhấn để tìm hiểu
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 2: TUỔI (danhgia_screen_2.png)                           */}
        {/* ------------------------------------------------------------- */}
        {step === 2 && (
          <div className="flex-1 flex flex-col justify-between pt-2 pb-4 animate-slide-up">
            <div>
              <h1 className="text-[#105e3f] font-extrabold text-[27px] tracking-tight leading-tight text-center mb-7 mt-2">
                Bạn bao nhiêu tuổi?
              </h1>
              <div className="flex flex-col gap-3">
                {['Dưới 20', '20-34', '35-44', '45-60', 'Trên 60'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelectedAge(opt)}
                    className={`w-full h-[52px] px-5 rounded-[20px] border-[1.5px] border-[#105e3f] flex items-center justify-between text-[14.5px] font-medium transition-all cursor-pointer ${
                      selectedAge === opt ? 'bg-emerald-50 text-[#105e3f] shadow-xs' : 'bg-white text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-5 h-5 rounded-full border-2 border-[#105e3f] flex items-center justify-center ${selectedAge === opt ? 'bg-[#105e3f]' : ''}`}>
                      {selectedAge === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <button
                onClick={() => setStep(3)}
                className="w-full h-[54px] rounded-[22px] bg-[#0a6442] hover:bg-[#084e34] text-white font-bold text-[17px] shadow-md cursor-pointer"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 3: GIỚI TÍNH (danhgia_screen_3.png)                      */}
        {/* ------------------------------------------------------------- */}
        {step === 3 && (
          <div className="flex-1 flex flex-col justify-between pt-2 pb-4 animate-slide-up">
            <div>
              <h1 className="text-[#105e3f] font-extrabold text-[27px] tracking-tight leading-tight text-center mb-8 mt-2">
                Bạn thuộc giới tính nào?
              </h1>
              <div className="flex flex-col gap-3.5">
                {['Nữ', 'Nam'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelectedGender(opt)}
                    className={`w-full h-[52px] px-5 rounded-[20px] border-[1.5px] border-[#105e3f] flex items-center justify-between text-[14.5px] font-medium transition-all cursor-pointer ${
                      selectedGender === opt ? 'bg-emerald-50 text-[#105e3f] shadow-xs' : 'bg-white text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-5 h-5 rounded-full border-2 border-[#105e3f] flex items-center justify-center ${selectedGender === opt ? 'bg-[#105e3f]' : ''}`}>
                      {selectedGender === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <button
                onClick={() => {
                  if (onUpdateUser) onUpdateUser({ gender: selectedGender });
                  setStep(4);
                }}
                className="w-full h-[54px] rounded-[22px] bg-[#0a6442] hover:bg-[#084e34] text-white font-bold text-[17px] shadow-md cursor-pointer"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 4: TÌNH TRẠNG DA (danhgia_screen_4.png)                  */}
        {/* ------------------------------------------------------------- */}
        {step === 4 && (
          <div className="flex-1 flex flex-col justify-between pt-2 pb-4 animate-slide-up">
            <div>
              <h1 className="text-[#105e3f] font-extrabold text-[25px] tracking-tight leading-tight text-center mb-6 mt-2">
                Chọn đáp án phù hợp<br />nhất với bạn?
              </h1>
              <div className="flex flex-col gap-3">
                {[
                  'Da khô căng, thiếu độ ẩm, bong tróc',
                  'Da đủ ẩm, không khô rít, không bóng nhờn, mịn màng',
                  'Vùng chữ T và 2 má tiết nhiều dầu, các khu vực khác khô',
                  'Vùng chữ T tiết nhiều dầu, 2 má khô',
                  'Da thừa dầu, bóng nhờn'
                ].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelectedCondition(opt)}
                    className={`w-full min-h-[52px] py-3 px-4 rounded-[20px] border-[1.5px] border-[#105e3f] flex items-center justify-between text-left text-[13px] leading-[18px] font-medium transition-all cursor-pointer ${
                      selectedCondition === opt ? 'bg-emerald-50 text-[#105e3f] shadow-xs' : 'bg-white text-slate-800'
                    }`}
                  >
                    <span className="pr-2">{opt}</span>
                    <div className={`w-5 h-5 rounded-full border-2 border-[#105e3f] flex-shrink-0 flex items-center justify-center ${selectedCondition === opt ? 'bg-[#105e3f]' : ''}`}>
                      {selectedCondition === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <button
                onClick={() => setStep(5)}
                className="w-full h-[54px] rounded-[22px] bg-[#0a6442] hover:bg-[#084e34] text-white font-bold text-[17px] shadow-md cursor-pointer"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 5: SỐ BƯỚC SKINCARE (danhgia_screen_5.png)                */}
        {/* ------------------------------------------------------------- */}
        {step === 5 && (
          <div className="flex-1 flex flex-col justify-between pt-2 pb-4 animate-slide-up">
            <div>
              <h1 className="text-[#105e3f] font-extrabold text-[24px] tracking-tight leading-tight text-center mb-6 mt-2">
                Bạn thường trải qua bao<br />nhiêu bước chăm sóc da?
              </h1>
              <div className="flex flex-col gap-3">
                {['Chỉ rửa mặt', '2-3 bước', '4-5 bước', '6+ bước'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelectedRoutineSteps(opt)}
                    className={`w-full h-[52px] px-5 rounded-[20px] border-[1.5px] border-[#105e3f] flex items-center justify-between text-[14px] font-medium transition-all cursor-pointer ${
                      selectedRoutineSteps === opt ? 'bg-emerald-50 text-[#105e3f] shadow-xs' : 'bg-white text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-5 h-5 rounded-full border-2 border-[#105e3f] flex items-center justify-center ${selectedRoutineSteps === opt ? 'bg-[#105e3f]' : ''}`}>
                      {selectedRoutineSteps === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <button
                onClick={() => setStep(6)}
                className="w-full h-[54px] rounded-[22px] bg-[#0a6442] hover:bg-[#084e34] text-white font-bold text-[17px] shadow-md cursor-pointer"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 6: CÁC VẤN ĐỀ DA GẶP PHẢI (HÌNH 1 MỚI - danhgia_flow_1.png) */}
        {/* Chọn bao nhiêu câu cũng được (Multi-select)                   */}
        {/* ------------------------------------------------------------- */}
        {step === 6 && (
          <div className="flex-1 flex flex-col justify-between pt-2 pb-4 animate-slide-up">
            <div>
              <h1 className="text-[#105e3f] font-extrabold text-[25px] tracking-tight leading-tight text-center mb-6 mt-1">
                Các vấn đề da mà bạn<br />đang gặp phải?
              </h1>

              {/* 8 Pills in 2 columns matching Hình 1 */}
              <div className="grid grid-cols-2 gap-3">
                {allProblems.map(item => {
                  const isSelected = selectedProblems.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleProblem(item)}
                      className={`h-[56px] px-3 rounded-[20px] border-[1.5px] border-[#105e3f] text-center text-[13.5px] font-semibold leading-snug flex items-center justify-center transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#105e3f] text-white shadow-sm' 
                          : 'bg-white text-slate-800 hover:bg-emerald-50/60'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <p className="text-[12px] text-slate-500 text-center mt-4">
                * Bạn có thể chọn nhiều vấn đề da cùng lúc
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setStep(7)}
                className="w-full h-[54px] rounded-[22px] bg-[#0a6442] hover:bg-[#084e34] text-white font-bold text-[17px] shadow-md cursor-pointer"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 7: SẢN PHẨM BẠN ĐANG DÙNG (HÌNH 2 MỚI - danhgia_flow_2.png) */}
        {/* Có thể tự nhập tên sản phẩm + 50 sản phẩm catalog có sẵn      */}
        {/* ------------------------------------------------------------- */}
        {step === 7 && (
          <div className="flex-1 flex flex-col justify-between pt-2 pb-4 animate-slide-up">
            <div className="flex-1 flex flex-col">
              <h1 className="text-[#105e3f] font-extrabold text-[25px] tracking-tight leading-tight text-center mb-3 mt-1">
                Sản phẩm bạn đang dùng
              </h1>

              {/* Search / Custom Product Input bar matching Hình 2 */}
              <form onSubmit={handleAddCustomProduct} className="relative w-full mb-2.5">
                <div className="relative flex items-center">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    value={searchProductText}
                    onChange={(e) => setSearchProductText(e.target.value)}
                    placeholder="Tìm tên sản phẩm (50+ sản phẩm có sẵn)..."
                    className="w-full h-[46px] pl-11 pr-20 rounded-full border-[1.5px] border-[#105e3f] bg-white text-slate-800 placeholder-slate-400 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#105e3f]/30"
                  />

                  {searchProductText && (
                    <button
                      type="button"
                      onClick={() => setSearchProductText('')}
                      className="absolute right-14 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {searchProductText.trim() && (
                    <button
                      type="submit"
                      className="absolute right-2 px-3 py-1 bg-[#105e3f] hover:bg-[#0c4d33] text-white rounded-full text-xs font-bold transition-colors cursor-pointer"
                    >
                      + Thêm
                    </button>
                  )}
                </div>
              </form>

              {/* Category Filter Pills (Horizontal scroll) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-2 -mx-1 px-1">
                {categoriesList.map(cat => {
                  const isSelected = selectedCategory === cat;
                  let countBadge = null;
                  if (cat === 'Đã chọn') {
                    countBadge = selectedProductIds.length;
                  }
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                        isSelected 
                          ? 'bg-[#105e3f] text-white font-bold' 
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat}</span>
                      {countBadge !== null && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? 'bg-white text-[#105e3f]' : 'bg-emerald-100 text-[#105e3f]'
                        }`}>
                          {countBadge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Status & Search Results Info */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1 font-medium">
                <span>
                  {searchProductText.trim() 
                    ? `Kết quả cho "${searchProductText}": ${filteredProducts.length}` 
                    : `Danh mục: ${selectedCategory} (${filteredProducts.length})`}
                </span>
                <span className="text-[#105e3f] font-bold">
                  Đã chọn: {selectedProductIds.length}
                </span>
              </div>

              {/* Product Cards List with Smooth Scroll */}
              <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-2.5 max-h-[380px] pr-0.5">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(prod => {
                    const isChecked = selectedProductIds.includes(prod.id);
                    return (
                      <div
                        key={prod.id}
                        onClick={() => toggleProductSelect(prod.id)}
                        className={`bg-white rounded-[20px] p-3 flex items-center gap-3 border transition-all cursor-pointer ${
                          isChecked 
                            ? 'border-[#105e3f] ring-1.5 ring-[#105e3f]/40 bg-emerald-50/25 shadow-xs' 
                            : 'border-slate-200/80 hover:border-slate-300 opacity-80 hover:opacity-100'
                        }`}
                      >
                        {/* Product Image Thumbnail */}
                        <div className="w-[64px] h-[64px] rounded-xl overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-100 flex items-center justify-center p-1 relative">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-contain"
                            onError={(e) => { 
                              e.currentTarget.src = '/images/prod_torriden.png'; 
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0 pr-1">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[10px] font-bold text-[#105e3f] bg-emerald-100/70 px-2 py-0.2 rounded-full">
                              {prod.category}
                            </span>
                            {prod.brand && (
                              <span className="text-[10px] text-slate-400 font-semibold">
                                • {prod.brand}
                              </span>
                            )}
                          </div>

                          <h3 className="font-extrabold text-[13px] leading-[17px] text-slate-900 line-clamp-2">
                            {prod.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 font-medium">
                            {prod.subtitle}
                          </p>
                        </div>

                        {/* Checkbox Icon */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isChecked ? 'border-[#105e3f] bg-[#105e3f] text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  /* Empty state with quick add option */
                  <div className="bg-white rounded-[22px] p-6 text-center border border-dashed border-slate-300 my-4 space-y-3">
                    <p className="text-[13px] text-slate-600 font-medium">
                      Không tìm thấy sản phẩm trùng khớp với "{searchProductText}".
                    </p>
                    <button
                      type="button"
                      onClick={handleAddCustomProduct}
                      className="px-4 py-2 bg-[#105e3f] text-white rounded-xl text-xs font-bold hover:bg-[#0c4d33] cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm "{searchProductText}" vào danh sách</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex-shrink-0">
              <button
                onClick={() => setStep(8)}
                className="w-full h-[52px] rounded-[22px] bg-[#0a6442] hover:bg-[#084e34] text-white font-bold text-[17px] shadow-md cursor-pointer transition-all active:scale-98"
              >
                Tiếp tục ({selectedProductIds.length} sản phẩm)
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 8: CÙNG TÌM HIỂU LÀN DA - CHỤP ẢNH (danhgia_flow_3.png)  */}
        {/* Kết nối camera chân dung thật + khung hướng dẫn mặt          */}
        {/* ------------------------------------------------------------- */}
        {step === 8 && (
          <div className="flex-1 flex flex-col justify-between items-center text-center animate-slide-up pt-1 pb-4">
            {/* Hidden native inputs for mobile phone camera and gallery */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleFileSelected}
              className="hidden"
            />
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelected}
              className="hidden"
            />

            <div className="w-full flex flex-col items-center">
              
              <h1 className="text-[#105e3f] font-extrabold text-[24px] tracking-tight leading-snug mb-1 mt-1">
                Cùng tìm hiểu làn da của<br />bạn nhé!
              </h1>

              <p className="text-[13px] leading-[18px] text-slate-600 max-w-[320px] mb-3">
                Hãy chụp một bức ảnh chân dung rõ nét để chúng tôi đưa ra lời khuyên chăm sóc da phù hợp dành cho bạn.
              </p>

              {/* Viewfinder with Oval Face Guideline matching Hình 3 */}
              <div className="relative w-full max-w-[320px] h-[320px] rounded-[26px] overflow-hidden bg-slate-900 border-2 border-[#105e3f] shadow-md flex items-center justify-center mb-2.5">
                
                {/* Live Video element if camera is active */}
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className={`w-full h-full object-cover transform scale-x-[-1] ${isCameraActive ? 'block' : 'hidden'}`}
                />

                {/* Loading state indicator */}
                {isCameraLoading && (
                  <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-4 text-center z-10">
                    <RefreshCcw className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
                    <p className="text-white text-xs font-semibold">Đang kết nối camera...</p>
                  </div>
                )}

                {/* Default placeholder portrait if camera is off or denied */}
                {!isCameraActive && !isCameraLoading && (
                  <img
                    src="/images/scanned_face.png"
                    alt="Chân dung mẫu"
                    className="w-full h-full object-cover opacity-85"
                  />
                )}

                {/* Oval Face Overlay Guideline (Hướng dẫn để mặt trong khung) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 z-20">
                  <div className="w-[190px] h-[250px] rounded-[50%] border-2 border-dashed border-white/95 shadow-[0_0_20px_rgba(255,255,255,0.45)] flex flex-col items-center justify-between py-4">
                    <span className="text-[10px] font-bold text-white bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      Khung định vị khuôn mặt
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-200 bg-emerald-950/80 px-2.5 py-0.5 rounded-full">
                      Giữ thẳng mắt
                    </span>
                  </div>
                </div>

                {/* Countdown overlay when shooting */}
                {captureCountdown && (
                  <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center z-30">
                    <span className="text-white font-black text-6xl animate-bounce">
                      {captureCountdown}
                    </span>
                    <span className="text-emerald-300 font-bold text-xs mt-2">
                      Giữ nguyên khuôn mặt...
                    </span>
                  </div>
                )}
              </div>

              {/* Status Indicator */}
              {isCameraActive ? (
                <div className="flex items-center gap-1.5 text-[11.5px] text-emerald-800 font-bold mb-2.5 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>Camera đang hoạt động - Sẵn sàng chụp</span>
                </div>
              ) : cameraError ? (
                <div className="flex items-center gap-1.5 text-[11.5px] text-amber-800 font-medium mb-2.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <span>⚠️ Chưa mở được camera trực tiếp. Dùng nút máy ảnh bên dưới!</span>
                </div>
              ) : null}

              {/* Guidance Box matching Hình 3 */}
              <div className="w-full max-w-[320px] bg-[#e7eee9] rounded-[20px] p-3.5 space-y-2 text-left text-[12px] text-slate-700 font-medium border border-emerald-900/[0.05]">
                <div className="flex items-center gap-2.5">
                  <Sun className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  <span>Chọn nơi có ánh sáng tự nhiên, dịu nhẹ</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Smile className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  <span>Nhìn thẳng vào camera, giữ biểu cảm khuôn mặt tự nhiên</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Maximize className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  <span>Giữ khuôn mặt nằm trong khung hướng dẫn</span>
                </div>
              </div>
            </div>

            {/* Action Buttons for Mobile & Desktop */}
            <div className="w-full pt-3 max-w-[320px] space-y-2">
              {/* Primary Action Button: Bắt đầu chụp / Chụp ngay */}
              <button
                type="button"
                disabled={isCapturing}
                onClick={handleTriggerCapture}
                className="w-full h-[52px] rounded-[20px] bg-[#ff8342] hover:bg-[#f27430] active:scale-98 text-white font-bold text-[17px] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                <span>
                  {isCapturing ? 'Đang chụp...' : isCameraActive ? 'Chụp ngay' : 'Bắt đầu chụp'}
                </span>
              </button>

              {/* Secondary Options: Mở máy ảnh điện thoại & Chọn ảnh */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 h-[42px] rounded-[16px] bg-white border border-[#105e3f] text-[#105e3f] hover:bg-emerald-50 active:scale-98 font-bold text-[12px] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Camera className="w-4 h-4" />
                  <span>Mở máy ảnh điện thoại</span>
                </button>

                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="flex-1 h-[42px] rounded-[16px] bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-98 font-semibold text-[12px] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Tải ảnh từ máy</span>
                </button>
              </div>

              {/* Retry camera button if error */}
              {cameraError && (
                <button
                  type="button"
                  onClick={startCameraStream}
                  className="w-full py-1 text-center text-xs font-semibold text-[#105e3f] hover:underline cursor-pointer flex items-center justify-center gap-1"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  <span>Thử kết nối lại camera trực tiếp</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STEP 9: KẾT QUẢ ĐÁNH GIÁ (HÌNH 4 VÀ HÌNH 5 TRONG CÙNG 1 PAGE)  */}
        {/* ------------------------------------------------------------- */}
        {step === 9 && (
          <div className="flex-1 flex flex-col space-y-4 pt-1 pb-6 animate-fade-in -mx-1">
            
            {/* Top Scanned Face Portrait matching Hình 4 */}
            <div className="relative w-full h-[290px] rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-emerald-900/[0.06]">
              <img
                src={capturedPhotoUrl || '/images/scanned_face.png'}
                alt="Kết quả quét da"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>AI Skin Scan 2026</span>
              </div>

              {/* Retake photo button */}
              <button
                type="button"
                onClick={() => {
                  setCapturedPhotoUrl(null);
                  setStep(8);
                }}
                className="absolute bottom-2.5 right-2.5 bg-black/60 hover:bg-black/80 active:scale-95 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Chụp lại ảnh</span>
              </button>
            </div>

            {/* Green Summary Bar matching Hình 4 */}
            <div className="bg-[#cfe5d8] rounded-2xl p-4 flex items-center justify-between border border-emerald-900/[0.08] shadow-xs">
              <div>
                <span className="text-[12.5px] font-medium text-slate-700 block">
                  Điểm trung bình
                </span>
                <span className="text-[34px] font-black text-[#105e3f] leading-none mt-1 inline-block">
                  6.0
                </span>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-1">
                  <span className="text-[13px] font-bold text-slate-800">Vấn đề da</span>
                  <span className="text-[11px] font-semibold text-rose-600">Lưu ý *</span>
                </div>
                <div className="text-[12px] font-bold text-[#105e3f] space-y-0.5">
                  <div>• Sắc tố da</div>
                  <div>• Lỗ chân lông</div>
                </div>
              </div>
            </div>

            {/* 6 Score Cards matching Hình 4 (Clickable for detail diagnosis) */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { key: 'Mụn viêm', score: '6/10' },
                { key: 'Mụn không viêm', score: '6/10' },
                { key: 'Sợi bã nhờn', score: '7/10' },
                { key: 'Sẹo', score: '7/10' },
                { key: 'Sắc tố da', score: '5/10' },
                { key: 'Lỗ chân lông', score: '5/10' }
              ].map(card => (
                <button
                  key={card.key}
                  onClick={() => setSelectedScoreCard(card.key)}
                  className="bg-white rounded-[18px] p-3 text-left border border-emerald-900/[0.06] shadow-xs hover:border-[#105e3f] active:scale-98 transition-all cursor-pointer flex flex-col justify-between h-[84px]"
                  title="Nhấn xem chi tiết nhận xét"
                >
                  <span className="text-[11.5px] font-medium text-slate-700 leading-tight">
                    {card.key}
                  </span>
                  <div className="flex items-baseline gap-0.5 mt-1">
                    <span className="text-[22px] font-black text-slate-900 leading-none">
                      {card.score.split('/')[0]}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      /10
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Satisfaction thumbs bar matching Hình 4 */}
            <div className="bg-white rounded-2xl px-4 py-2.5 flex items-center justify-between border border-emerald-900/[0.06] shadow-xs">
              <span className="text-[12.5px] font-medium text-slate-700">
                Bạn có hài lòng với kết quả phân tích da không?
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFeedbackVote('up')}
                  className={`p-1 rounded-full cursor-pointer transition-colors ${feedbackVote === 'up' ? 'text-[#105e3f] scale-110' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setFeedbackVote('down')}
                  className={`p-1 rounded-full cursor-pointer transition-colors ${feedbackVote === 'down' ? 'text-rose-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Ý kiến từ chuyên gia matching Hình 4 */}
            <div className="bg-white rounded-[22px] p-4 border border-emerald-900/[0.08] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-md bg-[#105e3f] flex items-center justify-center text-white font-black text-xs">
                  +
                </div>
                <h3 className="font-extrabold text-[15px] text-[#105e3f]">
                  Ý kiến từ chuyên gia
                </h3>
              </div>

              <p className="text-[12.5px] text-slate-700 leading-relaxed mb-3.5 font-medium">
                Chuyên gia Hasaki đánh giá tình trạng da của bạn rất nghiêm trọng
              </p>

              {/* Button: Hỏi đáp chuyên gia -> Leads directly to appointment booking */}
              <button
                type="button"
                onClick={() => {
                  if (onNavigateBooking) {
                    onNavigateBooking();
                  } else {
                    setShowBookingModal(true);
                  }
                }}
                className="w-full h-[46px] rounded-[16px] bg-[#0a6442] hover:bg-[#084e34] text-white font-bold text-[14.5px] shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                Hỏi đáp chuyên gia
              </button>
            </div>

            {/* ========================================================= */}
            {/* HÌNH 5 BẮT ĐẦU NGAY DƯỚI ĐÂY (TRONG CÙNG 1 PAGE)          */}
            {/* ========================================================= */}

            {/* Card: Mỹ phẩm chưa phù hợp matching Hình 5 */}
            <div 
              onClick={() => setShowIncompatibleDetail(true)}
              className="bg-white rounded-2xl overflow-hidden border border-emerald-900/[0.06] shadow-xs cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div className="bg-[#f8faf9] px-4 py-2 border-b border-slate-100">
                <span className="text-[13px] font-bold text-[#105e3f]">
                  Mỹ phẩm chưa phù hợp
                </span>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-[13px] font-medium text-slate-700">
                  Xem chi tiết
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Card: Chu trình cơ bản matching Hình 5 - Nhấn để mở ScreenChuTrinhChamDa */}
            <div 
              onClick={() => {
                if (onNavigateRoutine) {
                  onNavigateRoutine();
                } else {
                  setShowRoutineDetail('morning');
                }
              }}
              className="bg-white rounded-2xl p-4 border border-emerald-900/[0.06] shadow-xs space-y-3 cursor-pointer hover:border-[#105e3f]/40 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-[14px] text-[#105e3f] group-hover:underline flex items-center gap-1.5">
                    <span>Chu trình cơ bản - Chăm sóc da cơ bản</span>
                    <ChevronRight className="w-4 h-4 text-[#105e3f]" />
                  </h3>
                  <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                    Chu trình chăm sóc da nền tảng giúp làm sạch sâu, cân bằng độ ẩm và bảo vệ da hàng ngày.
                  </p>
                </div>
              </div>

              {/* Sáng row (yellow/cream bg) */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onNavigateRoutine) {
                    onNavigateRoutine();
                  } else {
                    setShowRoutineDetail('morning');
                  }
                }}
                className="bg-[#f8eec4] rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-[#f5e7b3] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sun className="w-7 h-7 text-amber-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-[13px] text-slate-900 leading-tight">
                      Chu trình chăm sóc da sáng
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      7:00, Mỗi ngày
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-700 font-semibold text-xs">
                  <span>5 Bước</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Tối row (mint/green bg) */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onNavigateRoutine) {
                    onNavigateRoutine();
                  } else {
                    setShowRoutineDetail('night');
                  }
                }}
                className="bg-[#cbe3d3] rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-[#bfdc8] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌙</span>
                  <div>
                    <h4 className="font-bold text-[13px] text-slate-900 leading-tight">
                      Chu trình chăm sóc da tối
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      21:00, Mỗi ngày
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-700 font-semibold text-xs">
                  <span>7 Bước</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card: Loại da matching Hình 5 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-emerald-900/[0.06] shadow-xs">
              <div className="bg-[#f8faf9] px-4 py-2 border-b border-slate-100">
                <span className="text-[13px] font-bold text-[#105e3f]">
                  Loại da
                </span>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-800">
                  Da hỗn hợp thiên dầu
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Action buttons at bottom */}
            <div className="flex gap-2.5 pt-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 h-11 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Đánh giá lại</span>
              </button>
              <button
                type="button"
                onClick={onBackToHome}
                className="flex-1 h-11 rounded-xl bg-[#0a6442] hover:bg-[#084e34] text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center"
              >
                Về Trang chủ
              </button>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* MODAL 1: CHI TIẾT ĐIỂM SỐ KHI NHẤN VÀO Ô CHẤM ĐIỂM       */}
      {/* ========================================================= */}
      {selectedScoreCard && scoreDetailsData[selectedScoreCard] && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full max-w-[430px] bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-[#105e3f]">
                  {selectedScoreCard}
                </span>
                <span className="bg-emerald-100 text-[#105e3f] font-bold text-xs px-2 py-0.5 rounded-full">
                  {scoreDetailsData[selectedScoreCard].score}
                </span>
              </div>
              <button
                onClick={() => setSelectedScoreCard(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-amber-900 font-semibold">
                ⚠️ {scoreDetailsData[selectedScoreCard].status}
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Nhận xét chi tiết từ AI Hasaki:</h4>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {scoreDetailsData[selectedScoreCard].analysis}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Khuyến nghị chuyên môn:</h4>
                <p className="text-[#105e3f] bg-emerald-50 p-3 rounded-xl border border-emerald-100 font-medium">
                  {scoreDetailsData[selectedScoreCard].advice}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedScoreCard(null)}
              className="w-full h-11 mt-4 rounded-xl bg-[#0a6442] text-white font-bold text-xs cursor-pointer"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: CHI TIẾT MỸ PHẨM CHƯA PHÙ HỢP KHI BẤM MŨI TÊN   */}
      {/* ========================================================= */}
      {showIncompatibleDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full max-w-[430px] bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-[16px] text-slate-900">
                  Phân tích mỹ phẩm chưa phù hợp
                </h3>
              </div>
              <button
                onClick={() => setShowIncompatibleDetail(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                <h4 className="font-bold text-rose-900 mb-1">
                  1. Kem Dưỡng Midnight Blue Calming Cream
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Lý do chưa tối ưu:</strong> Sản phẩm chứa dầu khoáng và thành phần dưỡng ẩm đậm đặc dạng cream. Trên nền da hỗn hợp thiên dầu đang có <strong>mụn viêm (6/10)</strong> và <strong>lỗ chân lông to (5/10)</strong>, kết cấu này dễ gây bí da và tăng nguy cơ mụn ẩn bùng phát.
                </p>
                <p className="text-[#105e3f] font-semibold mt-1.5">
                  ✓ Gợi ý thay thế: Đổi sang dạng Gel dưỡng ẩm mỏng nhẹ, không dầu như <em>La Roche-Posay Effaclar Duo+ M</em> hoặc <em>SVR Sebiaclear Active Gel</em>.
                </p>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <h4 className="font-bold text-amber-900 mb-1">
                  2. Toner Torriden DIVE-IN Low Molecular
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Lưu ý sử dụng:</strong> Chứa Hyaluronic Acid đa phân tử cấp nước tốt nhưng thiếu các hoạt chất kiềm dầu (BHA/Niacinamide). Nếu môi trường khô hanh có thể hút ẩm ngược gây đổ dầu nhiều hơn ở vùng chữ T.
                </p>
                <p className="text-[#105e3f] font-semibold mt-1.5">
                  ✓ Cách khắc phục: Vỗ toner khi da còn ẩm và kết hợp Serum Niacinamide 10% để kiểm soát tuyến bã nhờn.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIncompatibleDetail(false)}
              className="w-full h-11 mt-4 rounded-xl bg-[#0a6442] text-white font-bold text-xs cursor-pointer"
            >
              Đóng phân tích
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: ĐẶT LỊCH TƯ VẤN VỚI CHUYÊN VIÊN HASAKI CLINIC     */}
      {/* ========================================================= */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full max-w-[430px] bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#105e3f]" />
                <h3 className="font-extrabold text-[16px] text-slate-900">
                  Đặt lịch tư vấn chuyên gia
                </h3>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                Hồ sơ da vừa quét của bạn đã được lưu tự động. Chuyên gia Bác sĩ Da liễu Hasaki Clinic & Spa sẽ thăm khám trực tiếp 1:1 miễn phí cho bạn.
              </p>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-[#105e3f] font-semibold">
                ✓ Dịch vụ: Soi da 3D chuyên sâu & Phác đồ trị mụn chuẩn y khoa
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Chọn ngày hẹn:</label>
                <input type="date" defaultValue="2026-11-02" className="w-full h-10 px-3 rounded-xl border border-slate-200" />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Chọn chi nhánh Hasaki gần nhất:</label>
                <select className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white">
                  <option>Hasaki Clinic & Spa - 71 Hoàng Hoa Thám, Tân Bình</option>
                  <option>Hasaki Clinic & Spa - 555 Ba Tháng Hai, Quận 10</option>
                  <option>Hasaki Clinic & Spa - 94 Lê Văn Việt, TP. Thủ Đức</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Đặt lịch tư vấn với Chuyên gia Hasaki thành công! Nhân viên sẽ liên hệ xác nhận trong 15 phút.');
                setShowBookingModal(false);
              }}
              className="w-full h-11 mt-4 rounded-xl bg-[#0a6442] text-white font-bold text-xs shadow-md cursor-pointer"
            >
              Xác nhận đặt hẹn khám da
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: CHI TIẾT ROUTINE SÁNG / TỐI                       */}
      {/* ========================================================= */}
      {showRoutineDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full max-w-[430px] bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-extrabold text-[16px] text-slate-900">
                {showRoutineDetail === 'morning' ? '☀️ Chu trình chăm sóc da sáng (5 Bước)' : '🌙 Chu trình chăm sóc da tối (7 Bước)'}
              </h3>
              <button
                onClick={() => setShowRoutineDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {showRoutineDetail === 'morning' ? (
                <>
                  <div className="p-2 bg-slate-50 rounded-lg"><strong>Bước 1:</strong> Sữa rửa mặt dịu nhẹ pH 5.5</div>
                  <div className="p-2 bg-slate-50 rounded-lg"><strong>Bước 2:</strong> Toner cấp ẩm cân bằng màng lipid</div>
                  <div className="p-2 bg-slate-50 rounded-lg"><strong>Bước 3:</strong> Serum Niacinamide 10% kiềm dầu chữ T</div>
                  <div className="p-2 bg-slate-50 rounded-lg"><strong>Bước 4:</strong> Gel dưỡng ẩm mỏng nhẹ</div>
                  <div className="p-2 bg-emerald-50 rounded-lg text-[#105e3f] font-bold"><strong>Bước 5:</strong> Kem chống nắng phổ rộng SPF 50+ Oil-Control</div>
                </>
              ) : (
                <>
                  <div className="p-2 bg-slate-50 rounded-lg"><strong>Bước 1:</strong> Nước tẩy trang làm sạch sâu bụi mịn</div>
                  <div className="p-2 bg-slate-50 rounded-lg"><strong>Bước 2:</strong> Sữa rửa mặt tạo bọt làm sạch lỗ chân lông</div>
                  <div className="p-2 bg-slate-50 rounded-lg"><strong>Bước 3:</strong> Tẩy tế bào chết BHA 2% (2 lần/tuần)</div>
                  <div className="p-2 bg-slate-50 rounded-lg"><strong>Bước 4:</strong> Toner làm dịu phục hồi da</div>
                  <div className="p-2 bg-slate-50 rounded-lg"><strong>Bước 5:</strong> Serum chấm mụn gom cồi</div>
                  <div className="p-2 bg-slate-50 rounded-lg"><strong>Bước 6:</strong> Serum cấp nước phục hồi B5</div>
                  <div className="p-2 bg-emerald-50 rounded-lg text-[#105e3f] font-bold"><strong>Bước 7:</strong> Khóa ẩm bằng kem phục hồi mỏng nhẹ</div>
                </>
              )}
            </div>

            <button
              onClick={() => setShowRoutineDetail(null)}
              className="w-full h-11 mt-4 rounded-xl bg-[#0a6442] text-white font-bold text-xs cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
