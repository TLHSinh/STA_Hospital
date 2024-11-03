
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fab, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext.jsx';
import { FaPenToSquare, FaPlus } from "react-icons/fa6";


// Giao diện hiện thị danh sách lịch hẹn cho bác sĩ với nút kê đơn cho từng lịch hẹn
const DanhSachLichHenBacSi = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const { user } = useContext(AuthContext); // Lấy thông tin người dùng từ context
  const doctorId = user._id; // Lấy ID của bác sĩ từ thông tin người dùng

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/bookings/getdocAppoint/${doctorId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.success && Array.isArray(result.appointments)) {
        setAppointments(result.appointments);
      } else {
        throw new Error(result.message || 'Lỗi lấy danh sách lịch hẹn');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handlePrescription = (appointmentId) => {
    navigate(`/doctor/KeBenhAn`); // Điều hướng đến trang kê bệnh án với ID lịch hẹn
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div style={{ position: 'relative' }}>
      <div className='title-ad'>
        <h1>DANH SÁCH LỊCH HẸN CỦA BÁC SĨ</h1>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Tên bệnh nhân</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Ngày hẹn</th>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.benhNhan.ten}</td>
                <td>{appointment.benhNhan.email}</td>
                <td>{appointment.benhNhan.soDienThoai}</td>
                <td>{new Date(appointment.ngayHen).toLocaleDateString()}</td>
                <td>{appointment.thoiGianBatDau}</td>
                <td>{appointment.thoiGianKetThuc}</td>
                <td>
                  <button className="icon-function" onClick={() => handlePrescription(appointment._id)}>
                    <FaPenToSquare color="#66B5A3" /> Kê đơn
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Không có lịch hẹn nào</td>
            </tr>
          )}
        </tbody>
      </table>

      <Fab
        onClick={() => navigate('/doctor/them-lich-hen')}
        sx={{
          backgroundColor: '#66B5A3',
          '&:hover': { backgroundColor: '#97c9bc' },
          position: 'fixed',
          bottom: 50,
          right: 50,
          animation: 'animate 2s linear infinite',
        }}
        aria-label="add"
      >
        <FaPlus color='white' size={18} />
      </Fab>
    </div>
  );
};

export default DanhSachLichHenBacSi;
