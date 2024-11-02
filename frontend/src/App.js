import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminRouter from './Routers/AdminRouter';
import CustomerRoutes from './Routers/CustomerRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { AuthContextProvider } from './context/AuthContext';  // Import AuthContextProvider
import Login from './Pages/Customer/Login';
import DoctorRouter from './Routers/DoctorRouter';
import SignUp from './Pages/Customer/SignUp';

const App = () => {
  return (
    <AuthContextProvider> {/* Bao bọc ứng dụng trong AuthContextProvider */}
      <div>
        {/* Đặt ToastContainer ở đây */}
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
        />

        <BrowserRouter>
          <Routes>
            {/* đây là hướng đi của khách hàng */}
            <Route path="/customer/*" element={<CustomerRoutes />} />
            <Route path="/" element={<Navigate to="/customer/home" />} /> 

            {/* đây là hướng đi của admin */}
            <Route path="/admin/*" element={<AdminRouter />} />
            <Route path="/" element={<Navigate to="/admin/dashboard" />} /> 

            {/* đây là hướng đi của doctor */}
            <Route path="/doctor/*" element={<DoctorRouter />} />
            <Route path="/" element={<Navigate to="/doctor/dashboard" />} /> 

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
};

export default App;
