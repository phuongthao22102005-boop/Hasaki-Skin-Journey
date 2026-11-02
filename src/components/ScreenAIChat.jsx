import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Home, Send, RotateCcw } from 'lucide-react';
import HasakiLogo from './HasakiLogo';

export default function ScreenAIChat({ onBackToHome }) {
  // 4 Preset questions and exact answers from reference images
  const presetQuestions = [
    {
      id: 1,
      question: 'Dựa trên tình trạng da hiện tại, tôi nên ưu tiên cải thiện vấn đề nào trước và xây dựng routine chăm sóc da như thế nào?',
      answer: `Chào bạn! 🌿 Để xây dựng routine phù hợp, chúng ta nên ưu tiên củng cố hàng rào bảo vệ da và giải quyết những vấn đề đang ảnh hưởng nhiều nhất đến làn da của bạn.
HASAKI gợi ý 3 bước bắt đầu:
1. Làm sạch: Sử dụng sản phẩm làm sạch phù hợp với loại da, tránh khiến da bị khô căng.
2. Dưỡng ẩm: Duy trì độ ẩm và hỗ trợ hàng rào bảo vệ da.
3. Chống nắng: Sử dụng kem chống nắng phổ rộng SPF 30 trở lên vào ban ngày.
Sau khi xác định được vấn đề ưu tiên như mụn, thâm, da khô hoặc không đều màu, bạn có thể bổ sung sản phẩm đặc trị phù hợp. Hãy bắt đầu từ từ để theo dõi phản ứng của da nhé!
Để HASAKI tư vấn sát hơn, bạn cho mình biết:
• Loại da của bạn là da dầu, da khô, da hỗn hợp hay chưa xác định?
• Bạn muốn cải thiện vấn đề nào nhất hiện nay?
💚 Bạn cũng có thể xem lại kết quả trong mục Hồ sơ da của tôi để nhận gợi ý phù hợp hơn.`
    },
    {
      id: 2,
      question: 'Tôi đang sử dụng nhiều sản phẩm chăm sóc da khác nhau. Làm thế nào để biết các thành phần có phù hợp với nhau và tránh gây kích ứng?',
      answer: `Mình có thể giúp bạn kiểm tra các thành phần trong routine hiện tại! 🧴
Một số thành phần cần được cân nhắc khi sử dụng chung, đặc biệt nếu bạn có làn da nhạy cảm:
• Retinol và AHA/BHA: Kết hợp không phù hợp hoặc dùng với tần suất quá cao có thể làm tăng nguy cơ khô, đỏ và kích ứng.
• Benzoyl peroxide và retinoid: Khả năng tương thích phụ thuộc vào từng hoạt chất và công thức sản phẩm. Một số dạng retinoid có thể bị ảnh hưởng khi dùng đồng thời.
• Nhiều sản phẩm tẩy tế bào chết: Có thể khiến hàng rào bảo vệ da bị tổn thương nếu sử dụng quá mức.
Không phải mọi cặp thành phần trên đều bị cấm kết hợp. Điều quan trọng là nồng độ, công thức, cách sử dụng và khả năng dung nạp của da.
Để kiểm tra chính xác hơn, bạn hãy gửi cho mình:
1. Tên các sản phẩm đang sử dụng.
2. Thứ tự và tần suất sử dụng.
3. Tình trạng da hiện tại, chẳng hạn như khô, đỏ, châm chích hoặc nổi mụn.
HASAKI sẽ giúp bạn rà soát các thành phần đáng lưu ý và gợi ý cách sắp xếp routine an toàn hơn.
Lưu ý: Nếu da đang kích ứng rõ rệt, bạn nên ngừng các sản phẩm nghi ngờ gây kích ứng và tham khảo bác sĩ da liễu khi cần.`
    },
    {
      id: 3,
      question: 'Dựa trên hồ sơ da và mục tiêu chăm sóc của tôi, những dịch vụ nào tại Hasaki Clinic phù hợp để cân nhắc, và tôi cần lưu ý gì trước khi đặt lịch?',
      answer: `Chào bạn! 💚 Việc lựa chọn dịch vụ phù hợp nên dựa trên tình trạng da thực tế, mục tiêu chăm sóc và mức độ nhạy cảm của làn da.
Bạn có thể tham khảo định hướng sau:
• Da dầu, dễ nổi mụn: Cân nhắc tư vấn chăm sóc da và đánh giá tình trạng mụn trước khi lựa chọn dịch vụ.
• Da khô, thiếu ẩm: Tìm hiểu các dịch vụ chăm sóc và dưỡng ẩm phù hợp.
• Da không đều màu, có thâm: Nên được đánh giá nguyên nhân trước khi lựa chọn phương pháp chăm sóc chuyên biệt.
• Da nhạy cảm, dễ kích ứng: Ưu tiên đánh giá hàng rào bảo vệ da và xác định các yếu tố có thể gây kích ứng.
Để đưa ra gợi ý phù hợp hơn, mình cần biết thêm về tình trạng da và mục tiêu của bạn.
Bạn có thể mở mục Hồ sơ da của tôi để xem thông tin đã lưu, sau đó chọn Đặt lịch tư vấn để tìm hiểu dịch vụ tại Hasaki Clinic.
Mình cũng khuyên bạn nên trao đổi với chuyên viên về các sản phẩm đang sử dụng, tiền sử kích ứng và những lưu ý trước khi thực hiện dịch vụ nhé!
Lưu ý: Đây là định hướng tham khảo, không thay thế việc thăm khám hoặc chẩn đoán của bác sĩ. Dịch vụ cụ thể cần được lựa chọn dựa trên đánh giá chuyên môn và danh mục thực tế tại Hasaki Clinic.`
    },
    {
      id: 4,
      question: 'Tôi đã thực hiện chăm sóc da một thời gian nhưng chưa thấy cải thiện rõ rệt. Làm thế nào để đánh giá hiệu quả routine hiện tại và điều chỉnh lộ trình phù hợp hơn?',
      answer: `Mình hiểu cảm giác chưa thấy kết quả rõ rệt dù đã chăm sóc da đều đặn! 🌱 Tuy nhiên, điều này không nhất thiết có nghĩa là sản phẩm bạn đang dùng không hiệu quả.
Có 4 yếu tố bạn nên kiểm tra:
1. Thời gian sử dụng
Một số vấn đề da cần nhiều tuần đến vài tháng để cải thiện. Thời gian phụ thuộc vào tình trạng da và hoạt chất đang sử dụng.
2. Mức độ phù hợp của sản phẩm
Sản phẩm có thể chưa phù hợp với loại da, mục tiêu chăm sóc hoặc khả năng dung nạp của bạn.
3. Tần suất sử dụng
Sử dụng hoạt chất quá thường xuyên có thể gây kích ứng; ngược lại, sử dụng không đều đặn có thể khiến việc đánh giá hiệu quả khó khăn hơn.
4. Thói quen chăm sóc da
Làm sạch dịu nhẹ, dưỡng ẩm và chống nắng đều đặn là nền tảng quan trọng của routine.
HASAKI gợi ý bạn thực hiện 3 bước:
• Ghi lại các sản phẩm và thời gian đã sử dụng.
• Theo dõi những thay đổi của da bằng hình ảnh trong điều kiện ánh sáng tương tự.
• Điều chỉnh từng yếu tố một thay vì thay đổi toàn bộ routine cùng lúc.
Để mình hỗ trợ cụ thể hơn, bạn hãy chia sẻ:
• Bạn đang muốn cải thiện vấn đề da nào?
• Bạn đã sử dụng routine hiện tại bao lâu?
• Da có xuất hiện dấu hiệu khô, đỏ hoặc kích ứng không?`
    }
  ];

  // Chat message list: if empty, display Hình 1 (4 preset cards)
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  // When user clicks a preset question (Hình 1 -> Hình 2/3/4/5)
  const handleSelectPreset = (preset) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: preset.question
    };

    setMessages(prev => [...prev, userMsg]);
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: preset.answer
      };
      setMessages(prev => [...prev, botMsg]);
    }, 350);
  };

  // When user types custom question
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    const query = inputText.trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      // Check if it matches one of the preset questions
      const matched = presetQuestions.find(p => 
        query.toLowerCase().includes(p.question.substring(0, 20).toLowerCase())
      );

      let reply = "";
      if (matched) {
        reply = matched.answer;
      } else if (query.toLowerCase().includes('mụn') || query.toLowerCase().includes('acne')) {
        reply = `Chào bạn! 🌿 Đối với tình trạng da mụn, Hasaki khuyên bạn:
1. Làm sạch dịu nhẹ với sữa rửa mặt có BHA (Salicylic Acid 1-2%).
2. Chấm mụn với Benzoyl Peroxide hoặc Tea Tree Oil.
3. Luôn thoa kem chống nắng không dầu (oil-free) để tránh thâm mụn.
Bạn có thể đặt lịch soi da miễn phí tại Hasaki Clinic & Spa để bác sĩ lên phác đồ chuẩn y khoa nhé!`;
      } else if (query.toLowerCase().includes('nắng') || query.toLowerCase().includes('kcn')) {
        reply = `HASAKI gợi ý bạn chọn kem chống nắng quang phổ rộng SPF 50+, PA++++:
• Da dầu mụn: La Roche-Posay Anthelios Oil Control, Anessa Perfect UV Milk.
• Da khô/nhạy cảm: Skin1004 Madagascar Centella, Eucerin Sun Gel-Cream.
Hãy thoa trước khi ra ngoài 20 phút và thoa lại sau mỗi 3-4 giờ!`;
      } else {
        reply = `Cảm ơn câu hỏi của bạn về "${query}"! 🌿
Chuyên viên Hasaki Skin Journey ghi nhận và khuyên bạn nên duy trì 3 bước cơ bản: Làm sạch dịu nhẹ, Cấp ẩm phục hồi và Chống nắng đầy đủ. Bạn cũng có thể ghé bất kỳ chi nhánh Hasaki Clinic & Spa nào để được bác sĩ thăm khám trực tiếp miễn phí nhé!`;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply
      };
      setMessages(prev => [...prev, botMsg]);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages([]);
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between bg-[#f2f6f3] select-none text-slate-800">
      
      {/* Top Header matching all 5 images */}
      <div className="px-5 pt-3 pb-2 flex-shrink-0 bg-[#f2f6f3]">
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-[#124c34] font-bold text-[17px] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.6]" />
            <span>AI Chatbot</span>
          </button>

          <button
            onClick={onBackToHome}
            className="text-[#124c34] hover:opacity-80 transition-opacity p-1 cursor-pointer"
            aria-label="Trang chủ"
          >
            <Home className="w-6 h-6 stroke-[2.4]" />
          </button>
        </div>

        {/* Subheader: Hasaki Admin + Bot badge */}
        <div className="flex flex-col items-center justify-center pt-1 pb-1">
          <HasakiLogo size={48} className="rounded-2xl shadow-xs" />
          <h2 className="text-[#124c34] font-bold text-[16px] mt-1.5 leading-tight">
            Hasaki Admin
          </h2>
          <p className="text-[#e57849] font-medium text-[12px] mt-0.5 tracking-tight text-center">
            Bạn đang được hỗ trợ bởi Hasaki Skin Journey Bot
          </p>
        </div>
      </div>

      {/* Main Scrollable Body */}
      <div className="w-full flex-1 overflow-y-auto no-scrollbar px-5 py-2 flex flex-col">
        
        {/* VIEW 1: HÌNH 1 - Hiển thị 4 câu hỏi có sẵn khi chưa có hội thoại */}
        {messages.length === 0 ? (
          <div className="my-auto flex flex-col items-center justify-center animate-fade-in pb-4">
            
            {/* Title: Hôm nay làn da của bạn thế nào? */}
            <h1 className="text-[#124c34] font-extrabold text-[27px] text-center tracking-tight leading-tight mb-6">
              Hôm nay làn da<br />của bạn thế nào?
            </h1>

            {/* 4 Preset Question Cards matching Hình 1 */}
            <div className="w-full flex flex-col gap-3">
              {presetQuestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectPreset(item)}
                  className="w-full bg-white hover:bg-emerald-50/70 active:scale-[0.99] text-left p-4 rounded-[22px] shadow-xs border border-emerald-900/[0.05] transition-all cursor-pointer group"
                >
                  <p className="text-[13.5px] leading-[19px] font-medium text-slate-800 group-hover:text-[#124c34]">
                    {item.question}
                  </p>
                </button>
              ))}
            </div>

          </div>
        ) : (
          /* VIEW 2: HỘI THOẠI CHAT (Khớp Hình 2, 3, 4, 5) */
          <div className="space-y-4 pb-4 animate-fade-in">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'user' ? (
                  /* User Message Bubble matching Hình 2, 3, 4, 5 (soft sage/green container) */
                  <div className="max-w-[88%] bg-[#cbe3d4] text-slate-900 px-4 py-3 rounded-[20px] text-[13.5px] leading-relaxed shadow-xs border border-emerald-900/[0.04]">
                    {msg.text}
                  </div>
                ) : (
                  /* Bot Reply Bubble matching Hình 2, 3, 4, 5 (white container with full styled text) */
                  <div className="max-w-[94%] bg-white text-slate-800 p-4 rounded-[22px] text-[13px] leading-[19px] shadow-xs border border-emerald-900/[0.04] whitespace-pre-line">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-[20px] shadow-xs border border-slate-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Quick Option to ask another preset or reset */}
            {!isBotTyping && messages.length > 0 && (
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleResetChat}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-white/90 hover:bg-white px-3 py-1.5 rounded-full shadow-xs border border-emerald-900/10 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Chọn câu hỏi gợi ý khác</span>
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

      </div>

      {/* Bottom Input Bar matching all images */}
      <div className="px-5 py-3.5 bg-[#f2f6f3] flex-shrink-0">
        <form 
          onSubmit={handleSendMessage}
          className="relative w-full flex items-center bg-white rounded-full border border-emerald-900/10 shadow-xs px-5 h-[52px]"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nhập tin nhắn....."
            className="flex-1 bg-transparent text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none pr-8"
          />

          <button
            type="submit"
            disabled={!inputText.trim() && !isBotTyping}
            className="absolute right-4 text-[#e57849] hover:text-[#d16132] p-1.5 transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Gửi tin nhắn"
          >
            <Send className="w-5 h-5 stroke-[2.2]" />
          </button>
        </form>
      </div>

    </div>
  );
}
