import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from './Components/Customer/Navbar/Navbar'; // Import Navbar
import Footer from './Components/Customer/Footer/Footer'; // Import Footer


const App = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const hideNavAndFooter = location.pathname === '/login'|| location.pathname === '/register'; // Kiểm tra nếu là trang login-register

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideNavAndFooter && <Navbar />} {/* Không hiển thị Navbar nếu ở trang login-register */}
      <Outlet /> {/* Đây là nơi các trang con sẽ được render */}
      {!hideNavAndFooter && <Footer />} {/* Không hiển thị Footer nếu ở trang login-register */}
    </div>
  );
};

export default App;
