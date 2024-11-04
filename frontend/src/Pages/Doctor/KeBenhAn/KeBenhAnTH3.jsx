import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@mui/material';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateMedicalRecord = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const doctorId = user._id;

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [formData, setFormData] = useState({
    chanDoan: '',
    trieuChung: '',
    phuongPhapDieuTri: '',
    ketQuaXetNghiemIds: [],
    tienSuBenhLy: '',
    danhGiaDieuTri: '',
    donThuocIds: [],
  });

  // Search for patient by email or phone number
  const handleSearch = async () => {
    setSearching(true);
    try {
      const response = await axios.post('/api/v1/users/search', { emailOrPhone: searchQuery }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setPatientInfo(response.data.data);
        toast.success('Tìm người dùng thành công');
      } else {
        setPatientInfo(null);
        toast.error(response.data.message || 'Không tìm thấy bệnh nhân');
      }
    } catch (err) {
      setPatientInfo(null);
      toast.error(`Lỗi: ${err.message}`);
    } finally {
      setSearching(false);
    }
  };

  // Create medical record without appointment
  const handleCreateMedicalRecord = async () => {
    if (!patientInfo) {
      toast.error('Vui lòng tìm kiếm và chọn bệnh nhân trước khi kê bệnh án');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/medical-records/no-appointment', {
        benhNhanId: patientInfo._id,
        bacSiId: doctorId,
        ...formData,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success('Tạo bệnh án thành công');
        navigate(`/doctor/medical-record/${response.data.benhAn._id}`);
      } else {
        toast.error(response.data.message || 'Không thể tạo bệnh án');
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Search patient input */}
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

      {/* Display patient info if found */}
      {patientInfo && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Thông tin bệnh nhân</h3>
          <p><strong>Email:</strong> {patientInfo.email}</p>
          <p><strong>Tên:</strong> {patientInfo.ten}</p>
          <p><strong>Số điện thoại:</strong> {patientInfo.soDienThoai}</p>
          <p><strong>Giới tính:</strong> {patientInfo.gioiTinh}</p>

          {/* Form for diagnosis data */}
          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Chẩn đoán"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.chanDoan}
              onChange={(e) => setFormData({ ...formData, chanDoan: e.target.value })}
            />
            <TextField
              label="Triệu chứng"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.trieuChung}
              onChange={(e) => setFormData({ ...formData, trieuChung: e.target.value })}
            />
            <TextField
              label="Phương pháp điều trị"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.phuongPhapDieuTri}
              onChange={(e) => setFormData({ ...formData, phuongPhapDieuTri: e.target.value })}
            />
            <TextField
              label="Tiền sử bệnh lý"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.tienSuBenhLy}
              onChange={(e) => setFormData({ ...formData, tienSuBenhLy: e.target.value })}
            />
            <TextField
              label="Đánh giá điều trị"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.danhGiaDieuTri}
              onChange={(e) => setFormData({ ...formData, danhGiaDieuTri: e.target.value })}
            />
            <TextField
              label="Đơn thuốc (IDs, cách nhau bởi dấu phẩy)"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.donThuocIds}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  donThuocIds: e.target.value.split(',').map((id) => id.trim()),
                })
              }
            />
          </div>

          <Button variant="contained" color="primary" onClick={handleCreateMedicalRecord} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Kê bệnh án cho bệnh nhân này'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateMedicalRecord;