import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Components/Admin/Sidebar/Sidebar';


const AdminLayout = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const hideNavAndFooter = location.pathname === '/admin/login'|| location.pathname === '/admin/register'; // Kiểm tra nếu là trang login-register
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideNavAndFooter && <Sidebar />} {/* Không hiển thị Navbar nếu ở trang login-register */}
      <Outlet /> {/* Đây là nơi các trang con sẽ được render */}
      {/* {!hideNavAndFooter && <Footer />} Không hiển thị Footer nếu ở trang login-register */}
    </div>
  );
};

export default AdminLayout