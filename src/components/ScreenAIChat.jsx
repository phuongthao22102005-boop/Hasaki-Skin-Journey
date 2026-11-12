import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Home, Send, RotateCcw, Sparkles, HelpCircle, X, ChevronRight } from 'lucide-react';
import { getInitialProactiveGreeting, generateMaiHaReply } from '../utils/maiHaChatEngine';

// Lightweight inline markdown formatter for **bold** and *italic*
function renderFormattedText(text) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const tokens = [];
    let remaining = line;
    let keyIdx = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);

      let nextMatch = null;
      let matchType = null;

      if (boldMatch && italicMatch) {
        if (boldMatch.index <= italicMatch.index) {
          nextMatch = boldMatch;
          matchType = 'bold';
        } else {
          nextMatch = italicMatch;
          matchType = 'italic';
        }
      } else if (boldMatch) {
        nextMatch = boldMatch;
        matchType = 'bold';
      } else if (italicMatch) {
        nextMatch = italicMatch;
        matchType = 'italic';
      }

      if (!nextMatch) {
        tokens.push(<React.Fragment key={keyIdx++}>{remaining}</React.Fragment>);
        break;
      }

      if (nextMatch.index > 0) {
        tokens.push(
          <React.Fragment key={keyIdx++}>
            {remaining.slice(0, nextMatch.index)}
          </React.Fragment>
        );
      }

      if (matchType === 'bold') {
        tokens.push(
          <strong key={keyIdx++} className="font-bold text-[#0f4730]">
            {nextMatch[1]}
          </strong>
        );
      } else {
        tokens.push(
          <em key={keyIdx++} className="italic text-slate-700">
            {nextMatch[1]}
          </em>
        );
      }

      remaining = remaining.slice(nextMatch.index + nextMatch[0].length);
    }

    return (
      <React.Fragment key={lineIdx}>
        {tokens}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function ScreenAIChat({
  user = { name: 'Nguyễn Văn A', gender: 'Nam' },
  onBackToHome,
  onNavigateBooking,
  onNavigateProducts,
  onNavigateHoSoDa,
  onNavigateBangGia
}) {
  // 4 Preset detailed FAQ questions (accessible via FAQ modal)
  const presetQuestions = [
    {
      id: 1,
      question: 'Dựa trên tình trạng da hiện tại, tôi nên ưu tiên cải thiện vấn đề nào trước và xây dựng routine chăm sóc da như thế nào?',
      answer: `Chào bạn! 🌿 Để xây dựng routine phù hợp, Mai Hà khuyên chúng ta nên ưu tiên củng cố hàng rào bảo vệ da và giải quyết những vấn đề đang ảnh hưởng nhiều nhất đến làn da của bạn.\n\n**3 bước nền tảng để bắt đầu:**\n1. **Làm sạch:** Sử dụng sản phẩm làm sạch dịu nhẹ phù hợp với loại da, tránh khiến da bị khô căng.\n2. **Dưỡng ẩm:** Duy trì độ ẩm và hỗ trợ hàng rào bảo vệ da.\n3. **Chống nắng:** Sử dụng kem chống nắng phổ rộng SPF 30 trở lên vào ban ngày.\n\nSau đó bạn mới bổ sung sản phẩm đặc trị cho mụn, thâm hay khô da nhé. Hiện tại loại da của bạn là da dầu, da khô, hỗn hợp hay nhạy cảm vậy ạ? Kể Mai Hà nghe để mình lên routine cụ thể cho bạn nha!`
    },
    {
      id: 2,
      question: 'Tôi đang sử dụng nhiều sản phẩm chăm sóc da khác nhau. Làm thế nào để biết các thành phần có phù hợp với nhau và tránh gây kích ứng?',
      answer: `Mai Hà rất sẵn lòng kiểm tra bảng thành phần giúp bạn nhé! 🧴\n\nMột số cặp hoạt chất cần cẩn trọng khi dùng chung, đặc biệt với da nhạy cảm:\n• **Retinol & AHA/BHA:** Dùng chung cùng một buổi dễ gây khô rát, bong tróc. Nên tách ra dùng cách ngày.\n• **Benzoyl Peroxide & Retinoid:** Có thể làm giảm hiệu quả hoặc gây kích ứng nếu bôi chồng lên nhau.\n• **Quá nhiều bước tẩy tế bào chết:** Dễ làm mỏng yếu hàng rào bảo vệ da.\n\nBạn cứ nhắn cho Mai Hà **tên các sản phẩm bạn đang dùng** cùng **thứ tự sáng/tối**, mình rà soát chi tiết giúp bạn ngay ạ!`
    },
    {
      id: 3,
      question: 'Dựa trên hồ sơ da và mục tiêu chăm sóc của tôi, những dịch vụ nào tại Hasaki Clinic phù hợp để cân nhắc, và tôi cần lưu ý gì trước khi đặt lịch?',
      answer: `Dạ về dịch vụ tại Hasaki Clinic, việc chọn liệu trình sẽ dựa trên tình trạng da thực tế của bạn nhé! 💚\n\n• **Da dầu, mụn ẩn/mụn viêm:** Cân nhắc Combo Lấy nhân mụn + mặt nạ + chiếu đèn (249.000₫) hoặc Peel BHA 20% (350.000₫).\n• **Da khô, thiếu ẩm / mới treatment:** Điện di lạnh phục hồi (500.000₫) rất êm và cấp ẩm sâu.\n• **Da thâm nám, không đều màu:** Thăm khám cùng Bác sĩ Da liễu để được chỉ định Laser Revlite phù hợp.\n\nTrước khi qua Clinic, bạn nhớ ngưng các sản phẩm tẩy da chết mạnh/Retinol trước 3–5 ngày và mang theo danh sách sản phẩm đang dùng để chuyên viên tư vấn chuẩn nhất nha!`
    },
    {
      id: 4,
      question: 'Tôi đã thực hiện chăm sóc da một thời gian nhưng chưa thấy cải thiện rõ rệt. Làm thế nào để đánh giá hiệu quả routine hiện tại và điều chỉnh lộ trình phù hợp hơn?',
      answer: `Mai Hà hiểu cảm giác chăm chỉ dưỡng da mãi mà chưa thấy kết quả rõ rệt là sốt ruột lắm đúng không ạ! 🌱 Tuy nhiên điều này không hẳn là sản phẩm bị "vô tác dụng" đâu nha.\n\nBạn thử kiểm tra 4 yếu tố sau cùng mình nhé:\n1. **Thời gian sử dụng:** Chu kỳ tái tạo da thường mất 4–8 tuần mới thấy rõ thay đổi.\n2. **Độ hợp với loại da:** Sản phẩm dưỡng quá dày với da dầu hoặc thiếu ẩm với da khô đều làm giảm hiệu quả.\n3. **Tần suất & Liều lượng:** Quá ít (nhất là kem chống nắng) hoặc quá dày đặc đều ảnh hưởng.\n4. **Lối sống:** Thức khuya, stress hoặc chưa tẩy trang kỹ vào cuối ngày.\n\nBạn đang dùng routine hiện tại được bao lâu rồi? Nhắn Mai Hà xem thử để mình điều chỉnh nhẹ lại giúp bạn nha!`
    }
  ];

  const [messages, setMessages] = useState([]);
  const [quickReplies, setQuickReplies] = useState([]);
  const [chatContext, setChatContext] = useState({
    skinType: null,
    concerns: [],
    mentionedProducts: [],
    turnCount: 0
  });
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(true);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Trigger Mai Hà's proactive skin-condition greeting as soon as user enters the chatbot
  const startProactiveConversation = () => {
    setMessages([]);
    setQuickReplies([]);
    setChatContext({
      skinType: null,
      concerns: [],
      mentionedProducts: [],
      turnCount: 0
    });
    setIsBotTyping(true);

    const timer = setTimeout(() => {
      const { message, quickReplies: initialChips } = getInitialProactiveGreeting(user);
      setIsBotTyping(false);
      setMessages([
        {
          id: Date.now(),
          sender: 'bot',
          text: message,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setQuickReplies(initialChips);
    }, 450);

    return timer;
  };

  useEffect(() => {
    const timer = startProactiveConversation();
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping, quickReplies]);

  const handleActionClick = (target) => {
    if (target === 'booking' && onNavigateBooking) onNavigateBooking();
    else if (target === 'products' && onNavigateProducts) onNavigateProducts();
    else if (target === 'hosoda' && onNavigateHoSoDa) onNavigateHoSoDa();
    else if (target === 'banggia' && onNavigateBangGia) onNavigateBangGia();
  };

  const processUserMessage = (textToSend) => {
    const query = textToSend.trim();
    if (!query || isBotTyping) return;

    const nowTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: nowTime
    };

    setMessages(prev => [...prev, userMsg]);
    setQuickReplies([]);
    setInputText('');
    setIsBotTyping(true);

    const delay = 450 + Math.min(query.length * 4, 300);
    setTimeout(() => {
      const result = generateMaiHaReply(query, chatContext, user, presetQuestions);
      setChatContext(result.updatedContext);
      setIsBotTyping(false);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: result.reply,
        actionLink: result.actionLink || null,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setQuickReplies(result.quickReplies || []);
    }, delay);
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    processUserMessage(inputText);
  };

  const handleSelectPreset = (preset) => {
    setShowFaqModal(false);
    processUserMessage(preset.question);
  };

  const handleResetChat = () => {
    startProactiveConversation();
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between bg-[#f2f6f3] select-none text-slate-800">
      
      {/* Top Header */}
      <div className="px-4 pt-3 pb-2.5 flex-shrink-0 bg-white/95 backdrop-blur-xs border-b border-emerald-900/[0.08] shadow-xs z-10">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-[#124c34] font-bold text-[16px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.6]" />
            <span>Trợ lý AI Mai Hà</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowFaqModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#124c34] text-[11.5px] font-bold border border-emerald-700/15 transition-colors cursor-pointer"
              title="Câu hỏi gợi ý"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Gợi ý</span>
            </button>
            <button
              onClick={handleResetChat}
              className="p-1.5 rounded-full text-[#124c34] hover:bg-emerald-50 transition-colors cursor-pointer"
              title="Cuộc trò chuyện mới"
              aria-label="Cuộc trò chuyện mới"
            >
              <RotateCcw className="w-4.5 h-4.5 stroke-[2.3]" />
            </button>
            <button
              onClick={onBackToHome}
              className="text-[#124c34] hover:opacity-80 transition-opacity p-1 cursor-pointer"
              aria-label="Trang chủ"
            >
              <Home className="w-5.5 h-5.5 stroke-[2.4]" />
            </button>
          </div>
        </div>

        {/* Subheader: Mai Hà Profile Card */}
        <div className="flex items-center gap-3 px-2.5 py-1.5 bg-[#f4f8f5] rounded-2xl border border-emerald-900/[0.06]">
          <div className="relative flex-shrink-0">
            <img
              src="/images/mai_ha_avatar.jpg"
              alt="Chuyên viên AI Mai Hà"
              className="w-11 h-11 rounded-full object-cover border-2 border-[#105e3f] shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-[#124c34] font-extrabold text-[15px] leading-tight truncate">
                Mai Hà
              </h2>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#105e3f] bg-emerald-100 px-1.5 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5" />
                AI Tư vấn
              </span>
            </div>
            <p className="text-[#e57849] font-medium text-[11.5px] mt-0.5 truncate">
              Đang trực tuyến • Chuyên viên chăm sóc da Hasaki
            </p>
          </div>
        </div>
      </div>

      {/* Main Scrollable Chat Stream */}
      <div className="w-full flex-1 overflow-y-auto no-scrollbar px-4 py-3 flex flex-col">
        <div className="space-y-3.5 pb-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}
            >
              {msg.sender === 'user' ? (
                /* User Message Bubble */
                <div className="max-w-[85%] bg-[#cbe3d4] text-slate-900 px-4 py-2.5 rounded-[20px] rounded-br-[6px] text-[13.5px] leading-relaxed shadow-xs border border-emerald-900/[0.06]">
                  <p className="select-text">{msg.text}</p>
                  {msg.timestamp && (
                    <div className="text-[10px] text-emerald-900/60 text-right mt-1 font-medium">
                      {msg.timestamp}
                    </div>
                  )}
                </div>
              ) : (
                /* Mai Hà Reply Bubble with Mini Avatar */
                <div className="flex items-end gap-2 max-w-[94%]">
                  <img
                    src="/images/mai_ha_avatar.jpg"
                    alt="Mai Hà"
                    className="w-7 h-7 rounded-full object-cover border border-[#105e3f]/30 flex-shrink-0 mb-1 shadow-xs"
                  />
                  <div className="flex-1 bg-white text-slate-800 px-4 py-3 rounded-[20px] rounded-bl-[6px] text-[13.5px] leading-[20px] shadow-xs border border-emerald-900/[0.06]">
                    <div className="text-[11px] font-bold text-[#105e3f] mb-1">
                      Mai Hà
                    </div>
                    <div className="select-text">
                      {renderFormattedText(msg.text)}
                    </div>

                    {msg.actionLink && (
                      <button
                        type="button"
                        onClick={() => handleActionClick(msg.actionLink.target)}
                        className="mt-2.5 w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#105e3f] border border-emerald-700/20 font-bold text-[12.5px] flex items-center justify-between transition-all cursor-pointer active:scale-[0.98]"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}

                    {msg.timestamp && (
                      <div className="text-[10px] text-slate-400 text-right mt-1.5 font-medium">
                        {msg.timestamp}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isBotTyping && (
            <div className="flex items-end gap-2 animate-fade-in">
              <img
                src="/images/mai_ha_avatar.jpg"
                alt="Mai Hà"
                className="w-7 h-7 rounded-full object-cover border border-[#105e3f]/30 flex-shrink-0 mb-1 shadow-xs"
              />
              <div className="bg-white px-4 py-3 rounded-[20px] rounded-bl-[6px] shadow-xs border border-slate-100 flex items-center gap-2">
                <span className="text-[11.5px] font-semibold text-slate-500">Mai Hà đang nhập</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Contextual Quick Reply Chips */}
          {!isBotTyping && quickReplies.length > 0 && (
            <div className="pt-1 pl-9 flex flex-wrap gap-2 animate-fade-in">
              {quickReplies.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => processUserMessage(chip)}
                  className="bg-white hover:bg-emerald-50 active:scale-[0.97] text-[#105e3f] border border-[#105e3f]/25 rounded-full px-3.5 py-1.5 text-[12px] font-semibold shadow-xs transition-all cursor-pointer text-left"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom Input Bar */}
      <div className="px-4 py-3 bg-[#f2f6f3] border-t border-emerald-900/[0.06] flex-shrink-0">
        <form 
          onSubmit={handleSendMessage}
          className="relative w-full flex items-center bg-white rounded-full border border-emerald-900/15 shadow-xs px-4 h-[50px] focus-within:border-[#105e3f] focus-within:ring-2 focus-within:ring-[#105e3f]/15 transition-all"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nhắn cho Mai Hà về làn da của bạn..."
            className="flex-1 bg-transparent text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none pr-9"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isBotTyping}
            className="absolute right-3.5 text-[#e57849] hover:text-[#d16132] p-1.5 transition-colors cursor-pointer disabled:opacity-40"
            aria-label="Gửi tin nhắn"
          >
            <Send className="w-5 h-5 stroke-[2.2]" />
          </button>
        </form>
      </div>

      {/* FAQ Preset Questions Bottom Sheet Modal */}
      {showFaqModal && (
        <div className="absolute inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full max-h-[82%] bg-white rounded-t-[26px] p-5 shadow-2xl animate-slide-up flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-[16px] text-[#124c34]">
                  Câu hỏi gợi ý cho Mai Hà
                </h3>
                <p className="text-[11.5px] text-slate-500">
                  Chọn nhanh một chủ đề để Mai Hà tư vấn chi tiết
                </p>
              </div>
              <button
                onClick={() => setShowFaqModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="overflow-y-auto no-scrollbar space-y-2.5 pt-3 pb-2">
              {presetQuestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectPreset(item)}
                  className="w-full bg-[#f4f8f5] hover:bg-emerald-50 active:scale-[0.99] text-left p-3.5 rounded-2xl border border-emerald-900/[0.08] transition-all cursor-pointer group"
                >
                  <p className="text-[13px] leading-[18.5px] font-medium text-slate-800 group-hover:text-[#124c34]">
                    {item.question}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
