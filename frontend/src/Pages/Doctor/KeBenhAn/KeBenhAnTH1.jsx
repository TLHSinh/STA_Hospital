import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField, Button, CircularProgress, Box, Typography, Grid, Paper, Divider, useTheme
} from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config.js';
import { AuthContext } from '../../../context/AuthContext.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const KeBenhAn = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [benhNhan, setBenhNhan] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [chanDoan, setChanDoan] = useState('');
  const [trieuChung, setTrieuChung] = useState('');
  const [phuongPhapDieuTri, setPhuongPhapDieuTri] = useState('');
  const [tienSuBenhLy, setTienSuBenhLy] = useState('');
  const [danhGiaDieuTri, setDanhGiaDieuTri] = useState('');
  const [ketQuaXetNghiem, setKetQuaXetNghiem] = useState([]);
  const { token, user } = useContext(AuthContext);
  const bacSiId = user._id;

  useEffect(() => {
    const fetchBenhNhan = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();

        if (result.success && result.booking && result.booking.benhNhan) {
          setBenhNhan(result.booking.benhNhan);
        } else {
          toast.error('Không thể lấy thông tin bệnh nhân');
        }
      } catch (err) {
        toast.error(`Lỗi: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBenhNhan();
  }, [id, token]);

  const handleKeBenhAn = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ngayKham = new Date().toISOString();
    try {
      const res = await fetch(`${BASE_URL}/api/v1/medicalRecord/mdcRecord-appoint/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          benhNhanId: benhNhan._id,
          bacSiId,
          chanDoan,
          trieuChung,
          phuongPhapDieuTri,
          tienSuBenhLy,
          danhGiaDieuTri,
          ngayKham,
          ketQuaXetNghiem,
          trangThai: 'dangDieuTri',
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Kê bệnh án thành công');
        navigate('/doctor/danhsachlichhenBS');
      } else {
        toast.error(result.message || 'Kê bệnh án thất bại');
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeDonThuoc = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ngayKham = new Date().toISOString();
    try {
      const res = await fetch(`${BASE_URL}/api/v1/medicalRecord/mdcRecord-appoint/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          benhNhanId: benhNhan._id,
          bacSiId,
          chanDoan,
          trieuChung,
          phuongPhapDieuTri,
          tienSuBenhLy,
          danhGiaDieuTri,
          ngayKham,
          ketQuaXetNghiem,
          trangThai: 'dangDieuTri',
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Kê bệnh án thành công');
        navigate(`/doctor/kedonthuoc/${result.benhAn._id}`);
      } else {
        toast.error(result.message || 'Kê bệnh án thất bại');
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewXetNghiem = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ngayKham = new Date().toISOString();
    try {
      const res = await fetch(`${BASE_URL}/api/v1/medicalRecord/mdcRecord-appoint/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          benhNhanId: benhNhan._id,
          bacSiId,
          chanDoan,
          trieuChung,
          phuongPhapDieuTri,
          tienSuBenhLy,
          danhGiaDieuTri,
          ngayKham,
          ketQuaXetNghiem,
          trangThai: 'dangDieuTri',
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Kê bệnh án thành công');
        navigate(`/doctor/newTest/${result.benhAn._id}`);
      } else {
        toast.error(result.message || 'Kê bệnh án thất bại');
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setChanDoan('');
    setTrieuChung('');
    setPhuongPhapDieuTri('');
    setTienSuBenhLy('');
    setDanhGiaDieuTri('');
    setKetQuaXetNghiem([]);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#eaeff1">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={6}
      sx={{
        padding: 4,
        borderRadius: 3,
        margin: '30px auto',
        maxWidth: 900,
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/doctor/danhsachlichhenBS')}
          sx={{ color: '#00796B', fontWeight: 'bold' }}
        >
          Quay lại
        </Button>
      </Box>
      <Typography variant="h4" textAlign="center" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
        Kê Bệnh Án
      </Typography>
      <Divider sx={{ marginY: 3, borderColor: theme.palette.primary.main }} />
      {benhNhan && (
        <Box marginBottom={4}>
          <Typography><strong>Tên:</strong> {benhNhan.ten}</Typography>
          <Typography><strong>Tuổi:</strong> {benhNhan.tuoi}</Typography>
          <Typography><strong>Giới tính:</strong> {benhNhan.gioiTinh}</Typography>
        </Box>
      )}
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Chẩn đoán"
              variant="outlined"
              value={chanDoan}
              onChange={(e) => setChanDoan(e.target.value)}
              fullWidth
              required
              sx={{ backgroundColor: '#E0F7FA', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Triệu chứng"
              variant="outlined"
              value={trieuChung}
              onChange={(e) => setTrieuChung(e.target.value)}
              fullWidth
              required
              sx={{ backgroundColor: '#E0F7FA', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phương pháp điều trị"
              variant="outlined"
              value={phuongPhapDieuTri}
              onChange={(e) => setPhuongPhapDieuTri(e.target.value)}
              fullWidth
              required
              sx={{ backgroundColor: '#E0F7FA', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tiền sử bệnh lý"
              variant="outlined"
              value={tienSuBenhLy}
              onChange={(e) => setTienSuBenhLy(e.target.value)}
              fullWidth
              sx={{ backgroundColor: '#E0F7FA', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Đánh giá điều trị"
              variant="outlined"
              value={danhGiaDieuTri}
              onChange={(e) => setDanhGiaDieuTri(e.target.value)}
              fullWidth
              sx={{ backgroundColor: '#E0F7FA', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Kết quả xét nghiệm (ID)"
              variant="outlined"
              value={ketQuaXetNghiem.join(',')}
              onChange={(e) => setKetQuaXetNghiem(e.target.value.split(','))}
              fullWidth
              sx={{ backgroundColor: '#E0F7FA', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              disabled={submitting}
              onClick={handleKeBenhAn}
              sx={{
                paddingX: 4,
                paddingY: 1.5,
                fontSize: '16px',
                backgroundColor: '#3A9AD9',
                '&:hover': { backgroundColor: '#357ABD' },
                boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
              }}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : 'Kê bệnh án'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disabled={submitting}
              onClick={handleKeDonThuoc}
              sx={{ ml: 2, paddingX: 4, paddingY: 1.5, fontSize: '16px' }}
            >
              {submitting ? <CircularProgress size={24} /> : 'Kê đơn thuốc'}
            </Button>


            <Button
              variant="contained"
              color="secondary"
              disabled={submitting}
              onClick={handleNewXetNghiem}
              sx={{ ml: 2, paddingX: 4, paddingY: 1.5, fontSize: '16px' }}
            >
              {submitting ? <CircularProgress size={24} /> : 'yêu cầu xét nghiệm'}
            </Button>


            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={resetForm}
              sx={{ ml: 2, paddingX: 4, paddingY: 1.5, fontSize: '16px', color: '#FF5E57', borderColor: '#FF5E57' }}
            >
              Reset
            </Button>

            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/doctor/danhsachlichhenBS')}
              sx={{
                ml: 2,
                paddingX: 4,
                paddingY: 1.5,
                fontSize: '16px',
                color: '#FF5E57',
                borderColor: '#FF5E57',
                '&:hover': { backgroundColor: '#FFF5F5' },
              }}
            >
              Hủy
            </Button>

            
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default KeBenhAn;
