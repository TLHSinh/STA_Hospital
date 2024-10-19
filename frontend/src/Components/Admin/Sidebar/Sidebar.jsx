import React from 'react'
import './Sidebar.css';
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaCapsules, FaHospitalUser, FaUserDoctor } from "react-icons/fa6";
const Sidebar = () => {
  return (
    <div className='menu'>
      <div className='logo'>
          <img src="/Images/Home.png" alt="Logo" />
      </div>

      <div className='menu-list'>
        <Link to="/admin/dashboard" className = 'item' >
            <MdOutlineSpaceDashboard   className='icon'/>
            Dashboard
        </Link>
        <Link to="/admin/danhsachkhachhang" className = 'item' >
            <FaHospitalUser className='icon' />
            Khách Hàng
        </Link>
        <Link to="/admin/danhsachbacsi" className = 'item' >
            <FaUserDoctor  className='icon'/>
            Bác Sĩ
        </Link>
        <Link to="/admin/danhsachlichhen" className = 'item' >
            <MdOutlineSpaceDashboard  className='icon'/>
            Lịch Hẹn
        </Link>
        <Link to="/admin/danhsachthuoc" className = 'item' >
            <FaCapsules  className='icon'/>
            Thuốc
        </Link>
      </div>
    </div>
  )
}

export default Sidebar