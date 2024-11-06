import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import './DanhSach.css';
import { Fab, Modal, Box, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import { FaPenToSquare, FaTrash, FaRegEye } from "react-icons/fa6";
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext';
import { RiCalendarScheduleLine } from "react-icons/ri";

const BacSi = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // Control popup
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [schedule, setSchedule] = useState({ ngay: '', batDau: '', ketThuc: '' });

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/doctors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        setDoctors(result.data);
        setFilteredDoctors(result.data);
      } else {
        throw new Error(result.message || 'Lỗi lấy danh sách bác sĩ');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);



  //tạo lịch làm việc
  const saveSchedule = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/doctors/addWorkingSchedule/${selectedDoctorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(schedule),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Lịch làm việc đã được thêm');
        closePopup();
        fetchDoctors();
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    }
  };

  const openPopup = (id) => {
    setSelectedDoctorId(id);
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
    setSchedule({ ngay: '', batDau: '', ketThuc: '' });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = doctors.filter((doctor) =>
      doctor.ten.toLowerCase().includes(query)
    );
    setFilteredDoctors(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Chuyển hướng tới trang chỉnh sửa kèm ID
  const handleEditUser = (id) => {
    navigate(`/admin/chinhsuabacsi/${id}`);
  };

  // Chuyển hướng tới trang chi tiết người dùng với ID
  const detailUser = (id) => {
    navigate(`/admin/chitietbacsi/${id}`);
  };

  // Xóa bác sĩ với xác thực và kiểm tra quyền
  const deleteUser = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bác sĩ này?')) return;

    try {
      const res = await fetch(`${BASE_URL}/api/v1/doctors/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        setDoctors(doctors.filter((doctors) => doctors._id !== id));
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    }
  };


  // Điều hướng đến trang thêm người dùng
  const handleAddUser = () => {
    navigate('/admin/thembacsi');
  };

  // Tính toán danh sách bác sĩ cho trang hiện tại
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div style={{ position: 'relative' }}>
      <div className='title-ad'>
        <h1>DANH SÁCH BÁC SĨ</h1>
      </div>

      <TextField
        label="Tìm kiếm bác sĩ"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />

      <table className="user-table">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {currentDoctors.length > 0 ? (
            currentDoctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>
                  <img
                    src={doctor.hinhAnh}
                    alt={`Hình của ${doctor.ten}`}
                    style={{ width: '6rem', height: '6rem', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </td>
                <td>{doctor.ten}</td>
                <td>{doctor.email}</td>
                <td>{doctor.soDienThoai}</td>
                <td >
                  <button className="icon-function" onClick={() => handleEditUser(doctor._id)}>
                    <FaPenToSquare color="#66B5A3" />
                  </button>
                  <button className="icon-function" onClick={() => deleteUser(doctor._id)}>
                    <FaTrash color="#66B5A3" />
                  </button>
                  <button className="icon-function" onClick={() => detailUser(doctor._id)}>
                    <FaRegEye color="#66B5A3" />
                  </button>
                  <button className="icon-function" onClick={() => openPopup(doctor._id)}>
                    <RiCalendarScheduleLine color="#66B5A3" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không tìm thấy bác sĩ</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredDoctors.length / doctorsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>



      <Modal open={open} onClose={closePopup}>
        <Box className="pop-up-addworking">
          <h2 style={{ color: '#66B5A3' }}>Thêm Lịch Làm Việc</h2>

          <TextField
            label="Ngày"
            type="date"
            value={schedule.ngay}
            onChange={(e) => setSchedule({ ...schedule, ngay: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Giờ Bắt Đầu"
            type="time"
            value={schedule.batDau}
            onChange={(e) => setSchedule({ ...schedule, batDau: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Giờ Kết Thúc"
            type="time"
            value={schedule.ketThuc}
            onChange={(e) => setSchedule({ ...schedule, ketThuc: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button
              variant="contained"
              onClick={saveSchedule}
              sx={{ backgroundColor: '#66B5A3', '&:hover': { backgroundColor: '#55A392' } }}
            >
              Lưu Lịch Làm Việc
            </Button>
          </div>


        </Box>
      </Modal>



      <Fab
        onClick={handleAddUser}
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
        <AddIcon />
      </Fab>
    </div>
  );
};

export default BacSi;
