import React, {  useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {  TextField, Button, CircularProgress } from '@mui/material';
import { AuthContext } from '../../context/AuthContext.jsx';
import {  FaMagnifyingGlass } from 'react-icons/fa6';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

const DanhSachLichHenBacSi = () => {
  const navigate = useNavigate();

  // State quản lý dữ liệu, tìm kiếm và lỗi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái cho tìm kiếm bệnh nhân
  const [searching, setSearching] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);

  const { token, user } = useContext(AuthContext);
  const doctorId = user._id;

  // Tìm kiếm bệnh nhân theo email hoặc số điện thoại
  const handleSearch = async () => {
    setSearching(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/users/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ emailOrPhone: searchQuery }),
      });
      const result = await res.json();

      if (result.success) {
        setPatientInfo(result.data);
        toast.success('Tìm người dùng thành công');
      } else {
        setPatientInfo(null);
        toast.error(result.message || 'Không tìm thấy bệnh nhân');
      }
    } catch (err) {
      setPatientInfo(null);
      toast.error(`Lỗi: ${err.message}`);
    } finally {
      setSearching(false);
    }
  };

  // Điều hướng đến trang kê bệnh án với bệnh nhân không có lịch hẹn
  const handlePrescriptionWithoutAppointment = () => {
    if (patientInfo) {
      navigate(`/doctor/kebenhanTH3/${patientInfo._id}`);
    } else {
      toast.error('Vui lòng tìm kiếm và chọn bệnh nhân trước khi kê bệnh án');
    }
  };

  // Kiểm tra trạng thái tải và lỗi trước khi hiển thị dữ liệu
  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div style={{ position: 'relative' }}>
      {/* Ô tìm kiếm bệnh nhân */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <TextField
          label="Tìm kiếm bệnh nhân (Email hoặc Số điện thoại)"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSearch} disabled={searching}>
          {searching ? <CircularProgress size={24} /> : <FaMagnifyingGlass />}
        </Button>
      </div>

      {/* Hiển thị thông tin bệnh nhân nếu tìm thấy */}
      {patientInfo && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Thông tin bệnh nhân</h3>
          <p><strong>Email:</strong> {patientInfo.email}</p>
          <p><strong>Tên:</strong> {patientInfo.ten}</p>
          <p><strong>Số điện thoại:</strong> {patientInfo.soDienThoai}</p>
          <p><strong>Giới tính:</strong> {patientInfo.gioiTinh}</p>
          <Button variant="contained" color="primary" onClick={handlePrescriptionWithoutAppointment}>
            Kê bệnh án cho bệnh nhân này
          </Button>
        </div>
      )}
    </div>
  );
};

export default DanhSachLichHenBacSi;
