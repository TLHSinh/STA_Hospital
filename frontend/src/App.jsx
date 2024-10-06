import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet để render các route con
import Navbar from './Components/Navbar/Navbar'; // Import Navbar
import Footer from './Components/Footer/Footer'; // Import Footer


const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Outlet /> {/* Đây là nơi các trang con sẽ được render */}
      <Footer /> {/* Footer sẽ xuất hiện trên tất cả các trang */}
    </div>
  );
};

export default App;
