import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './DanhSach.css';
import { Fab } from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext.jsx'; // Import AuthContext để lấy token
import { FaPenToSquare,FaTrash, FaPlus } from "react-icons/fa6";

const DSKhachHang = () => {
   const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy token từ AuthContext
  const { token } = useContext(AuthContext);
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/users`, {
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
        setUsers(result.data); // Gán mảng người dùng vào state
      } else {
        throw new Error(result.message || 'Lỗi lấy danh sách người dùng');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


// Xóa người dùng với xác thực và kiểm tra quyền
const deleteUser = async (id) => {
  if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;

  try {
    const res = await fetch(`${BASE_URL}/api/v1/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      toast.success(result.message); // Hiển thị thông báo thành công
      setUsers(users.filter((user) => user._id !== id));
    } else {
      toast.error(result.message); // Hiển thị thông báo lỗi từ server
    }
  } catch (err) {
    toast.error(`Lỗi: ${err.message}`); // Hiển thị lỗi nếu có
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    navigate('/admin/themkhachhang'); // Điều hướng đến trang thêm người dùng
  };


  const handleEditUser = (id) => {
    navigate(`/admin/chinhsuakhachhang/${id}`); // Chuyển hướng tới trang chỉnh sửa kèm ID
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div style={{ position: 'relative' }}>
      <div className='title-ad'>
        <h1>DANH SÁCH NGƯỜI DÙNG</h1>
      </div>

      {/* Bảng danh sách người dùng */}
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
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img 
                      src={user.hinhAnh} 
                      alt={`Hình của ${user.ten}`} 
                      style={{ width: '5.5rem', height: '2rem', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                  </td>
                  <td>{user.ten}</td>
                  <td>{user.email}</td>
                  <td>{user.soDienThoai}</td>
                  <td >
                  <button className="icon-function" onClick={() => handleEditUser(user._id)}>
                    <FaPenToSquare color="#66B5A3" />
                  </button>
                  <button className="icon-function" onClick={() => deleteUser(user._id)}>
                    <FaTrash color="#66B5A3" />
                  </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Không có người dùng nào</td>
              </tr>
            )}
</tbody>

      </table>

      {/* Nút thêm người dùng */}
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
        <FaPlus color='white' size={18} />
      </Fab>
    </div>
  );
};

export default DSKhachHang;
