import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import './DanhSach.css';
import { Fab, Modal, Box, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import { FaPenToSquare, FaTrash, FaPlus, FaRegEye } from "react-icons/fa6";
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext';
import { RiCalendarScheduleLine } from "react-icons/ri";


const BacSi = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [open, setOpen] = useState(false); // Control popup
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [schedule, setSchedule] = useState({ ngay: '', batDau: '', ketThuc: '' });


  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  // Lấy danh sách bác sĩ
  const { token, role } = useContext(AuthContext);
  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/doctors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      // console.log("Token:", token);
      // console.log("Role:", role);
      const result = await res.json(); // Chuyển đổi JSON từ API
      console.log(result); // Kiểm tra dữ liệu trả về

      // Kiểm tra nếu API trả về thành công và có dữ liệu
      // if (result.success && Array.isArray(result.data)) {
      //   setDoctors(result.data); // Gán mảng người dùng vào state
      // } else {
      //   throw new Error(result.message || 'Lỗi lấy danh sách bác sĩ');
      // }
            if (result.success) {
        setDoctors(result.data);
        setFilteredDoctors(result.data); // Gán dữ liệu vào danh sách hiển thị ban đầu
      } else {
        throw new Error(result.message || 'Lỗi lấy danh sách bác sĩ');
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
      const filtered = doctors.filter((doctor) =>
        doctor.ten.toLowerCase().includes(query)
      );
      setFilteredDoctors(filtered);
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



  useEffect(() => {
    fetchDoctors();
  }, []);


  // Điều hướng đến trang thêm người dùng
  const handleAddUser = () => {
    navigate('/admin/thembacsi');
  };


  // Chuyển hướng tới trang chỉnh sửa kèm ID
  const handleEditUser = (id) => {
    navigate(`/admin/chinhsuabacsi/${id}`);
  };


  // Chuyển hướng tới trang chi tiết người dùng với ID
  const detailUser = (id) => {
    navigate(`/admin/chitietbacsi/${id}`);
  };


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
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctors) => (
              <tr key={doctors._id}>
                <td>
                  <img
                    src={doctors.hinhAnh}
                    alt={`Hình của ${doctors.ten}`}
                    style={{ width: '5.5rem', height: '2rem', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </td>
                <td>{doctors.ten}</td>
                <td>{doctors.email}</td>
                <td>{doctors.soDienThoai}</td>
                <td >
                 <button className="icon-function" onClick={() => handleEditUser(doctors._id)}>
                    <FaPenToSquare color="#66B5A3" />
                  </button>
                  <button className="icon-function" onClick={() => deleteUser(doctors._id)}>
                    <FaTrash color="#66B5A3" />
                  </button>
                  <button className="icon-function" onClick={() => detailUser(doctors._id)}>
                    <FaRegEye color="#66B5A3" />
                  </button>
                  <button className="icon-function" onClick={() => openPopup(doctors._id)}>
                    <RiCalendarScheduleLine color="#66B5A3" />
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
  )
}

export default BacSi;






// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from "react-router-dom";
// import './DanhSach.css';
// import { Fab, Modal, Box, TextField, Button } from '@mui/material';
// import { toast } from 'react-toastify';
// import AddIcon from '@mui/icons-material/Add';
// import { FaPenToSquare, FaTrash, FaRegEye } from "react-icons/fa6";
// import { RiCalendarScheduleLine } from "react-icons/ri";
// import { BASE_URL } from '../../../config';
// import { AuthContext } from '../../../context/AuthContext';

// const BacSi = () => {
//   const navigate = useNavigate();
//   const { token, role } = useContext(AuthContext);

//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [selectedDoctorId, setSelectedDoctorId] = useState(null);
//   const [schedule, setSchedule] = useState({ ngay: '', batDau: '', ketThuc: '' });

//   // Lấy danh sách bác sĩ từ API
//   const fetchDoctors = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/v1/doctors`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const result = await res.json();
//       if (result.success) {
//         setDoctors(result.data);
//         setFilteredDoctors(result.data); // Gán dữ liệu vào danh sách hiển thị ban đầu
//       } else {
//         throw new Error(result.message || 'Lỗi lấy danh sách bác sĩ');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   // Xử lý tìm kiếm
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     const filtered = doctors.filter((doctor) =>
//       doctor.ten.toLowerCase().includes(query)
//     );
//     setFilteredDoctors(filtered);
//   };

//   // Xóa bác sĩ
//   const deleteUser = async (id) => {
//     if (!window.confirm('Bạn có chắc chắn muốn xóa bác sĩ này?')) return;

//     try {
//       const res = await fetch(`${BASE_URL}/api/v1/doctors/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const result = await res.json();
//       if (result.success) {
//         toast.success(result.message);
//         setDoctors(doctors.filter((doctor) => doctor._id !== id));
//         setFilteredDoctors(filteredDoctors.filter((doctor) => doctor._id !== id));
//       } else {
//         toast.error(result.message);
//       }
//     } catch (err) {
//       toast.error(`Lỗi: ${err.message}`);
//     }
//   };




//   //tạo lịch làm việc
//   const saveSchedule = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/v1/doctors/addWorkingSchedule/${selectedDoctorId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(schedule),
//       });
//       const result = await res.json();
//       if (result.success) {
//         toast.success('Lịch làm việc đã được thêm');
//         closePopup();
//         fetchDoctors();
//       } else {
//         throw new Error(result.message);
//       }
//     } catch (err) {
//       toast.error(`Lỗi: ${err.message}`);
//     }
//   };


//   const openPopup = (id) => {
//     setSelectedDoctorId(id);
//     setOpen(true);
//   };

//   const closePopup = () => {
//     setOpen(false);
//     setSchedule({ ngay: '', batDau: '', ketThuc: '' });
//   };

//   const handleAddUser = () => {
//     navigate('/admin/thembacsi');
//   };

//   const handleEditUser = (id) => {
//     navigate(`/admin/chinhsuabacsi/${id}`);
//   };

//   const detailUser = (id) => {
//     navigate(`/admin/chitietbacsi/${id}`);
//   };

//   if (loading) return <p>Đang tải dữ liệu...</p>;
//   if (error) return <p>Lỗi: {error}</p>;

//   return (
//     <div style={{ position: 'relative' }}>
//       <div className='title-ad'>
//         <h1>DANH SÁCH BÁC SĨ</h1>
//       </div>

//       <TextField
//         label="Tìm kiếm bác sĩ"
//         variant="outlined"
//         value={searchQuery}
//         onChange={handleSearch}
//         fullWidth
//         margin="normal"
//       />

//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>Hình ảnh</th>
//             <th>Tên người dùng</th>
//             <th>Email</th>
//             <th>Số điện thoại</th>
//             <th>Chức năng</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredDoctors.length > 0 ? (
//             filteredDoctors.map((doctor) => (
//               <tr key={doctor._id}>
//                 <td>
//                   <img
//                     src={doctor.hinhAnh}
//                     alt={`Hình của ${doctor.ten}`}
//                     style={{ width: '5.5rem', height: '2rem', borderRadius: '50%', objectFit: 'cover' }}
//                   />
//                 </td>
//                 <td>{doctor.ten}</td>
//                 <td>{doctor.email}</td>
//                 <td>{doctor.soDienThoai}</td>
//                 <td >
//                   <button className="icon-function" onClick={() => handleEditUser(doctors._id)}>
//                     <FaPenToSquare color="#66B5A3" />
//                   </button>
//                   <button className="icon-function" onClick={() => deleteUser(doctors._id)}>
//                     <FaTrash color="#66B5A3" />
//                   </button>
//                   <button className="icon-function" onClick={() => detailUser(doctors._id)}>
//                     <FaRegEye color="#66B5A3" />
//                   </button>
//                   <button className="icon-function" onClick={() => openPopup(doctors._id)}>
//                     <RiCalendarScheduleLine color="#66B5A3" />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">Không tìm thấy bác sĩ</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <Modal open={open} onClose={closePopup}>
//         <Box className="pop-up-addworking">
//           <h2 style={{ color: '#66B5A3' }}>Thêm Lịch Làm Việc</h2>
//           <TextField
//             label="Ngày"
//             type="date"
//             value={schedule.ngay}
//             onChange={(e) => setSchedule({ ...schedule, ngay: e.target.value })}
//             InputLabelProps={{ shrink: true }}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Giờ Bắt Đầu"
//             type="time"
//             value={schedule.batDau}
//             onChange={(e) => setSchedule({ ...schedule, batDau: e.target.value })}
//             InputLabelProps={{ shrink: true }}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Giờ Kết Thúc"
//             type="time"
//             value={schedule.ketThuc}
//             onChange={(e) => setSchedule({ ...schedule, ketThuc: e.target.value })}
//             InputLabelProps={{ shrink: true }}
//             fullWidth
//             margin="normal"
//           />
//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
//             <Button
//               variant="contained"
//               onClick={() => saveSchedule()}
//               sx={{ backgroundColor: '#66B5A3', '&:hover': { backgroundColor: '#55A392' } }}
//             >
//               Lưu Lịch Làm Việc
//             </Button>
//           </div>
//         </Box>
//       </Modal>

//       <Fab
//         onClick={handleAddUser}
//         sx={{
//           backgroundColor: '#66B5A3',
//           '&:hover': { backgroundColor: '#97c9bc' },
//           position: 'fixed',
//           bottom: 50,
//           right: 50,
//         }}
//         aria-label="add"
//       >
//         <AddIcon />
//       </Fab>
//     </div>
//   );
// };

// export default BacSi;
