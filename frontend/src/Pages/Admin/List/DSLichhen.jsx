import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './DanhSach.css';
import { Fab, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext.jsx'; // Import AuthContext để lấy token
import { FaPenToSquare, FaTrash, FaPlus, FaRegEye } from "react-icons/fa6";

const Appointment = () => {
  const navigate = useNavigate();

  const [appointments, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtered, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  // Lấy token từ AuthContext
  const { token } = useContext(AuthContext);
  const fetchAppointment = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/booking`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });

      console.log("Token:", token);
  
      const result = await res.json(); // Chuyển đổi JSON từ API
      console.log(result); // Kiểm tra dữ liệu trả về
  
      // Kiểm tra nếu API trả về thành công và có dữ liệu
      if (result.success && Array.isArray(result.data)) {
        setAppointment(result.data); // Gán mảng người dùng vào state
      } else {
        throw new Error(result.message || 'Lỗi lấy danh sách thuốc và vật tư');
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
      appointment.ten.toLowerCase().includes(query) // Lọc theo tên người dùng
    );
    setFilteredDoctors(filtered);
  };

// Xóa người dùng với xác thực và kiểm tra quyền
const deleteAppointment = async (id) => {
  if (!window.confirm('Bạn có chắc chắn muốn xóa thuốc hoặc vật tư này?')) return;

  try {
    const res = await fetch(`${BASE_URL}/api/v1/booking/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      toast.success(result.message); // Hiển thị thông báo thành công
      setAppointment(appointments.filter((appointment) => appointment._id !== id));
    } else {
      toast.error(result.message); // Hiển thị thông báo lỗi từ server
    }
  } catch (err) {
    toast.error(`Lỗi: ${err.message}`); // Hiển thị lỗi nếu có
  }
};

  useEffect(() => {
    fetchAppointment();
  }, []);

  const handleAddAppoint = () => {
    navigate('/admin/themlichhen');
  };

  const handleEditUser = (id) => {
    navigate(`/admin/chinhsuathuocvattu/${id}`); // Chuyển hướng tới trang chỉnh sửa kèm ID
  };

  const detailUser = (id) => {
    navigate(`/admin/chitietthuocvattu/${id}`); 
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;


  return (
    <div>
      <div className='title-ad'>
        <h1>DANH SÁCH NGƯỜI DÙNG</h1>
      </div>


      <TextField
        label="Tìm kiếm khách hàng"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />

{/* Bảng danh sách người dùng */}
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
          {(searchQuery ? filtered : appointments).length > 0 ? (
            (searchQuery ? filtered : appointments).map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.benhNhan}</td>
                <td>{appointment.bacSi}</td>
                <td>{appointment.ngayHen}</td>
                <td>{appointment.thoiGianBatDau}</td>
                <td>{appointment.trangThai}</td>
                {/* <td>
                    <button className="icon-function" onClick={() => handleEditUser(appointment._id)}>
                      <FaPenToSquare color="#66B5A3" />
                    </button>
                    <button className="icon-function" onClick={() => deleteUser(appointment._id)}>
                      <FaTrash color="#66B5A3" />
                    </button>
                    <button className="icon-function" onClick={() => detailUser(appointment._id)}>
                      <FaRegEye color="#66B5A3" />
                    </button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có lịch hẹn nào</td>
            </tr>
          )}
        </tbody>
      </table>

      <Fab
        onClick={handleAddAppoint}
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

  )
}

export default Appointment