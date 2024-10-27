import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './DanhSach.css';
import { Fab } from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext.jsx'; // Import AuthContext để lấy token
import { FaPenToSquare,FaTrash, FaPlus, FaRegEye } from "react-icons/fa6";


const DSThuocVatTu = () => {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy token từ AuthContext
  const { token } = useContext(AuthContext);
  const fetchInventory = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/inventory`, {
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
    const res = await fetch(`${BASE_URL}/api/v1/inventory/${id}`, {
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

  const handleAddUser = () => {
    navigate('/admin/themthuocvattu'); // Điều hướng đến trang thêm người dùng
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
    <div style={{ position: 'relative' }}>
      <div className='title-ad'>
        <h1>DANH SÁCH THUỐC VÀ VẬT TƯ</h1>
      </div>

      {/* Bảng danh sách người dùng */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Tên vật tư</th>
            <th>Loại vật tư</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Đơn vị</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
            {inventory.length > 0 ? (
              inventory.map((inventory) => (
                <tr key={inventory._id}>
                  <td>{inventory.tenVatTu}</td>
                  <td>{inventory.loaiVatTu}</td>
                  <td>{inventory.soLuong}</td>
                  <td>{inventory.gia}</td>
                  <td>{inventory.donViTinh}</td>
                  <td >
                  <button className="icon-function" onClick={() => handleEditUser(inventory._id)}>
                    <FaPenToSquare color="#66B5A3" />
                  </button>
                  <button className="icon-function" onClick={() => deleteUser(inventory._id)}>
                    <FaTrash color="#66B5A3" />
                  </button>
                  <button className="icon-function" onClick={() => detailUser(inventory._id)}>
                    <FaRegEye color="#66B5A3" />
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

export default DSThuocVatTu