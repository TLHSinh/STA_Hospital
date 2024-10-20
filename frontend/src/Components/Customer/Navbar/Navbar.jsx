import React, { useRef,useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';
import { Link } from "react-router-dom";
import PopupLichHen from '../Dialog/PopupLichHen';
import { FaRegCircleUser } from "react-icons/fa6";



function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        console.log("Toggle Navbar");
        navRef.current.classList.toggle("responsive_nav");
    };
    const [openPopup, setOpenPopup] = useState(false);

    // Hàm mở popup
    const handleOpenPopup = () => {
      setOpenPopup(true);
    };
  
    // Hàm đóng popup
    const handleClosePopup = () => {
      setOpenPopup(false);
    };

    return (
        
<header className="header">
    <Link to="/customer/home" className="logo">
        <img src="/Images/Home.png" alt="Logo" />
    </Link>

    <nav className="navbar" ref={navRef}>
        <Link to="/customer/vechungtoi">Về chúng tôi</Link>
        <Link to="/customer/chuyenkhoa">Chuyên khoa</Link>
        <Link to="/customer/goikham">Gói khám</Link>
        <Link to="/customer/bacsi">Bác sĩ</Link>
        <Link to="/customer/lienhe">Liên hệ</Link>

        {/* Đặt lịch hẹn mở qua popup */}
        <a href="#!" onClick={handleOpenPopup}>Đặt lịch hẹn</a>

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
        </button>
    </nav>

    {/* Popup đặt lịch hẹn */}
    <PopupLichHen open={openPopup} handleClose={handleClosePopup} />

    <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
    </button>

    {/* Đường dẫn đến trang đăng nhập */}
    <Link to="/customer/login" className="user">
        <FaRegCircleUser color="#0b8fac" size="2rem" />
    </Link>
</header>
    );
}

export default Navbar;