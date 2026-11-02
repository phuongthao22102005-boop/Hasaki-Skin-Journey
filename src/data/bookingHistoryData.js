// Data store for Booking Slips (Lịch sử đặt lịch) and Invoices (Hóa đơn)

export const initialBookingSlips = [
  {
    id: 'slip-01',
    clinicName: 'Hasaki Vietnam',
    clinicAddress: '468A Nguyễn Thị Thập, Phường Tân Quy, Quận 7',
    slipType: 'PHIẾU THĂM KHÁM',
    category: 'DA LIỄU',
    room: 'Phòng 2 - Lầu 1',
    queueNumber: 3,
    date: '07/09/2026',
    time: '10:30 - 11:30',
    patientName: 'NGUYỄN VĂN A',
    gender: 'Nam',
    dob: 'xx/xx/xxxx',
    city: 'Hồ Chí Minh',
    customerCode: 'N18-000001',
    slipCode: 'N20269086',
    fee: '50.000đ',
    feeNumber: 50000,
    voucher: 'Không',
    note: 'Ghi chú: Số thứ tự chỉ có giá trị trong ngày khám.',
    transactionCode: 'MOMO_12631212',
    status: 'da_kham', // 'da_thanh_toan' | 'da_tiep_nhan' | 'da_kham' | 'da_huy'
    consultant: 'ThS. BS. Nguyễn Thu Minh'
  },
  {
    id: 'slip-02',
    clinicName: 'Hasaki Vietnam',
    clinicAddress: '189A-189B Hai Bà Trưng, Phường Võ Thị Sáu',
    slipType: 'PHIẾU TƯ VẤN',
    category: 'CHĂM SÓC DA',
    room: 'Tầng trệt',
    queueNumber: 2,
    date: '13/10/2026',
    time: '10:30 - 11:30',
    patientName: 'NGUYỄN VĂN A',
    gender: 'Nam',
    dob: 'xx/xx/xxxx',
    city: 'Hồ Chí Minh',
    customerCode: 'N18-000001',
    slipCode: 'N20269087',
    fee: '0đ (Miễn phí)',
    feeNumber: 0,
    voucher: 'Không',
    note: 'Ghi chú: Số thứ tự chỉ có giá trị trong ngày khám.',
    transactionCode: 'HASAKI_FREE_01',
    status: 'da_kham',
    consultant: 'Chuyên viên Trần Thùy Anh'
  }
];

export const initialInvoices = [
  {
    id: 'inv-01',
    invoiceCode: 'HD-2026-9086',
    slipCode: 'N20269086',
    date: '07/09/2026',
    createdAt: '07/09/2026 10:15',
    serviceTitle: 'Thăm khám & Phân tích da liễu chuyên sâu',
    serviceType: 'Dịch vụ khám Da liễu',
    branch: 'Hasaki Clinic Quận 7 (468A Nguyễn Thị Thập)',
    consultant: 'ThS. BS. Nguyễn Thu Minh',
    customerName: 'NGUYỄN VĂN A',
    customerPhone: '087*******99',
    customerCode: 'N18-000001',
    amount: '50.000đ',
    amountNumber: 50000,
    discount: '0đ',
    total: '50.000đ',
    totalNumber: 50000,
    paymentMethod: 'Ví điện tử MoMo',
    status: 'Đã thanh toán',
    taxCode: '0313612878',
    companyName: 'CÔNG TY CỔ PHẦN HASAKI BEAUTY & CLINIC',
    companyAddress: 'Số 71 Hoàng Hoa Thám, Phường 13, Quận Tân Bình, TP. Hồ Chí Minh'
  },
  {
    id: 'inv-02',
    invoiceCode: 'HD-2026-9087',
    slipCode: 'N20269087',
    date: '13/10/2026',
    createdAt: '13/10/2026 10:20',
    serviceTitle: 'Tư vấn chăm sóc da & Thiết lập Routine Skincare',
    serviceType: 'Dịch vụ tư vấn tại Cửa hàng',
    branch: 'Hasaki Store Quận 3 (189A-189B Hai Bà Trưng)',
    consultant: 'Chuyên viên Trần Thùy Anh',
    customerName: 'NGUYỄN VĂN A',
    customerPhone: '087*******99',
    customerCode: 'N18-000001',
    amount: '0đ (Miễn phí)',
    amountNumber: 0,
    discount: '0đ',
    total: '0đ (Miễn phí)',
    totalNumber: 0,
    paymentMethod: 'Miễn phí 0đ',
    status: 'Đã thanh toán',
    taxCode: '0313612878',
    companyName: 'CÔNG TY CỔ PHẦN HASAKI BEAUTY & CLINIC',
    companyAddress: 'Số 71 Hoàng Hoa Thám, Phường 13, Quận Tân Bình, TP. Hồ Chí Minh'
  }
];

