import React from 'react';
 import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'; // Import useLocation
import AdminRouter from './Routers/AdminRouter';





const App = () => {
  // const location = useLocation(); // Lấy đường dẫn hiện tại
  // const hideNavAndFooter = location.pathname === '/login'|| location.pathname === '/register'; // Kiểm tra nếu là trang login-register

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          {/* đây là hướng đi của khách hàng */}
            {/* <Route path="/customer/*" element={<CustomerRoutes />} />
            <Route path="/" element={<Navigate to="/customer/home" />} /> Điều hướng mặc định */}

          {/* đây là hướng đi của admin */}
          <Route path="/admin/*" element={<AdminRouter/>} />
          <Route path="/" element={<Navigate to="/admin/dashboard" />} /> Điều hướng mặc định

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
