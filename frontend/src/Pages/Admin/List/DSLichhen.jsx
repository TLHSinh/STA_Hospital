import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './DanhSach.css';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext.jsx'; // Import AuthContext để lấy token


const Appointment = () => {
  const navigate = useNavigate();

  const [appointments, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtered, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  // Lấy token từ AuthContext
  const { token } = useContext(AuthContext);
  const fetchAppointment = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });

      console.log("Token:", token);
      const result = await res.json(); // Chuyển đổi JSON từ API
      console.log(result); // Kiểm tra dữ liệu trả về

      if (result.success && Array.isArray(result.data)) {
        setAppointment(result.data);
        setFilteredDoctors(result.data);
      } else {
        throw new Error(result.message || 'Lỗi lấy danh sách lịch hẹn');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = appointments.filter((appointment) =>
      appointment.bacSi.ten.toLowerCase().includes(query) ||
      appointment.benhNhan.ten.toLowerCase().includes(query)
    );

    setFilteredDoctors(filtered);
    setCurrentPage(1);
  };



  // Cập nhật trạng thái cuộc hẹn
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/bookings/booking/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ trangThai: newStatus }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Cập nhật trạng thái thành công');
        setAppointment(appointments.map(appointment =>
          appointment._id === id ? { ...appointment, trangThai: newStatus } : appointment
        ));
      } else {
        toast.error(result.message || 'Lỗi cập nhật trạng thái');
      }
    } catch (error) {
      toast.error('Lỗi cập nhật trạng thái');
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);


  // Tính toán danh sách bác sĩ cho trang hiện tại
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filtered.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div>
      <div className='title-ad'>
        <h1>DANH SÁCH LỊCH HẸN</h1>
      </div>

      <TextField
        label="Tìm kiếm khách hàng hoặc bác sĩ"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />

      <table className="user-table">
        <thead>
          <tr>
            <th>Bệnh nhân</th>
            <th>Bác sĩ</th>
            <th>Ngày hẹn</th>
            <th>Thời gian bắt đầu</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {currentDoctors.length > 0 ? (
            currentDoctors.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.benhNhan.ten}</td>
                <td>{appointment.bacSi.ten}</td>
                <td>{appointment.ngayHen}</td>
                <td>{appointment.thoiGianBatDau}</td>
                <td>
                  <select
                    value={appointment.trangThai}
                    onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                    className={
                      appointment.trangThai === 'XacNhan'
                        ? 'status-confirmed'
                        : appointment.trangThai === 'Huy'
                          ? 'status-cancelled'
                          : 'status-pending'
                    }
                  >
                    <option value="XacNhan">Xác Nhận</option>
                    <option value="ChoDuyet">Chờ Duyệt</option>
                    <option value="Huy">Hủy</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có lịch hẹn nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filtered.length / doctorsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Appointment

