import React, { useRef,useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import './NavbarBS.css';
import { Link } from "react-router-dom";
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
    <Link to="/doctor/home" className="logo">
        <img src="/Images/Home.png" alt="Logo" />
    </Link>

    <nav className="navbar" ref={navRef}>
        <Link to="/doctor/danhsachlichhenBS">Danh sách lịch hẹn</Link>
        <Link to="/doctor/kedonthuoc">Kê đơn thuốc</Link>
        <Link to="/doctor/login" className="user">
            <FaRegCircleUser color="#0b8fac" size="2rem" />
        </Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
        </button>
    </nav>

    <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
    </button>
</header>
    );
}

export default Navbar;