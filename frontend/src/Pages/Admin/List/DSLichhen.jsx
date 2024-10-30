import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './DanhSach.css';
import { Fab } from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext.jsx'; // Import AuthContext để lấy token
import { FaPenToSquare,FaTrash, FaPlus, FaRegEye } from "react-icons/fa6";

const Appointment = () => {
  const navigate = useNavigate();
  const handleAddAppoint = () => {
    navigate('/admin/themlichhen');
  };
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy token từ AuthContext
  const { token } = useContext(AuthContext);
  const fetchInventory = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
  
      const result = await res.json(); // Chuyển đổi JSON từ API
      console.log(result); // Kiểm tra dữ liệu trả về
  
      // Kiểm tra nếu API trả về thành công và có dữ liệu
      if (result.success && Array.isArray(result.data)) {
        setInventory(result.data); // Gán mảng người dùng vào state
      } else {
        throw new Error(result.message || 'Lỗi lấy danh sách thuốc và vật tư');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


// Xóa người dùng với xác thực và kiểm tra quyền
const deleteUser = async (id) => {
  if (!window.confirm('Bạn có chắc chắn muốn xóa thuốc hoặc vật tư này?')) return;

  try {
    const res = await fetch(`${BASE_URL}/api/v1/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      toast.success(result.message); // Hiển thị thông báo thành công
      setInventory(inventory.filter((inventory) => inventory._id !== id));
    } else {
      toast.error(result.message); // Hiển thị thông báo lỗi từ server
    }
  } catch (err) {
    toast.error(`Lỗi: ${err.message}`); // Hiển thị lỗi nếu có
  }
};

  useEffect(() => {
    fetchInventory();
  }, []);

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

      <div>
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
    </div>

  )
}

export default Appointment