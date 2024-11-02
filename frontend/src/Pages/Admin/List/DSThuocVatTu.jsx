import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './DanhSach.css';
import { Fab, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext.jsx'; // Import AuthContext để lấy token
import { FaPenToSquare, FaTrash, FaPlus, FaRegEye } from "react-icons/fa6";

const DSThuocVatTu = () => {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtered, setFilteredInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Lấy token từ AuthContext
  const { token } = useContext(AuthContext);
  const fetchInventory = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/inventory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json(); // Chuyển đổi JSON từ API
      if (result.success && Array.isArray(result.data)) {
        setInventory(result.data); // Gán mảng vật tư vào state
        setFilteredInventory(result.data); // Gán mảng vật tư vào state lọc ban đầu
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
    const filtered = inventory.filter((item) =>
      item.tenVatTu.toLowerCase().includes(query) // Lọc theo tên vật tư
    );
    setFilteredInventory(filtered);
  };

  // Xóa vật tư với xác thực
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
        toast.success(result.message);
        setInventory(inventory.filter((item) => item._id !== id));
        setFilteredInventory(setFilteredInventory.filter((item) => item._id !== id)); // Cập nhật danh sách lọc
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddUser = () => {
    navigate('/admin/themthuocvattu'); // Điều hướng đến trang thêm vật tư
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

      <TextField
        p="Tìm kiếm vật tư"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />

      {/* Bảng danh sách vật tư */}
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
          {(searchQuery ? filtered : inventory).length > 0 ? (
            (searchQuery ? filtered : inventory).map((item) => (
              <tr key={item._id}>
                <td>{item.tenVatTu}</td>
                <td>{item.loaiVatTu}</td>
                <td>{item.soLuong}</td>
                <td>{item.gia}</td>
                <td>{item.donViTinh}</td>
                <td>
                    <button className="icon-function" onClick={() => handleEditUser(item._id)}>
                      <FaPenToSquare color="#66B5A3" />
                    </button>
                    <button className="icon-function" onClick={() => deleteUser(item._id)}>
                      <FaTrash color="#66B5A3" />
                    </button>
                    <button className="icon-function" onClick={() => detailUser(item._id)}>
                      <FaRegEye color="#66B5A3" />
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Không có vật tư nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Nút thêm vật tư */}
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

export default DSThuocVatTu;
