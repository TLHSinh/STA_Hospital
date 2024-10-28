import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Components/Doctor/NavbarBS/NavbarBS';

const DoctorLayout = () => {
    const location = useLocation(); // Lấy đường dẫn hiện tại
    const hideNavAndFooter = location.pathname === '/doctor/login'|| location.pathname === '/doctor/register'; // Kiểm tra nếu là trang login-register
    return (
      <div >
        {!hideNavAndFooter && <Navbar/>} {/* Không hiển thị Navbar nếu ở trang login-register */}
        <Outlet /> {/* Đây là nơi các trang con sẽ được render */}
      </div>
    );
}

export default DoctorLayout