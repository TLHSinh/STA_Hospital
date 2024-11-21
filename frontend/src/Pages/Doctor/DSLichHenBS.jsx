import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fab, TextField, Button, CircularProgress } from '@mui/material';
import { AuthContext } from '../../context/AuthContext.jsx';
import { FaPenToSquare, FaPlus, FaMagnifyingGlass, FaEye } from 'react-icons/fa6';
import { BASE_URL } from '../../config';
import { FcSearch } from "react-icons/fc";

const DanhSachLichHenBacSi = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { token, user } = useContext(AuthContext);
  const doctorId = user._id;

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/v1/bookings/getdocAppoint/${doctorId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (!result.success || !Array.isArray(result.appointments)) {
          throw new Error(result.message || 'Lỗi lấy danh sách lịch hẹn');
        }
        setAppointments(result.appointments);
        setFilteredAppointments(result.appointments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [doctorId, token]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = appointments.filter((appointment) =>
      appointment.benhNhan.ten.toLowerCase().includes(query) ||
      appointment.benhNhan.email.toLowerCase().includes(query)
      // appointment.benhNhan.soDienThoai.includes(query)
    );
    setFilteredAppointments(filtered);
  };

  const handlePrescription = (appointmentId) => {
    navigate(`/doctor/kebenhanTH1/${appointmentId}`);
  };

  const handleViewPrescription = (appointmentId) => {
    navigate(`/doctor/xemlaibenhans/${appointmentId}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Lỗi: {error}</p>;

  return (
    // <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto', marginTop: '80px', backgroundColor: '#f5f8fb', borderRadius: '8px' }}>
    //   <div className="title-ad" style={{ marginBottom: '20px', textAlign: 'center', color: '#333', gap:'50' }}>
    //     <h1 style={{ fontSize: '1.5rem', color: '#66B5A3' }}>Danh Sách Lịch Hẹn của Bác Sĩ</h1>
    //     <TextField
    //       placeholder="Tìm kiếm bệnh nhân..."
    //       value={searchQuery}
    //       onChange={handleSearch}
    //       variant="outlined"
    //       style={{ margin: '10px 0', width: '50%' }}
    //       InputProps={{
    //         startAdornment: <FaMagnifyingGlass color="#66B5A3" style={{ marginRight: '8px' }} />,
    //       }}
    //     />
    //   </div>

    //   <table className="user-table" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
    //     <thead>
    //       <tr style={{ backgroundColor: '#66B5A3', color: 'white' }}>
    //         <th style={{ padding: '10px', textAlign: 'left' }}>Tên Bệnh Nhân</th>
    //         <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
    //         <th style={{ padding: '10px', textAlign: 'left' }}>Số Điện Thoại</th>
    //         <th style={{ padding: '10px', textAlign: 'left' }}>Ngày Hẹn</th>
    //         <th style={{ padding: '10px', textAlign: 'left' }}>Thời Gian Bắt Đầu</th>
    //         <th style={{ padding: '10px', textAlign: 'left' }}>Thời Gian Kết Thúc</th>
    //         <th style={{ padding: '10px', textAlign: 'left' }}>Chức Năng</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {filteredAppointments.length > 0 ? (
    //         filteredAppointments.map(({ _id, benhNhan, ngayHen, thoiGianBatDau, thoiGianKetThuc }) => (
    //           <tr key={_id} style={{ borderBottom: '1px solid #ddd' }}>
    //             <td style={{ padding: '10px' }}>{benhNhan.ten}</td>
    //             <td style={{ padding: '10px' }}>{benhNhan.email}</td>
    //             <td style={{ padding: '10px' }}>{benhNhan.soDienThoai}</td>
    //             <td style={{ padding: '10px' }}>{new Date(ngayHen).toLocaleDateString()}</td>
    //             <td style={{ padding: '10px' }}>{thoiGianBatDau}</td>
    //             <td style={{ padding: '10px' }}>{thoiGianKetThuc}</td>
    //             <td style={{ padding: '10px' }}>
    //               <Button
    //                 variant="contained"
    //                 style={{ backgroundColor: '#66B5A3', color: 'white', marginRight: '10px' }}
    //                 startIcon={<FaPenToSquare />}
    //                 onClick={() => handlePrescription(_id)}
    //               >
    //                 Khám
    //               </Button>

    //               {/* <Button
    //                 variant="contained"
    //                 style={{ backgroundColor: '#FFC107', color: 'white' }}
    //                 startIcon={<FaEye />}
    //                 onClick={() => handleViewPrescription(_id)}  // Nút "Xem lại đơn"
    //               >
    //                 Xem lại đơn
    //               </Button> */}
    //             </td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan="7" style={{ textAlign: 'center', padding: '10px', color: '#777' }}>
    //             Không có lịch hẹn nào
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>

    //   <Fab
    //     onClick={() => navigate('/doctor/kebenhanTH2')}
    //     sx={{
    //       backgroundColor: '#66B5A3',
    //       '&:hover': { backgroundColor: '#97c9bc' },
    //       position: 'fixed',
    //       bottom: 50,
    //       right: 50,
    //     }}
    //     aria-label="add"
    //   >
    //     <FaPlus color="white" size={18} />
    //   </Fab>
    // </div>




    <div>
      <div style={{ padding: '20px' }}>
        <div className="row" >
          <div className='col-sm-12'>
            <div className='card-list-ad'>
              <div className=' header-list-card' >
                <div style={{ float: "left" }}>
                  <h1 className="title-ad">DANH SÁCH LỊCH HẸN</h1>
                </div>
                <div className="search-bar">
                  <input type="text" placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={handleSearch} />
                  <FcSearch className='search-icon' />
                </div>
              </div>
              <table className="user-table ">
                <thead>
                  <tr>
                    <th >Tên Bệnh Nhân</th>
                    <th >Email</th>
                    <th >Số Điện Thoại</th>
                    <th >Ngày Hẹn</th>
                    <th >Thời Gian Bắt Đầu</th>
                    <th >Thời Gian Kết Thúc</th>
                    <th >Chức Năng</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map(({ _id, benhNhan, ngayHen, thoiGianBatDau, thoiGianKetThuc }) => (
                      <tr key={_id} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '10px' }}>{benhNhan.ten}</td>
                        <td style={{ padding: '10px' }}>{benhNhan.email}</td>
                        <td style={{ padding: '10px' }}>{benhNhan.soDienThoai}</td>
                        <td style={{ padding: '10px' }}>{new Date(ngayHen).toLocaleDateString()}</td>
                        <td style={{ padding: '10px' }}>{thoiGianBatDau}</td>
                        <td style={{ padding: '10px' }}>{thoiGianKetThuc}</td>
                        <td style={{ padding: '10px' }}>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: '#66B5A3', color: 'white', marginRight: '10px' }}
                            startIcon={<FaPenToSquare />}
                            onClick={() => handlePrescription(_id)}
                          >
                            Khám
                          </Button>

                          {/* <Button
                    variant="contained"
                    style={{ backgroundColor: '#FFC107', color: 'white' }}
                    startIcon={<FaEye />}
                    onClick={() => handleViewPrescription(_id)}  // Nút "Xem lại đơn"
                  >
                    Xem lại đơn
                  </Button> */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '10px', color: '#777' }}>
                        Không có lịch hẹn nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {/* <div className="pagination">
          {Array.from({ length: Math.ceil(filteredDoctors.length / doctorsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div> */}
            </div>
          </div>
        </div>
      </div>
      <Fab
        onClick={() => navigate('/doctor/kebenhanTH2')}
        sx={{
          backgroundColor: '#66B5A3',
          '&:hover': { backgroundColor: '#97c9bc' },
          position: 'fixed',
          bottom: 50,
          right: 50,
        }}
        aria-label="add"
      >
        <FaPlus color="white" size={18} />
      </Fab>
    </div>
  );
};

export default DanhSachLichHenBacSi;
