import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaCapsules, FaHospitalUser, FaUserDoctor, FaArrowRightFromBracket,  } from "react-icons/fa6";
import { AuthContext } from '../../../context/AuthContext.jsx';

const Sidebar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);



    const handleLogout = () => {
        setIsConfirmDialogOpen(true);
    };

    const confirmLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
        setIsConfirmDialogOpen(false);
    };

    const cancelLogout = () => {
        setIsConfirmDialogOpen(false);
    };

    return (
        <div className='menu-ad'>
            <div className='logo-ad'>
                <span 
                    className="logo-text" 
                    style={{ color: '#66B5A3', fontWeight: 'bold', fontSize: '25px' }}
                >
                    STA HOSPITAL.
                </span>
            </div>
            <img src={user.hinhAnh} alt="User Avatar" className="user-pic" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />

            <div className='menu-list-ad'>
                <Link to="/admin/dashboard" className='item-ad'>
                    <MdOutlineSpaceDashboard className='icon'/>
                    Dashboard
                </Link>
                <Link to="/admin/danhsachkhachhang" className='item-ad'>
                    <FaHospitalUser className='icon'/>
                    Khách Hàng
                </Link>
                <Link to="/admin/danhsachbacsi" className='item-ad'>
                    <FaUserDoctor className='icon'/>
                    Bác Sĩ
                </Link>
                <Link to="/admin/danhsachlichhen" className='item-ad'>
                    <MdOutlineSpaceDashboard className='icon'/>
                    Lịch Hẹn
                </Link>
                <Link to="/admin/danhsachthuocvattu" className='item-ad'>
                    <FaCapsules className='icon'/>
                    Thuốc
                </Link>

                <div onClick={handleLogout} className = 'item-ad' >
                    <FaArrowRightFromBracket  className='icon'/>
                      Đăng xuất
              </div> 

             
            </div>

            {/* Hộp thoại xác nhận */}
            {isConfirmDialogOpen && (
                <div className="confirm-dialog-overlay">
                    <div className="confirm-dialog">
                        <p>Bạn có chắc chắn muốn đăng xuất?</p>
                        <button onClick={confirmLogout}>Đồng ý</button>
                        <button onClick={cancelLogout}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
