import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fab, TextField, Button, CircularProgress } from '@mui/material';
import { AuthContext } from '../../context/AuthContext.jsx';
import { FaPenToSquare, FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';
import { BASE_URL } from '../../config';

const DanhSachLichHenBacSi = () => {
  // Sử dụng `useNavigate` để điều hướng trang
  const navigate = useNavigate();

  // Trạng thái lưu trữ danh sách lịch hẹn, trạng thái tải và lỗi
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Tìm kiếm bệnh nhân theo email hoặc số điện thoại

  // Lấy `token` và thông tin người dùng từ `AuthContext`
  const { token, user } = useContext(AuthContext);
  const doctorId = user._id; // ID của bác sĩ từ thông tin người dùng

  // Hàm lấy danh sách lịch hẹn của bác sĩ từ API
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true); // Bắt đầu tải dữ liệu
      try {
        // Gọi API để lấy danh sách lịch hẹn của bác sĩ dựa trên doctorId
        const response = await fetch(`${BASE_URL}/api/v1/bookings/getdocAppoint/${doctorId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Xác thực bằng token
          },
        });
        const result = await response.json();

        // Kiểm tra kết quả trả về từ API
        if (!result.success || !Array.isArray(result.appointments)) {
          // Nếu không thành công hoặc không phải là mảng, báo lỗi
          throw new Error(result.message || 'Lỗi lấy danh sách lịch hẹn');
        }
        // Cập nhật danh sách lịch hẹn nếu thành công
        setAppointments(result.appointments);
        setFilteredAppointments(result.appointments); // Cập nhật cả danh sách lọc
      } catch (err) {
        setError(err.message); // Lưu thông báo lỗi
      } finally {
        setLoading(false); // Kết thúc tải dữ liệu
      }
    };
    fetchAppointments(); // Gọi hàm khi component mount
  }, [doctorId, token]); // Chỉ gọi lại nếu doctorId hoặc token thay đổi

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = appointments.filter((appointment) =>
      appointment.benhNhan.ten.toLowerCase().includes(query) ||
      appointment.benhNhan.email.toLowerCase().includes(query) ||
      appointment.benhNhan.soDienThoai.includes(query)
    );
    setFilteredAppointments(filtered);
  };

  // Xử lý sự kiện khi bác sĩ bấm vào nút kê đơn
  const handlePrescription = (appointmentId) => {
    navigate(`/doctor/kebenhanTH1/${appointmentId}`); // Điều hướng đến trang kê đơn với ID lịch hẹn
  };

  // Kiểm tra trạng thái tải và lỗi trước khi hiển thị dữ liệu
  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div style={{ position: 'relative' }}>
      {/* Tiêu đề danh sách lịch hẹn */}
      <div className="title-ad">
        <h1>DANH SÁCH LỊCH HẸN CỦA BÁC SĨ</h1>
      </div>

      

      {/* Bảng hiển thị lịch hẹn */}
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
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(({ _id, benhNhan, ngayHen, thoiGianBatDau, thoiGianKetThuc }) => (
              <tr key={_id}>
                <td>{benhNhan.ten}</td>
                <td>{benhNhan.email}</td>
                <td>{benhNhan.soDienThoai}</td>
                <td>{new Date(ngayHen).toLocaleDateString()}</td> {/* Hiển thị ngày hẹn dưới dạng chuỗi */}
                <td>{thoiGianBatDau}</td>
                <td>{thoiGianKetThuc}</td>
                <td>
                  {/* Nút kê đơn, kích hoạt handlePrescription với ID lịch hẹn */}
                  <button className="icon-function" onClick={() => handlePrescription(_id)}>
                    <FaPenToSquare color="#66B5A3" /> Kê đơn
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Không có lịch hẹn nào</td> {/* Hiển thị khi không có lịch hẹn */}
            </tr>
          )}
        </tbody>
      </table>

      {/* Nút thêm bệnh án cho bệnh nhân không có lịch hẹn */}
      <Fab
        onClick={() => navigate('/doctor/kebenhanTH2')} // Điều hướng đến trang thêm lịch hẹn
        sx={{
          backgroundColor: '#66B5A3',
          '&:hover': { backgroundColor: '#97c9bc' },
          position: 'fixed',
          bottom: 50,
          right: 50,
          animation: 'animate 2s linear infinite', // Hiệu ứng chuyển động nút
        }}
        aria-label="add"
      >
        <FaPlus color="white" size={18} />
      </Fab>
    </div>
  );
};

export default DanhSachLichHenBacSi;
