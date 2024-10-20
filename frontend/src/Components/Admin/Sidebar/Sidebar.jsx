import React from 'react'
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaCapsules, FaHospitalUser, FaUserDoctor } from "react-icons/fa6";
const Sidebar = () => {
  return (
    <div className='menu'>
      <div className='logo'>

      </div>

      <div className='menu-list'>
        <Link to="/admin/dashboard" className = 'item' >
            <MdOutlineSpaceDashboard />
            Dashboard
        </Link>
        <Link to="/admin/khachhang" className = 'item' >
            <FaHospitalUser />
            Dashboard
        </Link>
        <Link to="/admin/bacsi" className = 'item' >
            <MdOutlineSpaceDashboard />
            Dashboard
        </Link>
        <Link to="/admin/lichhen" className = 'item' >
            <MdOutlineSpaceDashboard />
            Dashboard
        </Link>
        <Link to="/admin/thuoc" className = 'item' >
            <FaCapsules />
            Dashboard
        </Link>
      </div>
    </div>
  )
}

export default Sidebar