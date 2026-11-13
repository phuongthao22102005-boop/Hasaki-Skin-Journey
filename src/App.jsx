import React, { useState } from 'react';
import MobileWebLayout from './components/MobileFrame';
import Screen1Splash from './components/Screen1Splash';
import Screen2Login from './components/Screen2Login';
import Screen3Home from './components/Screen3Home';
import ScreenNhacLich from './components/ScreenNhacLich';
import ScreenHoTro from './components/ScreenHoTro';
import ScreenLangNghe from './components/ScreenLangNghe';
import ScreenAIChat from './components/ScreenAIChat';
import ScreenHoSoDa from './components/ScreenHoSoDa';
import ScreenDanhGiaDa from './components/ScreenDanhGiaDa';
import ScreenChuTrinhChamDa from './components/ScreenChuTrinhChamDa';
import ScreenTaiKhoan from './components/ScreenTaiKhoan';
import ScreenDatLich from './components/ScreenDatLich';
import ScreenLichSuDatLich from './components/ScreenLichSuDatLich';
import ScreenHoaDon from './components/ScreenHoaDon';
import ScreenSanPhamPhuHop from './components/ScreenSanPhamPhuHop';
import ScreenBangGiaDichVu from './components/ScreenBangGiaDichVu';
import ScreenThongBao from './components/ScreenThongBao';
import ScreenHuongDanSuDung from './components/ScreenHuongDanSuDung';
import ScreenHoiDapChuyenGia from './components/ScreenHoiDapChuyenGia';
import ScreenTatCaTienIch from './components/ScreenTatCaTienIch';
import EmployeeLayout from './components/employee/EmployeeLayout';
import { initialBookingSlips, initialInvoices, createNewBookingAndInvoice } from './data/bookingHistoryData';
import { 
  employeeAccounts, 
  initialCustomerProfiles, 
  initialConsultationRecords 
} from './data/employeeData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('screen1');
  const [previousScreen, setPreviousScreen] = useState('screen3');
  const [hoSoDaInitialView, setHoSoDaInitialView] = useState('profile_list');
  
  // Interface Mode: 'customer' | 'employee'
  const [interfaceMode, setInterfaceMode] = useState('customer');
  const [employeeUser, setEmployeeUser] = useState(employeeAccounts[0]);

  // Persistent User Profile with Gender customization & Trịnh Phương Thảo profile
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hasaki_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Nguyễn Văn A' || parsed.name === 'Minh Thanh') {
          return {
            name: 'TRỊNH PHƯƠNG THẢO',
            gender: 'Nữ',
            phone: '0987 221 005',
            email: 'phuongthao.boop@gmail.com',
            birthDate: '22/10/2005',
            cccd: '079305012899',
            country: 'Việt Nam',
            job: 'Sinh viên / Thiết kế đồ họa & Sáng tạo nội dung',
            address: 'Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. HCM'
          };
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return { 
      name: 'TRỊNH PHƯƠNG THẢO',
      gender: 'Nữ',
      phone: '0987 221 005',
      email: 'phuongthao.boop@gmail.com',
      birthDate: '22/10/2005',
      cccd: '079305012899',
      country: 'Việt Nam',
      job: 'Sinh viên / Thiết kế đồ họa & Sáng tạo nội dung',
      address: 'Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. HCM'
    };
  });

  const handleUpdateUser = (updatedFields) => {
    setUser(prev => {
      const nextUser = { ...prev, ...updatedFields };
      try {
        localStorage.setItem('hasaki_user_profile', JSON.stringify(nextUser));
      } catch (e) {
        console.error(e);
      }
      return nextUser;
    });
  };

  // Persistent Booking Slips & Electronic Invoices
  const [bookingSlips, setBookingSlips] = useState(() => {
    try {
      const saved = localStorage.getItem('hasaki_booking_slips');
      return saved ? JSON.parse(saved) : initialBookingSlips;
    } catch {
      return initialBookingSlips;
    }
  });

  const [invoices, setInvoices] = useState(() => {
    try {
      const saved = localStorage.getItem('hasaki_invoices');
      return saved ? JSON.parse(saved) : initialInvoices;
    } catch {
      return initialInvoices;
    }
  });

  // Persistent Customer Profiles (Shared with Employee Portal)
  const [customerProfiles, setCustomerProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem('hasaki_customer_profiles');
      return saved ? JSON.parse(saved) : initialCustomerProfiles;
    } catch {
      return initialCustomerProfiles;
    }
  });

  // Persistent Consultation Records (Shared between Customer & Employee)
  const [consultationRecords, setConsultationRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('hasaki_consultation_records');
      return saved ? JSON.parse(saved) : initialConsultationRecords;
    } catch {
      return initialConsultationRecords;
    }
  });

  // Called when user completes booking in ScreenDatLich
  const handleBookingSuccess = (bookingData) => {
    const { newSlip, newInvoice } = createNewBookingAndInvoice(bookingData, user);
    
    setBookingSlips(prev => {
      const updated = [newSlip, ...prev];
      try {
        localStorage.setItem('hasaki_booking_slips', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    setInvoices(prev => {
      const updated = [newInvoice, ...prev];
      try {
        localStorage.setItem('hasaki_invoices', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Called when Employee updates appointment status or adds prep notes
  const handleUpdateBookingSlip = (slipId, updates) => {
    setBookingSlips(prev => {
      const updated = prev.map(s => s.id === slipId ? { ...s, ...updates } : s);
      try {
        localStorage.setItem('hasaki_booking_slips', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Called when Employee updates customer profile or notes
  const handleUpdateCustomerProfile = (updatedCustomer) => {
    setCustomerProfiles(prev => {
      const nextList = prev.map(c => c.id === updatedCustomer.id ? { ...c, ...updatedCustomer } : c);
      try {
        localStorage.setItem('hasaki_customer_profiles', JSON.stringify(nextList));
      } catch (e) {
        console.error(e);
      }
      return nextList;
    });

    // Synchronize to active Customer user if matching Trịnh Phương Thảo
    if (updatedCustomer.id === 'HSK-221005' || updatedCustomer.name === user.name) {
      handleUpdateUser({
        name: updatedCustomer.name,
        phone: updatedCustomer.phone,
        address: updatedCustomer.address
      });
    }
  };

  // Called when Employee saves a completed Standard Consultation Record
  const handleSaveConsultationRecord = (newRecord) => {
    setConsultationRecords(prev => {
      const nextList = [newRecord, ...prev];
      try {
        localStorage.setItem('hasaki_consultation_records', JSON.stringify(nextList));
      } catch (e) {
        console.error(e);
      }
      return nextList;
    });

    // Automatically update the customer profile's clinical notes and active session count
    setCustomerProfiles(prev => {
      const nextList = prev.map(c => {
        if (c.id === newRecord.customerId) {
          return {
            ...c,
            doctorNotes: newRecord.recommendations || newRecord.skinCondition,
            lastConsultedAt: newRecord.date,
            activePackage: {
              ...c.activePackage,
              currentSession: Math.min((c.activePackage?.currentSession || 3) + 1, c.activePackage?.totalSessions || 5)
            }
          };
        }
        return c;
      });
      try {
        localStorage.setItem('hasaki_customer_profiles', JSON.stringify(nextList));
      } catch (e) {
        console.error(e);
      }
      return nextList;
    });
  };

  // 1. Screen 1 (Splash) automatically transitions to Screen 2 after 1 second
  const handleSplashFinish = () => {
    setCurrentScreen('screen2');
  };

  // 2. Screen 2 (Login) navigates to Screen 3 (Customer) or Employee Interface
  const handleLoginSuccess = (loginData) => {
    if (loginData?.interfaceMode === 'employee') {
      setInterfaceMode('employee');
      if (loginData.employeeUser) {
        setEmployeeUser(loginData.employeeUser);
      }
    } else {
      setInterfaceMode('customer');
      if (loginData && loginData.name) {
        handleUpdateUser({ name: loginData.name });
      }
      setCurrentScreen('screen3');
    }
  };

  const handleToggleInterfaceMode = () => {
    setInterfaceMode(prev => prev === 'employee' ? 'customer' : 'employee');
  };

  const handleNavigateHoSoDa = (initialView = 'profile_list') => {
    setHoSoDaInitialView(initialView);
    setCurrentScreen('screen_hosoda');
  };

  // 3. Navigation between features from Homescreen
  const handleNavigateFeature = (featureId) => {
    if (featureId === 'danh-gia-da') {
      setCurrentScreen('screen_danhgiada');
    } else if (featureId === 'chu-trinh-cham-da') {
      setPreviousScreen('screen3');
      setCurrentScreen('screen_chutrinh');
    } else if (featureId === 'ho-so-da') {
      handleNavigateHoSoDa('profile_list');
    } else if (featureId === 'nhac-lich') {
      setCurrentScreen('screen_nhaclich');
    } else if (featureId === 'ho-tro') {
      setCurrentScreen('screen_hotro');
    } else if (featureId === 'lang-nghe') {
      setCurrentScreen('screen_langnghe');
    } else if (featureId === 'ai-chat') {
      setCurrentScreen('screen_aichat');
    } else if (featureId === 'tai-khoan') {
      setCurrentScreen('screen_taikhoan');
    } else if (featureId === 'dat-lich') {
      setCurrentScreen('screen_datlich');
    } else if (featureId === 'lich-su-dat-lich') {
      setCurrentScreen('screen_lichsudatlich');
    } else if (featureId === 'hoa-don') {
      setCurrentScreen('screen_hoadon');
    } else if (featureId === 'san-pham') {
      setCurrentScreen('screen_sanpham');
    } else if (featureId === 'bang-gia') {
      setCurrentScreen('screen_banggia');
    } else if (featureId === 'thong-bao') {
      setCurrentScreen('screen_thongbao');
    } else if (featureId === 'huong-dan') {
      setCurrentScreen('screen_huongdan');
    } else if (featureId === 'hoi-dap') {
      setCurrentScreen('screen_hoidap');
    } else if (featureId === 'tat-ca') {
      setCurrentScreen('screen_tatcatienich');
    } else if (featureId === 'lich-su-tu-van') {
      // Liên kết chức năng Lịch sử tư vấn với phần Lịch sử tư vấn/điều trị ở Hồ sơ da
      handleNavigateHoSoDa('treatment_history');
    }
  };

  const handleNavigateRoutine = (fromScreen = 'screen3') => {
    setPreviousScreen(fromScreen);
    setCurrentScreen('screen_chutrinh');
  };

  const handleBackFromRoutine = () => {
    if (previousScreen === 'screen_danhgiada') {
      setCurrentScreen('screen_danhgiada');
    } else {
      setCurrentScreen('screen3');
    }
  };

  const handleBackToHome = () => {
    setCurrentScreen('screen3');
  };

  const handleResetFlow = () => {
    setInterfaceMode('customer');
    setCurrentScreen('screen1');
  };

  const handleBackToLogin = () => {
    setInterfaceMode('customer');
    setCurrentScreen('screen2');
  };

  const handleJumpToScreen = (screenKey) => {
    setInterfaceMode('customer');
    setCurrentScreen(screenKey);
  };

  return (
    <MobileWebLayout
      currentScreen={currentScreen}
      onResetFlow={handleResetFlow}
      onJumpToScreen={handleJumpToScreen}
      interfaceMode={interfaceMode}
      onToggleInterfaceMode={handleToggleInterfaceMode}
    >
      {/* ------------------------------------------------------------- */}
      {/* EMPLOYEE INTERFACE MODE (Portal Bác sĩ Clinic & Nhân viên Retail) */}
      {/* ------------------------------------------------------------- */}
      {interfaceMode === 'employee' ? (
        <EmployeeLayout
          employeeUser={employeeUser}
          onSwitchEmployeeRole={(newRoleAccount) => setEmployeeUser(newRoleAccount)}
          onSwitchToCustomerInterface={() => setInterfaceMode('customer')}
          onLogout={handleBackToLogin}
          customerProfiles={customerProfiles}
          onUpdateCustomerProfile={handleUpdateCustomerProfile}
          bookingSlips={bookingSlips}
          onUpdateBookingSlip={handleUpdateBookingSlip}
          consultationRecords={consultationRecords}
          onSaveConsultationRecord={handleSaveConsultationRecord}
        />
      ) : (
        /* ------------------------------------------------------------- */
        /* CUSTOMER INTERFACE MODE (Giữ nguyên toàn bộ 100% tính năng)   */
        /* ------------------------------------------------------------- */
        <>
          {currentScreen === 'screen1' && (
            <Screen1Splash onFinish={handleSplashFinish} />
          )}

          {currentScreen === 'screen2' && (
            <Screen2Login 
              onLoginSuccess={handleLoginSuccess}
              onBackToSplash={() => setCurrentScreen('screen1')}
            />
          )}

          {currentScreen === 'screen3' && (
            <Screen3Home 
              user={user}
              onLogout={handleBackToLogin}
              onBackToSplash={handleResetFlow}
              onNavigateFeature={handleNavigateFeature}
            />
          )}

          {currentScreen === 'screen_danhgiada' && (
            <ScreenDanhGiaDa 
              user={user}
              onUpdateUser={handleUpdateUser}
              onBackToHome={handleBackToHome}
              onNavigateRoutine={() => handleNavigateRoutine('screen_danhgiada')}
              onNavigateBooking={() => setCurrentScreen('screen_datlich')}
            />
          )}

          {currentScreen === 'screen_datlich' && (
            <ScreenDatLich 
              user={user}
              onBack={handleBackToHome}
              onBackToHome={handleBackToHome}
              onNavigateHoSoDa={() => handleNavigateHoSoDa('profile_list')}
              onBookingConfirmed={handleBookingSuccess}
              onNavigateHistory={() => setCurrentScreen('screen_lichsudatlich')}
              onNavigateInvoice={() => setCurrentScreen('screen_hoadon')}
            />
          )}

          {currentScreen === 'screen_lichsudatlich' && (
            <ScreenLichSuDatLich 
              user={user}
              slips={bookingSlips}
              onBackToHome={handleBackToHome}
              onNavigateInvoice={() => setCurrentScreen('screen_hoadon')}
            />
          )}

          {currentScreen === 'screen_hoadon' && (
            <ScreenHoaDon 
              user={user}
              invoices={invoices}
              onBackToHome={handleBackToHome}
            />
          )}

          {currentScreen === 'screen_sanpham' && (
            <ScreenSanPhamPhuHop 
              user={user}
              onBackToHome={handleBackToHome}
            />
          )}

          {currentScreen === 'screen_banggia' && (
            <ScreenBangGiaDichVu 
              user={user}
              onBackToHome={handleBackToHome}
              onNavigateBooking={() => setCurrentScreen('screen_datlich')}
            />
          )}

          {currentScreen === 'screen_huongdan' && (
            <ScreenHuongDanSuDung 
              onBackToHome={handleBackToHome}
            />
          )}

          {currentScreen === 'screen_hoidap' && (
            <ScreenHoiDapChuyenGia 
              user={user}
              onBackToHome={handleBackToHome}
              onBookingConfirmed={handleBookingSuccess}
              onNavigateHistory={() => setCurrentScreen('screen_lichsudatlich')}
            />
          )}

          {currentScreen === 'screen_thongbao' && (
            <ScreenThongBao 
              user={user}
              onBackToHome={handleBackToHome}
              onNavigateHome={handleBackToHome}
              onNavigateHoSoDa={() => handleNavigateHoSoDa('profile_list')}
              onNavigateDatLich={() => setCurrentScreen('screen_datlich')}
              onNavigateTaiKhoan={() => setCurrentScreen('screen_taikhoan')}
              onNavigateAIChat={() => setCurrentScreen('screen_aichat')}
              onNavigateRoutine={() => setCurrentScreen('screen_chutrinh')}
              onNavigateHistory={() => setCurrentScreen('screen_lichsudatlich')}
              onNavigateProducts={() => setCurrentScreen('screen_sanpham')}
            />
          )}

          {currentScreen === 'screen_chutrinh' && (
            <ScreenChuTrinhChamDa 
              onBack={handleBackFromRoutine}
              onBackToHome={handleBackToHome}
            />
          )}

          {currentScreen === 'screen_hosoda' && (
            <ScreenHoSoDa 
              user={user}
              bookingSlips={bookingSlips}
              consultationRecords={consultationRecords}
              onUpdateUser={handleUpdateUser}
              onBackToHome={handleBackToHome}
              onNavigateBooking={() => setCurrentScreen('screen_datlich')}
              onNavigateHistory={() => setCurrentScreen('screen_lichsudatlich')}
              onNavigateInvoice={() => setCurrentScreen('screen_hoadon')}
              initialView={hoSoDaInitialView}
            />
          )}

          {currentScreen === 'screen_nhaclich' && (
            <ScreenNhacLich 
              onBackToHome={handleBackToHome}
            />
          )}

          {currentScreen === 'screen_hotro' && (
            <ScreenHoTro 
              onBackToHome={handleBackToHome}
            />
          )}

          {currentScreen === 'screen_langnghe' && (
            <ScreenLangNghe 
              onBackToHome={handleBackToHome}
            />
          )}

          {currentScreen === 'screen_aichat' && (
            <ScreenAIChat 
              user={user}
              onBackToHome={handleBackToHome}
              onNavigateBooking={() => setCurrentScreen('screen_datlich')}
              onNavigateProducts={() => setCurrentScreen('screen_sanpham')}
              onNavigateHoSoDa={() => handleNavigateHoSoDa('profile_list')}
              onNavigateBangGia={() => setCurrentScreen('screen_banggia')}
            />
          )}

          {currentScreen === 'screen_tatcatienich' && (
            <ScreenTatCaTienIch 
              onBack={handleBackToHome}
              onBackToHome={handleBackToHome}
              onNavigateFeature={handleNavigateFeature}
            />
          )}

          {currentScreen === 'screen_taikhoan' && (
            <ScreenTaiKhoan 
              user={user}
              onUpdateUser={handleUpdateUser}
              onLogout={handleBackToLogin}
              onNavigateHome={handleBackToHome}
              onNavigateHoSoDa={() => handleNavigateHoSoDa('profile_list')}
              onNavigateAIChat={() => setCurrentScreen('screen_aichat')}
              onNavigateDatLich={() => setCurrentScreen('screen_datlich')}
              onNavigateThongBao={() => setCurrentScreen('screen_thongbao')}
            />
          )}
        </>
      )}
    </MobileWebLayout>
  );
}
