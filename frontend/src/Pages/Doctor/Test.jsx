import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField, Button, CircularProgress, Box, Typography, Autocomplete, CardContent, Divider, Paper, Grid
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const KeXetNghiem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [benhNhan, setBenhNhan] = useState(null);
  const [bacSi, setBacSi] = useState(null);
  const [benhAn, setBenhAn] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [bacSiId, setBacSiId] = useState('');
  const [xetNghiemList, setXetNghiemList] = useState([{ xetNghiemId: '', ngayLayMau: '', ngayTraKetQua: '', ketQua: '', ghiChu: '' }]);
  const [availableXetNghiems, setAvailableXetNghiems] = useState([]);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    setBacSiId(user._id);

    const fetchBenhAn = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/medicalRecord/getmdcRecord/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success && res.data.benhAn) {
          setBenhNhan(res.data.benhAn.benhNhan);
          setBacSi(res.data.benhAn.bacSi);
          setBenhAn(res.data.benhAn);
        } else {
          toast.error('Không tìm thấy bệnh án');
        }
      } catch (err) {
        toast.error(`Lỗi: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchXetNghiems = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/test/getListtest/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailableXetNghiems(res.data.data || []);
      } catch (err) {
        toast.error(`Lỗi khi tải danh sách xét nghiệm: ${err.message}`);
      }
    };

    fetchBenhAn();
    fetchXetNghiems();
  }, [id, token, user._id]);

  const handleXetNghiemChange = (index, field, value) => {
    const newXetNghiemList = [...xetNghiemList];
    newXetNghiemList[index][field] = value;
    setXetNghiemList(newXetNghiemList);
  };

  const addXetNghiemField = () => {
    setXetNghiemList([...xetNghiemList, { xetNghiemId: '', ngayLayMau: '', ngayTraKetQua: '', ketQua: '', ghiChu: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/test/newtest/${id}`,
        { bacSiId, xetNghiemList },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success('Kê xét nghiệm thành công');
        navigate('/doctor/danhsachlichhenBS');
      } else {
        toast.error(res.data.message || 'Kê xét nghiệm thất bại');
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4,
      borderRadius: 3,
      margin: '30px auto',
      maxWidth: 900,
      backgroundColor: '#ffffff',
      boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/doctor/danhsachlichhenBS')}
          sx={{ color: '#00796B', fontWeight: 'bold' }}
        >
          Quay lại
        </Button>
      </Box>

      <Typography variant="h4" align="center" gutterBottom color="primary" sx={{ fontWeight: 'bold', marginBottom: '40px'}} >
        Kê Xét Nghiệm
      </Typography>

      <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', borderRadius: '12px', bgcolor: '#ffffff' }}>
        {benhNhan && benhAn && (
          <CardContent>
            <Typography variant="h6" color="#0b8fac" sx={{ fontWeight: 'bold' }}>Thông tin bệnh nhân</Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Tên:</strong> {benhNhan.ten}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Ngày sinh:</strong> {benhNhan.ngaySinh}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Địa chỉ:</strong> {benhNhan.diaChi}</Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ marginTop: 3, fontWeight: 'bold' }} color="#0b8fac">Thông tin bệnh án</Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Chẩn đoán:</strong> {benhAn.chanDoan}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Triệu chứng:</strong> {benhAn.trieuChung}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Phương pháp điều trị:</strong> {benhAn.phuongPhapDieuTri}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Tiền sử bệnh lý:</strong> {benhAn.tienSuBenhLy}</Typography>
              </Grid>
            </Grid>

            {bacSi && (
              <>
                <Typography variant="h6" sx={{ marginTop: 3, fontWeight: 'bold' }} color="#0b8fac">Thông tin bác sĩ</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>Tên:</strong> {user.ten}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>Chức vụ:</strong> {user.role}</Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>
        )}
      </Paper>

      <form onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{ marginTop: 3, fontWeight: 'bold' }} color="textSecondary">Danh sách xét nghiệm</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {xetNghiemList.map((xetNghiem, index) => (
          <Grid container spacing={2} key={index} alignItems="center" marginBottom="20px">
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                options={availableXetNghiems}
                getOptionLabel={(option) => option.loaiXetNghiem}
                onChange={(e, value) => handleXetNghiemChange(index, 'xetNghiemId', value?._id || '')}
                renderInput={(params) => <TextField {...params} label="Chọn xét nghiệm" required variant="outlined" sx={{ bgcolor: '#e8f0fe', borderRadius: '8px' }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Ngày lấy mẫu"
                type="date"
                value={xetNghiem.ngayLayMau}
                onChange={(e) => handleXetNghiemChange(index, 'ngayLayMau', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{ bgcolor: '#e8f0fe', borderRadius: '8px' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Ngày trả kết quả"
                type="date"
                value={xetNghiem.ngayTraKetQua}
                onChange={(e) => handleXetNghiemChange(index, 'ngayTraKetQua', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{ bgcolor: '#e8f0fe', borderRadius: '8px' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Kết quả"
                value={xetNghiem.ketQua}
                onChange={(e) => handleXetNghiemChange(index, 'ketQua', e.target.value)}
                required
                variant="outlined"
                sx={{ bgcolor: '#e8f0fe', borderRadius: '8px' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Ghi Chú"
                value={xetNghiem.ghiChu}
                onChange={(e) => handleXetNghiemChange(index, 'ghiChu', e.target.value)}
                variant="outlined"
                sx={{ bgcolor: '#e8f0fe', borderRadius: '8px' }}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}
        <Button variant="outlined" onClick={addXetNghiemField} sx={{ marginBottom: 2, color: '#4a90e2', borderColor: '#4a90e2' }}>
          Thêm xét nghiệm
        </Button>

        <Box display="flex" gap={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{ minWidth: '150px', bgcolor: '#4a90e2', color: 'white' }}
          >
            {submitting ? <CircularProgress size={24} /> : 'Kê Xét Nghiệm'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setXetNghiemList([{ xetNghiemId: '', ngayLayMau: '', ngayTraKetQua: '', ketQua: '', ghiChu: '' }]);
            }}
            sx={{ color: '#ff7043', borderColor: '#ff7043' }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default KeXetNghiem;
