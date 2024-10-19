// layouts/CustomerLayout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Components/Customer/Navbar/Navbar';
import Footer from '../Components/Customer/Footer/Footer';
 // (Tùy chọn) Thêm CSS cho layout

const CustomerLayout = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const hideNavAndFooter = location.pathname === '/customer/login'|| location.pathname === '/customer/register'; // Kiểm tra nếu là trang login-register
  return (
    <div >
      {!hideNavAndFooter && <Navbar />} {/* Không hiển thị Navbar nếu ở trang login-register */}
      <Outlet /> {/* Đây là nơi các trang con sẽ được render */}
      {!hideNavAndFooter && <Footer />} {/* Không hiển thị Footer nếu ở trang login-register */}
    </div>
  );
};

export default CustomerLayout;
