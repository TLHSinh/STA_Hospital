import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext.jsx';

const KeBenhAnForNewPatient = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Trạng thái loading khi gửi yêu cầu
  const [patientInfo, setPatientInfo] = useState({
    email: '',
    matKhau: '',
    ten: '',
    soDienThoai: '',
    gioiTinh: '',
  });
  const [chanDoan, setChanDoan] = useState('');
  const [trieuChung, setTrieuChung] = useState('');
  const [phuongPhapDieuTri, setPhuongPhapDieuTri] = useState('');
  const [tienSuBenhLy, setTienSuBenhLy] = useState('');
  const [danhGiaDieuTri, setDanhGiaDieuTri] = useState('');
  const [ketQuaXetNghiem, setKetQuaXetNghiem] = useState([]);
  const [donThuoc, setDonThuoc] = useState([]);
  const { token, user } = useContext(AuthContext);
  const bacSiId = user._id;

  const handlePatientInfoChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ngayKham = new Date().toISOString();

    try {
      // Gửi yêu cầu POST để tạo bệnh nhân và bệnh án mới
      const res = await fetch(`${BASE_URL}/api/v1/medicalRecord/mdcRecord-newppte`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Thêm token để xác thực
        },
        body: JSON.stringify({
          ...patientInfo,
          bacSiId,
          chanDoan,
          trieuChung,
          phuongPhapDieuTri,
          tienSuBenhLy,
          danhGiaDieuTri,
          ngayKham,
          ketQuaXetNghiem,
          donThuoc,
          trangThai: 'dangDieuTri',
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Tạo bệnh án thành công'); // Hiển thị thông báo thành công
        navigate('/doctor/appointments'); // Chuyển hướng về trang danh sách lịch hẹn
      } else {
        toast.error(result.message || 'Tạo bệnh án thất bại'); // Hiển thị thông báo lỗi nếu tạo bệnh án thất bại
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`); // Hiển thị lỗi nếu yêu cầu thất bại
    } finally {
      setLoading(false); // Kết thúc trạng thái gửi yêu cầu
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <h1>Đăng ký bệnh nhân mới và kê bệnh án</h1>
      <form onSubmit={handleSubmit}>
        <h3>Thông tin bệnh nhân mới</h3>
        <TextField
          label="Email"
          name="email"
          value={patientInfo.email}
          onChange={handlePatientInfoChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Mật khẩu"
          name="matKhau"
          type="password"
          value={patientInfo.matKhau}
          onChange={handlePatientInfoChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Tên"
          name="ten"
          value={patientInfo.ten}
          onChange={handlePatientInfoChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Số điện thoại"
          name="soDienThoai"
          value={patientInfo.soDienThoai}
          onChange={handlePatientInfoChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Giới tính"
          name="gioiTinh"
          value={patientInfo.gioiTinh}
          onChange={handlePatientInfoChange}
          fullWidth
          margin="normal"
          required
        />

        <h3>Kê Bệnh Án</h3>
        <TextField
          label="Chẩn đoán"
          value={chanDoan}
          onChange={(e) => setChanDoan(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Triệu chứng"
          value={trieuChung}
          onChange={(e) => setTrieuChung(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phương pháp điều trị"
          value={phuongPhapDieuTri}
          onChange={(e) => setPhuongPhapDieuTri(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Tiền sử bệnh lý"
          value={tienSuBenhLy}
          onChange={(e) => setTienSuBenhLy(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Đánh giá điều trị"
          value={danhGiaDieuTri}
          onChange={(e) => setDanhGiaDieuTri(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Kết quả xét nghiệm (ID)"
          value={ketQuaXetNghiem}
          onChange={(e) => setKetQuaXetNghiem(e.target.value.split(','))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Đơn thuốc (ID)"
          value={donThuoc}
          onChange={(e) => setDonThuoc(e.target.value.split(','))}
          fullWidth
          margin="normal"
        />

        <Box sx={{ marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Tạo bệnh án'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default KeBenhAnForNewPatient;
