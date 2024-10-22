import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../Components/Admin/Sidebar/Sidebar';
import '../AdminLayout/AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const hideNavAndFooter = location.pathname === '/admin/login'|| location.pathname === '/admin/register'; // Kiểm tra nếu là trang login-register
  return (
    // <div style={{padding:'20px', display:'flex', gap:'20px'}}>
    //   {!hideNavAndFooter && <Sidebar />} {/* Không hiển thị Navbar nếu ở trang login-register */}
    //   <div className='layout-content'>
    //      <Outlet />
    //   </div> {/* Đây là nơi các trang con sẽ được render */}
    //   {/* {!hideNavAndFooter && <Footer />} Không hiển thị Footer nếu ở trang login-register */}
    // </div>


    <div className="container-ad">
  {!hideNavAndFooter && <Sidebar />} {/* Không hiển thị Navbar nếu ở trang login-register */}
  <div className='layout-content-ad'>
    <Outlet />
  </div>
  {/* {!hideNavAndFooter && <Footer />} Không hiển thị Footer nếu ở trang login-register */}
</div>

  );
};

export default AdminLayout