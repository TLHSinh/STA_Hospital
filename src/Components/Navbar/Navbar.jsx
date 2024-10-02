import React, { useRef,useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';
import { Link } from "react-router-dom";
import PopupLichHen from '../Dialog/PopupLichHen';

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
            <Link to="/" className="logo">
                <img src="Home.png" alt="Logo" />
            </Link>
            <nav className="navbar" ref={navRef}>
                <Link to='/vechungtoi'>Về chúng tôi</Link>
                <Link to='/chuyenkhoa'>Chuyên khoa</Link>
                <Link to='/goikham'>Gói khám</Link>
                <Link to='/bacsi'>Bác sĩ</Link>
                <Link to='/lienhe'>Liên hệ</Link>
                {/* <Link to='/datlichhen'>Đặt lịch hẹn</Link> */}
                <a href="#!" onClick={handleOpenPopup}>Đặt lịch hẹn</a>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <PopupLichHen open={openPopup} handleClose={handleClosePopup} />
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
