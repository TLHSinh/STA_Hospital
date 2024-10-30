// import React, { useRef, useState } from 'react';
// import { FaBars, FaTimes } from "react-icons/fa";
// import './Navbar.css';
// import { Link } from "react-router-dom";
// import PopupLichHen from '../Dialog/PopupLichHen';
// import { FaRegCircleUser } from "react-icons/fa6";

// function Navbar() {
//     const navRef = useRef();
//     const [openPopup, setOpenPopup] = useState(false);
//     const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

//     // Hàm mở popup lịch hẹn
//     const handleOpenPopup = () => {
//         setOpenPopup(true);
//     };

//     // Hàm đóng popup lịch hẹn
//     const handleClosePopup = () => {
//         setOpenPopup(false);
//     };

//     // Hàm hiển thị hoặc ẩn Navbar
//     const showNavbar = () => {
//         navRef.current.classList.toggle("responsive_nav");
//     };

//     // Hàm bật/tắt menu người dùng
//     const toggleUserMenu = () => {
//         setIsUserMenuOpen(!isUserMenuOpen);
//     };

//     return (
//         <header className="header">
//             <Link to="/customer/home" className="logo">
//                 <img src="/Images/Home.png" alt="Logo" />
//             </Link>

//             <nav className="navbar" ref={navRef}>
//                 <Link to="/customer/vechungtoi">Về chúng tôi</Link>
//                 <Link to="/customer/chuyenkhoa">Chuyên khoa</Link>
//                 <Link to="/customer/goikham">Gói khám</Link>
//                 <Link to="/customer/bacsi">Bác sĩ</Link>
//                 <Link to="/customer/lienhe">Liên hệ</Link>
//                 <a href="#!" onClick={handleOpenPopup}>Đặt lịch hẹn</a>
                
//                {/*  <div className="user-icon-container">
//                     <FaRegCircleUser color="#0b8fac" size="2rem" onClick={toggleUserMenu} style={{ cursor: 'pointer' }} />
//                     {isUserMenuOpen && (
//                         <div className="user-dropdown-menu">
//                             <Link to="/customer/profile">Hồ sơ</Link>
//                             <Link to="/customer/appointment">Lịch hẹn của tôi</Link>
//                             <Link to="/customer/logout">Đăng xuất</Link>
//                         </div>
//                     )}
//                 </div> */}

// <Link to="/login" className="user">
//                 <FaRegCircleUser color="#0b8fac" size="2rem" />
//             </Link>


//                 <button className="nav-btn nav-close-btn" onClick={showNavbar}>
//                     <FaTimes />
//                 </button>
//             </nav>

//             <PopupLichHen open={openPopup} handleClose={handleClosePopup} />

//             <button className="nav-btn" onClick={showNavbar}>
//                 <FaBars />
//             </button>
//         </header>
//     );
// }

// export default Navbar;












import React, { useRef, useState, useContext } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';
import { Link } from "react-router-dom";
import PopupLichHen from '../Dialog/PopupLichHen';
import { FaRegCircleUser } from "react-icons/fa6";
import { AuthContext } from '../../../context/AuthContext.jsx';// Import AuthContext

function Navbar() {
    const navRef = useRef();
    const [openPopup, setOpenPopup] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Lấy thông tin người dùng từ AuthContext
    const { user } = useContext(AuthContext);

    // Hàm mở popup lịch hẹn
    const handleOpenPopup = () => {
        setOpenPopup(true);
    };

    // Hàm đóng popup lịch hẹn
    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    // Hàm hiển thị hoặc ẩn Navbar
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    // Hàm bật/tắt menu người dùng
    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
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
                <a href="#!" onClick={handleOpenPopup}>Đặt lịch hẹn</a>
                
                {/* Chỉ hiển thị biểu tượng người dùng hoặc ảnh nếu người dùng đã đăng nhập */}
                {user ? (
                    <div className="user-icon-container" onClick={toggleUserMenu}>
                        {user.hinhAnh ? (  // Kiểm tra xem có avatar hay không
                            <img src={user.hinhAnh} alt="User Avatar" className="user-avatar" />
                        ) : (
                            <FaRegCircleUser color="#0b8fac" size="2rem" />
                        )}
                        {isUserMenuOpen && (
                            <div className="user-dropdown-menu">
                                <Link to="/customer/profile">Hồ sơ</Link>
                                <Link to="/customer/appointment">Lịch hẹn của tôi</Link>
                                <Link to="/customer/login">Đăng xuất</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="user">
                        <FaRegCircleUser color="#0b8fac" size="2rem" />
                    </Link>
                )}

                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>

            <PopupLichHen open={openPopup} handleClose={handleClosePopup} />

            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
