import React, { useRef, useState, useContext } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import PopupLichHen from '../Dialog/PopupLichHen';
import { FaRegCircleUser } from "react-icons/fa6";
import { AuthContext } from '../../../context/AuthContext.jsx';

function Navbar() {
    const navRef = useRef();
    const navigate = useNavigate();
    const [openPopup, setOpenPopup] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, dispatch } = useContext(AuthContext);

    const handleOpenPopup = () => {
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
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

                {/* Kiểm tra nếu người dùng đã đăng nhập */}
                {user ? (
                    <div className="user-section" onClick={toggleUserMenu}>
                        {user.hinhAnh ? (
                            <img src={user.hinhAnh} alt="User Avatar" className="user-pic" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                        ) : (
                            <FaRegCircleUser color="#0b8fac" size="2rem" />
                        )}
                        {isUserMenuOpen && (
                            <div className="user-dropdown-menu">
                                <Link to="/customer/profile">Hồ sơ</Link>
                                <Link to="/customer/appointment">Lịch hẹn của tôi</Link>
                                <button onClick={handleLogout}>Đăng xuất</button>
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
