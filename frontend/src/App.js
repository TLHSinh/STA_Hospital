import React from 'react';
 import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'; // Import useLocation
import AdminRouter from './Routers/AdminRouter';
import CustomerRoutes from './Routers/CustomerRouter';



const App = () => {
  // const location = useLocation(); // Lấy đường dẫn hiện tại
  // const hideNavAndFooter = location.pathname === '/login'|| location.pathname === '/register'; // Kiểm tra nếu là trang login-register

  return (
    <div >
      <BrowserRouter>
        <Routes>
          {/* đây là hướng đi của khách hàng */}
            <Route path="/customer/*" element={<CustomerRoutes />} />
            <Route path="/" element={<Navigate to="/customer/home" />} /> 


          {/* đây là hướng đi của admin */}
          <Route path="/admin/*" element={<AdminRouter/>} />
          <Route path="/" element={<Navigate to="/admin/dashboard" />} /> 


          {/* đây là hướng đi của doctor */}
          <Route path="/doctor/*" element={<AdminRouter/>} />
          <Route path="/" element={<Navigate to="/doctor/dashboard" />} /> 


        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
