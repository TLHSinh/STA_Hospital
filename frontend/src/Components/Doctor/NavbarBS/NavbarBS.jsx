import React from 'react';
//import { FaBars, FaTimes } from "react-icons/fa";
import './NavbarBS.css';
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";



function Navbar() {
    return (
        <header className="header">
            <Link to="/doctor/home" className="logo" aria-label="Logo">
                <span className="logo-text">STA HOSPITAL.</span>
            </Link>

            <nav className="navbar">
                <Link to="/doctor/danhsachlichhenBS">Danh sách lịch hẹn</Link>
                <Link to="/doctor/kedonthuoc">Kê đơn thuốc</Link>
                
                <Link to="/doctor/login" className="user">
                    <FaRegCircleUser color="#0b8fac" size="2rem" />
                </Link>
            
            </nav>   
        </header>
    );
}

export default Navbar;