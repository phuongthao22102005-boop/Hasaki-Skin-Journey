// Conversational AI Engine for "Mai Hà" - Hasaki Skin Journey AI Consultant

function removeAccents(str = '') {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

function normalizeQuery(text = '') {
  let clean = removeAccents(text.trim());
  clean = clean
    .replace(/\bsrm\b/g, 'sua rua mat')
    .replace(/\bkcn\b/g, 'kem chong nang')
    .replace(/\btbc\b/g, 'tay te bao chet')
    .replace(/\b(ko|kh|hong|hok)\b/g, 'khong')
    .replace(/\b(dc|duoc)\b/g, 'duoc')
    .replace(/\b(mik|mk)\b/g, 'minh')
    .replace(/\bbn\b/g, 'bao nhieu');
  return clean;
}

export function getFriendlyCallName(user) {
  const raw = (user?.name || '').trim();
  if (!raw || removeAccents(raw) === 'nguyen van a') return 'bạn';
  const parts = raw.split(/\s+/);
  const lastWord = parts[parts.length - 1];
  if (!lastWord || lastWord.length <= 1) return 'bạn';
  return lastWord;
}

export function getInitialProactiveGreeting(user) {
  const callName = getFriendlyCallName(user);
  const hour = new Date().getHours();
  let timeGreeting = 'Chào';
  if (hour >= 5 && hour < 11) timeGreeting = 'Chào buổi sáng';
  else if (hour >= 11 && hour < 14) timeGreeting = 'Chào buổi trưa';
  else if (hour >= 14 && hour < 18) timeGreeting = 'Chào buổi chiều';
  else timeGreeting = 'Chào buổi tối';

  const message = `${timeGreeting} ${callName} nha! Mình là Mai Hà – trợ lý tư vấn chăm sóc da của Hasaki đây ạ. 🌿\n\nHôm nay làn da của ${callName} thế nào rồi? Dạo này da mình có gặp vấn đề nào khiến bạn bận tâm không (như đổ dầu, khô căng, nổi mụn, thâm sạm hay nhạy cảm dễ đỏ)? Bạn cứ kể tự nhiên để Mai Hà lắng nghe và tư vấn riêng cho bạn nhé!`;

  const quickReplies = [
    'Da mình dạo này hay nổi mụn & đổ dầu',
    'Da hơi khô căng, thiếu ẩm',
    'Da có thâm mụn, hơi xỉn màu',
    'Da nhạy cảm, dễ kích ứng đỏ',
    'Tư vấn giúp mình routine cơ bản'
  ];

  return { message, quickReplies };
}

function detectContextUpdates(norm, prevContext) {
  const next = {
    ...prevContext,
    concerns: [...(prevContext.concerns || [])],
    mentionedProducts: [...(prevContext.mentionedProducts || [])],
    turnCount: (prevContext.turnCount || 0) + 1
  };

  // Detect skin type
  if (/da hon hop|hon hop thien dau|chu t.*dau|dau.*chu t|vung chu t/.test(norm)) {
    next.skinType = 'combination';
  } else if (/da dau|bong dau|do dau|nhieu dau|nhon/.test(norm)) {
    next.skinType = 'oily';
  } else if (/da kho|bong troc|cang rat|thieu am|moc nen/.test(norm)) {
    next.skinType = 'dry';
  } else if (/nhay cam|de do|cham chich|kich ung|mong yeu/.test(norm)) {
    next.skinType = 'sensitive';
  } else if (/da thuong|da on|da dep|khong van de/.test(norm)) {
    next.skinType = 'normal';
  }

  // Detect concerns
  const addConcern = (c) => {
    if (!next.concerns.includes(c)) next.concerns.push(c);
  };
  if (/mun|acne|dau den|mun an|mun viem|mun boc/.test(norm)) addConcern('acne');
  if (/tham|nam|tan nhang|sam|xin mau|khong deu mau|trang da|sang da/.test(norm)) addConcern('dark_spots');
  if (/kho|bong|cang|thieu am|cap am|moc/.test(norm)) addConcern('dryness');
  if (/lo chan long|san sui|mun cam/.test(norm)) addConcern('pores');
  if (/lao hoa|nep nhan|tham mat|chay xe/.test(norm)) addConcern('aging');
  if (/\bdo da\b|\bman do\b|\bung do\b|kich ung|ngua|rat da|di ung/.test(norm)) addConcern('redness');

  // Detect products user is using
  const brands = ['simple', 'cerave', 'la roche', 'lrp', 'klairs', 'torriden', 'anessa', 'bioderma', 'paula', 'eucerin', 'skin1004', 'loreal', 'cocoon', 'the ordinary'];
  brands.forEach(b => {
    if (norm.includes(b) && !next.mentionedProducts.includes(b)) {
      next.mentionedProducts.push(b);
    }
  });

  return next;
}

function getSkinTypeLabel(skinType) {
  switch (skinType) {
    case 'oily': return 'da dầu';
    case 'dry': return 'da khô';
    case 'combination': return 'da hỗn hợp thiên dầu';
    case 'sensitive': return 'da nhạy cảm';
    case 'normal': return 'da thường';
    default: return null;
  }
}

export function generateMaiHaReply(userInput, chatContext = {}, user = {}, presetQuestions = []) {
  const callName = getFriendlyCallName(user);
  const norm = normalizeQuery(userInput);
  const ctx = detectContextUpdates(norm, chatContext);
  const skinLabel = getSkinTypeLabel(ctx.skinType);

  // 0. Check exact or near preset question match
  const matchedPreset = presetQuestions.find(p =>
    normalizeQuery(p.question).slice(0, 25) === norm.slice(0, 25) ||
    norm.includes(normalizeQuery(p.question).slice(0, 28))
  );
  if (matchedPreset) {
    return {
      reply: matchedPreset.answer,
      updatedContext: ctx,
      quickReplies: [
        'Tư vấn sản phẩm cụ thể cho mình',
        'Đặt lịch soi da miễn phí tại Hasaki'
      ]
    };
  }

  // 1. Greeting / Who is Mai Hà / Small Talk
  if (/^(hi|hello|hey|alo|chao|xin chao|mai ha|ha oi|ban oi|ad oi|em oi|chi oi)[\s!?.]*$/.test(norm) ||
      /ten gi|la ai|bao nhieu tuoi|gioi thieu|bot hay nguoi/.test(norm)) {
    return {
      reply: `Dạ chào ${callName}! Mình là Mai Hà – trợ lý tư vấn chăm sóc da của nhà Hasaki đây ạ. 😊\n\nBạn cứ xem mình như một người bạn am hiểu skincare nhé! Hôm nay ${callName} đang muốn tìm hiểu về sản phẩm nào, xây dựng routine hay đang gặp vấn đề gì về da (như mụn, dầu thừa, khô căng, thâm sạm...)? Chia sẻ với Mai Hà để mình hỗ trợ ngay nha!`,
      updatedContext: ctx,
      quickReplies: [
        'Da mình hay đổ dầu & có mụn',
        'Gợi ý giúp mình sữa rửa mặt dịu nhẹ',
        'Cách sắp xếp routine sáng - tối'
      ]
    };
  }

  // 2. Gratitude / Goodbye / Positive acknowledgements
  if (/^(cam on|cam on ha|thank|thanks|ok|oke|okay|da|vang|tot qua|tuyet voi|hieu roi|bye|tam biet)[\s!?.]*$/.test(norm) ||
      (/cam on|thank/.test(norm) && norm.length < 35)) {
    return {
      reply: `Không có gì đâu nè ${callName} ơi! 💚 Rất vui vì đã giúp ích được cho bạn. Bất cứ lúc nào cần rà soát thành phần mỹ phẩm, chọn sản phẩm hợp túi tiền hay đặt lịch soi da miễn phí ở Hasaki Clinic, ${callName} cứ nhắn cho Mai Hà nha!\n\nChúc ${callName} sớm có làn da khỏe mịn, rạng rỡ nhé! ✨`,
      updatedContext: ctx,
      quickReplies: [
        'Xem sản phẩm phù hợp với da mình',
        'Đặt lịch soi da miễn phí'
      ]
    };
  }

  // 3. Emotional reassurance / Frustration / Budget concerns
  if (/buon|nan|stress|tu ti|khoc|mai khong het|ton tien|sinh vien|hoc sinh|gia re|tiet kiem/.test(norm)) {
    const isBudget = /sinh vien|hoc sinh|gia re|tiet kiem|it tien|ngan sach/.test(norm);
    if (isBudget) {
      return {
        reply: `Mai Hà hiểu mà, chăm da đâu nhất thiết phải dùng đồ đắt tiền mới đẹp đâu ${callName} ơi! Quan trọng nhất là chọn đúng món lành tính và phù hợp với da thôi ạ. 💚\n\nNếu ưu tiên ngon – bổ – hợp túi tiền học sinh/sinh viên tại Hasaki, Mai Hà gợi ý combo cơ bản siêu ổn này:\n• **Làm sạch:** Nước tẩy trang Garnier hoặc L'Oreal (khoảng 160K–180K) + Sữa rửa mặt Simple / CeraVe bản mini.\n• **Cấp ẩm dịu da:** Klairs Supple Preparation Toner (285.000₫) – dùng cực kỳ lâu hết luôn.\n• **Chống nắng:** Skin1004 Centella hoặc L'Oreal UV Defender (khoảng 250K–300K).\n\nBạn muốn Mai Hà gợi ý thêm món nào theo đúng loại da của mình không?`,
        updatedContext: ctx,
        quickReplies: [
          'Da mình dầu mụn thì dùng bộ nào?',
          'Da mình khô thì sao Hà?'
        ],
        actionLink: { label: '🧴 Xem Sản phẩm phù hợp', target: 'products' }
      };
    }

    return {
      reply: `Thương ${callName} quá, Mai Hà hiểu cảm giác chăm da mãi mà chưa thấy ổn áp nên dễ nản lắm ạ... 🥺 Nhưng bạn đừng quá áp lực nha, vì stress cũng làm da tiết nhiều dầu và dễ lên mụn hơn đó!\n\nMình cùng tháo gỡ từng bước chậm mà chắc nhé: bỏ bớt các bước rườm rà, quay về bộ 3 tối giản **(Làm sạch dịu nhẹ – Phục hồi ẩm – Chống nắng)** trong 2 tuần để da "thở" lại. Nếu tiện, cuối tuần ${callName} ghé Hasaki gần nhất để máy soi da chuyên sâu kiểm tra miễn phí xem gốc rễ vấn đề là gì nha!\n\nKể Mai Hà nghe hiện tại điều gì làm bạn khó chịu nhất trên da đi ạ?`,
      updatedContext: ctx,
      quickReplies: [
        'Mụn ẩn & mụn viêm cứ lên hoài',
        'Da mình bị kích ứng, đỏ rát',
        'Đặt lịch soi da miễn phí'
      ],
      actionLink: { label: '📅 Đặt lịch soi da miễn phí', target: 'booking' }
    };
  }

  // 4. Clinic / Booking / Price / Store Inquiries
  if (/dat lich|hen lich|clinic|phong kham|bac si|soi da|bang gia|gia dich vu|lay nhan mun|peel da|chi nhanh|cua hang/.test(norm)) {
    return {
      reply: `Dạ về dịch vụ tại Hasaki thì ${callName} yên tâm nha! 🏥\n\n• **Soi da & Tư vấn tại cửa hàng:** Hoàn toàn **MIỄN PHÍ 100%** cùng chuyên viên tư vấn.\n• **Điều trị chuẩn y khoa tại Hasaki Clinic:** Có Bác sĩ Da liễu trực tiếp thăm khám, giá cực kỳ minh bạch:\n  - Combo Lấy nhân mụn + đắp mặt nạ + chiếu đèn: **249.000₫**\n  - Peel da BHA 20% trị mụn: **350.000₫**\n  - Điện di lạnh phục hồi da: **500.000₫**\n\nNếu muốn, ${callName} bấm nút bên dưới để chọn ngày giờ & chi nhánh gần bạn nhất luôn nhé, đặt xong có phiếu hẹn lưu lại ngay trên app tiện lắm ạ!`,
      updatedContext: ctx,
      quickReplies: [
        'Mình muốn tư vấn thêm về da trước',
        'Sau khi lấy mụn cần chăm da sao?'
      ],
      actionLink: { label: '📅 Mở trang Đặt lịch tư vấn', target: 'booking' }
    };
  }

  // 5. Ingredient compatibility & Routine order / Mixing actives
  if (/ket hop|dung chung|trung nhau|kich ung|retinol|aha|bha|vitamin c|niacinamide|benzoyl|thu tu|cac buoc|sang toi|buoi sang|buoi toi|routine/.test(norm) &&
      !/sua rua mat|kem chong nang|tay trang|toner|serum|kem duong/.test(norm)) {
    let customNote = skinLabel ? `Với nền **${skinLabel}** của ${callName}, ` : '';
    if (/retinol|aha|bha|benzoyl|ket hop|dung chung/.test(norm)) {
      return {
        reply: `${customNote}khi phối hợp các hoạt chất treatment (Retinol, AHA/BHA, Vitamin C...), nguyên tắc vàng của Mai Hà là **"không ôm đồm cùng một buổi"** để bảo vệ hàng rào da nha! 🧴\n\n• **Thứ tự chuẩn:** Tẩy trang (tối) → Sữa rửa mặt → Toner → Serum → Kem dưỡng → Kem chống nắng (sáng).\n• **Cách chia lịch an toàn:**\n  - **Buổi sáng:** Vitamin C hoặc Niacinamide + Kem chống nắng.\n  - **Buổi tối:** Xen kẽ 1 tối dùng BHA/AHA, 1–2 tối nghỉ chỉ cấp ẩm phục hồi (B5/Ceramide), nếu dùng Retinol thì tách riêng tối khác với BHA nhé!\n\nHiện tại ${callName} đang định kết hợp cụ thể những sản phẩm nào ạ? Nhắn tên sản phẩm cho Mai Hà rà soát kỹ giúp bạn nha!`,
        updatedContext: ctx,
        quickReplies: [
          'Mình muốn xem gợi ý routine sáng & tối',
          'Da hơi rát khi dùng treatment thì sao?'
        ]
      };
    }

    return {
      reply: `Dạ ${customNote}để da khỏe đẹp mà không bị quá tải, ${callName} chỉ cần giữ vững khung routine chuẩn này là ổn áp lắm luôn nè:\n\n☀️ **Buổi sáng (Bảo vệ):**\n1. Sữa rửa mặt dịu nhẹ\n2. Toner / Serum cấp ẩm nhẹ\n3. Kem dưỡng ẩm mỏng (nếu da khô)\n4. **Kem chống nắng** (bước bắt buộc nha!)\n\n🌙 **Buổi tối (Làm sạch & Phục hồi):**\n1. Nước tẩy trang (kể cả khi không makeup)\n2. Sữa rửa mặt\n3. Tẩy tế bào chết / Treatment (2–3 lần/tuần)\n4. Toner + Serum phục hồi (B5/HA)\n5. Kem dưỡng khóa ẩm / Chấm mụn (nếu có).\n\n${callName} đã có đủ các bước cơ bản này chưa ạ? Thiếu bước nào cứ bảo Mai Hà chọn giúp nha!`,
      updatedContext: ctx,
      quickReplies: [
        'Gợi ý giúp mình sữa rửa mặt tốt',
        'Nên chọn kem chống nắng nào?'
      ],
      actionLink: { label: '🧴 Xem Routine & Sản phẩm phù hợp', target: 'products' }
    };
  }

  // 6. Specific Product Category Recommendations (Context-aware!)
  if (/sua rua mat|rua mat|cleanser/.test(norm)) {
    if (ctx.skinType === 'oily' || ctx.skinType === 'combination' || ctx.concerns.includes('acne')) {
      return {
        reply: `Với nền ${skinLabel || 'da dầu/dễ lên mụn'} như ${callName} vừa chia sẻ, Mai Hà cực kỳ ưng 2 "chân ái" này tại Hasaki ạ:\n\n1. **La Roche-Posay Effaclar Purifying Foaming Gel (385.000₫/400ml):** Làm sạch sâu bã nhờn, hỗ trợ giảm mụn nhưng không làm căng rát da.\n2. **CeraVe Foaming Cleanser (320.000₫/236ml):** Có thêm Ceramide & Niacinamide giúp kiềm dầu êm ái mà vẫn giữ màng ẩm bảo vệ da.\n\nNgoài ra nhớ rửa mặt tối đa 2 lần/ngày (sáng – tối) thôi nhé, rửa nhiều quá da lại tiết dầu bù nhiều hơn đó ạ!`,
        updatedContext: ctx,
        quickReplies: ['Nên dùng thêm toner hay serum nào?', 'Gợi ý kem chống nắng kiềm dầu'],
        actionLink: { label: '🧴 Xem chi tiết sản phẩm', target: 'products' }
      };
    }
    if (ctx.skinType === 'dry' || ctx.skinType === 'sensitive') {
      return {
        reply: `Với làn ${skinLabel || 'da khô nhạy cảm'} của ${callName}, tiêu chí chọn sữa rửa mặt số 1 là **pH cân bằng (~5.5), không sulfate, rửa xong da vẫn mềm ẩm** nha:\n\n1. **CeraVe Hydrating Cleanser:** Dạng sữa dịu nhẹ bổ sung Hyaluronic Acid và Ceramides, rửa xong không hề bị căng kít.\n2. **Simple Refreshing Facial Wash:** Cực kỳ lành tính, không cồn không hương liệu, giá lại rất mềm.\n\nBạn có đang dùng nước tẩy trang buổi tối chưa ạ?`,
        updatedContext: ctx,
        quickReplies: ['Tư vấn thêm kem dưỡng ẩm phục hồi', 'Mình chưa có tẩy trang'],
        actionLink: { label: '🧴 Xem Sản phẩm phù hợp', target: 'products' }
      };
    }
    return {
      reply: `Mai Hà rất thích tư vấn sữa rửa mặt vì đây là bước nền quan trọng nhất luôn đó ${callName}! 🧼\n\n• **Nếu da dầu / hỗn hợp / có mụn:** Dùng **La Roche-Posay Effaclar Gel** (385.000₫) hoặc **CeraVe Foaming Cleanser** (320.000₫) để sạch thoáng mà không khô da.\n• **Nếu da khô / nhạy cảm:** Chọn **CeraVe Hydrating Cleanser** hoặc **Simple Refreshing Gel** để giữ ẩm êm dịu.\n\nDa của ${callName} thường đổ dầu vùng chữ T hay bị khô căng sau khi rửa mặt vậy ạ? Kể Mai Hà nghe để mình chốt chính xác hơn nha!`,
      updatedContext: ctx,
      quickReplies: ['Da mình dầu vùng chữ T', 'Da mình hay bị khô căng']
    };
  }

  if (/chong nang|sunscreen/.test(norm)) {
    const isOilyOrAcne = ctx.skinType === 'oily' || ctx.skinType === 'combination' || ctx.concerns.includes('acne');
    return {
      reply: `Chống nắng là bước chống lão hóa và ngăn thâm sạm hiệu quả nhất luôn đó ${callName}! ☀️${isOilyOrAcne ? ` Với nền ${skinLabel || 'da dầu mụn'} của bạn:` : ''}\n\n• **Da dầu, hỗn hợp, dễ bí mụn:** Chọn **La Roche-Posay Anthelios UVMune 400 Oil Control (465.000₫)** hoặc **Anessa Perfect UV Milk** – thấm nhanh, ráo mịn không bóng nhờn.\n• **Da khô / nhạy cảm dễ đỏ:** Chọn **Skin1004 Madagascar Centella Air-Fit** hoặc **Eucerin Sun Gel-Cream** – nhẹ mặt, làm dịu da và nâng tông nhẹ tự nhiên.\n\nMẹo nhỏ của Mai Hà: nhớ thoa đủ lượng 2 đốt ngón tay trước khi ra nắng 15–20 phút, và tối nhớ dùng nước tẩy trang làm sạch kỹ nha!`,
      updatedContext: ctx,
      quickReplies: ['Buổi tối nên tẩy trang loại nào?', 'Cách thoa lại KCN trong ngày'],
      actionLink: { label: '🧴 Xem bảng Sản phẩm phù hợp', target: 'products' }
    };
  }

  if (/tay trang|micellar/.test(norm)) {
    return {
      reply: `Dù ngày hôm đó ${callName} chỉ thoa kem chống nắng hay ở nhà thôi thì buổi tối vẫn nên tẩy trang để loại bỏ bụi mịn và bã nhờn nhé! ✨\n\nTại Hasaki có 2 dòng "quốc dân" siêu sạch và êm da:\n• **Da dầu / mụn:** **Bioderma Sebium H2O (màu xanh lá)** – làm sạch thoáng lỗ chân lông, kiểm soát dầu tốt.\n• **Da nhạy cảm / khô / mọi loại da:** **Bioderma Sensibio H2O (màu hồng)** hoặc **L'Oreal Micellar Water (tím/xanh nhạt)** – dịu nhẹ như nước, không cần chà xát mạnh.\n\n${callName} có hay bị rát mặt khi lau bông tẩy trang không? Nhớ chọn loại bông mềm và thấm đẫm nước tẩy trang nhé!`,
      updatedContext: ctx,
      quickReplies: ['Sau tẩy trang dùng SRM gì?', 'Tư vấn thêm bước serum']
    };
  }

  if (/serum|tinh chat|toner|nuoc hoa hong|kem duong|duong am|phuc hoi/.test(norm)) {
    const isAcneOrOily = ctx.skinType === 'oily' || ctx.concerns.includes('acne');
    return {
      reply: `Để cấp ẩm và phục hồi da chuẩn chỉnh, ${callName} tham khảo những món "best-seller" đang được khách Hasaki khen nhiều nhất nè: 💧\n\n• **Toner làm dịu cân bằng pH:** **Klairs Supple Preparation Unscented (285.000₫)** (không mùi cho da nhạy cảm) hoặc **Torriden DIVE-IN Toner (365.000₫)** (cấp nước đa tầng).\n• **Serum cấp ẩm & phục hồi:** **La Roche-Posay Hyalu B5 Serum (890.000₫)** (căng bóng, phục hồi da yếu) hoặc **Torriden Dive-In Serum**.\n• **Kem dưỡng:** ${isAcneOrOily ? '**La Roche-Posay Effaclar Duo+M (415.000₫)** giúp giảm mụn ngừa thâm mà vẫn ẩm mịn nhẹ mặt.' : '**La Roche-Posay Cicaplast Baume B5+** hoặc **Klairs Midnight Blue** làm dịu đỏ, khóa ẩm qua đêm cực đỉnh.'}\n\n${callName} đang muốn tìm món chuyên về **cấp ẩm phục hồi**, **giảm mụn** hay **làm sáng mờ thâm** ạ?`,
      updatedContext: ctx,
      quickReplies: ['Chuyên cấp ẩm phục hồi', 'Chuyên giảm thâm sáng da'],
      actionLink: { label: '🧴 Xem Sản phẩm phù hợp', target: 'products' }
    };
  }

  // 7. User tells Mai Hà products they are currently using
  if (ctx.mentionedProducts.length > 0 && norm.length < 120 && !/tu van|hoi|nen/.test(norm)) {
    const usedList = ctx.mentionedProducts.map(b => b.toUpperCase()).join(', ');
    return {
      reply: `À, Mai Hà thấy bạn đang dùng **${usedList}** rồi nè! Toàn những thương hiệu uy tín và lành tính thôi ạ. 👍\n\n${ctx.skinType ? `Với nền **${skinLabel}** của ${callName}, ` : ''}những món này khá an toàn để dùng lâu dài. Tuy nhiên, để hiệu quả rõ rệt hơn, bạn cho Mai Hà hỏi thêm:\n1. Bạn dùng bộ này được khoảng bao lâu rồi?\n2. Cảm giác trên da sau khi thoa thế nào (có bị khô căng, đổ dầu nhanh hay châm chích không)?\n\nNhắn cho Mai Hà biết để mình xem giúp có cần bổ sung bước nào còn thiếu không nhé!`,
      updatedContext: ctx,
      quickReplies: [
        'Dùng được hơn 1 tháng mà chưa thấy đỡ',
        'Da vẫn hơi đổ dầu / khô sau khi dùng'
      ]
    };
  }

  // 8. Skin Condition & Problem Assessment (Proactive Follow-up Response!)
  if (/mun|acne|dau|nhon|kho|bong troc|nhay cam|kich ung|tham|nam|tan nhang|lo chan long|xin mau|lao hoa|nep nhan|tinh trang da/.test(norm)) {
    // 8a. Acne + Oily / Combination
    if (/mun/.test(norm)) {
      const isHiddenAcne = /mun an|duoi da|san sui/.test(norm);
      const isInflamed = /mun viem|mun boc|sung|do|dau/.test(norm);
      return {
        reply: `Ôi, nghe ${callName} chia sẻ là Mai Hà hiểu ngay cảm giác khó chịu khi da lên ${isHiddenAcne ? 'mụn ẩn sần sùi' : isInflamed ? 'mụn sưng viêm' : 'mụn'} rồi ạ! 🥺 Đừng lo quá nha, mình xử lý đúng cách là da sẽ dịu xuống rất nhanh.\n\nVới tình trạng hiện tại${skinLabel ? ` (${skinLabel})` : ''}, Mai Hà khuyên bạn ưu tiên **làm sạch thông thoáng + dịu viêm + không nặn bừa bãi**:\n1. **Làm sạch:** Tẩy trang kỹ buổi tối + Rửa mặt với **La Roche-Posay Effaclar Gel** (385.000₫) để sạch bã nhờn mà không rát da.\n2. **Xử lý mụn:** ${isHiddenAcne ? 'Thêm tẩy tế bào chết BHA 2% (2–3 tối/tuần) để đẩy nhân mụn nhẹ nhàng.' : 'Dùng gel chấm mụn/kem dưỡng **Effaclar Duo+M** (415.000₫) giúp gom cồi, giảm sưng và ngừa thâm.'}\n3. **Bảo vệ:** Ban ngày thoa KCN kiềm dầu (Oil Control) để tia UV không làm vết mụn bị thâm đen.\n\nHiện tại ở nhà ${callName} đang dùng sản phẩm gì chưa ạ? Kể Mai Hà nghe để mình ghép vào cho chuẩn nhất nha!`,
        updatedContext: ctx,
        quickReplies: [
          'Mình mới dùng SRM với KCN thôi',
          'Có cần đi lấy nhân mụn tại Clinic không?'
        ],
        actionLink: { label: '🧴 Xem Sản phẩm trị mụn phù hợp', target: 'products' }
      };
    }

    // 8b. Dry / Dehydrated / Flaky
    if (/kho|bong|cang|thieu am|moc/.test(norm)) {
      return {
        reply: `Nghe ${callName} mô tả da bị khô căng thiếu ẩm là Mai Hà đoán da mình đang "khát nước" và hàng rào bảo vệ hơi yếu rồi đó ạ! 💧\n\nBí quyết cứu cánh cho da khô là **cấp nước đa tầng + khóa ẩm đúng lúc (khi da còn hơi ẩm)**:\n1. **Tránh rửa mặt bằng nước nóng** và chọn sữa rửa mặt dịu nhẹ không tạo bọt quá mạnh.\n2. **Toner & Serum cấp nước:** Dùng **Klairs Unscented Toner** (285.000₫) vỗ 1–2 lớp, sau đó thoa **La Roche-Posay Hyalu B5 Serum** (890.000₫) để da ngậm nước căng bóng.\n3. **Khóa ẩm:** Chốt bằng kem dưỡng phục hồi có B5/Ceramide.\n\nBan ngày ${callName} ngồi điều hòa nhiều không? Nếu có thì nhớ uống đủ nước và xịt khoáng nhẹ giữa ngày nữa nha!`,
        updatedContext: ctx,
        quickReplies: [
          'Mình ngồi máy lạnh cả ngày luôn',
          'Gợi ý kem chống nắng không gây mốc nền'
        ],
        actionLink: { label: '🧴 Xem Sản phẩm cấp ẩm sâu', target: 'products' }
      };
    }

    // 8c. Sensitive / Redness / Irritation
    if (/nhay cam|kich ung|de do|cham chich|di ung|mong/.test(norm)) {
      return {
        reply: `Da nhạy cảm dễ đỏ rát thực sự cần được "chiều chuộng" kỹ lắm đó ${callName} ơi! 🌿 Giai đoạn này mình tuyệt đối **tạm ngưng các sản phẩm tẩy da chết mạnh, cồn khô hay hương liệu nồng** nhé.\n\nMai Hà gợi ý routine tối giản phục hồi cho da nhạy cảm:\n• **Làm sạch êm ái:** Tẩy trang **Bioderma hồng (Sensibio H2O)** + sữa rửa mặt dịu nhẹ không bọt.\n• **Làm dịu & Phục hồi:** **Klairs Toner không mùi** (285.000₫) + Serum B5 hoặc kem dưỡng **Cicaplast Baume B5+** giúp giảm ửng đỏ và củng cố màng da cực tốt.\n\nDạo gần đây ${callName} có đổi mỹ phẩm mới nào khiến da bị châm chích không ạ?`,
        updatedContext: ctx,
        quickReplies: [
          'Mình mới đổi serum/kem dưỡng mới',
          'Đặt lịch soi da kiểm tra với chuyên viên'
        ],
        actionLink: { label: '📋 Tạo / Cập nhật Hồ sơ da', target: 'hosoda' }
      };
    }

    // 8d. Dark spots / Hyperpigmentation / Dull skin
    if (/tham|nam|tan nhang|sam|xin mau|trang|sang/.test(norm)) {
      return {
        reply: `Để cải thiện thâm sạm và giúp da sáng đều màu tự nhiên, ${callName} cần kết hợp 2 mũi nhọn là **ức chế sắc tố + chống nắng thật kỹ** nha! ✨\n\n• **Hoạt chất sáng da an toàn:** Vitamin C vào buổi sáng hoặc Niacinamide 5–10% để làm mờ vết thâm mới và đều màu da.\n• **Chống nắng nghiêm ngặt:** Dù dưỡng sáng xịn tới đâu mà quên kem chống nắng thì vết thâm vẫn dễ sậm lại lắm ạ.\n• Nếu là **thâm mụn lâu năm hoặc nám/tàn nhang**, bạn có thể cân nhắc thêm liệu trình Laser Revlite hoặc Peel nhẹ tại Hasaki Clinic để thấy hiệu quả nhanh và an toàn hơn.\n\nThâm trên da của ${callName} là thâm sau mụn hay đốm nâu nám tàn nhang ạ?`,
        updatedContext: ctx,
        quickReplies: [
          'Thâm đỏ, thâm đen sau mụn',
          'Xem bảng giá trị thâm nám tại Clinic'
        ],
        actionLink: { label: '💰 Xem Bảng giá Hasaki Clinic', target: 'banggia' }
      };
    }

    // 8e. Oily / Large pores
    if (/dau|nhon|lo chan long/.test(norm)) {
      return {
        reply: `Nhiều bạn hay nghĩ da dầu thì không cần dưỡng ẩm, nhưng thật ra da càng thiếu nước bên trong thì tuyến dầu càng tiết ra nhiều để tự bảo vệ đó ${callName} ơi! 💡\n\nĐể kiềm dầu và giúp lỗ chân lông nhìn mịn gọn hơn:\n1. **Làm sạch:** Dùng **CeraVe Foaming** (320.000₫) hoặc **Effaclar Gel** (385.000₫).\n2. **Cấp nước mỏng nhẹ:** Chọn serum thấm nhanh như **Torriden HA** hoặc **Niacinamide** giúp điều tiết bã nhờn.\n3. **Tẩy tế bào chết BHA** 2 lần/tuần giúp dọn sạch dầu thừa mắc kẹt trong lỗ chân lông.\n\nDa ${callName} bị đổ dầu toàn mặt hay chỉ nhiều ở vùng mũi và trán thôi ạ?`,
        updatedContext: ctx,
        quickReplies: [
          'Chỉ đổ dầu vùng chữ T (trán, mũi)',
          'Đổ dầu nhiều cả mặt luôn'
        ]
      };
    }
  }

  // 9. Not seeing results / Evaluation
  if (/khong hieu qua|chua do|khong cai thien|lau qua|van vay|bao lau/.test(norm)) {
    return {
      reply: `Mai Hà hiểu cảm giác chăm chỉ skincare mỗi ngày mà chưa thấy da thay đổi rõ rệt là sốt ruột lắm đúng không ${callName}? 🌱\n\nThật ra chu kỳ tái tạo da tự nhiên cần khoảng **28–45 ngày** lận đó ạ. Bạn thử kiểm tra 3 điểm này cùng Mai Hà nha:\n1. **Thời gian sử dụng:** Có sản phẩm mới dùng 1–2 tuần thì chưa kịp phát huy hết đâu.\n2. **Liều lượng chống nắng:** Bôi thiếu kem chống nắng làm da khó mờ thâm và dễ sạm lại.\n3. **Tình trạng bít tắc ẩn:** Đôi khi da cần làm sạch chuyên sâu tại Clinic 1 buổi để các dưỡng chất thẩm thấu tốt hơn.\n\n${callName} đã duy trì routine hiện tại được mấy tuần rồi, và đang dùng những món nào nè?`,
      updatedContext: ctx,
      quickReplies: [
        'Mình dùng hơn 1 tháng rồi',
        'Đặt lịch soi da kiểm tra lại'
      ]
    };
  }

  // 10. Natural, human-like conversational fallback
  const turnBasedFallbacks = [
    `Mình nghe đây ${callName} ơi! 😊 Về vấn đề *"${userInput.trim()}"* bạn vừa nhắc, để Mai Hà tư vấn chính xác và sát nhất với làn da của bạn thì bạn cho mình hỏi nhỏ xíu:\n\n• Da bạn thuộc tuýp nào (**da dầu, da khô, hỗn hợp hay nhạy cảm**)?\n• Hiện tại bạn đang muốn cải thiện điều gì nhất (**trị mụn, mờ thâm, cấp ẩm hay tìm routine cơ bản**)?\n\nCứ nhắn tự nhiên với Mai Hà nhé! 🌿`,
    `Dạ Mai Hà ghi nhận chia sẻ của ${callName} rồi ạ! 💚 Hiện mình có thể hỗ trợ bạn chi tiết về:\n• Tư vấn **chọn sản phẩm Hasaki chính hãng** hợp loại da & ngân sách\n• Sắp xếp **thứ tự routine sáng/tối** và rà soát thành phần tránh kích ứng\n• Hỗ trợ **đặt lịch soi da miễn phí** hoặc tham khảo bảng giá Hasaki Clinic\n\n${callName} muốn mình bắt đầu từ phần nào trước nè?`
  ];

  const chosenFallback = turnBasedFallbacks[ctx.turnCount % turnBasedFallbacks.length];
  return {
    reply: chosenFallback,
    updatedContext: ctx,
    quickReplies: [
      'Tư vấn sản phẩm hợp với da mình',
      'Xây dựng routine sáng - tối',
      'Đặt lịch soi da miễn phí'
    ]
  };
}
