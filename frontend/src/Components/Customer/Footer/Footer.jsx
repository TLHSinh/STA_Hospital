import React, { useState } from 'react';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PopupLichHen from '../Dialog/PopupLichHen'; // Import PopupLichHen

const Footer = () => {
  const [openPopup, setOpenPopup] = useState(false); // State để kiểm soát popup

  const handleOpenPopup = () => {
    setOpenPopup(true); // Mở popup
  };

  const handleClosePopup = () => {
    setOpenPopup(false); // Đóng popup
  };

  // Hàm điều hướng trang sử dụng window.location.href
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="main-footer">
      <div className="container-footer">
        <div className='row'>
          {/* Column1: Logo */}
          <div className='col'>
            <img src="/logo_sta512.png" alt="Logo" className="footer-logo" />
          </div>
          {/* Column2: Thông tin bệnh viện */}
          <div className='col'>
            <p>Bệnh viện Quốc Tế STA</p>
            <p>1900 6765</p>
            <hr style={{ border: '1px solid #fff', margin: '10px 0' }} />
            <p>Phòng khám Quốc Tế STA Estella</p>
            <p>1900 6765</p>
          </div>
          {/* Column3 */}
          <div className="col">
            <ul className="list-unstyled">
              <li><a href="#!" onClick={() => navigateTo('/customer/vechungtoi')}>Về chúng tôi</a></li>
              <li><a href="#!" onClick={() => navigateTo('/customer/chuyenkhoa')}>Chuyên khoa</a></li>
              <li><a href="#!" onClick={() => navigateTo('/customer/bacsi')}>Bác sĩ</a></li>
            </ul>
          </div>
          {/* Column4 */}
          <div className="col">
            <ul className="list-unstyled">
              <li><a href="#!" onClick={() => navigateTo('/customer/goikham')}>Gói khám</a></li>
              <li><a href="#!" onClick={() => navigateTo('/customer/lienhe')}>Liên hệ</a></li>
              <li><a href="#!" onClick={handleOpenPopup}>Đặt lịch hẹn</a></li> {/* Sử dụng hàm mở popup */}
            </ul>
          </div>
          {/* Column5 */}
          <div className="col text-center">
            <p>Copyright 2024 © STA International</p>
          </div>
        </div>
      </div>
      <PopupLichHen open={openPopup} handleClose={handleClosePopup} /> {/* Hiển thị popup */}
    </div>
  );
}

export default Footer;
