import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Typography, Grid, Paper, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // Import icon quay lại
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext.jsx';

const KeBenhAnForNewPatient = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      const res = await fetch(`${BASE_URL}/api/v1/medicalRecord/mdcRecord-newppte`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
        toast.success('Tạo bệnh án thành công');
        navigate('/doctor/danhsachlichhenBS');
      } else {
        toast.error(result.message || 'Tạo bệnh án thất bại');
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={4} sx={{ padding: 6, borderRadius: 2, margin: '20px auto', maxWidth: 800, backgroundColor: '#fafafa' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}  // Thêm icon quay lại
          onClick={() => navigate('/doctor/danhsachlichhenBS')} 
          sx={{ color: '#00796B', fontWeight: 'bold' }}
        >
          Quay lại
        </Button>
      </Box>
      <Typography variant="h4" textAlign="center" sx={{ fontWeight: 600, color: (theme) => theme.palette.primary.main }}>
        Đăng Ký Mới & Kê Bệnh Án
      </Typography>
      <Divider sx={{ margin: '20px 0', backgroundColor: '#3A9AD9' }} />
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#000000', // Màu cam
            marginBottom: '10px',
            marginTop: '20px',
            padding: 1,
            borderRadius: 1, // Bo góc
          }}
        >
          Thông tin bệnh nhân mới
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label={<>Email</>} 
              name="email" 
              value={patientInfo.email} 
              onChange={handlePatientInfoChange} 
              fullWidth 
              required 
              sx={{ backgroundColor: '#E0F7FA', borderRadius: 1 }} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label={<>Mật khẩu</>} 
              name="matKhau" 
              type="password" 
              value={patientInfo.matKhau} 
              onChange={handlePatientInfoChange} 
              fullWidth 
              required 
              sx={{ backgroundColor: '#E0F7FA', borderRadius: 1 }} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label={<>Tên</>} 
              name="ten" 
              value={patientInfo.ten} 
              onChange={handlePatientInfoChange} 
              fullWidth 
              required 
              sx={{ backgroundColor: '#E0F7FA', borderRadius: 1 }} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label={<>Số điện thoại</>} 
              name="soDienThoai" 
              value={patientInfo.soDienThoai} 
              onChange={handlePatientInfoChange} 
              fullWidth 
              required 
              sx={{ backgroundColor: '#E0F7FA', borderRadius: 1 }} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label={<>Giới tính</>} 
              name="gioiTinh" 
              value={patientInfo.gioiTinh} 
              onChange={handlePatientInfoChange} 
              fullWidth 
              required 
              sx={{ backgroundColor: '#E0F7FA', borderRadius: 1 }} 
            />
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '10px',
            marginTop: '20px',
            padding: 1,
            borderRadius: 1, // Bo góc
          }}
        >
          Kê bệnh án
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              label={<>Chẩn đoán</>} 
              value={chanDoan} 
              onChange={(e) => setChanDoan(e.target.value)} 
              fullWidth 
              required 
              sx={{ backgroundColor: '#FFF3E0', borderRadius: 1 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label={<>Triệu chứng</>} 
              value={trieuChung} 
              onChange={(e) => setTrieuChung(e.target.value)} 
              fullWidth 
              required 
              sx={{ backgroundColor: '#FFF3E0', borderRadius: 1 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label={<>Phương pháp điều trị</>} 
              value={phuongPhapDieuTri} 
              onChange={(e) => setPhuongPhapDieuTri(e.target.value)} 
              fullWidth 
              required 
              sx={{ backgroundColor: '#FFF3E0', borderRadius: 1 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label={<>Tiền sử bệnh lý</>} 
              value={tienSuBenhLy} 
              onChange={(e) => setTienSuBenhLy(e.target.value)} 
              fullWidth 
              sx={{ backgroundColor: '#FFF3E0', borderRadius: 1 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label={<>Đánh giá điều trị</>} 
              value={danhGiaDieuTri} 
              onChange={(e) => setDanhGiaDieuTri(e.target.value)} 
              fullWidth 
              sx={{ backgroundColor: '#FFF3E0', borderRadius: 1 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label={<>Kết quả xét nghiệm (ID)</>} 
              value={ketQuaXetNghiem} 
              onChange={(e) => setKetQuaXetNghiem(e.target.value.split(','))} 
              fullWidth 
              sx={{ backgroundColor: '#FFF3E0', borderRadius: 1 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label={<>Đơn thuốc (ID)</>} 
              value={donThuoc} 
              onChange={(e) => setDonThuoc(e.target.value.split(','))} 
              fullWidth 
              sx={{ backgroundColor: '#FFF3E0', borderRadius: 1 }} 
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" marginTop={3}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={loading} 
            sx={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#3A9AD9', '&:hover': { backgroundColor: '#357ABD' } }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Tạo bệnh án'}
          </Button>
          <Button 
            type="button" 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate('/doctor/appointments')} 
            sx={{ ml: 2, padding: '10px 20px', fontSize: '16px', color: '#FF5E57', borderColor: '#FF5E57', '&:hover': { backgroundColor: '#FFF5F5' } }}
          >
            Hủy
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default KeBenhAnForNewPatient;
