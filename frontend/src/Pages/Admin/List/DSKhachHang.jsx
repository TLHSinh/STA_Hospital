import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './DanhSach.css';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext.jsx'; // Import AuthContext để lấy token

const DSKhachHang = () => {
   const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy token từ AuthContext
  const { token } = useContext(AuthContext);
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/users', {
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
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    navigate('/admin/themkhachhang'); // Điều hướng đến trang thêm người dùng
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
          </tr>
        </thead>
        <tbody>
  {users.length > 0 ? (
    users.map((user) => (
      <tr key={user._id}>
        <td>{user.photo}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
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
          position: 'absolute',
          bottom: -450,
          right: 30,
        }}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default DSKhachHang;