// Helper to create a new booking slip and a new invoice together
export function createNewBookingAndInvoice(bookingInfo, user = { name: 'NGUYỄN VĂN A' }) {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const slipCode = 'N2026' + randomSuffix;
  const invoiceCode = 'HD-2026-' + randomSuffix;

  const isClinic = (bookingInfo.serviceType || '').toLowerCase().includes('clinic') || 
                   (bookingInfo.branch || '').toLowerCase().includes('clinic') ||
                   (bookingInfo.consultant || '').toLowerCase().includes('bs.');

  const isPaidService = bookingInfo.price === 50000 || bookingInfo.price === '50.000đ';

  const newSlip = {
    id: 'slip-' + timestamp,
    clinicName: 'Hasaki Vietnam',
    clinicAddress: bookingInfo.address || (bookingInfo.branch ? bookingInfo.branch + ', TP. Hồ Chí Minh' : '468A Nguyễn Thị Thập, P. Tân Quy, Quận 7'),
    slipType: isClinic ? 'PHIẾU THĂM KHÁM' : 'PHIẾU TƯ VẤN',
    category: isClinic ? 'DA LIỄU' : 'CHĂM SÓC DA',
    room: isClinic ? 'Phòng 1 - Lầu 1' : 'Tầng trệt',
    queueNumber: 1,
    date: bookingInfo.date || '31/10/2026',
    time: bookingInfo.time || '09:30 - 10:30',
    patientName: (user?.name || 'NGUYỄN VĂN A').toUpperCase(),
    gender: user?.gender || bookingInfo?.gender || 'Nam',
    dob: 'xx/xx/xxxx',
    city: 'Hồ Chí Minh',
    customerCode: 'N18-000001',
    slipCode: slipCode,
    fee: isPaidService ? '50.000đ' : '0đ (Miễn phí)',
    feeNumber: isPaidService ? 50000 : 0,
    voucher: bookingInfo.voucher || 'Không',
    note: 'Ghi chú: Số thứ tự chỉ có giá trị trong ngày khám.',
    transactionCode: 'HASAKI_' + (isPaidService ? 'MOMO_' : 'FREE_') + randomSuffix,
    status: 'da_tiep_nhan', // In 'Đã tiếp nhận'
    consultant: bookingInfo.consultant || 'BS. CKI Vũ Hoài Nam',
    isNewlyBooked: true
  };

  const newInvoice = {
    id: 'inv-' + timestamp,
    invoiceCode: invoiceCode,
    slipCode: slipCode,
    date: bookingInfo.date || '31/10/2026',
    createdAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    serviceTitle: isClinic ? 'Đặt lịch Thăm khám & Điều trị Da liễu Y khoa' : 'Đặt lịch Tư vấn Chăm sóc da & Mỹ phẩm',
    serviceType: isClinic ? 'Dịch vụ khám Da liễu Clinic' : 'Dịch vụ Tư vấn Cửa hàng Hasaki',
    branch: bookingInfo.branch || 'Hasaki Store Chi nhánh Quận 7',
    consultant: bookingInfo.consultant || 'Chuyên viên Hasaki',
    customerName: (user?.name || 'NGUYỄN VĂN A').toUpperCase(),
    customerPhone: user?.phone || '087*******99',
    customerCode: 'N18-000001',
    amount: isPaidService ? '50.000đ' : '0đ (Miễn phí)',
    amountNumber: isPaidService ? 50000 : 0,
    discount: '0đ',
    total: isPaidService ? '50.000đ' : '0đ (Miễn phí)',
    totalNumber: isPaidService ? 50000 : 0,
    paymentMethod: isPaidService ? 'Ví điện tử MoMo' : 'Miễn phí 0đ',
    status: 'Đã thanh toán',
    taxCode: '0313612878',
    companyName: 'CÔNG TY CỔ PHẦN HASAKI BEAUTY & CLINIC',
    companyAddress: 'Số 71 Hoàng Hoa Thám, Phường 13, Quận Tân Bình, TP. Hồ Chí Minh',
    isNewlyCreated: true
  };

  return { newSlip, newInvoice };
}
