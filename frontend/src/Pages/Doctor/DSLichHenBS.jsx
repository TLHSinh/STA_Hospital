import React from 'react';
import { Fab, TextField } from '@mui/material';
import { FaPenToSquare, FaTrash, FaPlus, FaRegEye } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext.jsx'; // Import AuthContext để lấy token
import { FaPenToSquare, FaTrash, FaPlus, FaRegEye } from "react-icons/fa6";


const AppointmentHeader = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtered, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Lấy danh sách khách hàng
  const { token } = useContext(AuthContext);
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('token',token)

      const result = await res.json(); // Chuyển đổi JSON từ API
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

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.ten.toLowerCase().includes(query) // Lọc theo tên người dùng
    );
    setFilteredDoctors(filtered);
  };


  
  // Xóa khách hàng với xác thực
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
        toast.success(result.message);
        setUsers(users.filter((user) => user._id !== id));
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Điều hướng đến trang thêm người dùng
  const handleAddUser = () => {
    navigate('/admin/themkhachhang');
  };

  // Chuyển hướng tới trang chỉnh sửa kèm ID
  const handleEditUser = (id) => {
    navigate(`/admin/chinhsuakhachhang/${id}`);
  };

  // Chuyển hướng tới trang chi tiết người dùng với ID
  const detailUser = (id) => {
    navigate(`/admin/chitietkhachhang/${id}`);
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  

  return (
    <div className='w-full max-w-7xl m-5'>
      <p className='text-lg font-medium mb-3'>Danh Sách Lịch Hẹn</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto'>
        {/* Header */}
        <div className="grid grid-cols-7 gap-0 py-3 px-6 border-b bg-gray-100">
          <p className="font-bold">STT</p>
          <p className="font-bold">Họ Tên</p>
          <p className="font-bold">Giới Tính</p>
          <p className="font-bold">Ngày Hẹn</p>
          <p className="font-bold">Thời gian bắt đầu</p>
          <p className="font-bold">Thời gian kết thúc</p>
          <p className="font-bold">Hành Động</p>


          
        </div>
      </div>


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

export default AppointmentHeader;
